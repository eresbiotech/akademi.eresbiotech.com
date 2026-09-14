+++
title = "Bir proteinin 3B yapısına bakmak size gerçekten ne kazandırır?"
slug = "protein-3b-yapisi-ne-anlatir"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Protein dizisinden 3B yapıya geçtiğinizde ne kazanırsınız? Residue proximity, active site, pocket, domain, interface ve mutation context'i doğru sınırlarla yorumlayın."
seo_title = "Protein 3B Yapısı Size Ne Anlatır? Yapısal Biyoinformatik"
article_id = "W6-WORKFLOW"
week = "6"
series = ["Reference Hub · Hafta 6"]
categories = ["yapısal-biyoinformatik"]
category_label = "Yapısal biyoinformatik"
answer_first = "Bir protein dizisi size residue'ların **hangi sırada** bulunduğunu gösterir. Üç boyutlu yapı ise bu residue'ların **uzayda nasıl bir araya geldiğini** görmenizi sağlar. Sequence üzerinde birbirinden yüzlerce amino asit uzakta bulunan iki residue, proteinin katlanmasıyla aynı pocket'ın veya structural interface'in yanında konumlanabilir. Buna karşılık sequence üzerinde yan yana bulunan bölgeler farklı yapısal yönelimler gösterebilir. Bu nedenle structure bilgisi özellikle: - active-site çevresi, - olası binding pocket, - residue proximity, - domain organization, - protein–protein interface, - variant/mutation environment gibi sorulara yeni bir spatial context ekleyebilir. EMBL-EBI'nin güncel yapısal biyoinformatik eğitim çerçevesi de sequence ve structure bilgisinin birlikte protein function, interaction ve structural evidence yorumuna taşınmasını alanın temel yetkinliklerinden biri olarak tanımlar. Fakat kritik sınır şudur: **Yapıda bir pocket görmek, ligandın gerçekten bağlandığını kanıtlamaz.** **Bir mutation'ın active site yakınında olması da tek başına fonksiyon kaybını kanıtlamaz.** Structure güçlü bir **hipotez ve bağlam katmanı**dır."
capability_bridge = "Protein modelini ekranda döndürmek kolaydır. Asıl çalışma becerisi: - residue ve domainleri tanımak, - sequence position'ı 3B context'e taşımak, - pocket/interface bilgisini doğru sınırlarda yorumlamak, - experimental ve predicted structure'ı ayırmak, - structural observation'dan kontrollü hipotez üretmektir. **3B yapıyı görmek başka, structure üzerinden bilimsel soru sormak başka bir beceridir.**"
sources = [
  "EMBL-EBI Structural Bioinformatics 2025/2026 materyalleri — experimental/predicted structure interpretation ve research-context yaklaşımı.",
  "EMBL-EBI — Foundations of Protein Structure, Mart 2026 review.",
  "EMBL-EBI — Protein domains: structural, functional ve evolutionary context.",
  "RCSB PDB — Experimental macromolecular complexes ve ligands.",
  "Variant-to-structure review — Spatial mutation context ve sınırları.",
  "AlphaFold DB — Mutation ve complex interpretation limitations.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
product_path = "/post/uygulamali_yapisal_biyoinformatik_ve_in_silico_protein_modelleme/"
product_cta = "Yapısal biyoinformatik çalışma yolunu inceleyin"
+++

## Bu yazıda neler var?

- Sequence bilgisinin neden tek başına spatial ilişkiyi vermediğini
- Residue proximity'nin yapı üzerinde ne kazandırdığını
- Pocket, interface ve domain bilgisinin nasıl kullanılabileceğini
- Mutation'ların structural context içinde nasıl düşünülebileceğini
- Structure'dan fonksiyon çıkarırken nerede durmanız gerektiğini

## Sequence'de uzak, yapıda yakın

Basit bir öğretim örneği düşünelim.

Bir proteinde:

`Residue 45`

ve:

`Residue 183`

sequence üzerinde birbirinden oldukça uzaktır.

Protein katlandığında bu iki residue aynı üç boyutlu bölgenin iki tarafına gelebilir.

Bu durumda sequence alignment tek başına size bu spatial proximity'yi doğrudan göstermeyebilir.

Structure ise iki residue arasındaki uzamsal ilişkiyi görünür hale getirir.

Bu durum şu sorular için önemlidir:

- aynı catalytic pocket'a katkı veriyorlar mı?
- bir ligand çevresinde birleşiyorlar mı?
- aynı domain interface'ine mi yakınlar?
- mutation'lar üç boyutlu bir hotspot oluşturuyor olabilir mi?

Variant interpretation literatüründe de sequence üzerinde birbirinden uzak mutation'ların üç boyutlu yapı içinde yakınlaşarak spatial clusters oluşturabileceği gösterilmiştir. Ancak böyle bir cluster'ın varlığı tek başına mutation mekanizmasını açıklamaz.

## Domain organization ne kazandırır?

Proteinler çoğu zaman tek homojen küre değildir.

Bağımsız veya yarı bağımsız yapısal/işlevsel domainlerden oluşabilirler.

Domain sınırlarını görmek:

- sequence annotation'ı,
- structural fold,
- functional module,
- interaction context

arasında bağlantı kurmaya yardım edebilir.

EMBL-EBI'nin güncel protein-domain materyalleri domainleri structural, functional ve evolutionary kriterlerle düşünmeyi ve intrinsically disordered regions ile ayırmayı temel yorumlama becerilerinden biri olarak tanımlar.

Bir mutation'ın:

**domain core içinde**

olmasıyla:

**uzun flexible linker içinde**

olması aynı structural hypothesis'i doğurmaz.

Ama bu fark hâlâ **hypothesis** düzeyindedir.

## Active site ve binding pocket neden önemlidir?

Bir protein fonksiyonu belirli residue'ların üç boyutlu olarak bir araya geldiği catalytic veya binding bölgelerine dayanabilir.

Structure bu bölgeleri:

- residue composition,
- pocket geometry,
- ligand ilişkisi,
- solvent accessibility

açısından incelemenize olanak verebilir.

Özellikle experimental PDB structure içinde ligand/cofactor bulunuyorsa olası interaction context doğrudan experimental model üzerinden incelenebilir. RCSB PDB, macromolecule'ların küçük molecule ligands, ions, cofactors, inhibitors ve drugs ile komplekslerinin de archive edildiğini belirtir.

Ama burada çok önemli bir sınır vardır:

**Pocket varlığı ≠ gerçek ligand binding kanıtı**

Eğer yalnız predicted structure üzerinde geometrik pocket görüyorsanız bu alan biologically relevant binding site olabilir.

Ya da olmayabilir.

Ek deneysel, biochemical veya comparative evidence gerekir.

## Mutation structure üzerine yerleştirildiğinde ne değişir?

Bir variant sequence seviyesinde yalnız:

**“Position 125'te amino acid değişimi.”**

olarak görülebilir.

Structure üzerinde ise aynı residue için ek sorular sorabilirsiniz:

Core içinde mi?

Surface'ta mı?

Ligand yakınında mı?

Başka chain ile interface'te mi?

Conserved domain içinde mi?

Nearby residue'larla hangi etkileşimleri kurabilir?

Bu bilgiler variant'ın olası etkisi için **mekanistik hipotez üretmeye** yardımcı olabilir.

Ancak:

**mutation location ≠ causal mechanism**

ayrımı korunmalıdır.

Bir mutation active site yakınındaysa:

**“Fonksiyonu bozabilir.”**

hipotezi güçlenebilir.

Fakat:

**“Bu mutation fonksiyonu bozuyor.”**

sonucu için deneysel veya başka bağımsız evidence gerekir.

AlphaFold DB'nin AlphaFold'un mutation effects prediction için valide edilmediğine dair açık uyarısı da bu nedenle önemlidir.

## Protein–protein interface neden structure sorusudur?

Sequence tek başına iki protein yüzeyinin uzayda nasıl karşılaşacağını doğrudan göstermez.

Complex structure veya confident interaction prediction:

- hangi residue'ların interface'e katkı verdiği,
- surface complementarity,
- olası interaction hotspot'ları

hakkında structural context sağlayabilir.

Ancak predicted complex'te de confidence ayrıca değerlendirilmelidir.

AlphaFold DB 2026 complex entries'inde interface confidence için ipTM, ipSAE, pDockQ2 ve LIS gibi tamamlayıcı skorları sunmaktadır; pLDDT tek başına iki chain'in göreli yerleşiminin doğru olduğunu göstermez.

Yani:

**iki proteini modellerde yan yana görmek ≠ interaction proof**

demektir.

## Structure function'ı doğrudan verir mi?

Protein structure ve function güçlü biçimde ilişkilidir.

EMBL-EBI'nin 2026 protein-structure materyalleri de structural architecture, binding sites, dynamics ve interactions'ın function anlamada kritik olduğunu vurgular.

Ama yapı tek başına bütün functional biology değildir.

Function ayrıca:

- cellular localization,
- expression,
- interaction network,
- modification state,
- ligand availability,
- dynamics,
- biological condition

ile ilişkili olabilir.

Dolayısıyla:

**structure → mechanistic context**

çok güçlü olabilir.

Ama:

**structure = complete function**

değildir.

## Bu ne anlama geliyor?

3B structure'a bakmanız özellikle şu durumda değerlidir:

**Sequence'te gördüğünüz bilgiyi spatial bir soruya dönüştürmeniz gerekiyorsa.**

Örneğin:

“Bu iki residue birbirine yakın mı?”

“Mutation catalytic region'a yakın mı?”

“Bu domain başka bir domainle nasıl ilişkileniyor?”

“Variant buried mi surface-exposed mı?”

“Bu residues olası interface oluşturuyor mu?”

Bu sorular structure'dan gerçek ek bilgi kazanır.

Ama her gözlemin sonuna bir kontrol ekleyin:

**“Bunu görüyorum; peki bu gözlem neyi düşündürüyor ve neyi henüz kanıtlamıyor?”**
