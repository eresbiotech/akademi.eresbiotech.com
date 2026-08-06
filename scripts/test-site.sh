#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
hugo_bin="${HUGO_BIN:-hugo}"
created_build_dir=false
zero_capacity_repo=""

if [[ -n "${BUILD_DIR:-}" ]]; then
  build_dir="$BUILD_DIR"
else
  build_dir="$(mktemp -d "${TMPDIR:-/tmp}/eres-akademi-build.XXXXXX")"
  created_build_dir=true
fi

cleanup() {
  if [[ "$created_build_dir" == true ]]; then
    rm -rf "$build_dir"
  fi
  if [[ -n "$zero_capacity_repo" ]]; then
    rm -rf "$zero_capacity_repo"
  fi
}
trap cleanup EXIT

"$hugo_bin" --source "$repo_dir" --minify --destination "$build_dir"

assert_absent() {
  local phrase="$1"
  if rg -F -l --glob '*.html' --glob '!bioexpo-2026-destekli-kayit/index.html' "$phrase" "$build_dir"; then
    echo "Forbidden campaign text found: $phrase" >&2
    exit 1
  fi
}

assert_file_absent() {
  local file="$1"
  local phrase="$2"
  if rg -F -q "$phrase" "$file"; then
    echo "Unexpected text in $file: $phrase" >&2
    exit 1
  fi
}

assert_file_absent_regex() {
  local file="$1"
  local pattern="$2"
  if rg --pcre2 -U -q "$pattern" "$file"; then
    echo "Unexpected pattern in $file: $pattern" >&2
    exit 1
  fi
}

assert_file_contains_regex() {
  local file="$1"
  local pattern="$2"
  if ! rg --pcre2 -U -q "$pattern" "$file"; then
    echo "Missing expected pattern in $file: $pattern" >&2
    exit 1
  fi
}

for phrase in \
  'SON 2 GÜN' \
  'SON 2 DESTEKLİ KONTENJAN' \
  '16 Temmuz saat 23.59' \
  'BioExpo destekli ücret' \
  '%50 destekli öğrenci kaydını tamamla' \
  '%50 destekli profesyonel kaydı tamamla'; do
  assert_absent "$phrase"
done

course_slugs=(
  biyoinformatik-icin-r-programlama
  biyoinformatik-giris-egitim-buyuk-veri-kurs
  biyoinformatik-veritabanlari-araclar-egitimi
  ncbi-ensembl-ucsc-genom-tarayicisi-uygulamali-egitim
  tek-hucre-rna-seq-analizi-egitimi
  uygulamali_yapisal_biyoinformatik_ve_in_silico_protein_modelleme
  phyml-uygulamali-filogenetik-egitimi
)

checkout_expectations=(
  "biyoinformatik-icin-r-programlama|https://kampus.eresbiotech.com/order?link=YD8vn&pricing_plan=a6zY3gmEGq|https://kampus.eresbiotech.com/order?link=YD8vn&pricing_plan=PjWlKdY4Gv"
  "biyoinformatik-giris-egitim-buyuk-veri-kurs|https://kampus.eresbiotech.com/order?link=SB3Oz&pricing_plan=MrW6dLmgBN|https://kampus.eresbiotech.com/order?link=SB3Oz&pricing_plan=bZz2M7y2Wr"
  "biyoinformatik-veritabanlari-araclar-egitimi|https://kampus.eresbiotech.com/order?link=G8fph&pricing_plan=1QW9lMoEG6|https://kampus.eresbiotech.com/order?link=G8fph&pricing_plan=20zAXvowWr"
  "ncbi-ensembl-ucsc-genom-tarayicisi-uygulamali-egitim|https://kampus.eresbiotech.com/order?link=xedXE&pricing_plan=a6zY3Ew1Gq|https://kampus.eresbiotech.com/order?link=xedXE&pricing_plan=91zw82LVBL"
  "tek-hucre-rna-seq-analizi-egitimi|https://kampus.eresbiotech.com/order?link=Zk1nE&pricing_plan=Q9zO5NYwGx|https://kampus.eresbiotech.com/order?link=Zk1nE&pricing_plan=w9B35d4dWR"
  "uygulamali_yapisal_biyoinformatik_ve_in_silico_protein_modelleme|https://kampus.eresbiotech.com/order?link=YOeiS&pricing_plan=3ZGX9q8QWq|https://kampus.eresbiotech.com/order?link=YOeiS&pricing_plan=PjWlK3k3Gv"
  "phyml-uygulamali-filogenetik-egitimi|https://kampus.eresbiotech.com/order?link=8y1M3&pricing_plan=YLBN50Y8zK|https://kampus.eresbiotech.com/order?link=8y1M3&pricing_plan=bxGaMqvpGD"
)

