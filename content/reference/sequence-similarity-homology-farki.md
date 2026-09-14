+++
title = "Dizi benzerliği ile evrimsel yakınlık aynı şey midir?"
slug = "sequence-similarity-homology-farki"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "%90 sequence identity gördüğünüzde ne söyleyebilirsiniz? Similarity, identity, homology ve evolutionary relationship kavramlarını birbirinden ayırın."
seo_title = "Sequence Similarity ve Homology Aynı Şey mi?"
article_id = "W7-REFRAME"
week = "7"
series = ["Reference Hub · Hafta 7"]
categories = ["filogenetik"]
category_label = "Filogenetik"
answer_first = "Hayır. İki proteinin `%90 identity` göstermesi güçlü bir sequence benzerliği sinyali olabilir, fakat **identity değeri ile evolutionary relationship aynı veri türü değildir.** Sequence identity veya similarity: **gözlenen dizilerin ne kadar benzediğini** ölçer. Homology ise: **iki biyolojik nesnenin ortak evolutionary ancestry’den türediği yönündeki çıkarımdır.** Bu nedenle klasik kullanımda: **“%90 homolog”** demek doğru değildir. İki sequence homolog olabilir veya olmayabilir; “homology yüzdesi” yerine percent identity veya similarity raporlanır. Üstelik yüksek similarity tek başına: - aynı fonksiyon, - aynı evolutionary rate, - aynı gene history, - orthology kanıtı değildir. Similarity önemli bir **evidence katmanıdır**. Phylogenetic conclusion ise daha fazla bağlam gerektirir."
capability_bridge = "BLAST sonucunda ilk hit’i görmek kolaydır. Asıl çalışma becerisi: - similarity metric’lerini ayırmak, - alignment coverage’ı kontrol etmek, - homology kavramını doğru kullanmak, - similarity’den evolutionary inference’a ne zaman ve hangi kanıtlarla geçilebileceğini bilmektir. **Benzerliği görmek başka, benzerliğin evolutionary anlamını kurmak başka bir beceridir.**"
sources = [
  "Pearson — *An Introduction to Sequence Similarity (“Homology”) Searching*.",
  "NCBI Bookshelf — Homology, conservation ve evolutionary interpretation.",
  "BLAST terminology review — “percent homology” ve similarity kavramlarının ayrımı.",
  "Sequence-comparison benchmarking — percent identity cutoff’larının sınırları.",
  "Substitution-model review — observed sequence difference ile evolutionary distance ayrımı.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/phyml-uygulamali-filogenetik-egitimi/"
product_cta = "Filogenetik çalışma yolunu inceleyin"
+++

## Bu yazıda neler var?

- Identity ve similarity’nin neyi ölçtüğü
- Homology’nin neden yüzdelik olmadığı
- Neden percent identity doğrudan evolutionary distance değildir
- Sequence similarity’nin fonksiyon için ne sağlayıp ne sağlamadığı
- “En benzer sequence = ortholog” çıkarımının neden riskli olduğu

## Önce identity ile similarity’yi ayırın

Bir pairwise alignment düşünelim.

İki amino-acid sequence’in aynı pozisyonlarında birebir aynı residue bulunuyorsa bunlar **identical positions** olarak sayılabilir.

Protein alignments’da chemically benzer substitution’lar ise scoring matrix’e bağlı olarak **similar/conservative substitutions** olarak değerlendirilebilir.

Bu yüzden:

**percent identity**

ile:

**similarity score**

aynı metrik değildir.

BLAST gibi araçların:

- bit score,
- E-value,
- alignment length,
- percent identity

gibi birden fazla değer vermesi de bu yüzden önemlidir.

Sequence-comparison literatürü yalnız percent identity’nin similarity/homology inference için yeterli bir özet olmadığını özellikle vurgular.

## Homology ne demektir?

Homology ortak köken kavramıdır.

İki sequence homolog olarak tanımlandığında temel iddia:

**ortak bir ancestral sequence’den türedikleri**

yönündedir.

NCBI’nin evolutionary genomics kaynakları da homology’yi ortak ancestry’ye dayalı nitel bir ilişki olarak tanımlar ve “percent homology” ifadesinin kavramsal olarak hatalı olduğunu vurgular.

Dolayısıyla:

“Protein A, Protein B ile %85 homolog.”

yerine:

“Protein A ile B %85 sequence identity gösteriyor; veriler bunların homolog olduğu çıkarımını destekliyor.”

gibi bir ifade epistemik olarak daha açıktır.

## Similarity homology ile tamamen ilgisiz mi?

Hayır.

Tam tersine, istatistiksel olarak anlamlı sequence similarity ortak ancestry için çok güçlü evidence sağlayabilir.

Sequence-search yöntemlerinin temel mantığı budur.

Pearson’ın sequence-similarity rehberi, beklenenden fazla sequence similarity görüldüğünde ortak ancestry’nin güçlü açıklama olduğunu ve anlamlı similarity’den homology inference yapılabileceğini anlatır.

Ama burada iki önemli nüans vardır.

### Birincisi: Düşük identity homology’yi dışlamaz

Uzun evolutionary divergence sonrası homolog sequences çok düşük pairwise identity gösterebilir.

Yani:

**“%30 altında → homolog değil”**

gibi evrensel bir cutoff güvenli değildir.

### İkincisi: Percent identity tek başına significance değildir

Kısa bir alignment’da yüksek identity şans eseri daha kolay oluşabilir.

Alignment length ve database-search statistics önemlidir.

Bu nedenle BLAST search sonuçlarında yalnız `% identity` kolonuna bakmak doğru değildir.

## %90 identity = çok yakın evolutionary distance mı?

Çoğu bağlamda çok yüksek identity yakın evolutionary similarity için güçlü bir sinyal olabilir.

Ama percent identity ile evolutionary distance arasında basit doğrusal ilişki yoktur.

Bir site evolutionary history boyunca birden fazla kez substitution yaşayabilir.

Gözlediğiniz final sequence differences bu “hidden substitutions”ın tamamını göstermeyebilir.

Substitution modellerinin kullanılmasının nedenlerinden biri tam olarak budur.

Bu yüzden:

**percent difference ≠ exact evolutionary distance**

olmalıdır.

Model-based phylogenetic methods gözlenen differences üzerinden evolutionary-change miktarını modellemeye çalışır.

## Sequence similarity aynı fonksiyonu kanıtlar mı?

Hayır.

Homolog proteins çoğu zaman structural veya functional özellikleri paylaşabilir ve bu nedenle similarity functional annotation için son derece değerlidir.

Ancak gene duplication, domain rearrangement, subfunctionalization veya neofunctionalization gibi süreçler nedeniyle homolog proteins farklı functional roles geliştirebilir.

NCBI'nin evolutionary genomics kaynakları homology’nin functional information transferine güçlü temel sağlayabildiğini, fakat bunun doğru evolutionary context içinde değerlendirilmesi gerektiğini açıklar.

Bu yüzden:

**high similarity → functional hypothesis**

üretebilir.

Ama:

**high similarity → guaranteed identical function**

değildir.

## Ortholog “en çok benzeyen sequence” midir?

Bu da sık yapılan bir kısa yoldur.

Ortholog/paralog terimleri sequence similarity derecesinden çok **gene-duplication ve speciation history** ile tanımlanır.

İki farklı türde birbirine en çok benzeyen gene’ler sıklıkla ortholog olabilir.

Ama bu tanım değildir.

Gene duplication sonrası evolutionary rates farklılaşabilir ve “best hit” her zaman doğru evolutionary relationship’i temsil etmeyebilir.

Bu Week 7 için önemli olan ayrım şudur:

**similarity ranking ile phylogenetic history aynı şey değildir.**

Orthology/paralogy’yi güvenilir biçimde değerlendirmek gerektiğinde broader taxon sampling ve gene-tree context gerekebilir.

## Domain context neden önemli?

İki protein uzun bir shared domain nedeniyle yüksek local similarity gösterebilir.

Fakat proteinlerin:

- toplam uzunluğu,
- domain architecture’ı,
- ek regions’ları

farklı olabilir.

Bu durumda:

“Bu iki protein %70 benzer.”

cümlesinin ne anlama geldiği alignment coverage bilinmeden eksik kalır.

Benzerlik bütün proteini mi kapsıyor?

Yoksa yalnız 80 amino-acidlik bir domain’i mi?

Bu nedenle sequence similarity yorumunda:

**identity + alignment length + coverage + statistical significance + biological context**

birlikte görülmelidir.

## Bu ne anlama geliyor?

Bir similarity-search sonucu gördüğünüzde şu sırayı kullanın:

**1. Alignment ne kadar uzun?**

**2. Coverage ne kadar?**

**3. Percent identity/similarity ne?**

**4. Statistical significance nasıl?**

**5. Domain architecture benzer mi?**

**6. Common ancestry inference makul mü?**

**7. Daha spesifik evolutionary relation için phylogenetic analysis gerekiyor mu?**

Bu sıra:

**“%90 gördüm → yakın akraba → aynı fonksiyon.”**

şeklindeki tek sıçramayı parçalar.
