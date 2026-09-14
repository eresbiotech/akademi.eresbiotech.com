+++
title = "Bootstrap değeri ne anlatır, ne anlatmaz?"
slug = "filogenetik-bootstrap-degeri"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Bootstrap 100 ağacın kesin doğru olduğu anlamına mı gelir? Phylogenetic bootstrap resampling, branch support ve yorum sınırlarını öğrenin."
seo_title = "Filogenetik Bootstrap Değeri Nedir ve Nasıl Yorumlanır?"
article_id = "W7-DECISION"
week = "7"
series = ["Reference Hub · Hafta 7"]
categories = ["filogenetik"]
category_label = "Filogenetik"
answer_first = "Filogenetik ağacınızda bir branch yanında `100` bootstrap görmek: **“Bu clade’in doğru olma ihtimali %100.”** anlamına gelmez. Klasik nonparametric phylogenetic bootstrap’ın temel mantığı, alignment’daki character columns’ı replacement ile tekrar örnekleyerek çok sayıda pseudo-replicate dataset oluşturmaktır. Her replicate üzerinden yeniden tree inference yapılır ve belirli bir split/clade’in bu replicate tree’lerde ne sıklıkta tekrar elde edildiğine bakılır. Bu yaklaşım Felsenstein’ın 1985 tarihli klasik çalışmasıyla phylogenetics’e yerleşmiştir. Dolayısıyla bootstrap değeri en güvenli biçimde: **“Bu split, bu veri ve analiz prosedürünün resampling perturbasyonları altında ne kadar istikrarlı?”** sorusuna verilen support ölçüsü olarak okunmalıdır. Güncel methodological reviews özellikle bootstrap proportion’ın “tree’nin doğru olma olasılığı” şeklinde basit bir probability interpretation’ına sahip olmadığını vurgular."
capability_bridge = "Bootstrap değerini ağacın üzerinde okumak kolaydır. Asıl filogenetik çalışma becerisi: - hangi branch’in desteklendiğini görmek, - support metric’lerini ayırmak, - resampling mantığını anlamak, - high support’u systematic correctness ile karıştırmamak, - support’u alignment ve model kalitesiyle birlikte değerlendirmektir. **Support değerini görmek başka, o değerin ne kadar ileri yorumlanabileceğini bilmek başka bir beceridir.**"
sources = [
  "Felsenstein 1985 — Phylogenetic nonparametric bootstrap’ın klasik tanımı.",
  "*Evolving View of Phylogenetic Support* — bootstrap interpretation ve threshold nüansları.",
  "Phylogenomics design guide — high support’un accurate tree garantisi vermemesi.",
  "Guindon et al. 2010 — PhyML 3.0 ve branch-support yöntemleri.",
  "Branch-support methodology survey — bootstrap, aLRT ve SH-aLRT gibi farklı support metrikleri.",
  "Tree-viewer support-value review — support değerlerinin branch/split association’ı.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/phyml-uygulamali-filogenetik-egitimi/"
product_cta = "Filogenetik çalışma yolunu inceleyin"
+++

## Bu yazıda neler var?

- Bootstrap resampling’in basit mantığı
- Support değerinin ağacın hangi parçasına ait olduğu
- Bootstrap 100’ün neden “kesin doğru” olmadığı
- Düşük support’un nasıl düşünülmesi gerektiği
- Sabit 70/90/100 eşiklerinin neden temkinli kullanılması gerektiği
- phyML çıktılarında farklı support metriklerinin neden karıştırılmaması gerektiği

## Bootstrap neyi yeniden örnekler?

Bir multiple sequence alignment’ın şöyle olduğunu düşünelim:

1000 alignment column.

Nonparametric bootstrap’ta bu sütunlardan yine 1000 sütunluk yeni bir pseudo-alignment oluşturulur.

Ama sampling **replacement ile** yapılır.

Bu yüzden bazı original columns:

- birden fazla kez seçilir,
- bazıları hiç seçilmez.

Sonra bu pseudo-alignment üzerinde yeniden tree inference yapılır.

Bu işlem örneğin yüzlerce kez tekrarlanabilir.

Son olarak original tree’deki belirli bir split’in bootstrap replicate tree’lerde kaç kez bulunduğu hesaplanır.

Felsenstein’ın orijinal yaklaşımı character resampling’i tam olarak bu biçimde tanımlar.

## Bootstrap bütün ağacın tek skoru mudur?

Hayır.

Bootstrap support belirli **splits/branches/clades** ile ilişkilidir.

Bir tree’de:

- bir branch %98 support,
- başka biri %61,
- başka biri %35

taşıyabilir.

Dolayısıyla:

**“Bu tree’nin bootstrap’ı 90.”**

demek çoğu durumda aşırı kaba bir ifadedir.

Her internal split ayrı uncertainty taşıyabilir.

Tree-viewer formatlarında support değerleri sıklıkla internal-node label gibi görsel olarak yazılsa da metodolojik olarak bunların branch/split desteğini temsil ettiğine dikkat edilmelidir.

## Bootstrap 100 ne anlama gelir?

En sade operational anlamıyla:

**ilgili split kullanılan bootstrap replicate setinde her seferinde geri kazanılmıştır.**

Bu güçlü **resampling stability** sinyalidir.

Ama şu anlamlara gelmez:

- evolutionary history kesinlikle budur,
- alignment kusursuzdur,
- substitution model doğrudur,
- doğru gene/ortholog set’i seçilmiştir,
- sampling bias yoktur,
- gene tree species tree ile aynıdır.

Phylogenomics literatüründe büyük dataset’lerin yanlış veya misspecified analyses altında bile son derece yüksek branch support üretebildiği açıkça gösterilmiştir.

Yani yüksek support:

**random sampling uncertainty’nin düşük göründüğünü**

söyleyebilir.

Ama **systematic error** sorununu otomatik olarak çözmez.

## Yanlış model + yüksek bootstrap mümkün mü?

Evet.

Eğer veri güçlü ve sistematik biçimde belirli bir topology’yi destekliyorsa bootstrap replicate’ları da aynı biased signal’i tekrar tekrar taşıyabilir.

Örneğin:

- model misspecification,
- long-branch attraction,
- compositional bias,
- alignment artefact

gibi problemler doğru şekilde ele alınmadığında yüksek support yanlış topology üzerinde yoğunlaşabilir.

Modern phylogenomics reviews bu nedenle high support ile accuracy’nin eşitlenmemesi gerektiğini özellikle vurgular.

Bu Week 7’nin önceki yazılarıyla doğrudan bağlantılıdır:

**Kötü alignment’a bootstrap uygulamak alignment’ı düzeltmez.**

## Düşük bootstrap “clade yanlış” mı demektir?

Hayır.

Düşük support daha çok:

**bu split’in mevcut character sampling/resampling altında istikrarlı biçimde geri gelmediğini**

gösterir.

Bunun birçok nedeni olabilir:

- az informative sites,
- conflicting signal,
- kısa internal branch,
- yetersiz taxon sampling,
- alignment uncertainty,
- rapid radiation,
- farklı evolutionary histories.

Dolayısıyla düşük support:

**temkinli yorum**

gerektirir.

Ama doğrudan:

**“Bu clade yanlıştır.”**

demek değildir.

Alternatif topologies mevcut veri altında benzer destek alıyor olabilir.

## “70 üzeri iyidir” kuralı nereden geliyor?

Phylogenetics literatüründe `%70 bootstrap` uzun süre yaygın rule-of-thumb olarak kullanılmıştır.

Ancak güncel support-methodology review’leri bu değerin belirli simulation/example koşullarından türediğini ve evrensel doğal sınır olmadığını açıkça belirtir.

Bu nedenle:

`69 = kötü`

`70 = doğru`

gibi keskin bir biologically meaningful eşik yoktur.

Support değerlendirmesi:

- dataset büyüklüğü,
- branch length,
- taxon sampling,
- kullanılan bootstrap çeşidi,
- inference method

gibi bağlama göre düşünülmelidir.

**Cutoff ezberlemek yerine support’un ne ölçtüğünü anlamak daha önemlidir.**

## Bootstrap ile Bayesian posterior aynı şey mi?

Hayır.

Aynı şekilde bootstrap:

- aLRT,
- SH-aLRT,
- Bayesian posterior probability

ile de aynı metric değildir.

Bunların mathematical assumptions ve interpretations farklıdır.

PhyML 3.0 klasik nonparametric bootstrap’ın yanında approximate likelihood-ratio temelli branch-support yöntemleri de sunmuştur.

Dolayısıyla bir ağaç üzerinde `95` gördüğünüzde önce:

**“Bu değer hangi support metric?”**

diye sorun.

Aksi halde farklı yöntemlerden gelen sayıları aynı scale ve anlamdaymış gibi karşılaştırabilirsiniz.

## Model ve alignment’ı support’tan önce düşünün

Bootstrap interpretation’ın en büyük tuzaklarından biri:

**support değerine bütün upstream QA görevlerini devretmektir.**

Oysa support’a gelmeden önce:

Sequence sampling doğru mu?

Alignment güvenilir mi?

Substitution model uygun mu?

Tree search yeterli mi?

Gene history ile species history aynı şey mi?

gibi sorular hâlâ vardır.

Bootstrap bu katmanların yerine geçmez.

Onlardan **sonra gelen uncertainty/support katmanlarından biridir.**

## Bootstrap değerini nasıl okuyabilirsiniz?

Bir branch yanında support gördüğünüzde:

**1. Metric nedir?**\
Standard bootstrap mı, ultrafast bootstrap mı, SH-aLRT mı, başka bir metric mi?

**2. Hangi split’e ait?**

**3. Alignment nasıl?**

**4. Model ne?**

**5. Taxon/gene sampling yeterli mi?**

**6. Aynı region’daki komşu branches nasıl destekleniyor?**

**7. Sonuç biological context ile tutarlı mı?**

## Bu ne anlama geliyor?

Bootstrap 100 gördüğünüzde:

**“Kesin doğru.”**

demek yerine:

**“Bu split, kullandığım bootstrap procedure altında son derece stabil. Şimdi alignment, model ve sampling’in bu signal’i güvenilir biçimde temsil edip etmediğini kontrol etmeliyim.”**

demek daha doğrudur.

Düşük support gördüğünüzde ise:

**“Yanlış.”**

yerine:

**“Bu split için mevcut veri güçlü ve stabil bir çözüm vermiyor; alternative relationships’i temkinli değerlendirmeliyim.”**

demek daha bilimsel bir yorumdur.