for slug in "${course_slugs[@]}"; do
  page="$build_dir/post/$slug/index.html"
  source="$repo_dir/content/post/$slug.md"
  [[ -f "$page" ]] || { echo "Missing generated page: $page" >&2; exit 1; }
  rg -F -q 'employee_plan_label = "Profesyonel"' "$source"
  assert_file_absent "$page" 'data-bioexpo-active'
  assert_file_absent "$page" 'BioExpo 2026 destekli kayıt'
  assert_file_absent "$page" 'QR kodlu ve doğrulanabilir'
  assert_file_absent "$page" 'başarı sertifikası'
  assert_file_absent "$page" 'zorunlu ödev'
  assert_file_absent "$page" 'zorunlu quiz'

  expected_checkout=""
  for entry in "${checkout_expectations[@]}"; do
    if [[ "$entry" == "$slug"'|'* ]]; then
      expected_checkout="$entry"
      break
    fi
  done
  [[ -n "$expected_checkout" ]] || { echo "Missing checkout expectation for $slug" >&2; exit 1; }
  IFS='|' read -r _ student_checkout employee_checkout <<< "$expected_checkout"
  student_checkout_html="${student_checkout//&/&amp;}"
  employee_checkout_html="${employee_checkout//&/&amp;}"
  rg -F -q "href=\"$student_checkout_html\"" "$page"
  rg -F -q "href=\"$employee_checkout_html\"" "$page"

  for plan in student employee; do
    if ! rg -q "<a[^>]+href=[\"']?https://kampus\\.eresbiotech\\.com/order\\?[^>]+data-course=[\"']?$slug[\"']?[^>]+data-plan=[\"']?$plan[\"']?[^>]*>" "$page"; then
      echo "Missing visible $plan checkout CTA for $slug" >&2
      exit 1
    fi
  done

  assert_file_contains_regex "$page" "<a(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*aria-label=)[^>]*>"
  assert_file_absent_regex "$page" "<a(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*(?:hidden|style=[\"'][^\"']*display\\s*:\\s*none))[^>]*>"
  assert_file_absent_regex "$page" "<a(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*target=[\"']?_blank)[^>]*>"
  rg -F -q 'Bu programla başlayın' "$page"
  rg -F -q 'Size uygun erişimi seçin' "$page"
  rg -F -q 'Şimdi başlayın' "$page"
  rg -F -q 'Erişim seçeneğinizi seçin' "$page"
  rg -F -q 'Öğrenci erişimiyle başlayın' "$page"
  rg -F -q 'Profesyonel erişimiyle başlayın' "$page"
  rg -F -q 'Bu çalışma programı, yetişkin kullanıcılar için kendi hızında kullanılabilen dijital bilimsel içerikler ve çalışma kaynaklarından oluşur.' "$page"
  rg -F -q 'Diploma, mesleki yeterlilik veya kamu kurumu onayı sağlamaz.' "$page"
  rg -F -q 'Zorunlu devam, sınav, geçti-kaldı değerlendirmesi ve kişiye özel proje danışmanlığı içermez.' "$page"
  assert_file_absent "$page" 'Kayıt seçeneklerini görün'
done

home_page="$build_dir/index.html"
[[ -f "$home_page" ]] || { echo "Missing generated home page" >&2; exit 1; }

