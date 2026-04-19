import Common "../types/common";
import BadgeTypes "../types/badges";
import BadgeLib "../lib/badges";

mixin (badgeStore : BadgeLib.BadgeStore) {
  public shared query ({ caller }) func getBadges() : async [BadgeTypes.Badge] {
    BadgeLib.getBadges(badgeStore, caller);
  };
};
