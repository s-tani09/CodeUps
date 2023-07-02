jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  $(document).ready(function () {
    setTimeout(function () {
      const loadingElement = $(".js-loading");
      loadingElement.addClass("loading__fadeOut");

      setTimeout(function () {
        const swiper1 = new Swiper(".js-mv__slider", {
          loop: true,
          speed: 2000,
          autoplay: {
            delay: 2500,
          },
        });
        $(".loading__image").addClass("is-hidden");
        $(".header").addClass("color");
        loadingElement.hide();
      }, 5000);
    }, 5000);
  });
});

// ハンバーガーメニュー
$(".js-hamburger").click(function () {
  $(".js-hamburger").toggleClass("is-active");
  $(".js-sp-nav").fadeToggle();
  $("html").toggleClass("is-fixed");
});

$(window).resize(function () {
  if (window.matchMedia("(min-width: 768px)").matches) {
    closeDrawer();
  }
});

function openDrawer() {
  $(".js-sp-nav").fadeIn();
  $(".js-hamburger").addClass("is-active");
}

function closeDrawer() {
  $(".js-sp-nav").fadeOut();
  $(".js-hamburger").removeClass("is-active");
}

// スライダー
var swiper = new Swiper(".js-mv-slider", {
  loop: true,
  effect: "fade", // フェード切り替え
  // 自動再生
  autoplay: {
    delay: 4000, // 4秒後に次のスライドへ
    disableOnInteraction: false, // ユーザーが操作しても自動再生を継続
  },
  speed: 2000, // 2秒かけてフェード
});

var swiper = new Swiper(".js-campaign-swiper", {
  loop: true,
  slidesPerView: 1.26,
  breakpoints: {
    768: {
      slidesPerView: 3.29,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3.49,
      spaceBetween: 40,
    },
  },
  spaceBetween: 24,
  speed: 2000,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".js-campaign-button-next",
    prevEl: ".js-campaign-button-prev",
  },
});

//要素の取得とスピードの設定
var box = $(".js-colorbox"),
  speed = 700;

//.colorboxの付いた全ての要素に対して下記の処理を行う
box.each(function () {
  $(this).append('<div class="color"></div>');
  var color = $(this).find($(".color")),
    image = $(this).find("img");
  var counter = 0;

  image.css("opacity", "0");
  color.css("width", "0%");
  //inviewを使って背景色が画面に現れたら処理をする
  color.on("inview", function () {
    if (counter == 0) {
      $(this)
        .delay(200)
        .animate({ width: "100%" }, speed, function () {
          image.css("opacity", "1");
          $(this).css({ left: "0", right: "auto" });
          $(this).animate({ width: "0%" }, speed);
        });
      counter = 1;
    }
  });
});

// ボタンをクリックしたらスクロールして上に戻る
// topBtn.click(function () {
//   $("body,html").animate(
//     {
//       scrollTop: 0,
//     },
//     500,
//     "swing"
//   );
//   return false;
// });

// スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

// $(document).on("click", 'a[href*="#"]', function () {
//   let time = 400;
//   let header = $("header").innerHeight();
//   let target = $(this.hash);
//   if (!target.length) return;
//   let targetY = target.offset().top - header;
//   $("html,body").animate({ scrollTop: targetY }, time, "swing");
//   return false;
// });