flash_campaign_config="$repo_dir/data/flash_campaign.yaml"
rg -F -q 'enabled: true' "$flash_campaign_config"
rg -F -q 'ends_at: "2026-08-06T23:59:00+03:00"' "$flash_campaign_config"
for phrase in \
  'YALNIZCA BU GECE' \
  '3 BİYOİNFORMATİK PROGRAMI' \
  '%60 NATURALOGIC DESTEĞİYLE' \
  'Üç programa kaydolduğunuz anda erişin ve hemen çalışmaya başlayın. Pakete NaturaLogic Anadolu Doğa Atlası’ndan özel uygulamalar da eklenecek.' \
  'Biyoinformatiğe Giriş ve Büyük Veri + R Programlama + Tek Hücre RNA-Seq' \
  '10.900 TL' \
  '4.360' \
  '16.900 TL' \
  '6.760' \
  'Kapanışa kalan süre' \
  'BU GECE 23.59’DA BİTİYOR' \
  'Kontenjanlar dolarsa kampanya daha erken kapanır.' \
  'Ödemenizi tamamladığınız anda mevcut üç programa erişebilir ve derslere hemen başlayabilirsiniz.'; do
  rg -F -q "$phrase" "$home_page"
done
[[ "$(rg -o 'Yalnızca 5 kişilik kontenjan' "$home_page" | wc -l | tr -d ' ')" == "2" ]] || { echo "Flash campaign must contain two five-person capacity notices" >&2; exit 1; }
rg -F -q 'href="https://kampus.eresbiotech.com/order?link=rl3b5&amp;pricing_plan=ANzp0Zx9zX" data-flash-checkout data-event=flash_student_checkout' "$home_page"
rg -F -q 'href="https://kampus.eresbiotech.com/order?link=rl3b5&amp;pricing_plan=ZjBLY8KbGm" data-flash-checkout data-event=flash_professional_checkout' "$home_page"
assert_file_absent_regex "$home_page" '<a(?=[^>]*data-flash-checkout)(?=[^>]*target=)[^>]*>'
rg -F -q 'section.dataset.flashCampaignState = "ended"' "$repo_dir/static/js/flash-campaign.js"
rg -F -q 'checkout.removeAttribute("href")' "$repo_dir/static/js/flash-campaign.js"
rg -F -q 'js/flash-campaign.js?v=20260806-2' "$home_page"

for phrase in \
  'ERES Biyoinformatik Çalışma Programları' \
  'Biyoinformatikte kendi hızınızda, adım adım ilerleyin.' \
  'Başlangıçtan ileri uygulamalara uzanan; açıklamalı anlatımlar, çalışma dosyaları ve araştırma pratiğine yakın örneklerle yapılandırılmış programlar.' \
  'Bugün başlayın' \
  'Tüm programları karşılaştırın' \
  'Çalışma programları' \
  'Başlamak istediğiniz programı seçin.' \
  'Size uygun erişim seçeneğinden güvenli ödeme adımına doğrudan geçin.' \
  'Program koleksiyonu' \
  'Tüm asenkron biyoinformatik programlarına tek erişim' \
  '%50 paket avantajı' \
  'Toplu erişimi başlatın' \
  'Tekil programları karşılaştırın' \
  'ERES Biyoinformatik' \
  'Dijital bilimsel içerikler ve araştırma çalışma sistemleri'; do
  rg -F -q "$phrase" "$home_page"
done
assert_file_contains_regex "$home_page" '<a[^>]+href=#programlar[^>]*>Bugün başlayın</a>'
rg -F -q 'id=programlar' "$home_page"
rg -F -q '>Çalışma Programları<' "$home_page"
rg -F -q '>Canlı Çalışmalar<' "$home_page"
rg -F -q '>Programlarıma Giriş<' "$home_page"
assert_file_absent "$home_page" '>Dijital İçerikler<'
assert_file_absent "$home_page" '>İçeriklerime Giriş<'
assert_file_absent "$home_page" 'ERES Biyoinformatik Akademi'
rg -F -q 'Merhaba, tüm asenkron biyoinformatik çalışma programlarına toplu erişim sağlamak istiyorum. Güncel program kapsamı, fiyatı ve güvenli ödeme bağlantısını paylaşabilir misiniz?' "$repo_dir/layouts/index.html"
assert_file_contains_regex "$repo_dir/layouts/index.html" '(?s)<div class="lite-band async-bundle">.*?whatsapp-url\.html.*?Toplu erişimi başlatın.*?</div>\s*</div>'
assert_file_absent "$repo_dir/layouts/_default/student-login.html" 'ERES+Biyoinformatik+Akademi+e%C4%9Fitimleri'
rg -F -q 'ERES+Biyoinformatik+dijital+i%C3%A7erikleri+ve+%C3%A7al%C4%B1%C5%9Fma+kaynaklar%C4%B1' "$repo_dir/layouts/_default/student-login.html"

