import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    financialGoals?: Array<FinancialGoal>;
    createdAt: Timestamp;
    professionStatus?: ProfessionStatus;
    onboardingCompleted: boolean;
}
export type GoalId = string;
export type Timestamp = bigint;
export interface Expense {
    id: ExpenseId;
    owner: UserId;
    date: Timestamp;
    note?: string;
    category: Category;
    amount: number;
}
export interface SavingsGoalPublic {
    id: GoalId;
    owner: UserId;
    name: string;
    targetAmount: number;
    targetDate: Timestamp;
    currentAmount: number;
}
export interface Badge {
    owner: UserId;
    badgeType: BadgeType;
    earnedAt: Timestamp;
}
export type UserId = Principal;
export type ExpenseId = string;
export interface CategoryLimits {
    other?: number;
    entertainment?: number;
    food?: number;
    transport?: number;
    bills?: number;
    shopping?: number;
    health?: number;
}
export interface Budget {
    owner: UserId;
    categoryLimits: CategoryLimits;
    totalAmount: number;
}
export enum BadgeType {
    MonthlyOnTrack = "MonthlyOnTrack",
    FirstBudget = "FirstBudget",
    LoggingStreak7 = "LoggingStreak7"
}
export enum Category {
    Food = "Food",
    Health = "Health",
    Bills = "Bills",
    Entertainment = "Entertainment",
    Shopping = "Shopping",
    Other = "Other",
    Transport = "Transport"
}
export enum FinancialGoal {
    BuildWealth = "BuildWealth",
    TrackSpending = "TrackSpending",
    SaveForPurchase = "SaveForPurchase",
    PayOffDebt = "PayOffDebt",
    Other = "Other",
    SaveForEmergencies = "SaveForEmergencies"
}
export enum ProfessionStatus {
    BusinessMan = "BusinessMan",
    Employee = "Employee",
    Student = "Student",
    Other = "Other",
    Freelancer = "Freelancer",
    Entrepreneur = "Entrepreneur"
}
export interface backendInterface {
    addExpense(id: ExpenseId, amount: number, category: Category, note: string | null, date: Timestamp): Promise<Expense>;
    createGoal(id: GoalId, name: string, targetAmount: number, currentAmount: number, targetDate: Timestamp): Promise<SavingsGoalPublic>;
    deleteExpense(id: ExpenseId): Promise<boolean>;
    deleteGoal(id: GoalId): Promise<boolean>;
    getBadges(): Promise<Array<Badge>>;
    getBudget(): Promise<Budget | null>;
    getExpenses(): Promise<Array<Expense>>;
    getExpensesByMonth(month: bigint, year: bigint): Promise<Array<Expense>>;
    getGoals(): Promise<Array<SavingsGoalPublic>>;
    getUserProfile(): Promise<UserProfile | null>;
    saveUserProfile(professionStatus: ProfessionStatus | null, financialGoals: Array<FinancialGoal> | null, onboardingCompleted: boolean): Promise<void>;
    setBudget(totalAmount: number, categoryLimits: CategoryLimits): Promise<Budget>;
    updateGoalProgress(id: GoalId, addAmount: number): Promise<SavingsGoalPublic | null>;
}
