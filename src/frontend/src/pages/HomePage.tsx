import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  Download,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { AppCard } from "../components/AppCard";
import { Layout } from "../components/Layout";
import { useSearchApps } from "../hooks/useApps";

function AppCardSkeleton() {
  return (
    <div className="rounded-2xl glassmorphism neon-border p-4 flex flex-col gap-3 h-[228px]">
      <div className="flex items-start gap-3">
        <Skeleton className="w-16 h-16 rounded-xl bg-muted/40 shrink-0" />
        <div className="flex-1 space-y-2 min-w-0">
          <Skeleton className="h-4 w-3/4 bg-muted/40" />
          <Skeleton className="h-3 w-1/3 bg-muted/30" />
          <Skeleton className="h-3 w-1/4 bg-muted/30" />
        </div>
      </div>
      <Skeleton className="h-8 w-full bg-muted/30 flex-1" />
      <Skeleton className="h-10 w-full rounded-xl bg-muted/40" />
    </div>
  );
}

const SKELETON_KEYS = [
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "s10",
];

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [termsOpen, setTermsOpen] = useState(false);
  const { data: apps = [], isLoading } = useSearchApps(searchTerm);

  const totalDownloads = apps.reduce((acc, a) => acc + a.downloadCount, 0);

  return (
    <Layout onSearch={setSearchTerm} searchValue={searchTerm}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        data-ocid="home.hero_section"
      >
        {/* Ambient glow blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 15% 60%, oklch(0.35 0.25 280 / 0.35) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, oklch(0.30 0.22 310 / 0.28) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, oklch(0.20 0.15 262 / 0.25) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs font-semibold mb-4"
                style={{ color: "oklch(0.85 0.15 262)" }}
              >
                <Sparkles className="w-3 h-3" />
                Premium App Store
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Download{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.88 0.12 270), oklch(0.72 0.30 262), oklch(0.68 0.28 310))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Premium Mods
                </span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground max-w-lg leading-relaxed">
                The best collection of modified apps and games — free downloads,
                instant access, no sign‑up required.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-3 shrink-0">
              <div className="glassmorphism neon-border rounded-xl px-4 py-3 text-center min-w-[88px]">
                <div
                  className="text-2xl font-bold font-display"
                  style={{ color: "oklch(0.72 0.30 262)" }}
                >
                  {apps.length}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Apps</div>
              </div>
              <div className="glassmorphism neon-border rounded-xl px-4 py-3 text-center min-w-[88px]">
                <div
                  className="text-2xl font-bold font-display"
                  style={{ color: "oklch(0.75 0.28 310)" }}
                >
                  {formatNum(totalDownloads)}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 justify-center mt-0.5">
                  <Download className="w-3 h-3" />
                  Downloads
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Grid Section */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-10"
        data-ocid="home.page"
      >
        {/* Section header */}
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            {searchTerm ? `Results for "${searchTerm}"` : "All Apps"}
          </h2>
          {!isLoading && (
            <span className="ml-auto text-xs text-muted-foreground">
              {apps.length} app{apps.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Loading skeletons */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            data-ocid="home.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <AppCardSkeleton key={k} />
            ))}
          </div>
        ) : apps.length === 0 ? (
          /* Empty state */
          <div
            data-ocid="home.empty_state"
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-20 h-20 rounded-2xl glassmorphism neon-border flex items-center justify-center mb-5">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No apps found
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              {searchTerm
                ? `No results for "${searchTerm}". Try a different search.`
                : "No apps uploaded yet. Check back soon!"}
            </p>
            {searchTerm && (
              <button
                type="button"
                data-ocid="home.clear_search_button"
                onClick={() => setSearchTerm("")}
                className="mt-5 px-4 py-2 text-sm rounded-xl glassmorphism neon-border text-primary hover:bg-primary/10 transition-smooth"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          /* App grid */
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            data-ocid="home.list"
          >
            {apps.map((app, i) => (
              <AppCard key={app.id} app={app} index={i + 1} />
            ))}
          </div>
        )}
      </section>

      {/* Legal Disclaimer Banner */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-8"
        data-ocid="home.disclaimer_section"
      >
        <div
          className="rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{
            background: "oklch(0.14 0.06 280 / 0.7)",
            borderColor: "oklch(0.40 0.15 262 / 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "oklch(0.35 0.20 150 / 0.25)",
              border: "1px solid oklch(0.55 0.20 150 / 0.4)",
            }}
          >
            <ShieldCheck
              className="w-5 h-5"
              style={{ color: "oklch(0.75 0.20 150)" }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: "oklch(0.80 0.18 80)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "oklch(0.80 0.18 80)" }}
              >
                Legal Notice
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">SohamxMods</span>{" "}
              only hosts legal, verified applications. All uploads are reviewed
              for safety and compliance. This platform does not distribute
              pirated content or malware. Users are responsible for ensuring
              apps comply with their local laws and device policies. By
              downloading, you agree to our{" "}
              <button
                type="button"
                data-ocid="home.terms_button"
                onClick={() => setTermsOpen(true)}
                className="underline decoration-dotted cursor-pointer bg-transparent border-0 p-0 font-inherit text-sm"
                style={{ color: "oklch(0.72 0.25 262)" }}
              >
                Terms of Use
              </button>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Terms of Use Dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent
          data-ocid="home.terms_dialog"
          className="max-w-lg glassmorphism border border-white/15"
          style={{
            background: "oklch(0.12 0.06 280 / 0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              Terms of Use
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">
                1. Legal Apps Only.
              </span>{" "}
              SohamxMods exclusively hosts applications that comply with
              applicable laws. Uploading pirated, malicious, or otherwise
              illegal content is strictly prohibited.
            </p>
            <p>
              <span className="font-semibold text-foreground">
                2. User Responsibility.
              </span>{" "}
              You are solely responsible for ensuring that any app you download
              is permitted by your local laws and your device's terms of
              service. SohamxMods accepts no liability for misuse.
            </p>
            <p>
              <span className="font-semibold text-foreground">
                3. No Warranty.
              </span>{" "}
              Apps are provided "as-is". SohamxMods does not guarantee the
              accuracy, safety, or fitness of any listed application.
            </p>
            <p>
              <span className="font-semibold text-foreground">
                4. Modifications.
              </span>{" "}
              These terms may be updated at any time. Continued use of the
              platform constitutes acceptance of the latest terms.
            </p>
            <p>
              <span className="font-semibold text-foreground">5. Contact.</span>{" "}
              For takedown requests or safety concerns, contact the platform
              admin via the site's official channels.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
