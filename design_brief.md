# Design Brief: Notizzettel

## 1. App Analysis

### What This App Does
Notizzettel is a simple notes application where users can create, view, and manage personal notes. Each note has a title, content, and an optional date. It's the digital equivalent of a stack of sticky notes or a personal notebook.

### Who Uses This
Non-technical users who want a quick, simple way to jot down thoughts, reminders, and ideas. They value simplicity and immediate access over complex organization features.

### The ONE Thing Users Care About Most
**Their most recent notes.** When opening the app, users want to instantly see what they've written recently and quickly access or add new thoughts. The total note count gives them a sense of their knowledge base.

### Primary Actions (IMPORTANT!)
1. **Add a new note** → Primary Action Button (most common action)
2. View/read existing notes
3. Edit a note

---

## 2. What Makes This Design Distinctive

### Visual Identity
This design channels the warm, inviting feeling of a physical notebook or desk covered with paper notes. A subtle cream/warm paper background creates a tactile, analog feel that makes digital note-taking feel personal and intimate. The amber accent color evokes highlighter ink on paper, bringing attention without feeling cold or corporate.

### Layout Strategy
- **Hero element:** The note count displayed prominently with a large number creates a sense of accomplishment ("Look how much I've written!")
- **Asymmetric layout on desktop:** Wide main column for notes (70%), narrow sidebar for stats creates natural reading flow
- **Visual interest through card sizes:** Recent notes are displayed as cards with varying visual weight - the first note is featured larger
- **Typography creates hierarchy:** Large bold number for count, medium weight for note titles, lighter weight for content preview

### Unique Element
The notes are displayed on cards that have a very subtle "paper" texture effect - a barely perceptible warm gradient that makes each card feel like an actual note card sitting on a desk. The cards also have a slight shadow that lifts them off the page, creating depth without being heavy.

---

## 3. Theme & Colors

### Font
- **Family:** Source Sans 3
- **URL:** `https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&display=swap`
- **Why this font:** Source Sans 3 is highly readable for note content while maintaining a professional, clean character. It works beautifully at both small sizes (note content) and large sizes (hero numbers). Its neutrality lets the content shine.

### Color Palette
All colors as complete hsl() functions:

| Purpose | Color | CSS Variable |
|---------|-------|--------------|
| Page background | `hsl(45 30% 97%)` | `--background` |
| Main text | `hsl(30 10% 15%)` | `--foreground` |
| Card background | `hsl(45 40% 99%)` | `--card` |
| Card text | `hsl(30 10% 15%)` | `--card-foreground` |
| Borders | `hsl(35 20% 88%)` | `--border` |
| Primary action | `hsl(35 85% 45%)` | `--primary` |
| Text on primary | `hsl(0 0% 100%)` | `--primary-foreground` |
| Accent highlight | `hsl(35 60% 92%)` | `--accent` |
| Muted background | `hsl(40 20% 94%)` | `--muted` |
| Muted text | `hsl(30 8% 50%)` | `--muted-foreground` |
| Success/positive | `hsl(142 60% 40%)` | (component use) |
| Error/negative | `hsl(0 70% 50%)` | `--destructive` |

### Why These Colors
The warm cream and amber palette creates a cozy, inviting atmosphere that encourages writing. It feels like opening a favorite notebook. The amber primary stands out boldly for actions while harmonizing with the warm base. Muted text uses a warm gray that doesn't feel harsh against the cream background.

### Background Treatment
The page background is a warm off-white (`hsl(45 30% 97%)`) - not pure white, giving the entire interface a subtle warmth like aged paper. No gradients needed; the warmth comes from the color itself.

---

## 4. Mobile Layout (Phone)

Design mobile as a COMPLETELY SEPARATE experience, not squeezed desktop.

### Layout Approach
The mobile layout prioritizes quick scanning and easy one-thumb note creation. The hero stat is compact but prominent at the top, with notes stacked vertically as full-width cards for easy reading. The primary action floats at the bottom within easy thumb reach.

### What Users See (Top to Bottom)

**Header:**
- App title "Notizzettel" (left-aligned, 20px, font-weight 600)
- Simple, clean - no extra icons or actions in header

**Hero Section:**
- Total note count displayed as large number (48px, font-weight 700) with amber accent color
- Label "Notizen" below in muted text (14px)
- Horizontal line separator below
- Takes roughly 100px height - compact but impactful

**Section 2: Recent Notes List**
- Full-width cards stacked vertically
- Each card shows:
  - Title (18px, font-weight 600, truncated to 1 line)
  - Content preview (14px, muted color, truncated to 2 lines)
  - Date in small muted text at bottom right (12px)
- Cards have 12px vertical gap between them
- Padding 16px inside cards
- Subtle shadow for depth

**Section 3: Empty State (if no notes)**
- Friendly illustration placeholder (muted icon of a note)
- Text: "Noch keine Notizen vorhanden"
- Secondary text: "Erstelle deine erste Notiz!"

**Bottom Navigation / Action:**
- Fixed bottom button bar with "Neue Notiz" primary action button
- Button spans nearly full width (with 16px margins)
- 56px height, rounded corners (12px)
- Amber background, white text

### Mobile-Specific Adaptations
- Notes display as single column full-width cards
- Content preview is limited to 2 lines to keep cards scannable
- Tap on any note card opens detail view/edit mode
- Bottom action button is fixed positioned for constant access

### Touch Targets
- Note cards: Entire card is tappable (minimum 60px height)
- Primary button: 56px height, full width minus margins
- Adequate spacing (12px) between cards to prevent mis-taps

### Interactive Elements
- Tap note card → Opens note in view/edit mode
- Long press note card → Could show delete option (optional enhancement)

