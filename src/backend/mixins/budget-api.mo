import Common "../types/common";
import BudgetTypes "../types/budget";
import BudgetLib "../lib/budget";
import BadgeLib "../lib/badges";
import Time "mo:core/Time";

mixin (
  budgetStore : BudgetLib.BudgetStore,
  badgeStore : BadgeLib.BadgeStore,
) {
  public shared ({ caller }) func setBudget(
    totalAmount : Float,
    categoryLimits : BudgetTypes.CategoryLimits,
  ) : async BudgetTypes.Budget {
    let budget = BudgetLib.setBudget(budgetStore, caller, totalAmount, categoryLimits);
    BadgeLib.checkAndAwardOnBudget(badgeStore, budgetStore, caller, Time.now());
    budget;
  };

  public shared query ({ caller }) func getBudget() : async ?BudgetTypes.Budget {
    BudgetLib.getBudget(budgetStore, caller);
  };
};