nida_launch_config="$repo_dir/data/nida_launch.yaml"
rg -F -q 'enabled: true' "$nida_launch_config"
rg -F -q 'capacity: 20' "$nida_launch_config"
rg -F -q 'remaining_places: null' "$nida_launch_config"
assert_file_contains_regex "$nida_launch_config" 'early_window_start: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+03:00"'

rg -F -q 'id=yasam-bilimlerinde-veri-analizi' "$home_page"
rg -F -q 'data-nida-launch' "$home_page"
assert_file_contains_regex "$home_page" '<a[^>]+href=/yasam-bilimlerinde-veri-analizi-canli-calisma/[^>]*data-event=nida_landing_click[^>]*data-placement=homepage[^>]*>Yeni · Ağustos Canlı Veri Vaka Laboratuvarı</a>'
assert_file_absent "$home_page" '>Canlı çalışmayı görün<'
assert_file_absent "$home_page" '#nida-canli-calisma'
for phrase in \
  'Ağustos Canlı Veri Vaka Laboratuvarı' \
  'Yaşam Bilimlerinde Veri Analizi' \
  '20 kişiyle sınırlı canlı grup' \
  '15–16 ve 22–23 Ağustos 2026' \
  '4 oturum × 2 saat' \
  'Google Meet' \
  'Kodlama önkoşulu yok' \
  '2.850 TL' \
  '3.850 TL' \
  'Öğrenci olarak yerimi ayır' \
  'Profesyonel olarak yerimi ayır' \
  'Çalışma planını görün'; do
  rg -F -q "$phrase" "$home_page"
done
assert_file_contains_regex "$home_page" '<a[^>]+href=/yasam-bilimlerinde-veri-analizi-canli-calisma/[^>]*data-event=nida_landing_click[^>]*>Çalışma planını görün</a>'
assert_file_absent_regex "$home_page" '(?s)<section id=yasam-bilimlerinde-veri-analizi(?:(?!</section>).)*(?: yer kaldı|doluluk|progress)'
assert_absent 'hızla doluyor'
rg -F -q 'Erken katılım avantajının sona ermesine:' "$repo_dir/static/js/nida-launch.js"
rg -F -q 'Bekleme listesine katılın' "$repo_dir/layouts/partials/nida-price-options.html"
rg -F -q 'if eq $remaining 0' "$repo_dir/layouts/partials/nida-price-options.html"
rg -F -q 'function getEarlyWindowState(startValue, hours, nowValue)' "$repo_dir/static/js/nida-launch.js"
rg -F -q 'function getCapacityState(remainingPlaces, capacity)' "$repo_dir/static/js/nida-launch.js"
rg -F -q 'remaining_places must be null or an integer between 0 and capacity' "$repo_dir/static/js/nida-launch.js"

nida_window_state() {
  local elapsed_hours="$1"
  if (( elapsed_hours < 4 )); then echo '0-4'
  elif (( elapsed_hours < 24 )); then echo '4-24'
  elif (( elapsed_hours < 48 )); then echo '24-48'
  elif (( elapsed_hours < 72 )); then echo '48-72'
  else echo 'ended'; fi
}

[[ "$(nida_window_state 2)" == '0-4' ]]
[[ "$(nida_window_state 8)" == '4-24' ]]
[[ "$(nida_window_state 30)" == '24-48' ]]
[[ "$(nida_window_state 60)" == '48-72' ]]
[[ "$(nida_window_state 73)" == 'ended' ]]
[[ "$(nida_window_state 2)" != '48-72' ]]
[[ "$(nida_window_state 8)" != '48-72' ]]
[[ "$(nida_window_state 30)" != '48-72' ]]
[[ "$(nida_window_state 60)" == '48-72' ]]
[[ "$(nida_window_state 73)" != '48-72' ]]

validate_remaining_places() {
  local value="$1"
  [[ "$value" == 'null' ]] && return 0
  [[ "$value" =~ ^[0-9]+$ ]] || return 1
  (( value >= 0 && value <= 20 ))
}

validate_remaining_places null
validate_remaining_places 0
validate_remaining_places 20
for invalid_remaining in -1 21 1.5 foo; do
  if validate_remaining_places "$invalid_remaining"; then
    echo "Invalid remaining_places accepted: $invalid_remaining" >&2
    exit 1
  fi
