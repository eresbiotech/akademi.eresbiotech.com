+++
title = "AlphaFold modeli gördüğünüzde ilk olarak neyi kontrol etmelisiniz?"
slug = "alphafold-modeli-guvenilir-mi-confidence"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "AlphaFold yapısını açtığınızda önce neye bakmalısınız? pLDDT, PAE, düşük güvenli bölgeler, domain yerleşimi ve deneysel kanıtı doğru yorumlayın."
seo_title = "AlphaFold Modeline Güvenilir mi? İlk Kontrol Etmeniz Gerekenler"
article_id = "W6-PROBLEM"
week = "6"
series = ["Reference Hub · Hafta 6"]
categories = ["yapısal-biyoinformatik"]
category_label = "Yapısal biyoinformatik"
answer_first = "Bir AlphaFold modelini açtığınızda ilk bakmanız gereken şey proteinin ne kadar “güzel katlandığı” değildir. **Model confidence dağılımına bakın.** AlphaFold her residue için `pLDDT` adı verilen yerel bir confidence tahmini üretir. Güncel AlphaFold Protein Structure Database rehberine göre yüksek pLDDT değerleri yerel yapının daha güvenilir modellenmiş olmasının beklendiğini, düşük değerler ise koordinatların çok daha dikkatli yorumlanması gerektiğini gösterir. Ancak bu değerler **modelin biyolojik olarak doğru olma yüzdesi değildir.** Birden fazla domain içeren proteinlerde yalnız pLDDT da yetmez. Domainlerin kendi iç yapıları yüksek confidence taşıdığı halde birbirlerine göre konumları belirsiz olabilir. Bunun için Predicted Aligned Error — **PAE** — ayrıca değerlendirilmelidir. Dolayısıyla bir AlphaFold modelini okurken temel sıra: **yerel confidence → domain yapısı → domainlerin göreli konumu → düşük-confidence bölgeler → biyolojik/kompleks bağlam → deneysel evidence** olmalıdır. **“Model var” ile “yapı kesin olarak budur” aynı cümle değildir.**"
capability_bridge = "Bir AlphaFold kaydını açmak birkaç saniye sürer. Asıl çalışma becerisi: - confidence'ın bölgesel olduğunu görmek, - pLDDT ile PAE'yi ayırmak, - disorder/flexibility ihtimalini fark etmek, - biological context'i modelden ayırmak, - prediction ile experimental evidence arasında doğru sınırı kurmaktır. **Modeli görmek başka, modelin ne kadar ileri yorumlanabileceğini bilmek başka bir beceridir.**"
sources = [
  "AlphaFold Protein Structure Database — Güncel pLDDT, PAE ve prediction interpretation rehberi.",
  "Jumper et al., *Highly accurate protein structure prediction with AlphaFold*, Nature, 2021.",
  "Tunyasuvunakool et al., *Highly accurate protein structure prediction for the human proteome*, Nature, 2021 — confidence ve disorder analizi.",
  "EMBL-EBI — AlphaFold DB prediction-page ve confidence eğitim materyalleri.",
  "AlphaFold DB — Güncel model limitations ve complex confidence guidance.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/uygulamali_yapisal_biyoinformatik_ve_in_silico_protein_modelleme/"
product_cta = "Yapısal biyoinformatik çalışma yolunu inceleyin"
+++

## Bu yazıda neler var?

- pLDDT'nin neyi söylediğini ve neyi söylemediğini
- PAE'nin neden ayrıca gerekli olduğunu
- Düşük-confidence bölgelerin nasıl düşünülmesi gerektiğini
- Full-length tahminin neden full biological context anlamına gelmediğini
- AlphaFold modelini yorumlamadan önce uygulanabilecek kısa kontrol akışını

## İlk ayrım: prediction ile observation aynı şey değildir

AlphaFold amino asit dizisinden üç boyutlu koordinatlar tahmin eder.

Bu oldukça güçlü bir computational sonuçtur.

AlphaFold'un CASP14 değerlendirmesindeki başarısı, birçok protein domaininde deneysel yapılara yaklaşan yüksek doğruluk elde edebildiğini göstermiştir. Ancak AlphaFold'un kendi metodoloji makalesi de sonuçları **predicted structures** olarak tanımlar ve confidence tahminlerinin prediction güvenilirliğini değerlendirmek için üretildiğini açıkça belirtir.

Bu nedenle yapıya ilk bakışta:

**“Protein böyle görünüyor.”**

yerine:

**“Model bu bölgeyi bu biçimde tahmin ediyor; prediction confidence ne durumda?”**

demek daha doğru başlangıçtır.

## pLDDT size ne söyler?

pLDDT, AlphaFold'un residue düzeyindeki **yerel yapısal confidence** tahminidir.

AlphaFold DB güncel rehberi şu pratik bantları verir:

| pLDDT | Genel yorum |
|---:|---|
| >90 | Yerel yapı için çok yüksek confidence |
| 70–90 | Genel olarak iyi backbone prediction |
| 50–70 | Düşük confidence; dikkatli yorumlanmalı |
| <50 | Koordinatlar çoğu durumda doğrudan yapısal yorum için uygun değildir |

Bunlar **rules of thumb**'dır; biyolojik kesinlik sınıfları değildir.

Örneğin pLDDT 95 olan bir residue için:

**“Bu residue'ın çevresindeki yerel geometri yüksek confidence ile modellenmiş.”**

demek anlamlıdır.

Fakat:

**“Bu residue'ın gerçek hücresel fonksiyonunu %95 doğrulukla biliyoruz.”**

demek değildir.

AlphaFold DB özellikle confidence skorlarının protein zincirinin tahmin edilen üç boyutlu düzenine yönelik olduğunu, modelin **biyolojik doğruluğuna ilişkin genel bir confidence ölçüsü olmadığını** belirtir.

## Neden yalnız ortalama confidence'a bakmamalısınız?

Bir protein iki iyi modellenmiş domain ile aradaki uzun düşük-confidence linker'dan oluşabilir.

Protein düzeyindeki ortalama skor bu yapısal heterojenliği gizleyebilir.

AlphaFold DB güncel arayüzü de bu nedenle residue-level pLDDT değerlerini model üzerinde ve sequence track'te gösterir.

Örneğin modelin:

- Domain A'sı yüksek confidence,
- Domain B'si yüksek confidence,
- aradaki linker düşük confidence

olabilir.

Bu durumda:

**“Model kötü.”**

demek de,

**“Model tamamen güvenilir.”**

demek de gereğinden fazla kaba olur.

Doğru ifade:

**“Domainlerin yerel yapıları güvenilir görünüyor; linker ve domainlerin birbiriyle ilişkisi ayrıca değerlendirilmeli.”**

olabilir.

## PAE neden gerekli?

pLDDT çoğunlukla **local structure confidence** içindir.

Bir multi-domain proteinde şu sorun kalabilir:

Her iki domain kendi içinde doğru tahmin edilmiş olabilir.

Ama Domain A'nın Domain B'ye göre yönelimi doğru mu?

AlphaFold'un Predicted Aligned Error — PAE — çıktısı bu soruya yardımcı olur.

AlphaFold DB'ye göre iki farklı domain arasındaki residue çiftlerinde düşük PAE değerleri, modelin bu domainlerin göreli konum ve yönelimi konusunda daha confident olduğunu gösterir. Yüksek inter-domain PAE ise göreli domain yerleşiminin yorumlanmaması gerektiğine işaret edebilir.

Yani:

**yüksek pLDDT'li iki domain ≠ güvenilir domain packing**

olabilir.

## Düşük confidence bölge her zaman “yanlış model” midir?

Hayır.

Düşük pLDDT birkaç farklı duruma işaret edebilir.

Örneğin bölge:

- intrinsically disordered olabilir,
- izole halde düzensiz fakat bir partnerle bağlandığında yapı kazanabilir,
- esnek linker olabilir,
- modelin yeterli bilgiye sahip olmadığı bir bölge olabilir.

AlphaFold'un insan proteomu çalışması düşük-confidence residue'ların önemli bir bölümünün disorder ile ilişkili olabileceğini göstermiş, ancak bunların bir kısmının yalnız bir kompleks içinde yapı kazanan bölgeler olabileceğini de özellikle belirtmiştir.

AlphaFold DB de pLDDT <50 bölgelerin sıklıkla disorder ile ilişkili olduğunu fakat modelin farklı olası konformasyonların dağılımını vermediğini açıkça söyler.

Bu yüzden:

**low confidence ≠ meaningless**

ve:

**low confidence ≠ belirli bir disorder mekanizmasının kesin kanıtı**

olmalıdır.

Bazen düşük confidence'ın kendisi biyolojik olarak ilginç bir ipucudur.

## Monomer yapısı biyolojik durumun tamamı değildir

Bir protein hücre içinde yalnız çalışmak zorunda değildir.

Partner proteinlerle, DNA/RNA ile, membranla, ligandlarla, metal iyonlarıyla veya post-translational modification'larla ilişkili olabilir.

AlphaFold DB'nin monomer predictions hakkında verdiği önemli sınırlamalardan biri, standart tahminin deneysel yapılarda görülebilecek:

- cofactors,
- metals,
- ligands,
- ions,
- DNA/RNA,
- post-translational modifications

gibi protein dışı bileşenlerin konumlarını modellememesidir.

Ayrıca 2026 itibarıyla AlphaFold DB'de predicted complexes için ayrı kaynaklar da vardır; complex yorumunda pLDDT'nin yanında chain-interface ve relative-placement confidence ölçümleri önem kazanır.

Dolayısıyla:

**yüksek-confidence monomer modeli ≠ proteinin bütün functional state'inin modellenmesi**

demektir.

## Mutasyon etkisini model görüntüsünden doğrudan okuyabilir misiniz?

Temkinli olun.

Bir mutation'ı yapı üzerine yerleştirmek:

- pocket yakınlığı,
- interface yakınlığı,
- buried/exposed context

gibi yapısal hipotezler üretmek için yararlı olabilir.

Ancak AlphaFold DB açıkça AlphaFold'un mutation effect prediction için validate edilmediğini ve destabilizing bir mutation verildiğinde proteini mutlaka unfolded göstereceğinin beklenmemesi gerektiğini belirtir.

Bu nedenle:

**“Mutation bu helix üzerinde; dolayısıyla protein bozulur.”**

gibi doğrudan nedensel sonuçlar model görüntüsünden tek başına çıkarılmamalıdır.

## Bu ne anlama geliyor?

Bir AlphaFold modeli açtığınızda şu sırayı kullanabilirsiniz:

**1. Sequence doğru mu?**\
Doğru protein/isoform kaydına mı bakıyorum?

**2. pLDDT dağılımı nasıl?**\
Hangi region'lar güvenilir, hangileri düşük confidence?

**3. Domainler nerede?**\
Model tek domain mi, multi-domain mi?

**4. PAE ne gösteriyor?**\
Domainlerin birbirlerine göre konumu gerçekten confident mı?

**5. Düşük-confidence bölgeler ne olabilir?**\
Flexible/disordered/context-dependent olabilir mi?

**6. Protein hangi biological state içinde çalışıyor?**\
Partner, ligand, membrane veya başka component gerekiyor mu?

**7. Deneysel structure/evidence var mı?**

Bu kontrollerden sonra model biyolojik sorunuz için çok daha güvenli bir çalışma yüzeyine dönüşür.
