import Map "mo:core/Map";
import List "mo:core/List";
import ExpenseLib "lib/expenses";
import BudgetLib "lib/budget";
import GoalLib "lib/goals";
import BadgeLib "lib/badges";
import ProfileLib "lib/user-profile";
import ExpensesApi "mixins/expenses-api";
import BudgetApi "mixins/budget-api";
import GoalsApi "mixins/goals-api";
import BadgesApi "mixins/badges-api";
import UserProfileApi "mixins/user-profile-api";

actor {
  let expenseStore : ExpenseLib.ExpenseStore = Map.empty();
  let budgetStore : BudgetLib.BudgetStore = Map.empty();
  let goalStore : GoalLib.GoalStore = Map.empty();
  let badgeStore : BadgeLib.BadgeStore = Map.empty();
  let profileStore : ProfileLib.ProfileStore = Map.empty();

  include ExpensesApi(expenseStore, badgeStore);
  include BudgetApi(budgetStore, badgeStore);
  include GoalsApi(goalStore);
  include BadgesApi(badgeStore);
  include UserProfileApi(profileStore);
};