done

for entry in "${checkout_expectations[@]}"; do
  IFS='|' read -r slug student_checkout employee_checkout <<< "$entry"
  student_checkout_html="${student_checkout//&/&amp;}"
  employee_checkout_html="${employee_checkout//&/&amp;}"
  rg -F -q "href=\"$student_checkout_html\"" "$home_page"
  rg -F -q "href=\"$employee_checkout_html\"" "$home_page"
  assert_file_contains_regex "$home_page" "<a(?=[^>]*href=[\"']?https://kampus\\.eresbiotech\\.com/order\\?)(?=[^>]*data-course=[\"']?$slug[\"']?)(?=[^>]*data-plan=[\"']?student[\"']?)(?=[^>]*data-placement=[\"']?homepage)[^>]*>Öğrenci erişimiyle başlayın</a>"
  assert_file_contains_regex "$home_page" "<a(?=[^>]*href=[\"']?https://kampus\\.eresbiotech\\.com/order\\?)(?=[^>]*data-course=[\"']?$slug[\"']?)(?=[^>]*data-plan=[\"']?employee[\"']?)(?=[^>]*data-placement=[\"']?homepage)[^>]*>Profesyonel erişimiyle başlayın</a>"
  assert_file_contains_regex "$home_page" "<a(?=[^>]*href=[\"']?/post/$slug/[\"']?)(?=[^>]*data-event=[\"']?program_detail_click)[^>]*>Program rotasını görün</a>"
done
assert_file_absent_regex "$home_page" "<a(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*target=[\"']?_blank)[^>]*>"
[[ "$(rg -o 'Kendi hızında çalışma programı' "$home_page" | wc -l | tr -d ' ')" == "7" ]] || { echo "Homepage must contain seven active program cards" >&2; exit 1; }

nida_page="$build_dir/yasam-bilimlerinde-veri-analizi-canli-calisma/index.html"
nida_legacy_page="$build_dir/post/yasam-bilimlerinde-veri-analizi/index.html"
nida_source="$repo_dir/content/post/yasam-bilimlerinde-veri-analizi.md"
[[ -f "$nida_page" ]] || { echo "Missing Nida canonical landing page" >&2; exit 1; }
[[ -f "$nida_legacy_page" ]] || { echo "Missing Nida legacy alias page" >&2; exit 1; }
rg -F -q 'https://akademi.eresbiotech.com/yasam-bilimlerinde-veri-analizi-canli-calisma/' "$nida_page"
rg -F -q '<h1>Yaşam Bilimlerinde Veri Analizi</h1>' "$nida_page"
rg -F -q 'Yaşam Bilimlerinde Veri Analizi Canlı Çalışması | ERES Biyoinformatik' "$nida_page"
rg -F -q 'Python ve Pandas ile yaşam bilimleri verisini düzenleme, kontrol etme, görselleştirme ve yorumlama sürecini dört canlı uygulama oturumunda inceleyin.' "$nida_page"
rg -F -q 'Dr. Nida Tokaç Er' "$nida_page"
rg -F -q '15–16 ve 22–23 Ağustos 2026' "$nida_page"
rg -F -q '20 kişiyle sınırlı' "$nida_page"
rg -F -q '2.850 TL' "$nida_page"
rg -F -q '3.850 TL' "$nida_page"
rg -F -q 'https://akademi.eresbiotech.com/yasam-bilimlerinde-veri-analizi-canli-calisma/' "$nida_legacy_page"
assert_file_absent "$nida_page" 'Biyoinformatik için R Programlama'
assert_file_absent "$nida_page" 'Program koleksiyonu'
assert_file_absent "$nida_page" 'Tüm programları karşılaştırın'
assert_file_absent_regex "$nida_page" '(?: yer kaldı|doluluk|progress)'
NIDA_STUDENT_CHECKOUT='https://kampus.eresbiotech.com/order?link=m9QSY&pricing_plan=PAWg3K4qWK'
NIDA_EMPLOYEE_CHECKOUT='https://kampus.eresbiotech.com/order?link=m9QSY&pricing_plan=91zw8wePBL'
NIDA_STUDENT_CHECKOUT_HTML="${NIDA_STUDENT_CHECKOUT//&/&amp;}"
NIDA_EMPLOYEE_CHECKOUT_HTML="${NIDA_EMPLOYEE_CHECKOUT//&/&amp;}"
rg -F -q "student_checkout_url = \"$NIDA_STUDENT_CHECKOUT\"" "$nida_source"
rg -F -q "employee_checkout_url = \"$NIDA_EMPLOYEE_CHECKOUT\"" "$nida_source"
rg -F -q 'payhip_product_url = "https://kampus.eresbiotech.com/b/m9QSY"' "$nida_source"
[[ "$NIDA_STUDENT_CHECKOUT" != "$NIDA_EMPLOYEE_CHECKOUT" ]] || { echo "Nida pricing plans must differ" >&2; exit 1; }
for page in "$home_page" "$nida_page"; do
  rg -F -q "href=\"$NIDA_STUDENT_CHECKOUT_HTML\"" "$page"
  rg -F -q "href=\"$NIDA_EMPLOYEE_CHECKOUT_HTML\"" "$page"
  assert_file_absent_regex "$page" "<a(?=[^>]*href=[\"']?https://kampus\\.eresbiotech\\.com/order\\?link=m9QSY)(?=[^>]*target=[\"']?_blank)[^>]*>"
  assert_file_absent "$page" 'Güvenli ödeme bağlantısı yazılı olarak paylaşılır'
