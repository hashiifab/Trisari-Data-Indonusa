"use strict";

$(document).ready(function () {
  /* Video Lightbox */
  if (!!$.prototype.simpleLightboxVideo) {
    $(".video").simpleLightboxVideo();
  }

  /*ScrollUp*/
  if (!!$.prototype.scrollUp) {
    $.scrollUp();
  }

  /*Responsive Navigation*/
  $("#nav-mobile").html($("#nav-main").html());
  $("#nav-trigger span").on("click", function () {
    if ($("nav#nav-mobile ul").hasClass("expanded")) {
      $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
      $(this).removeClass("open");
    } else {
      $("nav#nav-mobile ul").addClass("expanded").slideDown(250);
      $(this).addClass("open");
    }
  });

  $("#nav-mobile").html($("#nav-main").html());
  $("#nav-mobile ul a").on("click", function () {
    if ($("nav#nav-mobile ul").hasClass("expanded")) {
      $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
      $("#nav-trigger span").removeClass("open");
    }
  });

  /* Sticky Navigation */
  if (!!$.prototype.stickyNavbar) {
    $("#header").stickyNavbar();
  }

  $("#content").waypoint(function (direction) {
    if (direction === "down") {
      $("#header").addClass("nav-solid fadeInDown");
    } else {
      $("#header").removeClass("nav-solid fadeInDown");
    }
  });
});

/* Preloader and animations */
$(window).load(function () {
  // makes sure the whole site is loaded
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
  $("body").delay(350).css({ "overflow-y": "visible" });

  /* WOW Elements */
  if (typeof WOW == "function") {
    new WOW().init();
  }

  /* Parallax Effects */
  if (!!$.prototype.enllax) {
    $(window).enllax();
  }
});

// JavaScript untuk mengganti bahasa
document.getElementById("enButton").addEventListener("click", function (e) {
  e.preventDefault();
  changeLanguage("en");
  setActiveLanguageButton("en"); // Mengatur tombol aktif ke English
});

document.getElementById("idButton").addEventListener("click", function (e) {
  e.preventDefault();
  changeLanguage("id");
  setActiveLanguageButton("id"); // Mengatur tombol aktif ke Indonesian
});

// Pesan untuk WhatsApp dalam dua bahasa
const messages = {
  id: "Halo, saya ingin memesan Paket %package%.\n\nDetail Paket:\n- Nama Paket: %package%\n- Harga: Rp. %price%\n- Kuota: Unlimited\n- Kecepatan: Hingga %speed%\n- Layanan Gangguan: 12/7\n- Cocok untuk: Youtube, TikTok, Instagram, aplikasi movie\n- Pengguna: %users%\n\nMohon konfirmasi pemesanan saya. Terima kasih!",
  en: "Hello, I would like to order the %package% Package.\n\nPackage Details:\n- Package Name: %package%\n- Price: Rp. %price%\n- Quota: Unlimited\n- Speed: Up to %speed%\n- Support Service: 12/7\n- Suitable for: YouTube, TikTok, Instagram, movie apps\n- Users: %users%\n\nPlease confirm my order. Thank you!",
};

// Mengatur pesan ke tautan WhatsApp
function updateWhatsAppLinks(lang) {
  const packages = [
    {
      name: "Paket Super Hemat",
      price: "135.000",
      speed: "15 Mbps",
      users: "1 - 2 Users",
    },
    {
      name: "Paket Hemat",
      price: "150.000",
      speed: "20 Mbps",
      users: "2 - 3 Users",
    },
    {
      name: "Paket Normal",
      price: "165.000",
      speed: "25 Mbps",
      users: "4 - 6 Users",
    },
    {
      name: "Paket Keluarga",
      price: "210.000",
      speed: "30 Mbps",
      users: "6 - 8 Users",
    },
    {
      name: "Paket Keluarga Besar",
      price: "250.000",
      speed: "35 Mbps",
      users: "8 - 10 Users",
    },
  ];

  packages.forEach((pkg, index) => {
    const message = messages[lang]
      .replace(/%package%/g, pkg.name)
      .replace(/%price%/g, pkg.price)
      .replace(/%speed%/g, pkg.speed)
      .replace(/%users%/g, pkg.users);

    const link = document.querySelectorAll(".pricing-block-content a")[index];
    link.href = `https://api.whatsapp.com/send?phone=628113396105&text=${encodeURIComponent(
      message
    )}`;
  });
}

