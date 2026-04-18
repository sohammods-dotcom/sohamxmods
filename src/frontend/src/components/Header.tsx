import { Link, useRouter } from "@tanstack/react-router";
import { Menu, Search, Shield, X, Zap } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (term: string) => void;
  searchValue?: string;
}

export function Header({ onSearch, searchValue = "" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchValue);
  const router = useRouter();

  const handleSearch = (val: string) => {
    setLocalSearch(val);
    onSearch?.(val);
  };

  const clearSearch = () => {
    setLocalSearch("");
    onSearch?.("");
  };

  const isHome = router.state.location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 glassmorphism border-b border-white/10 shadow-glass-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:shadow-glow transition-smooth">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span
              className="font-display text-xl font-bold tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.85 0.15 270), oklch(0.72 0.30 262), oklch(0.68 0.28 310))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SohamxMods
            </span>
          </Link>

          {/* Search Bar — center, only on homepage */}
          {isHome && (
            <div className="flex-1 max-w-md hidden sm:flex">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  data-ocid="header.search_input"
                  type="text"
                  placeholder="Search apps..."
                  value={localSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 text-sm bg-muted/40 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/40 transition-smooth"
                />
                {localSearch && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/40 transition-smooth"
              data-ocid="header.home_link"
            >
              Browse
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary/15 border border-primary/30 text-primary rounded-lg hover:bg-primary/25 hover:shadow-glow transition-smooth"
              data-ocid="header.admin_link"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="sm:hidden text-muted-foreground hover:text-foreground transition-smooth"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile search + nav */}
        {menuOpen && (
          <div className="sm:hidden pb-4 flex flex-col gap-3 border-t border-white/10 pt-3">
            {isHome && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={localSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-muted/40 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/60 transition-smooth"
                />
              </div>
            )}
            <Link
              to="/"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Browse Apps
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-primary"
              onClick={() => setMenuOpen(false)}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Panel
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
