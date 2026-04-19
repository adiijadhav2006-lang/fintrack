import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { FinancialGoal, ProfessionStatus } from "../backend";
import { useSaveUserProfile } from "../hooks/useQueries";

const professions: { value: ProfessionStatus; emoji: string; label: string }[] =
  [
    { value: ProfessionStatus.Student, emoji: "🎓", label: "Student" },
    { value: ProfessionStatus.Employee, emoji: "💼", label: "Employee" },
    {
      value: ProfessionStatus.Entrepreneur,
      emoji: "🚀",
      label: "Entrepreneur",
    },
    {
      value: ProfessionStatus.BusinessMan,
      emoji: "🏢",
      label: "Business Owner",
    },
    { value: ProfessionStatus.Freelancer, emoji: "💻", label: "Freelancer" },
    { value: ProfessionStatus.Other, emoji: "✨", label: "Other" },
  ];

const goals: {
  value: FinancialGoal;
  emoji: string;
  label: string;
  desc: string;
}[] = [
  {
    value: FinancialGoal.SaveForEmergencies,
    emoji: "🛡️",
    label: "Emergency Fund",
    desc: "Build a safety net",
  },
  {
    value: FinancialGoal.PayOffDebt,
    emoji: "📉",
    label: "Pay Off Debt",
    desc: "Get financially free",
  },
  {
    value: FinancialGoal.BuildWealth,
    emoji: "📈",
    label: "Build Wealth",
    desc: "Grow my savings",
  },
  {
    value: FinancialGoal.TrackSpending,
    emoji: "🔍",
    label: "Track Spending",
    desc: "Know where money goes",
  },
  {
    value: FinancialGoal.SaveForPurchase,
    emoji: "🛒",
    label: "Save for Purchase",
    desc: "Work toward a goal",
  },
  {
    value: FinancialGoal.Other,
    emoji: "🌟",
    label: "Something Else",
    desc: "Define my own path",
  },
];

interface StepProps {
  step: number;
  total: number;
}

const STEP_KEYS = ["dot-0", "dot-1", "dot-2", "dot-3"] as const;

function StepIndicator({ step, total }: StepProps) {
  return (
    <div className="flex items-center gap-2">
      {STEP_KEYS.slice(0, total).map((key, i) => (
        <div
          key={key}
          className={`h-1.5 rounded-full transition-smooth ${
            i < step
              ? "w-8 bg-primary"
              : i === step
                ? "w-8 bg-primary/60"
                : "w-4 bg-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedProfession, setSelectedProfession] =
    useState<ProfessionStatus | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<FinancialGoal[]>([]);

  const { mutateAsync: saveProfile, isPending } = useSaveUserProfile();

  function toggleGoal(goal: FinancialGoal) {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    );
  }

  async function handleFinish() {
    try {
      await saveProfile({
        professionStatus: selectedProfession,
        financialGoals: selectedGoals.length > 0 ? selectedGoals : null,
        onboardingCompleted: true,
      });
    } catch {
      toast.error("Couldn't save your profile — please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-background overflow-y-auto"
      data-ocid="onboarding-page"
    >
      <div className="flex flex-col min-h-full max-w-sm mx-auto w-full px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Step {step + 1} of 2
            </p>
            <StepIndicator step={step} total={2} />
          </div>
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-xl">💰</span>
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-profession"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="space-y-6"
              >
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-display font-bold text-foreground leading-tight">
                    What best describes you?
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We'll personalize FinTrack to fit your lifestyle.
                  </p>
                </div>

                <div
                  className="grid grid-cols-2 gap-3"
                  data-ocid="profession-grid"
                >
                  {professions.map(({ value, emoji, label }) => {
                    const selected = selectedProfession === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSelectedProfession(value)}
                        data-ocid={`profession-${value.toLowerCase()}`}
                        className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-smooth text-center ${
                          selected
                            ? "border-primary bg-primary/8 shadow-elevated"
                            : "border-border bg-card hover:border-primary/40 hover:bg-primary/4"
                        }`}
                      >
                        {selected && (
                          <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-primary" />
                        )}
                        <span className="text-3xl">{emoji}</span>
                        <span
                          className={`text-sm font-semibold leading-tight ${
                            selected ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-goals"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="space-y-6"
              >
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-display font-bold text-foreground leading-tight">
                    What are your financial goals?
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Select all that apply — we'll help you stay on track.
                  </p>
                </div>

                <div className="space-y-2.5" data-ocid="goals-grid">
                  {goals.map(({ value, emoji, label, desc }) => {
                    const selected = selectedGoals.includes(value);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => toggleGoal(value)}
                        data-ocid={`goal-${value.toLowerCase()}`}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-smooth text-left ${
                          selected
                            ? "border-primary bg-primary/8 shadow-subtle"
                            : "border-border bg-card hover:border-primary/40 hover:bg-primary/4"
                        }`}
                      >
                        <span className="text-2xl shrink-0">{emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-sm font-semibold ${
                              selected ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {desc}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-smooth ${
                            selected
                              ? "border-primary bg-primary"
                              : "border-border"
                          }`}
                        >
                          {selected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="pt-8 space-y-3">
          {step === 0 && (
            <Button
              className="w-full h-13 text-base font-semibold rounded-2xl"
              onClick={() => setStep(1)}
              disabled={!selectedProfession}
              data-ocid="next-btn"
            >
              Next →
            </Button>
          )}

          {step === 1 && (
            <>
              <Button
                className="w-full h-13 text-base font-semibold rounded-2xl shadow-elevated gap-2"
                onClick={handleFinish}
                disabled={isPending || selectedGoals.length === 0}
                data-ocid="finish-btn"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Start Tracking 🚀"
                )}
              </Button>
              <Button
                variant="ghost"
                className="w-full h-11 rounded-2xl text-sm text-muted-foreground"
                onClick={() => setStep(0)}
                disabled={isPending}
                data-ocid="back-btn"
              >
                ← Back
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
