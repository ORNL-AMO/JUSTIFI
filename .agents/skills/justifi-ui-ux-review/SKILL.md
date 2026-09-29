---
name: justifi-ui-ux-review
description: Review JUSTIFI visible UI, forms, dashboards, reports, navigation, validation states, layout fit, and accessibility basics.
---

# JUSTIFI UI/UX Review

Use this skill for visible JUSTIFI UI changes, including forms, dashboards, setup wizard screens, reports, navigation, modals, and shared UI components.

## Read First

- `AGENTS.md`
- `docs/ai-personas.md`
- `CODING_STYLE.md`
- changed HTML/CSS/component files
- nearby components and shared style files under `src/assets/styles/`

## Review Guidance

- Check that labels, button text, headings, and empty states are clear and use JUSTIFI domain language.
- Verify the next user action is obvious without adding unnecessary explanatory text.
- Check validation, loading, saved, empty, error, disabled, and destructive-action states where relevant.
- Confirm text fits on mobile and desktop without overlap or cramped controls.
- Preserve nearby visual patterns, spacing, icons, and form behavior.
- Check keyboard access, focus behavior, semantic HTML, screen reader labels, and color contrast basics.
- Confirm unsaved-change and user-data protection patterns remain intact.

## Verification

- Prefer screenshot or manual workflow notes for visible changes.
- Use focused component/form tests when behavior changes.
- Do not request full-suite tests or Electron builds for UI-only changes unless broader risk is present.