done
for placement in homepage landing_page mobile_sticky; do
  page="$nida_page"
  [[ "$placement" == homepage ]] && page="$home_page"
  assert_file_contains_regex "$page" "<a(?=[^>]*href=[\"']?[^\"']*PAWg3K4qWK)(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*data-payment-provider=[\"']?payhip)(?=[^>]*data-course=[\"']?yasam-bilimlerinde-veri-analizi)(?=[^>]*data-plan=[\"']?student)(?=[^>]*data-placement=[\"']?$placement)[^>]*>Öğrenci olarak yerimi ayır</a>"
  assert_file_contains_regex "$page" "<a(?=[^>]*href=[\"']?[^\"']*91zw8wePBL)(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*data-payment-provider=[\"']?payhip)(?=[^>]*data-course=[\"']?yasam-bilimlerinde-veri-analizi)(?=[^>]*data-plan=[\"']?employee)(?=[^>]*data-placement=[\"']?$placement)[^>]*>Profesyonel olarak yerimi ayır</a>"
done
[[ "$(rg -o 'data-placement=landing_page' "$nida_page" | wc -l | tr -d ' ')" == "4" ]] || { echo "Landing page must keep hero and final student/professional checkout CTAs" >&2; exit 1; }
assert_file_absent "$nida_page" 'Ödeme bağlantısını nasıl alırım?'
assert_file_absent "$nida_page" 'WhatsApp butonunu kullanın'
rg -F -q 'Satın alma işlemini nasıl tamamlarım?' "$nida_page"
rg -F -q 'ERES Kampüs / Payhip güvenli ödeme adımına doğrudan yönlendirilirsiniz.' "$nida_page"
rg -F -q 'Güvenli ödeme · Taksit seçenekleri ödeme adımında' "$nida_page"
rg -F -q 'Satın alma sonrası erişim, kullandığınız e-posta adresine tanımlanır.' "$nida_page"
assert_file_absent "$nida_page" 'https://kampus.eresbiotech.com/b/m9QSY'
assert_file_absent "$home_page" 'https://kampus.eresbiotech.com/b/m9QSY'
[[ "$(printf '%s\n' "${checkout_expectations[@]}" | wc -l | tr -d ' ')" == "7" ]] || { echo "Expected seven asynchronous products" >&2; exit 1; }
[[ "$(( ${#checkout_expectations[@]} * 2 + 2 ))" == "16" ]] || { echo "Expected sixteen verified active checkout URLs" >&2; exit 1; }

