import { b as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-dLbmsOq-.js";
import { B as Button } from "./button-cFVUO7n4.js";
import { u as useAdminAuth, L as Label, I as Input } from "./useAdminAuth-rWuVu_M1.js";
import { c as createLucideIcon, S as Shield } from "./shield-C0jHGABo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$2);
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
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function AdminLoginPage() {
  const { authenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (authenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [authenticated, navigate]);
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      const success = login(password);
      if (success) {
        navigate({ to: "/admin/dashboard" });
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
        setIsLoading(false);
      }
    }, 500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin_login.page",
      className: "min-h-screen gradient-dark-bg flex items-center justify-center p-4 relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 65% 55% at 50% 50%, oklch(0.65 0.25 262 / 0.15) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(circle, oklch(0.68 0.28 310 / 0.12) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-16 h-16 rounded-2xl glassmorphism neon-border flex items-center justify-center shadow-xl",
                style: {
                  boxShadow: "0 0 30px oklch(0.65 0.25 262 / 0.4), 0 4px 20px oklch(0 0 0 / 0.5)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-accent", strokeWidth: 1.75 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold font-display tracking-tight leading-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Sohamx" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accent-glow", children: "Mods" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1.5 tracking-wide uppercase text-[11px] font-medium", children: "Admin Portal" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "admin_login.card",
              className: "glassmorphism rounded-2xl p-8 shadow-2xl neon-border",
              style: {
                boxShadow: "0 25px 50px oklch(0 0 0 / 0.6), 0 0 40px oklch(0.65 0.25 262 / 0.08)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground font-display", children: "Sign In" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Enter your admin credentials to continue" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "admin-password",
                        className: "text-foreground text-sm font-medium flex items-center gap-1.5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                          "Admin Password"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "admin-password",
                          "data-ocid": "admin_login.input",
                          type: showPassword ? "text" : "password",
                          value: password,
                          onChange: (e) => {
                            setPassword(e.target.value);
                            if (error) setError("");
                          },
                          placeholder: "Enter admin password",
                          autoComplete: "current-password",
                          className: "pr-10 bg-muted/30 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent focus-visible:border-accent/50 transition-smooth",
                          required: true
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowPassword((v) => !v),
                          "aria-label": showPassword ? "Hide password" : "Show password",
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                          children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ] }),
                  error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-ocid": "admin_login.error_state",
                      className: "flex items-center gap-2 px-3 py-2.5 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-base leading-none", children: "⚠" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      "data-ocid": "admin_login.submit_button",
                      disabled: isLoading || !password,
                      className: "w-full font-semibold text-foreground transition-smooth relative overflow-hidden",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.65 0.25 262 / 0.85) 0%, oklch(0.68 0.28 310 / 0.85) 100%)",
                        border: "1px solid oklch(0.72 0.3 262 / 0.5)",
                        boxShadow: isLoading ? "none" : "0 0 20px oklch(0.65 0.25 262 / 0.35)"
                      },
                      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" }),
                        "Verifying…"
                      ] }) : "Login to Dashboard"
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground text-xs mt-5 opacity-60", children: "Unauthorized access is strictly prohibited." })
        ] })
      ]
    }
  );
}
export {
  AdminLoginPage
};
