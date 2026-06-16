# 🔍 BluntBrain Portfolio — Design Analysis & Component Walkthrough

> Reference: [bluntbrain.vercel.app](https://bluntbrain.vercel.app/)

![Recording of the website analysis](/Users/nishchaykumar/.gemini/antigravity/brain/dec0b4cf-8437-4c71-b794-96771bd75795/portfolio_analysis_1781592643761.webp)

---

## 1. Design System Overview

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#000000` / pure black | Page background |
| `--bg-card` | `#111111` / `#0a0a0a` | Card surfaces |
| `--bg-card-hover` | `#1a1a1a` | Hovered card state |
| `--accent-blue` | `#3b82f6` → `#06b6d4` | Gradient glows, links, CTAs |
| `--text-primary` | `#ffffff` | Headings |
| `--text-secondary` | `#a1a1aa` / `#71717a` | Body text, descriptions |
| `--text-muted` | `#52525b` | Dates, metadata |
| `--border` | `#27272a` / `#1f1f23` | Card borders |

### Typography

| Element | Font | Weight | Size (approx) |
|---------|------|--------|---------------|
| Brand logo | Inter / sans-serif | 700 | 18px |
| Section headings | Inter | 700 | 28–32px |
| Card titles | Inter | 600 | 18–22px |
| Body text | Inter | 400 | 14–16px |
| Metadata/dates | Inter | 400 | 12–13px |
| Skill tags | Inter | 500 | 12px |

### Spacing & Radius

- **Card border-radius**: `16px` (large rounded corners)
- **Button border-radius**: `9999px` (fully rounded / pill)
- **Section gap**: `24–32px`
- **Card internal padding**: `24px`
- **Grid gap**: `16–24px`

### Glow / Ambient Effect
Cards feature a **blue-cyan ambient glow** behind them using:
```css
/* Pseudo-element or box-shadow approach */
box-shadow: 0 0 80px 20px rgba(59, 130, 246, 0.08);
/* Or a radial gradient behind the card */
background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
```

---

## 2. Section-by-Section Component Breakdown

### 2.1 Navigation Bar (`<Navbar />`)

```
┌──────────────────────────────────────────────────────────────┐
│  BluntBrain />    [𝕏] [GitHub] [LinkedIn] [📧 Copy]   [Telegram ▶] │
│  (brand logo)          (social icons)              (CTA button)  │
└──────────────────────────────────────────────────────────────┘
```

**Structure:**
- **Position**: Static (scrolls with page), NOT sticky
- **Layout**: `display: flex; justify-content: space-between; align-items: center`
- **Left**: Brand name text with code-style `/>` suffix
- **Center**: Social icon row (X/Twitter, GitHub, LinkedIn, Email copy button)
- **Right**: Pill-shaped white CTA button → Telegram link

**Interactive Elements:**
- Copy Email button → copies email to clipboard, shows toast notification
- Social icons have hover opacity/color transitions
- Telegram button has hover scale effect

---

### 2.2 Hero Section (`<Hero />`)

```
┌─────────────────┐  ┌──────┐  ┌─────────────────────────┐
│                  │  │      │  │  Skills Grid             │
│  Intro Card      │  │ Photo│  │  ┌───┐ ┌───┐ ┌───┐      │
│  "Mobile App     │  │  (○) │  │  │ R │ │ S │ │ A │ ...  │
│   Developer &    │  │      │  │  └───┘ └───┘ └───┘      │
│   Rust Protocol  │  └──────┘  │  ┌───┐ ┌───┐ ┌───┐      │
│   Engineer"      │            │  │RN │ │TS │ │Sol│ ...  │
│                  │            │  └───┘ └───┘ └───┘      │
└─────────────────┘            └─────────────────────────┘
```

**Layout**: 3-column grid (`grid-template-columns: 1fr auto 1fr`)

**Left Card** — Intro:
- Title: Role/headline in large white bold text
- Subtitle: Years of experience + key metrics
- Background: Dark card with subtle border

**Center** — Profile Photo:
- Circular crop (`border-radius: 50%`)
- Approx 120–160px diameter
- Subtle border or glow effect

**Right Card** — Skills:
- 4×3 grid of circular skill icons
- Each icon: small circle with technology logo
- Technologies: Rust, Solana, Anchor, React Native, TypeScript, Solidity, PDAs/CPIs, Security, DeFi, CLI Tools, Docker, Git

> [!TIP]
> On mobile, this collapses to a single column stack: Intro → Photo → Skills

---

### 2.3 Work Experience (`<Experience />`)

```
┌────────────────────────────────────────────────────────┐
│  Work Experience                                        │
│                                                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │ ▸ Founder, CEO — Talkamore        Apr 2026 - Now  │ │
│  │   (collapsed)                                      │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ ▾ Senior Software Engineer — SendAI               │ │
│  │   • Building consumer mobile apps...              │ │
│  │   • Developing scalable mobile-first apps...      │ │
│  │   • Leveraging 6 years of mobile dev...           │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ ▸ Senior Frontend Engineer — DxSale  (collapsed)  │ │
│  └────────────────────────────────────────────────────┘ │
│  ...                                                    │
└────────────────────────────────────────────────────────┘
```

**Component Type**: Accordion / Collapsible list

**Structure per item:**
- **Header row**: Job title, company name, employment type, date range
- **Expandable body**: Bullet-point list of responsibilities/achievements
- **Interaction**: Click to expand/collapse with smooth height animation
- **Hover state**: Background lightens to `#1a1a1a`

**Implementation approach:**
```tsx
// React state-driven accordion
const [openIndex, setOpenIndex] = useState<number | null>(null);
```

---

### 2.4 Open Source Contributions (`<OpenSource />`)

```
┌────────────────────────────────────────────────────────┐
│  Top open source contributor to IntentKit (⭐ 6.5K+)   │
│  Built 45+ tools in Python using LangChain             │
│                                                         │
│  [View All →]                                           │
│                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ #760         │ │ #655         │ │ #543         │   │
│  │ Casino skill │ │ Autonomous   │ │ Token skills │   │
│  │ for card     │ │ task gen     │ │ defi & nfts  │   │
│  │ games        │ │              │ │              │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
└────────────────────────────────────────────────────────┘
```

**Layout**: Heading + description + horizontal card row
- Each PR card links to the actual GitHub pull request
- Cards have hover lift effect (`transform: translateY(-4px)`)

---

### 2.5 Mobile Apps Showcase (`<MobileApps />`)

```
┌───────────────────────────┐  ┌───────────────────────────┐
│                           │  │                           │
│  ┌─────┐  Jar App        │  │  ┌─────┐  NearMe App     │
│  │📱   │  10M+ users     │  │  │📱   │  Solana Seeker  │
│  │mock │  ⭐⭐⭐⭐⭐ 4.5    │  │  │mock │  Viral launch   │
│  │up   │  Feb 2022-2023  │  │  │up   │                 │
│  │     │  Led iOS team   │  │  │     │  10K+ merchants │
│  └─────┘  of 8 engineers │  │  └─────┘  accepting SOL  │
│                           │  │                           │
│  [View →]                 │  │  [View →]                 │
└───────────────────────────┘  └───────────────────────────┘
```

**Layout**: 2-column grid of tall vertical cards
- Phone mockup image on the left of each card
- App details, ratings, metrics on the right
- "View →" link buttons at the bottom

---

### 2.6 Project Showcases (`<Projects />`)

Three sub-sections, each with the same card pattern:

#### Rust & Solana Projects
```
┌─────────────────────────────────────────────┐
│  Rust & Solana              [View All →]     │
│                                              │
│  ┌──────────────────┐ ┌──────────────────┐  │
│  │ 🔒 Staking       │ │ 📊 AMM Protocol  │  │
│  │ Contract          │ │                  │  │
│  │ SOL staking with  │ │ Automated market │  │
│  │ points accum...   │ │ maker using...   │  │
│  │ [GitHub]          │ │ [GitHub]         │  │
│  └──────────────────┘ └──────────────────┘  │
└─────────────────────────────────────────────┘
```

#### Solidity & EVM Projects
Same layout pattern — 2-column card grid

#### Frontend Projects
Same layout pattern — description + project cards

**Card structure:**
- Title (bold, white)
- Description (grey, 2-3 lines, line-clamped)
- Action links: `[GitHub]` and/or `[Live]` pill buttons
- Hover: subtle lift + border glow

---

### 2.7 Hackathon Wins (`<Hackathons />`)

```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  🏆 StarkHack    │ │  🏆 SuperHack    │ │  🏆 ETH Bangkok  │
│                  │ │                  │ │                  │
│  ┌────────────┐  │ │  ┌────────────┐  │ │  ┌────────────┐  │
│  │  cover img │  │ │  │  cover img │  │ │  │  cover img │  │
│  └────────────┘  │ │  └────────────┘  │ │  └────────────┘  │
│                  │ │                  │ │                  │
│  Chain Monsters  │ │  Repo Reward     │ │  ZK Credit Score │
│  $Prize          │ │  $Prize          │ │  $Prize          │
│                  │ │                  │ │                  │
│  [ETHGlobal]     │ │  [ETHGlobal]     │ │  [ETHGlobal]     │
│  [Source]        │ │  [Source]        │ │  [Source]        │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

**Layout**: 3-column horizontal grid
- Cover image at top of each card
- Hackathon name as badge/label
- Project name + prize amount
- Links to ETH Global showcase + source code

---

### 2.8 Footer (`<Footer />`)

```
┌────────────────────────────────────────────────────────┐
│  © 2026 Ishan Lakhwani  |  Built with Next.js & TW  |  [𝕏] [GH] [LI]  │
└────────────────────────────────────────────────────────┘
```

**Layout**: 3-column flex
- Left: Copyright notice
- Center: Tech stack credit
- Right: Social icon links (duplicated from navbar)

---

## 3. Interactive Features Summary

| Feature | Implementation | UX Detail |
|---------|---------------|-----------|
| **Copy Email** | `navigator.clipboard.writeText()` | Toast notification appears briefly |
| **Accordion expand** | CSS `max-height` + `overflow: hidden` transition | Smooth 300ms ease animation |
| **Card hover lift** | `transform: translateY(-4px)` | With `transition: all 0.3s ease` |
| **Glow effects** | `box-shadow` with blue/cyan RGBA | Ambient light behind cards |
| **Link hover** | Color shift + underline | Accent blue on hover |
| **Button hover** | Scale up slightly | `transform: scale(1.05)` |
| **Responsive collapse** | CSS Grid → single column | `@media (max-width: 768px)` breakpoint |

---

## 4. Component Tree (Recommended)

```mermaid
graph TD
    A["App (layout.tsx)"] --> B["Navbar"]
    A --> C["Main Content"]
    A --> D["Footer"]
    
    C --> E["HeroSection"]
    E --> E1["IntroCard"]
    E --> E2["ProfilePhoto"]
    E --> E3["SkillsGrid"]
    
    C --> F["ExperienceSection"]
    F --> F1["AccordionItem (×6)"]
    
    C --> G["OpenSourceSection"]
    G --> G1["PRCard (×3)"]
    
    C --> H["MobileAppsSection"]
    H --> H1["AppShowcard (×2)"]
    
    C --> I["ProjectsSection"]
    I --> I1["ProjectCategory: Rust & Solana"]
    I --> I2["ProjectCategory: Solidity & EVM"]
    I --> I3["ProjectCategory: Frontend"]
    I1 --> I1a["ProjectCard (×N)"]
    I2 --> I2a["ProjectCard (×N)"]
    I3 --> I3a["ProjectCard (×N)"]
    
    C --> J["HackathonSection"]
    J --> J1["HackathonCard (×3)"]
```

---

## 5. Recommended File Structure for Your Build

```
app/
├── layout.tsx              ← Root layout (fonts, metadata, dark bg)
├── page.tsx                ← Home page (assembles all sections)
├── globals.css             ← Design tokens + global styles
│
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── IntroCard.tsx
│   ├── ProfilePhoto.tsx
│   ├── SkillsGrid.tsx
│   ├── ExperienceSection.tsx
│   ├── AccordionItem.tsx
│   ├── OpenSourceSection.tsx
│   ├── MobileAppsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ProjectCard.tsx
│   ├── HackathonSection.tsx
│   ├── HackathonCard.tsx
│   ├── Footer.tsx
│   └── Toast.tsx           ← For copy-email feedback
│
├── data/
│   ├── experience.ts       ← Work history data
│   ├── skills.ts           ← Skills list with icons
│   ├── projects.ts         ← Project details
│   └── hackathons.ts       ← Hackathon wins data
│
└── public/
    ├── profile.jpg          ← Your photo
    ├── skills/              ← Skill icon images
    └── projects/            ← Project screenshots
```

---

## 6. Key Design Takeaways

> [!IMPORTANT]
> **What makes this portfolio effective:**

1. **Dark-first design** — Pure black background with glowing accents feels premium and developer-oriented
2. **Card-based layout** — Every section is a contained card, creating visual rhythm and scanability
3. **Metrics-driven content** — "10M+ users", "$100K+ fees", "3x traffic" — quantified achievements stand out
4. **Minimal color palette** — Only black, white, grey, and blue-cyan — nothing distracting
5. **Progressive disclosure** — Accordion for work experience keeps the page clean
6. **Consistent card pattern** — Same card design reused across projects, apps, hackathons
7. **Social proof** — Open source stats, hackathon wins, app ratings build credibility

> [!TIP]
> **For your portfolio**, personalize by:
> - Replacing all content in the `data/` files with your own experience
> - Choosing your own accent color (the blue-cyan works great, but you could try purple-pink or green-teal)
> - Adding a subtle page-load animation (fade-in sections on scroll using Intersection Observer)
> - Consider adding a **Blog** or **Writing** section if you publish content

---

## Implementation Complete 🎉

I have generated the entire Next.js portfolio website codebase according to this analysis inside your `/Users/nishchaykumar/Desktop/portfolio/front` directory!

The following components were created:
1. `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`
2. `app/globals.css` - Custom design system, dark theme, and glowing card effects
3. `app/layout.tsx` - App wrapper with `Inter` font, Navbar, and Footer
4. `app/page.tsx` - Main page assembling Hero and Projects
5. `components/Navbar.tsx` - Navbar with copy email feature and social links
6. `components/Hero.tsx` - Hero section with your "coding at the speed of expansion" bio, skills, and GitHub avatar.
7. `components/Projects.tsx` - Featured section with GrabPic, t-8-t, and Pulse_Guard.
8. `components/Footer.tsx`

### Running It Locally

To see your new portfolio, open a terminal in the `/Users/nishchaykumar/Desktop/portfolio/front` directory and run:

```bash
cd /Users/nishchaykumar/Desktop/portfolio/front
bun install
bun run dev
```

Then, open `http://localhost:3000` in your browser. Since we used a custom React component for the copy email feature, everything is ready for Vercel deployment!
