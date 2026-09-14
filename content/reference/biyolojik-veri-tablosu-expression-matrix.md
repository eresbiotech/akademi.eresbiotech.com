+++
title = "Biyolojik veri neden Excel tablosu gibi düşünülmemeli?"
slug = "biyolojik-veri-tablosu-expression-matrix"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Biyolojik veri yalnız satır ve sütunlardan oluşmaz. Expression matrix, sample, feature, identifier ve metadata ilişkilerini analizden önce nasıl okuyacağınızı öğrenin."
seo_title = "Biyolojik Veri Tablosu Nasıl Okunur? Expression Matrix'i Anlamak"
article_id = "W3-REFRAME"
week = "3"
series = ["Reference Hub · Hafta 3"]
categories = ["r-biyolojik-veri-metadata"]
category_label = "R, biyolojik veri ve metadata"
tags = ["r", "biyolojik-veri", "metadata"]
primary_keyword = "biyolojik veri analizi"
secondary_keywords = "expression matrix nedir, biyolojik veri R, sample metadata, gene expression matrix, omics data"
search_intent = "Expression matrix ve biyolojik veri tablolarının nasıl okunması gerektiğini anlamak."
review_status = "QA_READY_PENDING_HUMAN_APPROVAL"
product_path = "/post/biyoinformatik-icin-r-programlama/"
product_cta = "Biyolojik veriyi R ile daha bilinçli incelemeyi öğren"
answer_first = "Bir biyolojik veri dosyasındaki düzgün satırlar, sütunlar ve sayılar verinin analize hazır veya bilimsel olarak anlaşılmış olduğu anlamına gelmez. Expression matrix'te satırlar genleri, sütunlar sample'ları temsil ediyor olabilir; başka bir dosyada bu yön tersine dönebilir. İlk soru “Dosya düzgün mü?” değil, “Her eksen ve her değer hangi biyolojik varlığı veya ölçümü temsil ediyor?” olmalıdır."
capability_bridge = "R'da read.csv() çalıştırmak veya data frame oluşturmak veriyle çalışmanın teknik başlangıcıdır. Bilimsel çalışma ise bir katman daha gerektirir: - eksenleri tanımak, - identifier seviyesini çözmek, - measurement ile metadata'yı ayırmak, - missing değerleri doğru yorumlamak, - sample ve feature açıklamalarını analize taşımak. R'ın gücü burada yalnız dosya açmasında değil, bu farklı veri katmanlarını kontrollü biçimde ilişkilendirebilmesinde ortaya çıkar."
related_references = ["/reference/r-analizi-calisti-ama-dogru-mu/"]
sources = ["Bioconductor — SummarizedExperiment: feature × sample assay, rowData, colData ve experiment metadata modeli.", "Bioconductor training — rows/features, columns/samples ve colData sample annotation yapısı.", "Wickham H. *Tidy Data.* Journal of Statistical Software, 2014.", "Bioconductor — ExpressionSet/SummarizedExperiment sample ve feature metadata ayrımı.", "R Foundation — R'ın data handling, calculation ve graphical facilities kapsamı."]
sitemap = { priority = 0.6, changefreq = "monthly" }
+++

{{< reference-visual id="W3-REFRAME-1" >}}

## Önce satırın ne olduğunu bilin

Bir dosyada şu satırı gördüğünüzü düşünün:

`ENSG00000141510 | 128 | 93 | 157 | 81`

Bu satır neyi temsil ediyor?

Bir gene mi?

Bir transcript'e mi?

Bir probe'a mı?

Bir genomic region'a mı?

Identifier'ın formatına bakmadan, annotation kaynağını bilmeden veya veri dosyasının nasıl üretildiğini anlamadan yalnız sayılara bakmanız yeterli değildir.

Biyolojik veri analizinde satırın kimliği, downstream analizin anlamını değiştirebilir.

Örneğin gene-level expression ile transcript-level expression aynı temsil seviyesi değildir.

Bir gene birden fazla transcript bağlanabildiği için transcript düzeyindeki satırları gene düzeyindeymiş gibi yorumlamak biyolojik bilgiyi değiştirebilir.

**Identifier yalnız satır adı değildir. Hangi biyolojik nesneyi ölçtüğünüzün bir parçasıdır.**

## Sonra sütunun ne olduğunu bilin

Expression matrix'lerde yaygın yapı:

**satırlar = features**\
**sütunlar = samples**

şeklindedir.

