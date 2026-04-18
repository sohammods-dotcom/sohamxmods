import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import AppsLib "../lib/apps";
import Types "../types/apps";

mixin (
  accessControlState : AccessControl.AccessControlState,
  appStore : AppsLib.AppStore,
) {
  // ── Public queries ────────────────────────────────────────────────

  public query func listApps() : async [Types.App] {
    AppsLib.listApps(appStore);
  };

  public query func getApp(id : Types.AppId) : async ?Types.App {
    AppsLib.getApp(appStore, id);
  };

  public query func searchApps(term : Text) : async [Types.App] {
    AppsLib.searchApps(appStore, term);
  };

  // ── Public update ─────────────────────────────────────────────────

  public shared func incrementDownload(id : Types.AppId) : async Bool {
    AppsLib.incrementDownload(appStore, id);
  };

  // ── Admin-only updates ────────────────────────────────────────────

  public shared ({ caller }) func createApp(args : Types.CreateAppArgs) : async Types.App {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create apps");
    };
    AppsLib.createApp(appStore, args);
  };

  public shared ({ caller }) func updateApp(args : Types.UpdateAppArgs) : async ?Types.App {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update apps");
    };
    AppsLib.updateApp(appStore, args);
  };

  public shared ({ caller }) func deleteApp(id : Types.AppId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete apps");
    };
    AppsLib.deleteApp(appStore, id);
  };
};
