import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import AppsLib "lib/apps";
import AppsMixin "mixins/apps-api";

actor {
  // ── Object storage (APK files + icons) ───────────────────────────
  include MixinObjectStorage();

  // ── Authorization ─────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Apps domain state ─────────────────────────────────────────────
  let appStore = AppsLib.newStore();
  include AppsMixin(accessControlState, appStore);
};
