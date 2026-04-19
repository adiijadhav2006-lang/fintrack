import Common "../types/common";
import ExpenseTypes "../types/expenses";
import Map "mo:core/Map";
import List "mo:core/List";
import Int "mo:core/Int";

module {
  public type ExpenseStore = Map.Map<Common.UserId, List.List<ExpenseTypes.Expense>>;

  // Returns or creates the expense list for a user
  func getUserList(store : ExpenseStore, caller : Common.UserId) : List.List<ExpenseTypes.Expense> {
    switch (store.get(caller)) {
      case (?list) list;
      case null {
        let list = List.empty<ExpenseTypes.Expense>();
        store.add(caller, list);
        list;
      };
    };
  };

  public func addExpense(
    store : ExpenseStore,
    caller : Common.UserId,
    id : Common.ExpenseId,
    amount : Float,
    category : ExpenseTypes.Category,
    note : ?Text,
    date : Common.Timestamp,
  ) : ExpenseTypes.Expense {
    let expense : ExpenseTypes.Expense = {
      id;
      owner = caller;
      amount;
      category;
      note;
      date;
    };
    let list = getUserList(store, caller);
    list.add(expense);
    expense;
  };

  public func getExpenses(
    store : ExpenseStore,
    caller : Common.UserId,
  ) : [ExpenseTypes.Expense] {
    let list = getUserList(store, caller);
    list.sort(func(a, b) = Int.compare(b.date, a.date)).toArray();
  };

  public func deleteExpense(
    store : ExpenseStore,
    caller : Common.UserId,
    id : Common.ExpenseId,
  ) : Bool {
    switch (store.get(caller)) {
      case null false;
      case (?list) {
        let before = list.size();
        let filtered = list.filter(func(e) { e.id != id });
        list.clear();
        list.append(filtered);
        list.size() < before;
      };
    };
  };

  public func getExpensesByMonth(
    store : ExpenseStore,
    caller : Common.UserId,
    month : Nat,
    year : Nat,
  ) : [ExpenseTypes.Expense] {
    switch (store.get(caller)) {
      case null [];
      case (?list) {
        let filtered = list.filter(func(e) {
          let secs : Int = e.date / 1_000_000_000;
          let days : Int = secs / 86400;
          let (y, m) = daysToYearMonth(days);
          y == year and m == month;
        });
        filtered.sort(func(a, b) = Int.compare(b.date, a.date)).toArray();
      };
    };
  };

  // Convert days-since-Unix-epoch to (year, month 1-12) using civil calendar algorithm
  func daysToYearMonth(days : Int) : (Nat, Nat) {
    let z : Int = days + 719468;
    let era : Int = (if (z >= 0) z else z - 146096) / 146097;
    let doe : Int = z - era * 146097;
    let yoe : Int = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Int = (5 * doy + 2) / 153;
    let m : Int = if (mp < 10) mp + 3 else mp - 9;
    let yr : Int = if (m <= 2) y + 1 else y;
    (yr.toNat(), m.toNat());
  };
};
