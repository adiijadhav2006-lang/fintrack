import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { useGetUserProfile } from "./hooks/useQueries";

const HomePage = lazy(() => import("./pages/HomePage"));
const AddExpensePage = lazy(() => import("./pages/AddExpensePage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));

function PageLoader() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-40 w-full rounded-2xl" />
      <Skeleton className="h-24 w-full rounded-2xl" />
      <Skeleton className="h-24 w-full rounded-2xl" />
    </div>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { loginStatus } = useInternetIdentity();
  const isAuthenticated = loginStatus === "success";
  const isLoggingIn =
    loginStatus === "logging-in" || loginStatus === "initializing";

  const { data: userProfile, isLoading: profileLoading } = useGetUserProfile();

  // Still initializing auth
  if (isLoggingIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-3xl">💰</span>
          </div>
          <div className="space-y-2 text-center">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-3 w-24 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // Not logged in — show login page
  if (!isAuthenticated) {
    return (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    );
  }

  // Logged in but still checking profile
  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
            <span className="text-3xl">💰</span>
          </div>
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  // Logged in, onboarding not completed — show onboarding
  if (!userProfile || !userProfile.onboardingCompleted) {
    return (
      <Suspense fallback={<PageLoader />}>
        <OnboardingPage />
      </Suspense>
    );
  }

  // Fully authenticated and onboarded — show app
  return <>{children}</>;
}

const rootRoute = createRootRoute({
  component: () => (
    <AuthGate>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
    </AuthGate>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const addRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add",
  component: AddExpensePage,
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: ReportsPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  addRoute,
  reportsRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
