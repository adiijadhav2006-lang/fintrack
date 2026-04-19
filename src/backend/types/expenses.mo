import Common "common";

module {
  public type Category = {
    #Transport;
    #Food;
    #Shopping;
    #Bills;
    #Entertainment;
    #Health;
    #Other;
  };

  public type Expense = {
    id : Common.ExpenseId;
    owner : Common.UserId;
    amount : Float;
    category : Category;
    note : ?Text;
    date : Common.Timestamp;
  };
};
