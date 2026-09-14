+++
title = "R'da analiz çalıştı ama sonuç ne anlama geliyor? Asıl problem kod olmayabilir"
slug = "r-analizi-calisti-ama-dogru-mu"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "R kodunun hata vermeden çalışması analizin bilimsel olarak doğru olduğu anlamına gelmez. Metadata, grup tanımı, design ve biyolojik bağlamı nasıl kontrol edeceğinizi görün."
seo_title = "R Analizi Çalıştı Ama Doğru mu? Kodu Değil Analizi Kontrol Edin"
article_id = "W3-PROBLEM"
week = "3"
series = ["Reference Hub · Hafta 3"]
categories = ["r-biyolojik-veri-metadata"]
category_label = "R, biyolojik veri ve metadata"
tags = ["r", "biyolojik-veri", "metadata"]
primary_keyword = "R analizi nasıl yorumlanır"
secondary_keywords = "R biyoinformatik, R analizi doğru mu, biyolojik veri analizi, R çıktısı yorumlama, R programlama biyoloji"
search_intent = "R analizinin yalnızca çalışmasının neden yeterli olmadığını ve çıktı yorumlanmadan önce nelerin kontrol edilmesi gerektiğini anlamak."
review_status = "QA_READY_PENDING_HUMAN_APPROVAL"
product_path = "/post/biyoinformatik-icin-r-programlama/"
product_cta = "Biyolojik veriyi R ile daha bilinçli incelemeyi öğren"
answer_first = "R'da bir scriptin son satıra kadar çalışması yalnızca belirli bir teknik soruyu cevaplar: Kod yürütülebildi mi? Şunu otomatik olarak cevaplamaz: Doğru bilimsel soruyu mu test ettim? Aynı kod; yanlış grup etiketleriyle, yanlış değişkeni modelleyerek veya biyolojik bağlamı eksik okuyarak da çalışabilir. Bir grafik kusursuz üretilebilir fakat grafikteki renklerin temsil ettiği gruplar yanlış tanımlanmış olabilir. Bir istatistiksel model hata vermeyebilir ama araştırma sorunuz için gerekli değişken modelde bulunmayabilir. Bioconductor'ın DESeq2 yapısında bile design formülü, count değerlerinin sample metadata içindeki hangi değişkenlere bağlı olarak modelleneceğini açıkça tanımlar. Yani design kodun yanındaki teknik bir ayrıntı değil, analizin sorusunun bir parçasıdır. Bu nedenle R öğrenirken yalnızca “hangi komutu yazacağınızı” değil, komutun hangi biyolojik karşılaştırmayı gerçekleştirdiğini de anlamanız gerekir."
capability_bridge = "R komutlarını bilmek değerlidir. Fakat bilimsel çalışma yetkinliği: - verinin neyi temsil ettiğini anlamak, - doğru değişkenleri seçmek, - design'ı araştırma sorusuna göre kurmak, - output'u kontrol etmek, - sonucu biyolojik bağlama geri taşımak ile gelişir. Bu yüzden R öğrenmenin asıl değeri yalnız daha fazla kod yazmak değildir. Biyolojik veriyi daha kontrollü biçimde düşünebileceğiniz bir çalışma yüzeyi kazanmaktır."
related_references = ["/reference/biyolojik-veri-tablosu-expression-matrix/"]
sources = ["R Foundation — R'ın statistical computing, veri işleme ve grafik ortamı olarak kapsamı.", "Bioconductor DESeq2 — Design formülünün count'ların colData değişkenlerine bağımlılığını tanımlaması.", "Galaxy Training Network — Analysis history'nin araç, parametre ve tool version'larını saklaması ve reproducible workflow'a dönüştürülebilmesi.", "Bioconductor SummarizedExperiment — Measurement, feature annotation ve sample annotation katmanlarının koordineli veri modeli."]
sitemap = { priority = 0.6, changefreq = "monthly" }
+++

## Bu yazıda neler var?

- Çalışan kod ile geçerli analiz arasındaki fark
- Yanlış grup tanımının neden syntax hatası vermeyebileceği
- Grafik üretmenin yorum yapmakla neden aynı olmadığı
- R çıktısından sonra hangi kontrollerin yapılması gerektiği
- R yetkinliğinin neden komut ezberinden daha geniş olduğu

## Kod size her yanlışınızı söylemez

R syntax açısından bazı hataları çok iyi yakalar.

Bir fonksiyon adı yanlışsa, gerekli argument eksikse veya nesne bulunamıyorsa hata alabilirsiniz.

Fakat bazı hatalar **syntax hatası değildir**.

Örneğin elinizde altı expression sample'ı olduğunu düşünün:

| Sample | Gerçek durum |
|---|---|
| S1 | Control |
| S2 | Control |
| S3 | Control |
| S4 | Treatment |
| S5 | Treatment |
| S6 | Treatment |

Metadata dosyanızda ise S3 yanlışlıkla Treatment, S4 Control olarak işaretlenmiş olsun.

Dosya hâlâ düzgün bir data frame olabilir.

