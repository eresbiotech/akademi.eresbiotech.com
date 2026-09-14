+++
title = "Tekrarlanabilir bir biyoinformatik analiz için hangi bilgileri kaydetmelisiniz?"
slug = "reproducible-bioinformatics-workflow"
date = "2026-09-14"
lastmod = "2026-09-14"
draft = false
type = "reference"
layout = "reference"
author = "ERES Biyoinformatik Akademi"
description = "Script dosyasını saklamak yeterli mi? Data accession, metadata, software version, parameters, reference genome, environment ve output provenance’ını nasıl kaydedeceğinizi görün."
seo_title = "Reproducible Biyoinformatik Workflow İçin Neleri Kaydetmelisiniz?"
article_id = "W8-WORKFLOW"
week = "8"
series = ["Reference Hub · Hafta 8"]
categories = ["ai,-doğrulama-ve-reproducibility"]
category_label = "AI, doğrulama ve reproducibility"
answer_first = "Üç ay önce yaptığınız analizin elinizde yalnız: `final_results.csv` dosyası kaldıysa analiz sonucunu saklamış olabilirsiniz. Ama workflow’u saklamış sayılmazsınız. Bir computational analysis’in yeniden kurulabilmesi için yalnız code değil, sonuç dosyasına giden **provenance zincirinin** korunması gerekir. Bu zincir bağlama göre: - input data ve source/accession, - sample metadata, - software ve package versions, - reference genome/annotation version, - parameters, - filtering rules, - random seed, - code/notebook/workflow, - computational environment, - output-generation adımları gibi katmanları içerebilir. Güncel bioinformatics reproducibility literatürü reproducible computational research için code, environment, data, documentation ve version control’ün birlikte ele alınmasını öneriyor. FAIR workflow framework’leri de workflow specification ile gerçek workflow run’ını; input, parameter, output ve provenance kayıtlarıyla birlikte ayrı dijital nesneler olarak ele alıyor. Ana kural basit: **“Ne yaptığımı hatırlıyorum” bir provenance sistemi değildir.**"
capability_bridge = "Bir analizi bir kez bitirmek başka; aynı workflow’u: - açıklanabilir, - izlenebilir, - review edilebilir, - yeniden kurulabilir hale getirmek başka bir çalışma becerisidir. Bu beceri özellikle R ve daha karmaşık computational workflows’a geçtikçe giderek daha önemli hale gelir."
sources = [
  "Ziemann et al. — Bioinformatics reproducibility’nin beş temel katmanı.",
  "FAIR computational workflows — specification, run, input, parameter ve provenance modeli.",
  "Metadata and reproducible computational research review.",
  "`renv` official documentation — exact package-version lockfile ve project environments.",
  "R `sessioninfo` current CRAN package.",
  "Galaxy official training — histories record tool versions/parameters and can become workflows.",
  "2026 bioinformatics pipeline reproducibility review.",
]
sitemap = { priority = 0.6, changefreq = "monthly" }
+++

## Üç ay sonra aynı analizi yapabilir misiniz?

Kendinize şu senaryoyu verin:

Bilgisayarınızı değiştirdiniz.

Projenin ayrıntılarını unuttunuz.

Size yalnız proje klasörünüz verildi.

Şu soruları cevaplayabilir misiniz?

Hangi GEO/GEO accession kullanıldı?

Hangi Sample’lar dışarıda bırakıldı?

Reference genome GRCh38’in hangi assembly/annotation release’i kullanıldı?

Hangi DESeq2 version’ı kullanıldı?

Hangi design formula kullanıldı?

Filtering threshold neydi?

Final figure hangi script’le üretildi?

Eğer cevapların önemli kısmı belleğinizdeyse reproducibility kırılgandır.

Eğer proje dosyalarından çıkarılabiliyorsa çok daha güçlüdür.

## 1. Input data: “data.csv” yeterli bir isim değildir

Input’un kaynağını kaydedin.

Public dataset ise:

**accession / persistent identifier**

önemlidir.

Örneğin:

GSE accession,

SRA accession,

PDB ID,

UniProt accession

gibi.

Local data ise:

raw data’nın immutable bir kopyası veya checksum gibi ek kayıtlar yararlı olabilir.

