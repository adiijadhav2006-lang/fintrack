import Common "../types/common";
import GoalTypes "../types/goals";
import GoalLib "../lib/goals";

mixin (goalStore : GoalLib.GoalStore) {
  public shared ({ caller }) func createGoal(
    id : Common.GoalId,
    name : Text,
    targetAmount : Float,
    currentAmount : Float,
    targetDate : Common.Timestamp,
  ) : async GoalTypes.SavingsGoalPublic {
    GoalLib.createGoal(goalStore, caller, id, name, targetAmount, currentAmount, targetDate);
  };

  public shared ({ caller }) func updateGoalProgress(
    id : Common.GoalId,
    addAmount : Float,
  ) : async ?GoalTypes.SavingsGoalPublic {
    GoalLib.updateGoalProgress(goalStore, caller, id, addAmount);
  };

  public shared ({ caller }) func deleteGoal(id : Common.GoalId) : async Bool {
    GoalLib.deleteGoal(goalStore, caller, id);
  };

  public shared query ({ caller }) func getGoals() : async [GoalTypes.SavingsGoalPublic] {
    GoalLib.getGoals(goalStore, caller);
  };
};
