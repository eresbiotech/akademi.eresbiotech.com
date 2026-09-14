+++
title = "UMAP'ta gördüğünüz her küme ayrı bir hücre tipi midir?"
slug = "umap-cluster-hucre-tipi-midir"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Single-cell RNA-seq UMAP'ındaki cluster'lar neden doğrudan hücre tipi değildir? Resolution, neighbor graph, marker expression ve annotation arasındaki farkı öğrenin."
seo_title = "UMAP'taki Her Cluster Bir Hücre Tipi midir?"
article_id = "W5-PROBLEM"
week = "5"
series = ["Reference Hub · Hafta 5"]
categories = ["tek-hücre-rna-seq"]
category_label = "Tek hücre RNA-seq"
answer_first = "Hayır. UMAP üzerinde yedi cluster görmeniz, verinizde kesin olarak yedi ayrı hücre tipi bulunduğu anlamına gelmez. Single-cell RNA-seq workflow'unda hücreler önce yüksek boyutlu expression özelliklerine göre temsil edilir; çoğu yaygın workflow'da bu temsil üzerinden bir nearest-neighbor graph oluşturulur ve Louvain veya Leiden gibi yöntemlerle graph topluluklara ayrılır. UMAP ise bu yüksek boyutlu yapının düşük boyutlu bir görselleştirmesidir. Scanpy ve Seurat dokümantasyonları da clustering ile UMAP'ı ayrı computational adımlar olarak tanımlar. Daha önemlisi, clustering sonucu kullanılan parametrelere bağlıdır. Seurat'ta resolution değeri yükseldiğinde daha fazla cluster elde edilebilir. Bu yüzden: **cluster = computational partition** iken, **cell type = biyolojik yorum** olarak düşünmek daha güvenlidir. Bir cluster'a “B hücresi”, “monosit” veya başka bir biyolojik etiket vermek için yalnız UMAP şekline değil, marker expression'a, tissue context'e ve başka biyolojik kanıtlara bakmak gerekir."
capability_bridge = "UMAP üretmek bugün birçok araçta birkaç adım sürebilir. Asıl çalışma becerisi: - graph ve clustering mantığını anlamak, - parametre kararlarının etkisini görmek, - markerları değerlendirmek, - cell-type annotation'ı biyolojik evidence ile kurmaktır. **Görseli üretmek başka, görselin neyi kanıtlamadığını bilmek başka bir beceridir.**"
sources = [
  "Seurat — 2026 Guided Clustering Tutorial; neighbor graph, clustering resolution, UMAP limitations ve marker-based annotation.",
  "Seurat — `FindClusters()` güncel dokümantasyonu ve resolution parametresi.",
  "Scanpy — Neighborhood graph ve UMAP embedding dokümantasyonu.",
  "McInnes, Healy & Melville — UMAP method paper.",
  "SingleR — Reference-based cell-type annotation yaklaşımı.",
  "Single-cell interpretation pitfalls review — UMAP distance/shape interpretation caution.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/tek-hucre-rna-seq-analizi-egitimi/"
product_cta = "Tek hücre RNA-seq çalışma yolunu inceleyin"
+++

## Bu yazıda neler var?

- UMAP ile clustering'in neden aynı şey olmadığını
- Cluster sayısının computational tercihlerden nasıl etkilenebildiğini
- UMAP üzerindeki uzaklığın neden doğrudan biyolojik mesafe sayılamayacağını
- Cell-type annotation için hangi kanıtların gerektiğini
- “7 cluster = 7 cell type” çıkarımının neden riskli olduğunu

## UMAP aslında neyi gösterir?

UMAP, yüksek boyutlu veriyi daha düşük boyutlu bir embedding içinde görselleştirmeye yarayan manifold-learning yaklaşımıdır.

Single-cell workflow'larında amaç, expression profilleri bakımından benzer hücrelerin yerel komşuluk ilişkilerini görsel olarak daha anlaşılır hale getirmektir. Scanpy de UMAP'ı önceden hesaplanan neighborhood graph'ın embedding'i olarak tanımlar.

Bu güçlü bir keşif aracıdır.

Fakat iki boyutlu bir grafik, binlerce gene ait yüksek boyutlu yapının tamamını eksiksiz temsil edemez.

Seurat'ın güncel PBMC eğitim materyali UMAP ve t-SNE'nin exploration için değerli olduğunu, ancak görselleştirme yöntemlerinin verinin tüm karmaşıklığını taşıyamadığını ve yalnız görsele dayanarak biyolojik sonuç çıkarılmaması gerektiğini açıkça vurgular.

Dolayısıyla UMAP'ta:

“Cluster 1 ile Cluster 2 birbirinden çok uzak, o halde biyolojik olarak da çok farklılar.”

şeklindeki doğrudan çıkarım güvenli değildir.

Yakın görünen cluster'ların da biyolojik olarak aynı cell type olduğu sonucuna otomatik olarak varılamaz.

## Cluster nereden geliyor?

Yaygın single-cell workflow'larında cluster doğrudan UMAP resmindeki boşluklara bakılarak oluşturulmaz.

Örneğin Seurat workflow'unda önce PCA temsili kullanılarak k-nearest-neighbor ve shared-nearest-neighbor graph oluşturulur. Ardından graph modularity optimization ile topluluklara ayrılır.

Scanpy'de de Leiden clustering önceden hesaplanmış neighborhood graph üzerinde çalışır.

Yani clustering sonucu:

**expression representation → seçilen boyutlar → neighbor graph → clustering algorithm → parameters**

zincirinin ürünüdür.

Bu ayrım önemlidir.

Çünkü computational kararların bazıları değiştiğinde cluster yapısı da değişebilir.

## Aynı veri neden farklı sayıda cluster verebilir?

Seurat'ın `FindClusters()` fonksiyonundaki `resolution` parametresi cluster granularity'sini değiştirir; daha yüksek değerler genel olarak daha fazla community/cluster oluşturur.

Dolayısıyla aynı expression dataset:

bir resolution değerinde 7,

başka bir değerde 10,

daha düşük bir değerde 5

cluster verebilir.

Bu:

**“Veride biyoloji değişti.”**

demek değildir.

Computational partition'ın çözünürlüğü değişmiştir.

Bu nedenle cluster sayısını “keşfedilmiş gerçek hücre tipi sayısı” olarak okumak doğru değildir.

## O halde cluster'ın biyolojik anlamı yok mu?

Var olabilir.

Asıl amaç zaten expression örüntüsü bakımından anlamlı hücre gruplarını keşfetmektir.

Ancak biyolojik kimlik, clustering algoritmasının çıktısında hazır gelmez.

Örneğin Seurat'ın PBMC tutorial'ında clustering bittikten sonra cluster'ların farklıially expressed markerları bulunur; ardından IL7R/CCR7, CD14/LYZ, MS4A1, GNLY/NKG7 gibi bilinen marker örüntüleri kullanılarak cluster'lara hücre tipi etiketleri atanır.

Yani workflow:

**cluster → marker evidence → biological knowledge → annotation**

şeklindedir.

**cluster → otomatik hücre tipi**

şeklinde değildir.

## Cell-type annotation yaparken neye bakılır?

Bir cluster'a biyolojik isim vermeden önce birden fazla evidence katmanını değerlendirmek daha güvenlidir.

### Marker expression

Beklenen pozitif markerlar gerçekten ifade ediliyor mu?

### Bir marker paneli

Tek bir gene değil, aynı biyolojik kimliği destekleyen birden fazla gene bakılabilir.

### Negatif evidence

Beklenmemesi gereken başka lineage markerları güçlü biçimde mevcut mu?

### Doku ve deney bağlamı

Örneğin PBMC için makul olan hücre repertuvarıyla solid tissue için beklenen hücreler aynı değildir.

### Referanslar

Gerektiğinde daha önce annotate edilmiş reference dataset'ler veya SingleR gibi reference-based yaklaşımlar kullanılabilir. SingleR, yeni hücreleri bilinen label'lara sahip referans expression profilleriyle karşılaştırarak annotation yapar.

Bunların hiçbiri tek başına her koşulda mutlak doğruluk sağlamaz.

Ama birlikte kullanıldıklarında “cluster 4 herhalde şu hücredir” şeklindeki görsel tahminden çok daha güçlü evidence oluştururlar.

## UMAP şekillerini biyolojik hikâyeye çevirmeden önce dikkat

UMAP'taki şekil de kolayca aşırı yorumlanabilir.

Bir cluster'ın uzun, yuvarlak veya iki parçalı görünmesi tek başına developmental trajectory, state transition veya başka bir biyolojik süreç kanıtı değildir.

Yakın tarihli bir scRNA-seq interpretation değerlendirmesi de UMAP eksenlerinin somut biyolojik anlam taşımadığını; clusterlar arasındaki apparent distance, shape ve trajectory görünümlerinin güvenilir biçimde doğrudan biyolojik anlama çevrilemeyeceğini vurgular.

UMAP:

**hipotez üretir.**

Ama hipotezin kendisi değildir.

## Bu ne anlama geliyor?

UMAP açıldığında şu sırayı kullanabilirsiniz:

**1. Bu renkler neyi gösteriyor?**\
Computational cluster mı, bilinen sample label mı, final cell-type annotation mı?

**2. Clustering hangi representation ve parameterlarla üretildi?**

**3. Cluster yapısı farklı resolution değerlerinde ne kadar stabil?**

**4. Cluster'a ait marker expression ne gösteriyor?**

**5. Birden fazla marker aynı biyolojik yorumu destekliyor mu?**

**6. Bu etiket tissue ve deney bağlamında mantıklı mı?**

Bu kontrollerden sonra cluster'a cell-type etiketi vermek çok daha savunulabilir hale gelir.
