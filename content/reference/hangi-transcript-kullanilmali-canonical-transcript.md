+++
title = "Bir genin transcriptlerini incelerken hangi kayda güvenmelisiniz?"
slug = "hangi-transcript-kullanilmali-canonical-transcript"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Bir gen için çok sayıda transcript gördüğünüzde hangisini kullanmalısınız? Canonical, MANE Select, RefSeq Select ve en uzun transcript arasındaki farkları öğrenin."
seo_title = "Hangi Transcript Kullanılmalı? Canonical Transcript Nasıl Seçilir?"
article_id = "W2-WORKFLOW"
week = "2"
series = ["Reference Hub · Hafta 2"]
categories = ["ncbi-ensembl-ucsc-identifierlar"]
category_label = "NCBI, Ensembl, UCSC ve identifier'lar"
tags = ["ncbi", "ensembl", "ucsc", "identifier"]
primary_keyword = "hangi transcript kullanılmalı"
secondary_keywords = "canonical transcript nedir, Ensembl transcript, MANE Select, RefSeq Select, transcript isoform, alternative splicing"
search_intent = "Bir gene ait çok sayıda transcript arasından hangisinin kullanılacağını ve canonical transcript kavramının ne anlama geldiğini öğrenmek."
review_status = "QA_READY_PENDING_HUMAN_APPROVAL"
product_path = "/post/ncbi-ensembl-ucsc-genom-tarayicisi-uygulamali-egitim/"
product_cta = "Genom kayıtlarını doğru okumayı öğren"
answer_first = "Bir gene ait sekiz transcript görüyorsanız, bunun anlamı “database hangisinin doğru olduğuna karar verememiş” değildir. Aynı gen farklı transcription başlangıçları, exon kombinasyonları, splice olayları veya UTR yapıları nedeniyle birden fazla transcriptle temsil edilebilir. Bu transcriptlerin biyolojik desteği ve işlevsel önemi de aynı olmak zorunda değildir. Bu nedenle transcript seçerken: “En uzun olan hangisi?” tek başına yeterli bir soru değildir. Ensembl Canonical, RefSeq Select veya insan protein-coding genlerinde MANE Select gibi temsilci-transcript sistemleri, tek transcript gerektiğinde güçlü bir başlangıç noktası sağlayabilir. Ancak Ensembl'in kendi dokümantasyonu bile doğru analiz için bir locus'ta birden fazla transcriptin değerlendirilmesi gerekebileceğini özellikle belirtir. Doğru transcript seçimi şu soruyla başlar: “Bu transcripti ne için kullanacağım?”"
capability_bridge = "Transcript listesini görmek kolaydır. Daha ileri beceri ise: - transcript yapısını okumak, - annotation kaynağını tanımak, - representative etiketleri doğru yorumlamak, - exon ve coding farklarının analizi nasıl değiştireceğini görmek, - kendi bilimsel sorunuz için tek transcript seçmenin gerekip gerekmediğine karar vermektir. Bir kaydı görmek ile doğru kaydı bilimsel gerekçeyle seçmek aynı şey değildir."
related_references = ["/reference/gene-transcript-protein-id-farki/", "/reference/ncbi-ensembl-ucsc-hangisi/"]
sources = ["Ensembl — Canonical transcript selection.", "Ensembl — Transcript quality and representative tags.", "Ensembl — Gene/transcript annotation model.", "NCBI — RefSeq Select selection criteria and intended use.", "UCSC Genome Browser — Transcript, gene-track and single-transcript selection guidance.", "NCBI — RefSeq accession classes."]
sitemap = { priority = 0.6, changefreq = "monthly" }
+++

## Bu yazıda neler var?

- Bir genin neden çok sayıda transcripti olabileceğini
- “Canonical transcript”in gerçekte ne anlama geldiğini
- Neden en uzun transcriptin otomatik olarak doğru olmadığını
- MANE Select ve RefSeq Select'in rolünü
- Kendi analiziniz için transcript seçerken izleyebileceğiniz workflow'u

## Bir gen neden birden fazla transcript taşır?

Bir gene ait RNA ürünleri aynı exon yapısını taşımak zorunda değildir.

Transcriptler:

- farklı başlangıç noktaları kullanabilir,
- farklı sonlanma noktalarına sahip olabilir,
- belirli exonları dahil edip diğerlerini atlayabilir,
- farklı UTR yapılarına sahip olabilir,
- farklı protein ürünleri oluşturabilir.

