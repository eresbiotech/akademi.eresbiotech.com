+++
title = "Aynı geni NCBI, Ensembl ve UCSC'de aradığınızda neden farklı sonuçlar görürsünüz?"
slug = "ncbi-ensembl-ucsc-ayni-gen-neden-farkli"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Aynı geni NCBI, Ensembl ve UCSC'de aradığınızda transcript, ID veya koordinatlar neden farklı görünebilir? Annotation, assembly ve veri modeli farklarını doğru okuyun."
seo_title = "NCBI, Ensembl ve UCSC'de Aynı Gen Neden Farklı Görünür?"
article_id = "W2-PROBLEM"
week = "2"
series = ["Reference Hub · Hafta 2"]
categories = ["ncbi-ensembl-ucsc-identifierlar"]
category_label = "NCBI, Ensembl, UCSC ve identifier'lar"
tags = ["ncbi", "ensembl", "ucsc", "identifier"]
primary_keyword = "NCBI Ensembl UCSC farkı"
secondary_keywords = "NCBI Ensembl farkı, Ensembl UCSC farkı, gen veritabanları, gene annotation, transcript annotation, genome assembly"
search_intent = "NCBI, Ensembl ve UCSC arasında aynı gen için neden farklı bilgiler görüldüğünü anlamak."
review_status = "QA_READY_PENDING_HUMAN_APPROVAL"
product_path = "/post/ncbi-ensembl-ucsc-genom-tarayicisi-uygulamali-egitim/"
product_cta = "Genom kayıtlarını doğru okumayı öğren"
answer_first = "Aynı geni NCBI, Ensembl ve UCSC'de açtığınızda farklı ekranlar, farklı transcript listeleri veya farklı identifier'lar görmeniz, platformlardan birinin mutlaka yanlış olduğu anlamına gelmez. Çünkü burada yalnızca üç farklı web sitesi karşılaştırmıyorsunuz. Aynı biyolojik nesneyi farklı veri modelleri, annotation kaynakları ve kullanım amaçları üzerinden temsil eden sistemlere bakıyorsunuz. NCBI Gene, gene-centric bir kayıt etrafında sequence, transcript, protein, fonksiyon ve başka kaynaklara bağlantıları birleştirir. Ensembl gene, transcript ve protein gibi nesneleri kendi stable identifier sistemi ve annotation yapısı içinde düzenler. UCSC Genome Browser ise özellikle bir genome assembly üzerindeki bölgeyi ve o bölgeye bindirilmiş farklı annotation track'lerini birlikte görmenizi sağlar. Dolayısıyla ilk soru: “Hangisi doğru?” değil, “Aynı biyolojik nesnenin hangi temsil katmanlarına bakıyorum ve şu anda hangi bilgiyi arıyorum?” olmalıdır."
capability_bridge = "Bir gene adını yazıp kayıt bulmak kolaydır. Daha zor olan: - hangi identifier'ın neyi temsil ettiğini bilmek, - transcriptleri birbirinden ayırmak, - assembly ve annotation farklarını görmek, - browser track'lerini doğru okumak, - bir platformdan diğerine geçerken aynı biyolojik nesneyi izleyebilmektir. İşte database kullanımı ile database üzerinden bilimsel çalışma yapma arasındaki fark burada ortaya çıkar."
related_references = ["/reference/gene-transcript-protein-id-farki/"]
sources = ["NCBI — Gene data model and processing overview.", "NCBI — BRCA1 Gene record, Gene ID 672; kayıt 9 Ağustos 2026 güncellemesiyle doğrulandı.", "Ensembl — Stable IDs and versioning.", "Ensembl — Gene annotation model.", "UCSC Genome Browser — Gene and transcript track FAQ.", "UCSC Genome Browser — Coordinate conventions.", "UCSC Genome Browser — Assembly glossary."]
sitemap = { priority = 0.6, changefreq = "monthly" }
+++

## Bu yazıda neler var?

