import { Category } from "../backend";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(ms));
}

export function formatShortDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(new Date(ms));
}

export function dateToTimestamp(date: Date): bigint {
  return BigInt(date.getTime()) * 1_000_000n;
}

export function getCategoryIcon(category: Category): string {
  const icons: Record<Category, string> = {
    [Category.Food]: "🍽️",
    [Category.Transport]: "🚗",
    [Category.Shopping]: "🛍️",
    [Category.Entertainment]: "🎬",
    [Category.Health]: "💊",
    [Category.Bills]: "💡",
    [Category.Other]: "📦",
  };
  return icons[category] ?? "📦";
}

export function getCategoryColor(category: Category): string {
  // chart-1..5 map to: green, teal, amber, red, sage — cycle for 7 categories
  const colors: Record<Category, string> = {
    [Category.Food]: "oklch(0.58 0.18 148)",
    [Category.Transport]: "oklch(0.44 0.16 183)",
    [Category.Shopping]: "oklch(0.7 0.16 82)",
    [Category.Entertainment]: "oklch(0.54 0.22 22)",
    [Category.Health]: "oklch(0.56 0.18 163)",
    [Category.Bills]: "oklch(0.5 0.14 220)",
    [Category.Other]: "oklch(0.55 0.05 250)",
  };
  return colors[category] ?? "oklch(0.55 0.05 250)";
}

export function getCategoryLabel(category: Category): string {
  const labels: Record<Category, string> = {
    [Category.Food]: "Food",
    [Category.Transport]: "Transport",
    [Category.Shopping]: "Shopping",
    [Category.Entertainment]: "Entertainment",
    [Category.Health]: "Health",
    [Category.Bills]: "Bills",
    [Category.Other]: "Other",
  };
  return labels[category] ?? category;
}

export function getSpendingStatus(
  spent: number,
  budget: number,
): "on-track" | "caution" | "overspend" {
  const ratio = spent / budget;
  if (ratio >= 1) return "overspend";
  if (ratio >= 0.8) return "caution";
  return "on-track";
}
