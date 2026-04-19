import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Category } from "../backend";
import type { Expense } from "../backend";
import { useBudget, useExpensesByMonth } from "../hooks/useQueries";
import {
  formatCurrency,
  getCategoryColor,
  getCategoryIcon,
  getCategoryLabel,
  getSpendingStatus,
} from "../lib/formatters";

const motivationalMessages: Record<string, { text: string; sub: string }> = {
  "on-track": {
    text: "You're doing great! 🎉",
    sub: "Keep up the smart spending habits.",
  },
  caution: {
    text: "Getting close to budget 🙏",
    sub: "Stay mindful of the next few days.",
  },
  overspend: {
    text: "Budget exceeded 💪",
    sub: "Tomorrow is a fresh start. You've got this!",
  },
};

function MoneyLeftRing({
  spent,
  budget,
  status,
}: {
  spent: number;
  budget: number;
  status: "on-track" | "caution" | "overspend";
}) {
  const moneyLeft = Math.max(budget - spent, 0);
  const pct = budget > 0 ? Math.min(spent / budget, 1) : 0;
  const r = 68;
  const circ = 2 * Math.PI * r;
  const filled = circ * pct;

  const colorMap = {
    "on-track": "oklch(0.58 0.18 148)",
    caution: "oklch(0.70 0.16 82)",
    overspend: "oklch(0.54 0.22 22)",
  };

  const statusLabels = {
    "on-track": "On Track",
    caution: "Caution",
    overspend: "Over Budget",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-40 h-40">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 160 160"
          role="img"
          aria-label="Spending progress ring"
        >
          <title>Spending progress ring</title>
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            strokeWidth="12"
            stroke="oklch(var(--muted))"
          />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            strokeWidth="12"
            stroke={colorMap[status]}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circ - filled}`}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            Left
          </span>
          <span className="text-2xl font-display font-bold text-foreground leading-none">
            {formatCurrency(moneyLeft)}
          </span>
          <span
            className={`text-[10px] font-semibold mt-0.5 ${
              status === "on-track"
                ? "text-success"
                : status === "caution"
                  ? "text-warning"
                  : "text-destructive"
            }`}
          >
            {statusLabels[status]}
          </span>
        </div>
      </div>
    </div>
  );
}

function CategoryPieChart({ expenses }: { expenses: Expense[] }) {
  const chartData = useMemo(() => {
    const totals: Partial<Record<Category, number>> = {};
    for (const e of expenses) {
      totals[e.category] = (totals[e.category] ?? 0) + e.amount;
    }
    return Object.entries(totals)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .map(([cat, val]) => ({
        category: cat as Category,
        value: val as number,
        color: getCategoryColor(cat as Category),
        label: getCategoryLabel(cat as Category),
        icon: getCategoryIcon(cat as Category),
      }));
  }, [expenses]);

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-muted-foreground gap-2">
        <div className="text-3xl">🌱</div>
        <p className="text-sm text-center">
          Start logging expenses to see your spending breakdown
        </p>
      </div>
    );
  }

  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={55}
              innerRadius={28}
              strokeWidth={2}
              stroke="oklch(var(--card))"
            >
              {chartData.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: number) => formatCurrency(val)}
              contentStyle={{
                borderRadius: "0.625rem",
                border: "none",
                background: "oklch(var(--card))",
                fontSize: "0.75rem",
                boxShadow: "0 2px 8px oklch(0.16 0.025 200 / 0.12)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-2 min-w-0">
          {chartData.slice(0, 4).map((entry) => (
            <div
              key={entry.category}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: entry.color }}
                />
                <span className="text-xs text-muted-foreground truncate">
                  {entry.label}
                </span>
              </div>
              <span className="text-xs font-semibold text-foreground shrink-0">
                {total > 0 ? Math.round((entry.value / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentExpenses({ expenses }: { expenses: Expense[] }) {
  const recent = useMemo(
    () => [...expenses].sort((a, b) => Number(b.date - a.date)).slice(0, 5),
    [expenses],
  );
  if (recent.length === 0) return null;

  return (
    <div className="divide-y divide-border">
      {recent.map((exp) => (
        <div
          key={exp.id}
          className="flex items-center justify-between py-3"
          data-ocid="expense-row"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
              style={{
                background: `${getCategoryColor(exp.category)}22`,
              }}
            >
              {getCategoryIcon(exp.category)}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate leading-tight">
                {exp.note || getCategoryLabel(exp.category)}
              </p>
              <p className="text-xs text-muted-foreground">
                {getCategoryLabel(exp.category)}
              </p>
            </div>
          </div>
          <span className="text-sm font-semibold text-foreground shrink-0 ml-2">
            {formatCurrency(exp.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const now = new Date();
  const { data: expenses = [], isLoading: expLoading } = useExpensesByMonth(
    now.getMonth() + 1,
    now.getFullYear(),
  );
  const { data: budget, isLoading: budgetLoading } = useBudget();

  const totalSpent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses],
  );

  const totalBudget = budget?.totalAmount ?? 0;
  const hasBudget = totalBudget > 0;
  const status = hasBudget
    ? getSpendingStatus(totalSpent, totalBudget)
    : "on-track";
  const isLoading = expLoading || budgetLoading;
  const daysLeft =
    new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() -
    now.getDate();
  const msg = motivationalMessages[status];

  return (
    <div className="flex flex-col" data-ocid="home-page">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            {now.toLocaleString("en-IN", { month: "long" })} {now.getFullYear()}
          </p>
          <h1 className="text-lg font-display font-bold text-foreground leading-tight">
            FinTrack
          </h1>
        </div>
        <div
          className={
            status === "on-track"
              ? "badge-success"
              : status === "caution"
                ? "badge-warning"
                : "badge-alert"
          }
          data-ocid="spending-status-badge"
        >
          <Zap className="w-3 h-3" />
          {status === "on-track"
            ? "On Track"
            : status === "caution"
              ? "Caution"
              : "Over Budget"}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Money Left hero card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle overflow-hidden"
            data-ocid="money-left-card"
          >
            <div
              className="h-1.5 w-full"
              style={{
                background: hasBudget
                  ? `linear-gradient(to right, ${status === "on-track" ? "oklch(0.58 0.18 148)" : status === "caution" ? "oklch(0.70 0.16 82)" : "oklch(0.54 0.22 22)"} ${hasBudget ? Math.min((totalSpent / totalBudget) * 100, 100) : 0}%, oklch(var(--muted)) 0%)`
                  : "oklch(var(--muted))",
              }}
            />
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold text-foreground mb-4">
                Money Left This Month
              </h2>
              <div className="flex items-center justify-between gap-4">
                {isLoading ? (
                  <Skeleton className="w-40 h-40 rounded-full" />
                ) : (
                  <MoneyLeftRing
                    spent={totalSpent}
                    budget={totalBudget}
                    status={status}
                  />
                )}

                <div className="flex-1 flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-muted/60 rounded-xl p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                        Spent
                      </p>
                      {isLoading ? (
                        <Skeleton className="h-5 w-20" />
                      ) : (
                        <p className="text-base font-display font-bold text-foreground">
                          {formatCurrency(totalSpent)}
                        </p>
                      )}
                    </div>
                    <div className="bg-muted/60 rounded-xl p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                        Budget
                      </p>
                      {isLoading ? (
                        <Skeleton className="h-5 w-20" />
                      ) : (
                        <p className="text-base font-display font-bold text-foreground">
                          {hasBudget ? formatCurrency(totalBudget) : "—"}
                        </p>
                      )}
                    </div>
                    <div className="bg-muted/60 rounded-xl p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                        Days Left
                      </p>
                      <p className="text-base font-display font-bold text-foreground">
                        {daysLeft}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`mt-4 flex items-start gap-2 p-3 rounded-xl text-sm ${
                  status === "on-track"
                    ? "bg-success/10"
                    : status === "caution"
                      ? "bg-warning/10"
                      : "bg-destructive/10"
                }`}
              >
                <span className="text-base leading-none mt-0.5">
                  {status === "on-track"
                    ? "✨"
                    : status === "caution"
                      ? "🙏"
                      : "💪"}
                </span>
                <div>
                  <p
                    className={`font-semibold text-sm ${
                      status === "on-track"
                        ? "text-success"
                        : status === "caution"
                          ? "text-warning"
                          : "text-destructive"
                    }`}
                  >
                    {msg.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {msg.sub}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Spending Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="spending-breakdown-card"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">
                  Spending Breakdown
                </h2>
                <Badge variant="secondary" className="text-xs rounded-full">
                  {expenses.length} items
                </Badge>
              </div>
              {isLoading ? (
                <Skeleton className="h-32 w-full rounded-xl" />
              ) : (
                <CategoryPieChart expenses={expenses} />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Budgets */}
        {!isLoading &&
          budget &&
          Object.values(budget.categoryLimits).some(Boolean) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
            >
              <Card
                className="rounded-2xl border-0 shadow-subtle"
                data-ocid="budget-utilization-card"
              >
                <CardContent className="p-5 space-y-3">
                  <h2 className="text-sm font-semibold text-foreground">
                    Category Budgets
                  </h2>
                  {Object.values(Category)
                    .filter((cat) => {
                      const key =
                        cat.toLowerCase() as keyof typeof budget.categoryLimits;
                      return budget.categoryLimits[key];
                    })
                    .map((cat) => {
                      const key =
                        cat.toLowerCase() as keyof typeof budget.categoryLimits;
                      const limit = budget.categoryLimits[key] ?? 0;
                      const spent = expenses
                        .filter((e) => e.category === cat)
                        .reduce((s, e) => s + e.amount, 0);
                      const pct =
                        limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
                      const catStatus = getSpendingStatus(spent, limit);
                      return (
                        <div key={cat} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 font-medium text-foreground">
                              <span>{getCategoryIcon(cat)}</span>
                              {getCategoryLabel(cat)}
                            </span>
                            <span className="text-muted-foreground">
                              {formatCurrency(spent)} / {formatCurrency(limit)}
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${pct}%`,
                                background:
                                  catStatus === "on-track"
                                    ? "oklch(0.58 0.18 148)"
                                    : catStatus === "caution"
                                      ? "oklch(0.70 0.16 82)"
                                      : "oklch(0.54 0.22 22)",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </CardContent>
              </Card>
            </motion.div>
          )}

        {/* Recent Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="recent-expenses-card"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-semibold text-foreground">
                  Recent Expenses
                </h2>
                <Link
                  to="/reports"
                  className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                >
                  View all <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              {isLoading ? (
                <div className="space-y-3 mt-2">
                  {(["r1", "r2", "r3"] as const).map((k) => (
                    <Skeleton key={k} className="h-12 rounded-xl" />
                  ))}
                </div>
              ) : expenses.length === 0 ? (
                <div className="text-center py-8" data-ocid="empty-state">
                  <div className="text-4xl mb-3">🌱</div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    No expenses logged yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tap the{" "}
                    <strong className="text-primary font-bold">+</strong> button
                    below to add your first expense!
                  </p>
                </div>
              ) : (
                <RecentExpenses expenses={expenses} />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* No budget CTA */}
        {!isLoading && !hasBudget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Link to="/profile">
              <div className="rounded-2xl border-2 border-dashed border-primary/30 p-4 flex items-center gap-3 bg-primary/5 transition-smooth hover:border-primary/50">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Set a monthly budget
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Track your spending against a goal →
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <footer className="py-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="underline underline-offset-2 hover:text-foreground transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
