import Common "../types/common";
import BudgetTypes "../types/budget";
import Map "mo:core/Map";

module {
  public type BudgetStore = Map.Map<Common.UserId, BudgetTypes.Budget>;

  public func setBudget(
    store : BudgetStore,
    caller : Common.UserId,
    totalAmount : Float,
    categoryLimits : BudgetTypes.CategoryLimits,
  ) : BudgetTypes.Budget {
    let budget : BudgetTypes.Budget = {
      owner = caller;
      totalAmount;
      categoryLimits;
    };
    store.add(caller, budget);
    budget;
  };

  public func getBudget(
    store : BudgetStore,
    caller : Common.UserId,
  ) : ?BudgetTypes.Budget {
    store.get(caller);
  };
};
