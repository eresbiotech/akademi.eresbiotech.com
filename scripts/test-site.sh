#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
hugo_bin="${HUGO_BIN:-hugo}"
created_build_dir=false

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
  if rg --pcre2 -q "$pattern" "$file"; then
    echo "Unexpected pattern in $file: $pattern" >&2
    exit 1
  fi
}

assert_file_contains_regex() {
  local file="$1"
  local pattern="$2"
  if ! rg --pcre2 -q "$pattern" "$file"; then
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

for slug in "${course_slugs[@]}"; do
  page="$build_dir/post/$slug/index.html"
  [[ -f "$page" ]] || { echo "Missing generated page: $page" >&2; exit 1; }
  assert_file_absent "$page" 'data-bioexpo-active'
  assert_file_absent "$page" 'BioExpo 2026 destekli kayıt'

  for plan in student employee; do
    if ! rg -q "<a[^>]+href=[\"']?https://kampus\\.eresbiotech\\.com/order\\?[^>]+data-course=[\"']?$slug[\"']?[^>]+data-plan=[\"']?$plan[\"']?[^>]*>" "$page"; then
      echo "Missing visible $plan checkout CTA for $slug" >&2
      exit 1
    fi
  done

  assert_file_contains_regex "$page" "<a(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*aria-label=)[^>]*>"
  assert_file_absent_regex "$page" "<a(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*(?:hidden|style=[\"'][^\"']*display\\s*:\\s*none))[^>]*>"
  assert_file_absent_regex "$page" "<a(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*target=[\"']?_blank)[^>]*>"
done

nida_page="$build_dir/post/yasam-bilimlerinde-veri-analizi/index.html"
nida_source="$repo_dir/content/post/yasam-bilimlerinde-veri-analizi.md"
[[ -f "$nida_page" ]] || { echo "Missing Nida product page" >&2; exit 1; }
rg -F -q 'Canlı oturumlar 15–16 ve 22–23 Ağustos 2026 tarihlerinde gerçekleştirilecektir.' "$nida_page"
assert_file_absent "$nida_page" 'BioExpo'
assert_file_absent "$nida_page" 'Erişim Seçeneğinizi Belirleyin'
assert_file_absent "$nida_page" 'student_professional'
assert_file_absent "$nida_page" 'Öğrenci veya profesyonel erişim seçeneğinizi güvenli ödeme sayfasında belirleyebilirsiniz.'

if rg -q '^student_checkout_url = ' "$nida_source" && rg -q '^employee_checkout_url = ' "$nida_source"; then
  assert_file_contains_regex "$nida_page" "<a(?=[^>]*data-plan=[\"']?student)(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*pricing_plan=)[^>]*>Öğrenci erişimiyle kaydolun</a>"
  assert_file_contains_regex "$nida_page" "<a(?=[^>]*data-plan=[\"']?employee)(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*pricing_plan=)[^>]*>Profesyonel erişimle kaydolun</a>"
  nida_student_url="$(rg '^student_checkout_url = ' "$nida_source" | sed -E 's/^[^\"]*\"([^\"]+)\".*/\1/')"
  nida_employee_url="$(rg '^employee_checkout_url = ' "$nida_source" | sed -E 's/^[^\"]*\"([^\"]+)\".*/\1/')"
  [[ "$nida_student_url" != "$nida_employee_url" ]] || { echo "Nida plan checkout URLs must differ" >&2; exit 1; }
  assert_file_absent_regex "$nida_page" "<a(?=[^>]*data-event=[\"']?payhip_checkout_click)(?=[^>]*target=[\"']?_blank)[^>]*>"
else
  assert_file_absent "$nida_page" 'data-event=payhip_checkout_click'
  rg -F -q 'Öğrenci erişimi için yazılı destek alın' "$nida_page"
  rg -F -q 'Profesyonel erişim için yazılı destek alın' "$nida_page"
fi

for page in "$build_dir"/post/*/index.html; do
  assert_file_absent "$page" '>Kaydını tamamla<'
  assert_file_absent "$page" '>Kayıt ol<'
  assert_file_absent "$page" '>Ön bilgi al<'
done

rg -F -q '.live-lab-price-card .pricing-button' "$repo_dir/static/css/site.css"
rg -F -q 'width: 100%;' "$repo_dir/static/css/site.css"

landing_page="$build_dir/bioexpo-2026-destekli-kayit/index.html"
rg -F -q 'BioExpo 2026 destekli kayıt dönemi sona erdi' "$landing_page"
assert_file_absent "$landing_page" 'https://kampus.eresbiotech.com/order'
assert_file_absent "$landing_page" 'SON 2 GÜN'
assert_file_absent "$build_dir/sitemap.xml" 'bioexpo-2026-destekli-kayit'

echo "Generated-site checks passed."
