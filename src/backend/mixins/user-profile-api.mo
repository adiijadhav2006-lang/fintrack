import Time "mo:core/Time";
import ProfileLib "../lib/user-profile";
import Types "../types/user-profile";

mixin (profileStore : ProfileLib.ProfileStore) {

  public shared ({ caller }) func getUserProfile() : async ?Types.UserProfile {
    ProfileLib.getUserProfile(profileStore, caller);
  };

  public shared ({ caller }) func saveUserProfile(
    professionStatus : ?Types.ProfessionStatus,
    financialGoals : ?[Types.FinancialGoal],
    onboardingCompleted : Bool,
  ) : async () {
    let existing = ProfileLib.getUserProfile(profileStore, caller);
    let createdAt : Types.Timestamp = switch (existing) {
      case (?p) { p.createdAt };
      case null { Time.now() };
    };
    let profile : Types.UserProfile = {
      professionStatus;
      financialGoals;
      onboardingCompleted;
      createdAt;
    };
    ProfileLib.saveUserProfile(profileStore, caller, profile);
  };
};
