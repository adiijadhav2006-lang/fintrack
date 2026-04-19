import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex items-start justify-center min-h-svh bg-muted/40">
      <div className="relative w-full max-w-[430px] min-h-svh bg-background flex flex-col shadow-elevated">
        {/* Main content — padded bottom for fixed nav + safe area */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }}
        >
          {children}
        </main>

        <BottomNav />
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
