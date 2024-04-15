let menu = document.getElementById("nav");
let open = document.getElementById("menu-btn");
let close = document.getElementById("close");

function openmenu() {
  menu.style.left = "0";
  open.style.display = "none";
  close.style.display = "block";
}

function closemenu() {
  menu.style.left = "-100%";
  open.style.display = "block";
  close.style.display = "none";
}

// nav bg color change
function change() {
  var nav = document.getElementById("navbar");
  var value = window.scrollY;
  if (value > 80) {
    nav.classList.add("nav-change");
  } else {
    nav.classList.remove("nav-change");
  }
}
window.addEventListener("scroll", change);

// Side menu close om click
var navDiv = document.getElementById("nav");
var divsToClick = document.querySelectorAll(".links a");
for (var i = 0; i < divsToClick.length; i++) {
    divsToClick[i].addEventListener("click", function() {
      if (window.innerWidth < 768) {
        menu.style.left = "-100%";
        open.style.display = "block";
        close.style.display = "none";
      }
    });
}

// Small Image Slider navigation
$(".right-arrow").click(function () {
    var currentImg = $(this).siblings(".slider").find("img:visible");
    var nextImg = currentImg.next("img");

    if (nextImg.length === 0) {
        nextImg = currentImg.siblings("img").first();
    }

    currentImg.hide();
    nextImg.show();
});
$(".left-arrow").click(function () {
    var currentImg = $(this).siblings(".slider").find("img:visible");
    var prevImg = currentImg.prev("img");

    if (prevImg.length === 0) {
        prevImg = currentImg.siblings("img").last();
    }

    currentImg.hide();
    prevImg.show();
});

// Open full-screen on image click
$(".apartments-img img").click(function () {
  var imgSrc = $(this).attr("src");
  var sliderId = $(this).closest('.slider').attr('id'); // Get the ID of the parent slider
  $("#modalImage").attr("src", imgSrc);
  $("#modalImage").attr("data-slider-id", sliderId); // Store the slider ID as data attribute
  $("#imageModal").css("display", "block");
  $("#imageModal").css("z-index", "11000");

  // Show/hide left and right arrows based on image position
  updateModalArrows(imgSrc);
});
// Function to show/hide modal arrows based on image position
function updateModalArrows(imgSrc) {
  var currentSliderId = $("#modalImage").attr("data-slider-id");
  var allImages = $("#" + currentSliderId).find('img'); // Find images only within the current slider
  var currentIndex = allImages.index(allImages.filter('[src="' + imgSrc + '"]'));

  // Show/hide left arrow
  if (currentIndex === 0) {
      $("#prevImage").hide();
  } else {
      $("#prevImage").show();
  }

  // Show/hide right arrow
  if (currentIndex === allImages.length - 1) {
      $("#nextImage").hide();
  } else {
      $("#nextImage").show();
  }
}
// Navigate to the previous image
$("#prevImage").click(function () {
  var currentImg = $("#modalImage").attr("src");
  var currentSliderId = $("#modalImage").attr("data-slider-id");
  var allImages = $("#" + currentSliderId).find('img'); // Find images only within the current slider
  var currentIndex = allImages.index(allImages.filter('[src="' + currentImg + '"]'));
  
  if (currentIndex > 0) {
      var prevImg = allImages.eq(currentIndex - 1).attr("src");
      $("#modalImage").attr("src", prevImg);
      updateModalArrows(prevImg);
  }
});
// Navigate to the next image
$("#nextImage").click(function () {
  var currentImg = $("#modalImage").attr("src");
  var currentSliderId = $("#modalImage").attr("data-slider-id");
  var allImages = $("#" + currentSliderId).find('img'); // Find images only within the current slider
  var currentIndex = allImages.index(allImages.filter('[src="' + currentImg + '"]'));
  
  if (currentIndex < allImages.length - 1) {
      var nextImg = allImages.eq(currentIndex + 1).attr("src");
      $("#modalImage").attr("src", nextImg);
      updateModalArrows(nextImg);
  } else {
      // If it's the last image, do nothing
  }
});
// Close full-screen modal/close button
$("#closeModal").click(function () {
  $("#imageModal").css("display", "none");
});
// Close full-screen modal when clicking outside of the modal content
$(window).click(function (e) {
  if (e.target === document.getElementById("imageModal")) {
      $("#imageModal").css("display", "none");
  }
});


// Guide/Pdf
var openGuideBtn = document.getElementById("openGuideBtn");
var pdfGuide = document.getElementById("pdfGuide");
var closeBtn = document.querySelector(".close");
var pdfObject = document.getElementById("pdfObject");
// Open Guide
function openGuide() {
  pdfGuide.style.display = "block";
}
// Close Guide
function closeGuide() {
  pdfGuide.style.display = "none";
  pdfObject.data = "";
}
openGuideBtn.addEventListener("click", openGuide);
closeBtn.addEventListener("click", closeGuide);

// Language
var language;
function getLanguage() {
  var selectedLanguage = localStorage.getItem('language') || 'en';
  
  $.ajax({
    url: '/language/' + selectedLanguage + '.json',
    dataType: 'json',
    async: false,
    success: function (lang) {
      language = lang;
      updateLanguageText();
    }
  });
}
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  // Reload language data
  getLanguage();
}
function updateLanguageText() {
  $('[data-translate]').each(function () {
    var key = $(this).data('translate');
    if (language && language[key] !== undefined) {
      if ($(this).html().includes('<span>')) {
        // Preserve HTML structure when translation includes a span tag
        $(this).html(language[key]);
      } else {
        // Replace text content for plain text translations
        $(this).text(language[key]);
      }
    }
  });
}
$(".this_language").click(function () {
  var selectedLang = $(this).data('lang');
  setLanguage(selectedLang);
});
// Initialize the language when the page loads
getLanguage();

$(document).ready(function () {
  // Show language options when hovering over the button
  $(".language-dropdown").hover(
    function () {
      $(".language-options").show();
    },
    function () {
      $(".language-options").hide();
    }
  );
  // Hide language options when a language is selected
  $(".this_language").click(function () {
    $(".language-options").hide();
  });
});

// Loader
