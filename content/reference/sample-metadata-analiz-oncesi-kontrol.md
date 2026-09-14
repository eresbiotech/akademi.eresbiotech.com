+++
title = "Analize başlamadan önce metadata neden kontrol edilmelidir?"
slug = "sample-metadata-analiz-oncesi-kontrol"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Expression veya count matrix analizinden önce sample metadata neden kontrol edilmelidir? Sample ID, condition, batch ve replicate bilgisinin analizi nasıl etkilediğini görün."
seo_title = "Sample Metadata Nedir? Analizden Önce Neden Kontrol Edilmeli?"
article_id = "W3-WORKFLOW"
week = "3"
series = ["Reference Hub · Hafta 3"]
categories = ["r,-biyolojik-veri-ve-metadata"]
category_label = "R, biyolojik veri ve metadata"
answer_first = "Bir expression veya count matrix size **ne ölçüldüğünü** gösterir. Metadata ise büyük ölçüde **bu ölçümlerin hangi sample'dan, hangi koşuldan ve hangi deneysel bağlamdan geldiğini** açıklar. Bu yüzden metadata analizin sonunda grafiğe eklenecek açıklama dosyası değildir. Analitik tasarımın parçasıdır. Örneğin bir sample'ın `control` yerine `treatment` olarak etiketlenmesi karşılaştırmanızı değiştirir. Batch bilgisinin gözden kaçırılması teknik ve biyolojik varyasyonu birbirinden ayırmayı zorlaştırabilir. Sample ID sırası measurement matrix ile uyuşmuyorsa ölçüm ve sample bilgisi yanlış eşleşebilir. DESeq2'nin veri modeli bunu doğrudan yansıtır: count matrisi ile sample information (`colData`) birlikte kullanılır ve design formülü count'ların metadata'daki hangi değişkenlere bağlı olarak modelleneceğini belirtir. Bu nedenle iyi bir workflow: **önce sample'ları anlar, sonra modeli kurar.** Grafik bundan sonra gelir."
capability_bridge = "Metadata dosyasını `read.csv()` ile açmak kolaydır. Asıl çalışma becerisi: - ID eşleşmesini kontrol etmek, - variable'ları doğru anlamlandırmak, - kategorilerin dağılımını görmek, - batch/confounding ihtimalini fark etmek, - bu bilgiyi statistical design'a çevirmektir. R burada yalnız metadata dosyasını okumaz. **Metadata ile measurement verisini aynı analitik model içinde ilişkilendirmenize olanak verir.**"
sources = [
  "Bioconductor DESeq2 — Count matrix, `colData` ve design formülünün birlikte kullanılması.",
  "Bioconductor SummarizedExperiment — assay ile sample `colData` ilişkisinin veri modeli.",
  "NCBI GEO — Tissue, cell type, treatment, genotype ve disease state gibi sample metadata'nın reuse/discovery'deki rolü.",
  "Bioconductor BatchQC — Batch ve condition dağılımının experimental design içinde incelenmesi.",
  "Bioconductor DESeq2 documentation/support — Count columns ile sample-information rows eşleşmesinin kritik oluşu.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/biyoinformatik-icin-r-programlama/"
product_cta = "Biyolojik veriyi R ile daha bilinçli incelemeyi öğrenin"
+++

## Metadata size hangi soruları cevaplatır?

İyi bir sample metadata tablosu bağlama göre şunları taşıyabilir:

- sample ID,
- condition,
- treatment,
- tissue veya cell type,
- time point,
- batch,
- biological replicate,
- patient/individual,
- genotype,
- başka deneysel veya klinik değişkenler.

Her çalışma bunların hepsini taşımaz.

Taşımamalıdır da.

Önemli olan araştırma tasarımını ve ölçümün kaynağını anlamak için gerekli değişkenlerin açık olmasıdır.

NCBI GEO'nun submission yapısında da tissue, cell line, cell type, treatment, genotype ve disease state gibi sample-level açıklamaların veri arama, yeniden kullanım ve keşfi kolaylaştırdığı özellikle belirtilir.

Metadata bu nedenle yalnız “dosya yönetimi” değildir.

**Ölçümün deneysel bağlamıdır.**

## İlk kontrol: Sample ID gerçekten eşleşiyor mu?

Elinizde:

**count matrix**

ve:

**metadata table**

olsun.

Count matrix sütunları:

`S1, S2, S3, S4`

Metadata satırları da aynı dört sample'ı içerebilir.

Ama bu tek başına yeterli değildir.

Ölçüm sütunuyla metadata satırının aynı sample'a karşılık geldiğini doğrulamalısınız.

DESeq2 dokümantasyonunda bu eşleşme kritik kabul edilir: count matrix sütunları ile sample-information satırlarının tutarlı olması gerekir; design değişkenleri de bu `colData` üzerinden alınır.

Modern `SummarizedExperiment` yapısının assay ve `colData`yı aynı sample ekseninde koordine etmesinin nedenlerinden biri de budur.

Çünkü yanlış sample eşleştirmesi yalnız dosya hatası değildir.

**Ölçümü yanlış biyolojik örneğe bağlamaktır.**

## İkinci kontrol: Grup etiketleri gerçekten düşündüğünüz şeyi mi anlatıyor?

Bir kolonda:

`Control`

ve:

`Treatment`

yazması çok açıklayıcı görünebilir.

Ama yine de şu sorular gereklidir:

Treatment ne?

Doz ne?

Süre ne?

Control untreated mı, vehicle control mü?

Sample aynı tissue'dan mı?

Farklı time point var mı?

Metadata category bir kelimeden ibaret olsa bile bilimsel anlamı deney tasarımından gelir.

Bu nedenle:

**metadata label ≠ otomatik olarak tam biyolojik açıklama**

şeklinde düşünmek daha güvenlidir.

## Üçüncü kontrol: Batch ile condition nasıl dağılmış?

Başlangıçtaki altı sample örneğine dönelim.

| Sample | Condition | Batch |
|---|---|---|
| C1 | Control | A |
| C2 | Control | A |
| C3 | Control | B |
| T1 | Treatment | A |
| T2 | Treatment | B |
| T3 | Treatment | B |

Burada batch tamamen condition ile aynı şey değildir.

Her iki batch'te de iki condition'dan örnek vardır.

Ama dağılım dengeli değildir.

Dolayısıyla gözlenen variation'ın:

- treatment,
- batch,
- ikisinin kombinasyonu

ile ne ölçüde ilişkili olduğunu düşünmek gerekir.

BatchQC gibi Bioconductor araçları tam da bu nedenle condition ile batch'in experimental design içindeki dağılımını ayrı olarak inceleyen kontroller sunar.

Daha uç bir tasarım düşünelim:

**Bütün control sample'lar Batch A**\
**Bütün treatment sample'lar Batch B**

Bu durumda treatment ve batch birbirine tamamen bağlıdır.

Artık yalnız veriye bakarak gördüğünüz farkın ne kadarının treatment, ne kadarının batch olduğunu ayrı ayrı tahmin etmek temel olarak sorunlu hale gelir.

Bu bir “R syntax” problemi değildir.

**Experimental design problemidir.**

## Replicate neyi ifade ediyor?

Metadata'da “replicate” bilgisi de dikkatle okunmalıdır.

İki satırın aynı değerleri taşıması onları otomatik olarak biyolojik replicate yapmaz.

Biyolojik replicate:

aynı deneysel koşulu bağımsız biyolojik birimler üzerinden tekrar eden örneklerle ilgili bir kavramdır.

Technical replicate ise ölçüm/protokol tekrarının başka bir katmanıdır.

Bu ayrım kullanılan yönteme ve deney tasarımına göre analizin nasıl kurulacağını etkileyebilir.

Dolayısıyla:

**duplicate row ≠ biological replicate**

ve:

**iki benzer sample adı ≠ aynı deneysel rol**

demektir.

Metadata'nın görevi bu ayrımları görünür kılabilmektir.

## Metadata'yı ne zaman kontrol etmelisiniz?

PCA'dan sonra değil.

Differential expression sonucunu aldıktan sonra değil.

Volcano plot şaşırtıcı görünmeye başladığında değil.

**Analizin başında.**

Pratik olarak measurement matrix'i açtıktan hemen sonra:

### Sample ID'leri kontrol edin

Count/expression matrix sütunları metadata satırlarıyla uyuşuyor mu?

### Kategorileri kontrol edin

Condition isimlerinde typo, farklı yazım veya beklenmeyen level var mı?

`control`, `Control` ve `CTRL` yanlışlıkla üç farklı kategori olmuş olabilir mi?

### Missing değerleri görün

Hangi değişkenlerde bilgi eksik?

Eksiklik analitik tasarımı etkiliyor mu?

### Batch ve başka covariate'ları inceleyin

Condition ile nasıl dağılıyorlar?

### Replicate yapısını anlayın

Bağımsız biyolojik örnekler hangileri?

### Analitik soruyu tekrar kurun

Gerçekte hangi değişkenin etkisini test etmek istiyorsunuz?

## Metadata ile plot arasındaki ilişki

Metadata kontrolünün değeri yalnız statistical design için değildir.

Exploratory visualizations'ı da anlamlandırır.

Örneğin PCA'da iki cluster gördüğünüzde sample metadata sayesinde:

- condition,
- batch,
- tissue,
- individual,
- başka bir değişken

ile cluster yapısını karşılaştırabilirsiniz.

Böylece:

**“İki cluster var.”**

gözlemi:

**“Bu ayrım hangi değişkenle ilişkili olabilir?”**

sorusuna dönüşür.

Grafik artık yalnız görsel çıktı değil, design kontrol aracıdır.

## Bu ne anlama geliyor?

Analizden önce metadata'ya bakmak bir bürokrasi değildir.

Şunları anlamaya çalışıyorsunuz:

**Hangi sample hangisi?**

**Hangi sample hangi biyolojik koşulu temsil ediyor?**

**Başka hangi deneysel değişkenler var?**

**Bu değişkenler birbirleriyle nasıl ilişkili?**

**Modelimde hangilerini dikkate almam gerekiyor?**

Bu sorular yanıtlanmadan doğrudan result table'a geçmek, ölçümü bağlamından ayırmak anlamına gelebilir.

Bu nedenle pratik bir kural:

**Grafikten önce sample tablosuna bakın.**
