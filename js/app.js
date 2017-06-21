//Мобильная шапка сайта
var toggle = document.querySelector(".page-header__wrapper");
toggle.classList.add("page-header__wrapper--js");
var toggleIcon = toggle.querySelector(".page-header__toggle");
var menu = document.querySelector(".page-header__menu");
var userMenu = document.querySelector(".page-header__user-menu");

toggleIcon.addEventListener("click", function(event) {
  event.preventDefault();
  toggle.classList.toggle("page-header__wrapper--closed");

  if (!toggle.classList.contains("page-header__wrapper--closed")) {
    userMenu.style.top = "calc(100% + " + menu.offsetHeight + "px)";
  }
});

//Отзывы
var prevReview = document.querySelector(".js-prev-button");
var nextReview = document.querySelector(".js-next-button");
var reviews = document.querySelectorAll(".reviews__item");
var reviewsAuthors = document.querySelectorAll(".reviews__author");
var n = reviews.length;

if (prevReview !== null) {
  prevReview.addEventListener("click", function(event) {
    event.preventDefault();
    var currentReview = document.querySelector(".reviews__item--current");
    var currentAuthor = document.querySelector(".reviews__author--current");
    var currentN;
    for (var i = 0; i < n; i++) {
      if (reviews[i] === currentReview) {
        currentN = i;
      }
    }
    if (currentN > 0) {
      currentReview.classList.remove("reviews__item--current");
      currentAuthor.classList.remove("reviews__author--current");
      reviews[currentN - 1].classList.add("reviews__item--current");
      reviewsAuthors[currentN - 1].classList.add("reviews__author--current");
    }
  });

  nextReview.addEventListener("click", function(event) {
    event.preventDefault();
    var currentReview = document.querySelector(".reviews__item--current");
    var currentAuthor = document.querySelector(".reviews__author--current");
    var currentN;
    for (var i = 0; i < n; i++) {
      if (reviews[i] === currentReview) {
        currentN = i;
      }
    }

    if (currentN < (n - 1)) {
      currentReview.classList.remove("reviews__item--current");
      currentAuthor.classList.remove("reviews__author--current");
      reviews[currentN + 1].classList.add("reviews__item--current");
      reviewsAuthors[currentN + 1].classList.add("reviews__author--current");
    }
  });
}

//Карта
var mapImg = document.querySelector(".contacts__location-link");
var mapContainer = document.querySelector(".contacts__location-map");
var map;

if (mapImg !== null) {
  mapImg.classList.add("contacts__location-link--js");
  mapContainer.classList.add("contacts__location-map--js");

  function initMap() {

    map = new google.maps.Map(mapContainer, {
      center: {lat: 59.936749, lng: 30.321774},
      zoom: 16
    });

    var marker = new google.maps.Marker({

      position: {lat: 59.936386, lng: 30.321673},

      map: map,
      optimized: false,
      icon: {
        url: "/img/icon-map-pin.svg",
        scaledSize: new google.maps.Size(67, 100)
      }
    });
  }
}

//Модальное окно
var order = document.querySelector(".week-product__order");
var addCart = document.querySelectorAll(".product-preview__add-cart");
var modal = document.querySelector(".modal");
var modalOverlay = document.querySelector(".modal__overlay");

if (order !== null) {
  order.addEventListener("click", function(event) {
    event.preventDefault();
    modal.classList.add("modal--open");
  });
}

if (addCart !== null) {
  for (var i = 0; i < addCart.length; i++) {
    addCart[i].addEventListener("click", function(event) {
      event.preventDefault();
      modal.classList.add("modal--open");
    });
  }
}

modalOverlay.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.remove("modal--open");
});


//Имитация :active для IE11
var cardProduct = document.querySelectorAll(".product-preview");
var cardVideo = document.querySelector(".production__wrapper");

if (cardProduct !== null) {
  for (i = 0; i < cardProduct.length; i++) {
    cardProduct[i].addEventListener("mouseover", function(event) {
      this.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.1)";
    });

    cardProduct[i].addEventListener("mousedown", function(event) {
      this.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.1)";
    });

    cardProduct[i].addEventListener("mouseup", function(event) {
      this.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.1)";
    });

    cardProduct[i].addEventListener("mouseout", function(event) {
      this.style.boxShadow = "none";
    });
  }
}

if (cardVideo !== null) {
  cardVideo.addEventListener("mouseover", function(event) {
    this.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.1)";
  });

  cardVideo.addEventListener("mousedown", function(event) {
    this.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.1)";
  });

  cardVideo.addEventListener("mouseup", function(event) {
    this.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.1)";
  });

  cardVideo.addEventListener("mouseout", function(event) {
    this.style.boxShadow = "none";
  });
}