# A real zero-capacity build proves Payhip CTA visibility switches to the WhatsApp waitlist.
zero_capacity_repo="$(mktemp -d "${TMPDIR:-/tmp}/eres-akademi-zero-capacity.XXXXXX")"
cp -R "$repo_dir"/. "$zero_capacity_repo"/
perl -0pi -e 's/remaining_places: null/remaining_places: 0/' "$zero_capacity_repo/data/nida_launch.yaml"
zero_capacity_build="$zero_capacity_repo/public-zero-capacity"
"$hugo_bin" --source "$zero_capacity_repo" --minify --destination "$zero_capacity_build"
zero_nida_page="$zero_capacity_build/yasam-bilimlerinde-veri-analizi-canli-calisma/index.html"
zero_home_page="$zero_capacity_build/index.html"
rg -F -q 'Bekleme listesine katılın' "$zero_nida_page"
rg -F -q 'Bekleme listesine katılın' "$zero_home_page"
assert_file_absent "$zero_nida_page" "$NIDA_STUDENT_CHECKOUT_HTML"
assert_file_absent "$zero_nida_page" "$NIDA_EMPLOYEE_CHECKOUT_HTML"
assert_file_absent "$zero_home_page" "$NIDA_STUDENT_CHECKOUT_HTML"
assert_file_absent "$zero_home_page" "$NIDA_EMPLOYEE_CHECKOUT_HTML"
rg -F -q 'data-meta-content-name="Yaşam Bilimlerinde Veri Analizi"' "$repo_dir/layouts/post/live-lab-landing.html"
rg -F -q 'live-lab-landing-header' "$repo_dir/layouts/partials/header.html"
assert_file_absent_regex "$nida_page" '(?s)<header class=site-header.*?>.*?>Çalışma Programları<' 
rg -F -q 'https://akademi.eresbiotech.com/yasam-bilimlerinde-veri-analizi-canli-calisma/' "$build_dir/sitemap.xml"
assert_file_absent "$build_dir/sitemap.xml" 'https://akademi.eresbiotech.com/post/yasam-bilimlerinde-veri-analizi/'
rg -F -q 'nida-mobile-sticky' "$repo_dir/layouts/post/live-lab-landing.html"
rg -F -q 'data-placement="mobile_sticky"' "$repo_dir/layouts/post/live-lab-landing.html"
rg -F -q 'nida-mobile-sticky { align-items: stretch' "$repo_dir/static/css/site.css"
assert_file_contains_regex "$repo_dir/static/css/site.css" '(?s)@media \(max-width: 820px\) \{.*?\.nida-mobile-sticky.*?display: grid;'

for page in "$build_dir"/post/*/index.html; do
  assert_file_absent "$page" '>Kaydını tamamla<'
  assert_file_absent "$page" '>Kayıt ol<'
  assert_file_absent "$page" '>Ön bilgi al<'
done

assert_file_contains_regex "$repo_dir/static/css/site.css" '(?s)@media \(max-width: 820px\) \{.*?\.live-lab-price-grid,.*?grid-template-columns: 1fr;'
assert_file_contains_regex "$repo_dir/static/css/site.css" '(?s)\.live-lab-price-card \.pricing-button \{.*?width: 100%;'
assert_file_contains_regex "$repo_dir/static/css/site.css" '(?s)\.bundle-actions \.hero-action \{.*?width: 100%;'
assert_file_contains_regex "$repo_dir/static/css/site.css" '(?s)@media \(max-width: 820px\) \{.*?\.home-program-grid\s*\{.*?grid-template-columns: 1fr;'
assert_file_contains_regex "$repo_dir/static/css/site.css" '(?s)\.program-checkout,\s*\.program-route-link\s*\{.*?width: 100%;'
assert_file_contains_regex "$repo_dir/static/css/site.css" '(?s)@media \(max-width: 820px\) \{.*?\.nida-launch-card \{ grid-template-columns: minmax\(0,1fr\); \}.*?\.nida-launch-purchase,.nida-price-card,.nida-reservation-cta,.nida-waitlist-cta \{.*?width: 100%;'
assert_file_contains_regex "$repo_dir/static/css/site.css" '(?s)@media \(max-width: 520px\) \{.*?\.nida-price-grid \{ grid-template-columns: minmax\(0,1fr\); \}'

landing_page="$build_dir/bioexpo-2026-destekli-kayit/index.html"
rg -F -q 'BioExpo 2026 destekli kayıt dönemi sona erdi' "$landing_page"
assert_file_absent "$landing_page" 'https://kampus.eresbiotech.com/order'
assert_file_absent "$landing_page" 'SON 2 GÜN'
assert_file_absent "$build_dir/sitemap.xml" 'bioexpo-2026-destekli-kayit'

echo "Generated-site checks passed."