---

## 5. Desktop Layout

### Overall Structure
Two-column asymmetric layout:
- **Left column (70%):** Notes grid with featured first note
- **Right column (30%):** Stats sidebar with hero number and quick actions

Eye flow: Right sidebar (stats) → Left column (notes grid) → follows natural reading pattern with stats providing context before diving into content.

### Section Layout

**Header (full width):**
- "Notizzettel" title (24px, font-weight 600) on left
- "Neue Notiz" primary button on right (amber, white text)
- Subtle bottom border separator

**Right Sidebar (30%, sticky):**
- Hero stat: Large note count (64px number, font-weight 700, amber color)
- Label "Notizen insgesamt" below
- Secondary stat: "Letzte Notiz" with relative date
- Vertical padding creates breathing room

**Left Main Area (70%):**
- Notes displayed as cards in a responsive grid
- 2-3 columns depending on available width
- First note card can span 2 columns if there are 3+ notes (featured treatment)
- Each card shows: Title, content preview (3 lines), date
- Cards have consistent height or masonry-style variable height

### What Appears on Hover
- Note cards: Subtle shadow increase and slight scale (1.01) for lift effect
- Note cards: Show subtle "Bearbeiten" text hint in corner on hover
- Primary button: Slight darkening of amber background

### Clickable/Interactive Areas
- Click note card → Opens note detail/edit view
- Primary action button → Opens new note form

---

## 6. Components

### Hero KPI
The MOST important metric that users see first.

- **Title:** Notizen insgesamt
- **Data source:** Notiz app (count all records)
- **Calculation:** Simple count of all Notiz records
- **Display:** Large number (64px desktop, 48px mobile) in amber accent color, with label below in muted text
- **Context shown:** None needed - the number itself is meaningful
- **Why this is the hero:** Users feel accomplishment seeing their note collection grow. It answers "How much have I captured?" instantly.

### Secondary KPIs

**Letzte Aktivität**
- Source: Notiz (most recent createdat or updatedat)
- Calculation: Find most recent timestamp, format as relative time ("vor 2 Stunden")
- Format: Relative time string
- Display: Text below hero on sidebar (desktop) or omitted on mobile

### Lists/Tables

**Notizen Liste**
- Purpose: Let users browse and access their notes
- Source: Notiz app
- Fields shown: titel, inhalt (preview), datum
- Mobile style: Full-width stacked cards
- Desktop style: Grid cards (2-3 columns)
- Sort: By createdat descending (newest first)
- Limit: Show all notes, but paginate or virtualize if >50

### Primary Action Button (REQUIRED!)

- **Label:** "Neue Notiz"
- **Action:** add_record
- **Target app:** Notiz (app_id: 6981db38e9dc8ebe4045b8f0)
- **What data:** Form with fields:
  - titel (required text input)
  - inhalt (textarea, multiline)
  - datum (date picker, defaults to today)
- **Mobile position:** bottom_fixed
- **Desktop position:** header
- **Why this action:** Adding notes is the core function of the app. Users open the app specifically to capture thoughts quickly. One-tap access is essential.

---

## 7. Visual Details

### Border Radius
Rounded (10px) - Friendly and approachable, matching the warm aesthetic. Not too sharp (corporate) or too pill-shaped (playful).

### Shadows
Subtle - Cards have a very gentle shadow: `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`. Creates depth without heaviness. Hover state increases shadow slightly.

### Spacing
Normal - 16px base unit. Cards have 16px internal padding. 12-16px gaps between cards. 24px section margins.

### Animations
- **Page load:** Subtle fade-in (200ms) for content
- **Hover effects:** Cards lift slightly with shadow transition (150ms ease)
- **Tap feedback:** Slight scale down (0.98) on tap/click

---

## 8. CSS Variables (Copy Exactly!)

The implementer MUST copy these values exactly into `src/index.css`:

```css
:root {
  --radius: 0.625rem;
  --background: hsl(45 30% 97%);
  --foreground: hsl(30 10% 15%);
  --card: hsl(45 40% 99%);
  --card-foreground: hsl(30 10% 15%);
  --popover: hsl(45 40% 99%);
  --popover-foreground: hsl(30 10% 15%);
  --primary: hsl(35 85% 45%);
  --primary-foreground: hsl(0 0% 100%);
  --secondary: hsl(40 20% 94%);
  --secondary-foreground: hsl(30 10% 25%);
  --muted: hsl(40 20% 94%);
  --muted-foreground: hsl(30 8% 50%);
  --accent: hsl(35 60% 92%);
  --accent-foreground: hsl(30 10% 20%);
  --destructive: hsl(0 70% 50%);
  --border: hsl(35 20% 88%);
  --input: hsl(35 20% 88%);
  --ring: hsl(35 85% 45%);
  --chart-1: hsl(35 85% 45%);
  --chart-2: hsl(45 70% 60%);
  --chart-3: hsl(30 60% 50%);
  --chart-4: hsl(40 50% 70%);
  --chart-5: hsl(25 40% 40%);
}
```

---

## 9. Implementation Checklist

The implementer should verify:
- [ ] Font loaded from URL: `https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&display=swap`
- [ ] All CSS variables copied exactly
- [ ] Mobile layout: Single column, fixed bottom button, compact hero stat
- [ ] Desktop layout: Two-column (70/30), sidebar with hero stat, grid notes
- [ ] Hero element (note count) is prominent with 48-64px font size in amber
- [ ] Cards have warm paper-like background and subtle shadows
- [ ] Primary action "Neue Notiz" is always accessible (bottom on mobile, header on desktop)
- [ ] Notes sorted by newest first
- [ ] Empty state shown when no notes exist
