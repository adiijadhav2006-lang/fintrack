import Common "../types/common";
import ExpenseTypes "../types/expenses";
import ExpenseLib "../lib/expenses";
import BadgeLib "../lib/badges";
import Time "mo:core/Time";

mixin (
  expenseStore : ExpenseLib.ExpenseStore,
  badgeStore : BadgeLib.BadgeStore,
) {
  public shared ({ caller }) func addExpense(
    id : Common.ExpenseId,
    amount : Float,
    category : ExpenseTypes.Category,
    note : ?Text,
    date : Common.Timestamp,
  ) : async ExpenseTypes.Expense {
    let expense = ExpenseLib.addExpense(expenseStore, caller, id, amount, category, note, date);
    BadgeLib.checkAndAwardOnExpense(badgeStore, expenseStore, caller, Time.now());
    expense;
  };

  public shared query ({ caller }) func getExpenses() : async [ExpenseTypes.Expense] {
    ExpenseLib.getExpenses(expenseStore, caller);
  };

  public shared ({ caller }) func deleteExpense(id : Common.ExpenseId) : async Bool {
    ExpenseLib.deleteExpense(expenseStore, caller, id);
  };

  public shared query ({ caller }) func getExpensesByMonth(month : Nat, year : Nat) : async [ExpenseTypes.Expense] {
    ExpenseLib.getExpensesByMonth(expenseStore, caller, month, year);
  };
};