Ensembl'in annotation dokümantasyonu aynı gene bağlı transcriptlerin transcription start/end, splicing ve exon yapıları bakımından farklılaşabileceğini açıkça belirtir.

UCSC de çoğu genin birden fazla transcriptle ilişkili olduğunu ve bazı transcriptlerin yalnız UTR'larda farklılaşırken bazılarının coding sequence ve dolayısıyla protein ürününü değiştirebileceğini açıklar.

Dolayısıyla:

**gene ≠ transcript**

ve

**bir gene ait transcriptlerin hepsi birbirinin eşdeğeri değildir.**



{{< reference-visual id="W2-WORKFLOW-1" >}}

## “Canonical transcript” ne demektir?

Canonical transcript çoğu zaman yanlış biçimde:

**“Gerçek transcript.”**

veya:

**“Biyolojik olarak her zaman kullanılması gereken transcript.”**

gibi okunur.

Oysa canonical çoğunlukla bir **representative transcript selection** problemine verilen pratik bir cevaptır.

Ensembl her locus için tek bir Ensembl Canonical transcript tanımlar. Protein-coding genlerde seçim; korunmuş exonlar, expression, coding sequence uzunluğu, NCBI/UniProt gibi kaynaklarla uyum ve çeşitli başka kanıtları birlikte değerlendiren bir sistemle yapılır.

Daha da önemlisi, Ensembl aynı dokümanda analiz doğruluğu için bir locus'ta birden fazla transcriptin dikkate alınması gerekebileceğini söyler.

Bu tek cümle canonical kavramının sınırını çok iyi gösterir:

**Canonical = yararlı temsilci.\
Canonical ≠ diğer bütün transcriptlerin önemsiz olduğu ilanı.**

## “En uzun transcript” neden güvenilir bir evrensel kural değildir?

Çünkü uzunluk yalnızca bir özelliktir.

Bir transcript çok uzun olabilir ama:

- expression desteği daha düşük olabilir,
- kısmi annotation olabilir,
- protein isoformu araştırma sorunuz açısından ilgili olmayabilir,
- belirli tissue'da diğer isoform baskın olabilir.

Güncel Ensembl Canonical algoritması da yalnız “en uzunu seç” demez. CDS uzunluğu seçim faktörlerinden biridir; fakat expression, conservation, APPRIS/UniProt uyumu ve diğer kanıtlar da değerlendirilir.

NCBI RefSeq Select sistemi de benzer şekilde tek kriter kullanmaz. Representative transcript seçerken manual curation, conservation, expression, protein uzunluğu, Swiss-Prot uyumu ve başka göstergelerden yararlanır.

Dolayısıyla:

**Longest transcript ≠ automatically best transcript.**



{{< reference-visual id="W2-WORKFLOW-2" >}}

## MANE Select neden önemli?

İnsan genomunda RefSeq ile Ensembl/GENCODE arasında aynı transcripti eşleştirmek özellikle klinik ve genomik uygulamalarda büyük değer taşır.

MANE projesi NCBI ile EMBL-EBI'nin ortak çalışmasıdır.

Ensembl açıklamasına göre bir MANE Select transcriptin RefSeq karşılığı ile Ensembl/GENCODE karşılığı:

- aynı splice yapısına,
- aynı sequence'e,
- aynı 5' ve 3' UTR'lara,
- aynı başlangıç ve bitişe

sahip olacak biçimde eşleştirilir.

Bu nedenle iki annotation ekosistemi arasında ortak bir representative transcript gerektiğinde MANE Select güçlü bir referanstır.

Ancak MANE Select de şu anlama gelmez:

**“Bu gene ait biyolojik olarak tek önemli transcript budur.”**

NCBI RefSeq Select dokümantasyonu da representative transcript setlerinin tek transcript gereken analizleri kolaylaştırmak için tasarlandığını, fakat diğer transcript ve proteinlerin önemini ortadan kaldırmadığını açık biçimde vurgular.

## RefSeq Select ile MANE Select aynı şey mi?

Tam olarak değil.

**RefSeq Select**, NCBI'nin gene başına representative transcript seçme sistemidir.

