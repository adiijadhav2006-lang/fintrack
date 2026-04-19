import Common "common";

module {
  public type SavingsGoal = {
    id : Common.GoalId;
    owner : Common.UserId;
    name : Text;
    targetAmount : Float;
    var currentAmount : Float;
    targetDate : Common.Timestamp;
  };

  public type SavingsGoalPublic = {
    id : Common.GoalId;
    owner : Common.UserId;
    name : Text;
    targetAmount : Float;
    currentAmount : Float;
    targetDate : Common.Timestamp;
  };
};
