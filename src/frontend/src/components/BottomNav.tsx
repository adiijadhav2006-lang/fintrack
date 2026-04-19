import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { BarChart2, Home, PlusCircle, User } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home, id: "home" },
  { to: "/add", label: "Add", icon: PlusCircle, id: "add" },
  { to: "/reports", label: "Reports", icon: BarChart2, id: "reports" },
  { to: "/profile", label: "Profile", icon: User, id: "profile" },
] as const;

export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-ocid="bottom-nav"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ to, label, icon: Icon, id }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);
          const isAdd = id === "add";

          return (
            <Link
              key={to}
              to={to}
              data-ocid={`nav-${id}`}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-smooth",
                isAdd && "relative -top-3",
              )}
            >
              {isAdd ? (
                <span
                  className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-smooth",
                    isActive
                      ? "bg-primary scale-105"
                      : "bg-primary hover:scale-105",
                  )}
                >
                  <Icon
                    className="w-7 h-7 text-primary-foreground"
                    strokeWidth={2.5}
                  />
                </span>
              ) : (
                <>
                  <Icon
                    className={cn(
                      "w-6 h-6 transition-smooth",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-semibold tracking-wide transition-smooth",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
