+++
title = "log2 Fold Change ve adjusted p-value birlikte nasıl okunur?"
slug = "log2-fold-change-adjusted-p-value"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Differential expression sonuçlarında log2FC, p-value ve adjusted p-value ne anlama gelir? Etki büyüklüğü ile istatistiksel kanıtı üç örnek gen üzerinden birlikte okuyun."
seo_title = "log2 Fold Change ve Adjusted P-Value Nasıl Yorumlanır?"
article_id = "W1-WORKFLOW"
week = "1"
series = ["Reference Hub · Hafta 1"]
categories = ["gen-listesi-geo2r-differential-expression"]
category_label = "Gen listesi, GEO2R ve differential expression"
tags = ["gen-listesi", "geo2r", "differential-expression"]
primary_keyword = "log2 fold change adjusted p-value"
secondary_keywords = "log2FC nedir, adjusted p-value nedir, differential expression yorumlama, volcano plot yorumlama, fold change p-value"
search_intent = "log2 fold change ve adjusted p-value’ın anlamını ve birlikte nasıl yorumlanacağını öğrenmek."
review_status = "QA_READY_PENDING_HUMAN_APPROVAL"
product_path = "/post/biyoinformatik-giris-egitim-buyuk-veri-kurs/"
product_cta = "GEO2R analizini doğru kurmayı ve yorumlamayı öğren"
answer_first = "Differential expression tablosunda log2 fold change ile adjusted p-value aynı şeyi ölçmez. log2 fold change, iki koşul arasındaki değişimin yönü ve büyüklüğü hakkında bilgi verir. Adjusted p-value ise binlerce genin aynı anda test edildiği analizde çoklu karşılaştırmayı hesaba katarak istatistiksel kanıtı değerlendirmeye yardım eder. Bu yüzden: - büyük log2FC + zayıf adjusted p-value, - küçük log2FC + güçlü adjusted p-value, - hem anlamlı büyüklükte log2FC + güçlü adjusted p-value üçü farklı sonuç profilleridir. “En büyük fold change = en önemli gen” veya “en küçük p-value = en önemli gen” şeklindeki tek kolonlu sıralamalar bilimsel yorumu gereğinden fazla basitleştirir. Doğru soru şudur: “Bu gen ne kadar değişmiş, bu değişim ne kadar iyi destekleniyor ve biyolojik sorum açısından ne ifade ediyor?”"
capability_bridge = "log2FC ve adjusted p-value’ın tanımlarını bilmek önemli bir adımdır. Fakat gerçek bir workflow’da bunların nasıl üretildiğini, karşılaştırmanın nasıl kurulduğunu, hangi threshold’un neden seçildiğini, örnekler arasında ne olduğunu ve gerektiğinde analizin neden başka bir ortama taşınması gerektiğini de anlamanız gerekir. Kolonu okuyabilmek başka, analizi kontrol edebilmek başka bir beceridir."
related_references = ["/reference/gen-listesi-nasil-yorumlanir/", "/reference/geo2r-neyi-soyler-neyi-soylemez/"]
sources = ["NCBI — About GEO2R. logFC/log2FoldChange, padj/adj.P.Val, threshold ve volcano plot açıklamaları.", "R Documentation — p.adjust. Multiple testing ve FDR açıklaması.", "Smyth GK. *Linear Models and Empirical Bayes Methods for Assessing Differential Expression in Microarray Experiments.* 2004.", "Love MI, Huber W, Anders S. *Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2.* Genome Biology, 2014.", "Benjamini Y, Hochberg Y. *Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing.* 1995. Bibliographic record."]
sitemap = { priority = 0.6, changefreq = "monthly" }
+++

## Bu yazıda neler var?

- log2 fold change’in gerçekte ne anlattığını
- Raw p-value ile adjusted p-value farkını
- Üç örnek gen üzerinden birlikte yorumlamayı
- Volcano plot’ın bu iki boyutu nasıl gösterdiğini
- Sayısal significance ile biyolojik önem arasındaki farkı

## Önce iki farklı soruyu birbirinden ayırın

Bir differential expression analizinde genellikle iki ayrı şeyi bilmek istersiniz.

### Soru 1: Farkın büyüklüğü ne?

Bunun için fold change ailesindeki ölçüler kullanılır.

### Soru 2: Bu fark için istatistiksel destek ne kadar güçlü?

Burada p-value ve özellikle genom çapında çok sayıda test yapıldığında adjusted p-value devreye girer.

Bu iki soruyu tek bir sayı cevaplamaz.

Bu, differential expression sonucunu okurken yapılması gereken en temel ayrımdır.

