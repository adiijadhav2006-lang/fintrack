import Common "../types/common";
import GoalTypes "../types/goals";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type GoalStore = Map.Map<Common.UserId, List.List<GoalTypes.SavingsGoal>>;

  func getUserGoals(store : GoalStore, caller : Common.UserId) : List.List<GoalTypes.SavingsGoal> {
    switch (store.get(caller)) {
      case (?list) list;
      case null {
        let list = List.empty<GoalTypes.SavingsGoal>();
        store.add(caller, list);
        list;
      };
    };
  };

  func toPublic(goal : GoalTypes.SavingsGoal) : GoalTypes.SavingsGoalPublic {
    {
      id = goal.id;
      owner = goal.owner;
      name = goal.name;
      targetAmount = goal.targetAmount;
      currentAmount = goal.currentAmount;
      targetDate = goal.targetDate;
    };
  };

  public func createGoal(
    store : GoalStore,
    caller : Common.UserId,
    id : Common.GoalId,
    name : Text,
    targetAmount : Float,
    currentAmount : Float,
    targetDate : Common.Timestamp,
  ) : GoalTypes.SavingsGoalPublic {
    let goal : GoalTypes.SavingsGoal = {
      id;
      owner = caller;
      name;
      targetAmount;
      var currentAmount;
      targetDate;
    };
    let list = getUserGoals(store, caller);
    list.add(goal);
    toPublic(goal);
  };

  public func updateGoalProgress(
    store : GoalStore,
    caller : Common.UserId,
    id : Common.GoalId,
    addAmount : Float,
  ) : ?GoalTypes.SavingsGoalPublic {
    switch (store.get(caller)) {
      case null null;
      case (?list) {
        switch (list.find(func(g : GoalTypes.SavingsGoal) : Bool = g.id == id)) {
          case null null;
          case (?goal) {
            goal.currentAmount += addAmount;
            ?toPublic(goal);
          };
        };
      };
    };
  };

  public func deleteGoal(
    store : GoalStore,
    caller : Common.UserId,
    id : Common.GoalId,
  ) : Bool {
    switch (store.get(caller)) {
      case null false;
      case (?list) {
        let before = list.size();
        let filtered = list.filter(func(g : GoalTypes.SavingsGoal) : Bool = g.id != id);
        list.clear();
        list.append(filtered);
        list.size() < before;
      };
    };
  };

  public func getGoals(
    store : GoalStore,
    caller : Common.UserId,
  ) : [GoalTypes.SavingsGoalPublic] {
    switch (store.get(caller)) {
      case null [];
      case (?list) {
        let mapped = list.map<GoalTypes.SavingsGoal, GoalTypes.SavingsGoalPublic>(toPublic);
        mapped.toArray();
      };
    };
  };
};
