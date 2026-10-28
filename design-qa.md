# BEINING.UK portfolio design QA — 2026-10-28

final result: passed

## Scope and reference

User-approved C direction: deep navy, restrained teal accents, desktop 35% / 65% split with a sticky profile sidebar, Chinese content, and two vertically presented projects. The Brittany Chiang screenshot is a visual direction reference; the approved Chinese content, original avatar and real application screenshots replace its content.

Implementation retains Hugo, all six project URLs, the firmware URL, and the existing GitHub Pages workflow. Homepage carousel, rainbow navigation and large glow effects are no longer rendered.

## Visual and interaction checks

| Check | Result |
| --- | --- |
| 1440 × 900 | Two columns: approximately 384 / 713 px after the gutter; sidebar stays 64 px from the top when scrolling; no horizontal overflow. |
| 768 × 1024 | Single column, static profile block, readable project order, no overflow. |
| 390 × 844 | Single column, readable headline and links, proportional screenshots, no overflow. |
| 200% text | Default font emulated from 16 to 32 px; actual introduction/body text became 32 px at both 390 and 1440 px. Relative font sizes and em breakpoints reflowed the page to one column without clipping or horizontal overflow. Temporary settings restored. |
| Keyboard | First Tab exposes the skip link; Enter skips to main content; next Tab focuses IELTS TODAY with a visible teal outline. Navigation and project links remain reachable. |
| Reduced motion | Emulated reduce preference: scroll-behavior auto, navigation transition 0 s; temporary override restored after QA. |
| Images | All loaded; original aspect ratios preserved within rounding. Descriptive alt text and visible demo captions present. |
| Navigation | Work / strengths / contact anchors, active state, project links, project list, footer and firmware entry checked. |
| Project detail pages | Both featured projects follow problem / use / contribution / results; technical tags and specifications follow the main content. Mobile detail pages and a legacy hardware page inspected. |
| Browser logs | No page console warnings or errors observed during local page checks. |

## Corrections made during QA

- Broke the Chinese headline at the existing comma to avoid an awkward default desktop line break.
- Used rem font sizes and em breakpoints so increased default text size causes a readable layout change.
- Moved technical tags from the project hero to the end of the main explanation.
- Replaced the obsolete OSHWHub /gbn2333/works profile link with the verified account homepage https://oshwhub.com/Gbn2333.
- Removed the unavailable public GitHub button from the archived 4G switch project; kept its URL, hardware information and working OSHWHub link, and explained the missing public repository.

No remaining P0, P1 or P2 findings in the changed portfolio experience.

## Image provenance

- teacher-review.jpg and teacher-workspace.jpg: captured from the current IELTS TODAY teacher application running locally with fixture API responses. Names, transcripts, scores and records are synthetic; no production account or student data was used.
- miniapp-devices.png: existing native miniapp simulator capture, guest device entry, 390-device-layout verification dated 2026-10-24.
- miniapp-display.png: existing native miniapp simulator capture of content/template selection dated 2026-10-28, virtual device state.
- These are interface demonstrations. No hardware photo, device endurance, scoring accuracy or user-count claim was added.

## Build and regression checks

- Hugo Extended 0.162.1 production build: passed, 12 Hugo pages, 9 non-page bundle resources, 54 static files.
- Firmware release validator: passed application/filesystem sizes, hashes, 4M2M offsets and page references.
- JavaScript syntax and git diff whitespace checks: passed.
- Built HTML internal resources and anchor references: checked with no missing targets; image alt text checked.
- External product, GitHub profile/repository and OSHWHub links checked; unavailable old links handled as above.
- Firmware files, firmware script, firmware content/template and deployment workflow unchanged from the pre-release remote main.
- Original dirty checkout retained: original status and normalized binary diff match the captured pre-change state.

## Release and rollback

Base: bdc07407b4149340e2b22a3e23b02c51674238e6 (remote main before the redesign).
Prepared in the isolated codex/portfolio-20261028 worktree.

Publish this dedicated commit through the existing main-branch GitHub Pages workflow. Record its SHA and workflow result in the local release evidence. If online verification fails, revert only this release commit on the current remote main and publish the revert; do not force-push or restore the older dirty checkout.

This QA covers website rendering, content, links and firmware resource integrity. It does not include connecting or flashing hardware, device acceptance, or validation of AI score quality.
