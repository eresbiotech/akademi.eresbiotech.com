+++
title = "Elinizde bir gen listesi var: İlk olarak neye bakmalısınız?"
slug = "gen-listesi-nasil-yorumlanir"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Differential expression veya başka bir analizden gen listesi elde ettiğinizde ilk olarak neye bakmalısınız? Gen listesini biyolojik sonuca dönüştürmeden önce kontrol edilmesi gereken temel noktalar."
seo_title = "Gen Listesi Nasıl Yorumlanır? İlk Bakmanız Gerekenler"
article_id = "W1-PROBLEM"
week = "1"
series = ["Reference Hub · Hafta 1"]
categories = ["gen-listesi-geo2r-differential-expression"]
category_label = "Gen listesi, GEO2R ve differential expression"
tags = ["gen-listesi", "geo2r", "differential-expression"]
primary_keyword = "gen listesi nasıl yorumlanır"
secondary_keywords = "differential expression gen listesi, gen listesi analizi, log fold change, adjusted p-value, gen ekspresyonu yorumlama"
search_intent = "Gen listesi elde ettikten sonra nasıl yorumlanacağını ve ilk olarak hangi bilgilere bakılması gerektiğini anlamak."
review_status = "QA_READY_PENDING_HUMAN_APPROVAL"
product_path = "/post/biyoinformatik-giris-egitim-buyuk-veri-kurs/"
product_cta = "GEO2R analizini doğru kurmayı ve yorumlamayı öğren"
answer_first = "Bir analiz sonunda yüzlerce gen içeren bir tablo elde etmek, biyolojik sonuca ulaştığınız anlamına gelmez. Asıl soru listedeki genlerin neden o listede bulunduğudur. İlk olarak gen adlarına değil, listeyi üreten karşılaştırmaya bakın: Hangi örnek grubu hangi grupla karşılaştırıldı? Genler hangi istatistiksel ve biyolojik kriterlerle seçildi? Değişimin yönü ve büyüklüğü ne? İstatistiksel destek ne kadar güçlü? Örneklerin biyolojik bağlamı nedir? Aynı gen, farklı karşılaştırmalarda farklı anlamlara gelebilir. Benzer biçimde, büyük bir fold change tek başına güçlü bir sonuç değildir; küçük bir p-value da tek başına biyolojik önem göstermez. Bu nedenle iyi bir gen listesi okuması gen sembollerinden değil, şu sıradan başlar: karşılaştırma → veri bağlamı → seçim kriteri → etki büyüklüğü → istatistiksel destek → biyolojik yorum Liste, analizin sonu değil; yorumlamanın başlangıcıdır."
capability_bridge = "Bir sonuç tablosundaki kolonların ne anlama geldiğini bilmek önemli bir başlangıçtır. Fakat gerçek analiz sırasında yalnız tablo okumazsınız. Doğru veri setini seçmeniz, örnek gruplarını anlamanız, karşılaştırmayı kurmanız, kullanılan istatistiksel yaklaşımı tanımanız, sonuçları kontrol etmeniz ve gerektiğinde başka araçlara geçmeniz gerekir. Başka bir deyişle, gen listesini görmek ile o listenin nasıl oluştuğunu kontrol ederek bilimsel bir workflow içinde kullanabilmek aynı beceri değildir."
related_references = ["/reference/geo2r-neyi-soyler-neyi-soylemez/", "/reference/log2-fold-change-adjusted-p-value/"]
sources = ["NCBI Gene Expression Omnibus — GEO Overview. GEO’nun Sample, Series ve Platform veri organizasyonu.", "NCBI — About GEO2R. GEO2R çıktıları, adjusted p-value, log2 fold-change ve analiz seçenekleri.", "Smyth GK. *Linear Models and Empirical Bayes Methods for Assessing Differential Expression in Microarray Experiments.* 2004.", "R Documentation — p.adjust: multiple testing ve Benjamini–Hochberg FDR düzeltmesi."]
sitemap = { priority = 0.6, changefreq = "monthly" }
+++