Bütün Sample ID'leri mevcut olabilir.

Kod hata vermeden çalışabilir.

Fakat artık modeliniz gerçekte yapmak istediğiniz karşılaştırmayı test etmiyordur.

Bu önemli bir ayrımdır:

**Bir bilgisayar sizin verdiğiniz kategoriyi kullanabilir. Kategorinin biyolojik olarak doğru olup olmadığını ise yalnız syntax kontrolü çözmez.**



{{< reference-visual id="W3-PROBLEM-1" >}}

## Design aslında “neyi test ediyorum?” sorusudur

Differential expression örneği üzerinden düşünelim.

DESeq2'de şu tip bir design bulunabilir:

`~ condition`

Burada model, expression/count değişimini `condition` değişkeniyle ilişkilendirmeye çalışır.

Ancak deneyde önemli bir batch değişkeni varsa:

`~ batch + condition`

gibi daha farklı bir design gerekebilir.

Bunların hangisinin uygun olduğu syntax sorusu değildir.

Deney tasarımı sorusudur.

DESeq2'nin resmi dokümantasyonu design formülünü, count değerlerinin `colData` içindeki hangi değişkenlere bağlı olduğunu tanımlayan model olarak tarif eder. Birden fazla değişken ve interaction içeren design'lar da mümkündür.

Dolayısıyla:

**“Kod çalışıyor.”**

ile

**“Model araştırma sorumu uygun biçimde temsil ediyor.”**

aynı ifade değildir.

## Güzel bir grafik de doğru yorumu garanti etmez

Bir PCA grafiği ürettiniz.

İki grup net biçimde ayrılıyor.

İlk tepki şu olabilir:

**“Treatment çok güçlü etki göstermiş.”**

Ama önce şunları bilmeniz gerekir:

Bu renkler gerçekten treatment grupları mı?

Sample etiketleri doğru mu?

Gruplar aynı zamanda farklı batch'lerde mi üretildi?

Doku veya zaman noktası da değişiyor mu?

Grafikteki ayrım başka bir değişkenle ilişkili olabilir mi?

Visualization, veriyi düşünmek için çok güçlüdür.

Ama visualization ile interpretation aynı işlem değildir.

Bir plot:

**“Veride şu örüntü var.”**

demenize yardım edebilir.

Fakat:

**“Bu örüntünün biyolojik nedeni kesin olarak budur.”**

sonucu için deney tasarımı ve başka kanıt katmanları gerekir.

## Reproducible kod da otomatik olarak doğru analiz değildir

Kod tabanlı workflow'ların önemli avantajlarından biri adımların saklanabilmesi ve yeniden çalıştırılabilmesidir.

Ancak reproducibility ile scientific validity yine aynı şey değildir.

Yanlış bir karşılaştırmayı çok düzenli bir script içinde yüz kez tekrar edebilirsiniz.

Sonuç kusursuz biçimde reproducible olabilir; fakat araştırma sorunuz için yine yanlış kurulmuş olabilir.

Bu nedenle reproducibility önemli ama yeterli olmayan bir özelliktir.

Aynı nüans GUI araçları için de geçerlidir. Örneğin Galaxy analiz history'sinde kullanılan araçları, parametreleri ve tool sürümlerini saklayabilir; history'den tekrar kullanılabilir workflow üretilebilir. Dolayısıyla reproducibility yalnızca kod yazarak elde edilen bir özellik değildir.

Ana mesele hangi arayüzü kullandığınızdan önce **analitik kararların doğru kurulmasıdır.**



{{< reference-visual id="W3-PROBLEM-2" >}}

## Aynı sonuç tablosunu iki farklı kişi farklı okuyabilir

İki araştırmacı aynı differential expression tablosunu alabilir.

Birincisi:

“En küçük adjusted p-value'a sahip gene bakalım.”

diyebilir.

İkincisi:

“Effect size ne, expression seviyesi nasıl, aynı pathway'deki diğer genler ne yapıyor ve bu sonuç deney tasarımıyla uyumlu mu?”

diye sorabilir.

İkisinin elinde aynı R çıktısı vardır.

Fakat computational çalışma becerileri aynı değildir.

Çünkü R'ın ürettiği çıktı ile bilimsel karar arasında insanın kurduğu **yorumlama katmanı** vardır.

## Bu ne anlama geliyor?

R çıktısını gördüğünüzde önce şu beş alanı kontrol edin:

**Karşılaştırma:** Gerçekte neyi neyle karşılaştırıyorum?

**Metadata:** Sample'lar gerçekten doğru gruplara bağlı mı?

**Model:** Kullanılan değişkenler araştırma tasarımını yeterince temsil ediyor mu?

**Sonuç:** Effect size, uncertainty ve istatistiksel kanıt ne söylüyor?

**Biyolojik bağlam:** Gözlenen fark araştırdığım sistem içinde ne anlam taşıyor?

Bu beş sorudan sonra grafik veya sonuç tablosu çok daha anlamlı hale gelir.



{{< reference-visual id="W3-PROBLEM-3" >}}
