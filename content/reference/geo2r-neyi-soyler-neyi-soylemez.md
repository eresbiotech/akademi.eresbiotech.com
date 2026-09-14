+++
title = "GEO2R size neyi söyler, neyi söylemez?"
slug = "geo2r-neyi-soyler-neyi-soylemez"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "GEO2R differential expression sonuçlarını nasıl üretir? logFC, adjusted p-value, örnek grupları ve aracın bilimsel sınırlarını doğru yorumlamak için temel rehber."
seo_title = "GEO2R Nedir? Neyi Söyler, Neyi Tek Başına Söylemez?"
article_id = "W1-REFRAME"
week = "1"
series = ["Reference Hub · Hafta 1"]
categories = ["gen-listesi-geo2r-differential-expression"]
category_label = "Gen listesi, GEO2R ve differential expression"
tags = ["gen-listesi", "geo2r", "differential-expression"]
primary_keyword = "GEO2R nedir"
secondary_keywords = "GEO2R nasıl kullanılır, GEO2R analizi, GEO differential expression, GEO2R logFC, GEO2R adjusted p-value, GEO2R RNA-seq"
search_intent = "GEO2R’ın ne işe yaradığını, sonuçlarının nasıl yorumlandığını ve sınırlarını anlamak."
review_status = "QA_READY_PENDING_HUMAN_APPROVAL"
product_path = "/post/biyoinformatik-giris-egitim-buyuk-veri-kurs/"
product_cta = "GEO2R analizini doğru kurmayı ve yorumlamayı öğren"
answer_first = "GEO2R, GEO’da bulunan bir çalışmadaki örnek gruplarını karşılaştırarak differential expression sonuçları elde etmenizi sağlayan web tabanlı bir NCBI aracıdır. Ancak ürettiği tabloyu doğrudan “biyolojik sonuç” olarak okumak doğru değildir. Güncel GEO2R yapısında mikroarray verileri GEOquery ve limma ile, desteklenen RNA-seq analizleri ise beta kapsamda NCBI tarafından hesaplanan raw count matrisleri üzerinden DESeq2 ile analiz edilir. Araç size log fold change, p-value/adjusted p-value ve çeşitli grafikler sağlayabilir. Fakat GEO2R sizin yerinize şu kararları vermez: Doğru örnekleri karşılaştırdınız mı? Çalışma bilimsel sorunuza uygun mu? Veri kalitesi yeterli mi? Bulduğunuz fark biyolojik olarak ne anlama geliyor? GEO2R hesaplamayı kolaylaştırır. Bilimsel karar verme sorumluluğunu ortadan kaldırmaz."
capability_bridge = "GEO2R’ın arayüzünü öğrenmek birkaç adım sürebilir. Fakat farklı bir GEO çalışmasına geçtiğinizde asıl ihtiyaç şudur: Hangi örnekleri neden karşılaştırıyorum? Hangi istatistik bana ne söylüyor? Sonucu hangi noktada kabul etmeli, hangi noktada sorgulamalıyım? Aracı açabilmek ile analizi bilimsel olarak yönetebilmek arasındaki fark burada ortaya çıkar."
related_references = ["/reference/gen-listesi-nasil-yorumlanir/", "/reference/log2-fold-change-adjusted-p-value/"]
sources = ["NCBI — About GEO2R. Güncel mikroarray/RNA-seq analiz yapısı, summary statistics, plots ve caveats.", "NCBI — GEO Overview. GEO veri yapısı ve Sample/Series organizasyonu.", "Smyth GK. *Linear Models and Empirical Bayes Methods for Assessing Differential Expression in Microarray Experiments.*", "Love MI, Huber W, Anders S. *Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2.* Genome Biology, 2014.", "R Documentation — p.adjust. Benjamini–Hochberg ve false discovery rate."]
sitemap = { priority = 0.6, changefreq = "monthly" }
+++

