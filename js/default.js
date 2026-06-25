"use strict";

const HOME_SLIDES = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
  41,42,43,44,45,46,47,48,49,50,51,52,54,55,56,57,58,
  60,61,62,63,64,65,67,68,69,70,72,73,75,76,77,78,79,80,
  81,82,83,84,85,86,87,88,89,90,91,92,93,94
];

// Each entry: [path, slideCount, title, thumbnailNum (default 1)]
const BRANDS = [
  [
    ["img/brands/01-arjuna-design", 9, "Arjuna Design"],
    ["img/brands/34-alain-paris-billboards", 3, "Alain Paris Billboards"],
    ["img/brands/04-fab-design", 4, "Fab Design"],
    ["img/brands/29-blink-jazz", 8, "Blink Jazz"],
    ["img/brands/07-hans-ubbink-campaign", 7, "Hans Ubbink Campaign"],
    ["img/brands/10-pepe-jeans-sa", 6, "Pepe Jeans"],
    ["img/brands/13-jacky-luxury", 8, "Jacky Luxury"],
    ["img/brands/16-hunkenmoller", 6, "Hunkenmoller"],
    ["img/brands/19-relakz-jeans", 7, "Relakz Jeans"],
    ["img/brands/22-genti-rock", 6, "Genti Rock"],
    ["img/brands/25-arjuna-man", 5, "Arjuna Man"],
    ["img/brands/32-scapa", 7, "Scapa"],
  ],
  [
    ["img/brands/02-dennis-diemcouture", 5, "Dennis Diemcouture"],
    ["img/brands/05-myomy", 6, "Myomy", 2],
    ["img/brands/08-wilford", 4, "Wilford"],
    ["img/brands/11-petrol-industry", 10, "Petrol Industry"],
    ["img/brands/14-levi's", 3, "Levi's"],
    ["img/brands/17-nike-360man", 6, "Nike 360 Man"],
    ["img/brands/20-van-gils", 6, "Van Gils"],
    ["img/brands/23-gabriella-sa", 6, "Gabriella SA"],
    ["img/brands/26-nike-360-woman", 6, "Nike 360 Woman"],
    ["img/brands/30-jacky-luxury-2", 7, "Jacky Luxury 2"],
  ],
  [
    ["img/brands/03-destrezzed", 8, "Destrezzed"],
    ["img/brands/06-l'oreal", 1, "L'Oreal"],
    ["img/brands/09-yakult", 5, "Yakult"],
    ["img/brands/12-mexx-artdevision", 4, "Mexx ArtDevision"],
    ["img/brands/15-genti-newyork", 5, "Genti New York"],
    ["img/brands/18-politan-cosmetics-paris", 4, "Politan Cosmetics Paris"],
    ["img/brands/21-yari-bali", 4, "Yari Bali"],
    ["img/brands/24-genti-jeans", 7, "Genti Jeans"],
    ["img/brands/27-cavallaro", 9, "Cavallaro"],
    ["img/brands/28-genti-bond", 7, "Genti Bond"],
    ["img/brands/31-petrol-race", 8, "Petrol Race"],
    ["img/brands/33-alain-afflelou", 7, "Alain Afflelou"],
  ],
];

