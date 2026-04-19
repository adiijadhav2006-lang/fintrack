import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Award, LogOut, Plus, Target, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { BadgeType } from "../backend";
import type { CategoryLimits } from "../backend";
import {
  useBadges,
  useBudget,
  useCreateGoal,
  useDeleteGoal,
  useGetUserProfile,
  useGoals,
  useSetBudget,
  useUpdateGoalProgress,
} from "../hooks/useQueries";
import { formatCurrency } from "../lib/formatters";
import { FinancialGoal, ProfessionStatus } from "../types";

const CATEGORY_KEYS: Array<keyof CategoryLimits> = [
  "food",
  "transport",
  "shopping",
  "entertainment",
  "health",
  "bills",
  "other",
];

const categoryLabels: Record<keyof CategoryLimits, string> = {
  food: "🍽️ Food",
  transport: "🚗 Transport",
  shopping: "🛍️ Shopping",
  entertainment: "🎬 Entertainment",
  health: "💊 Health",
  bills: "💡 Bills",
  other: "📦 Other",
};

const badgeInfo: Record<
  BadgeType,
  { emoji: string; label: string; desc: string }
> = {
  [BadgeType.MonthlyOnTrack]: {
    emoji: "🎯",
    label: "Monthly Champion",
    desc: "Stayed within budget for a full month",
  },
  [BadgeType.FirstBudget]: {
    emoji: "💰",
    label: "Budget Setter",
    desc: "Set your first monthly budget",
  },
  [BadgeType.LoggingStreak7]: {
    emoji: "🔥",
    label: "7-Day Streak",
    desc: "Logged expenses for 7 days straight",
  },
};

const professionLabels: Record<ProfessionStatus, string> = {
  [ProfessionStatus.Student]: "🎓 Student",
  [ProfessionStatus.Employee]: "💼 Employee",
  [ProfessionStatus.Entrepreneur]: "🚀 Entrepreneur",
  [ProfessionStatus.BusinessMan]: "🏢 Business Owner",
  [ProfessionStatus.Freelancer]: "💻 Freelancer",
  [ProfessionStatus.Other]: "✨ Other",
};

const goalLabels: Record<FinancialGoal, string> = {
  [FinancialGoal.SaveForEmergencies]: "🛡️ Emergency Fund",
  [FinancialGoal.PayOffDebt]: "📉 Pay Off Debt",
  [FinancialGoal.BuildWealth]: "📈 Build Wealth",
  [FinancialGoal.TrackSpending]: "🔍 Track Spending",
  [FinancialGoal.SaveForPurchase]: "🛒 Save for Purchase",
  [FinancialGoal.Other]: "🌟 Other Goals",
};

