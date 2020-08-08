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
  var myModal = $("#my-modal-01").modal();

  // Enable key handler
  document.onkeydown = function(e) {
    switch (e.key) {
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
  // Disable key handler
  document.onkeydown = null;

  $("#my-modal-01").modal("hide");
}

// Randomize first image in Carousel
var $randSlide = Math.floor(Math.random() * 93 + 1);

$(".carousel-item")
  .eq($randSlide)
  .addClass("active");
