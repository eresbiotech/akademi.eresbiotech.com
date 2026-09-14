+++
title = "Single-cell RNA-seq'de QC neden biyolojik yorumdan önce gelir?"
slug = "single-cell-rna-seq-qc"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Single-cell RNA-seq'de QC neden UMAP ve clustering'den önce gelir? nFeature, nCount, mitochondrial fraction ve doublet sinyallerini sabit cutoff'lara dönüştürmeden yorumlayın."
seo_title = "Single-Cell RNA-seq QC: nFeature, nCount ve Mitochondrial Yüzde"
article_id = "W5-WORKFLOW"
week = "5"
series = ["Reference Hub · Hafta 5"]
categories = ["tek-hücre-rna-seq"]
category_label = "Tek hücre RNA-seq"
answer_first = "Single-cell RNA-seq analizinde güzel bir UMAP üretmeden önce daha temel bir soruyu cevaplamanız gerekir: **Grafikte göstereceğiniz barcodların gerçekten yorumlanabilir hücresel expression profilleri olduğuna ne kadar güveniyorsunuz?** Droplet-based single-cell veride düşük kaliteli veya hasarlı hücreler, boş/ambient RNA etkileri ve aynı barcode altında birden fazla hücrenin yakalandığı doublet/multiplet durumları downstream analizi etkileyebilir. Güncel single-cell best-practice kaynakları QC'nin temel amaçlarından birini her observation'ın mümkün olduğunca anlamlı bir single-cell profili olmasını sağlamak olarak tanımlar. Sık kullanılan QC sinyalleri arasında: - hücre başına toplam count, - tespit edilen gene/feature sayısı, - mitochondrial transcript fraction bulunur. Fakat bu metriklerden hiçbirinin bütün dokular ve teknolojiler için geçerli tek bir sihirli cutoff'u yoktur. Mitochondrial fraction'ın bile tissue, species ve deney bağlamına göre değiştiği milyonlarca hücre üzerinde gösterilmiştir. Bu yüzden QC: **metric → sabit eşik → sil** işlemi değil, **metric → distribution → biological/technical context → karar** sürecidir."
capability_bridge = "QC metric'lerini ekranda görmek kolaydır. Asıl çalışma becerisi: - distribution'ı okumak, - metric'leri birlikte değerlendirmek, - tissue/technology bağlamını hesaba katmak, - doublet ve low-quality sinyallerini ayırmak, - filtering kararının downstream clustering ve annotation üzerindeki etkisini anlamaktır. **Threshold yazmak başka, QC kararı vermek başka bir beceridir.**"
sources = [
  "Single-cell Best Practices — QC metrics, joint interpretation, permissive/context-aware filtering ve doublet değerlendirmesi.",
  "Seurat — Güncel PBMC3K tutorial; nFeature, nCount ve mitochondrial metric örneği.",
  "Osorio & Cai — Mitochondrial proportion'ın tissue/species bağımlılığı ve universal threshold sorunu.",
  "Practical scRNA-seq QC handbook — Count, mitochondrial fraction ve multiplet/QC yorumları.",
  "Scanpy — Clustering sonrasında QC/doublet metric'lerinin tekrar değerlendirilmesi.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/tek-hucre-rna-seq-analizi-egitimi/"
product_cta = "Tek hücre RNA-seq çalışma yolunu inceleyin"
+++

## nFeature neden kontrol edilir?

Seurat terminology'sinde `nFeature_RNA`, bir hücrede tespit edilen unique feature/gene sayısını ifade eder.

Çok düşük feature sayısı:

- düşük RNA içeriği,
- hasarlı/düşük kaliteli hücre,
- yetersiz capture

gibi durumlarla ilişkili olabilir.

Çok yüksek feature sayısı ise bazı durumlarda birden fazla hücrenin aynı barcode altında yakalanması gibi multiplet/doublet ihtimalini düşündürebilir. Seurat'ın güncel tutorial'ı da düşük feature sayısını düşük kaliteli hücre/empty droplet sinyallerinden biri, olağandışı yüksek feature sayısını ise potansiyel doublet/multiplet sinyali olarak ele alır.

Ama:

**yüksek feature = kesin doublet**

değildir.

Bazı hücre tipleri daha büyük veya transkripsiyonel olarak daha aktif olabilir.

Aynı şekilde:

**düşük feature = kesin kötü hücre**

değildir.

Bazı biyolojik hücre grupları doğal olarak düşük RNA complexity gösterebilir.

Bu yüzden distribution ve tissue biology birlikte düşünülmelidir.

## nCount ne anlatır?

`nCount_RNA`, hücreye/barcode'a atanan toplam molecule/count miktarıyla ilişkilidir.

Feature sayısıyla çoğunlukla güçlü ilişki gösterir. Seurat da bu iki metric'i birlikte inceler.

Aşırı düşük count:

düşük bilgi içeriğini düşündürebilir.

Aşırı yüksek count:

doublet/multiplet veya doğal olarak yüksek RNA içerikli hücreleri düşündürebilir.

Yine:

**yüksek = iyi**

ve:

**düşük = sil**

gibi doğrusal bir kural yoktur.

Single-cell best-practice rehberi, count depth, detected genes ve mitochondrial fraction'ın birlikte değerlendirilmesini; tek bir metric'e sert biçimde bağlı kararların gerçek biyolojik subpopulation'ları kaybettirebileceğini vurgular.

## Mitochondrial percentage neden kullanılır?

Hasarlı veya dying hücrelerde cytoplasmic RNA kaybı nedeniyle mitochondrial transcriptlerin göreli oranı artabilir.

Bu yüzden mitochondrial fraction yaygın bir QC metric'idir.

Ancak şu çıkarım doğru değildir:

**“%5 üzerindeki her hücre kötüdür.”**

Literatürde %5 gibi erken yaygınlaşmış cutoff'ların tüm tissue ve species'lere mekanik biçimde uygulanmasının sorunlu olabileceği gösterilmiştir. 5,5 milyondan fazla hücreyi değerlendiren sistematik çalışma, mitochondrial proportion'ın species ve tissue'lar arasında önemli ölçüde farklılaştığını ve threshold'ların sample/context'e göre belirlenmesi gerektiğini göstermiştir.

Single-cell best-practice rehberi de yüksek mitochondrial fraction'ın bazı metabolik olarak aktif hücrelerde biyolojik olabileceğini ve metric'lerin birlikte yorumlanması gerektiğini vurgular.

Dolayısıyla:

**high mitochondrial fraction = investigate**

daha güvenli bir başlangıçtır.

**high mitochondrial fraction = delete**

değil.

## Aynı tutorial'daki cutoff'u kendi dataset'inize kopyalayabilir misiniz?

Bu single-cell analizinde çok yaygın bir tuzaktır.

Örneğin Seurat PBMC3K tutorial'ında:

- 200'den az,
- 2500'den fazla feature,
- %5'ten fazla mitochondrial count

olan hücreler filtrelenir.

Fakat bu değerler **o PBMC tutorial dataset'i için kullanılan örnek seçimlerdir.**

Evrensel biyoloji kanunları değildir.

Başka bir:

- tissue,
- species,
- chemistry,
- sequencing depth,
- nucleus/cell preparation

için dağılımlar farklı olabilir.

Bu nedenle bir tutorial cutoff'unu kendi projenize kopyalamak yerine önce kendi metric dağılımlarınızı inceleyin.

## Doublet nedir?

Droplet-based sistemlerde bazen aynı droplet içine iki veya daha fazla hücre girer.

Bu durumda tek barcode altında iki hücrenin expression profili karışabilir.

Heterotypic doublet'lar özellikle problem yaratabilir; çünkü iki farklı hücre lineage'ına ait markerları birlikte ifade eden yapay bir profil üretip yeni bir “ara hücre tipi” gibi görünebilir. Single-cell best-practice kaynakları bu nedenle doublet detection'ı erken preprocessing adımlarından biri olarak ele alır.

Ama burada da:

**yüksek count = doublet**

diye tek başına karar verilmez.

Specialized doublet-detection yöntemleri expression structure'dan ek kanıt üretir.

## QC clustering'i gerçekten değiştirebilir mi?

Evet.

Düşük kaliteli hücreler veya doublet'lar neighbor graph'ına dahil edildiğinde:

- ayrı bir low-quality cluster,
- stress/mitochondrial signal'la tanımlanan cluster,
- yapay mixed-marker cluster

oluşturabilir.

Bu yüzden QC yalnız final grafiği “daha temiz” yapmak değildir.

Downstream computational structure'ın hangi hücrelerden kurulacağını belirler.

Scanpy'ın güncel clustering tutorial'ı da clustering sonrasında QC metric'lerini UMAP üzerinde tekrar gözden geçirmeyi ve doublet/QC sinyallerini yeniden değerlendirmeyi içerir.

Bu iyi bir hatırlatmadır:

QC her zaman tek seferlik kapı değildir.

**İteratif olabilir.**

## QC ne zaman yapılır?

Genel mantık:

**raw/initial cells**

→ basic QC metrics

→ low-quality / empty / doublet değerlendirmesi

→ filtering

→ normalization/representation

→ clustering

→ QC sinyallerini tekrar kontrol

şeklinde olabilir.

Ancak her platform ve workflow aynı değildir.

Ana fikir filtre komutlarının sırası değil:

**yorum yaptığınız hücre setinin kalitesini sürekli sorgulamaktır.**

## “Temiz görünen UMAP” kaliteli veri kanıtı mı?

Hayır.

UMAP'ın güzel ayrılmış görünmesi:

- doublet olmadığını,
- low-quality hücre bulunmadığını,
- ambient RNA probleminin çözülmüş olduğunu,
- doğru filtering yapıldığını

göstermez.

İyi görsel sonuç bilimsel QC'nin yerine geçmez.

Hatta aşırı agresif filtering de UMAP'ı görsel olarak daha temiz hale getirirken gerçek nadir hücre gruplarını ortadan kaldırabilir.

Bu yüzden amaç:

**en temiz resmi yapmak**

değil,

**gerçek biyolojik çeşitliliği korurken teknik artefaktları mümkün olduğunca azaltmak**

olmalıdır.

## Practical decision flow

Bir hücrede sorunlu QC metric gördüğünüzde:

**1. Metric tek başına mı anormal?**

**2. nFeature, nCount ve mitochondrial fraction birlikte ne söylüyor?**

**3. Bu değer dataset dağılımına göre gerçek outlier mı?**

**4. Hücre tipi/tissue biology bu sinyali açıklayabilir mi?**

**5. Doublet ihtimali başka evidence ile destekleniyor mu?**

**6. Bu hücreleri çıkarmak belirli bir biological population'ı sistematik olarak azaltıyor mu?**

Bundan sonra filtering kararı daha bilinçli hale gelir.

## Bu ne anlama geliyor?

Single-cell QC'nin amacı:

**“olabildiğince çok hücre silmek”**

değildir.

Aynı şekilde:

**“tutorial'da verilen cutoff'u uygulamak”**

da değildir.

Amaç:

analize giren barcode/cell profillerinin ne kadar güvenilir olduğunu anlamak ve downstream yorumu bozabilecek observation'ları kanıta dayanarak yönetmektir.

Bu nedenle QC:

**technical housekeeping**

değil,

**biyolojik yorumun güvenilirlik katmanlarından biridir.**
