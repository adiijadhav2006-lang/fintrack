import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Category,
  CategoryLimits,
  ExpenseId,
  FinancialGoal,
  GoalId,
  ProfessionStatus,
} from "../backend";

function useBackendActor() {
  return useActor(createActor);
}

export function useExpenses() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExpenses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useExpensesByMonth(month: number, year: number) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["expenses", "month", month, year],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExpensesByMonth(BigInt(month), BigInt(year));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBudget() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["budget"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBudget();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGoals() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGoals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBadges() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBadges();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      professionStatus,
      financialGoals,
      onboardingCompleted,
    }: {
      professionStatus: ProfessionStatus | null;
      financialGoals: FinancialGoal[] | null;
      onboardingCompleted: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveUserProfile(
        professionStatus,
        financialGoals,
        onboardingCompleted,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useAddExpense() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      amount,
      category,
      note,
      date,
    }: {
      id: ExpenseId;
      amount: number;
      category: Category;
      note: string | null;
      date: bigint;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addExpense(id, amount, category, note, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useDeleteExpense() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: ExpenseId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteExpense(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useSetBudget() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      totalAmount,
      categoryLimits,
    }: {
      totalAmount: number;
      categoryLimits: CategoryLimits;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setBudget(totalAmount, categoryLimits);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });
}

export function useCreateGoal() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      targetAmount,
      currentAmount,
      targetDate,
    }: {
      id: GoalId;
      name: string;
      targetAmount: number;
      currentAmount: number;
      targetDate: bigint;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createGoal(
        id,
        name,
        targetAmount,
        currentAmount,
        targetDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}

export function useUpdateGoalProgress() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      addAmount,
    }: { id: GoalId; addAmount: number }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateGoalProgress(id, addAmount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}

export function useDeleteGoal() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: GoalId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteGoal(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}
