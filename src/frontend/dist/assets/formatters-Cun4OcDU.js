import { j as jsxRuntimeExports, a as cn, C as Category } from "./index-Cx3uc6F2.js";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function formatShortDate(timestamp) {
  const ms = Number(timestamp / 1000000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short"
  }).format(new Date(ms));
}
function dateToTimestamp(date) {
  return BigInt(date.getTime()) * 1000000n;
}
function getCategoryIcon(category) {
  const icons = {
    [Category.Food]: "🍽️",
    [Category.Transport]: "🚗",
    [Category.Shopping]: "🛍️",
    [Category.Entertainment]: "🎬",
    [Category.Health]: "💊",
    [Category.Bills]: "💡",
    [Category.Other]: "📦"
  };
  return icons[category] ?? "📦";
}
function getCategoryColor(category) {
  const colors = {
    [Category.Food]: "oklch(0.58 0.18 148)",
    [Category.Transport]: "oklch(0.44 0.16 183)",
    [Category.Shopping]: "oklch(0.7 0.16 82)",
    [Category.Entertainment]: "oklch(0.54 0.22 22)",
    [Category.Health]: "oklch(0.56 0.18 163)",
    [Category.Bills]: "oklch(0.5 0.14 220)",
    [Category.Other]: "oklch(0.55 0.05 250)"
  };
  return colors[category] ?? "oklch(0.55 0.05 250)";
}
function getCategoryLabel(category) {
  const labels = {
    [Category.Food]: "Food",
    [Category.Transport]: "Transport",
    [Category.Shopping]: "Shopping",
    [Category.Entertainment]: "Entertainment",
    [Category.Health]: "Health",
    [Category.Bills]: "Bills",
    [Category.Other]: "Other"
  };
  return labels[category] ?? category;
}
function getSpendingStatus(spent, budget) {
  const ratio = spent / budget;
  if (ratio >= 1) return "overspend";
  if (ratio >= 0.8) return "caution";
  return "on-track";
}
export {
  Card as C,
  CardContent as a,
  getCategoryLabel as b,
  getSpendingStatus as c,
  getCategoryColor as d,
  dateToTimestamp as e,
  formatCurrency as f,
  getCategoryIcon as g,
  formatShortDate as h
};
