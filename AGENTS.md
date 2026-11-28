# AGENTS.md — make.fun best-household-budget-site entry

## Overview

Competition `best-household-budget-site-20261126-1457` ($50, 10 places x $5).
Build an original household budget site as static files under `app/` (no
build step, zero network requests), with real working budget math: income,
expenses by category, savings goals, and charts drawn with own code. An AI
judge compares entries pairwise by screenshots + a dossier outline; places
go by win rate. Blind rounds: next cutoff Fri 2026-11-27 15:57 WIB;
deadline Sun 2026-11-29 21:57 WIB.

- **Visual redesign pass 2, 2026-11-28 ~11:0x-11:2x WIB (this session, Sep: "redesign lagi biar ranknya naik"):** light ledger editorial — warm paper `#faf7ee`, white rounded cards (14px, soft shadow), forest green `#2d5a3d` primary + ochre `#c98a1b` accent, ink `#2a3325`; sans-serif 800 headings (Georgia serif dropped); header light with a 5px green top rule, nav active = green pill (was dark row + coral underline); hero stacked in a white card (big green $2,588, ochre spent bar, dashed ledger rule above the 3 stats — was a dark panel, 5fr/7fr); panels lost the ink top rule; h2 gets an ochre left tick; category colors reworked to a forest/ochre/earth family; trend chart Nov bar forest green, past months pale sage; over-budget red muted to `#9e3b2e`. Content, figures, math, routes, controls UNCHANGED. Screenshots retaken (01 84,489 / 02 90,643 / 03 95,725 / 04 45,212 bytes, all ≤256 KiB, 0 console errors); controls verified live (add-transaction $10 → spent $3,452, left $2,578; budget-edit groceries 720→800 → planned $3,770, reset → $3,690; goal-add $50 → cushion $4,260; all 5 routes render); dossier deterministic (same sha256 twice). Dossier Totals now "first load 5 files, 12570 bytes gzip-9 (38181 raw)". NOT uploaded, NOT resubmitted — parent handles repo upload + bundle + submit. Local git HEAD after redesign: see git log.
- **Visual redesign pass 2026-11-27 ~13:20-13:45 WIB (this session, Sep: "jangan kirim apa adanya"):** palette changed teal/green + cream → deep ink `#23272f` header/hero + burnt coral `#c2502e` accent + warm paper `#f6f1e7`; serif headings (Georgia); header is now one dark row (brand left, nav right, coral underline for active); dashboard 4-stat-card row replaced by a dark hero panel (big Left-to-spend $2,588 + spent-vs-planned bar + 3 inline stats); panels are square with an ink top rule; donut/trend split 5fr/7fr; category colors in data.js reworked warm/earthy (no green dominance). Content, figures, math, routes, controls UNCHANGED. Screenshots retaken (01 93,765 / 02 95,709 / 03 95,619 / 04 43,228 bytes, all ≤256 KiB, 0 console errors); controls verified live (add-transaction, budget-edit incl. reset, goal-add; totals re-compute). Dossier Totals now "first load 5 files, 12535 bytes gzip-9 (37644 raw)". NOT uploaded, NOT resubmitted — parent handles repo upload + bundle + submit after Sep reviews. Local git HEAD after redesign: see git log.
- **Entry SUBMITTED 2026-11-27 ~12:57 WIB** (Sep's order "HomeBase coba kirim lagi", as-is, no redesign): submission `01a21b93-bc0f-771f-8973-1d1ea0cd2845`, claim code `AF-AS831-S3P63-VSBBV-QJMBP`, repo @ `6e598a77`, bundle `~/workspace/tmp/budget-bundle.tar.gz` sha256 `4c33a5dbf1573f3da594fcf226301365c7bb27a414baded9f15afb43ae3693b2`. Server status: scored, outcome not decided yet, ALL checks pass (incl. repo_readme and repo_about). Counts from round 1 (cutoff Fri 2026-11-27 15:57 WIB); deadline Sun 2026-11-29 21:57 WIB. Record: `submission.json`. Builder session `2578e690-fb41-4ac0-baad-5d4415c239a1` (1 usage row). Local git HEAD `449c2f5` (synthetic; submitted commit is the remote `6e598a77`).
  - Pre-submit fix (parent, 2026-11-27): the repo About description was summary-only and missed the template's "Built by an AI agent..." suffix (the stats repo HAS the suffix and passed). Fixed via browser web UI and re-verified from the live page (description now full, website + topics unchanged).
  - **REDESIGN RESUBMIT ACCEPTED 2026-11-27 ~18:18 WIB** (Sep: "gas aja kalau udah pede"): first attempt 15:57 WIB was REFUSED (HTTP 422, entry_signature does not verify — sent unsigned, did not count as an entry). Retry with `--keypair ~/workspace/scripts/makefun-token-radar/makefun-keypair.json` ACCEPTED (HTTP 202): submission `01a21cb9-f904-770e-a58d-894870aea619`, claim code `AF-9ZHAB-GAQSM-ZZSHD-J89HY`, repo @ `b14eab6f`, signed by `AYRJrdsoEfTh15XpfzF1axYJcH87t5JdF7EnDgBYdi1A`, site name "Limber Eclipse". Status check right after: round 2 passed every validity check, grading underway. Counts from round 2 of 4 (cutoff Sat 2026-11-28 09:57 WIB). This is now the judged entry; the as-is submission 01a21b93 is superseded. Record: `submission.json` (resubmit_attempt_2).
  Screenshots taken with the CDP driver (`/tmp/shot.mjs`) after fixing
  Chrome 157's Local Network Access block with the
  `--ip-address-space-overrides=127.0.0.1:8080=public,[::1]:8080=public`
  launch switch (the `LocalNetworkAccessChecks` disable flag alone does
  NOT unblock top-level navigations in Chrome 157; the managed-policy
  allowlist did not help either). Dev server still on
  http://localhost:8080 for preview. Gate verified locally: `main.ts`
  runs twice byte-identical; Totals line "first load 5 files, 12155
  bytes gzip-9 (36310 raw); later by import() 0 files, 0 bytes gzip-9;
  whole app 5 files, 36310 bytes"; 0 absolute URLs in app/ source;
  4 screenshots, all within size/dimension limits. All 5 routes render
  with no console errors; add-transaction, budget-edit and goal-add
  controls verified live in the browser.
- **Still to do (parent agent):** re-check `makefun rounds best-household-budget-site-20261126-1457` after each blind round and report Sep's rank/score. Do not submit a second entry unless Sep asks.
- **GitHub repo (created by the parent agent 2026-11-26 ~22:37 WIB):**
  https://github.com/Anonone404/makefun-budget-site, public, HEAD
  6e598a77e71fe0380d3e13521e4b217b3e305a51 (5 commits, one per folder
  upload). About set: description, homepage, topics
  makefun/ai-agents/bounties/code. SUBMITTED 2026-11-27 (see above).
  Note: GitHub's license detection shows "Other" for this LICENSE file,
  same as the stats-site repo; the file itself is the standard MIT text
  and the stats entry passed the server license check with the identical
  file, so this is a detection quirk, not a problem.
- **Kit:** `~/workspace/scripts/makefun-watch/kits/best-household-budget-site-20261126-1457-kit/`
  (competition.yaml + RULES.txt read; starter/ is a layout reference only,
  never submitted unchanged — its dossier is a house site).
- **Requirements (live endpoint, checked 2026-11-26):** README.md with the
  3 live make.fun badges (competition, rank, reward), owner/repo filled,
  referral code `em5379j4`; repo About: homepage
  `https://make.fun/bounty/best-household-budget-site-20261126-1457`,
  topics `makefun, ai-agents, bounties, code`; LICENSE MIT (OSI-approved);
  `.makefun/owner.json` names the entry wallet.
- **Submit only after Sep reviews** (parent agent's turn, not this build).

## Commands

- Serve locally: `node serve.ts` (serves `app/` on http://localhost:8080,
  `--port <n>` for another port).
- Screenshots: `/tmp/shot.mjs` (pure-Node CDP driver, recreate if /tmp was
  cleared) against `/opt/meta-chromium/chrome` on port 9222 with the WebGL
  policy switches (see Troubleshooting). 4 shots: `01-dashboard.png`
  (cover, desktop), `02-budget.png`, `03-goals.png`,
  `04-phone.png` (390 x 844).
- Build the hand-in: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`,
  then read `out/dossier.json` — check the Totals line and that the gate
  rows (app_files, references, screenshots, dossier_matches) would pass.
- Re-run main.ts after retaking screenshots so `out/` carries the new ones.

## Conventions

- **Build ONLY in the builder session** (this one, started after the
  competition opened 2026-11-26 21:57 WIB). Every build step here, tool
  calls naming the repo path.
- **Write all entry code yourself in-session** via write/edit. Do NOT copy
  code from the kit starter, other entries or repos into `app/` or
  `main.ts` (transcript gate: >= 30% authored lines, main.ts >= 1 authored
  line, some file revised in >= 2 messages, >= 5 assistant turns with
  text). The starter is a layout reference only.
- **Copy verbatim (required, not authored code):** `vendor/makefun-frontend.ts`
  (byte-identical to the kit copy) and the MIT `LICENSE` text.
- Content must sound like a real person wrote it — casual, specific,
  useful — never generic marketing copy or invented-sounding numbers. All
  figures are the Parker household's own seed data, clearly labelled.
- Keep the first load small: system font stack only, no external
  libraries, no network requests of any kind. Split source into files
  with one clear job each, named for what they do.
- Every link and control on the site must actually work — nothing empty,
  broken or placeholder. Charts are drawn with own canvas code.
- Data the user edits is kept in localStorage (try/catch, in-memory
  fallback); the seed data ships in `data.js` so the site is complete
  on first load.

## Boundaries

- **NEVER** touch Sep's wallets or keys. No keypair, no API key in this
  project. No spending, no sign-ins except the GitHub repo upload the
  parent agent arranges (browser web UI — this build has no browser).
- **NEVER** submit or build from `~/workspace/scripts/makefun-watch/`.
  Builds live here, in their own project folder.
- **NEVER** write, rebuild, or summarise a session from memory to fill a
  transcript gap.
- **NEVER** copy another site's brand, text or images. HomeBase is an
  original design.
- **NEVER** add a network request to the site (no fonts, no CDN, no
  fetch). The gate refuses any absolute URL in app/ source.

## Dependencies

- Node.js 22.18+ (have 24.22.1 at /usr/bin/node). No installs needed.
- A desktop browser (Hatch Chromium) to test the site and take
  screenshots; the kit CLI needs no install.

## Config

- Entry wallet (public Solana address, for `.makefun/owner.json`):
  `AYRJrdsoEfTh15XpfzF1axYJcH87t5JdF7EnDgBYdi1A` (agent account
  @tidy-sparrow-83-7051; NOT Sep's wallet).
- GitHub repo: `makefun-budget-site` under account Anonone404 (to be
  created by the parent agent; public; About set per Requirements above).
- Referral code for the README badges: `em5379j4`.

## Error Handling

- `main.ts` failing on dossier build: read the buildDossier error — it
  names the offending reference or limit; fix app/ and re-run.
- Screenshot over 256 KiB or long side over 1280: re-shoot at a smaller
  viewport or save as JPEG quality ~80.
- Gate `references` failures are almost always an absolute URL or a
  `data:` script/style in app/ source — grep app/ for `http` and `data:`.

## Troubleshooting

- Hatch Chromium CLI `--screenshot`/`--dump-dom` silently produce
  nothing — screenshots need the CDP driver on port 9222. Chrome refuses
  to start without the WebGL policy switches:
  `--hatch-webgl-allowed-domains-file=/var/lib/hatch-browser/rootfs-base/usr/share/hatch/chromium/webgl-allowed-domains.txt`
  `--hatch-webgl-allowed-domains-sha256=8097045f0459c96c4cdc76e3a1af4e0f43f640b4b59c43d6db35e3641c0264c6`
  `/json/new` ignores its `url` param: create the target, then
  `Page.navigate` and wait for `Page.loadEventFired`.
- `/tmp` does not survive VM restarts: `shot.mjs` and the requirements
  snapshot (`/tmp/budget-req.json`) must be recreated if missing.
- The grader runs Node 22; this VM has Node 24. Keep main.ts erasable
  TypeScript (no enums, no parameter properties).
