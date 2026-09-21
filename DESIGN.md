# Design System — Brown Artefact

## 1. Design Direction

The interface should feel like a **collection of curated artefacts** rather than a generic modern SaaS dashboard.

### Core visual idea

> **Warm, archival, tactile, and understated.**

The design should evoke:

* old books and archival documents
* wooden objects
* paper labels
* museum artefacts
* vintage catalogues
* handcrafted objects
* natural materials

Avoid:

* bright corporate blue
* excessive gradients
* neon colors
* glassmorphism
* overly rounded "AI startup" aesthetics
* excessive shadows
* generic stock illustrations

The interface should feel **intentional and slightly historical**, while still being clean and usable.

---

## 2. Color Palette

### Primary palette

| Name         | Hex       | Usage                       |
| ------------ | --------- | --------------------------- |
| Ink Brown    | `#2B211B` | Primary text, dark surfaces |
| Dark Walnut  | `#3A2920` | Headers, navigation         |
| Chestnut     | `#5A3E2B` | Primary accent              |
| Saddle Brown | `#7A5638` | Secondary accent            |
| Terracotta   | `#A66A45` | Highlight / active states   |
| Warm Sand    | `#D8C3A5` | Borders, secondary surfaces |
| Parchment    | `#E9DDC8` | Main background             |
| Old Paper    | `#F3EBDD` | Cards and content surfaces  |
| Cream        | `#FAF7F0` | Primary light surface       |

### Recommended hierarchy

```text
Darkest
#2B211B  Ink Brown
#3A2920  Dark Walnut
#5A3E2B  Chestnut
#7A5638  Saddle Brown
#A66A45  Terracotta
#D8C3A5  Warm Sand
#E9DDC8  Parchment
#F3EBDD  Old Paper
#FAF7F0  Cream
Lightest
```

---

## 3. Color Usage

### Background

Use:

```css
background: #E9DDC8;
```

The overall page should resemble warm paper rather than pure white.

### Cards

Use:

```css
background: #F3EBDD;
```

Cards should remain subtly distinct from the background.

### Primary text

Use:

```css
color: #2B211B;
```

Avoid pure black.

### Primary action

Use:

```css
background: #5A3E2B;
color: #FAF7F0;
```

### Hover state

Use:

```css
background: #7A5638;
```

### Borders

Use:

```css
border-color: #D8C3A5;
```

Borders should be subtle and warm.

---

## 4. Artefact / Item Concept

The main visual language should be based around **physical artefacts and collected objects**.

Instead of generic icons such as:

* dashboard
* analytics
* settings
* database

prefer visual metaphors based on objects:

* document
* book
* folder
* archive box
* tag
* stamp
* key
* compass
* magnifying glass
* ruler
* scroll
* bottle
* coin
* map
* box
* catalogue card

The objects should feel like **catalogued artefacts**, not cartoon illustrations.

---

## 5. Icon Style

### Preferred style

Use:

**Outline + geometric + slightly vintage**

Icons should have:

* simple shapes
* medium-weight strokes
* minimal internal detail
* rounded or slightly organic geometry
* brown/cream colors
* consistent stroke width

Avoid:

* colorful emoji-style icons
* overly detailed 3D icons
* glossy icons
* futuristic neon icons
* inconsistent icon families

### Example visual language

```text
       ┌───────────────┐
       │   ────────    │
       │   ────────    │
       │   ────────    │
       │               │
       │    DOCUMENT   │
       └───────────────┘
```

Icons should look as if they could appear on an **old catalogue card or museum label**.

---

## 6. Artefact Cards

Important items should be presented as artefact cards.

### Structure

```text
┌─────────────────────────────────┐
│  [ICON]                         │
│                                 │
│  Artefact Name                  │
│  Short description              │
│                                 │
│  ─────────────────────────────  │
│  CATEGORY          2026         │
└─────────────────────────────────┘
```

### Card styling

```css
background: #F3EBDD;
border: 1px solid #D8C3A5;
border-radius: 8px;
color: #2B211B;
```

Cards should not have excessive rounded corners.

---

## 7. Typography

Typography should feel editorial and archival.

### Headings

Prefer a serif typeface.

Suggested direction:

```text
Cormorant Garamond
Libre Baskerville
DM Serif Display
Georgia
```

### Body

Use a clean sans-serif:

```text
Inter
IBM Plex Sans
Source Sans 3
system-ui
```

### Typography hierarchy

```text
H1
Large serif
Dark Walnut

H2
Medium serif
Chestnut

Body
Clean sans-serif
Ink Brown

Metadata
Small uppercase sans-serif
Saddle Brown
```

---

## 8. Buttons

Buttons should feel like **labels or physical controls**, not oversized SaaS controls.

### Primary button

```css
background: #5A3E2B;
color: #FAF7F0;
border: 1px solid #5A3E2B;
border-radius: 6px;
```

### Secondary button

```css
background: transparent;
color: #5A3E2B;
border: 1px solid #A66A45;
border-radius: 6px;
```

Avoid pill-shaped buttons unless they represent tags.

---

## 9. Tags

Tags can use a slightly more tactile appearance.

```css
background: #D8C3A5;
color: #3A2920;
border-radius: 4px;
padding: 4px 8px;
```

Example:

```text
[ ARCHIVE ] [ FINANCE ] [ RESEARCH ]
```

Tags should look like **catalogue labels**.

---

## 10. Navigation

Navigation should feel like the index of an archive.

Example:

```text
COLLECTION

  ◇ Overview
  ◇ Artefacts
  ◇ Archive
  ◇ Notes
  ◇ References

──────────────

SYSTEM

  ◇ Settings
  ◇ About
```

Keep navigation visually quiet.

The active item can use:

```css
background: #D8C3A5;
color: #3A2920;
```

---

## 11. Decorative Elements

Use subtle visual references to physical materials:

* thin horizontal rules
* catalogue numbers
* small stamps
* paper textures
* archival labels
* tiny serif captions
* understated geometric marks

Example:

```text
NO. 024
────────────────────
```

or:

```text
ARCHIVE / 2026
```

These should be subtle and never interfere with usability.

---

## 12. Shadows

Use very light shadows only.

Preferred:

```css
box-shadow: 0 2px 8px rgba(43, 33, 27, 0.08);
```

Avoid:

```text
large floating shadows
strong neon glows
glass effects
```

The interface should feel **flat and material**, like paper sitting on a desk.

---

## 13. Border Radius

Use restrained rounding.

```text
Cards:       8px
Buttons:     6px
Inputs:      6px
Tags:        4px
Images:      6–8px
```

Avoid extremely rounded UI such as:

```text
border-radius: 9999px
```

unless specifically used for a tag/status indicator.

---

## 14. Overall Visual Rule

Every component should answer:

> **Could this plausibly belong to an old catalogue, archive, workshop, or collection of artefacts?**

If yes, it fits the design.

If it looks like a generic:

> "AI SaaS dashboard"

then redesign it.

### Final aesthetic

**Brown + parchment + artefacts + editorial typography + restrained geometry + archival details.**

The result should feel **warm, distinctive, intellectual, and tactile**, while remaining clean enough for a modern web application.
