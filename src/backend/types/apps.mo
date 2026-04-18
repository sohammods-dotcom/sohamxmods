import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type AppId = Common.AppId;
  public type Timestamp = Common.Timestamp;

  public type App = {
    id : AppId;
    name : Text;
    description : Text;
    version : Text;
    iconBlob : Storage.ExternalBlob;
    apkBlob : Storage.ExternalBlob;
    downloadCount : Nat;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type CreateAppArgs = {
    name : Text;
    description : Text;
    version : Text;
    iconBlob : Storage.ExternalBlob;
    apkBlob : Storage.ExternalBlob;
  };

  public type UpdateAppArgs = {
    id : AppId;
    name : Text;
    description : Text;
    version : Text;
    iconBlob : Storage.ExternalBlob;
    apkBlob : Storage.ExternalBlob;
  };
};
