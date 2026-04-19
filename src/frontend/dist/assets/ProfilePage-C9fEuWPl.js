import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, l as useInternetIdentity, m as useGetUserProfile, P as ProfessionStatus, F as FinancialGoal, d as useBudget, n as useSetBudget, S as Skeleton, o as useGoals, p as useCreateGoal, q as useDeleteGoal, s as useUpdateGoalProgress, t as useBadges, B as BadgeType, h as ue } from "./index-Cx3uc6F2.js";
import { B as Button } from "./button-BbigOgdv.js";
import { C as Card, a as CardContent, f as formatCurrency } from "./formatters-Cun4OcDU.js";
import { P as Primitive, L as Label, I as Input } from "./label-DLZkNDPs.js";
import { m as motion } from "./proxy-DQTY6X4E.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const CATEGORY_KEYS = [
  "food",
  "transport",
  "shopping",
  "entertainment",
  "health",
  "bills",
  "other"
];
const categoryLabels = {
  food: "🍽️ Food",
  transport: "🚗 Transport",
  shopping: "🛍️ Shopping",
  entertainment: "🎬 Entertainment",
  health: "💊 Health",
  bills: "💡 Bills",
  other: "📦 Other"
};
const badgeInfo = {
  [BadgeType.MonthlyOnTrack]: {
    emoji: "🎯",
    label: "Monthly Champion",
    desc: "Stayed within budget for a full month"
  },
  [BadgeType.FirstBudget]: {
    emoji: "💰",
    label: "Budget Setter",
    desc: "Set your first monthly budget"
  },
  [BadgeType.LoggingStreak7]: {
    emoji: "🔥",
    label: "7-Day Streak",
    desc: "Logged expenses for 7 days straight"
  }
};
const professionLabels = {
  [ProfessionStatus.Student]: "🎓 Student",
  [ProfessionStatus.Employee]: "💼 Employee",
  [ProfessionStatus.Entrepreneur]: "🚀 Entrepreneur",
  [ProfessionStatus.BusinessMan]: "🏢 Business Owner",
  [ProfessionStatus.Freelancer]: "💻 Freelancer",
  [ProfessionStatus.Other]: "✨ Other"
};
const goalLabels = {
  [FinancialGoal.SaveForEmergencies]: "🛡️ Emergency Fund",
  [FinancialGoal.PayOffDebt]: "📉 Pay Off Debt",
  [FinancialGoal.BuildWealth]: "📈 Build Wealth",
  [FinancialGoal.TrackSpending]: "🔍 Track Spending",
  [FinancialGoal.SaveForPurchase]: "🛒 Save for Purchase",
  [FinancialGoal.Other]: "🌟 Other Goals"
};
function generateGoalId() {
  return `goal_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function BudgetSetup() {
  const { data: budget, isLoading } = useBudget();
  const { mutateAsync: setBudget, isPending } = useSetBudget();
  const [total, setTotal] = reactExports.useState(String((budget == null ? void 0 : budget.totalAmount) ?? "50000"));
  const [limits, setLimits] = reactExports.useState(() => {
    if (!budget) return {};
    const init = {};
    for (const k of CATEGORY_KEYS) {
      const v = budget.categoryLimits[k];
      if (v !== void 0) init[k] = String(v);
    }
    return init;
  });
  async function handleSave() {
    const parsedTotal = Number.parseFloat(total);
    if (Number.isNaN(parsedTotal) || parsedTotal <= 0) {
      ue.error("Enter a valid total budget");
      return;
    }
    const categoryLimits = {};
    for (const k of CATEGORY_KEYS) {
      const v = Number.parseFloat(limits[k] ?? "");
      if (!Number.isNaN(v) && v > 0) {
        categoryLimits[k] = v;
      }
    }
    try {
      await setBudget({ totalAmount: parsedTotal, categoryLimits });
      ue.success("Budget saved! 🎉");
    } catch {
      ue.error("Failed to save budget");
    }
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Monthly Total (₹)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 font-display font-bold text-lg text-primary", children: "₹" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            inputMode: "numeric",
            value: total,
            onChange: (e) => setTotal(e.target.value),
            className: "pl-9 h-12 rounded-xl text-lg font-semibold bg-muted/40",
            placeholder: "50000",
            "data-ocid": "total-budget-input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: [
        "Category limits",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal normal-case", children: "(optional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: CATEGORY_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: categoryLabels[k] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            inputMode: "numeric",
            placeholder: "No limit",
            value: limits[k] ?? "",
            onChange: (e) => setLimits((prev) => ({ ...prev, [k]: e.target.value })),
            className: "h-9 rounded-lg text-sm bg-muted/40",
            "data-ocid": `limit-${k}-input`
          }
        )
      ] }, k)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleSave,
        disabled: isPending,
        className: "w-full h-12 rounded-xl font-semibold",
        "data-ocid": "save-budget-btn",
        children: isPending ? "Saving…" : "Save Budget"
      }
    )
  ] });
}
function SavingsGoals() {
  const { data: goals = [], isLoading } = useGoals();
  const { mutateAsync: createGoal, isPending: creating } = useCreateGoal();
  const { mutateAsync: deleteGoal } = useDeleteGoal();
  const { mutateAsync: updateProgress, isPending: updating } = useUpdateGoalProgress();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [target, setTarget] = reactExports.useState("");
  const [current, setCurrent] = reactExports.useState("0");
  const [targetDate, setTargetDate] = reactExports.useState(
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0]
  );
  const [addAmounts, setAddAmounts] = reactExports.useState({});
  async function handleCreate() {
    const parsedTarget = Number.parseFloat(target);
    const parsedCurrent = Number.parseFloat(current);
    if (!name.trim() || Number.isNaN(parsedTarget) || parsedTarget <= 0) {
      ue.error("Enter a goal name and target amount");
      return;
    }
    try {
      await createGoal({
        id: generateGoalId(),
        name: name.trim(),
        targetAmount: parsedTarget,
        currentAmount: Number.isNaN(parsedCurrent) ? 0 : parsedCurrent,
        targetDate: BigInt(new Date(targetDate).getTime()) * 1000000n
      });
      ue.success("Goal created! 🌟");
      setShowForm(false);
      setName("");
      setTarget("");
      setCurrent("0");
    } catch {
      ue.error("Failed to create goal");
    }
  }
  async function handleAddProgress(id) {
    const add = Number.parseFloat(addAmounts[id] ?? "");
    if (Number.isNaN(add) || add <= 0) return;
    try {
      await updateProgress({ id, addAmount: add });
      ue.success(`Added ${formatCurrency(add)} 💪`);
      setAddAmounts((prev) => ({ ...prev, [id]: "" }));
    } catch {
      ue.error("Failed to update goal");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["g1", "g2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, k)) }) : goals.length === 0 && !showForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", "data-ocid": "goals-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-10 h-10 mx-auto opacity-30 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No savings goals yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Create a goal to track your progress!" })
    ] }) : goals.map((goal) => {
      const pct = goal.targetAmount > 0 ? Math.min(
        Math.round(goal.currentAmount / goal.targetAmount * 100),
        100
      ) : 0;
      const isComplete = pct >= 100;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `rounded-xl border shadow-xs transition-smooth ${isComplete ? "border-success/40 bg-success/5" : "border-border/60 bg-card"}`,
          "data-ocid": "goal-card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  isComplete && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🎉" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: goal.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  formatCurrency(goal.currentAmount),
                  " of",
                  " ",
                  formatCurrency(goal.targetAmount)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: pct >= 100 ? "badge-success" : pct >= 50 ? "badge-warning" : "badge-alert",
                    style: { fontSize: "0.7rem", padding: "2px 8px" },
                    children: [
                      pct,
                      "%"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => deleteGoal(goal.id),
                    className: "text-muted-foreground hover:text-destructive transition-colors p-1",
                    "aria-label": "Delete goal",
                    "data-ocid": "delete-goal-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-2" }),
            !isComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  inputMode: "numeric",
                  placeholder: "Add ₹",
                  value: addAmounts[goal.id] ?? "",
                  onChange: (e) => setAddAmounts((prev) => ({
                    ...prev,
                    [goal.id]: e.target.value
                  })),
                  className: "h-9 rounded-lg text-sm flex-1 bg-muted/40",
                  "data-ocid": "add-progress-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: () => handleAddProgress(goal.id),
                  disabled: updating,
                  className: "rounded-lg h-9 px-3",
                  "data-ocid": "add-progress-btn",
                  children: "Add"
                }
              )
            ] })
          ] })
        },
        goal.id
      );
    }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl border-2 border-primary/30 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "New Savings Goal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Goal name (e.g. New Laptop, Emergency Fund)",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "rounded-lg bg-card",
            "data-ocid": "goal-name-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              inputMode: "numeric",
              placeholder: "Target ₹",
              value: target,
              onChange: (e) => setTarget(e.target.value),
              className: "rounded-lg bg-card",
              "data-ocid": "goal-target-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              inputMode: "numeric",
              placeholder: "Saved so far ₹",
              value: current,
              onChange: (e) => setCurrent(e.target.value),
              className: "rounded-lg bg-card",
              "data-ocid": "goal-current-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: targetDate,
            onChange: (e) => setTargetDate(e.target.value),
            className: "rounded-lg bg-card",
            "data-ocid": "goal-date-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleCreate,
            disabled: creating,
            className: "flex-1 rounded-lg h-10 font-semibold",
            "data-ocid": "create-goal-btn",
            children: creating ? "Creating…" : "Create Goal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            onClick: () => setShowForm(false),
            className: "rounded-lg h-10",
            children: "Cancel"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        className: "w-full h-11 rounded-xl gap-2 border-dashed",
        onClick: () => setShowForm(true),
        "data-ocid": "add-goal-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          "New Savings Goal"
        ]
      }
    )
  ] });
}
function Achievements() {
  const { data: badges = [], isLoading } = useBadges();
  const allBadgeTypes = Object.values(BadgeType);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: isLoading ? ["b1", "b2", "b3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) : allBadgeTypes.map((type) => {
    const earned = badges.some((b) => b.badgeType === type);
    const info = badgeInfo[type];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center gap-3 p-3.5 rounded-xl transition-smooth ${earned ? "bg-primary/6 border border-primary/20" : "bg-muted/50 opacity-60"}`,
        "data-ocid": `badge-${type.toLowerCase()}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-2xl ${!earned ? "grayscale" : ""}`, children: info.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: info.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: info.desc })
          ] }),
          earned && /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-primary shrink-0" })
        ]
      },
      type
    );
  }) });
}
function ProfilePage() {
  var _a, _b, _c;
  const { clear } = useInternetIdentity();
  const { data: userProfile } = useGetUserProfile();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "profile-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-card border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: "Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Budget, goals & achievements" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.04 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "rounded-2xl border-0 shadow-subtle",
              "data-ocid": "account-card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-success/15 flex items-center justify-center text-lg shrink-0", children: "👤" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Signed In" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Data secured on-chain ✓" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "shrink-0 rounded-xl gap-2 h-9 text-sm",
                      onClick: clear,
                      "data-ocid": "logout-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
                        "Sign Out"
                      ]
                    }
                  )
                ] }),
                ((userProfile == null ? void 0 : userProfile.professionStatus) || (((_a = userProfile == null ? void 0 : userProfile.financialGoals) == null ? void 0 : _a.length) ?? 0) > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/60 pt-3 space-y-2", children: [
                  (userProfile == null ? void 0 : userProfile.professionStatus) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Profession:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: professionLabels[userProfile.professionStatus] })
                  ] }),
                  (((_b = userProfile == null ? void 0 : userProfile.financialGoals) == null ? void 0 : _b.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: (_c = userProfile == null ? void 0 : userProfile.financialGoals) == null ? void 0 : _c.map((goal) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary border border-primary/20",
                      children: goalLabels[goal]
                    },
                    goal
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
          transition: { delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "rounded-2xl border-0 shadow-subtle",
              "data-ocid": "budget-setup-card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💰" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Monthly Budget" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(BudgetSetup, {})
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
          transition: { delay: 0.16 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "rounded-2xl border-0 shadow-subtle",
              "data-ocid": "savings-goals-card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🎯" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Savings Goals" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SavingsGoals, {})
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
          transition: { delay: 0.22 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "rounded-2xl border-0 shadow-subtle",
              "data-ocid": "achievements-card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🏆" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Achievements" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Achievements, {})
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.28 },
          className: "text-center space-y-1.5 py-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-display font-bold text-primary", children: "FinTrack" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your calm, stress-free finance companion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              ".",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                  className: "underline underline-offset-2 hover:text-foreground transition-colors",
                  target: "_blank",
                  rel: "noreferrer",
                  children: "Built with love using caffeine.ai"
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  ProfilePage as default
};
