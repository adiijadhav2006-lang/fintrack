import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Loader2, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  { icon: Zap, label: "Instant expense logging" },
  { icon: TrendingUp, label: "Real-time spending insights" },
  { icon: ShieldCheck, label: "Secure & private on-chain" },
];

export default function LoginPage() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoading = loginStatus === "logging-in";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between bg-background px-6 py-12"
      data-ocid="login-page"
    >
      {/* Top spacer */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm gap-10">
        {/* Logo + Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          {/* App icon */}
          <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-elevated">
            <span className="text-4xl" role="img" aria-label="FinTrack">
              💰
            </span>
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">
              FinTrack
            </h1>
            <p className="text-muted-foreground text-base mt-1.5 leading-relaxed">
              Your personal finance companion
            </p>
          </div>
        </motion.div>

        {/* Feature list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full space-y-3"
        >
          {features.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border/60 shadow-subtle"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full space-y-3"
        >
          <Button
            className="w-full h-14 text-base font-semibold rounded-2xl shadow-elevated gap-2"
            onClick={login}
            disabled={isLoading}
            data-ocid="get-started-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Get Started →"
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground leading-relaxed px-4">
            Powered by Internet Identity — your data stays private and under
            your control.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="underline underline-offset-2 hover:text-foreground transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
