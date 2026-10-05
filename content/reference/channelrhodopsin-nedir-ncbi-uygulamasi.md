+++
title = "Channelrhodopsin Nedir? NCBI'da Birlikte İnceleyelim"
slug = "channelrhodopsin-nedir-ncbi-uygulamasi"
date = "2026-10-05"
lastmod = "2026-10-05"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"

description = "Channelrhodopsin-2 nedir? Nobel'e uzanan ışığa duyarlı proteini gerçek bir NCBI kaydı üzerinden buluyor, accession numarası, FASTA ve BLAST mantığını basitçe inceliyoruz."

seo_title = "Channelrhodopsin Nedir? NCBI'da ChR2 İnceleme Rehberi"

article_id = "NOBEL-OPTO-02"
series = ["Bir Alg Proteininden Nobel'e · 2/5"]

categories = ["optogenetik-norobilim"]
category_label = "Optogenetik ve nörobilim"

tags = [
  "channelrhodopsin",
  "chr2",
  "ncbi",
  "blast",
  "fasta",
  "optogenetik",
  "chlamydomonas-reinhardtii"
]

primary_keyword = "channelrhodopsin nedir"
secondary_keywords = "channelrhodopsin 2, ChR2 NCBI, AF461397, protein FASTA, BLAST protein"

search_intent = "Channelrhodopsin-2'nin ne olduğunu gerçek bir NCBI kaydı üzerinden anlamak ve accession, FASTA ve BLAST kullanarak temel bir biyoinformatik inceleme yapmak."

review_status = "QA_READY_PENDING_HUMAN_APPROVAL"

product_path = "/post/ncbi-ensembl-ucsc-genom-tarayicisi-uygulamali-egitim/"
product_cta = "NCBI kayıtlarını araştırma sorunuza göre kullanmayı öğren"

answer_first = "Channelrhodopsin-2, yeşil alg Chlamydomonas reinhardtii'den tanımlanan ve ışık geldiğinde iyonların hücre zarından geçmesine izin veren bir proteindir. Optogenetikte kullanılan ChR2'nin tarihsel dizisini NCBI'da AF461397 accession numarası üzerinden bulabiliriz. Bu kayıt sayesinde bir bilimsel makalede geçen molekülün gerçek dizisine ulaşabilir, FASTA formatını görebilir ve BLAST ile benzer dizileri araştırabiliriz."

capability_bridge = "NCBI'da gerçek bir kaydı bulmak, accession numarasını okumak, FASTA dizisini görmek ve BLAST ile benzerlerini aramak biyoinformatiğin temel araştırma becerilerindendir. Amaç bir ekranı ezberlemek değil, bilimsel bir isimden doğrulanabilir biyolojik kayda ulaşabilmektir."

related_references = [
  "/reference/optogenetik-nedir-2026-nobel-tip-odulu/",
  "/reference/gene-transcript-protein-id-farki/",
  "/reference/ncbi-ensembl-ucsc-hangisi/"
]

sources = [
  "Nagel G, Szellas T, Huhn W, et al. Channelrhodopsin-2, a directly light-gated cation-selective membrane channel. PNAS. 2003;100:13940–13945. GenBank accession AF461397.",
  "Boyden ES, Zhang F, Bamberg E, Nagel G, Deisseroth K. Millisecond-timescale, genetically targeted optical control of neural activity. Nature Neuroscience. 2005;8:1263–1268.",
  "NCBI — GenBank, FASTA and BLAST resources."
]

sitemap = { priority = 0.8, changefreq = "monthly" }
+++

## Bu yazıda neler var?

- Channelrhodopsin-2'nin ne olduğunu
- Bir bilimsel makaledeki accession numarasının neden önemli olduğunu
- NCBI'da gerçek bir kaydın nasıl bulunacağını
- FASTA dizisinin ne olduğunu
- BLAST ile benzer dizilerin nasıl araştırıldığını
- Bir protein adı ile veri tabanındaki kayıt arasındaki farkı

Serinin ilk yazısında optogenetiğin temel mantığını konuşmuştuk.

En basit haliyle:

**Işığa duyarlı bir iyon kanalını bir hücrede üretirseniz, ışığı hücrenin elektriksel durumunu değiştirmek için kullanabilirsiniz.**

Peki bu ışığa duyarlı protein gerçekten nasıl bir şey?

