import { Link } from "@tanstack/react-router";
import { Download, Star } from "lucide-react";
import { useIncrementDownload } from "../hooks/useApps";
import type { AppRecord } from "../types";

interface AppCardProps {
  app: AppRecord;
  index: number;
}

function formatDownloads(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return String(count);
}

// Deterministic star rating from id
function getRating(id: string): string {
  const num = Number.parseInt(id, 10) || id.charCodeAt(0);
  return (4.0 + (num % 10) * 0.1).toFixed(1);
}

export function AppCard({ app, index }: AppCardProps) {
  const incrementDownload = useIncrementDownload();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    incrementDownload.mutate(app.id);
    if (app.apkUrl) {
      const a = document.createElement("a");
      a.href = app.apkUrl;
      a.download = `${app.name.replace(/\s+/g, "_")}_v${app.version}.apk`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const rating = getRating(app.id);

  return (
    <Link
      to="/app/$id"
      params={{ id: app.id }}
      data-ocid={`app.item.${index}`}
      className="group block rounded-2xl glassmorphism neon-border card-hover overflow-hidden shadow-glass-sm hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <div className="p-4 flex flex-col gap-3 h-full">
        {/* Icon + name */}
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-muted/30">
            <img
              src={app.iconUrl}
              alt={`${app.name} icon`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/generated/icon-default.jpg";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base leading-tight truncate">
              {app.name}
            </h3>
            <span className="text-xs text-muted-foreground">
              v{app.version}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs text-amber-300 font-medium">
                {rating}
              </span>
              <span className="text-xs text-muted-foreground">/10</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {app.description}
        </p>

        {/* Download button */}
        <button
          type="button"
          data-ocid={`app.download_button.${index}`}
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
            bg-gradient-to-r from-primary/80 to-accent/80 border border-primary/40
            text-sm font-semibold text-foreground
            hover:from-primary hover:to-accent hover:shadow-glow
            active:scale-95 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <Download className="w-4 h-4" />
          Download
          <span className="ml-auto text-xs opacity-70">
            {formatDownloads(app.downloadCount)}
          </span>
        </button>
      </div>
    </Link>
  );
}
