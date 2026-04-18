import { j as jsxRuntimeExports, L as Link, r as reactExports, S as Skeleton } from "./index-dLbmsOq-.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-iXX3EY0W.js";
import { u as useIncrementDownload, D as Download, a as useSearchApps } from "./useApps-Dp3DwtGU.js";
import { S as Star, L as Layout, a as ShieldCheck, T as TriangleAlert } from "./Layout-C8PHEOpx.js";
import { c as createLucideIcon } from "./shield-C0jHGABo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function formatDownloads(count) {
  if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
  if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
  return String(count);
}
function getRating(id) {
  const num = Number.parseInt(id, 10) || id.charCodeAt(0);
  return (4 + num % 10 * 0.1).toFixed(1);
}
function AppCard({ app, index }) {
  const incrementDownload = useIncrementDownload();
  const handleDownload = (e) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/app/$id",
      params: { id: app.id },
      "data-ocid": `app.item.${index}`,
      className: "group block rounded-2xl glassmorphism neon-border card-hover overflow-hidden shadow-glass-sm hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: app.iconUrl,
              alt: `${app.name} icon`,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.src = "/assets/generated/icon-default.jpg";
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight truncate", children: app.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "v",
              app.version
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-amber-400 fill-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-300 font-medium", children: rating }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "/10" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1", children: app.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `app.download_button.${index}`,
            onClick: handleDownload,
            className: "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl\n            bg-gradient-to-r from-primary/80 to-accent/80 border border-primary/40\n            text-sm font-semibold text-foreground\n            hover:from-primary hover:to-accent hover:shadow-glow\n            active:scale-95 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "Download",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs opacity-70", children: formatDownloads(app.downloadCount) })
            ]
          }
        )
      ] })
    }
  );
}
function AppCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glassmorphism neon-border p-4 flex flex-col gap-3 h-[228px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 rounded-xl bg-muted/40 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 bg-muted/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3 bg-muted/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/4 bg-muted/30" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full bg-muted/30 flex-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-xl bg-muted/40" })
  ] });
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
  "s10"
];
function formatNum(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}
function HomePage() {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [termsOpen, setTermsOpen] = reactExports.useState(false);
  const { data: apps = [], isLoading } = useSearchApps(searchTerm);
  const totalDownloads = apps.reduce((acc, a) => acc + a.downloadCount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { onSearch: setSearchTerm, searchValue: searchTerm, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              "aria-hidden": "true",
              style: {
                background: "radial-gradient(ellipse at 15% 60%, oklch(0.35 0.25 280 / 0.35) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, oklch(0.30 0.22 310 / 0.28) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, oklch(0.20 0.15 262 / 0.25) 0%, transparent 60%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs font-semibold mb-4",
                  style: { color: "oklch(0.85 0.15 262)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                    "Premium App Store"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight", children: [
                "Download",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: "linear-gradient(135deg, oklch(0.88 0.12 270), oklch(0.72 0.30 262), oklch(0.68 0.28 310))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: "Premium Mods"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base text-muted-foreground max-w-lg leading-relaxed", children: "The best collection of modified apps and games — free downloads, instant access, no sign‑up required." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glassmorphism neon-border rounded-xl px-4 py-3 text-center min-w-[88px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-2xl font-bold font-display",
                    style: { color: "oklch(0.72 0.30 262)" },
                    children: apps.length
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: "Apps" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glassmorphism neon-border rounded-xl px-4 py-3 text-center min-w-[88px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-2xl font-bold font-display",
                    style: { color: "oklch(0.75 0.28 310)" },
                    children: formatNum(totalDownloads)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1 justify-center mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                  "Downloads"
                ] })
              ] })
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "max-w-7xl mx-auto px-4 sm:px-6 pb-10",
        "data-ocid": "home.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: searchTerm ? `Results for "${searchTerm}"` : "All Apps" }),
            !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground", children: [
              apps.length,
              " app",
              apps.length !== 1 ? "s" : ""
            ] })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
              "data-ocid": "home.loading_state",
              children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(AppCardSkeleton, {}, k))
            }
          ) : apps.length === 0 ? (
            /* Empty state */
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "home.empty_state",
                className: "flex flex-col items-center justify-center py-28 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl glassmorphism neon-border flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No apps found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: searchTerm ? `No results for "${searchTerm}". Try a different search.` : "No apps uploaded yet. Check back soon!" }),
                  searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "home.clear_search_button",
                      onClick: () => setSearchTerm(""),
                      className: "mt-5 px-4 py-2 text-sm rounded-xl glassmorphism neon-border text-primary hover:bg-primary/10 transition-smooth",
                      children: "Clear search"
                    }
                  )
                ]
              }
            )
          ) : (
            /* App grid */
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
                "data-ocid": "home.list",
                children: apps.map((app, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AppCard, { app, index: i + 1 }, app.id))
              }
            )
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "max-w-7xl mx-auto px-4 sm:px-6 pb-8",
        "data-ocid": "home.disclaimer_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4",
            style: {
              background: "oklch(0.14 0.06 280 / 0.7)",
              borderColor: "oklch(0.40 0.15 262 / 0.35)",
              backdropFilter: "blur(12px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                  style: {
                    background: "oklch(0.35 0.20 150 / 0.25)",
                    border: "1px solid oklch(0.55 0.20 150 / 0.4)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ShieldCheck,
                    {
                      className: "w-5 h-5",
                      style: { color: "oklch(0.75 0.20 150)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TriangleAlert,
                    {
                      className: "w-3.5 h-3.5 shrink-0",
                      style: { color: "oklch(0.80 0.18 80)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-semibold uppercase tracking-wider",
                      style: { color: "oklch(0.80 0.18 80)" },
                      children: "Legal Notice"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "SohamxMods" }),
                  " ",
                  "only hosts legal, verified applications. All uploads are reviewed for safety and compliance. This platform does not distribute pirated content or malware. Users are responsible for ensuring apps comply with their local laws and device policies. By downloading, you agree to our",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "home.terms_button",
                      onClick: () => setTermsOpen(true),
                      className: "underline decoration-dotted cursor-pointer bg-transparent border-0 p-0 font-inherit text-sm",
                      style: { color: "oklch(0.72 0.25 262)" },
                      children: "Terms of Use"
                    }
                  ),
                  "."
                ] })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: termsOpen, onOpenChange: setTermsOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "home.terms_dialog",
        className: "max-w-lg glassmorphism border border-white/15",
        style: {
          background: "oklch(0.12 0.06 280 / 0.95)",
          backdropFilter: "blur(20px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: "Terms of Use" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground space-y-3 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "1. Legal Apps Only." }),
              " ",
              "SohamxMods exclusively hosts applications that comply with applicable laws. Uploading pirated, malicious, or otherwise illegal content is strictly prohibited."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "2. User Responsibility." }),
              " ",
              "You are solely responsible for ensuring that any app you download is permitted by your local laws and your device's terms of service. SohamxMods accepts no liability for misuse."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "3. No Warranty." }),
              " ",
              'Apps are provided "as-is". SohamxMods does not guarantee the accuracy, safety, or fitness of any listed application.'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "4. Modifications." }),
              " ",
              "These terms may be updated at any time. Continued use of the platform constitutes acceptance of the latest terms."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "5. Contact." }),
              " ",
              "For takedown requests or safety concerns, contact the platform admin via the site's official channels."
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  HomePage
};