Modern Bioconductor `SummarizedExperiment` sınıfı da boyutları bu mantıkla, “features of interest × samples” biçiminde organize eder.

Ama her tablonun bu formatta olacağını varsaymamalısınız.

Örneğin sample metadata'da çoğunlukla:

**satır = sample**\
**sütun = sample variable**

olabilir.

Dolayısıyla iki dosya yan yana açıldığında aynı satır/sütun mantığını taşımak zorunda değildir.

Analizin ilk görevlerinden biri bu iki veri yapısının nasıl bağlandığını çözmektir.

## Observation ve variable kavramları neden yararlı?

“Tidy data” yaklaşımında temel zihinsel model:

- her variable bir sütun,
- her observation bir satır,
- her observational unit türü ayrı tablo

olacak biçimde tanımlanır.

Bu, veri okuryazarlığı için yararlı bir çerçevedir.

Fakat burada önemli bir nüans vardır:

**Her omics assay matrisini zorla tek bir tidy tabloya çevirmek analizin ön koşulu değildir.**

Gen × sample count matrix gibi matrix tabanlı temsiller biyoinformatik yöntemlerde doğal ve yaygın yapılardır.

Asıl soru şudur:

**Bu tabloda observational unit ne? Variable ne? Feature ne? Sample ne?**

Bunu bilmiyorsanız bir data frame'in “temiz” görünmesi çok az şey söyler.



{{< reference-visual id="W3-REFRAME-2" >}}

## Measurement ile metadata aynı şey değildir

Bir RNA-seq count matrix'te:

`S1` sample'ındaki bir gene ait count değeri

measurement'dır.

`S1` için:

- control,
- lung,
- batch_2,
- day_7

gibi bilgiler ise sample'ı deneysel bağlamına yerleştirir.

Bunlar ölçümün kendisi değildir.

Ama ölçümü yorumlamak için gereklidir.

Bioconductor'ın veri yapılarında bu ayrım özellikle korunur. `assay()` ölçüm matrisini, `colData()` sample-level açıklamaları ve `rowData()` feature-level açıklamaları yönetir.

Bunun pratik sonucu şudur:

**Bir expression değeri, hangi sample'a ve hangi koşula ait olduğunu bilmiyorsanız bilimsel anlamının önemli bir bölümünü kaybeder.**

## Missing value sıfır değildir

Tablolarda kolay karıştırılan başka bir konu da eksik değerlerdir.

Bir hücrede `0` görmek ile değerin `NA`/missing olması aynı şey değildir.

Sıfır:

kullanılan veri üretim ve preprocessing bağlamına bağlı olarak ölçülen niceliğin sıfır değerini ifade ediyor olabilir.

Missing ise:

değerin mevcut olmadığını, ölçülmediğini, kaybolduğunu veya ilgili işleme göre tanımlanmadığını ifade edebilir.

Bu farkı görmeden:

- missing değerleri sıfıra çevirmek,
- sıfırları missing olarak silmek

analizi değiştirebilir.

Dolayısıyla “boş hücreleri temizlemek” gibi görünen bir işlem de biyolojik ve analitik karar taşıyabilir.

## Tablo düzgün görünüyor ama identifier'lar ne?

Şöyle bir tablo düşünün:

| ID | S1 | S2 | S3 |
|---|---:|---:|---:|
| 1001 | 14 | 21 | 12 |
| 1002 | 8 | 4 | 7 |
| 1003 | 91 | 103 | 87 |

Teknik olarak son derece düzenli.

Ama `1001`, `1002`, `1003` nedir?

Gene ID?

Probe ID?

Transcript ID?

Internal feature number?

Bu bilgiyi bilmeden downstream annotation veya enrichment yapmak risklidir.

**Tidy-looking data ≠ biologically interpretable data.**



{{< reference-visual id="W3-REFRAME-3" >}}

## Bu ne anlama geliyor?

Bir biyolojik veri dosyasını açtığınızda analize başlamadan önce şu sorulara cevap verin:

**Satır ne?**\
Gene, transcript, protein, peak, hücre?

**Sütun ne?**\
Sample, hücre, ölçüm değişkeni?

**Hücredeki sayı ne?**\
Raw count, normalized expression, intensity, oran?

**Identifier ne?**\
Hangi database ve hangi biyolojik seviye?

**Eksik değer nasıl kodlanmış?**

**Sample bağlamı nerede?**

Bu cevaplar olmadan tabloyu manipüle edebilirsiniz.

Ama henüz veriyi tam olarak **okuyor** sayılmazsınız.
