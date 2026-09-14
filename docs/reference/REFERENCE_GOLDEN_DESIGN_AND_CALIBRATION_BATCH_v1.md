# ERES REFERENCE HUB — GOLDEN DESIGN + CALIBRATION BATCH v1

**Status:** AUTHORITATIVE / APPROVED\
**Owner approval date:** 14 Sep 2026\
**Purpose:** Remove ambiguity for Codex implementation. This file supplies the approved visual reference and the first 10 calibration ARTICLE_IDs.

---

## 1. AUTHORITATIVE GOLDEN DESIGN SOURCE

Use the attached file:

`GEO2R_REFERENCE_GOLDEN_APPROVED.png`

This is the approved visual north star for the ERES Reference Hub article page.

**Do not invent a new Reference design.**\
**Do not replace this system with an infographic-first page.**\
**Do not redesign the existing ERES site around it.**

The screenshot is authoritative for:
- information hierarchy;
- editorial density;
- text-to-visual rhythm;
- two-column desktop composition;
- placement/role of conversion modules;
- scientific evidence presentation;
- overall white/navy/blue ERES visual language.

Implementation does **not** need to be pixel-identical if the existing Hugo design system requires semantic/responsive adaptation. Reuse existing typography, spacing tokens, buttons, cards and components where possible, but preserve the approved hierarchy and reader/conversion experience.

Any material redesign requires explicit `REFERENCE-DESIGN-UNLOCK`.

---

# 2. LOCKED PAGE ARCHITECTURE

## Header / top region
Preserve a clean ERES Reference editorial header with:
- ERES Reference Hub identity;
- existing site navigation/search where appropriate;
- breadcrumb;
- publication metadata;
- strong H1;
- short answer-first introduction.

No oversized decorative lifestyle hero is required.

## Main desktop composition
Default desktop pattern:

**Main article column + right conversion/support rail**

The article remains visually primary.

The right rail may contain:
- relevant ERES course/path card;
- capability-based CTA;
- verified testimonial only when an approved real testimonial exists;
- related Reference links;
- supporting program proof.

Do not invent testimonials, student outcomes, prices or claims.

## Intro orientation
Near the beginning use a compact:
**“Bu yazıda neler var?”**
orientation block when it improves scanning.

It must not become a large infographic.

## Article body
Text-first editorial article.

Preferred repeating rhythm:

**problem / recognition\
→ scientific distinction or reframe\
→ evidence / example / functional visual\
→ what it means\
→ capability gap\
→ next scientific step or paid solution**

Do not mechanically expose these labels to the reader unless they make natural editorial sense.

## Scientific visuals
Scientific visuals are separate evidence/payoff elements inside the article.

Preferred:
- real and permitted software/database screenshots;
- annotated crops;
- deterministic plots;
- scientific tables;
- compact comparison graphics;
- mini decision diagrams when truly useful.

Avoid:
- one giant infographic containing the whole article;
- decorative DNA/molecule graphics;
- generic science stock;
- generated UI presented as a real specific software/student output.

Every visual must clarify:
- a distinction;
- a comparison;
- a result;
- or a decision.

## Capability bridge
Canonical commercial logic:

**“Sorunun kaynağını görmek başka, analizi doğru yönetmek başka.”**

The exact sentence need not be repeated mechanically. Preserve its meaning.

Free Reference content should:
- identify the real scientific problem;
- show where/why the problem may occur;
- explain an important scientific distinction;
- give useful scientific understanding;
- demonstrate ERES competence;
- make the missing capability visible;
- show that the capability is learnable.

Paid course/path contains:
- end-to-end workflow;
- guided application;
- repeated practice;
- complete decision chain;
- interpretation practice;
- capability building.

Desired reader state:

**“Sorunun nerede olduğunu görüyorum; ERES bunu gerçekten biliyor; bu dersi alırsam çözüm yolunu öğrenebilirim; bunu öğrenmek istiyorum.”**

## CTA
CTA begins from the desired capability/current scientific situation, not the product name.

Preferred:
**“GEO2R analizini doğru kurmayı ve yorumlamayı öğren.”**

Avoid generic:
**“Programımızı inceleyin.”**

High-heat exact-fit readers may route directly to the core program.

## Related Reference
Use related References only for a genuine adjacent scientific question.

Do not force a long funnel.

Unpublished related articles may be stored as suggested internal links and activated after publication.

## Sources
Scientific claims should be supported by appropriate:
- official documentation;
- primary literature;
- strong methodological sources;
- high-quality reviews.

Source blocks should be clean and readable.

## Evergreen rule
Temporary discount/FOMO/campaign copy does not enter the evergreen scientific body.

Any real campaign uses a separate dynamic commercial-opportunity layer.

