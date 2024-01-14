+++
author = "Eres Biyoinformatik Akademi"
title = "İletişim"
date = "2023-12-20"
description = "İletişim formu aşağıda yer almaktadır. Forma istediğiniz eğitimi ya da sormak istediğiniz konuları yazabilirsiniz. En kısa sürede geri dönüş sağlayacağız. Eğer e-postanızın ulaşmadığını düşünüyorsanız info@eresbiotech.com adresinden bize ulaşabilirsiniz."

images =[ "images/Biyoinformatik-Araclar-Veritabanlari-Egitimi.png" ]

categories = [
    "themes",
    "syntax",
]
+++

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Örneği</title>
  <!-- İhtiyaca göre CSS ve diğer başlık etiketlerini ekleyebilirsiniz -->
</head>
<body>

<form onsubmit="submitForm(event)" action="https://public.herotofu.com/v1/a80f8270-abf5-11ee-8fa9-872d80d8eac1" method="post" accept-charset="UTF-8">
  <div class="row m-3">
    <div class="col-4">
      <label for="name">İsminiz</label>
    </div>
    <div class="col-8">
      <input
        type="text"
        placeholder="İsminiz"
        name="name"
        class="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        required
      />
    </div>
  </div>

  <div class="row m-3">
    <div class="col-4">
      <label for="email">E-posta adresiniz</label>
    </div>
    <div class="col-8">
      <input
        type="email"
        placeholder="E-posta"
        name="email"
        class="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        required
      />
    </div>
  </div>

  <div class="row m-3">
    <div class="col-4"> 
      <label for="message">Bize iletmek istediğiniz mesaj</label>
    </div>
    <div class="col-8">
      <textarea
        placeholder="Hangi ders hakkında bilgi almak istersiniz?"
        name="message"
        class="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        required
      ></textarea>
    </div>
  </div>

  <div class="row m-5">
    <div class="col-8 offset-md-4">
      <input type="submit" class="btn btn-danger" value="Mesajı Gönder" />
    </div>
    <div style="text-indent:-99999px; white-space:nowrap; overflow:hidden; position:absolute;" aria-hidden="true">
      <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
    </div>
  </div>
</form>

<script>
  function submitForm(event) {
    // Formun otomatik olarak gönderilmesine izin ver
    // Bu durumda, formun action URL'sine yönlendirme gerçekleşir.
    // Not: Bu durumda fetch kullanmanıza gerek yok.
  }
</script>

</body>
</html>

