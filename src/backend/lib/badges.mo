import Common "../types/common";
import BadgeTypes "../types/badges";
import ExpenseTypes "../types/expenses";
import BudgetTypes "../types/budget";
import Map "mo:core/Map";
import List "mo:core/List";
import Int "mo:core/Int";

module {
  public type BadgeStore = Map.Map<Common.UserId, List.List<BadgeTypes.Badge>>;

  func getUserBadges(store : BadgeStore, caller : Common.UserId) : List.List<BadgeTypes.Badge> {
    switch (store.get(caller)) {
      case (?list) list;
      case null {
        let list = List.empty<BadgeTypes.Badge>();
        store.add(caller, list);
        list;
      };
    };
  };

  public func getBadges(
    store : BadgeStore,
    caller : Common.UserId,
  ) : [BadgeTypes.Badge] {
    getUserBadges(store, caller).toArray();
  };

  public func awardBadge(
    store : BadgeStore,
    caller : Common.UserId,
    badgeType : BadgeTypes.BadgeType,
    earnedAt : Common.Timestamp,
  ) : BadgeTypes.Badge {
    let badge : BadgeTypes.Badge = {
      owner = caller;
      badgeType;
      earnedAt;
    };
    let list = getUserBadges(store, caller);
    list.add(badge);
    badge;
  };

  public func hasBadge(
    store : BadgeStore,
    caller : Common.UserId,
    badgeType : BadgeTypes.BadgeType,
  ) : Bool {
    let list = getUserBadges(store, caller);
    switch (list.find(func(b) { b.badgeType == badgeType })) {
      case (?_) true;
      case null false;
    };
  };

  /// Called after adding an expense — checks and awards LoggingStreak7 badge
  public func checkAndAwardOnExpense(
    store : BadgeStore,
    expenseStore : Map.Map<Common.UserId, List.List<ExpenseTypes.Expense>>,
    caller : Common.UserId,
    now : Common.Timestamp,
  ) {
    if (hasBadge(store, caller, #LoggingStreak7)) return;

    switch (expenseStore.get(caller)) {
      case null {};
      case (?expenses) {
        let nsPerDay : Int = 86_400_000_000_000;
        let daySet = Map.empty<Int, Bool>();
        expenses.forEach(func(e) {
          let day = e.date / nsPerDay;
          daySet.add(day, true);
        });
        if (daySet.size() >= 7) {
          let _ = awardBadge(store, caller, #LoggingStreak7, now);
        };
      };
    };
  };

  /// Called after setting a budget — awards FirstBudget badge on first budget set
  public func checkAndAwardOnBudget(
    store : BadgeStore,
    budgetStore : Map.Map<Common.UserId, BudgetTypes.Budget>,
    caller : Common.UserId,
    now : Common.Timestamp,
  ) {
    if (not hasBadge(store, caller, #FirstBudget)) {
      if (budgetStore.containsKey(caller)) {
        let _ = awardBadge(store, caller, #FirstBudget, now);
      };
    };
  };
};
