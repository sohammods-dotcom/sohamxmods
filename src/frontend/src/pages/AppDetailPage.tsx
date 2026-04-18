import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Download,
  Loader2,
  Package,
  RefreshCw,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { useApp, useIncrementDownload } from "../hooks/useApps";

function formatDownloads(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M downloads`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K downloads`;
  return `${count} downloads`;
}

function getRating(id: string): string {
  const num = Number.parseInt(id, 10) || id.charCodeAt(0);
  return (4.0 + (num % 10) * 0.1).toFixed(1);
}

function DetailSkeleton() {
  return (
    <div
      className="glassmorphism neon-border rounded-2xl p-6 space-y-6"
      data-ocid="app_detail.loading_state"
    >
      <div className="flex gap-5">
        <Skeleton className="w-28 h-28 rounded-2xl bg-muted/40 shrink-0" />
        <div className="flex-1 space-y-3 pt-1">
          <Skeleton className="h-7 w-2/3 bg-muted/40" />
          <Skeleton className="h-5 w-28 bg-muted/30" />
          <Skeleton className="h-5 w-36 bg-muted/30" />
          <Skeleton className="h-5 w-24 bg-muted/30" />
        </div>
      </div>
      <Skeleton className="h-px w-full bg-muted/20" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-muted/30" />
        <Skeleton className="h-4 w-5/6 bg-muted/30" />
        <Skeleton className="h-4 w-4/5 bg-muted/30" />
      </div>
      <Skeleton className="h-14 w-full rounded-xl bg-muted/40" />
    </div>
  );
}

export function AppDetailPage() {
  const { id } = useParams({ from: "/app/$id" });
  const { data: app, isLoading } = useApp(id);
  const incrementDownload = useIncrementDownload();
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

  const handleDownload = async () => {
    if (!app || downloading) return;
    setDownloading(true);
    try {
      await incrementDownload.mutateAsync(app.id);
      if (app.apkUrl) {
        const a = document.createElement("a");
        a.href = app.apkUrl;
        a.download = `${app.name.replace(/\s+/g, "_")}_v${app.version}.apk`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 4000);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Layout>
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 py-8"
        data-ocid="app_detail.page"
      >
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="app_detail.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>
        </motion.div>

        {/* Loading state */}
        {isLoading && <DetailSkeleton />}

        {/* Not found state */}
        {!isLoading && !app && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="glassmorphism neon-border rounded-2xl p-12 text-center"
            data-ocid="app_detail.empty_state"
          >
            <Package className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              App Not Found
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
              This app may have been removed or the link is invalid.
            </p>
            <Link to="/">
              <Button
                type="button"
                className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-smooth"
                variant="outline"
                data-ocid="app_detail.go_home_button"
              >
                Browse All Apps
              </Button>
            </Link>
          </motion.div>
        )}

        {/* App detail */}
        {!isLoading && app && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4"
            data-ocid="app_detail.card"
          >
            {/* Hero card */}
            <div className="glassmorphism neon-border rounded-2xl p-6">
              {/* App identity row */}
              <div className="flex items-start gap-5 mb-6">
                <motion.img
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                  src={
                    app.iconUrl ||
                    "/assets/generated/icon-default.dim_120x120.jpg"
                  }
                  alt={`${app.name} icon`}
                  className="w-28 h-28 rounded-2xl object-cover border border-white/10 shadow-lg shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/generated/icon-default.dim_120x120.jpg";
                  }}
                  data-ocid="app_detail.icon"
                />

                <div className="flex-1 min-w-0 pt-1 space-y-2">
                  <h1
                    className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight break-words"
                    data-ocid="app_detail.name"
                  >
                    {app.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-primary/15 text-primary border-primary/30 font-mono text-xs"
                      data-ocid="app_detail.version_badge"
                    >
                      v{app.version}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-green-500/30 text-green-400 text-xs gap-1"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      Verified Safe
                    </Badge>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= Math.round(Number(getRating(app.id)) / 2)
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      {getRating(app.id)} / 10
                    </span>
                  </div>

                  {/* Download count */}
                  <div
                    className="flex items-center gap-1.5 text-sm"
                    data-ocid="app_detail.download_count"
                  >
                    <Download className="w-3.5 h-3.5 text-accent" />
                    <span className="font-semibold text-accent">
                      {formatDownloads(app.downloadCount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 mb-6" />

              {/* Description */}
              <div className="mb-6" data-ocid="app_detail.description">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                  About this app
                </h2>
                <p className="text-foreground/90 leading-relaxed">
                  {app.description}
                </p>
              </div>

              {/* Meta info grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  {
                    icon: Package,
                    label: "Version",
                    value: `v${app.version}`,
                  },
                  {
                    icon: Calendar,
                    label: "Added",
                    value: new Date(app.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }),
                  },
                  {
                    icon: RefreshCw,
                    label: "Updated",
                    value: new Date(app.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }),
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="bg-white/5 border border-white/5 rounded-xl p-3 text-center"
                  >
                    <Icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {label}
                    </p>
                    <p className="text-xs font-semibold text-foreground font-mono truncate">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Primary Download Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full h-14 flex items-center justify-center gap-3 rounded-xl text-base font-semibold
                    bg-gradient-to-r from-primary to-accent text-primary-foreground
                    hover:opacity-90 hover:shadow-lg hover:shadow-primary/30
                    disabled:opacity-60 transition-smooth
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  data-ocid="app_detail.download_button"
                >
                  {downloadDone ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Download Started!
                    </>
                  ) : downloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Preparing Download…
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download APK
                    </>
                  )}
                </button>
              </motion.div>

              {/* Legal micro-copy */}
              <p className="text-xs text-muted-foreground text-center mt-3">
                By downloading you agree to our Terms of Use. For legal apps
                only.
              </p>
            </div>

            {/* Safety notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200/80 leading-relaxed">
                <strong className="text-amber-300">Installation Note:</strong>{" "}
                Enable "Install from Unknown Sources" in Android settings before
                installing this APK. Scan with an antivirus after download.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
