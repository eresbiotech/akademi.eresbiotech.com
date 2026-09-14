+++
title = "Gene ID, transcript ID ve protein ID aynı şey değildir"
slug = "gene-transcript-protein-id-farki"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Gene ID, transcript ID ve protein ID aynı şeyi temsil etmez. ENSG, ENST, RefSeq ve protein accession'larını biyolojik seviyelerine göre nasıl okuyacağınızı öğrenin."
seo_title = "Gene ID, Transcript ID ve Protein ID Arasındaki Fark Nedir?"
article_id = "W2-REFRAME"
week = "2"
series = ["Reference Hub · Hafta 2"]
categories = ["ncbi-ensembl-ucsc-identifierlar"]
category_label = "NCBI, Ensembl, UCSC ve identifier'lar"
tags = ["ncbi", "ensembl", "ucsc", "identifier"]
primary_keyword = "gene ID transcript ID protein ID"
secondary_keywords = "gene ID nedir, transcript ID nedir, protein ID nedir, Ensembl ID, RefSeq accession, ENSG ENST farkı"
search_intent = "Gene ID, transcript ID ve protein ID arasındaki farkı öğrenmek."
review_status = "QA_READY_PENDING_HUMAN_APPROVAL"
product_path = "/post/ncbi-ensembl-ucsc-genom-tarayicisi-uygulamali-egitim/"
product_cta = "Genom kayıtlarını doğru okumayı öğren"
answer_first = "Bir gene ait identifier ile o genin transcript identifier'ı veya protein identifier'ı aynı biyolojik nesneyi temsil etmez. En basit zihinsel model, gene → bir veya daha fazla transcript → coding transcriptlerden bir veya daha fazla protein ürünü şeklindedir. Bir gene birden fazla transcript bağlanabilir; bazıları farklı protein isoformları oluşturabilir, bazıları ise protein kodlamaz. Bu nedenle bir analiz gene-level identifier beklerken ona transcript ID vermek, analizin çalıştığı biyolojik varlığı değiştirebilir."
capability_bridge = "Identifier prefix'lerini ezberlemek yararlı olabilir. Ama asıl beceri: - hangi biyolojik seviyede çalıştığınızı bilmek, - birden çoğa ilişkileri görmek, - version bilgisini korumak, - gene–transcript–protein arasında bilinçli geçiş yapabilmektir. Bu yüzden doğru ID'yi bulmak yalnız veri temizliği değildir. Biyolojik temsil seviyesini doğru seçmektir."
related_references = ["/reference/ncbi-ensembl-ucsc-ayni-gen-neden-farkli/", "/reference/hangi-transcript-kullanilmali-canonical-transcript/"]
sources = ["NCBI — Gene data model and stable GeneID structure.", "NCBI — RefSeq accession classes and curated/model records.", "Ensembl — Stable ID formats and versioning rules.", "Ensembl — Gene/transcript annotation model.", "UCSC Genome Browser — Gene/transcript accession FAQ and BRCA1 example."]
sitemap = { priority = 0.6, changefreq = "monthly" }
+++

{{< reference-visual id="W2-REFRAME-1" >}}

## Gene ID neyi temsil eder?

Gene-level identifier, database'in belirli bir gene/locus'a atadığı kimliktir.

NCBI Gene, kayıtları stable numeric **GeneID** ile organize eder. Örneğin insan BRCA1 geni için Gene ID `672` kullanılır.

Ensembl'de insan gene stable identifier'ları `ENSG...` biçimindedir.

Örneğin BRCA1 için:

`ENSG00000012048`

gene-level identifier'dır. UCSC'nin güncel gene-track dokümantasyonu da aynı BRCA1 örneğini Ensembl/GENCODE gene accession mantığını açıklamak için kullanır.

Bu seviyedeki identifier genellikle şu soruya cevap verir:

**“Hangi gene ait kayıttan söz ediyoruz?”**

Ama henüz:

**“Hangi transcript?”**

sorusunu cevaplamaz.

## Transcript ID neyi temsil eder?

Transcript identifier belirli bir RNA transcript modelini veya sequence kaydını tanımlar.

Ensembl transcript stable ID'leri insan için `ENST...` ile başlar.

NCBI RefSeq tarafında curated protein-coding RNA kayıtlarında sıklıkla `NM_...`, non-coding RNA kayıtlarında `NR_...`; computationally predicted modellerde ise `XM_...` veya `XR_...` accession'larıyla karşılaşırsınız.

Transcript seviyesi gene göre daha spesifiktir.

Çünkü aynı gene bağlı transcriptler:

- farklı transcription start veya end noktalarına,
- farklı exon kombinasyonlarına,
- farklı splice junction'lara,
- farklı UTR'lara,
- farklı coding sequence'lere

sahip olabilir.

Ensembl annotation modeli aynı gene bağlı transcriptlerin splice olayları, exon yapıları ve başlangıç/bitiş noktaları bakımından farklılaşabildiğini açık biçimde belirtir.

