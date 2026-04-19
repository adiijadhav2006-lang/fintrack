import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Category } from "../backend";
import { useAddExpense } from "../hooks/useQueries";
import {
  dateToTimestamp,
  getCategoryIcon,
  getCategoryLabel,
} from "../lib/formatters";

const CATEGORIES = Object.values(Category);

const categoryBg: Record<
  Category,
  { background: string; borderColor: string }
> = {
  [Category.Food]: {
    background: "oklch(0.58 0.18 148 / 0.08)",
    borderColor: "oklch(0.58 0.18 148 / 0.25)",
  },
  [Category.Transport]: {
    background: "oklch(0.44 0.16 183 / 0.08)",
    borderColor: "oklch(0.44 0.16 183 / 0.25)",
  },
  [Category.Shopping]: {
    background: "oklch(0.7 0.16 82 / 0.08)",
    borderColor: "oklch(0.7 0.16 82 / 0.25)",
  },
  [Category.Entertainment]: {
    background: "oklch(0.54 0.22 22 / 0.08)",
    borderColor: "oklch(0.54 0.22 22 / 0.25)",
  },
  [Category.Health]: {
    background: "oklch(0.56 0.18 163 / 0.08)",
    borderColor: "oklch(0.56 0.18 163 / 0.25)",
  },
  [Category.Bills]: {
    background: "oklch(0.5 0.14 220 / 0.08)",
    borderColor: "oklch(0.5 0.14 220 / 0.25)",
  },
  [Category.Other]: {
    background: "oklch(0.55 0.05 250 / 0.08)",
    borderColor: "oklch(0.55 0.05 250 / 0.2)",
  },
};

const quickAmounts = [50, 100, 200, 500, 1000, 2000];

function generateId(): string {
  return `exp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function AddExpensePage() {
  const navigate = useNavigate();
  const { mutateAsync: addExpense, isPending } = useAddExpense();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>(Category.Food);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const parsedAmount = Number.parseFloat(amount);
  const isValidAmount = !Number.isNaN(parsedAmount) && parsedAmount > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidAmount) {
      toast.error("Please enter a valid amount");
      return;
    }
    try {
      await addExpense({
        id: generateId(),
        amount: parsedAmount,
        category,
        note: note.trim() || null,
        date: dateToTimestamp(new Date(date)),
      });
      toast.success(`₹${parsedAmount.toLocaleString("en-IN")} logged! 🎉`, {
        description: `Added to ${getCategoryLabel(category)}`,
      });
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  }

  return (
    <div className="flex flex-col" data-ocid="add-expense-page">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <h1 className="text-lg font-display font-bold text-foreground">
          Add Expense
        </h1>
        <p className="text-xs text-muted-foreground">
          Quick, easy — just the essentials
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
        {/* Amount card — most prominent */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="amount-card"
          >
            <CardContent className="p-5 space-y-4">
              <div>
                <Label
                  htmlFor="amount"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Amount <span className="text-destructive">*</span>
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display font-bold text-2xl text-primary">
                    ₹
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 text-3xl font-display font-bold h-16 rounded-xl border-input focus-visible:ring-primary bg-muted/40"
                    autoFocus
                    data-ocid="amount-input"
                  />
                  {isValidAmount && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
                  )}
                </div>
              </div>

              {/* Quick amounts */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Quick add</p>
                <div className="flex gap-2 flex-wrap">
                  {quickAmounts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setAmount(String(q))}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium border transition-smooth",
                        amount === String(q)
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-muted border-border text-muted-foreground hover:border-primary/60 hover:text-primary",
                      )}
                      data-ocid={`quick-amount-${q}`}
                    >
                      ₹{q.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="category-card"
          >
            <CardContent className="p-5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Category
              </Label>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    style={
                      category !== cat
                        ? {
                            backgroundColor: categoryBg[cat].background,
                            borderColor: categoryBg[cat].borderColor,
                          }
                        : undefined
                    }
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-smooth min-h-[72px] justify-center",
                      category === cat
                        ? "border-primary bg-primary/8 shadow-sm scale-[1.02]"
                        : "hover:border-primary/30 hover:scale-[1.01]",
                    )}
                    data-ocid={`category-${cat.toLowerCase()}`}
                  >
                    <span className="text-xl leading-none">
                      {getCategoryIcon(cat)}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-semibold leading-tight text-center",
                        category === cat ? "text-primary" : "text-foreground",
                      )}
                    >
                      {getCategoryLabel(cat)}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Note + Date */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
        >
          <Card
            className="rounded-2xl border-0 shadow-subtle"
            data-ocid="details-card"
          >
            <CardContent className="p-5 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="note"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Note{" "}
                  <span className="text-muted-foreground font-normal normal-case">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="note"
                  placeholder="e.g. Coffee with team, Grab to office..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="rounded-xl resize-none border-input focus-visible:ring-primary bg-muted/40"
                  data-ocid="note-input"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl border-input focus-visible:ring-primary bg-muted/40"
                  data-ocid="date-input"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <Button
            type="submit"
            disabled={isPending || !isValidAmount}
            className="w-full h-14 rounded-2xl text-base font-semibold transition-smooth"
            data-ocid="save-expense-btn"
          >
            {isPending
              ? "Saving…"
              : isValidAmount
                ? `Save ₹${parsedAmount.toLocaleString("en-IN")} → ${getCategoryLabel(category)}`
                : "Enter an amount to continue"}
          </Button>
          {!isValidAmount && (
            <p className="text-xs text-center text-muted-foreground">
              Only the amount is required — everything else is optional
            </p>
          )}
        </motion.div>
      </form>
    </div>
  );
}
