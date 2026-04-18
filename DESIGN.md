# Design Brief: SohamxMods

**Purpose:** Premium mobile app download platform (mini Play Store) for browsing and downloading APK files with instant visibility.

**Tone:** Bold, immersive, premium. Dark futurism meets refined tech aesthetic — Apple App Store meets gaming platforms.

**Differentiation:** Glassmorphism + dark gradient background + neon accents = fresh, high-end app store experience.

## Palette (Dark Mode)

| Token | OKLCH | Usage |
|-------|--------|-------|
| background | 0.08 0 0 | Deep black, page foundation |
| card | 0.15 0.05 280 | Frosted glass, app cards |
| primary | 0.65 0.25 262 | Electric purple, CTAs, accents |
| accent | 0.72 0.30 262 | Cyan/purple glow, highlights |
| foreground | 0.96 0 0 | Near-white, main text |
| muted | 0.22 0.05 280 | Subtle surfaces, secondary info |
| border | 0.20 0.05 280 | Subtle dividers, transparency-based |

## Typography

| Role | Font | Scale | Weight |
|------|------|-------|--------|
| Display | Satoshi | 32–48px | 700 (bold) |
| Body | GeneralSans | 14–16px | 400–500 |
| Mono | JetBrainsMono | 12–14px | 400 |

## Elevation & Depth

| Zone | Treatment |
|------|-----------|
| Background | Gradient: black (#080808) → dark purple (#1a0f2e) |
| Header | Glassmorphism card, sticky, subtle shadow |
| Cards (apps) | 30–40% opacity, backdrop-blur-md, neon border |
| Popover/modals | 0.20 lightness, glassmorphism, ring focus |

## Structural Zones

| Zone | Surface | Border | Effect |
|------|---------|--------|--------|
| Header | glass card/30 | border white/10 | Sticky, shadow-glass-sm |
| Content grid | gradient-dark-bg | none | Full bleed gradient |
| App cards | card/30 glass | neon-border accent/40 | Hover scale-105, shadow-glow |
| Footer | muted/10 glass | border-border/40 | Minimal, optional |

## Component Patterns

- **Buttons:** Primary = accent bg, smooth hover, glow shadow. Secondary = muted bg, border accent/40.
- **App Card:** glassmorphism, icon, title, description, version, download btn. Hover: scale-105 + shadow-glow.
- **Header:** Logo (Satoshi, accent color), nav links, admin login link.
- **Input:** glass background, neon border on focus, smooth transition.

## Motion

| Element | Interaction | Animation |
|---------|-------------|-----------|
| App cards | Hover | scale-105 + shadow-glow (300ms) |
| Buttons | Hover | text accent-glow + transition-smooth |
| Download btn | Active | pulse-glow (2s infinite) |
| Page load | Initial | Staggered card entrance |

## Constraints

- Only OKLCH tokens; no raw hex or named colors.
- Glassmorphism: card/30 + backdrop-blur-md + border white/10 (not card/50).
- Neon accents sparingly — primary CTA, active state, hover glow only.
- Accessibility: AA+ contrast on all text (verified in OKLCH values).

## Signature Detail

Dark gradient background with glassmorphism cards creates depth and immersion. Neon accents (purple/cyan) on dark ground evoke gaming/streaming platforms while maintaining premium professionalism. Every interactive element triggers glow shadow, reinforcing the "modern" aesthetic.
