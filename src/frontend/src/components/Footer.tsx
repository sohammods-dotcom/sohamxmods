import { AlertTriangle, Zap } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer className="border-t border-white/10 bg-card/20 backdrop-blur-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Legal disclaimer */}
        <div className="mb-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-200/80 leading-relaxed">
            <strong className="text-amber-300 font-semibold">
              Legal Disclaimer:
            </strong>{" "}
            This platform only hosts legal apps. Ensure you only download safe
            and verified applications. SohamxMods is not responsible for any
            damage caused by misuse of downloaded files. All apps must comply
            with local laws and regulations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary" />
            </div>
            <span className="font-display text-base font-bold text-muted-foreground">
              SohamxMods
            </span>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary transition-smooth underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
