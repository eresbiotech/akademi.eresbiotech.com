+++
title = "Filogenetik ağaçtaki dal uzunlukları ne anlama gelir?"
slug = "filogenetik-agac-dal-uzunlugu"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Uzun dal daha eski tür anlamına mı gelir? Filogenetik ağaçlarda topology, branch length, cladogram, phylogram ve çizim düzenini doğru yorumlayın."
seo_title = "Filogenetik Ağaçta Dal Uzunluğu Ne Anlama Gelir?"
article_id = "W7-PROBLEM"
week = "7"
series = ["Reference Hub · Hafta 7"]
categories = ["filogenetik"]
category_label = "Filogenetik"
answer_first = "Filogenetik ağaçta uzun bir dal görmek, o terminaldeki türün veya dizinin “daha eski” olduğu anlamına gelmez. Molecular phylogenetic analizlerde branch length çoğu zaman bir dal boyunca tahmin edilen **evrimsel değişim miktarını** temsil eder. Maximum-likelihood gibi yaygın modellerde bu değer sıklıkla beklenen substitutions per site cinsinden ifade edilir. Ama her çizilmiş ağacın dal uzunlukları biyolojik ölçüm taşımaz. Bir **cladogram** yalnız branching order/topology’yi gösterebilir. Bir **phylogram** ise topology’nin yanında branch-length bilgisini de taşır. Üstelik aynı topology sayfada birçok farklı şekilde çizilebilir. Bir internal node’u görsel olarak döndürmek kardeş grupların evrimsel ilişkisini değiştirmez. Bu yüzden ağaç okurken üç şeyi birbirinden ayırın: **topology ≠ branch length ≠ drawing layout**"
capability_bridge = "Ağacı üretmek veya Newick dosyasını açmak kolaylaşmıştır. Asıl çalışma becerisi: - topology’yi çizimden ayırmak, - branch length’in birimini okumak, - root ve time-calibration farkını görmek, - evolutionary-change estimate’ini organizma yaşıyla karıştırmamaktır. **Ağaç görmek başka, ağacın hangi kısmının hangi inference’ı taşıdığını bilmek başka bir beceridir.**"
sources = [
  "Recent practical phylogenetics review — cladogram/phylogram ve branch-length interpretation.",
  "Fast branch-length estimation review — molecular trees’de expected substitutions/site tanımı.",
  "Felsenstein likelihood historical review — branch lengths’in substitutions/site ölçeği.",
  "Guindon et al. 2010 — PhyML 3.0 maximum-likelihood methodology.",
  "Model-selection review — evolutionary distance, substitution model ve molecular-clock ayrımı.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/phyml-uygulamali-filogenetik-egitimi/"
product_cta = "Filogenetik çalışma yolunu inceleyin"
+++

## Bu yazıda neler var?

- Topology’nin gerçekte ne anlattığı
- Branch length’in neden “yaş” olmadığı
- Cladogram ile phylogram farkı
- Aynı ağacın neden farklı görünebildiği
- Rooted tree ile time-calibrated tree arasındaki fark

## Önce topology’yi okuyun

Topology, ağacın **branching pattern**’ıdır.

Basit bir örnek düşünelim:

A ve B aynı internal node’dan ayrılıyor.

C ise onların oluşturduğu clade’in dışında dallanıyor.

Bu durumda A ve B:

**birbirlerinin sister taxa’sıdır.**

Bunun sebebi sayfada yan yana çizilmeleri değildir.

Sebep:

**A ve B’nin diğer terminal dizilere göre daha yakın bir ortak ancestral node paylaşmasıdır.**

Internal node’un dallarını döndürerek ağacı:

A – B – C

yerine görsel olarak:

B – A – C

veya başka bir düzende gösterebilirsiniz.

Topology değişmez.

## Sayfada yakın olmak neden yeterli değil?

Bir ağaç şu biçimde çizilmiş olabilir:

A\
B\
C\
D

Burada B ile C ekranda birbirine en yakın isimler olabilir.

Fakat B ve C aynı ancestral node’u paylaşmıyorsa yakın akraba olmayabilirler.

Filogenetik ilişkide görsel santimetreyi değil:

**hangi branchlerin hangi node’larda birleştiğini**

okumanız gerekir.

Ağacı doğru okumak bu nedenle bir geometrik mesafe problemi değil, bir **branching-history problemi**dir.

## Branch length neyi gösterebilir?

Maximum-likelihood molecular phylogenies’de branch lengths çoğunlukla model altında tahmin edilen sequence-change miktarını temsil eder.

Yaygın ölçek:

**expected substitutions per site**

biçimindedir.

Örneğin branch length:

`0.05`

ise bunu kabaca:

“Model bu dal boyunca site başına beklenen substitution miktarını bu ölçekte tahmin ediyor.”

şeklinde okumak mümkündür.

Fakat bu:

“Bu lineage 5 milyon yıl yaşında.”

anlamına gelmez.

Çünkü değişim miktarı yalnız zamandan değil:

- substitution rate,
- kullanılan sequence region,
- model,
- lineage-specific rate variation

gibi faktörlerden etkilenir.

## Uzun dal neden “eski tür” değildir?

Bir terminal lineage’ın branch’i uzun olabilir çünkü o sequence segmentinde daha fazla substitution birikmiştir.

Bu durum:

- daha hızlı evolutionary rate,
- uzun zaman,
- veya ikisinin kombinasyonu

ile ilişkili olabilir.

Branch length tek başına bunları ayırmaz.

Hatta aynı yaştaki terminal lineages farklı evolutionary rates nedeniyle farklı root-to-tip branch lengths gösterebilir.

Dolayısıyla:

**uzun branch = daha fazla tahmin edilen sequence change**

olabilir.

Ama:

**uzun branch = daha eski yaşayan tür**

değildir.

Bugün örneklenmiş iki extant species’in ikisi de bugünde yaşamaktadır.

Biri “ağacın daha eski terminali” değildir.

## Cladogram ile phylogram farkı

Bu ayrım branch length yorumunun merkezindedir.

### Cladogram

Branching order önemlidir.

Çizimdeki dalların uzunluğu ölçülebilir biological quantity taşımak zorunda değildir.

### Phylogram

Topology ile birlikte branch lengths de modelden türetilen evolutionary-change bilgisini taşır.

Günümüzde PhyML gibi maximum-likelihood yazılımlarının ürettiği ağaçlar branch-length estimates içeren phylogramlar oluşturabilir.

Bu nedenle bir ağacın görseline bakıp:

“Bu dal iki kat uzun, demek ki iki kat yaşlı.”

demeden önce ağacın **hangi tür grafik** olduğunu bilmelisiniz.

## Rooted tree zaman ağacı mıdır?

Hayır.

Root ağacın evrimsel yönünü yorumlamanıza yardımcı olabilir ve internal node’ların ancestral relationships açısından okunmasını sağlar.

Ama:

**rooted ≠ time-calibrated**

bir ağaçtır.

Branch length’leri takvim zamanı olarak yorumlamak için molecular-clock assumptions, calibration information ve uygun dating methodology gibi ek katmanlar gerekir.

Molecular models çoğu zaman branch length’i önce sequence change miktarı olarak tahmin eder; zamanı elde etmek ayrıca rate ile time’ın ayrıştırılmasını gerektirir.

Dolayısıyla:

**root var → milyon yıl okuyabilirim**

çıkarımı güvenli değildir.

## Scale bar’a bakmayı unutmayın

Phylogramlarda çoğu zaman bir scale bar görürsünüz.

Örneğin:

`0.1 substitutions/site`

Bu scale ağacın yatay branch-length geometrisinin hangi molecular-change ölçeğinde çizildiğini anlamanıza yardım eder.

Scale bar yoksa veya çizim software’i branch lengths’i yok sayarak “rectangular/equal branch” formatında gösteriyorsa görsel uzunlukları ölçmeye çalışmak anlamlı olmayabilir.

Bu nedenle figure legend veya tree-viewer setting’i de analizin parçasıdır.

## Model neden branch length’e dahil?

Maximum-likelihood phylogenetics, gözlenen sequence data’yı belirli bir **substitution model** altında açıklamaya çalışır.

Model:

- farklı substitution türlerinin hızları,
- base/amino-acid frequencies,
- among-site rate variation

gibi evrimsel süreçlere ilişkin varsayımlar taşıyabilir.

PhyML de maximum-likelihood prensibine dayalı tree inference yazılımıdır ve tree topology ile model parameters/branch lengths’in likelihood çerçevesinde tahmin edilmesini sağlar.

Bu yüzden branch length:

ham olarak saydığınız “farklı nucleotide sayısı” olmak zorunda değildir.

Modelin gözlenmeyen multiple substitutions gibi olayları hesaba katmaya çalıştığı bir estimate olabilir.

## Bu ne anlama geliyor?

Bir filogenetik ağacı açtığınızda şu sırayı izleyin:

**1. Tips kim?**\
Species mi, gene/protein sequence mi?

**2. Topology ne söylüyor?**\
Hangi gruplar ortak node’larda birleşiyor?

**3. Tree rooted mı?**

**4. Branch lengths gerçekten ölçekli mi?**\
Cladogram mı, phylogram mı?

**5. Scale bar ne?**\
Substitutions/site gibi birim var mı?

**6. Tree hangi model/method ile infer edilmiş?**

**7. Görsel yerleşim ile biological relationship’i karıştırıyor muyum?**

Bu yedi kontrol ağacı “şekil” olmaktan çıkarıp inference sonucu olarak okumanıza yardım eder.
