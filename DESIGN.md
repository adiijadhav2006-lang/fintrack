# Design Brief

## Direction

Verdant Finance — A calming teal-green finance app that feels like a nature walk, not a bank vault.

## Tone

Organic serenity meets quiet confidence — the antithesis of aggressive financial red/orange dashboards. Every interaction feels like a breath of fresh air.

## Differentiation

The teal-to-emerald palette with a warm green-tinted cream background creates a finance app that looks alive and hopeful, never stressful or punishing.

## Color Palette

| Token       | OKLCH              | Role                                      |
| ----------- | ------------------ | ----------------------------------------- |
| background  | 0.975 0.012 168    | Soft green-tinted cream, primary surface  |
| foreground  | 0.16 0.025 200     | Deep teal-slate, readable text            |
| card        | 0.99 0.006 168     | Pure near-white card surfaces             |
| primary     | 0.44 0.16 183      | Deep teal CTA — calm authority            |
| accent      | 0.56 0.18 163      | Emerald accent — growth/success metaphor  |
| muted       | 0.92 0.014 168     | Subtle tinted muted surfaces              |
| success     | 0.58 0.18 148      | Botanical green — on-track status         |
| warning     | 0.70 0.16 82       | Warm amber — caution status               |
| destructive | 0.54 0.22 22       | Terracotta red — over budget              |

## Typography

- Display: Space Grotesk — headers, amounts, hero numbers
- Body: DM Sans — UI labels, descriptions, body text
- Scale: hero `text-3xl font-display font-bold`, h2 `text-base font-semibold`, label `text-xs font-medium uppercase tracking-wider`, body `text-sm`

## Elevation & Depth

Three layers: background (tinted cream) → card (near-white, shadow-subtle) → elevated (modal/sheet, shadow-elevated). No hard borders — depth via shadow + background shift.

## Structural Zones

| Zone       | Background      | Border             | Notes                                 |
| ---------- | --------------- | ------------------ | ------------------------------------- |
| App shell  | bg-muted/40     | —                  | Outer container on wider screens      |
| Mobile     | bg-background   | —                  | Max 430px centered container          |
| Content    | bg-background   | —                  | Scrollable page content               |
| Cards      | bg-card         | none (shadow)      | White panels floating on cream        |
| Bottom nav | bg-card         | border-t           | Fixed, elevated above content         |

## Spacing & Rhythm

4px base unit — section gaps 16px, card padding 20px, micro-spacing 4-8px. Dense enough for mobile, airy enough for calm.

## Component Patterns

- Buttons: `rounded-2xl` primary, `rounded-xl` secondary. Scale hover effect.
- Cards: `rounded-2xl`, no border, shadow-subtle. Content uses consistent 20px padding.
- Badges: pill-shaped, semantic color fill at 15% opacity with matching text.
- Progress bars: `rounded-full`, `h-2` default, color-coded by status.

## Motion

- Entrance: `slide-up` with 50ms stagger between sections. Cards fade+scale-in.
- Hover: `scale-[1.02]` on interactive cards, `transition-smooth` on all buttons.
- Decorative: ring chart transition-all duration-700, floating add button pulse.

## Constraints

- Never use red for amounts — use terracotta (destructive) only for over-budget state
- Never use pure white or black — always tinted with the 168/200 hue
- Category colors use OKLCH hex approximations for chart libraries (must use hex)

## Signature Detail

The floating "+" button in BottomNav lifts above the nav bar and the Money Left ring chart animates on mount — the financial heartbeat of the app made visible.