// Fungsi untuk mengganti bahasa
function changeLanguage(lang) {
  // Ganti teks untuk elemen dengan atribut data-lang
  const elements = document.querySelectorAll("[data-" + lang + "]");
  elements.forEach((element) => {
    const newText = element.getAttribute("data-" + lang);
    if (newText) {
      // Temukan ikon dan simpan referensinya
      const iconElement = element.querySelector("i"); // Temukan ikon
      const originalIconHTML = iconElement ? iconElement.outerHTML : ""; // Simpan HTML ikon jika ada

      // Ganti teks, tetapi jangan menghapus ikon
      element.innerHTML = newText + " " + originalIconHTML; // Gabungkan teks baru dan ikon
    }
  });

  // Menampilkan informasi kontak
  const contactInfoMap = document.querySelector(".contact-info-map");
  if (contactInfoMap) {
    const contactNewText = contactInfoMap.getAttribute("data-" + lang);
    if (contactNewText) {
      // Menyimpan referensi ikon
      const contactIconElement = contactInfoMap.querySelector("i");
      const contactOriginalIconHTML = contactIconElement
        ? contactIconElement.outerHTML
        : "";

      // Ganti teks untuk informasi kontak tanpa menghapus ikon
      contactInfoMap.innerHTML = contactNewText + " " + contactOriginalIconHTML;
    }
  }

  // Ganti teks pada tombol untuk menandai tombol aktif
  const idButton = document.getElementById("idButton");
  const enButton = document.getElementById("enButton");

  if (lang === "id") {
    idButton.classList.add("active");
    enButton.classList.remove("active");
  } else {
    enButton.classList.add("active");
    idButton.classList.remove("active");
  }

  // Memperbarui tautan WhatsApp
  updateWhatsAppLinks(lang);
}

// Load default language on page load
document.addEventListener("DOMContentLoaded", function () {
  changeLanguage("id"); // Default to Indonesian
});

//next button

document.getElementById("scrollLeft").onclick = function () {
  document
    .querySelector(".scroll")
    .scrollBy({ left: -300, behavior: "smooth" });
};

document.getElementById("scrollRight").onclick = function () {
  document.querySelector(".scroll").scrollBy({ left: 300, behavior: "smooth" });
};

//map
// Inisialisasi peta dengan OpenStreetMap sebagai layer
var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(), // Layer OpenStreetMap
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([106.865, -6.1751]), // Pusat awal di Jakarta
    zoom: 5, // Level zoom
  }),
});

// Data lokasi klien
var locations = [
  { name: "Jakarta", coords: [106.865, -6.1751] },
  { name: "Bandung", coords: [107.6191, -6.9175] },
  { name: "Yogyakarta", coords: [110.3695, -7.7956] },
  { name: "Surabaya", coords: [112.7521, -7.2575] },
  { name: "Bali", coords: [115.092, -8.3405] },
  { name: "Medan", coords: [98.6722, 3.5952] },
  { name: "Tangerang", coords: [106.6527, -6.2024] },
  { name: "Semarang", coords: [110.4167, -6.9667] },
  { name: "Makassar", coords: [119.4327, -5.1477] },
  { name: "Malang", coords: [112.6326, -7.9666] },
  { name: "Palembang", coords: [104.7066, -2.997] }, // Palembang
  { name: "Denpasar", coords: [115.1682, -8.4095] }, // Denpasar
  { name: "Batam", coords: [104.0443, 1.0902] }, // Batam
  { name: "Bandar Lampung", coords: [105.2659, -5.45] }, // Bandar Lampung
  { name: "Cirebon", coords: [108.566, -6.73] }, // Cirebon
  { name: "Samarinda", coords: [117.1464, -0.5018] }, // Samarinda
  { name: "Ambon", coords: [128.186, -3.6953] }, // Ambon
  { name: "Pekanbaru", coords: [101.4492, -0.5096] }, // Pekanbaru
  { name: "Jambi", coords: [103.696, -1.6014] }, // Jambi
];

// Menambahkan marker bulatan biru untuk setiap lokasi klien
locations.forEach(function (location) {
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(location.coords)), // Koordinat lokasi
    name: location.name,
  });

  // Menetapkan gaya untuk marker
  marker.setStyle(
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8, // Ukuran bulatan
        fill: new ol.style.Fill({
          color: "red", // Warna bulatan
        }),
        stroke: new ol.style.Stroke({
          color: "white", // Warna garis tepi bulatan
          width: 2, // Ketebalan garis tepi
        }),
      }),
    })
  );

  // Membuat sumber vektor untuk marker
  var vectorSource = new ol.source.Vector({
    features: [marker], // Menambahkan marker ke sumber
  });

  // Membuat layer vektor untuk marker
  var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  });

  // Menambahkan layer marker ke peta
  map.addLayer(markerVectorLayer);
});
