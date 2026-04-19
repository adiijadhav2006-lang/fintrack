export type {
  Expense,
  Budget,
  Badge,
  SavingsGoalPublic,
  CategoryLimits,
  ExpenseId,
  GoalId,
  Timestamp,
  UserId,
  UserProfile,
} from "../backend";

export {
  Category,
  BadgeType,
  FinancialGoal,
  ProfessionStatus,
} from "../backend";

export interface ExpenseFormData {
  amount: string;
  category: import("../backend").Category;
  note: string;
  date: Date;
}

export interface BudgetFormData {
  totalAmount: number;
  categoryLimits: import("../backend").CategoryLimits;
}

export type SpendingStatus = "on-track" | "caution" | "overspend";