## Bu yazıda neler var?

- Bir gen listesinin neden tek başına biyolojik sonuç olmadığını
- İlk kontrol edilmesi gereken karşılaştırma ve örnek bilgilerini
- Fold change ile istatistiksel desteğin neden birlikte okunması gerektiğini
- Gen isimlerine geçmeden önce sorulması gereken soruları
- Bir listenin nasıl bilimsel soruya geri bağlanacağını

## Bir gen listesine bakarken yapılan ilk hata: doğrudan gen isimlerine gitmek

Bir sonuç tablosu açıldığında göz genellikle önce tanıdık isimleri arar.

“Bu geni biliyorum.”

“Bu yolakta geçen bir gen.”

“Bu hastalıkla ilişkili olabilir.”

Bu refleks anlaşılırdır. Fakat listeyi yorumlamanın en güvenilir başlangıç noktası değildir.

Çünkü bir genin tabloda bulunması, tek başına o genin araştırdığınız biyolojik süreçte merkezi bir rol oynadığını göstermez. Önce tablonun nasıl üretildiğini anlamanız gerekir.

Örneğin bir differential expression analizinde liste şu karşılaştırmalardan herhangi birinin sonucu olabilir:

- hastalık grubuna karşı kontrol,
- tedavi sonrasına karşı tedavi öncesi,
- bir hücre tipine karşı başka bir hücre tipi,
- farklı zaman noktaları,
- farklı dokular,
- farklı genotipler.

Aynı genin pozitif veya negatif değişimi bile, kontrastın hangi yönde kurulduğuna göre farklı okunur.

Dolayısıyla ilk soru:

**“Hangi genler değişmiş?” değil, “Tam olarak neyi neyle karşılaştırıyorum?” olmalıdır.**

GEO gibi public genomics kaynaklarında da Sample ve Series kayıtları deney koşulları ve örneklerin bağlamı hakkında bilgi taşır. GEO’nun veri modeli, Sample kayıtlarının örnek koşullarını ve işlemlerini, Series kayıtlarının ise ilgili örnekleri çalışma düzeyinde bir araya getirdiğini açıkça ayırır.



{{< reference-visual id="W1-PROBLEM-1" >}}

## 1. Önce karşılaştırmayı okuyun

Diyelim ki sonuç tablosunda `GENE_A` için log2 fold change değeri +1,5.

Bu değer ancak kontrastı biliyorsanız anlam kazanır.

Eğer karşılaştırma:

**Tedavi / Kontrol**

olarak tanımlandıysa pozitif değer tedavi grubunda daha yüksek ekspresyon yönünü gösterebilir.

Ancak yön ters tanımlanmışsa yorum da tersine döner.

Bu yüzden sonuç tablosunu okumadan önce şu cümleyi açıkça kurabilmelisiniz:

**“Bu analiz, şu biyolojik koşulu şu koşulla karşılaştırıyor.”**

Bu cümleyi kuramıyorsanız henüz gen düzeyinde yorumlama aşamasına gelmemişsinizdir.

## 2. Örneklerin ne olduğunu kontrol edin

Bir gen listesi yalnız sayısal değerlerden oluşmaz. Arkasında gerçek biyolojik örnekler vardır.

Şunları bilmek yorumunuzu değiştirebilir:

- doku veya hücre tipi,
- hastalık durumu,
- tedavi,
- zaman noktası,
- organizma,
- örnek sayısı,
- deney tasarımı,
- varsa önemli batch veya klinik değişkenler.

Örneğin karaciğerde gözlenen ekspresyon farkı ile izole bir bağışıklık hücresi popülasyonunda gözlenen fark aynı biyolojik çerçevede yorumlanamaz.

Public bir çalışma kullanıyorsanız yalnız sonuç tablosunu indirmek yerine çalışmanın metadata’sını da okuyun.

## 3. Genler listeye hangi kriterle girdi?

İkinci kritik soru şudur:

**Bu liste nasıl oluşturuldu?**

Bir araştırmacı yalnızca raw p-value değerine göre filtrelemiş olabilir.