## Bu yazıda neler var?

- GEO2R’ın gerçekte hangi işi yaptığını
- Mikroarray ve RNA-seq tarafındaki güncel farkı
- Grup tanımının neden analizin parçası olduğunu
- GEO2R çıktısının size ne söylediğini
- Sonucun neden tek başına biyolojik mekanizma olmadığını

## GEO2R’ın yaptığı iş nedir?

GEO, araştırmacılar tarafından gönderilen yüksek verimli functional genomics çalışmalarını barındıran NCBI veri tabanıdır. GEO2R ise bu veri tabanındaki uygun Series kayıtları üzerinde iki veya daha fazla Sample grubunu karşılaştırmak için hazırlanmış interaktif analiz aracıdır.

Basit bir örnek düşünelim.

Bir GEO çalışmasında:

- 6 kontrol örneği,
- 6 hastalık örneği

bulunuyor.

Siz bu örnekleri iki grup halinde tanımlayıp karşılaştırdığınızda GEO2R her gen için koşullar arasındaki farkı istatistiksel model çerçevesinde değerlendirebilir.

Buraya kadar GEO2R son derece kullanışlıdır.

Fakat kritik ayrım bundan sonra başlar.



{{< reference-visual id="W1-REFRAME-1" >}}

## En önemli karar Analyze düğmesinden önce verilir

GEO2R size grup oluşturma yüzeyi verir.

Ama hangi Sample’ın hangi gruba ait olduğunu bilimsel bağlama göre sizin belirlemeniz gerekir.

NCBI’nin kendi kullanım açıklaması da Sample title, source ve characteristics alanlarının grup ataması yapılırken değerlendirilmesini önerir.

Bu ayrım önemlidir.

Çünkü teknik olarak başarılı bir analiz, bilimsel olarak yanlış kurulmuş bir karşılaştırmayı düzeltmez.

Örneğin kontrol ve hastalık örneklerini ayırırken aynı anda:

- farklı dokuları,
- farklı zaman noktalarını,
- farklı tedavi koşullarını

karıştırırsanız sonuç tablosu yine üretilebilir.

Fakat artık hangi biyolojik faktörün gözlenen farkı oluşturduğunu yorumlamak zorlaşır.

**Bir aracın sonuç üretmesi, deney tasarımınızın doğru olduğu anlamına gelmez.**

## Güncel GEO2R: mikroarray ve RNA-seq aynı arka planı kullanmıyor

GEO2R hakkında eski anlatımların önemli bir bölümü onu yalnızca limma tabanlı bir mikroarray aracı olarak tanımlar.

Bu artık eksik bir açıklamadır.

NCBI’nin güncel dokümantasyonuna göre:

**Mikroarray analizlerinde** GEO2R, submitter tarafından sağlanan processed data tablolarını kullanarak GEOquery ve limma üzerinden differential expression analizi yapar.

**RNA-seq tarafında** ise desteklenen analizler beta kapsamda NCBI tarafından hesaplanmış raw count matrisleri üzerinden DESeq2 kullanır.

Bu yüzden sonuç tablosundaki kolon adları ve istatistikler veri tipine göre farklılaşabilir.

Mikroarray tarafında örneğin:

- `logFC`
- `P.Value`
- `adj.P.Val`
- moderated t-statistic

görülebilir.

RNA-seq tarafında ise:

- `log2FoldChange`
- `pvalue`
- `padj`
- `baseMean`
- `stat`

gibi DESeq2 çıktıları bulunabilir.



{{< reference-visual id="W1-REFRAME-2" >}}

## GEO2R size ne söyler?

Doğru kurulduğunda GEO2R şu soruya yardımcı olur:

**“Tanımladığım deneysel gruplar arasında hangi genlerin ekspresyonu için istatistiksel olarak desteklenen farklılıklar gözleniyor?”**

Araç bunun için size çeşitli katmanlar sunar.