Ve en önemlisi:

**Onu kendimiz bir biyolojik veri tabanında bulabilir miyiz?**

Evet.

Bunun için NCBI'a gideceğiz.

## Önce Channelrhodopsin-2 nedir?

Channelrhodopsin-2, kısaca **ChR2**, tek hücreli yeşil alg *Chlamydomonas reinhardtii*'den tanımlanan ışığa duyarlı bir membran proteinidir.

Protein hücre zarında bulunur.

Işık geldiğinde yapısında değişiklik olur ve iyonların zar boyunca geçmesine izin veren bir kanal açılır.

Basitleştirirsek:

**ışık → ChR2 açılır → iyonlar geçer → hücrenin elektriksel durumu değişir**

Bu özellik nörobilim açısından çok değerli hale geldi.

Çünkü nöronların çalışması da hücre zarındaki iyon hareketleriyle yakından ilişkilidir.

{{< reference-visual id="NOBEL-OPTO-02-1" >}}

## NCBI'da ne arayacağız?

2003 yılında yayımlanan Channelrhodopsin-2 çalışmasında araştırmacılar kullandıkları tam uzunlukta cDNA dizisi için şu GenBank accession numarasını verdiler:

**AF461397**

Accession numarasını bir biyolojik kaydın kalıcı adresi gibi düşünebilirsiniz.

Bir protein farklı makalelerde farklı biçimlerde adlandırılabilir.

Gen isimleri değişebilir.

Veri tabanı anotasyonları zaman içinde güncellenebilir.

Ancak accession numarası bize belirli bir kaydın izini sürmek için güçlü bir başlangıç noktası verir.

## Uygulama 1 — NCBI'a gidin

NCBI ana sayfasını açın.

Arama kutusuna şunu yazın:

`AF461397`

Bu kadar.

Burada özellikle “channelrhodopsin” yazmak yerine accession ile arıyoruz.

Çünkü amacımız genel bilgi aramak değil.

**Belirli bir bilimsel çalışmada kullanılan gerçek kaydı bulmak.**

Sonuç ekranında *Chlamydomonas reinhardtii* adını görmelisiniz.

Bu, Nobel hikâyesindeki yeşil algdir.

## Kayda bakarken neyi kontrol etmeliyim?

İlk seferde bütün alanları anlamaya çalışmayın.

Şu sorular yeterli:

**Organism**

Bu dizi hangi organizmaya ait?

**Accession**

Doğru kayıt üzerinde miyim?

**Length**

Dizi ne kadar uzun?

**Features**

Dizinin hangi bölgeleri biyolojik olarak anotasyonlanmış?

**References**

Bu kayıt hangi yayınlarla ilişkilendirilmiş?

Biyoinformatikte çok önemli bir alışkanlık şudur:

**Bir kaydı yalnız adına bakarak kabul etmeyin.**

Organizma, accession, dizi ve kaynak yayını birlikte kontrol edin.

## Nucleotide kaydı neden açıldı?

Burada önemli bir ayrım var.

`AF461397` bir **nükleotid kaydıdır**.

Yani DNA/cDNA dizisini temsil eder.

Ama Channelrhodopsin-2 dediğimiz şey bir proteindir.

Bu ikisi aynı şey değildir.

Basitçe:

**gen / cDNA → protein**

Nucleotide kaydı size genetik diziyi gösterir.

Protein kaydı ise o diziden üretilen amino asit dizisini gösterir.

Bu ayrım NCBI'da çalışırken sürekli karşınıza çıkar.

{{< reference-visual id="NOBEL-OPTO-02-2" >}}

## Uygulama 2 — FASTA görünümünü açın

Kayıt sayfasında **FASTA** görünümünü bulun.

FASTA çok basit bir dizi formatıdır.

İlk satır genellikle `>` karakteriyle başlar.

Altında biyolojik dizi bulunur.

Nükleotid kaydında:

`A T G C`

harflerini görürsünüz.

Protein dizisinde ise amino asitleri temsil eden harfler bulunur.

FASTA'nın önemi şudur:

**Bu diziyi başka analiz araçlarına taşıyabilirsiniz.**

Örneğin:

- BLAST
- sequence alignment
- filogenetik analiz
- protein karşılaştırmaları

FASTA, biyoinformatikte en sık karşılaşacağınız temel formatlardan biridir.

