# FE System Design Research (2026-02-17)

## Scope

- Requested source set: 25 frontend system design posts provided by user.
- Research date: 2026-02-17 (KST).
- Output goal: extract architecture/coding-style principles reusable for Ahhachul dual-product monorepo (Vite + Next).

## Coverage Summary

- Fully read (content-level): 15
- Partially read (metadata/snippet only): 3
- Skipped (access blocked or unavailable): 7

## Source Coverage Matrix

1. Read - Facebook, Rebuilding our tech stack for the new Facebook.com  
   URL: [https://engineering.fb.com/2020/05/08/web/facebook-redesign/](https://engineering.fb.com/2020/05/08/web/facebook-redesign/)
2. Skipped (403) - Twitter, How we built Twitter Lite  
   URL: [https://blog.x.com/engineering/en_us/topics/open-source/2017/how-we-built-twitter-lite](https://blog.x.com/engineering/en_us/topics/open-source/2017/how-we-built-twitter-lite)
3. Read - Instagram, Making Instagram.com faster (Part 1)  
   URL: [https://instagram-engineering.com/making-instagram-com-faster-part-1-62cc0c327538](https://instagram-engineering.com/making-instagram-com-faster-part-1-62cc0c327538)
4. Skipped (403) - Airbnb, Rearchitecting Airbnb's frontend  
   URL: [https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2](https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2)
5. Skipped (403) - Pinterest PWA case study  
   URL: [https://medium.com/dev-channel/a-pinterest-progressive-web-app-performance-case-study-3bd6ed2e6154](https://medium.com/dev-channel/a-pinterest-progressive-web-app-performance-case-study-3bd6ed2e6154)
6. Read - Spotify desktop apps architecture  
   URL: [https://engineering.atspotify.com/2021/04/building-the-future-of-our-desktop-apps/](https://engineering.atspotify.com/2021/04/building-the-future-of-our-desktop-apps/)
7. Read - Figma multiplayer technology  
   URL: [https://www.figma.com/blog/how-figmas-multiplayer-technology-works/](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)
8. Read - Notion data model behind flexibility  
   URL: [https://www.notion.com/ko/blog/data-model-behind-notion](https://www.notion.com/ko/blog/data-model-behind-notion)
9. Skipped (403) - Google Photos Web UI  
   URL: [https://medium.com/google-design/google-photos-45b714dfbed1](https://medium.com/google-design/google-photos-45b714dfbed1)
10. Partial (metadata only) - Linear sync engine  
    URL: [https://linear.app/now/scaling-the-linear-sync-engine](https://linear.app/now/scaling-the-linear-sync-engine)
11. Read - Shopify Hydrogen architecture  
    URL: [https://shopify.engineering/how-we-built-hydrogen](https://shopify.engineering/how-we-built-hydrogen)
12. Skipped (403) - Medium editor internals  
    URL: [https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480?gi=7dbf9d3446b8](https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480?gi=7dbf9d3446b8)
13. Read - Atlassian rendering performance story  
    URL: [https://www.atlassian.com/blog/atlassian-engineering/rendering-like-butter-a-confluence-whiteboards-story](https://www.atlassian.com/blog/atlassian-engineering/rendering-like-butter-a-confluence-whiteboards-story)
14. Read (web-tool accessible, curl 403) - Reddit frontend with Vite  
    URL: [https://www.reddit.com/r/RedditEng/comments/1dhztk8/building_reddits_frontend_with_vite/?captcha=1](https://www.reddit.com/r/RedditEng/comments/1dhztk8/building_reddits_frontend_with_vite/?captcha=1)
15. Read - Canva drawing tool internals  
    URL: [https://www.canva.dev/blog/engineering/behind-the-draw/](https://www.canva.dev/blog/engineering/behind-the-draw/)
16. Read - Dropbox Edison webserver architecture  
    URL: [https://dropbox.tech/frontend/edison-webserver-a-faster-more-powerful-dropbox-on-the-web](https://dropbox.tech/frontend/edison-webserver-a-faster-more-powerful-dropbox-on-the-web)
17. Read - Figma file load optimization  
    URL: [https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/)
18. Skipped (input source mismatch) - Listed as Notion API, but URL duplicates item #17 Figma article  
    URL: [https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/)
19. Read - LinkedIn next-generation forms framework  
    URL: [https://www.linkedin.com/blog/engineering/member-customer-experience/building-a-next-generation-forms-framework-at-linkedin](https://www.linkedin.com/blog/engineering/member-customer-experience/building-a-next-generation-forms-framework-at-linkedin)
20. Read - Canva multilingual design system  
    URL: [https://www.canva.dev/blog/engineering/how-to-design-in-every-language-at-once/](https://www.canva.dev/blog/engineering/how-to-design-in-every-language-at-once/)
21. Read - Lyft live activities journey architecture  
    URL: [https://eng.lyft.com/crafting-seamless-journeys-with-live-activities-abe82e98546f](https://eng.lyft.com/crafting-seamless-journeys-with-live-activities-abe82e98546f)
22. Skipped (403) - DoorDash multi-website platform  
    URL: [https://careersatdoordash.com/blog/serving-multiple-websites-and-business-logic-from-a-single-platform/](https://careersatdoordash.com/blog/serving-multiple-websites-and-business-logic-from-a-single-platform/)
23. Read - Figma LiveGraph real-time data system  
    URL: [https://www.figma.com/blog/livegraph-real-time-data-fetching-at-figma/](https://www.figma.com/blog/livegraph-real-time-data-fetching-at-figma/)
24. Skipped (406) - Uber USL stack  
    URL: [https://www.uber.com/en-KR/blog/usl-ubers-unified-signup-and-login-stack/](https://www.uber.com/en-KR/blog/usl-ubers-unified-signup-and-login-stack/)
25. Read - Threads for web architecture  
    URL: [https://engineering.fb.com/2024/05/14/web/threads-for-web-behind-the-scenes/](https://engineering.fb.com/2024/05/14/web/threads-for-web-behind-the-scenes/)

## Synthesized Principles for This Repo

1. Prefer explicit ownership boundaries over abstract purity.
   - Keep transport split (axios in Vite, fetch in Next), but centralize contracts/types/tokens.
2. Keep main thread free for interaction-critical UI.
   - Prefer worker/off-main-thread friendly patterns for heavy parse/serialize and animation-sensitive areas.
3. Shift from "one-off optimization" to reusable platform primitives.
   - Shared query keys, shared format/validate utilities, shared design tokens, shared SEO/API contracts.
4. Prioritize progressive loading + chunk stability.
   - Immutable deploy, non-destructive publish, route-level chunk integrity checks.
5. Avoid cache fragmentation.
   - Canonical query-key factories and normalized signatures.
6. Schema-first form architecture scales better than per-page hand wiring.
   - Form+Zod hooks should stay composable and reusable.
7. Keep UX consistency through central token semantics.
   - Ban inline hex and direct locale formatting in app layer.
8. Real-time or near-real-time domains require deterministic invalidation and rollback discipline.
   - Keep game-day rehearsal and rollback evidence as release-gate artifacts.
9. Favor small, reversible refactors enforced by automation.
   - Lint + scan + CI gate first, then migration.
10. Public engineering quality requires both code and governance.

- Rulebook, changelog, meeting logs, validator checklist must evolve with code.

## Immediate Micro-Style Application Decisions

1. Enforce `no-nested-ternary` globally.
2. Add blocking scan for obvious `derived-state mirror useEffect` anti-pattern.
3. Standardize naming typo cleanup (`useTimeout`, `Complaint*`) as part of convention hygiene.
4. Require behavior-preserving refactor guardrails in validator checklist.

## Not-Readable Source List (for follow-up)

- #2 Twitter Lite (403)
- #4 Airbnb frontend rearchitecture (403)
- #5 Pinterest PWA case study (403)
- #9 Google Photos Web UI (403)
- #12 Medium editor internals (403)
- #22 DoorDash single platform post (403)
- #24 Uber USL (406)