const FASHION = [
  [
    ["img/fashion/01-menshealth-007", 8, "Menshealth 007"],
    ["img/fashion/04-esquire-speed", 7, "Esquire Speed"],
    ["img/fashion/07-glamour", 3, "Glamour"],
    ["img/fashion/10-vienna-week-dutch-designers", 12, "Vienna Week Dutch Designers"],
    ["img/fashion/13-cigarz-ny", 4, "Cigarz NY"],
    ["img/fashion/16-editorial-link-magazine", 4, "Editorial Link Magazine"],
  ],
  [
    ["img/fashion/02-ny-times-coco", 7, "NY Times Coco"],
    ["img/fashion/05-arena-advertorial-genti-luomo", 6, "Arena Advertorial Genti Luomo"],
    ["img/fashion/08-avantgarde-1920", 7, "Avantgarde 1920"],
    ["img/fashion/11-marieclaire", 5, "Marieclaire"],
    ["img/fashion/14-cosmogirl-hippie", 5, "Cosmogirl Hippie"],
    ["img/fashion/17-glamour-graphics", 10, "Glamour Graphics"],
  ],
  [
    ["img/fashion/06-fox-vienna", 4, "Fox Vienna"],
    ["img/fashion/09-elle-singapore", 8, "Elle Singapore"],
    ["img/fashion/12-squeez", 6, "Squeez"],
    ["img/fashion/15-esquire-actor-tigo-gernandt", 6, "Esquire Actor Tigo Gernandt"],
  ],
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function buildHomeCarousel() {
  var inner = document.getElementById("home-carousel-inner");
  if (!inner) return;
  inner.innerHTML = HOME_SLIDES.map(function(n) {
    return '<div class="carousel-item"><img class="d-block mx-auto" src="img/slides/sean-mac-andrew-' + pad(n) + '.jpg" /></div>';
  }).join("");
  var idx = Math.floor(Math.random() * HOME_SLIDES.length);
  inner.children[idx].classList.add("active");
}

function buildPortfolioGrid(data, prefix) {
  data.forEach(function(col, i) {
    var el = document.getElementById(prefix + "-col-" + i);
    if (!el) return;
    el.innerHTML = col.map(function(item) {
      var thumbNum = item[3] || 1;
      return '<div class="col mx-auto pb-4 relative" data-lightbox="' + item[0] + '" data-count="' + item[1] + '">' +
        '<img src="' + item[0] + '/sean-mac-andrew-' + pad(thumbNum) + '.jpg" alt="" class="w-100" loading="lazy" />' +
        '<p class="select">' + item[2] + "</p>" +
        "</div>";
    }).join("");
  });
}

function openFSLightbox(path, count) {
  var html = "";
  var active = " active";
  for (var i = 1; i <= count; i++) {
    html += '<div class="carousel-item' + active + '"><img class="d-block mx-auto" src="' + path + "/sean-mac-andrew-" + pad(i) + '.jpg"></div>';
    active = "";
  }
  document.getElementById("modal-carousel-inner").innerHTML = html;
  new bootstrap.Modal(document.getElementById("my-modal-01")).show();

  document.onkeydown = function(e) {
    switch (e.key) {
      case "Escape":
      case "ArrowUp":
        document.getElementById("modal-carousel-01-close").click();
        break;
      case "ArrowLeft":
        document.getElementById("modal-carousel-01-prev").click();
        break;
      case "ArrowRight":
        document.getElementById("modal-carousel-01-next").click();
        break;
    }
  };
}

function closeFSLightbox() {
  document.onkeydown = null;
  var myModal = bootstrap.Modal.getInstance(document.getElementById("my-modal-01"));
  if (myModal) myModal.hide();
}

// Scripts are loaded at the bottom of the content — DOM is ready, run setup directly.
buildHomeCarousel();
buildPortfolioGrid(BRANDS, "brands");
buildPortfolioGrid(FASHION, "fashion");

document.getElementById("burger-btn").addEventListener("click", function() {
  document.getElementById("burger-menu").classList.toggle("open");
});

document.getElementById("burger-dropdown").addEventListener("click", function(e) {
  if (e.target.closest(".nav-link")) {
    document.getElementById("burger-menu").classList.remove("open");
  }
});

document.addEventListener("click", function(e) {
  var item = e.target.closest("[data-lightbox]");
  var menu = document.getElementById("burger-menu");
  if (item) {
    openFSLightbox(item.dataset.lightbox, parseInt(item.dataset.count, 10));
  } else if (menu && !menu.contains(e.target)) {
    menu.classList.remove("open");
  }
});