## Uygulama 3 — Protein bilgisini bulun

Nucleotide kaydındaki anotasyon alanlarını inceleyin.

Protein üreten bölgeyi gösteren **CDS** kaydını görebilirsiniz.

CDS, “coding sequence” yani protein kodlayan bölge anlamına gelir.

Burada ilgili protein ürününe ve amino asit dizisine giden bağlantılar bulunabilir.

Burada öğrenmemiz gereken ana fikir şu:

**Aynı biyolojik hikâye veri tabanında farklı kayıt seviyelerine ayrılır.**

Nucleotide kaydı başka bir şeyi,

protein kaydı başka bir şeyi,

gene kaydı başka bir şeyi temsil eder.

Bu nedenle:

**“Channelrhodopsin'i buldum.”**

demek yerine şu soruyu sormak daha doğru olur:

**“Channelrhodopsin'in hangi kaydına bakıyorum?”**

## Uygulama 4 — BLAST ile benzer dizileri bulun

Şimdi biraz daha eğlenceli kısma geçelim.

Elinizde bir biyolojik dizi var.

Şu soruyu sorabilirsiniz:

**Bu diziye benzeyen başka hangi diziler var?**

NCBI'ın BLAST aracı tam olarak bunun için kullanılır.

Protein dizisiyle çalışıyorsanız **BLASTP** uygun araçlardan biridir.

İlk denemede gelişmiş ayarları değiştirmeyin.

Varsayılan ayarlarla arama yapabilirsiniz.

Sonuç ekranında üç şeye odaklanın.

### Query coverage

Sizin dizinizin ne kadarı karşılaştırmaya dahil olmuş?

### Percent identity

Eşleşen bölgede amino asitlerin yüzde kaçı aynı?

### E-value

Bu benzerliğin rastlantıyla görülmesinin ne kadar beklenmedik olduğunu değerlendirmeye yardımcı olur.

Çok küçük E-value değerleri genellikle daha güçlü sequence similarity desteğine işaret eder.

Ama burada önemli bir uyarı var.

## En yüksek benzerlik = aynı protein mi?

Her zaman değil.

İki proteinin dizileri birbirine çok benzeyebilir.

Bu onların ortak kökene veya benzer yapısal özelliklere sahip olduğunu düşündürebilir.

Ancak yalnızca BLAST sonucuna bakarak:

**“Bu protein kesinlikle aynı işlevi yapıyor.”**

diyemeyiz.

Protein fonksiyonu için:

- sequence similarity,
- conserved regions,
- yapı,
- organizma,
- hücresel bağlam,
- deneysel çalışmalar

birlikte değerlendirilmelidir.

{{< reference-visual id="NOBEL-OPTO-02-3" >}}

## Beş dakikalık mini pratik

Şimdi bunu kendiniz deneyebilirsiniz.

1. NCBI'da `AF461397` arayın.
2. Organizmanın *Chlamydomonas reinhardtii* olduğunu doğrulayın.
3. FASTA görünümünü açın.
4. CDS/protein bilgisini bulun.
5. Protein dizisini inceleyin.
6. BLAST bağlantısını açın.
7. İlk birkaç sonucu organism, query coverage ve percent identity açısından karşılaştırın.

Hepsi bu.

Bu küçük uygulamanın sonunda Nobel haberinde gördüğünüz **Channelrhodopsin** kelimesi artık soyut bir terim olmaktan çıkar.

Elinizde:

**bir organizma**

**bir accession numarası**

**gerçek bir biyolojik dizi**

ve

**karşılaştırabileceğiniz başka diziler**

vardır.

İşte biyoinformatik burada başlıyor.

## Peki bundan sonra ne oldu?

Channelrhodopsin'in ışıkla çalışan bir iyon kanalı olduğunu bilmek önemliydi.

Ama tek başına nörobilim devrimi yaratmıyordu.

Bir sonraki kritik soru şuydu:

**Bu protein sinir hücrelerinde çalışır mı?**

Serinin üçüncü yazısında Nobel'e giden temel yayınlara dönüp tam olarak bunu inceleyeceğiz.

**[Optogenetiğin doğuşu: Nobel'e giden temel yayınlar →](/reference/optogenetik-nobel-yayinlari-deisseroth-hegemann-nagel/)**