## log2 Fold Change ne anlatır?

Fold change iki koşul arasındaki göreli değişimi ifade eder.

Log2 dönüşümü bu değişimi simetrik ve pratik bir ölçekte okumayı kolaylaştırır.

Genel olarak:

| log2FC | Yaklaşık değişim |
|---:|---|
| +1 | 2 kat |
| +2 | 4 kat |
| -1 | yarıya düşme |
| -2 | dörtte bire düşme |

Ancak burada kritik bir nokta vardır:

**İşaretin yönü kontrastın nasıl tanımlandığına bağlıdır.**

Örneğin `Tedavi - Kontrol` ile `Kontrol - Tedavi` aynı kontrast değildir.

Bu nedenle `log2FC = +1.5` değerini yalnızca “upregulated” diye okumadan önce hangi grubun referans olduğunu kontrol etmelisiniz.

GEO2R mikroarray sonuçlarında `logFC`, desteklenen RNA-seq sonuçlarında ise `log2FoldChange` alanları kullanılabilir. NCBI her ikisini de iki deneysel koşul arasındaki log2 fold change ölçüsü olarak tanımlar.



{{< reference-visual id="W1-WORKFLOW-1" >}}

## P-value neden tek başına yeterli değildir?

Bir gen için p-value, kullanılan model ve varsayımlar altında gözlenen veriyle ilişkili istatistiksel kanıtı değerlendirmek için kullanılır.

Ancak genom çapında differential expression analizinde tek bir hipotez test edilmez.

Binlerce gen ayrı ayrı test edilebilir.

Test sayısı arttıkça yalnızca tesadüf nedeniyle küçük p-value değerleri görme olasılığı da dikkate alınmalıdır.

Bu nedenle multiple-testing correction kullanılır.

GEO2R’ın varsayılan seçeneklerinden Benjamini–Hochberg yaklaşımı false discovery rate’i kontrol etmeye yöneliktir. R’ın resmi `p.adjust` dokümantasyonu FDR’ı, reddedilen hipotezler arasındaki beklenen yanlış keşif oranı üzerinden tanımlar.

GEO2R da microarray için `adj.P.Val`, RNA-seq için `padj` alanını sunar ve bu düzeltilmiş değeri sonuçları yorumlamada temel istatistiklerden biri olarak önerir.

Bu nedenle büyük bir gen tablosunda yalnızca raw p-value sıralamak çoğu durumda yeterli değildir.

## Adjusted p-value ne değildir?

Adjusted p-value hakkında üç yaygın yanlış okumayı ayıralım.

### “0,05 ise genin yanlış olma olasılığı %5’tir.”

Bu, adjusted p-value’ın birebir anlamı değildir.

### “0,049 bilimsel olarak önemli, 0,051 önemsizdir.”

Bu kadar keskin bir biyolojik sınır yoktur.

Eşikler karar vermek için kullanışlı olabilir fakat birbirine çok yakın iki değeri tamamen farklı biyolojik evrenlere dönüştürmez.

### “Çok küçük adjusted p-value varsa etki büyüktür.”

Hayır.

İstatistiksel destek ile effect size farklı boyutlardır.

Bu bizi asıl okuma biçimine getiriyor.

## Üç örnek gen üzerinden birlikte okuyalım

Aşağıdaki tablo tamamen öğretim amaçlı varsayımsal bir örnektir.

| Gen | log2FC | Adjusted p-value | İlk okuma |
|---|---:|---:|---|
| Gene A | +2.1 | 0.18 | Büyük tahmini değişim, zayıf istatistiksel destek |
| Gene B | +0.6 | 0.000001 | Daha küçük değişim, güçlü istatistiksel destek |
| Gene C | -1.4 | 0.004 | Belirgin negatif değişim ve güçlü destek |

### Gene A: büyük fark, zayıf kanıt

`log2FC = +2.1` yaklaşık dört katın üzerinde bir tahmini değişime karşılık gelir.

İlk bakışta çok dikkat çekicidir.

Fakat adjusted p-value 0,18.

Bu durumda:

**“Bu gen kesinlikle güçlü biçimde artmıştır.”**

demek için tablo bize yeterli istatistiksel destek vermiyor.

Bunun nedeni örnekler arasındaki yüksek varyasyon, düşük örnek sayısı veya başka veri özellikleri olabilir. Bunları araştırmadan yalnız fold change’e güvenmek risklidir.

### Gene B: küçük/moderat fark, çok güçlü istatistiksel destek

`log2FC = +0.6` yaklaşık 1,5 katlık bir değişim düzeyindedir.

