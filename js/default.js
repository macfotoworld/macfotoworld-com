"use strict";

function openFSLightbox(url, length) {
  // Template Carousel
  var i;
  var html = "";
  var active = " active";
  for (i = 1; i <= length; i++) {
    var padded = String(i).padStart(2, "0");
    html += `
<div class="carousel-item${active}">
    <img class="d-block mx-auto" src="${url}/sean-mac-andrew-${padded}.jpg">
</div>
`;
    active = "";
  }
  document.getElementById("modal-carousel-inner").innerHTML = html;

  // Open Modal
  var modalEl = document.getElementById("my-modal-01");
  var myModal = new bootstrap.Modal(modalEl);
  myModal.show();

  // Enable key handler
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

function toggleMobileNav() {
  document.getElementById("mobile-nav-overlay").classList.toggle("d-none");
}

function closeFSLightbox() {
  // Disable key handler
  document.onkeydown = null;

  var modalEl = document.getElementById("my-modal-01");
  var myModal = bootstrap.Modal.getInstance(modalEl);
  if (myModal) myModal.hide();
}

// Randomize first image in Carousel
var $randSlide = Math.floor(Math.random() * 93 + 1);

document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".carousel-item");
  if (items.length > 0) {
    var idx = Math.floor(Math.random() * items.length);
    items[idx].classList.add("active");
  }
});
