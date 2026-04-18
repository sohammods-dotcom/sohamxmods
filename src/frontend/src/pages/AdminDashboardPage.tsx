import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Download,
  Edit2,
  ImageIcon,
  LogOut,
  Package,
  Plus,
  Shield,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAdminAuth } from "../hooks/useAdminAuth";
import {
  useApps,
  useCreateApp,
  useDeleteApp,
  useUpdateApp,
} from "../hooks/useApps";
import type { AppRecord } from "../types";

// ─── types ───────────────────────────────────────────────────────────────────
interface AppFormData {
  name: string;
  description: string;
  version: string;
  iconFile: File | null;
  apkFile: File | null;
}

const emptyForm = (): AppFormData => ({
  name: "",
  description: "",
  version: "",
  iconFile: null,
  apkFile: null,
});

// ─── FileInput ────────────────────────────────────────────────────────────────
function FileInput({
  label,
  accept,
  file,
  onChange,
  icon: Icon,
  ocid,
}: {
  label: string;
  accept: string;
  file: File | null;
  onChange: (f: File) => void;
  icon: React.ElementType;
  ocid: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={() => ref.current?.click()}
      className="w-full h-24 rounded-xl border-2 border-dashed border-white/20 
        hover:border-accent/50 bg-white/5 hover:bg-accent/5 transition-smooth 
        flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground"
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium px-2 text-center leading-tight">
        {file ? file.name : label}
      </span>
      {file && (
        <span className="text-[10px] opacity-60">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </span>
      )}
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onChange(f);
        }}
      />
    </button>
  );
}

