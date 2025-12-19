# Django/Tailwind Page & Component Build Process

This document outlines the systematic process to follow when building any page or component in this project. Always refer to this checklist for consistency and fidelity to the design system.

---

## 1. Clarify the Target
- Identify the specific page or component to build (e.g., homepage, gallery grid, artwork card).

## 2. Reference All Relevant Sources
- **Wireframes/Annotations:** Review `WIREFRAME_ANNOTATIONS.md` for layout, spacing, and UX notes.
- **React/TSX Example:** Examine the corresponding file in `pages/` and `components/` to understand structure, props, and logic.
- **UI Components:** Check `ui/` for reusable UI elements (e.g., button, card, sheet, sidebar) and their styles/behaviors.
- **Design Tokens/Theme:** Reference `theme.css` or `design-tokens.json` for colors, fonts, and spacing.

## 3. Plan the Django Implementation
- Translate the React/TSX structure into Django templates and static files.
- Determine what data needs to be passed from views/context.
- Map out which Tailwind classes and custom CSS are needed.

## 4. Build the Template
- Write Django template code, using Tailwind classes and static file references.
- Implement all UI elements, icons (SVG or Unicode), and layout as per the React/TSX and wireframe.
- Use Django template tags/filters as needed (e.g., for formatting, loops, conditionals).

## 5. Cross-Check and Review
- Double-check against the wireframe, React/TSX, and UI files to ensure all features, styles, and behaviors are included.
- Ensure the template is responsive and accessible.
- Confirm all static files (images, CSS, JS) are referenced correctly.

## 6. Test and Iterate
- Test the result in the browser.
- If something is off, debug by reviewing the template, static files, and settings, then iterate as needed.

---

**Summary:**
For every page or component:
- Gather all design and code references
- Plan the translation to Django/Tailwind
- Build the template
- Cross-check for completeness and fidelity
- Iterate based on feedback

_Always use this process for consistent, pixel-perfect, and maintainable results._
