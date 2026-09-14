+++
title = "Batch effect mi biyolojik fark mı? Sonuç neden sizi yanıltabilir?"
slug = "batch-effect-biyolojik-fark"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "PCA veya heatmap'te iki grubun ayrılması biyolojik etkiyi kanıtlamaz. Batch effect, confounding ve teknik varyasyonu metadata üzerinden nasıl sorgulayacağınızı öğrenin."
seo_title = "Batch Effect Nedir? PCA'daki Ayrım Biyolojik Olmayabilir"
article_id = "W4-WORKFLOW"
week = "4"
series = ["Reference Hub · Hafta 4"]
categories = ["geo,-metadata-ve-analitik-sınırlar"]
category_label = "GEO, metadata ve analitik sınırlar"
answer_first = "Bir PCA grafiğinde control ve disease sample'larının iki net cluster oluşturması dikkat çekicidir. Ama bu görüntü tek başına: **“Hastalık güçlü bir moleküler fark oluşturuyor.”** sonucunu kanıtlamaz. Çünkü high-throughput veriler yalnız biyolojik faktörlerden etkilenmez. Farklı işlem günleri, reagent lot'ları, laboratuvar koşulları, cihazlar, library preparation süreçleri veya sequencing run'ları gibi teknik faktörler de sistematik varyasyon oluşturabilir. Batch effects genomik ve diğer omics verilerinde iyi bilinen bir problem alanıdır. Daha kritik durum, teknik batch ile araştırdığınız biyolojik değişkenin birbirine bağlanmasıdır. Örneğin: **bütün control'lar Batch A'da, bütün disease sample'ları Batch B'de** işlendiyse gözlenen farkın ne kadarının disease, ne kadarının batch kaynaklı olduğunu veriden ayırmak mümkün olmayabilir. Bu nedenle: **güzel separation ≠ biyolojik neden** ve **batch presence ≠ otomatik confounding** ayrımlarını birlikte korumak gerekir."
capability_bridge = "“Batch effect olabilir” demek problemi fark etmektir. Analizi yönetmek ise: - sample metadata'yı incelemek, - experimental design'ı görmek, - condition–batch ilişkisini değerlendirmek, - uygun covariate/model yapısını kurmak, - correction'ın biyolojik sinyali bozmamasını kontrol etmek gibi adımlar gerektirir. **Teknik varyasyonu görmek başka, onu doğru analitik tasarım içinde yönetmek başka bir beceridir.**"
sources = [
  "Leek et al. — Batch effects'in high-throughput data üzerindeki yaygın etkisi.",
  "Bioconductor BatchQC — Experimental design, confounding, PCA ve batch diagnostics.",
  "2024 omics batch-effect review — Teknik varyasyon kaynakları ve analitik sonuçlar.",
  "Experimental design for scRNA-seq — Batch ve biological condition confounding örneği.",
  "Flexible experimental designs — Complete confounding durumunda identifiability sınırı.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/yasam-bilimlerinde-veri-analizi/"
product_cta = "Yaşam bilimlerinde veri analizi yolunu inceleyin"
+++

## Batch effect nedir?

Batch effect, araştırmanın ana biyolojik sorusuyla ilgili olmayan fakat ölçümleri sistematik biçimde etkileyebilen teknik varyasyon örüntülerini ifade eder.

Kaynakları bağlama göre:

- processing day,
- reagent lot,
- operator,
- laboratory,
- array batch,
- library preparation batch,
- sequencing run,
- instrumentation

olabilir.

Leek ve arkadaşlarının klasik genomics değerlendirmesi batch effects'in laboratuvar koşulları, reagent ve personnel farklılıklarından kaynaklanabildiğini ve high-throughput ölçümlerde yaygın olduğunu gösterir.

Ancak önemli nüans şudur:

Her teknik farkın veride güçlü batch effect oluşturacağı garanti değildir.

Ve bir batch effect gözlemek, bunun biyolojik değişkenle mutlaka karıştığı anlamına gelmez.

## Batch effect ile confounding aynı şey değildir

Diyelim ki sekiz sample'ınız var:

| Sample | Condition | Batch |
|---|---|---|
| C1 | Control | A |
| C2 | Control | A |
| C3 | Control | B |
| C4 | Control | B |
| D1 | Disease | A |
| D2 | Disease | A |
| D3 | Disease | B |
| D4 | Disease | B |

Burada batch olabilir.

Ama condition her iki batch'e de dağılmıştır.

Şimdi ikinci tasarıma bakalım:

| Sample | Condition | Batch |
|---|---|---|
| C1 | Control | A |
| C2 | Control | A |
| C3 | Control | A |
| C4 | Control | A |
| D1 | Disease | B |
| D2 | Disease | B |
| D3 | Disease | B |
| D4 | Disease | B |

Burada condition ve batch tamamen örtüşüyor.

Bu ikinci durum çok daha ciddi bir problemdir.

Çünkü `Control vs Disease` aynı zamanda `Batch A vs Batch B` karşılaştırması olmuştur.

Metodolojik literatür bu durumda biyolojik ve teknik farkların ayrı biçimde tanımlanamayabileceğini açıkça gösterir.

## PCA neyi gösterir, neyi göstermez?

PCA yüksek boyutlu veride büyük varyasyon örüntülerini görünür hale getirmeye yardım eder.

Bir cluster yapısı gördüğünüzde:

**“Sample'lar bazı ölçüm özellikleri bakımından birbirine benziyor veya ayrılıyor.”**

diyebilirsiniz.

Ama PCA'nın kendisi:

**“Bu ayrım treatment'ın neden olduğu biyolojik etkidir.”**

demez.

Aynı noktaları:

- condition,
- batch,
- tissue,
- time,
- individual

gibi farklı metadata değişkenleriyle renklendirmek bu nedenle önemlidir.

Bioconductor'ın BatchQC yaklaşımı da experimental design, variation, clustering ve PCA'yı batch ve condition metadata'sıyla birlikte incelemeyi önerir.

## Batch effect rastgele gürültüyle aynı şey değildir

Rastgele noise ölçümlerin belirsizliğini artırabilir.

Batch effect ise belirli sample gruplarını sistematik biçimde etkileyebilir.

Bu nedenle belirli batch'teki çok sayıda feature aynı yönde kayabilir veya sample'lar batch'e göre cluster olabilir.

Bu sistematik yapı özellikle batch'in outcome ile ilişkili olduğu durumda yanlış biyolojik conclusion riskini artırır.

## “Batch correction yapalım, sorun çözülsün” de yeterli değildir

Batch problemini fark ettikten sonra bir diğer aşırı basitleştirme ortaya çıkabilir:

**“ComBat/limma/sva çalıştırırım ve batch ortadan kalkar.”**

Bu yaklaşım da güvenli değildir.

Correction yöntemlerinin:

- beklediği veri tipi,
- kullandığı model,
- korunması gereken biological covariate'lar,
- experimental design

farklı olabilir.

Örneğin güncel BatchQC dokümantasyonu raw-count tabanlı ComBat-Seq ile normalized/log-transformed data üzerinde kullanılan diğer yöntemleri ayrı ele alır ve correction sırasında korunacak covariate'ların belirtilmesini destekler.

Daha temel sorun ise şudur:

**Biyolojik condition ile batch tamamen confounded ise correction algoritması veride mevcut olmayan bilgiyi yaratamaz.**

Tam confounding durumunda hangi farkın biology, hangisinin batch olduğunu güvenilir biçimde ayırmak mümkün olmayabilir.

Bu nedenle iyi batch yönetiminin ilk katmanı correction değil:

**study design + metadata inspection**

olmalıdır.

## Bir public GEO çalışmasında batch'i nasıl fark edebilirsiniz?

Public veri yeniden kullanırken bütün teknik faktörler size temiz bir `batch` kolonu halinde verilmeyebilir.

Şunlara bakabilirsiniz:

Sample Characteristics

Processing açıklamaları

Library preparation bilgileri

Platform

Instrument veya sequencing bilgileri

Submission'daki tarih/protokol farklılıkları

Original publication'ın Methods bölümü

Ama şunu da koruyun:

Bu bilgilerden herhangi bir fark görmeniz otomatik olarak “batch effect bulundu” anlamına gelmez.

Bunlar:

**potansiyel teknik varyasyon kaynaklarıdır.**

Bunların gerçekten data variation'ıyla ilişkili olup olmadığını ayrıca değerlendirmek gerekir.

## Analiz öncesi kısa karar akışı

Bir PCA veya heatmap'te separation gördüğünüzde:

**1. Condition gerçekten doğru mu?**\
Sample metadata'yı doğrulayın.

**2. Başka hangi değişkenler aynı separation'ı takip ediyor?**\
Batch, tissue, time, sex, individual vb.

**3. Teknik faktörler condition ile dengeli mi?**

**4. Condition ve batch tamamen örtüşüyor mu?**

**5. Tasarım uygun bir modelle ayrıştırılabilir mi?**

**6. Correction gerekiyorsa hangi biological signal korunmalı?**

## Bu ne anlama geliyor?

İki grubun güzel ayrılması iyi bir gözlemdir.

Ama henüz explanation değildir.

Doğru bilimsel soru:

**“Gruplar ayrıldı mı?”**

ile bitmez.

Arkasından:

**“Bu ayrımla hangi metadata değişkenleri ilişkili?”**

ve:

**“Araştırdığım biyolojik etkiden teknik variation'ı ayırabilecek bir tasarımım var mı?”**

soruları gelir.

Batch effect'i bilmek önemli.

Ama daha ileri çalışma becerisi **batch ile confounding arasındaki farkı görmek ve correction'ın ne zaman gerçekten mümkün olduğunu değerlendirebilmektir.**