- Aynı genin üç platformda neden farklı görünebildiğini
- Gene record ile genome-browser görünümünün farkını
- Annotation ve genome assembly etkisini
- BRCA1 üzerinden üç veri temsilinin nasıl ayrıldığını
- Farklılık gördüğünüzde hangi kontrolleri yapmanız gerektiğini

## Bir gen, bir ekran değildir

Bir gen biyolojik bir varlıktır.

Bir database ekranı ise o gen hakkında belirli kaynaklardan toplanmış bilgilerin, belirli bir veri modeli içinde kullanıcıya sunulmuş halidir.

Bu ikisini eşitlememek önemlidir.

NCBI Gene örneğin gene-centric bir kapı görevi görür. NCBI'nin güncel dokümantasyonuna göre Gene kayıtları stable numeric bir **GeneID** ile organize edilir ve transcript/protein dizileri, assembly annotation bilgisi, isimler, gene type, orthology, Gene Ontology ve diğer kaynaklara bağlantılar gibi farklı bilgi tiplerini bir araya getirebilir.

Ensembl ise kendi annotation sistemi içinde gene, transcript ve protein nesnelerini birbirinden ayırır. İnsan için genellikle:

- `ENSG...` → gene
- `ENST...` → transcript
- `ENSP...` → protein

biçimindeki stable ID sınıflarıyla karşılaşırsınız. Ensembl bu identifier'ları annotation güncellemeleri boyunca takip eder ve biyolojik nesnede belirli değişiklikler olduğunda version numarasını artırabilir.

UCSC Genome Browser'da ise temel çalışma yüzeyi çoğunlukla genomik bölgedir.

Aynı koordinat alanına:

- GENCODE,
- NCBI RefSeq,
- variation,
- conservation,
- regulation,
- kullanıcının kendi verisi

gibi çok farklı track'ler yerleştirilebilir. UCSC'nin kendi açıklaması da “Genes” olarak adlandırılan birçok track'teki tekil öğelerin aslında genome assembly üzerine yerleştirilmiş transcript modelleri olduğunu özellikle belirtir.

Yani üç platformdan aynı ekranı beklemek zaten yanlış başlangıç varsayımıdır.



{{< reference-visual id="W2-PROBLEM-1" >}}

## BRCA1 üzerinden bakalım

BRCA1 iyi bir öğretim örneğidir.

NCBI'de insan **BRCA1** kaydı Gene ID **672** altında tutulur. Güncel NCBI kaydı BRCA1'i protein-coding gene olarak verir ve ilgili RefSeq, Ensembl ve diğer kaynaklara bağlantılar sunar.

Ensembl tarafında aynı insan geni için `ENSG00000012048` stable gene identifier'ı kullanılır.

UCSC ise BRCA1'i yalnızca tek bir “UCSC gene record” olarak göstermek zorunda değildir. Aynı genomik bölge üzerinde GENCODE veya NCBI RefSeq gibi farklı gene annotation track'lerini açabilirsiniz.

Bu fark küçük görünse de çok önemli bir zihinsel değişiklik yaratır:

**Gene symbol aynı olabilir; fakat baktığınız kayıt türü aynı değildir.**

Bir yerde gene-level özet görürken başka bir yerde transcript annotation, diğerinde ise genomik locus üzerinde farklı annotation katmanları görüyorsunuz.

## Transcript sayıları neden aynı olmayabilir?

Çünkü annotation setleri aynı olmak zorunda değildir.

Bir gene ait transcript modelleri:

- deneysel sequence verisi,
- computational annotation,
- manuel kürasyon,
- annotation release'i,
- veri tabanının dahil etme kriterleri

gibi faktörlerden etkilenebilir.

UCSC'nin resmi gene-track açıklaması da RefSeq ile Ensembl/GENCODE arasında annotation kurallarının farklı olduğunu ve transcript setlerinin bu nedenle aynı olmak zorunda olmadığını açıkça belirtir.

Bu durumda:

