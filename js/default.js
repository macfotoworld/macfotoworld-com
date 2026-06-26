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

// ── Per-photo tag storage (localStorage) ────────────────────────────────────
// Key format: "tags:<path>/<filename>"  e.g. "tags:img/brands/01-arjuna-design/sean-mac-andrew-01.jpg"
// Value: JSON array of lowercase strings

function photoKey(path, num) {
  return "tags:" + path + "/sean-mac-andrew-" + pad(num) + ".jpg";
}

function getPhotoTags(path, num) {
  try {
    return JSON.parse(localStorage.getItem(photoKey(path, num)) || "[]");
  } catch(e) { return []; }
}

function setPhotoTags(path, num, tags) {
  localStorage.setItem(photoKey(path, num), JSON.stringify(tags));
}

// ── Lightbox ─────────────────────────────────────────────────────────────────

var _lbPath = "";
var _lbCount = 0;

function currentSlideNum() {
  var inner = document.getElementById("modal-carousel-inner");
  var items = inner.querySelectorAll(".carousel-item");
  for (var i = 0; i < items.length; i++) {
    if (items[i].classList.contains("active")) return i + 1;
  }
  return 1;
}

function renderTagEditor() {
  var num = currentSlideNum();
  var tags = getPhotoTags(_lbPath, num);
  var editor = document.getElementById("lb-tag-editor");
  editor.innerHTML = tags.map(function(t) {
    return '<span class="lb-tag" data-tag="' + t + '">' + t + ' <i class="fas fa-times lb-tag-remove"></i></span>';
  }).join("");
}

function openFSLightbox(path, count, startNum) {
  _lbPath = path;
  _lbCount = count;
  var html = "";
  for (var i = 1; i <= count; i++) {
    var active = (i === (startNum || 1)) ? " active" : "";
    html += '<div class="carousel-item' + active + '"><img class="d-block mx-auto" src="' + path + "/sean-mac-andrew-" + pad(i) + '.jpg"></div>';
  }
  document.getElementById("modal-carousel-inner").innerHTML = html;

  var modal = new bootstrap.Modal(document.getElementById("my-modal-01"));
  modal.show();
  renderTagEditor();

  document.getElementById("modal-carousel-01").addEventListener("slid.bs.carousel", renderTagEditor);
}

function closeFSLightbox() {
  document.getElementById("modal-carousel-01").removeEventListener("slid.bs.carousel", renderTagEditor);
  var myModal = bootstrap.Modal.getInstance(document.getElementById("my-modal-01"));
  if (myModal) myModal.hide();
}

// Remove tag chip click
document.getElementById("my-modal-01").addEventListener("click", function(e) {
  var removeBtn = e.target.closest(".lb-tag-remove");
  if (!removeBtn) return;
  var chip = removeBtn.closest(".lb-tag");
  var tag = chip.dataset.tag;
  var num = currentSlideNum();
  var tags = getPhotoTags(_lbPath, num).filter(function(t) { return t !== tag; });
  setPhotoTags(_lbPath, num, tags);
  renderTagEditor();
});

// ── Search index ─────────────────────────────────────────────────────────────
// Index is per-photo. Each entry: { path, num, imgSrc, seriesTitle, tags[] }
// Series-level tags (title words + category) are inherited by every photo in the series.
// Per-photo tags come from localStorage and are checked live at search time.

function buildSearchIndex() {
  var index = [];
  function addEntries(grid, category) {
    grid.forEach(function(col) {
      col.forEach(function(item) {
        var path = item[0];
        var count = item[1];
        var title = item[2];
        var seriesTags = [category.toLowerCase()].concat(
          title.toLowerCase().replace(/['']/g, "").split(/[\s\-_]+/).filter(function(w) { return w.length > 1; }),
          item[4] || []
        );
        for (var n = 1; n <= count; n++) {
          index.push({
            path: path,
            num: n,
            count: count,
            imgSrc: path + "/sean-mac-andrew-" + pad(n) + ".jpg",
            seriesTitle: title,
            seriesTags: seriesTags,
          });
        }
      });
    });
  }
  addEntries(BRANDS, "brands");
  addEntries(FASHION, "fashion");
  return index;
}

var SEARCH_INDEX = buildSearchIndex();

function photoMatchesQuery(entry, terms) {
  var photoTags = getPhotoTags(entry.path, entry.num);
  var allTags = entry.seriesTags.concat(photoTags);
  return terms.every(function(term) {
    return allTags.some(function(tag) { return tag.indexOf(term) !== -1; });
  });
}