Ayrıca yalnız dosyanın nereden geldiği değil:

**hangi sürümünün kullanıldığı**

da önemli olabilir.

Bir database record zaman içinde güncellenebilir.

## 2. Sample metadata ve selection kararlarını saklayın

Bir analizde:

20 sample vardı,

ama 16 tanesini kullandınız.

Neden?

QC?

Eksik metadata?

Yanlış tissue?

Study design?

Bu selection bir analysis decision’dır.

Yalnız final count matrix’i saklarsanız “hangi Sample niçin yok?” sorusunun cevabı kaybolabilir.

Week 3–4’te gördüğümüz gibi metadata analiz design’ının parçasıdır.

Dolayısıyla reproducibility için:

**measurement data + sample context + selection logic**

birlikte korunmalıdır.

## 3. Reference genome ve annotation version önemli olabilir

Şunu yazmak:

`human genome`

yeterli değildir.

Hatta bazen:

`GRCh38`

de tek başına yeterli olmayabilir.

Kullandığınız annotation release:

Gene/transcript definitions,

coordinates,

feature counts

gibi downstream sonuçları değiştirebilir.

Dolayısıyla genomics workflow’da bağlama göre:

- assembly,
- reference fasta,
- gene annotation version,
- source database

kaydının tutulması gerekir.

Bu, Week 2’deki “database representation ≠ biological object” ayrımının reproducibility karşılığıdır.

## 4. Software adı değil, version’ı da kaydedin

“R kullandım.”

yetmez.

“DESeq2 kullandım.”

da uzun vadede yeterli olmayabilir.

Software davranışı, default parameters ve dependency’ler değişebilir.

R projelerinde `renv` tam olarak bu problemi azaltmak için project-specific package environment ve exact package versions kaydeden lockfile yaklaşımı sunar. Güncel resmi dokümantasyonda amaç projeyi isolated, portable ve reproducible hale getirmek olarak açıklanır.

Basit bir alternatif kayıt da:

`sessionInfo()`

veya daha ayrıntılı `sessioninfo` çıktısı saklamaktır. Güncel `sessioninfo` paketi R session ve installed package kaynak/version bilgisini raporlamak için kullanılabilir.

Bu tek başına bütün reproducibility problemi çözmez.

Ama environment provenance’ı açısından güçlü bir katmandır.

## 5. Parameters ve defaults kaybolmasın

Bir script’te parameter açık biçimde yazılıysa kayıt kolaylaşır.

Ama GUI workflow’da:

hangi cutoff,

hangi model,

hangi option

seçtiğinizi daha sonra unutabilirsiniz.

Bu nedenle kullandığınız platform provenance kaydı tutabiliyorsa bundan yararlanın.

Galaxy’nin history sistemi kullanılan:

- tools,
- tool versions,
- inputs,
- parameters,
- outputs

bilgisini saklar ve bir analysis history’den reusable workflow çıkarılmasına izin verir.

Bu güzel bir örnektir:

**Reproducibility yalnız code tabanlı olmak zorunda değildir.**

Önemli olan workflow decisions’ın izlenebilir olmasıdır.

## 6. Filtering kurallarını açıklayın

Şu script satırı:

`filter(x > 10)`

teknik olarak reproducible olabilir.

Ama neden `10`?

Literatür mü?

QC distribution mı?

Sensitivity analysis mı?

Tutorial’dan mı alındı?

Analytical decision’ın rationale’ını kaydetmek, code’u yeniden çalıştırmanın ötesinde **workflow’u anlamayı** sağlar.

Reproducibility metadata literatürü de yalnız computational objects değil, bunların scientific context ve provenance metadata’sının önemli olduğunu vurgular.

## 7. Randomness varsa seed kaydedin

Her workflow deterministic değildir.

Random initialization veya stochastic algorithms kullanan analyses’de aynı seed veya random-state control gerekebilir.

Örneğin:

- subsampling,
- some clustering workflows,
- simulations,
- stochastic training

bağlama göre random seed taşıyabilir.

Ancak seed kaydetmek:

**bütün platformlarda birebir bitwise-identical output garantisi**

değildir.

Software/hardware/environment farkları yine etkili olabilir.

Ama stochastic provenance’ın gerekli bir parçası olabilir.

