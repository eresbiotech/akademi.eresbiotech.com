# Türkiye biyoinformatik gündemi — release QA

Source: user-supplied `turkiye-biyoinformatik-genomik-gundemi-eylul-2026.md`, received 2026-09-28. User explicitly requested publication to the existing Hugo site. Base commit: fc7dc34.

## Editorial and source verification

All nine supplied URLs inspected on 2026-09-28. No new external source or product URL invented.

- TUGEM: service listings dated 1 September; sequencing, analysis, HPC and project planning criteria present.
- WHO September: event on 4 September, 41 participants, metadata and Pathoplexus demonstration confirmed.
- WHO August: 12–14 August and 112 professionals confirmed.
- Translational workshop: dates, DEU, TÜBİTAK support and day-two subject areas confirmed. Announcement is not a completion report: wording adjusted accordingly; unsupported detailed audience claim removed.
- Selçuk: announcement confirms 15–17 September and plant genomics/NGS/bioinformatics. Wording identifies it as an announced programme.
- TÜSEB: web reader returned 502; direct HTTPS retrieval returned 200 and confirmed San Diego, 14–16 September, and the rare-disease cohort poster. Supplied source retained.
- Mikrogen/freehire: role and skills confirmed; exact 14 September posting date not established and replaced with access date. This is an aggregator, not an independent measurement of employment demand.
- EPAM: Türkiye/hybrid and listed NGS/HPC/reproducibility skills confirmed.
- Gramian: Türkiye listing and AI benchmark/scientific-validation responsibilities confirmed.

Economic-value and broad national-trend language narrowed to qualitative interpretation. No new scientific claims. Original market-size/payment-intent caveats retained.

## Model mapping

Existing Reference single template, Article + BreadcrumbList schemas, canonical, category/tag taxonomies and automatic homepage feed reused without modification. H1 deduplicated; answer-first supplied via front matter. Two existing `reference-visual` blocks contain an original conceptual chain and a limitations table derived from the article. No third-party image copied or decorative hero introduced. Three existing related References resolve. Introductory programme link and scope verified against current content; no advanced-role competence guarantee.

## Checks

- SCIENCE: PASS within the documented source limits above.
- EDITORIAL: PASS.
- WHITE PATTERN: PASS — qualitative signals, distinction between output and judgment, capability bridge.
- CONVERSION: PASS — verified introductory programme, accurately bounded scope.
- TECHNICAL (new article): PASS — Hugo extended 0.120.4 build, one H1, canonical, JSON-LD, internal links/anchors, homepage/Hub/sitemap discovery; desktop and 390px browser inspection without horizontal overflow, both evidence blocks fit.
- Regression: 20 rendered product/package/login/campaign pages byte-identical to the pre-edit build. Existing layouts, CSS, scripts, prices, checkout, campaign and Mira files untouched.
- Existing `scripts/test-site.sh`: FAIL before and after this change. It expects obsolete product copy `Bu programla başlayın`; current baseline lacks it. This is an existing suite/baseline mismatch, not fixed by changing protected sales copy or weakening the old test. Full legacy-suite PASS is not claimed.
- New release regression command: `python3 scripts/test-reference-release.py BUILD_DIR BASELINE_BUILD_DIR turkiye-biyoinformatik-genomik-gundemi-eylul-2026` — PASS.

Only article content, two appended visual records, release-specific test and this report belong to the release. Deployment and live verification are recorded separately after push.