**“Ensembl'de daha fazla transcript var, demek ki NCBI eksik.”**

veya

**“NCBI'de daha az var, demek ki onlar daha doğru.”**

gibi sonuçlar çıkarılamaz.

Önce hangi annotation setlerinin karşılaştırıldığını bilmek gerekir.

## Farklı genomic coordinates görürseniz ne yapmalısınız?

Burada ilk kontrol annotation değil, çoğu zaman **assembly** olmalıdır.

İnsan genomu için örneğin GRCh37/hg19, GRCh38/hg38 ve T2T-CHM13/hs1 aynı referans assembly değildir. Aynı gen bu assembly'lerde farklı koordinatlarda bulunabilir. UCSC de assembly'leri ayrı referans sistemleri olarak sunar.

İkinci kontrol coordinate convention'dır.

UCSC'nin kendi database tablolarında başlangıç koordinatı zero-based tutulabilirken Genome Browser'ın grafik görünümünde one-based gösterilir. Bu nedenle aynı bölgeyi farklı dosya veya arayüzlerden karşılaştırırken tek bazlık fark bile yalnızca convention farkından kaynaklanabilir.

Dolayısıyla farklı koordinat gördüğünüzde hemen “annotation uyuşmuyor” demeden önce şunlara bakın:

1. Aynı tür mü?
2. Aynı genome assembly mi?
3. Aynı transcript mi?
4. Aynı annotation release'i mi?
5. Aynı coordinate convention mı?



{{< reference-visual id="W2-PROBLEM-2" >}}

## Annotation source mutlak biyolojik gerçek değildir

Bir database annotation'ı, mevcut kanıtların belirli kurallarla modellenmiş halidir.

Bu ayrım özellikle transcriptler için önemlidir.

Bir transcript modeli:

- iyi desteklenmiş olabilir,
- daha sınırlı kanıta sahip olabilir,
- farklı annotation pipelines içinde farklı biçimde temsil edilebilir,
- sonraki release'lerde güncellenebilir.

Ensembl'in kendi annotation dokümantasyonu transcript modellerinin experimental evidence kullanan annotation süreçlerinden üretildiğini ve aynı gene bağlı transcriptlerin başlangıç/bitiş noktaları, splice olayları ve exon yapıları bakımından farklılaşabileceğini açıklar.

NCBI RefSeq'de de curated/known kayıtlarla computational model kayıtları ayrılır. Örneğin bilinen RefSeq RNA/protein kayıtlarında `NM_`, `NR_`, `NP_`; annotation pipeline tarafından oluşturulan modellerde ise `XM_`, `XR_`, `XP_` gibi accession prefix'leri kullanılabilir.

Bu nedenle:

**annotation source ≠ biyolojinin değişmez ve eksiksiz fotoğrafı**

şeklinde düşünmek daha güvenlidir.

Annotation, biyolojik kanıtı kullanılabilir bir veri modeline dönüştürür.

## Bu ne anlama geliyor?

Bir geni iki platformda açtığınızda farklılık görürseniz şu sırayla düşünün:

**1. Aynı biyolojik seviyeye mi bakıyorum?**\
Gene mi, transcript mi, protein mi?

**2. Aynı assembly mi?**\
GRCh37 ile GRCh38 koordinatlarını karşılaştırmıyorum, değil mi?

**3. Aynı annotation kaynağı mı?**\
RefSeq ile GENCODE transcript setlerini mi karşılaştırıyorum?

**4. Aynı release/version mı?**\
Kayıtlardan biri daha eski olabilir mi?

**5. Asıl bilimsel sorum ne?**\
Sequence mi arıyorum, transcript yapısını mı, genomik bağlamı mı?

Farkları bu şekilde okuduğunuzda “hangisi yanlış?” sorusu çoğu zaman yerini daha yararlı bir soruya bırakır:

**“Bu görünüm hangi bilgiyi temsil ediyor?”**



{{< reference-visual id="W2-PROBLEM-3" >}}
