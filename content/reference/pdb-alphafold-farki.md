+++
title = "PDB ve AlphaFold aynı soruya mı cevap verir?"
slug = "pdb-alphafold-farki"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "PDB yapısı ile AlphaFold tahmini aynı tür bilimsel kanıt değildir. Experimental structure, predicted structure, coverage ve eksik residue farklarını doğru okuyun."
seo_title = "PDB ve AlphaFold Arasındaki Fark Nedir?"
article_id = "W6-REFRAME"
week = "6"
series = ["Reference Hub · Hafta 6"]
categories = ["yapısal-biyoinformatik"]
category_label = "Yapısal biyoinformatik"
answer_first = "PDB ve AlphaFold ekranlarında ikisinde de üç boyutlu protein modeli görebilirsiniz. Ama bu modeller aynı yoldan elde edilmemiştir. RCSB PDB'nin resmi tanımına göre Protein Data Bank, **fiziksel bir örnek üzerinde gerçekleştirilen deneylerden toplanan veriler kullanılarak oluşturulan üç boyutlu macromolecular structure modellerini** arşivler. Başlıca yöntemler X-ray crystallography, NMR ve electron microscopy'dir. AlphaFold ise amino asit dizisinden üç boyutlu yapı tahmini üretir ve prediction confidence'ı pLDDT, PAE ve bağlama göre başka skorlarla ifade eder. Dolayısıyla: **PDB → experimental structural evidence'dan türetilen model** **AlphaFold → computational structural prediction** olarak düşünmek daha doğrudur. Ancak buradan: **“PDB her zaman tam ve hatasızdır, AlphaFold ise yalnız tahmindir ve değersizdir.”** sonucu da çıkmaz. İki kaynak farklı güçlü ve sınırlı taraflarıyla birbirini tamamlayabilir."
capability_bridge = "PDB ve AlphaFold adreslerini bilmek ilk adımdır. Asıl yapısal biyoinformatik becerisi: - coordinate provenance'ını anlamak, - coverage'ı görmek, - experimental observation ile prediction'ı ayırmak, - confidence/validation katmanlarını doğru okumak, - iki kaynağı aynı biyolojik soruya göre birleştirmektir. **Structure bulmak başka, structure evidence'ını değerlendirmek başka bir beceridir.**"
sources = [
  "RCSB PDB — PDB'nin experimentally determined macromolecular structures arşivi ve experimental methods.",
  "wwPDB — Unobserved/missing residue kayıtları ve processing standardı.",
  "RCSB PDB — Asymmetric unit ve biological assembly ayrımı.",
  "AlphaFold DB — Prediction confidence, PAE ve limitations.",
  "Jumper et al., Nature 2021 — AlphaFold method validation.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/uygulamali_yapisal_biyoinformatik_ve_in_silico_protein_modelleme/"
product_cta = "Yapısal biyoinformatik çalışma yolunu inceleyin"
+++

## PDB kaydı neyi temsil eder?

PDB'deki bir structure, fiziksel macromolecular sample'dan elde edilen deneysel veriler kullanılarak modellenir.

RCSB PDB'ye göre en yaygın yapı belirleme yöntemleri:

- X-ray crystallography,
- NMR,
- 3D electron microscopy

olmakla birlikte başka deneysel yöntemlerden gelen yapılar da PDB'de arşivlenebilir.

Bu, PDB structure'ın önemli bir özelliğidir:

Koordinatlar yalnız sequence'ten hesaplanan prediction değildir.

Deneysel gözlemlerle ilişkilidir.

Ancak deneysel yapı da her zaman proteinin bütün biyolojik gerçeğini eksiksiz göstermeyebilir.

## PDB yapısı neden full-length olmayabilir?

Bir experimental structure belirlemek için araştırmacılar kimi zaman bütün proteini değil belirli bir construct veya domain'i çalışabilir.

Ayrıca deneyde mevcut olmasına rağmen bazı bölgeler yeterince gözlenemeyebilir.

wwPDB veri standardı, experimental coordinate setinde **gözlenmemiş residue'ları** ayrıca kayıt altında tutar. Missing residue'lar örneğin esnek loop veya terminal bölgelerde bulunabilir.

Bu yüzden bir PDB görüntüsünde sequence'in bir bölgesini görmemeniz:

**“Protein biyolojik olarak bu residue'lara sahip değil.”**

anlamına gelmez.

Bölge:

- construct'ta bulunmamış,
- deneyde çözülememiş,
- yeterli density/signal vermemiş,
- flexible olmuş

olabilir.

**Missing coordinate ≠ nonexistent biology.**

## AlphaFold neden daha uzun görünebilir?

AlphaFold tahmini verilen amino asit sequence için koordinatlar üretebilir.

AFDB dosyalarında düşük-confidence bölgeler dahil tahmin edilen sequence boyunca koordinatlar bulunur; bunların yorumlanması kullanıcıya bırakılır.

Bu nedenle aynı protein için:

PDB'de yalnız 180 residue'lık bir domain,

AlphaFold'da ise 500 residue'lık full-length model

görebilirsiniz.

Bu:

**“AlphaFold PDB'nin eksik bıraktığı yapıyı deneysel olarak tamamladı.”**

anlamına gelmez.

Doğru ifade:

**“AlphaFold deneysel coordinate coverage dışında kalan sequence için de prediction sağlıyor; bu bölgelerin confidence ve biological context'i ayrıca değerlendirilmelidir.”**

olmalıdır.

## PDB'de de kalite sorusu sormalısınız

Experimental evidence güçlüdür.

Ama “PDB'de var” ifadesi tek başına bütün kalite değerlendirmesinin yerine geçmez.

Structure'ı yorumlarken bağlama göre:

- experimental method,
- resolution veya yöntem-spesifik kalite metrikleri,
- validation report,
- missing residues,
- ligandlar,
- construct,
- biological assembly

gibi bilgileri incelemek gerekebilir.

Özellikle crystallography'de PDB coordinate file'daki **asymmetric unit**, her zaman biyolojik olarak işlevsel assembly ile aynı değildir. RCSB PDB bu ayrımı açık biçimde vurgular.

Dolayısıyla:

**experimental ≠ context-free absolute truth**

demek de önemlidir.

Experimental model de hangi sample, construct, conformation ve assembly üzerinden elde edildiğiyle birlikte okunur.

## AlphaFold size ne kazandırabilir?

AlphaFold özellikle experimental coverage bulunmadığında veya yalnız belirli domainlerin yapıları mevcut olduğunda çok değerli structural hypotheses sağlayabilir.

Yüksek-confidence bölgeler:

- domain geometry,
- olası residue environment,
- structure similarity,
- bazı binding-site analizleri

için güçlü başlangıç noktaları olabilir.

AlphaFold'un CASP14 başarısı yüksek-confidence predictions'ın birçok durumda çok yüksek doğruluk taşıyabileceğini göstermiştir.

Ancak AlphaFold'un kendi FAQ'sı prediction'ın sınırlamalarını da açıkça belirtir:

- birden fazla biological conformation içinden çoğu zaman yalnız birini üretir,
- mutation effects için doğrulanmış bir yöntem değildir,
- standart prediction'da ligands, metals, cofactors, DNA/RNA veya PTM'lerin pozisyonlarını vermez.

Bu nedenle model değerli olabilir.

Ama **deneysel evidence'ın epistemik rolünü otomatik olarak üstlenmez.**

## PDB ve AlphaFold birlikte nasıl kullanılabilir?

En yararlı yaklaşım çoğu zaman:

**“Hangisi daha iyi?”**

sorusunu bırakıp:

**“Her biri bu protein hakkında hangi evidence'ı sağlıyor?”**

diye sormaktır.

Örneğin:

### PDB

Belirli bir domainin ligand bağlı experimental structure'ını gösterebilir.

### AlphaFold

Aynı proteinin experimental olarak çözülmemiş diğer domainleri hakkında prediction sunabilir.

### Birlikte

Şu soruları sormanıza yardım edebilir:

Experimental coverage nerede?

Prediction confidence nerede yüksek?

PDB'de ligand/partner hangi residue'larla ilişkili?

AlphaFold'daki diğer domainlerin göreli yerleşimi confident mı?

Experimental ve predicted bölgeler yapısal olarak uyumlu mu?

## Bu ne anlama geliyor?

Bir protein için hem PDB hem AlphaFold sonucu bulduğunuzda:

**1. PDB'de hangi sequence bölgesi gerçekten modellenmiş?**

**2. Experimental method ne?**

**3. Unobserved/missing residue var mı?**

**4. Structure hangi biological assembly veya construct'ı temsil ediyor?**

**5. AlphaFold'da aynı bölgenin pLDDT'si nasıl?**

**6. Full-length modelde domainlerin göreli konumu PAE tarafından destekleniyor mu?**

**7. Sorunuz ligand, partner veya farklı conformation gerektiriyor mu?**

Bu yaklaşım iki kaynağı rakip olmaktan çıkarır.

**Farklı evidence katmanlarına dönüştürür.**