// ── Search single-photo viewer ────────────────────────────────────────────────

var _spPath = "";
var _spNum = 0;

function renderSearchPhotoTags() {
  var tags = getPhotoTags(_spPath, _spNum);
  var editor = document.getElementById("search-photo-tags");
  editor.innerHTML = tags.map(function(t) {
    return '<span class="lb-tag" data-tag="' + t + '">' + t + ' <i class="fas fa-times lb-tag-remove"></i></span>';
  }).join("");
}

function openSearchPhoto(path, num, e) {
  if (e) e.stopPropagation();
  _spPath = path;
  _spNum = num;
  document.getElementById("search-photo-img").src = path + "/sean-mac-andrew-" + pad(num) + ".jpg";
  renderSearchPhotoTags();
  document.getElementById("search-photo-viewer").classList.add("open");
}

function closeSearchPhoto() {
  document.getElementById("search-photo-viewer").classList.remove("open");
  showSearchTab();
}

document.getElementById("search-photo-viewer").addEventListener("click", function(e) {
  var removeBtn = e.target.closest(".lb-tag-remove");
  if (!removeBtn) return;
  var tag = removeBtn.closest(".lb-tag").dataset.tag;
  var tags = getPhotoTags(_spPath, _spNum).filter(function(t) { return t !== tag; });
  setPhotoTags(_spPath, _spNum, tags);
  renderSearchPhotoTags();
});

// ── Search tab ────────────────────────────────────────────────────────────────

function showSearchTab() {
  var tabEl = document.getElementById("search-nav-link");
  bootstrap.Tab.getOrCreateInstance(tabEl).show();
  document.getElementById("burger-menu").classList.remove("open");
}

document.getElementById("search-nav-link").addEventListener("shown.bs.tab", function() {
  document.getElementById("search-input").focus();
  runSearch(document.getElementById("search-input").value);
});

function runSearch(query) {
  var resultsEl = document.getElementById("search-results");
  var q = query.trim().toLowerCase();
  var matches;
  if (!q) {
    matches = SEARCH_INDEX;
  } else {
    var terms = q.split(/\s+/);
    matches = SEARCH_INDEX.filter(function(entry) { return photoMatchesQuery(entry, terms); });
  }
  if (matches.length === 0) {
    resultsEl.innerHTML = '<p class="search-no-results">No results</p>';
    return;
  }
  resultsEl.innerHTML = matches.map(function(entry) {
    return '<div class="search-result-item" data-lightbox="' + entry.path + '" data-count="' + entry.count + '" data-num="' + entry.num + '">' +
      '<img src="' + entry.imgSrc + '" alt="" loading="lazy" />' +
      '<p>' + entry.seriesTitle + '</p>' +
      '</div>';
  }).join("");
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

document.getElementById("search-input").addEventListener("input", function() {
  runSearch(this.value);
});

document.addEventListener("keydown", function(e) {
  var tagInputActive = false;
  var modalVisible = document.getElementById("my-modal-01").classList.contains("show");

  if (!tagInputActive && modalVisible) {
    if (e.key === "Escape") { document.getElementById("modal-carousel-01-close").click(); return; }
    if (e.key === "ArrowLeft")  { document.getElementById("modal-carousel-01-prev").click(); return; }
    if (e.key === "ArrowRight") { document.getElementById("modal-carousel-01-next").click(); return; }
  }

  if (e.key !== "Escape" || tagInputActive) return;
  if (document.getElementById("search-photo-viewer").classList.contains("open")) {
    closeSearchPhoto();
  } else {
    document.getElementById("burger-menu").classList.remove("open");
  }
});

document.addEventListener("click", function(e) {
  var item = e.target.closest("[data-lightbox]");
  var menu = document.getElementById("burger-menu");

  if (item) {
    var num = parseInt(item.dataset.num, 10);
    if (num && item.closest("#search")) {
      openSearchPhoto(item.dataset.lightbox, num, e);
    } else {
      openFSLightbox(item.dataset.lightbox, parseInt(item.dataset.count, 10), num || 1);
    }
  } else if (menu && !menu.contains(e.target)) {
    menu.classList.remove("open");
  }
});

// ── Theme toggle ──────────────────────────────────────────────────────────────
if (localStorage.getItem("theme") !== "dark") {
  document.body.classList.add("light");
}

document.getElementById("theme-btn").addEventListener("click", function() {
  var isLight = document.body.classList.toggle("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
