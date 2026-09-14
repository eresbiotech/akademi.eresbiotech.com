+++
title = "Expression matrix ile sample metadata neden ayrı okunmalıdır?"
slug = "expression-matrix-sample-metadata-farki"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Expression matrix size ölçüm değerlerini, sample metadata ise bu değerlerin deneysel bağlamını verir. GEO verisinde iki katmanı birlikte nasıl okuyacağınızı öğrenin."
seo_title = "Expression Matrix ve Sample Metadata Arasındaki Fark Nedir?"
article_id = "W4-REFRAME"
week = "4"
series = ["Reference Hub · Hafta 4"]
categories = ["geo,-metadata-ve-analitik-sınırlar"]
category_label = "GEO, metadata ve analitik sınırlar"
answer_first = "Bir expression matrix'te genlerin veya başka feature'ların Sample'lar boyunca ölçüm değerlerini görebilirsiniz. Fakat `Sample_01` sütununun: - control mü treatment mı, - hangi tissue'dan geldiği, - hangi time point'e ait olduğu, - hangi batch'te işlendiği matrix'in sayısal hücrelerinden anlaşılmak zorunda değildir. Bu bilgi sample metadata'da bulunur. Bu yüzden expression matrix ve metadata aynı veri değildir: **Expression matrix → ne kadar ölçüldü?** **Sample metadata → bu ölçüm hangi biyolojik ve deneysel koşuldan geldi?** GEO'nun güncel submission yapısında da tissue, cell type, treatment, genotype ve disease state gibi sample özellikleri ayrı metadata alanları olarak tutulur. GEO2R da kullanıcıya grup ataması yaparken Sample title, source ve characteristics alanlarını kullanmasını önerir. Sayılara bakmak gerekir. Ama **sayıların kime ait olduğunu bilmek** de analizin bir parçasıdır."
capability_bridge = "Expression matrix'i açmak kolaydır. Asıl çalışma becerisi: - Sample ID'yi metadata ile eşlemek, - condition'ı doğru tanımlamak, - tissue/time/batch gibi değişkenleri görmek, - measurement ile sample context'i birlikte analize taşımaktır. Bu nedenle biyolojik veri okuryazarlığı yalnız sayısal tablo okumak değildir. **Ölçümü üreten biyolojik bağlamı da okuyabilmektir.**"
sources = [
  "NCBI GEO — Sample metadata validation ve sample characteristics.",
  "NCBI GEO — GEO2R Sample-group assignment ve metadata sütunları.",
  "NCBI/NIH — GEO Sample, Platform ve Series record yapıları.",
  "NCBI GEO — Güncel functional genomics repository kapsamı.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/biyoinformatik-giris-egitim-buyuk-veri-kurs/"
product_cta = "Biyoinformatiğe başlangıç yolunu inceleyin"
+++

## Matrix size neyi verir?

Basit bir bulk expression matrix düşünelim.

Satırlar:

**genes**

Sütunlar:

**samples**

Hücreler:

**ölçüm değerleri**

olabilir.

Ancak hücredeki `132` sayısı kendi başına:

“Control”

“Treatment”

“Hasta”

“Sağlıklı”

anlamına gelmez.

Bu kategoriler sample bağlamından gelir.

Dolayısıyla measurement data'yı biyolojik condition ile eşleştiren köprü metadata'dır.

## Sample ID condition değildir

Özellikle public data kullanımında bu ayrım önemlidir.

`GSM123456`

bir accession'dır.

Tek başına:

“control sample”

anlamına gelmez.

Benzer biçimde:

`Sample_01`

bir sample identifier'dır.

Condition değildir.

Bunun hangi gruba ait olduğunu ilgili record içindeki biyolojik ve deneysel açıklamadan çıkarmanız gerekir.

Bu nedenle GEO2R'ın Sample tablosunda Accession'ın yanında Title, Source name ve Characteristics gibi alanların gösterilmesi tesadüf değildir. NCBI açıkça bu metadata alanlarının Sample'ın doğru gruba atanmasına yardımcı olması gerektiğini belirtir.

## Aynı expression değeri, farklı bağlam

Gene_A için expression değeri `200` olsun.

İki farklı Sample'da aynı değeri görmeniz bu iki Sample'ın biyolojik olarak aynı olduğu anlamına gelmez.

Biri:

- untreated control,
- liver,
- day 0

olabilir.

Diğeri:

- drug-treated,
- liver,
- day 7

olabilir.

Sayı aynı olsa bile deneysel anlam aynı değildir.

Tersine, iki sample arasındaki büyük expression farkı da doğrudan condition farkı olarak yorumlanamaz; başka metadata değişkenleri devreye girebilir.

Bu nedenle:

**expression value ≠ biological explanation**

ayrımını korumak gerekir.

## Metadata her zaman analysis-ready değildir

Metadata var diye bütün iş bitmiş değildir.

Public repository metadata'sı birincil olarak çalışmayı tanımlamak ve yeniden kullanımı mümkün kılmak için sunulur.

Bir analiz için yine de:

- farklı Characteristics alanlarını ayrıştırmanız,
- isimlendirmeleri standardize etmeniz,
- eksik değerleri görmeniz,
- condition seviyelerini tanımlamanız,
- Sample ID'leri measurement tablosuyla eşleştirmeniz

gerekebilir.

Örneğin bir Characteristics alanı:

`treatment: vehicle`

başka biri:

`treatment: drug`

şeklindeyken başka bir bilgi ayrı bir satırda time point olarak bulunabilir.

Bu bilgiyi doğrudan statistical model'e koymadan önce veri yapısını anlamlandırmak gerekebilir.

Yani:

**Sample description ≠ otomatik olarak analysis-ready metadata.**

## Platform annotation ile metadata'yı da karıştırmayın

Microarray çalışmasında GPL kaydı size probe veya feature annotation'ı hakkında bilgi verebilir.

Bu bilgi:

**“Bu ölçüm hangi gene karşılık geliyor?”**

sorusuna yardımcı olabilir.

Sample metadata ise:

**“Bu ölçüm hangi biyolojik Sample'dan geliyor?”**

sorusuyla ilgilidir.

Birisi feature eksenini, diğeri sample eksenini açıklar.

İki bilgi türü birbirinin yerine kullanılamaz.

## Bu ne anlama geliyor?

Bir expression matrix aldığınızda üç katmanı birlikte okuyun:

**Feature katmanı:**\
Neyi ölçüyorum?

**Measurement katmanı:**\
Ne kadar ölçülmüş?

**Sample katmanı:**\
Bu ölçüm hangi biyolojik/deneysel bağlamdan geliyor?

Üçüncü katman olmadan ikinci katmandaki sayılar karşılaştırılabilir görünebilir.

Fakat karşılaştırmanın bilimsel anlamı eksik kalır.
