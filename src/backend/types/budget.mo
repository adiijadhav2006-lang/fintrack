import Common "common";

module {
  public type CategoryLimits = {
    transport : ?Float;
    food : ?Float;
    shopping : ?Float;
    bills : ?Float;
    entertainment : ?Float;
    health : ?Float;
    other : ?Float;
  };

  public type Budget = {
    owner : Common.UserId;
    totalAmount : Float;
    categoryLimits : CategoryLimits;
  };
};
