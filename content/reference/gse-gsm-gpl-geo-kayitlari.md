+++
title = "GSE, GSM ve GPL nedir? GEO kayıtlarını okumaya nereden başlamalısınız?"
slug = "gse-gsm-gpl-geo-kayitlari"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "GEO'da GSE, GSM ve GPL ne anlama gelir? Series, Sample, Platform ve veri dosyalarını analize başlamadan önce hangi sırayla okumanız gerektiğini öğrenin."
seo_title = "GSE, GSM ve GPL Nedir? GEO Kayıtlarını Okuma Rehberi"
article_id = "W4-PROBLEM"
week = "4"
series = ["Reference Hub · Hafta 4"]
categories = ["geo,-metadata-ve-analitik-sınırlar"]
category_label = "GEO, metadata ve analitik sınırlar"
answer_first = "GEO'da bir `GSE` kaydı bulduğunuzda henüz yalnızca indirilecek tek bir “veri dosyasına” ulaşmış değilsiniz. GEO'nun temel kayıt mimarisinde: **GSE / Series**, ilişkili sample'ları bir çalışma altında toplar ve çalışmanın genel amacını ve tasarımını açıklar. **GSM / Sample**, tekil biyolojik/deneysel örnek hakkında bilgi taşır: kaynağı, koşulları, uygulanan işlemler ve elde edilen ölçüm gibi. **GPL / Platform** ise ölçümün üretildiği teknolojik platformu tanımlar; array çalışmalarında prob/feature yapısını da içerebilir. Bu üç record tipi GEO'nun temel submitted record katmanlarını oluşturur. Bu nedenle GEO'da ilk işiniz “Analyze” düğmesine basmak değil: **çalışma neyi soruyor → hangi sample'lar var → bunlar nasıl üretildi → hangi platform kullanıldı → hangi raw/processed dosyalar mevcut** sırasını okumaktır."
capability_bridge = "GEO'da bir accession bulmak başlangıçtır. Daha ileri çalışma becerisi: - Series ile Sample'ı ayırmak, - Sample metadata'yı okumak, - Platform bilgisini anlamak, - raw ve processed dosyalar arasında bilinçli seçim yapmak, - hangi sample'ların gerçekten karşılaştırılacağını belirlemektir. **Veriyi bulmak başka, doğru veri katmanını kendi bilimsel sorunuz için kullanmak başka bir beceridir.**"
sources = [
  "NCBI GEO — GEO ana repository ve güncel veri kapsamı.",
  "NCBI/NIH — GEO record yapısı: Platform, Sample ve Series.",
  "NCBI GEO — Sample metadata validation ve biyolojik açıklama alanları.",
  "NCBI GEO — Güncel high-throughput sequence submission yapısı.",
  "NCBI GEO — GEO2R çalışma modeli ve Sample metadata kullanımı.",
  "NCBI GEO — Accession Viewer ve record family ilişkileri.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/biyoinformatik-giris-egitim-buyuk-veri-kurs/"
product_cta = "Biyoinformatiğe başlangıç yolunu inceleyin"
+++

## Bu yazıda neler var?

- GSE, GSM ve GPL kayıtlarının farkı
- Series ile Sample'ın neden aynı şey olmadığı
- Platform bilgisinin neden analiz bağlamının parçası olduğu
- Supplementary dosyaların nasıl düşünülmesi gerektiği
- Bir GEO kaydını açınca ilk bakmanız gereken dört alan

## GEO'da “asıl veri seti” hangisi?

Bu sorunun tek kelimelik cevabı yoktur.

Çünkü GEO bir çalışma hakkında birden fazla bilgi katmanını birbirine bağlar.

Bir araştırma sorusu açısından Series ana giriş noktası olabilir.

Fakat sample gruplarını kurmak için GSM kayıtlarına bakmanız gerekir.

Array annotation'ını anlamak için GPL önemli olabilir.

RNA-seq çalışmasında ise processed count matrix, supplementary dosyalar ve SRA'daki raw sequencing data farklı kaynaklarda bulunabilir.

GEO'nun güncel yapısı hem array hem sequence-based functional genomics çalışmalarını kabul eder; high-throughput sequencing kayıtlarında raw sequence data NCBI'nin SRA altyapısıyla bağlantılı olabilirken GEO kayıtlarında işlenmiş ve yardımcı veri dosyaları bulunabilir.

Dolayısıyla:

**“Hangi dosyayı indireceğim?”**

sorusundan önce:

**“Hangi veri katmanına ihtiyacım var?”**

sorusunu çözmek gerekir.

## GSE: Çalışmanın büyük resmi

GSE prefix'li Series kaydı, ilişkili sample'ları aynı çalışma altında toplar.

Burada genellikle:

- çalışma başlığı,
- summary,
- overall design,
- sample listesi,
- ilişkili platformlar,
- supplementary files,
- publication ilişkileri

gibi bilgiler görürsünüz.

NCBI'nin GEO açıklamalarında Series, bir çalışmaya ait ilişkili Sample kayıtlarını birleştiren ve çalışmanın amacı/tasarımı için odak noktası sağlayan record olarak tanımlanır.

Bu yüzden Series sayfasında ilk okumanız gereken şey yalnız çalışma başlığı değildir.

**Overall design** özellikle önemlidir.

Çünkü iki sample grubunun neden var olduğunu, hangi deneysel koşulların karşılaştırıldığını veya çalışmanın bir time-course, treatment ya da başka bir tasarım taşıyıp taşımadığını burada anlayabilirsiniz.

GSE size:

**“Bu çalışma genel olarak ne yaptı?”**

sorusunun cevabını verir.

Ama tek tek sample'ların tüm bağlamını vermek zorunda değildir.

## GSM: “Sample'lar kim?” sorusunun cevabı

GSM kayıtları çalışmanın tekil Sample katmanıdır.

Bir Sample kaydında bağlama göre:

- organism,
- source,
- tissue/cell type,
- treatment,
- genotype,
- disease state,
- library strategy,
- processing açıklaması,
- platform,
- supplementary files

gibi bilgiler bulunabilir.

GEO'nun güncel submission-validation dokümantasyonu tissue, cell line, cell type, treatment, genotype ve disease state gibi alanların sample'ların aranmasını ve yeniden kullanılmasını kolaylaştırdığını özellikle belirtir.

Bu çok önemli bir noktadır.

Çünkü GEO2R gibi bir araçta:

`GSM123 → control`

ataması yapmadan önce `GSM123`ün gerçekten ne olduğunu bilmeniz gerekir.

Sample title tek başına her zaman yeterli değildir.

Source ve Characteristics alanları analitik grup kararının bir parçası olabilir.

GEO2R'ın güncel dokümantasyonu da grup oluştururken Sample metadata sütunlarının kullanılmasını açıkça önerir.

## GPL: Platform neden ayrı bir kayıt?

GPL / Platform, Sample'ın biyolojik durumunu değil, ölçümün teknolojik bağlamını tanımlar.

Özellikle microarray verisinde platform:

- hangi array'in kullanıldığı,
- hangi probe/feature'ların bulunduğu,
- feature'ların hangi annotation'larla eşleştirildiği

gibi bilgileri taşıyabilir.

Bu yüzden:

**Platform annotation ≠ Sample metadata.**

GPL size “bu kişi hastaydı mı?” sorusunun cevabını vermez.

GSM ise array üzerindeki bütün probe annotation'larının teknik tanımını vermek zorunda değildir.

Bunlar farklı bilgi katmanlarıdır.

Aynı Series'in birden fazla platform içermesi de mümkündür; dolayısıyla aynı GSE içinde gördüğünüz bütün Sample'ların ölçüm bağlamını otomatik olarak aynı kabul etmeyin.

## Supplementary files: Hangisini indirmelisiniz?

GEO kayıtlarında supplementary bölüm bazen kafa karışıklığının en yoğun olduğu alandır.

Bir RNA-seq veya spatial/single-cell kaydında örneğin:

- count matrix,
- feature listesi,
- barcode listesi,
- normalized matrix,
- processed object,
- image veya coordinate dosyaları

bulunabilir.

Güncel GSM kayıtları bu çeşitliliği açıkça gösteriyor: bazı single-cell kayıtlarında `matrix.mtx`, `features.tsv`, `barcodes.tsv` gibi processed output'lar GEO üzerinden sunulurken raw sequencing data ayrıca SRA ile ilişkilendiriliyor.

Bu nedenle supplementary bölümünde:

**“En büyük dosyayı indireyim.”**

mantığı doğru değildir.

Önce şu soruyu sorun:

**Analizi nereden başlatacağım?**

Raw read düzeyinden mi?

Hazır count matrix'ten mi?

Submitter'ın processed expression tablosundan mı?

Yalnız metadata ve mevcut sonuçları mı inceleyeceğim?

Dosya seçimi bu cevaptan sonra gelir.

## Processed data ile raw data'yı ayırın

Bir başka kritik ayrım:

**processed data ≠ raw data**

GEO2R'ın güncel microarray workflow'u submitter tarafından sağlanan processed data tabloları üzerinden çalışır.

RNA-seq tarafında ise GEO2R, uygun çalışmalar için NCBI'nin kendi pipeline'ı tarafından hesaplanan raw count matrix'lerini DESeq2'ye girdi olarak kullanır.

Bu nedenle “GEO'dan expression data aldım” demek tek başına yeterli değildir.

Şunları bilmek gerekir:

Bu değerler raw counts mı?

Normalized values mı?

Log-transformed değerler mi?

Submitter tarafından hangi preprocessing yapılmış?

GEO2R'ın kendisi de microarray çalışmalarında Sample kayıtlarındaki `Data processing` ve VALUE açıklamalarının kontrol edilmesini önerir.

## Bu ne anlama geliyor?

Bir GEO Series açtığınızda şu sırayla ilerleyebilirsiniz:

**1. Study design**\
Çalışmanın asıl sorusu ve deney tasarımı ne?

**2. Sample records**\
Hangi GSM hangi biyolojik/deneysel koşulu temsil ediyor?

**3. Platform**\
Ölçüm hangi teknoloji ve annotation bağlamında üretildi?

**4. Data files**\
Raw, processed ve supplementary seçeneklerden hangisi benim analiz başlangıcım?

Bu dört alanı anlamadan doğrudan differential expression tablosu üretmek mümkün olabilir.

Fakat neyi karşılaştırdığınızı anlamadan üretilen sonuç daha az güvenilir bir bilimsel çalışma yüzeyi olur.
