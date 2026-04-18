import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export function AdminLoginPage() {
  const { authenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (authenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [authenticated, navigate]);

  function handleSubmit(e: React.FormEvent) {
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

  return (
    <div
      data-ocid="admin_login.page"
      className="min-h-screen gradient-dark-bg flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, oklch(0.65 0.25 262 / 0.15) 0%, transparent 70%)",
        }}
      />
      {/* Top-right accent orb */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.28 310 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md z-10">
        {/* Branding */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div
            className="w-16 h-16 rounded-2xl glassmorphism neon-border flex items-center justify-center shadow-xl"
            style={{
              boxShadow:
                "0 0 30px oklch(0.65 0.25 262 / 0.4), 0 4px 20px oklch(0 0 0 / 0.5)",
            }}
          >
            <Shield className="w-8 h-8 text-accent" strokeWidth={1.75} />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold font-display tracking-tight leading-none">
              <span className="text-foreground">Sohamx</span>
              <span className="accent-glow">Mods</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5 tracking-wide uppercase text-[11px] font-medium">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Glassmorphism Login Card */}
        <div
          data-ocid="admin_login.card"
          className="glassmorphism rounded-2xl p-8 shadow-2xl neon-border"
          style={{
            boxShadow:
              "0 25px 50px oklch(0 0 0 / 0.6), 0 0 40px oklch(0.65 0.25 262 / 0.08)",
          }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground font-display">
              Sign In
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Enter your admin credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-password"
                className="text-foreground text-sm font-medium flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Admin Password
              </Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  data-ocid="admin_login.input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="pr-10 bg-muted/30 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent focus-visible:border-accent/50 transition-smooth"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error state */}
            {error && (
              <div
                data-ocid="admin_login.error_state"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-sm"
              >
                <span className="shrink-0 text-base leading-none">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              data-ocid="admin_login.submit_button"
              disabled={isLoading || !password}
              className="w-full font-semibold text-foreground transition-smooth relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.25 262 / 0.85) 0%, oklch(0.68 0.28 310 / 0.85) 100%)",
                border: "1px solid oklch(0.72 0.3 262 / 0.5)",
                boxShadow: isLoading
                  ? "none"
                  : "0 0 20px oklch(0.65 0.25 262 / 0.35)",
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                  Verifying…
                </span>
              ) : (
                "Login to Dashboard"
              )}
            </Button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-muted-foreground text-xs mt-5 opacity-60">
          Unauthorized access is strictly prohibited.
        </p>
      </div>
    </div>
  );
}
