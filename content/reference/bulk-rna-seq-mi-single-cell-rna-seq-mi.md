+++
title = "Bulk RNA-seq mi single-cell RNA-seq mi? Sorunuza göre düşünün"
slug = "bulk-rna-seq-mi-single-cell-rna-seq-mi"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Bulk ve single-cell RNA-seq arasında nasıl seçim yapılır? Population average, hücresel heterojenlik, rare populations ve deney tasarımı açısından iki yaklaşımı karşılaştırın."
seo_title = "Bulk RNA-seq mi Single-Cell RNA-seq mi? Fark ve Yöntem Seçimi"
article_id = "W5-DECISION"
week = "5"
series = ["Reference Hub · Hafta 5"]
categories = ["tek-hücre-rna-seq"]
category_label = "Tek hücre RNA-seq"
answer_first = "Single-cell RNA-seq bulk RNA-seq'in “daha gelişmiş ve her durumda daha iyi” sürümü değildir. İki yöntem farklı çözünürlüklerde bilgi üretir. Bulk RNA-seq, örnek içindeki çok sayıda hücrenin RNA sinyalini birlikte ölçerek sample-level toplu expression profili verir. Single-cell RNA-seq ise hücreleri ayrı expression profilleri olarak ölçerek heterojenliği, farklı cell population'ları ve bazı nadir hücre gruplarını incelemeyi mümkün kılar. Bu nedenle: **“Treatment dokunun genel expression profilini değiştirdi mi?”** gibi bir soru ile: **“Bu değişim hangi hücre grubunda ortaya çıkıyor?”** aynı yöntem ihtiyacını yaratmak zorunda değildir. Single-cell size daha yüksek hücresel çözünürlük sağlayabilir. Ama daha yüksek çözünürlük: **her zaman daha doğru deney** anlamına gelmez. Doğru soru: **“Bilimsel hipotezim gerçekten hücre düzeyinde çözünürlük gerektiriyor mu?”** olmalıdır."
capability_bridge = "Single-cell öğrenmek yalnız yeni bir sequencing teknolojisinin output'larını okumak değildir. Asıl çalışma becerisi: - hangi sorunun cell-level resolution gerektirdiğini, - hangi sorunun bulk düzeyinde cevaplanabileceğini, - single-cell seçildiğinde ortaya çıkan QC, clustering ve annotation kararlarını birlikte yönetebilmektir. **Daha yüksek çözünürlüğe sahip olmak başka, o çözünürlüğe gerçekten ihtiyaç duymak başka bir bilimsel karardır.**"
sources = [
  "Recent transcriptomics review — Bulk average vs single-cell cellular resolution.",
  "Cellular deconvolution review — Bulk mixtures, cell heterogeneity ve rare populations.",
  "Nature Protocols — scRNA-seq experimental-design decisions.",
  "Experimental design for scRNA-seq — replication, randomization, blocking ve technical bias.",
  "Squair et al. — Single-cell DE'de biological replicate/pseudobulk yaklaşımının önemi.",
  "Bulk deconvolution benchmark — bulk ve single-cell verinin tamamlayıcı kullanımı.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/tek-hucre-rna-seq-analizi-egitimi/"
product_cta = "Tek hücre RNA-seq çalışma yolunu inceleyin"
+++

## Bulk RNA-seq aslında neyi ölçer?

Bulk transcriptomics'te aynı örnek içindeki birçok hücreden gelen RNA birlikte değerlendirilir.

Sonuç:

**sample düzeyinde aggregate expression profile**

şeklindedir.

Eğer doku birden fazla cell type içeriyorsa gözlenen expression değeri bu hücrelerin katkılarının birleşimidir.

Bu nedenle bulk'taki bir değişimin kaynağı:

- aynı cell type içindeki transcriptional change,
- cell-type composition farkı,
- ikisinin kombinasyonu

olabilir.

Bulk deconvolution literatürü de heterogeneous tissue'daki bulk expression'ın cell-type averages/composition tarafından etkilendiğini açıkça ortaya koymaktadır.

Bu bulk RNA-seq'i kötü yöntem yapmaz.

Yalnızca hangi resolution'da bilgi verdiğini açıklar.

## Single-cell ne ekler?

Single-cell RNA-seq hücreleri ayrı observation'lar olarak profilleyebildiği için:

- cellular heterogeneity,
- farklı cell populations,
- rare populations,
- cell states,
- population composition

gibi sorulara kapı açar.

Örneğin bir tissue bulk profilinde Treatment sonrası Gene X arttı.

Bulk size:

**“Sample düzeyinde Gene X sinyali yükseldi.”**

diyebilir.

Single-cell ise ek olarak şu soruların peşinden gidebilir:

Gene X bütün hücre tiplerinde mi arttı?

Yalnız belirli population'da mı?

Yoksa Gene X'i yüksek ifade eden cell population'ın oranı mı arttı?

Bunlar farklı biyolojik mekanizmalardır.

## Senaryo A: Genel sample-level yanıt

Araştırma sorunuz:

**“Treatment sonrası bu tissue'nun genel transcriptional profili değişiyor mu?”**

ise bulk RNA-seq güçlü ve doğrudan bir tasarım olabilir.

Özellikle asıl analiz birimi biological sample ise ve cell-type resolution hipotezin ana parçası değilse single-cell zorunlu değildir.

## Senaryo B: Heterojenliğin kaynağını anlamak

Araştırma sorunuz:

**“Gördüğümüz değişim hangi cell population'da ortaya çıkıyor?”**

ise single-cell ek bilgi sağlayabilir.

Örneğin:

- nadir bir immune population,
- farklı tumour subclones/states,
- belirli developmental cell states

bulk ortalama içinde maskelenebilir.

Bu tür sorular single-cell resolution'dan daha doğrudan yararlanır.

## Ama single-cell de yeni belirsizlikler getirir

Cell-level resolution güçlüdür.

Fakat bununla birlikte:

- sparsity,
- QC,
- doublet/ambient RNA,
- clustering,
- cell-type annotation,
- batch integration,
- sample-level inference

gibi ek analitik kararlar ortaya çıkar.

Daha fazla resolution daha fazla biological detail sağlayabilirken aynı zamanda daha karmaşık experimental ve computational tasarım gerektirir.

Single-cell experimental-design literatürü de scRNA-seq çalışmalarında sample preparation, library design, biological replication ve analysis kararlarının araştırma bağlamına göre planlanması gerektiğini vurgular.

Yani yöntem seçimi yalnız:

**“Kaç hücre ölçebilirim?”**

değil,

**“Hangi biological unit üzerinde inference yapmak istiyorum?”**

sorusunu da içerir.

## Daha fazla hücre, biological replicate yerine geçmez

Single-cell dataset'te binlerce hücre olması etkileyici görünür.

Ama aynı kişiden veya biological sample'dan gelen binlerce hücre, binlerce bağımsız biological replicate değildir.

Condition-level inference yapmak istiyorsanız experimental unit ve biological replication önemini korur.

Single-cell differential-expression benchmark çalışmaları da hücreleri biological replicate içinde aggregate eden pseudobulk yaklaşımların pek çok senaryoda iyi performans göstermesinin altında bu sample-level replication yapısının önemini gösterir.

Bu, single-cell kullanmamak gerektiği anlamına gelmez.

Yalnız:

**cell count ≠ sample count**

ayrımını korumak gerekir.

## Hangi durumda hangisiyle başlamak mantıklı olabilir?

| Bilimsel soru | Bulk RNA-seq | Single-cell RNA-seq | Neden? |
|---|---|---|---|
| Genel tissue/sample expression farkı | Güçlü seçenek | Kullanılabilir | Cell resolution şart olmayabilir |
| Hücresel heterojenlik | Sınırlı | Güçlü | Hücre profilleri ayrılır |
| Nadir population keşfi | Maskelenebilir | Güçlü olabilir | Population ayrı incelenebilir |
| Cell-type composition | Dolaylı/deconvolution gerekebilir | Doğrudan daha görünür | Hücre grupları profillenebilir |
| Büyük sample cohort'u | Tasarıma göre pratik olabilir | Kaynak gereksinimi artabilir | Deney ölçeği önemli |
| Cell-state/isoform-level population soruları | Sınırlı olabilir | Soruya göre güçlü | Hücre düzeyli yapı gerekir |

Bu tablo “hangi yöntem daha iyi?” tablosu değildir.

**Hangi soru hangi bilgi düzeyine ihtiyaç duyuyor?**

tablosudur.

## Bulk “eski” bir yöntem midir?

Hayır.

Bulk RNA-seq birçok araştırma tasarımında son derece değerli olmaya devam eder.

Single-cell'ın ortaya çıkması bulk expression'ı geçersiz kılmadı.

Aksine bugün iki veri türü sıklıkla birbirini tamamlar; single-cell profilleri bulk dataset'lerin deconvolution'ında reference olarak bile kullanılmaktadır.

Bu ilişki yöntemlerin rakip olmadığını gösterir.

Biri tissue/sample-level signal'ı,

diğeri cellular heterogeneity'yi

farklı ölçeklerde görünür hale getirir.

## Bu ne anlama geliyor?

Yöntem seçmeden önce üç soru sorun:

**1. Temel biological unit nedir?**\
Tissue/sample mı, cell population mı?

**2. Hipotezim hücresel heterojenliği gerektiriyor mu?**

**3. Bu ek resolution'ın getirdiği deneysel ve analitik karmaşıklığı bilimsel sorum gerçekten haklı çıkarıyor mu?**

Eğer üçüncü sorunun cevabı belirsizse:

**“Single-cell daha ileri.”**

gerekçe değildir.

Teknoloji seçiminin görevi araştırma sorusuna hizmet etmektir.

Araştırma sorusunun teknolojiye hizmet etmesi değil.
