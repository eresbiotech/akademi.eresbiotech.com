+++
title = "Sorununuz dizi düzeyinde mi, yapı düzeyinde mi?"
slug = "protein-sequence-mi-structure-mi"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Conservation, motif, domain, residue proximity, binding pocket ve mutation context sorularında sequence veya 3B structure arasında nasıl karar verileceğini öğrenin."
seo_title = "Protein Analizinde Sequence mi Structure mı Kullanmalısınız?"
article_id = "W6-DECISION"
week = "6"
series = ["Reference Hub · Hafta 6"]
categories = ["yapısal-biyoinformatik"]
category_label = "Yapısal biyoinformatik"
answer_first = "Bir protein hakkında soru sorduğunuzda en gelişmiş aracı seçmek zorunda değilsiniz. Önce şu soruyu sorun: **“Bilmek istediğim şey hangi biyolojik temsil seviyesinde anlam kazanıyor?”** Örneğin: **“Bu residue türler arasında korunmuş mu?”** öncelikle bir sequence/alignment sorusudur. **“Bu residue catalytic pocket'a uzaysal olarak yakın mı?”** ise yapı bilgisinden doğrudan yararlanır. Benzer şekilde: - sequence similarity, - motif, - birçok domain/family sorusu çoğu zaman sequence düzeyinde başlayabilir. Buna karşılık: - residue proximity, - pocket geometry, - domain interface, - steric environment, - bazı mutation-context soruları 3B structure ile yeni anlam kazanır. EMBL-EBI'nin 2026 structural bioinformatics eğitim modeli de sequence, structure ve function bilgisini birbirini tamamlayan çalışma katmanları olarak ele alır; amaç her soruda structure kullanmak değil, mevcut structural evidence'ın belirli research context'e gerçekten ne kattığını değerlendirmektir."
capability_bridge = "Yapısal biyoinformatik öğrenmenin amacı her protein için 3B model üretmek değildir. Asıl yetkinlik: - sequence sorusunu structure sorusundan ayırmak, - uygun evidence seviyesine geçmek, - experimental ve predicted structure'ı değerlendirmek, - yapı bilgisini yalnız gerçekten açıklama gücü eklediğinde kullanmaktır. **En gelişmiş aracı seçmek başka, doğru bilimsel seviyeyi seçmek başka bir beceridir.**"
sources = [
  "EMBL-EBI — Structural Bioinformatics 2026; structural data'yı research context'e göre seçme ve değerlendirme.",
  "EMBL-EBI — From Sequences to Structures: Protein Characterisation, 2026.",
  "EMBL-EBI — Sequence alignment ve annotation training.",
  "EMBL-EBI — Foundations of Protein Structure, 2026.",
  "AlphaFold DB — Confidence, mutation ve biological-context limitations.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/uygulamali_yapisal_biyoinformatik_ve_in_silico_protein_modelleme/"
product_cta = "Yapısal biyoinformatik çalışma yolunu inceleyin"
+++

## Sequence düzeyi hangi sorularda güçlüdür?

### Conservation

Bir residue'ın farklı orthologlarda korunup korunmadığını görmek için multiple sequence alignment güçlü bir başlangıçtır.

Bu soru için önce proteinin üç boyutlu modelini üretmek zorunda değilsiniz.

### Sequence similarity

Bir proteinin başka proteinlerle homolog olabileceğini araştırmak için BLAST veya başka sequence-search yaklaşımları doğal başlangıçtır.

EMBL-EBI'nin güncel structural-bioinformatics eğitiminde de sequence alignment ve BLAST structural analysis'ten önce kullanılan temel protein-characterisation katmanları arasında yer alır.

### Motif ve sequence feature

Belirli sequence motifleri, signal peptides, transmembrane regions veya benzer features için sequence tabanlı yöntemler ilk adım olabilir.

### Family/domain ilişkileri

Protein familyası veya domain içeriği birçok durumda sequence evidence üzerinden güçlü biçimde araştırılabilir.

Daha sonra structure bu bilgiyi genişletebilir.

Buradaki kural:

**Structure kullanmayın**

değil.

**Structure'a geçmeden önce sequence'in zaten cevapladığı soruyu görün**

olmalıdır.

## Structure ne zaman gerçekten yeni bilgi sağlar?

Structure özellikle soru **uzamsal** hale geldiğinde değerlidir.

### Residue proximity

Sequence'te birbirinden uzak residue'lar 3B'de aynı functional region'da birleşiyor mu?

### Pocket

Residue belirli bir cavity veya binding-site çevresinde mi?

### Interface

Mutation iki domain veya protein arasındaki temas bölgesinde mi?

### Structural constraint

Residue protein core içinde sıkı bir environment'ta mı, yoksa surface'ta mı?

### Domain arrangement

İki domainin birbirine göre konumu biyolojik hipotez açısından önemli mi?

Bunlar sequence'ten tamamen bağımsız değildir.

Ama üç boyutlu temsil bu soruları çok daha doğrudan hale getirir.

## “Bu residue korunmuş mu?” neden önce structure sorusu değildir?

Conservation evolutionary sequence evidence'a dayanır.

Bir residue'ın 3B structure üzerinde önemli bir yerde bulunması:

onun evolutionary conservation düzeyini tek başına göstermez.

Bu nedenle:

**Conservation? → alignment**

çok doğal bir ilk adımdır.

Daha sonra:

**“Conserved residue neden önemli olabilir?”**

sorusunda structure'a geçebilirsiniz.

Örneğin residue:

- active-site pocket'ta,
- protein core'unda,
- interaction interface'inde

bulunuyor olabilir.

Bu noktada sequence ve structure evidence birleşir.

## “Bu mutation interface'i etkileyebilir mi?” neden structure sorusudur?

Bu soru uzamsal bağlam ister.

Önce mutation'ın sequence position'ını biliriz.

Sonra structure üzerinde:

- interface'te mi,
- interface'e yakın mı,
- buried mı,
- interaction yapan başka residue'lara yakın mı

sorularını sorabiliriz.

Ama structure burada da son cevap değildir.

**“Interface'te bulunuyor.”**

gözlemi:

**“Interaction'ı kesin bozuyor.”**

sonucuna doğrudan eşit değildir.

Structural context, experimental validation ihtiyacını ortadan kaldırmaz.

## Docking ne zaman devreye girmeli?

Docking, “protein structure buldum, şimdi sıradaki seviye docking” şeklinde otomatik bir progression değildir.

Docking bir spesifik interaction hypothesis'i değerlendirmek için kullanılabilecek modelling yaklaşımıdır.

Önce:

- biyolojik interaction sorusu,
- uygun structural model,
- binding partner/ligand bilgisi,
- model confidence,
- yöntemin varsayımları

gibi katmanlar düşünülmelidir.

Bir docking pose'unun üretilmesi de gerçek bağlanmanın deneysel kanıtı değildir.

Bu Week 6'nın ana kuralıyla aynıdır:

**more complex tool ≠ stronger evidence by default.**

## Question-to-tool matrix

| Bilimsel soru | Sequence first? | Structure useful? | Neden? |
|---|---|---|---|
| Bu residue korunmuş mu? | **Evet** | Sonradan | Conservation alignment sorusudur |
| Protein hangi familyaya benziyor? | **Evet** | Destekleyebilir | Homology/domain evidence |
| Bilinen motif var mı? | **Evet** | Bağlam ekleyebilir | Motif lineer sequence feature |
| İki residue uzayda yakın mı? | Yetersiz | **Evet** | 3B geometry gerekir |
| Mutation pocket yakınında mı? | Position bulunur | **Evet** | Spatial environment gerekir |
| Domain interface nasıl? | Kısmen | **Evet** | Relative 3D arrangement gerekir |
| Protein ne iş yapıyor? | Yararlı | Yararlı | Tek başına hiçbiri tam functional proof değildir |

## Sequence ve structure rakip değildir

Gerçek structural-bioinformatics workflow çoğu zaman lineer değildir.

Örneğin:

**Sequence**

→ doğru protein/isoform

→ homologlar

→ conserved region

→ domain annotation

**Structure**

→ structural coverage

→ residue environment

→ pocket/interface

**Geri sequence'e**

→ conservation of structural residues

**Geri biology'ye**

→ function/experiment/literature

Bu geçişler analiz zayıflığı değildir.

Tam tersine farklı representation seviyelerinin birlikte kullanılmasıdır.

EMBL-EBI'nin 2026 protein-characterisation materyalleri de sequence retrieval, homolog identification, functional domain annotation ve structural information'ı tek workflow içinde birleştirmeyi özellikle öğretmektedir.

## Bu ne anlama geliyor?

Protein analizi başlarken:

**“Hangi aracı açmalıyım?”**

sorusundan önce şunları sorun:

**1. Sorumu bir cümlede yazabilir miyim?**

**2. Cevap lineer sequence relationship mı gerektiriyor?**

**3. Yoksa spatial/3D relationship mı gerekiyor?**

**4. Structure gerekiyorsa experimental evidence var mı?**

**5. Prediction kullanacaksam confidence yeterli mi?**

**6. Structural observation final conclusion mı, yoksa yeni hipotez mi?**

Bu sıra sizi:

**alignment → structure prediction → docking**

gibi otomatik araç zincirlerinden çıkarır.

Bilimsel soruya göre ilerleyen workflow'a taşır.