Bu nedenle:

**Gene ID = transcript ID**

değildir.

## Protein ID neyi temsil eder?

Protein identifier ise protein ürünü seviyesidir.

Ensembl protein stable ID'leri `ENSP...` sınıfındadır.

NCBI RefSeq curated protein accession'larında ise `NP_...`; predicted protein modellerinde `XP_...` prefix'leri görülebilir.

Burada önemli bir nokta vardır:

Her transcript protein oluşturmaz.

Örneğin non-coding RNA transcriptleri protein ürünü vermeyebilir.

Aynı şekilde farklı transcriptlerin coding sequence'leri aynıysa transcript yapıları farklı olsa bile aynı veya eşdeğer protein ürünlerine ulaşılabilir.

Bu nedenle gerçekte zihinsel model:

**gene → transcript → protein**

şemasından biraz daha zengindir.



{{< reference-visual id="W2-REFRAME-2" >}}

## Aynı gene ait gerçek bir zincir

UCSC'nin güncel gene FAQ'sı BRCA1'i bu ilişkiyi açıklamak için örnek olarak kullanır.

BRCA1:

**NCBI Gene ID:** `672`

düzeyinde bir gene kaydıdır.

Bu gene bağlı RefSeq transcriptlerden biri:

`NM_007294.3`

ve bu transcriptin protein ürünü:

`NP_009225.1`

olarak gösterilir.

Buradaki üç ifade aynı şey değildir:

`672` → gene\
`NM_007294.3` → transcript\
`NP_009225.1` → protein

Hepsi BRCA1 biyolojisiyle ilişkilidir, fakat farklı veri nesneleridir.

Bu ayrım analiz sırasında kritik hale gelir.

## ID dönüşümü neden yalnız “format conversion” değildir?

Diyelim ki elinizde 500 adet Ensembl gene ID var.

Bir tool transcript identifier bekliyor.

Her gene için yalnızca bir transcript olmadığından:

**500 gene → 500 transcript**

şeklinde zorunlu bir dönüşüm yoktur.

Bir gene birden fazla transcript eşleşebilir.

Benzer şekilde bir transcript–protein eşleşmesi de kullandığınız annotation ve transcript tipine bağlı olabilir.

Bu nedenle ID conversion sırasında şu soruyu sormalısınız:

**“Birden çoğa eşleşmelerle ne yapacağım?”**

Bunu görmezden gelirseniz:

- bazı kayıtları kaybedebilir,
- bir gene rastgele transcript atayabilir,
- enrichment girdisini değiştirebilir,
- sequence retrieval sırasında yanlış isoform alabilir,
- variant annotation sonucunu farklı transcript üzerinden okuyabilirsiniz.

ID mapping bu nedenle biyolojik karar içerir.

## Version suffix neden önemli olabilir?

Identifier'ın sonundaki `.1`, `.2`, `.3` gibi bölüm dekorasyon değildir.

Ensembl'in güncel stable-ID dokümantasyonunda version artışlarının feature türüne göre anlamı tanımlanmıştır.

Örneğin transcript version'ı:

- splice pattern,
- chromosome location,
- cDNA sequence

değiştiğinde artabilir.

Protein version'ı peptide sequence değiştiğinde artar. Gene version'ı ise gene bağlı transcript setinde değişiklik olduğunda artırılabilir.

RefSeq transcript accession'larında da version suffix sequence kaydının versiyonunu ayırır; UCSC özellikle yayınlarda accession'ın version'ıyla birlikte belirtilmesini önerir çünkü farklı transcript versiyonlarının sequence ve dolayısıyla koordinatları değişebilir.

Bu nedenle:

`NM_007294`

ve

`NM_007294.3`

her bağlamda aynı hassasiyette bir referans değildir.

## Species bilgisini de kaybetmeyin

Gene symbol'ları tek başına güvenli identifier değildir.

Aynı veya benzer symbol farklı organizmalarda bulunabilir; symbol'lar zaman içinde de değişebilir.

NCBI bu nedenle GeneID kullanımını stable gene identifier olarak önerir. Ensembl stable-ID yapısı da species/feature tipini identifier sistemine dahil eder.

Dolayısıyla bir mapping tablosunda yalnız:

`BRCA1`

yazması yerine mümkünse şu bağlamı koruyun:

- species,
- source database,
- identifier type,
- version gerekiyorsa version.

## Bu ne anlama geliyor?

Bir ID ile karşılaştığınızda üç kontrol yapın.

**1. Namespace:**\
Bu ID hangi sistemden geliyor?

**2. Biological level:**\
Gene mi, transcript mi, protein mi?

**3. Context:**\
Hangi species, assembly ve annotation/version bağlamında?

Bundan sonra conversion yapın.

Tersi sırada ilerlemek:

**“ID'yi önce çevireyim, sonra ne olduğunu anlarım.”**

yaklaşımı özellikle birden çoğa eşleşmelerde sorun yaratabilir.



{{< reference-visual id="W2-REFRAME-3" >}}
