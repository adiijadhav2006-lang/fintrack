import { j as jsxRuntimeExports, a as cn, e as useNavigate, f as useAddExpense, r as reactExports, C as Category, h as ue } from "./index-Cx3uc6F2.js";
import { B as Button } from "./button-BbigOgdv.js";
import { C as Card, a as CardContent, g as getCategoryIcon, b as getCategoryLabel, e as dateToTimestamp } from "./formatters-Cun4OcDU.js";
import { L as Label, I as Input } from "./label-DLZkNDPs.js";
import { m as motion } from "./proxy-DQTY6X4E.js";
import { C as CircleCheck } from "./circle-check-BhWjxO8j.js";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const CATEGORIES = Object.values(Category);
const categoryBg = {
  [Category.Food]: {
    background: "oklch(0.58 0.18 148 / 0.08)",
    borderColor: "oklch(0.58 0.18 148 / 0.25)"
  },
  [Category.Transport]: {
    background: "oklch(0.44 0.16 183 / 0.08)",
    borderColor: "oklch(0.44 0.16 183 / 0.25)"
  },
  [Category.Shopping]: {
    background: "oklch(0.7 0.16 82 / 0.08)",
    borderColor: "oklch(0.7 0.16 82 / 0.25)"
  },
  [Category.Entertainment]: {
    background: "oklch(0.54 0.22 22 / 0.08)",
    borderColor: "oklch(0.54 0.22 22 / 0.25)"
  },
  [Category.Health]: {
    background: "oklch(0.56 0.18 163 / 0.08)",
    borderColor: "oklch(0.56 0.18 163 / 0.25)"
  },
  [Category.Bills]: {
    background: "oklch(0.5 0.14 220 / 0.08)",
    borderColor: "oklch(0.5 0.14 220 / 0.25)"
  },
  [Category.Other]: {
    background: "oklch(0.55 0.05 250 / 0.08)",
    borderColor: "oklch(0.55 0.05 250 / 0.2)"
  }
};
const quickAmounts = [50, 100, 200, 500, 1e3, 2e3];
function generateId() {
  return `exp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function AddExpensePage() {
  const navigate = useNavigate();
  const { mutateAsync: addExpense, isPending } = useAddExpense();
  const [amount, setAmount] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(Category.Food);
  const [note, setNote] = reactExports.useState("");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const parsedAmount = Number.parseFloat(amount);
  const isValidAmount = !Number.isNaN(parsedAmount) && parsedAmount > 0;
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValidAmount) {
      ue.error("Please enter a valid amount");
      return;
    }
    try {
      await addExpense({
        id: generateId(),
        amount: parsedAmount,
        category,
        note: note.trim() || null,
        date: dateToTimestamp(new Date(date))
      });
      ue.success(`₹${parsedAmount.toLocaleString("en-IN")} logged! 🎉`, {
        description: `Added to ${getCategoryLabel(category)}`
      });
      navigate({ to: "/" });
    } catch {
      ue.error("Failed to save. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "add-expense-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-card border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: "Add Expense" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Quick, easy — just the essentials" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "rounded-2xl border-0 shadow-subtle",
              "data-ocid": "amount-card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "amount",
                      className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                      children: [
                        "Amount ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 font-display font-bold text-2xl text-primary", children: "₹" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "amount",
                        type: "number",
                        inputMode: "decimal",
                        placeholder: "0",
                        value: amount,
                        onChange: (e) => setAmount(e.target.value),
                        className: "pl-10 text-3xl font-display font-bold h-16 rounded-xl border-input focus-visible:ring-primary bg-muted/40",
                        autoFocus: true,
                        "data-ocid": "amount-input"
                      }
                    ),
                    isValidAmount && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-success" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Quick add" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: quickAmounts.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setAmount(String(q)),
                      className: cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium border transition-smooth",
                        amount === String(q) ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-muted border-border text-muted-foreground hover:border-primary/60 hover:text-primary"
                      ),
                      "data-ocid": `quick-amount-${q}`,
                      children: [
                        "₹",
                        q.toLocaleString("en-IN")
                      ]
                    },
                    q
                  )) })
                ] })
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "rounded-2xl border-0 shadow-subtle",
              "data-ocid": "category-card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 mt-3", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setCategory(cat),
                    style: category !== cat ? {
                      backgroundColor: categoryBg[cat].background,
                      borderColor: categoryBg[cat].borderColor
                    } : void 0,
                    className: cn(
                      "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-smooth min-h-[72px] justify-center",
                      category === cat ? "border-primary bg-primary/8 shadow-sm scale-[1.02]" : "hover:border-primary/30 hover:scale-[1.01]"
                    ),
                    "data-ocid": `category-${cat.toLowerCase()}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl leading-none", children: getCategoryIcon(cat) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: cn(
                            "text-[10px] font-semibold leading-tight text-center",
                            category === cat ? "text-primary" : "text-foreground"
                          ),
                          children: getCategoryLabel(cat)
                        }
                      )
                    ]
                  },
                  cat
                )) })
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.14 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "rounded-2xl border-0 shadow-subtle",
              "data-ocid": "details-card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "note",
                      className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                      children: [
                        "Note",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal normal-case", children: "(optional)" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "note",
                      placeholder: "e.g. Coffee with team, Grab to office...",
                      value: note,
                      onChange: (e) => setNote(e.target.value),
                      rows: 2,
                      className: "rounded-xl resize-none border-input focus-visible:ring-primary bg-muted/40",
                      "data-ocid": "note-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "date",
                      className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                      children: "Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "date",
                      type: "date",
                      value: date,
                      onChange: (e) => setDate(e.target.value),
                      className: "rounded-xl border-input focus-visible:ring-primary bg-muted/40",
                      "data-ocid": "date-input"
                    }
                  )
                ] })
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "space-y-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: isPending || !isValidAmount,
                className: "w-full h-14 rounded-2xl text-base font-semibold transition-smooth",
                "data-ocid": "save-expense-btn",
                children: isPending ? "Saving…" : isValidAmount ? `Save ₹${parsedAmount.toLocaleString("en-IN")} → ${getCategoryLabel(category)}` : "Enter an amount to continue"
              }
            ),
            !isValidAmount && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "Only the amount is required — everything else is optional" })
          ]
        }
      )
    ] })
  ] });
}
export {
  AddExpensePage as default
};