## 8. Code’u saklamak yeterli değil; code’un hangi data üzerinde çalıştığını bağlayın

Bir script şöyle başlayabilir:

`read.csv("~/Desktop/data_final2.csv")`

Üç ay sonra `data_final2.csv` hangisiydi?

Bu sorun scientific programming’de son derece yaygındır.

Daha güçlü proje yapısı:

relative paths,

clear directory structure,

README,

input/output ayrımı,

version control

gibi yöntemlerle workflow lineage’ını görünür yapar.

Computational reproducibility için önerilen “five pillars” yaklaşımı literate programming, version control, environment control, persistent data sharing ve documentation’ın birlikte kullanılmasını önerir.

## 9. Manual adımları unutmayın

En tehlikeli reproducibility boşluklarından biri:

**kod dışında yaptığınız küçük manuel işlemlerdir.**

Excel’de iki satır sildiniz.

Dosyayı elle rename ettiniz.

GEO2R’da dört Sample seçtiniz.

Bir structure viewer’da yalnız Chain A’yı export ettiniz.

Alignment’dan manuel region çıkardınız.

Bu kararlar kaydedilmezse script’iniz çalışsa bile gerçek workflow tam olarak yeniden kurulamaz.

FAIR workflow yaklaşımı provenance’ın yalnız static workflow definition değil, gerçekleşmiş workflow run’ındaki input, output, parameter ve lineage bilgisini de kapsamasını öneriyor.

Bu nedenle manuel adım yaptıysanız:

**onu da method haline getirin.**

En azından kaydedin.

Mümkünse kodlaştırın veya workflow history içinde tutun.

## 10. Outputs’u da hangi input/run’ın ürettiğiyle bağlayın

`volcano.png`

dosyasının varlığı yeterli değildir.

Hangi run?

Hangi contrast?

Hangi filtered dataset?

Hangi parameter?

Hangi script version?

İdeal sistemde figure/table:

**source data + code + environment + parameter**

zincirine geri izlenebilir.

Bu nedenle final output naming ve provenance da analysis design’ın parçasıdır.

## Minimal analysis record nasıl görünebilir?

Her proje için ağır infrastructure gerekmez.

Basit bir minimum kayıt bile çok değerlidir.

## Cloud notebook varsa problem çözülmüş müdür?

Hayır.

Notebook yararlıdır çünkü code + narrative + output’u tek yerde tutabilir.

Ama yine de:

Package versions?

External data?

Reference files?

Hidden manual steps?

Deleted cloud environment?

Service changes?

gibi problemler devam edebilir.

**Notebook = güçlü provenance surface**

olabilir.

Ama:

**notebook = automatic permanent reproducibility**

değildir.

## “Can you rerun this?” testi

Projeyi kapatın ve şu düşünce deneyini yapın:

Başka bir araştırmacı yalnız proje klasörünü aldı.

Şunları yapabilir mi?

Raw input’u bulabilir mi?

Sample’ları tanıyabilir mi?

Software environment’ı yeniden kurabilir mi?

Parameter choices’ı görebilir mi?

Script’i baştan çalıştırabilir mi?

Final figure’ı yeniden üretebilir mi?

Nelerin manuel yapıldığını görebilir mi?

## Reproducible ile scientifically correct aynı şey değil

Bu ayrımı Week 8’in kapanışında tekrar görmek önemli.

Mükemmel provenance’a sahip yanlış analysis mümkündür.

Ama provenance varsa:

yanlış decision’ı bulmak,

review etmek,

değiştirmek,

yeniden çalıştırmak

çok daha kolaydır.

Bu nedenle reproducibility:

**scientific validity’nin yerine geçmez.**

Scientific validation’ı mümkün kılan altyapıyı güçlendirir.

## Bu ne anlama geliyor?

Biyoinformatik workflow’unuzu yalnız şu soruyla bitirmeyin:

**“Sonucu aldım mı?”**

Şunu da sorun:

**“Bu sonuca nasıl ulaştığımı altı ay sonra yeniden kurabilir miyim?”**

Analysis’in gerçek ürünü yalnız:

`results.csv`

değildir.

Aynı zamanda:

**results.csv’ye giden izlenebilir bilimsel yoldur.**