Bir başkası:

- adjusted p-value,
- minimum fold change,
- ekspresyon düzeyi,
- belirli bir gen grubu

gibi ek ölçütler kullanmış olabilir.

Dolayısıyla “500 differentially expressed gene bulundu” ifadesi tek başına yeterli bilgi değildir.

Aynı veri setinde farklı eşikler kullanıldığında listenin uzunluğu ve içeriği değişebilir.

GEO2R’ın güncel dokümantasyonunda da sonuçların adjusted p-value ile sıralanabildiği, significance cutoff ve log2 fold-change eşiğinin kullanıcı tarafından değiştirilebildiği açıkça belirtilmektedir.



{{< reference-visual id="W1-PROBLEM-2" >}}

## 4. Değişimin büyüklüğü ile istatistiksel desteği ayırın

Bir genin yüksek fold change göstermesi dikkat çekicidir.

Ama yüksek fold change:

**“Bu sonuç kesinlikle güvenilirdir.”**

anlamına gelmez.

Benzer şekilde çok küçük bir p-value:

**“Bu gen biyolojik olarak en önemli gendir.”**

anlamına da gelmez.

Bunlar iki farklı sorudur.

**Etki büyüklüğü**, koşullar arasındaki farkın ne kadar büyük olduğunu anlatmaya yardım eder.

**İstatistiksel ölçütler** ise gözlenen farkın veri ve kullanılan model bağlamında ne kadar güçlü destek taşıdığıyla ilgilidir.

Özellikle genom çapında binlerce gen aynı anda test edildiğinde çoklu test problemi ortaya çıkar. Bu nedenle differential expression tablolarında adjusted p-value gibi düzeltilmiş ölçütler kritik hale gelir. GEO2R varsayılan olarak Benjamini–Hochberg false discovery rate yaklaşımını kullanır ve adjusted p-value değerini sonuçların yorumlanmasında temel istatistiklerden biri olarak sunar.

Buradaki ana fikir şudur:

**Tek bir kolonu sıralayıp bilimsel sonucu ilan etmeyin.**

## 5. Sonra biyolojik bağlama geçin

Teknik kontrollerden sonra artık gen isimlerine bakmak anlamlı hale gelir.

Burada sorulabilecek sorular şunlardır:

Bu genlerin bilinen fonksiyonları ne?

Aynı biyolojik süreçte yer alan genler birlikte mi değişiyor?

Belirli pathway veya fonksiyonel kategoriler tekrar ediyor mu?

Değişimin yönü biyolojik hipotezinizle uyumlu mu?

Sonuç başka deneylerle veya bilinen mekanizmalarla örtüşüyor mu?

Ama burada da dikkat edilmesi gereken önemli bir ayrım vardır:

**Bir genin bilinen bir pathway ile ilişkili olması, sizin deneyinizde o pathway’in mekanistik olarak aktive edildiğini tek başına kanıtlamaz.**

Gen listesi size hipotez üretmek ve örüntü görmek için güçlü bir başlangıç noktası sağlar. Bilimsel sonuç ise deney tasarımı, istatistiksel kanıt ve biyolojik bağlam birlikte değerlendirildiğinde güçlenir.



{{< reference-visual id="W1-PROBLEM-3" >}}

## Bu ne anlama geliyor?

Elinizde yüzlerce satırlık bir sonuç tablosu varsa onu hemen “önemli genler listesi” olarak düşünmek yerine, önce **analizin izini geriye doğru sürün**.

Şu altı soruya cevap vermeye çalışın:

1. Hangi koşullar karşılaştırıldı?
2. Örneklerin biyolojik bağlamı ne?
3. Genler hangi kriterlerle seçildi?
4. Değişimin yönü ve büyüklüğü ne?
5. İstatistiksel destek ne kadar güçlü?
6. Bulgular biyolojik sorumla nasıl bağlantılı?

Bunları yaptıktan sonra gen fonksiyonları, pathway’ler, enrichment analizleri veya daha ileri computational adımlar anlamlı hale gelir.
