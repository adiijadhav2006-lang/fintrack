import Common "common";

module {
  public type BadgeType = {
    #FirstBudget;
    #LoggingStreak7;
    #MonthlyOnTrack;
  };

  public type Badge = {
    owner : Common.UserId;
    badgeType : BadgeType;
    earnedAt : Common.Timestamp;
  };
};
