+++
title = "Marker gene ile hücre tipine özgü gen aynı şey midir?"
slug = "marker-gene-hucre-tipine-ozgu-gen"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Single-cell RNA-seq marker genleri neden yalnızca tek bir hücre tipinde bulunan genler değildir? Differential expression, specificity ve marker paneli farkını öğrenin."
seo_title = "Marker Gene Nedir? Hücre Tipine Özgü Gen ile Aynı Şey mi?"
article_id = "W5-REFRAME"
week = "5"
series = ["Reference Hub · Hafta 5"]
categories = ["tek-hücre-rna-seq"]
category_label = "Tek hücre RNA-seq"
answer_first = "Hayır. Bir genin “marker” olarak çıkması, o genin yalnızca tek bir hücre tipinde bulunduğunu göstermez. Single-cell RNA-seq analizinde marker genler çoğu zaman **bir grup hücreyi başka hücre gruplarından ayıran differential expression sinyalleri** olarak hesaplanır. Örneğin Seurat'ın `FindAllMarkers()` fonksiyonu her identity class için diğer gruplara göre differentially expressed genleri bulur. Sonuçta verilen liste, kullanılan karşılaştırma içindeki **putative markers** listesidir. Bu nedenle bir marker: Cluster A'da güçlü, Cluster B'de daha düşük, Cluster C'de orta düzeyde ifade edilebilir. Yine de Cluster A'yı diğerlerinden ayırmaya yardımcı olan iyi bir marker olabilir. Bu yüzden: **marker ≠ yalnız o hücrede bulunan gen** ve: **tek marker ≠ kesin hücre kimliği** ayrımlarını korumak gerekir."
capability_bridge = "Marker listesini üretmek kolaylaşmıştır. Asıl beceri: - comparison'ı anlamak, - marker expression pattern'ını okumak, - tek gene aşırı anlam yüklememek, - marker panelini tissue biology ile birleştirmek, - gerektiğinde referans annotation ile çapraz kontrol etmektir. **Marker bulmak başka, hücre kimliğini bilimsel kanıtla kurmak başka bir beceridir.**"
sources = [
  "Seurat — `FindAllMarkers()`: identity sınıfları için differential marker tespiti.",
  "Seurat — PBMC marker detection ve biological cluster annotation örneği.",
  "Seurat — DotPlot'ta expression prevalence ve average expression ayrımı.",
  "SingleR — Reference-based annotation ve marker kullanım modeli.",
  "Current best-practice review — Markerların dataset composition'a ve comparison'a bağlı olması.",
  "Cell-type annotation methods review — Single marker ve gene-signature yaklaşımları.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/tek-hucre-rna-seq-analizi-egitimi/"
product_cta = "Tek hücre RNA-seq çalışma yolunu inceleyin"
+++

## Bu yazıda neler var?

- Marker genin gerçekte ne anlama geldiğini
- Neden differential expression ile absolute specificity'nin aynı olmadığını
- Tek marker kullanımının sınırlarını
- Marker panelinin neden daha güçlü olduğunu
- Marker listesini cell-type annotation'a nasıl bağlayabileceğinizi

## Marker listesi nasıl oluşur?

Single-cell workflow'da cluster'lar belirlendikten sonra sık yapılan adımlardan biri:

**“Bu cluster'ı diğerlerinden ayıran genler hangileri?”**

sorusunu sormaktır.

Seurat güncel tutorial'ında cluster markerları differential expression yoluyla hesaplanır. Örneğin bir cluster tüm diğer hücrelerle veya seçilmiş başka clusterlarla karşılaştırılabilir.

Bu ayrıntı çok önemlidir.

Çünkü marker listesi:

**yalnız cluster'ın özelliğine değil, neyle karşılaştırıldığına da bağlıdır.**

Cluster A'yı B ile karşılaştırırken bulunan markerlar,

A'yı tüm diğer clusterlarla karşılaştırırken bulunan listeyle aynı olmak zorunda değildir.

Bu nedenle marker:

“Bu hücre tipinin değişmez kimlik kartı”

değil,

çoğu zaman:

**“Bu comparison içinde bu grubu ayırt etmeye yarayan expression özelliği”**

olarak düşünülmelidir.

## Marker olmak için başka hücrelerde sıfır olması gerekir mi?

Hayır.

Basit bir örnek düşünelim:

| Cluster | Gene X ifade eden hücre oranı | Ortalama expression |
|---|---:|---:|
| A | %90 | Yüksek |
| B | %45 | Düşük |
| C | %10 | Çok düşük |

Gene X, Cluster A için son derece yararlı bir positive marker olabilir.

Ama yalnız Cluster A'da ifade edilmiyor.

Seurat DotPlot yaklaşımında da tam olarak iki farklı bilgi gösterilir:

- noktanın büyüklüğü → o grupta geni ifade eden hücre yüzdesi,
- renk → ortalama expression seviyesi.

Bu iki boyutun ayrı gösterilmesinin nedeni budur.

Bir marker'ın:

**ne kadar güçlü ifade edildiği**

ve:

**gruptaki hücrelerin ne kadarında görüldüğü**

aynı soru değildir.

## Canonical marker neden yine de yararlı?

Bazı hücre tipleri için literatürde uzun süredir kullanılan markerlar vardır.

Bu bilgi çok değerlidir.

Seurat'ın PBMC tutorial'ında örneğin MS4A1 B hücreleri, GNLY/NKG7 NK hücreleri veya CD14/LYZ monositler için annotation'ı destekleyen markerlar arasında kullanılır.

Fakat “canonical” sözcüğü:

**tek başına her tissue ve her deneyde yeterli**

anlamına gelmez.

Expression:

- hücre state'ine,
- activation'a,
- tissue'ya,
- hastalık bağlamına,
- teknik capture özelliklerine

göre değişebilir.

Ayrıca yakın lineage'lar aynı markerların bir bölümünü paylaşabilir.

Bu nedenle canonical marker yararlı bir prior knowledge katmanıdır.

**Mutlak cell identity testi değildir.**

## Neden tek marker yerine panel daha güçlüdür?

Bir hücre kimliği çoğunlukla tek gene indirgenemeyecek kadar karmaşıktır.

Daha güvenli annotation için:

**birden fazla pozitif marker**

ile birlikte gerekirse:

**beklenmeyen lineage markerlarının yokluğu/düşüklüğü**

de değerlendirilebilir.

Örneğin bir cluster'ın yalnız “Gene X yüksek” olması yerine:

- Marker A yüksek,
- Marker B yüksek,
- Marker C yüksek,
- başka lineage'a ait Marker D düşük

şeklindeki pattern daha güçlü evidence sunabilir.

SingleR gibi reference-based annotation sistemlerinin de tek bir marker yerine expression profilleri ve birden çok ayırt edici gen üzerinden similarity kullanması bu mantıkla uyumludur.

## Marker listesi neden dataset composition'a bağlıdır?

Bu kritik fakat kolay unutulan bir noktadır.

Marker detection, mevcut grupların birbirleriyle karşılaştırılmasına dayanır.

Bir dataset yalnız çok yakın hücre alt tiplerini içeriyorsa farklı markerlar öne çıkabilir.

Başka bir dataset çok farklı lineage'ları içeriyorsa ayırıcı gen listesi değişebilir.

Best-practice literatürü de marker genlerin yalnız hedef cluster'a değil, dataset'teki diğer grupların kompozisyonuna bağlı olduğunu vurgular.

Dolayısıyla:

**“Bu gen geçen makalede marker değildi.”**

ifadesi tek başına çelişki değildir.

Karşılaştırma bağlamı farklı olabilir.

## “Marker çıktı” neyi kanıtlar?

Şu cümle daha güvenlidir:

**“Bu gen, kullanılan differential-expression karşılaştırmasında Cluster A'yı karşılaştırılan gruplardan ayırmaya yardımcı olan expression sinyallerinden biridir.”**

Şu cümle ise genellikle fazla güçlüdür:

**“Bu gen yalnız bu hücre tipinde bulunur; dolayısıyla bu cluster kesinlikle bu hücre tipidir.”**

Aradaki fark single-cell annotation'ın önemli bir bölümünü oluşturur.

## Marker expression ile annotation arasındaki boşluk

Marker listesi aldığınızda henüz final cell-type annotation'a otomatik olarak ulaşmış olmazsınız.

Şunları birlikte düşünün:

### Comparison

Marker hangi grupların karşılaştırılmasından çıktı?

### Expression prevalence

Gen cluster'daki kaç hücrede ifade ediliyor?

### Magnitude

Expression veya differential signal ne kadar güçlü?

### Biological knowledge

Gene'in bilinen işlevi ve lineage ilişkisi ne?

### Marker panel

Aynı cell identity'yi destekleyen başka genler var mı?

### Tissue context

Bu cell type bu doku veya örnekte beklenebilir mi?

### Reference evidence

Gerekirse reference-based annotation aynı yorumu destekliyor mu?

## Bu ne anlama geliyor?

Marker listesinde ilk sıradaki geni görüp cluster'a isim vermek yerine şu soruyu sorun:

**“Bu gen neyin markerı?”**

Ardından:

**“Hangi comparison içinde?”**

**“Başka hücrelerde ne kadar ifade ediliyor?”**

**“Başka hangi markerlar aynı kimliği destekliyor?”**

**“Tissue context ile uyumlu mu?”**

Bu dört soru marker listesini basit bir ranked table'dan biyolojik annotation evidence'ına dönüştürür.