Gene A kadar dramatik görünmez.

Ama adjusted p-value çok küçüktür.

Bu, koşullar arasındaki daha mütevazı farkın veri içinde tutarlı biçimde desteklendiği bir profile işaret edebilir.

Fakat yine de:

**“Gene B biyolojik olarak Gene A’dan daha önemlidir.”**

sonucunu doğrudan çıkaramayız.

Çünkü biyolojik önem yalnız istatistiksel sıralamadan oluşmaz.

### Gene C: hem yön hem destek anlamlı

`log2FC = -1.4`, tanımlanan kontrast yönünde belirgin azalmaya işaret eder.

Adjusted p-value da güçlü istatistiksel destek göstermektedir.

Bu gen takip edilmeye değer bir aday olabilir.

Ancak bir sonraki sorular hâlâ gereklidir:

Hangi hücre veya dokuda?

Başlangıç ekspresyon düzeyi ne?

Aynı pathway’de başka genler de değişiyor mu?

Biyolojik hipotezle uyumlu mu?

Başka veri veya deneyler sonucu destekliyor mu?



{{< reference-visual id="W1-WORKFLOW-2" >}}

## Volcano plot tam olarak bu nedenle kullanışlıdır

Volcano plot’ın yaygın kullanılmasının nedenlerinden biri bu iki boyutu aynı anda göstermesidir.

Tipik olarak:

**X ekseni:** log2 fold change\
**Y ekseni:** istatistiksel significance’ın dönüşümü

Böylece genleri kabaca şu profillere ayırabilirsiniz:

- güçlü negatif değişim,
- güçlü pozitif değişim,
- istatistiksel desteği yüksek fakat etkisi küçük genler,
- etkisi büyük görünmesine rağmen desteği zayıf genler.

Ancak volcano plot’ın da verdiği şey bir **prioritization surface**’dır; mekanistik sonuç değil.

NCBI GEO2R’da volcano plot için adjusted p-value ve log2 fold-change eşiklerinin ayrı ayrı ayarlanabilmesi de bu iki boyutun ayrı kriterler olduğunu açık biçimde yansıtır.



{{< reference-visual id="W1-WORKFLOW-3" >}}

## Peki hangi eşiği kullanmalısınız?

Burada evrensel bir sihirli sayı yoktur.

`adjusted p-value < 0.05` yaygın bir başlangıç kriteridir ve GEO2R’ın da default significance cutoff’u 0,05’tir. Ancak bu eşik bilimsel sorunuzdan bağımsız mutlak bir doğa yasası değildir.

Benzer biçimde:

`|log2FC| > 1`

gibi bir sınır bazı projelerde mantıklı olabilir, başka projelerde gereksiz derecede katı veya gevşek olabilir.

Karar şu faktörlere bağlı olabilir:

- veri tipi,
- örnek sayısı,
- deney tasarımı,
- beklenen biyolojik effect size,
- doğrulama planı,
- downstream analiz,
- çalışmanın keşif mi doğrulama mı amaçlı olduğu.

Yani threshold seçimi de workflow’un bilimsel parçasıdır.

## İstatistiksel significance biyolojik önem değildir

Bir gen, çok tutarlı fakat küçük bir değişim gösterebilir.

Başka bir gen, daha büyük fakat daha belirsiz bir değişim gösterebilir.

Üçüncü bir gen ise istatistiksel olarak mükemmel görünüp araştırdığınız biyolojik mekanizmayla çok az ilgili olabilir.

Bu yüzden differential expression yorumunun son aşamasında şu soru mutlaka geri gelmelidir:

**“Bu sonuç benim biyolojik sorum açısından neden önemli?”**

Bunun cevabı yalnız `log2FC` veya `padj` kolonunda bulunmaz.



{{< reference-visual id="W1-WORKFLOW-4" >}}

## Bu ne anlama geliyor?

Bir differential expression tablosunu açtığınızda yalnızca:

**“En küçük adjusted p-value hangisi?”**

diye sormayın.

Yalnızca:

**“En büyük fold change hangisi?”**

diye de sormayın.

Bunun yerine her aday için üç katmanlı bir kontrol yapın:

**1. Etki:** Ne kadar ve hangi yönde değişmiş?

**2. Kanıt:** Bu değişim ne kadar güçlü istatistiksel destek taşıyor?

**3. Bağlam:** Bu fark araştırdığım biyolojik sistem içinde ne ifade ediyor?

Bu üç katman birlikte okunmaya başladığında sonuç tablosu, sıralanmış sayılardan bilimsel bir çalışma yüzeyine dönüşür.
