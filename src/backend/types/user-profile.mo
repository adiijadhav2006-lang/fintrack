import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;

  public type ProfessionStatus = {
    #Student;
    #Entrepreneur;
    #BusinessMan;
    #Employee;
    #Freelancer;
    #Other;
  };

  public type FinancialGoal = {
    #SaveForEmergencies;
    #PayOffDebt;
    #BuildWealth;
    #TrackSpending;
    #SaveForPurchase;
    #Other;
  };

  public type UserProfile = {
    professionStatus : ?ProfessionStatus;
    financialGoals : ?[FinancialGoal];
    onboardingCompleted : Bool;
    createdAt : Timestamp;
  };
};