İnsan protein-coding genlerinde RefSeq Select transcript, Ensembl'in seçimiyle eşleşip MANE kriterlerini sağladığında **MANE Select** olarak işaretlenebilir.

Dolayısıyla MANE, NCBI ve Ensembl/GENCODE annotation'ları arasında doğrudan eşleşme katmanı sunar.

Bu ayrım özellikle variant annotation, transcript reporting ve farklı tool'lar arasında sonuç karşılaştırırken önemlidir.

## Peki transcript seçerken neye bakmalısınız?

Tek bir cevap yerine bir decision workflow daha güvenlidir.

### 1. Analiz amacını tanımlayın

Bir protein sequence'i mi gerekiyor?

Variant etkisini mi raporlayacaksınız?

Expression isoformlarını mı araştırıyorsunuz?

Primer tasarlıyor musunuz?

Genom-wide analizde gene başına tek representative transcript mi gerekiyor?

Bu soruların cevapları aynı transcripti zorunlu kılmaz.

### 2. Transcriptin türünü kontrol edin

Protein-coding mi?

Non-coding mi?

NMD ile ilişkili bir transcript mi?

Partial model mi?

Araştırma sorunuz için ilgili biyolojik sınıfta mı?

### 3. Representative transcript etiketlerini görün

Uygunsa:

- MANE Select,
- RefSeq Select,
- Ensembl Canonical,
- APPRIS principal

gibi işaretler başlangıç kararını destekleyebilir.

Ama etiketi son karar yerine **evidence layer** olarak kullanın.

### 4. Exon ve coding structure'ı karşılaştırın

Transcriptler nerede ayrılıyor?

Fark:

- yalnız UTR'da mı,
- coding exon'da mı,
- splice junction'da mı,
- protein sequence'inde mi?

Bunun cevabı seçim probleminin biyolojik önemini değiştirir.

### 5. Tissue ve deney bağlamını hesaba katın

Bir transcriptin representative olması, belirli tissue veya hastalık bağlamında en ilgili isoform olmasıyla aynı şey değildir.

Eğer sorunuz transcript-specific expression ise genel canonical seçim yerine doğrudan bağlama özgü expression kanıtı gerekir.

### 6. Database ve release bilgisini kaydedin

Transcript identifier ve version'ı koruyun.

Çünkü annotation değişebilir.



{{< reference-visual id="W2-WORKFLOW-3" >}}

## BRCA1 gibi bir gen açtığınızda ne yapabilirsiniz?

Bir gene kaydını açtığınızda doğrudan ilk transcripti kopyalamak yerine:

**Önce gene-level kaydı doğrulayın.**

Species doğru mu?

Assembly doğru mu?

Sonra transcript listesini inceleyin.

Representative etiketi var mı?

MANE veya RefSeq Select hangisi?

Transcript coding mi?

Exon yapıları nerede farklılaşıyor?

Daha sonra kendi sorunuza dönün.

Örneğin yalnız gene-level expression yapıyorsanız bütün isoform biyolojisini çözmeniz gerekmeyebilir.

Ama belirli bir variantın protein üzerindeki etkisini bildiriyorsanız transcript seçiminiz sonucu doğrudan değiştirebilir.

Bu yüzden transcript problemi ancak **analiz bağlamına bağlandığında** çözülebilir.



{{< reference-visual id="W2-WORKFLOW-4" >}}

## Bu ne anlama geliyor?

Bir gen için çok sayıda transcript gördüğünüzde:

**“Hangisi gerçek?”**

sorusu yerine şu sırayı kullanın:

**1. Ne yapacağım?**\
Analiz amacım ne?

**2. Hangi transcriptler var?**\
Coding/non-coding ve yapı farkları neler?

**3. Hangi evidence var?**\
MANE, RefSeq Select, Ensembl Canonical veya başka support etiketleri?

**4. Transcript farkı sonucumu etkiliyor mu?**

**5. Tek transcript seçmek gerçekten gerekli mi?**

Son soru özellikle önemlidir.

UCSC de tek transcript seçiminin pipeline sonucunu etkileyebileceğini ve bazı analizlerde tüm transcriptleri korumanın daha uygun olabileceğini açıkça belirtir.

Yani iyi transcript analizi bazen:

**“Doğru transcripti seçmek”**

değil,

**“Tek transcript seçmenin yanlış varsayım olup olmadığını fark etmek”**

demektir.
