# Featured Projects Revision Design QA

Date: 2026-07-27

## Source visual truth

- User screenshot: `C:\Users\BEINING\AppData\Local\Temp\codex-clipboard-3ab30391-c5b8-4e3e-9ad7-b14df6fbd365.png`
- Source pixels: 1547 × 1261.
- Relevant source state: dark-mode 4G project detail page with an incomplete second gallery image.
- Final written requirements: vertically centred controls, immediate non-repeating autoplay, pause while the pointer is over any featured card, corrected arrow directions, smooth mobile animation, cover clicks entering the project, no lightbox, no related-project section, and exactly five skill names.

## Rendered implementation

- Homepage desktop: `C:\Users\BEINING\AppData\Local\Temp\codex-beining-qa-20260727\implementation-featured-desktop-final.png`
- Homepage mobile: `C:\Users\BEINING\AppData\Local\Temp\codex-beining-qa-20260727\implementation-featured-mobile-final.png`
- Project gallery desktop: `C:\Users\BEINING\AppData\Local\Temp\codex-beining-qa-20260727\implementation-gallery-desktop-revised.png`
- Focused before/after comparison: `C:\Users\BEINING\AppData\Local\Temp\codex-beining-qa-20260727\comparison-gallery-revised.png`
- Desktop viewport: 1280 × 720 at device scale factor 1.
- Mobile viewport: 390 × 700 at device scale factor 1.
- State: local Hugo preview, dark color scheme, featured carousel moving, 4G project gallery visible.

## Full-view evidence

- The homepage contains one `.featured-marquee-set` and four unique `.featured-project-card` elements.
- Both controls use `top: 50%` plus `translateY(-50%)`, placing them at the vertical centre of the carousel frame on desktop and mobile.
- Autoplay starts on page load. A desktop sample moved 17.215 px in 0.7 seconds, approximately 24.59 px/s.
- Seven mobile samples were monotonic with roughly 3.2 px between 100 ms sampling calls, without visible snapping or integer-only stepping.
- Mobile uses compositor-friendly `translate3d`, `will-change: transform`, paint containment, no edge mask, and `touch-action: pan-y`.
- The 390 px mobile page has 0 px document-level horizontal overflow; the first card is 304.19 px wide.
- The 4G card cover now uses the 1600 × 1089, 298,794-byte optimized JPEG instead of the 14.96 MB source PNG.
- The skills matrix contains only `PCB Design`, `LTE Cat.1 / 4G`, `ESP32`, `WebRTC / Audio Processing`, and `SQLite`.

## Focused comparison evidence

The focused comparison image places the user-provided broken-gallery screenshot and the revised browser capture together. The original second asset contains a large transparent lower region. The revised gallery uses a complete 2890 × 3653 WebP project photograph and `object-fit: contain`, so the entire device remains visible without artificial cropping.

## Interaction and accessibility checks

- Left control: transform changed from -300.445 px to -363 px, so the content moved left.
- Right control: transform changed from -363 px to 0 px, so the content moved right.
- Hover pause: dispatching a real `mouseenter` in the page context produced 0 px movement over 0.75 seconds; after `mouseleave`, movement resumed by 18.816 px over 0.75 seconds.
- Cover navigation: clicking the first `.featured-project-cover-link` opened `/projects/bicycle-locator-air780eg/`.
- There is no featured-project lightbox in the DOM.
- The project detail page contains no `同类项目` text or related-project section.
- Pointer dragging suppresses navigation only after an actual drag; an ordinary cover click remains a link activation.
- Arrow-key control, horizontal-wheel control, touch dragging, and the five-second manual-interaction pause remain available.
- With `prefers-reduced-motion: reduce`, movement was 0 px over 0.75 seconds; restoring the preference resumed 18.814 px of movement over 0.75 seconds.
- Browser console warnings/errors: none.

## Fidelity surfaces

- Fonts, typography, colors, status treatments, and project-card visual language remain unchanged.
- The existing card widths and gaps remain unchanged; only the requested carousel controls and motion implementation changed.
- All four projects remain unique and retain their approved summaries, tags, and external links.
- The complete gallery asset loads at its natural size with contain fitting.

## Validation

- `node --check assets/js/featured-projects.js`: passed.
- `hugo --gc --minify`: passed.
- `git diff --check`: passed.
- No actionable P0, P1, or P2 findings remain.

final result: passed
