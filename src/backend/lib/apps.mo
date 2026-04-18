import Map "mo:core/Map";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Types "../types/apps";

module {
  public type AppStore = {
    apps : Map.Map<Types.AppId, Types.App>;
    var nextId : Nat;
  };

  public func newStore() : AppStore {
    {
      apps = Map.empty<Types.AppId, Types.App>();
      var nextId = 1;
    };
  };

  public func createApp(store : AppStore, args : Types.CreateAppArgs) : Types.App {
    let id = store.nextId;
    let now = Time.now();
    let app : Types.App = {
      id;
      name = args.name;
      description = args.description;
      version = args.version;
      iconBlob = args.iconBlob;
      apkBlob = args.apkBlob;
      downloadCount = 0;
      createdAt = now;
      updatedAt = now;
    };
    store.apps.add(id, app);
    store.nextId += 1;
    app;
  };

  public func updateApp(store : AppStore, args : Types.UpdateAppArgs) : ?Types.App {
    switch (store.apps.get(args.id)) {
      case null null;
      case (?existing) {
        let updated : Types.App = {
          existing with
          name = args.name;
          description = args.description;
          version = args.version;
          iconBlob = args.iconBlob;
          apkBlob = args.apkBlob;
          updatedAt = Time.now();
        };
        store.apps.add(args.id, updated);
        ?updated;
      };
    };
  };

  public func deleteApp(store : AppStore, id : Types.AppId) : Bool {
    switch (store.apps.get(id)) {
      case null false;
      case (?_) {
        store.apps.remove(id);
        true;
      };
    };
  };

  public func getApp(store : AppStore, id : Types.AppId) : ?Types.App {
    store.apps.get(id);
  };

  public func listApps(store : AppStore) : [Types.App] {
    store.apps.values().toArray().sort(
      func(a : Types.App, b : Types.App) : Order.Order = Int.compare(b.createdAt, a.createdAt)
    );
  };

  public func searchApps(store : AppStore, term : Text) : [Types.App] {
    let lower = term.toLower();
    store.apps.values().toArray().filter(
      func(app : Types.App) : Bool {
        app.name.toLower().contains(#text lower) or
        app.description.toLower().contains(#text lower)
      }
    ).sort(
      func(a : Types.App, b : Types.App) : Order.Order = Int.compare(b.createdAt, a.createdAt)
    );
  };

  public func incrementDownload(store : AppStore, id : Types.AppId) : Bool {
    switch (store.apps.get(id)) {
      case null false;
      case (?existing) {
        let updated : Types.App = {
          existing with
          downloadCount = existing.downloadCount + 1;
        };
        store.apps.add(id, updated);
        true;
      };
    };
  };
};