// ─── InlineError ──────────────────────────────────────────────────────────────
function InlineError({ message }: { message: string }) {
  return (
    <div
      data-ocid="upload.error_state"
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm 
        bg-destructive/15 text-destructive border border-destructive/30"
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

// ─── UploadSection ────────────────────────────────────────────────────────────
function UploadSection() {
  const [form, setForm] = useState<AppFormData>(emptyForm());
  const [iconPreview, setIconPreview] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const createApp = useCreateApp();

  function patch(updates: Partial<AppFormData>) {
    setForm((prev) => ({ ...prev, ...updates }));
    setError(null);
  }

  function handleIconChange(f: File) {
    patch({ iconFile: f });
    setIconPreview(URL.createObjectURL(f));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) return setError("App name is required.");
    if (!form.version.trim()) return setError("Version is required.");
    if (!form.description.trim()) return setError("Description is required.");
    try {
      await createApp.mutateAsync(form);
      toast.success(`"${form.name}" uploaded successfully!`);
      setForm(emptyForm());
      setIconPreview("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Upload failed. Please try again.",
      );
    }
  }

  return (
    <section
      data-ocid="upload.section"
      className="glassmorphism neon-border rounded-2xl p-6 space-y-5"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
          <Plus className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground leading-tight">
            Upload New App
          </h2>
          <p className="text-xs text-muted-foreground">
            Fill in the details below and upload your APK
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="up-name"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              App Name *
            </Label>
            <Input
              id="up-name"
              data-ocid="upload.name.input"
              value={form.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="e.g. GTA San Andreas Mod"
              className="bg-white/5 border-white/10 focus:border-accent/60 text-foreground 
                placeholder:text-muted-foreground/40"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="up-version"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Version *
            </Label>
            <Input
              id="up-version"
              data-ocid="upload.version.input"
              value={form.version}
              onChange={(e) => patch({ version: e.target.value })}
              placeholder="e.g. 2.11.32"
              className="bg-white/5 border-white/10 focus:border-accent/60 text-foreground 
                placeholder:text-muted-foreground/40"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="up-desc"
            className="text-xs uppercase tracking-wider text-muted-foreground"
          >
            Description *
          </Label>
          <Textarea
            id="up-desc"
            data-ocid="upload.description.textarea"
            value={form.description}
            onChange={(e) => patch({ description: e.target.value })}
            rows={3}
            placeholder="Describe what makes this app special…"
            className="bg-white/5 border-white/10 focus:border-accent/60 text-foreground 
              placeholder:text-muted-foreground/40 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              App Icon
            </Label>
            <div className="flex gap-3 items-start">
              {iconPreview ? (
                <img
                  src={iconPreview}
                  alt="Icon preview"
                  className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 
                  flex items-center justify-center shrink-0"
                >
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <FileInput
                label="Click to upload icon"
                accept="image/*"
                file={form.iconFile}
                onChange={handleIconChange}
                icon={ImageIcon}
                ocid="upload.icon.upload_button"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              APK File
            </Label>
            <FileInput
              label="Click to upload APK"
              accept=".apk,application/vnd.android.package-archive"
              file={form.apkFile}
              onChange={(f) => patch({ apkFile: f })}
              icon={Package}
              ocid="upload.apk.upload_button"
            />
          </div>
        </div>

        {error && <InlineError message={error} />}

        <Button
          type="submit"
          data-ocid="upload.submit_button"
          disabled={createApp.isPending}
          className="w-full bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary 
            hover:to-accent border border-primary/40 text-foreground font-semibold 
            shadow-lg shadow-accent/10 transition-smooth"
        >
          {createApp.isPending ? (
            <span className="flex items-center gap-2">
              <Upload className="h-4 w-4 animate-pulse" />
              Uploading…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload App
            </span>
          )}
        </Button>
      </form>
    </section>
  );
}

// ─── EditAppModal ─────────────────────────────────────────────────────────────
function EditAppModal({
  app,
  onClose,
}: {
  app: AppRecord;
  onClose: () => void;
}) {
  const [form, setForm] = useState<AppFormData>({
    name: app.name,
    description: app.description,
    version: app.version,
    iconFile: null,
    apkFile: null,
  });
  const [error, setError] = useState<string | null>(null);
  const updateApp = useUpdateApp();

  function patch(updates: Partial<AppFormData>) {
    setForm((prev) => ({ ...prev, ...updates }));
    setError(null);
  }

  async function handleSave() {
    setError(null);
    if (!form.name.trim()) return setError("App name is required.");
    if (!form.version.trim()) return setError("Version is required.");
    if (!form.description.trim()) return setError("Description is required.");
    try {
      await updateApp.mutateAsync({ id: app.id, ...form });
      toast.success("App updated successfully!");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="edit.dialog"
        className="glassmorphism border-white/10 text-foreground max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            <Edit2 className="h-4 w-4 text-accent" />
            Edit App
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="edit-name"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                App Name *
              </Label>
              <Input
                id="edit-name"
                data-ocid="edit.name.input"
                value={form.name}
                onChange={(e) => patch({ name: e.target.value })}
                className="bg-white/5 border-white/10 focus:border-accent/60 text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="edit-version"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Version *
              </Label>
              <Input
                id="edit-version"
                data-ocid="edit.version.input"
                value={form.version}
                onChange={(e) => patch({ version: e.target.value })}
                className="bg-white/5 border-white/10 focus:border-accent/60 text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="edit-desc"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Description *
            </Label>
            <Textarea
              id="edit-desc"
              data-ocid="edit.description.textarea"
              value={form.description}
              onChange={(e) => patch({ description: e.target.value })}
              rows={3}
              className="bg-white/5 border-white/10 focus:border-accent/60 text-foreground resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Replace Icon
              </Label>
              <FileInput
                label="Upload new icon"
                accept="image/*"
                file={form.iconFile}
                onChange={(f) => patch({ iconFile: f })}
                icon={ImageIcon}
                ocid="edit.icon.upload_button"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Replace APK
              </Label>
              <FileInput
                label="Upload new APK"
                accept=".apk,application/vnd.android.package-archive"
                file={form.apkFile}
                onChange={(f) => patch({ apkFile: f })}
                icon={Package}
                ocid="edit.apk.upload_button"
              />
            </div>
          </div>

          {error && (
            <div
              data-ocid="edit.error_state"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm 
                bg-destructive/15 text-destructive border border-destructive/30"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            data-ocid="edit.cancel_button"
            onClick={onClose}
            className="border-white/10 text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            type="button"
            data-ocid="edit.save_button"
            disabled={updateApp.isPending}
            onClick={handleSave}
            className="bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary 
              hover:to-accent border border-primary/40 text-foreground font-semibold"
          >
            {updateApp.isPending ? "Saving…" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── AppListSection ───────────────────────────────────────────────────────────
function AppListSection() {
  const { data: apps = [], isLoading } = useApps();
  const deleteApp = useDeleteApp();
  const [editApp, setEditApp] = useState<AppRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AppRecord | null>(null);

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteApp.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted.`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete app.");
    }
  }

  return (
    <>
      <section
        data-ocid="applist.section"
        className="glassmorphism neon-border rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              All Apps
            </h2>
          </div>
          {apps.length > 0 && (
            <Badge className="bg-primary/15 text-primary border-primary/30">
              {apps.length} total
            </Badge>
          )}
        </div>

        {isLoading ? (
          <div data-ocid="applist.loading_state" className="p-4 space-y-3">
            {[1, 2, 3].map((k) => (
              <Skeleton
                key={k}
                className="h-20 w-full rounded-xl bg-muted/40"
              />
            ))}
          </div>
        ) : apps.length === 0 ? (
          <div
            data-ocid="applist.empty_state"
            className="py-16 flex flex-col items-center justify-center text-center px-6"
          >
            <Package className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
            <p className="text-foreground font-medium mb-1">No apps yet</p>
            <p className="text-sm text-muted-foreground">
              Use the upload form above to add your first app.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {apps.map((app, i) => (
              <div
                key={app.id}
                data-ocid={`applist.item.${i + 1}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-smooth group"
              >
                <img
                  src={
                    app.iconUrl ||
                    "/assets/generated/icon-default.dim_120x120.jpg"
                  }
                  alt={app.name}
                  className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/generated/icon-default.dim_120x120.jpg";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-foreground truncate">
                      {app.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs border-accent/30 text-accent shrink-0"
                    >
                      v{app.version}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-0.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {app.downloadCount.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    data-ocid={`applist.edit_button.${i + 1}`}
                    onClick={() => setEditApp(app)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-accent hover:bg-accent/15"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    data-ocid={`applist.delete_button.${i + 1}`}
                    onClick={() => setDeleteTarget(app)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/15"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {editApp && (
        <EditAppModal app={editApp} onClose={() => setEditApp(null)} />
      )}

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent
          data-ocid="delete.dialog"
          className="glassmorphism border-white/10 text-foreground"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete this app?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="delete.cancel_button"
              className="border-white/10 text-muted-foreground hover:text-foreground"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="delete.confirm_button"
              onClick={handleDelete}
              disabled={deleteApp.isPending}
              className="bg-destructive/80 hover:bg-destructive text-foreground border border-destructive/40"
            >
              {deleteApp.isPending ? "Deleting…" : "Delete App"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// ─── StatsRow ─────────────────────────────────────────────────────────────────
function StatsRow() {
  const { data: apps = [] } = useApps();
  const totalDownloads = apps.reduce((s, a) => s + a.downloadCount, 0);

  const stats = [
    { label: "Total Apps", value: String(apps.length), icon: Package },
    {
      label: "Total Downloads",
      value: totalDownloads.toLocaleString(),
      icon: Download,
    },
    {
      label: "Latest App",
      value: apps[0]?.name ?? "—",
      icon: Upload,
      truncate: true,
    },
  ];

  return (
    <div
      data-ocid="dashboard.stats.section"
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {stats.map(({ label, value, icon: Icon, truncate }) => (
        <div
          key={label}
          className="glassmorphism neon-border rounded-xl p-4 flex items-center gap-4"
        >
          <div
            className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 
            flex items-center justify-center shrink-0"
          >
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {label}
            </p>
            <p
              className={`font-display font-bold text-foreground text-lg leading-tight 
                ${truncate ? "truncate" : ""}`}
            >
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── AdminDashboardPage ───────────────────────────────────────────────────────
export function AdminDashboardPage() {
  const { authenticated, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate({ to: "/admin" });
    }
  }, [authenticated, navigate]);

  if (!authenticated) return null;

  return (
    <div className="min-h-screen gradient-dark-bg">
      {/* Admin header */}
      <header
        data-ocid="dashboard.header"
        className="sticky top-0 z-30 glassmorphism border-b border-white/10 shadow-lg shadow-black/40"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div>
              <span className="font-display font-bold text-foreground tracking-tight">
                SohamxMods
              </span>
              <span
                className="ml-2 text-xs text-muted-foreground font-medium 
                bg-accent/15 border border-accent/25 rounded-full px-2 py-0.5"
              >
                Admin
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            data-ocid="dashboard.logout_button"
            onClick={() => {
              logout();
              navigate({ to: "/admin" });
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-destructive 
              hover:bg-destructive/10 transition-smooth"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main
        data-ocid="dashboard.page"
        className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6"
      >
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage apps on SohamxMods — upload, edit, or remove listings.
          </p>
        </div>

        <StatsRow />
        <UploadSection />
        <AppListSection />
      </main>
    </div>
  );
}
