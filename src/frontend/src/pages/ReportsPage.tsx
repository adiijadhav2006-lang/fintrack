import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Category, Expense } from "../backend";
import { useBudget, useExpensesByMonth } from "../hooks/useQueries";
import {
  formatCurrency,
  formatShortDate,
  getCategoryColor,
  getCategoryIcon,
  getCategoryLabel,
  getSpendingStatus,
} from "../lib/formatters";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function DailyChart({ expenses }: { expenses: Expense[] }) {
  const data = useMemo(() => {
    const byDay: Record<string, number> = {};
    for (const e of expenses) {
      const key = formatShortDate(e.date);
      byDay[key] = (byDay[key] ?? 0) + e.amount;
    }
    return Object.entries(byDay)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14);
  }, [expenses]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-28 text-muted-foreground text-sm">
        No data yet
      </div>
    );
  }

  const maxVal = Math.max(...data.map((d) => d.total));

  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 9, fill: "oklch(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 9, fill: "oklch(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) =>
            v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`
          }
        />
        <Tooltip
          formatter={(v: number) => [formatCurrency(v), "Spent"]}
          contentStyle={{
            borderRadius: "0.625rem",
            border: "none",
            background: "oklch(var(--card))",
            fontSize: "0.75rem",
            boxShadow: "0 2px 8px oklch(0.16 0.025 200 / 0.12)",
          }}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={24}>
          {data.map((entry) => (
            <Cell
              key={entry.date}
              fill={
                entry.total === maxVal
                  ? "oklch(var(--primary))"
                  : "oklch(var(--accent))"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function CategoryBreakdown({
  expenses,
  total,
}: { expenses: Expense[]; total: number }) {
  const categories = useMemo(() => {
    const totals: Partial<Record<Category, number>> = {};
    for (const e of expenses) {
      totals[e.category] = (totals[e.category] ?? 0) + e.amount;
    }
    return Object.entries(totals)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .map(([cat, amount]) => ({
        category: cat as Category,
        amount: amount as number,
        pct: total > 0 ? Math.round(((amount as number) / total) * 100) : 0,
      }));
  }, [expenses, total]);

  if (categories.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-6">
        No spending data yet
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map(({ category, amount, pct }) => (
        <div
          key={category}
          className="flex items-center gap-3"
          data-ocid="category-row"
        >
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
            style={{ background: `${getCategoryColor(category)}22` }}
          >
            {getCategoryIcon(category)}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground">
                {getCategoryLabel(category)}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{pct}%</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatCurrency(amount)}
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: getCategoryColor(category),
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function csvExport(expenses: Expense[], month: number, year: number) {
  const headers = "Date,Category,Amount (INR),Note\n";
  const rows = [...expenses]
    .sort((a, b) => Number(b.date - a.date))
    .map((e) => {
      const ms = Number(e.date / 1_000_000n);
      const d = new Date(ms).toLocaleDateString("en-IN");
      return `${d},${getCategoryLabel(e.category)},${e.amount},"${e.note ?? ""}"`;
    })
    .join("\n");
  const blob = new Blob([headers + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fintrack-${MONTHS[month - 1].toLowerCase()}-${year}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year] = useState(now.getFullYear());
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");

  const { data: expenses = [], isLoading } = useExpensesByMonth(month, year);
  const { data: budget } = useBudget();

  const totalSpent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses],
  );
  const totalBudget = budget?.totalAmount ?? 0;
  const status =
    totalBudget > 0 ? getSpendingStatus(totalSpent, totalBudget) : "on-track";
  const savingsRate =
    totalBudget > 0
      ? Math.max(
          0,
          Math.round(((totalBudget - totalSpent) / totalBudget) * 100),
        )
      : 0;

  const filteredExpenses = useMemo(
    () =>
      filterCategory === "all"
        ? [...expenses].sort((a, b) => Number(b.date - a.date))
        : [...expenses]
            .filter((e) => e.category === filterCategory)
            .sort((a, b) => Number(b.date - a.date)),
    [expenses, filterCategory],
  );

  const usedCategories = useMemo(
    () => Array.from(new Set(expenses.map((e) => e.category))),
    [expenses],
  );

  return (
    <div className="flex flex-col" data-ocid="reports-page">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <h1 className="text-lg font-display font-bold text-foreground">
          Reports
        </h1>
        <p className="text-xs text-muted-foreground">
          Monthly spending overview
        </p>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Month selector */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide"
          data-ocid="month-selector"
        >
          {MONTHS.map((m, i) => (
            <button
              key={m}
              type="button"
              onClick={() => setMonth(i + 1)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-smooth border ${
                month === i + 1
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
              data-ocid={`month-${m.toLowerCase()}`}
            >
              {m}
            </button>
          ))}
        </motion.div>

        {/* Summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card className="rounded-2xl border-0 shadow-subtle">
            <CardContent className="p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">
                Total Spent
              </p>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-display font-bold text-foreground">
                  {formatCurrency(totalSpent)}
                </p>
              )}
              <div className="mt-2">
                <span
                  className={
                    status === "on-track"
                      ? "badge-success"
                      : status === "caution"
                        ? "badge-warning"
                        : "badge-alert"
                  }
                  style={{ fontSize: "0.65rem", padding: "2px 8px" }}
                >
                  {status === "on-track"
                    ? "Under Budget"
                    : status === "caution"
                      ? "Near Limit"
                      : "Over Budget"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-subtle">
            <CardContent className="p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">
                Savings Rate
              </p>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-display font-bold text-foreground">
                  {totalBudget > 0 ? `${savingsRate}%` : "—"}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {totalBudget > 0
                  ? `${formatCurrency(Math.max(0, totalBudget - totalSpent))} saved`
                  : "Set a budget first"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="daily-chart-card"
          >
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold text-foreground mb-4">
                Daily Spending — Last 14 Days
              </h2>
              {isLoading ? (
                <Skeleton className="h-36 w-full rounded-xl" />
              ) : (
                <DailyChart expenses={expenses} />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Category breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="category-breakdown-card"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground">
                  By Category
                </h2>
                <span className="text-xs text-muted-foreground">
                  {MONTHS[month - 1]} {year}
                </span>
              </div>
              {isLoading ? (
                <div className="space-y-3">
                  {(["s1", "s2", "s3"] as const).map((k) => (
                    <Skeleton key={k} className="h-12 rounded-xl" />
                  ))}
                </div>
              ) : (
                <CategoryBreakdown expenses={expenses} total={totalSpent} />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="transactions-card"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">
                  Transactions{" "}
                  <span className="text-muted-foreground font-normal">
                    ({filteredExpenses.length})
                  </span>
                </h2>
                {expenses.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => csvExport(expenses, month, year)}
                    className="rounded-xl h-8 text-xs gap-1.5"
                    data-ocid="export-csv-btn"
                  >
                    Export CSV
                  </Button>
                )}
              </div>

              {/* Category filter */}
              {usedCategories.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1">
                  <button
                    type="button"
                    onClick={() => setFilterCategory("all")}
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-smooth ${
                      filterCategory === "all"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted border-border text-muted-foreground hover:border-primary/50"
                    }`}
                    data-ocid="filter-all"
                  >
                    All
                  </button>
                  {usedCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilterCategory(cat)}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-smooth ${
                        filterCategory === cat
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted border-border text-muted-foreground hover:border-primary/50"
                      }`}
                      data-ocid={`filter-${cat.toLowerCase()}`}
                    >
                      <span>{getCategoryIcon(cat)}</span>
                      {getCategoryLabel(cat)}
                    </button>
                  ))}
                </div>
              )}

              {isLoading ? (
                <div className="space-y-3">
                  {(["t1", "t2", "t3", "t4"] as const).map((k) => (
                    <Skeleton key={k} className="h-14 rounded-xl" />
                  ))}
                </div>
              ) : filteredExpenses.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="transactions-empty"
                >
                  <p className="text-2xl mb-2">📋</p>
                  <p className="text-sm">
                    No transactions for {MONTHS[month - 1]}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredExpenses.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-center justify-between py-3"
                      data-ocid="transaction-row"
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
                          <p className="text-sm font-medium text-foreground truncate">
                            {exp.note || getCategoryLabel(exp.category)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatShortDate(exp.date)} ·{" "}
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
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary stats */}
        {!isLoading && expenses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="rounded-2xl border-0 shadow-subtle">
              <CardContent className="p-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Avg/Day
                  </p>
                  <p className="text-sm font-display font-bold text-foreground mt-0.5">
                    {formatCurrency(
                      Math.round(
                        totalSpent / new Date(year, month, 0).getDate(),
                      ),
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Transactions
                  </p>
                  <p className="text-sm font-display font-bold text-foreground mt-0.5">
                    {expenses.length}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Largest
                  </p>
                  <p className="text-sm font-display font-bold text-foreground mt-0.5">
                    {formatCurrency(Math.max(...expenses.map((e) => e.amount)))}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* No budget CTA */}
        {!isLoading && !budget && (
          <div className="rounded-2xl border border-dashed border-primary/30 p-4 bg-primary/5 text-center">
            <p className="text-sm font-medium text-foreground">
              💡 Set a budget to see savings rate
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Go to Profile → Monthly Budget
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