function generateGoalId(): string {
  return `goal_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function BudgetSetup() {
  const { data: budget, isLoading } = useBudget();
  const { mutateAsync: setBudget, isPending } = useSetBudget();

  const [total, setTotal] = useState(String(budget?.totalAmount ?? "50000"));
  const [limits, setLimits] = useState<
    Partial<Record<keyof CategoryLimits, string>>
  >(() => {
    if (!budget) return {};
    const init: Partial<Record<keyof CategoryLimits, string>> = {};
    for (const k of CATEGORY_KEYS) {
      const v = budget.categoryLimits[k];
      if (v !== undefined) init[k] = String(v);
    }
    return init;
  });

  async function handleSave() {
    const parsedTotal = Number.parseFloat(total);
    if (Number.isNaN(parsedTotal) || parsedTotal <= 0) {
      toast.error("Enter a valid total budget");
      return;
    }
    const categoryLimits: CategoryLimits = {};
    for (const k of CATEGORY_KEYS) {
      const v = Number.parseFloat(limits[k] ?? "");
      if (!Number.isNaN(v) && v > 0) {
        (categoryLimits as Record<string, number>)[k] = v;
      }
    }
    try {
      await setBudget({ totalAmount: parsedTotal, categoryLimits });
      toast.success("Budget saved! 🎉");
    } catch {
      toast.error("Failed to save budget");
    }
  }

  if (isLoading) return <Skeleton className="h-40 rounded-xl" />;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Monthly Total (₹)
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display font-bold text-lg text-primary">
            ₹
          </span>
          <Input
            type="number"
            inputMode="numeric"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="pl-9 h-12 rounded-xl text-lg font-semibold bg-muted/40"
            placeholder="50000"
            data-ocid="total-budget-input"
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Category limits{" "}
          <span className="text-muted-foreground font-normal normal-case">
            (optional)
          </span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORY_KEYS.map((k) => (
            <div key={k} className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                {categoryLabels[k]}
              </Label>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="No limit"
                value={limits[k] ?? ""}
                onChange={(e) =>
                  setLimits((prev) => ({ ...prev, [k]: e.target.value }))
                }
                className="h-9 rounded-lg text-sm bg-muted/40"
                data-ocid={`limit-${k}-input`}
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={isPending}
        className="w-full h-12 rounded-xl font-semibold"
        data-ocid="save-budget-btn"
      >
        {isPending ? "Saving…" : "Save Budget"}
      </Button>
    </div>
  );
}

function SavingsGoals() {
  const { data: goals = [], isLoading } = useGoals();
  const { mutateAsync: createGoal, isPending: creating } = useCreateGoal();
  const { mutateAsync: deleteGoal } = useDeleteGoal();
  const { mutateAsync: updateProgress, isPending: updating } =
    useUpdateGoalProgress();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("0");
  const [targetDate, setTargetDate] = useState(
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [addAmounts, setAddAmounts] = useState<Record<string, string>>({});

  async function handleCreate() {
    const parsedTarget = Number.parseFloat(target);
    const parsedCurrent = Number.parseFloat(current);
    if (!name.trim() || Number.isNaN(parsedTarget) || parsedTarget <= 0) {
      toast.error("Enter a goal name and target amount");
      return;
    }
    try {
      await createGoal({
        id: generateGoalId(),
        name: name.trim(),
        targetAmount: parsedTarget,
        currentAmount: Number.isNaN(parsedCurrent) ? 0 : parsedCurrent,
        targetDate: BigInt(new Date(targetDate).getTime()) * 1_000_000n,
      });
      toast.success("Goal created! 🌟");
      setShowForm(false);
      setName("");
      setTarget("");
      setCurrent("0");
    } catch {
      toast.error("Failed to create goal");
    }
  }

  async function handleAddProgress(id: string) {
    const add = Number.parseFloat(addAmounts[id] ?? "");
    if (Number.isNaN(add) || add <= 0) return;
    try {
      await updateProgress({ id, addAmount: add });
      toast.success(`Added ${formatCurrency(add)} 💪`);
      setAddAmounts((prev) => ({ ...prev, [id]: "" }));
    } catch {
      toast.error("Failed to update goal");
    }
  }

  return (
    <div className="space-y-3">
      {isLoading ? (
        <div className="space-y-3">
          {(["g1", "g2"] as const).map((k) => (
            <Skeleton key={k} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : goals.length === 0 && !showForm ? (
        <div className="text-center py-6" data-ocid="goals-empty">
          <Target className="w-10 h-10 mx-auto opacity-30 mb-3" />
          <p className="text-sm text-muted-foreground">No savings goals yet.</p>
          <p className="text-xs text-muted-foreground mt-1">
            Create a goal to track your progress!
          </p>
        </div>
      ) : (
        goals.map((goal) => {
          const pct =
            goal.targetAmount > 0
              ? Math.min(
                  Math.round((goal.currentAmount / goal.targetAmount) * 100),
                  100,
                )
              : 0;
          const isComplete = pct >= 100;

          return (
            <Card
              key={goal.id}
              className={`rounded-xl border shadow-xs transition-smooth ${
                isComplete
                  ? "border-success/40 bg-success/5"
                  : "border-border/60 bg-card"
              }`}
              data-ocid="goal-card"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      {isComplete && <span className="text-base">🎉</span>}
                      <p className="font-semibold text-foreground truncate">
                        {goal.name}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatCurrency(goal.currentAmount)} of{" "}
                      {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={
                        pct >= 100
                          ? "badge-success"
                          : pct >= 50
                            ? "badge-warning"
                            : "badge-alert"
                      }
                      style={{ fontSize: "0.7rem", padding: "2px 8px" }}
                    >
                      {pct}%
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteGoal(goal.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      aria-label="Delete goal"
                      data-ocid="delete-goal-btn"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Progress value={pct} className="h-2" />
                {!isComplete && (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="Add ₹"
                      value={addAmounts[goal.id] ?? ""}
                      onChange={(e) =>
                        setAddAmounts((prev) => ({
                          ...prev,
                          [goal.id]: e.target.value,
                        }))
                      }
                      className="h-9 rounded-lg text-sm flex-1 bg-muted/40"
                      data-ocid="add-progress-input"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddProgress(goal.id)}
                      disabled={updating}
                      className="rounded-lg h-9 px-3"
                      data-ocid="add-progress-btn"
                    >
                      Add
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      )}

      {showForm && (
        <Card className="rounded-xl border-2 border-primary/30 bg-primary/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground text-sm">
              New Savings Goal
            </h3>
            <div className="space-y-2">
              <Input
                placeholder="Goal name (e.g. New Laptop, Emergency Fund)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg bg-card"
                data-ocid="goal-name-input"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Target ₹"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="rounded-lg bg-card"
                  data-ocid="goal-target-input"
                />
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Saved so far ₹"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="rounded-lg bg-card"
                  data-ocid="goal-current-input"
                />
              </div>
              <Input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="rounded-lg bg-card"
                data-ocid="goal-date-input"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCreate}
                disabled={creating}
                className="flex-1 rounded-lg h-10 font-semibold"
                data-ocid="create-goal-btn"
              >
                {creating ? "Creating…" : "Create Goal"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowForm(false)}
                className="rounded-lg h-10"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        variant="outline"
        className="w-full h-11 rounded-xl gap-2 border-dashed"
        onClick={() => setShowForm(true)}
        data-ocid="add-goal-btn"
      >
        <Plus className="w-4 h-4" />
        New Savings Goal
      </Button>
    </div>
  );
}

function Achievements() {
  const { data: badges = [], isLoading } = useBadges();
  const allBadgeTypes = Object.values(BadgeType);

  return (
    <div className="space-y-2">
      {isLoading
        ? (["b1", "b2", "b3"] as const).map((k) => (
            <Skeleton key={k} className="h-16 rounded-xl" />
          ))
        : allBadgeTypes.map((type) => {
            const earned = badges.some((b) => b.badgeType === type);
            const info = badgeInfo[type];
            return (
              <div
                key={type}
                className={`flex items-center gap-3 p-3.5 rounded-xl transition-smooth ${
                  earned
                    ? "bg-primary/6 border border-primary/20"
                    : "bg-muted/50 opacity-60"
                }`}
                data-ocid={`badge-${type.toLowerCase()}`}
              >
                <span className={`text-2xl ${!earned ? "grayscale" : ""}`}>
                  {info.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {info.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {info.desc}
                  </p>
                </div>
                {earned && <Award className="w-4 h-4 text-primary shrink-0" />}
              </div>
            );
          })}
    </div>
  );
}

export default function ProfilePage() {
  const { clear } = useInternetIdentity();
  const { data: userProfile } = useGetUserProfile();

  return (
    <div className="flex flex-col" data-ocid="profile-page">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <h1 className="text-lg font-display font-bold text-foreground">
          Profile
        </h1>
        <p className="text-xs text-muted-foreground">
          Budget, goals & achievements
        </p>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Account card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="account-card"
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center text-lg shrink-0">
                    👤
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      Signed In
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Data secured on-chain ✓
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="shrink-0 rounded-xl gap-2 h-9 text-sm"
                  onClick={clear}
                  data-ocid="logout-btn"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </Button>
              </div>

              {/* Profession + Goals from onboarding */}
              {(userProfile?.professionStatus ||
                (userProfile?.financialGoals?.length ?? 0) > 0) && (
                <div className="border-t border-border/60 pt-3 space-y-2">
                  {userProfile?.professionStatus && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Profession:
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        {professionLabels[userProfile.professionStatus]}
                      </span>
                    </div>
                  )}
                  {(userProfile?.financialGoals?.length ?? 0) > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {userProfile?.financialGoals?.map((goal) => (
                        <span
                          key={goal}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary border border-primary/20"
                        >
                          {goalLabels[goal]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Budget Setup */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="budget-setup-card"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">💰</span>
                <h2 className="text-base font-semibold text-foreground">
                  Monthly Budget
                </h2>
              </div>
              <BudgetSetup />
            </CardContent>
          </Card>
        </motion.div>

        {/* Savings Goals */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="savings-goals-card"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                <h2 className="text-base font-semibold text-foreground">
                  Savings Goals
                </h2>
              </div>
              <SavingsGoals />
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="achievements-card"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <h2 className="text-base font-semibold text-foreground">
                  Achievements
                </h2>
              </div>
              <Achievements />
            </CardContent>
          </Card>
        </motion.div>

        {/* App info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="text-center space-y-1.5 py-4"
        >
          <p className="text-base font-display font-bold text-primary">
            FinTrack
          </p>
          <p className="text-xs text-muted-foreground">
            Your calm, stress-free finance companion
          </p>
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
        </motion.div>
      </div>
    </div>
  );
}
