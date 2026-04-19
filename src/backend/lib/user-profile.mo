import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Types "../types/user-profile";

module {
  public type UserId = Types.UserId;
  public type UserProfile = Types.UserProfile;
  public type ProfileStore = Map.Map<UserId, UserProfile>;

  public func getUserProfile(store : ProfileStore, caller : Principal) : ?UserProfile {
    store.get(caller);
  };

  public func saveUserProfile(store : ProfileStore, caller : Principal, profile : UserProfile) {
    store.add(caller, profile);
  };
};