### 1. Fold change

Değişimin yönünü ve büyüklüğünü görmenizi sağlar.

### 2. P-value ve adjusted p-value

Gözlenen farkın istatistiksel değerlendirmesini sağlar.

Binlerce genin aynı anda test edildiği differential expression analizlerinde multiple testing önemlidir. GEO2R varsayılan olarak Benjamini–Hochberg FDR düzeltmesini seçer ve adjusted p-value değerini sonuç yorumunda temel istatistiklerden biri olarak tanımlar.

### 3. Volcano ve mean-difference gibi grafikler

Genlerin etki büyüklüğü ve istatistiksel destek bakımından genel dağılımını görmenize yardım eder.

### 4. Expression profilleri

Belirli genlerin örnekler arasındaki ekspresyon değerlerini inceleyebilirsiniz.

Bunlar güçlü özelliklerdir.

Ama hâlâ cevaplanmamış başka sorular vardır.

## GEO2R size neyi tek başına söylemez?

### “Bu gen hastalığın nedenidir.”

Hayır.

Differential expression bir ilişki veya koşullar arasındaki değişimi gösterebilir. Nedensellik için ek deneysel ve biyolojik kanıt gerekir.

### “En üst sıradaki gen biyolojik olarak en önemli gendir.”

Hayır.

Sonuçların sıralanması belirli istatistiksel ölçütlere dayanabilir. İstatistiksel sıralama biyolojik önemin doğrudan sıralaması değildir.

### “Adjusted p-value < 0,05 ise sonuç kesin doğrudur.”

Hayır.

Bu bir karar eşiğidir; mutlak doğruluk etiketi değildir. FDR yaklaşımı çoklu test bağlamındaki yanlış keşifleri kontrol etmeye yönelik istatistiksel bir çerçevedir.

### “GEO2R çalıştıysa veri seti analiz için uygundur.”

Bu da garanti değildir.

NCBI özellikle GEO2R’ın çok farklı nitelikte Series kayıtlarına erişebildiğini ve bu nedenle kullanıcının aracın limitations/caveats bölümünü dikkate alması gerektiğini vurgular. Mikroarray tarafında analiz submitter-supplied processed data üzerinden yapılır; dolayısıyla veri hazırlama ve çalışma kalitesi sonuç bağlamının bir parçasıdır.



{{< reference-visual id="W1-REFRAME-3" >}}

## Bir volcano plot’a bakınca ne görmelisiniz?

Volcano plot oldukça etkileyici göründüğü için bazen analizin kendisiyle eş anlamlı hale gelir.

Oysa plot yalnızca iki temel boyutu görünür kılar:

- değişimin büyüklüğü,
- istatistiksel destek.

Bir noktanın grafikte “iyi” bir bölgede durması şu soruları otomatik olarak cevaplamaz:

Gen hangi hücrede ifade ediliyor?

Deney koşulları doğru karşılaştırıldı mı?

Değişim beklenen biyolojik süreçle uyumlu mu?

Başka genler aynı örüntüyü destekliyor mu?

Bu nedenle volcano plot sonuçları keşfetmek için iyidir; biyolojik hikâyeyi tek başına tamamlamaz.



{{< reference-visual id="W1-REFRAME-4" >}}

## Bu ne anlama geliyor?

GEO2R’ı doğru kullanmak yalnızca:

**grupları seç → Analyze → tabloyu indir**

işlemi değildir.

Daha doğru zihinsel model şudur:

**çalışmayı anla → Sample metadata’yı oku → biyolojik grupları doğru kur → analizi çalıştır → veri tipine uygun çıktıyı oku → kaliteyi kontrol et → effect size ve adjusted p-value’ı değerlendir → biyolojik bağlama geri dön**

GEO2R’ın değeri burada azalmaz.

Tam tersine, aracın ne yaptığını bildiğinizde çok daha güçlü hale gelir.
