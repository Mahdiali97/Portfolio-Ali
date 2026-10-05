# DESIGN SYSTEM ARCHITECTURE: VIVID SPATIAL PORTFOLIO

## 1. Creative Direction
- **Identity**: Muhamad Ali Hanafiah (Creative Software Engineer & UI/UX Designer).
- **Vision**: A high-impact, spatial, and colorful digital environment. Architecture is brutalist, but color and interaction are vivid and human-centric. Reconciles existing structural restrictions by prioritizing *intentional vividness*.
- **Atmosphere**: Technical, artistic, experimental, spatial, and memorable. 

## 2. Quantitative Parameters
- **DESIGN_VARIANCE**: `9/10` (Asymmetrical rhythm, bespoke typographic composition, layered spatial depth).
- **MOTION_INTENSITY**: `8/10` (Fluid, choreographic motion; inertial scrolling; spring-physics 3D interactivity).
- **VISUAL_DENSITY**: `4/10` (Controlled density — content is dense where meaningful, surrounded by expansive negative space).

## 3. Vivid Color Palette
- **Primary Canvas**: `#07090e` (Deep charcoal ground).
- **Accents (Controlled Vividness)**:
    - `Engineering`: `#58a6ff` (Azure Blue).
    - `Design`: `#f78166` (Coral Orange).
    - `Infrastructure`: `#3fb950` (Success Green).
    - `Abstract/Art`: `#bc8cff` (Vivid Purple).
- **Semantic Roles**:
    - `--surface-ground`: `#07090e`
    - `--surface-card`: `#0d1117`
    - `--text-primary`: `#f0f6fc`
    - `--text-accent`: `#58a6ff` (Primary Interaction / Link)
    - `--border-subtle`: rgba(240, 246, 252, 0.08)

## 4. Typography Scale
- **Display**: Grotesk Sans (e.g., *Plus Jakarta Sans*), `800` weight, tight negative tracking, `leading-[0.8]`. Scales via `vw` clamping for robust responsiveness.
- **Editorial**: Serif (*Instrument Serif*), italicized, high-contrast, for expressive section transitions.
- **Technical**: Monospace (*JetBrains Mono*), uppercase, small `text-xs`, tracking-widest for data telemetry and technical domain tags.

## 5. Spatial & Depth Principles
- **Grid**: 8pt proportional grid (`space-y-4`, `py-24`).
- **3D / Tilt**: `Tilt3D` components on highlighted interactive cards. Perspective set to `1000px`.
- **Depth**: Multi-plane parallax (z-index layering: background artifacts < typography < foreground interactive cards). Directional shadows (`shadow-2xl` with sharp offsets).
- **Geometry**: Sharp-edge architecture (`rounded-none`, `rounded-sm`) to contrast organic media assets.

## 6. Motion Vocabulary
- **Easing**: Inertial snap (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Transitions**: Staggered entrance choreographies (Reveal) across DOM nodes. 
- **Reduced Motion**: All motion collapses to instant `opacity` fades if `prefers-reduced-motion` is active.

## 7. Accessibility & Performance
- **A11y**: Keyboard-first interaction, `focus-visible` ring-2, semantic markup (`<main>`, `<nav>`, `<section>`). Touch targets min 44px.
- **Performance**: `fetchPriority="high"` for critical hero assets; lazy-loading for non-critical exhibits; GPU-accelerated (`transform`/`opacity`) animations. Zero layout-shifting animations.

## 8. Anti-Patterns (The "Anti-Slop" Rule)
- ❌ NO generic template layouts (e.g., 3-column feature grids).
- ❌ NO gratuitous effects (motion that blocks reading or navigation).
- ❌ NO generic or unreadable typography (e.g., thin grey-on-grey text).
- ❌ NO neon blobs, generic mesh gradients, or glassmorphism abuse.
- ❌ NO filler icons.
- ❌ NO fake metrics or fake window terminals.
- ❌ NO stock imagery—use custom project captures.
- ❌ NO unsupported claims (e.g., "award-winning" without citation).

*Note: If an animation or visual element does not contribute to hierarchy, spatial understanding, or meaningful interaction, remove it.*