---

# 3. MOBILE BEHAVIOR

On narrow screens:
- article remains first priority;
- right rail modules move into a natural in-content sequence;
- no horizontal overflow;
- tables must collapse, scroll safely, or reformat;
- scientific visuals use readable full-width treatment;
- CTA remains visible but does not interrupt the first scientific payoff;
- typography remains comfortably readable;
- no desktop-only composition assumptions.

---

# 4. FIRST 10 CALIBRATION ARTICLES — APPROVED SET

These 10 ARTICLE_IDs are the approved first calibration batch.

They are selected as:
**Week 1 complete + Week 2 complete + Week 3 first two articles.**

This selection is authoritative unless the owner explicitly changes it.

## WEEK 1 — Biyoinformatiğe Giriş + GEO2R

### 1. W1-PROBLEM
**Title:** Elinizde bir gen listesi var: İlk olarak neye bakmalısınız?\
**Role:** PROBLEM RECOGNITION

### 2. W1-REFRAME
**Title:** GEO2R size neyi söyler, neyi söylemez?\
**Role:** SCIENTIFIC REFRAME

### 3. W1-WORKFLOW
**Title:** log2 Fold Change ve adjusted p-value birlikte nasıl okunur?\
**Role:** WORKFLOW / EVIDENCE

### 4. W1-DECISION
**Title:** Biyoinformatiğe başlamak için önce R öğrenmek zorunda mısınız?\
**Role:** DECISION / ROUTE

## WEEK 2 — NCBI / Ensembl / UCSC

### 5. W2-PROBLEM
**Title:** Aynı geni NCBI, Ensembl ve UCSC'de aradığınızda neden farklı sonuçlar görürsünüz?\
**Role:** PROBLEM RECOGNITION

### 6. W2-REFRAME
**Title:** Gene ID, transcript ID ve protein ID aynı şey değildir\
**Role:** SCIENTIFIC REFRAME

### 7. W2-WORKFLOW
**Title:** Bir genin transcriptlerini incelerken hangi kayda güvenmelisiniz?\
**Role:** WORKFLOW / EVIDENCE

### 8. W2-DECISION
**Title:** NCBI mi, Ensembl mı, UCSC mi? Bilimsel soruya göre seçim rehberi\
**Role:** DECISION / ROUTE

## WEEK 3 — R + Biyolojik Veri

### 9. W3-PROBLEM
**Title:** R'da analiz çalıştı ama sonuç ne anlama geliyor? Asıl problem kod olmayabilir\
**Role:** PROBLEM RECOGNITION

### 10. W3-REFRAME
**Title:** Biyolojik veri neden Excel tablosu gibi düşünülmemeli?\
**Role:** SCIENTIFIC REFRAME

---

# 5. CALIBRATION / PUBLISH APPROVAL RULE

The 10 ARTICLE_IDs above are approved as the **first calibration production set**.

Codex may:
- create `/reference/`;
- implement the locked template;
- produce/build these 10 article pages;
- create taxonomy/metadata/schema/breadcrumb/source blocks;
- prepare routing and product continuation;
- prepare `ERES’ten` homepage entries;
- run QA and staging/preview.

During calibration, **each article still requires a final human pre-publish content approval** after SCIENCE / EDITORIAL / VISUAL / CONVERSION / TECHNICAL / MOBILE QA passes.

This is a content/factual/conversion approval gate, **not a new design approval cycle**.

Do not ask the owner to re-approve the locked Reference page design for each article.

Once the first 10 establish a stable PASS pattern, the owner may explicitly unlock automatic publication for future PASS articles.

---

# 6. IMPLEMENTATION ACCEPTANCE CRITERIA

The Reference system is correctly implemented when:

- `/reference/` hub exists and matches the existing ERES site architecture;
- all Reference article pages use the locked golden hierarchy;
- no new competing visual system is introduced;
- Hugo build passes;
- desktop and ~390px mobile pass;
- canonical, Article/BlogPosting schema and breadcrumb are correct;
- internal links behave safely when related articles are unpublished;
- functional scientific visuals render correctly;
- capability CTA routes to the verified relevant ERES path;
- no invented testimonial/price/claim exists;
- `ERES’ten` can receive new Reference entries without homepage redesign;
- evergreen content remains independent of campaigns.

---

# 7. CODEX START INSTRUCTION

Use this file and `GEO2R_REFERENCE_GOLDEN_APPROVED.png` as the missing design/calibration inputs requested earlier.

Do not stop again to ask for:
- the approved GEO2R design;
- the first 10 ARTICLE_IDs.

Those decisions are supplied here.

If another blocker is discovered, report the **specific technical/content blocker only** and continue all work that does not depend on it.
