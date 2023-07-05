jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  $(document).ready(function () {
    // ページの読み込みが完了した時点で実行されるコード

    // ローディング要素を取得
    const loadingElement = $(".js-loading");

    // 初回のみローディング画面を表示するための条件判定
    if (localStorage.getItem("firstLoad") === null) {
      // 初回の場合

      // ローカルストレージにフラグを保存
      localStorage.setItem("firstLoad", "loaded");

      // ローディング画面の表示
      loadingElement.show();

      setTimeout(function () {
        // ローディング画面を非表示にする処理

        // フェードアウトのアニメーションクラスを追加
        loadingElement.addClass("loading__fadeOut");

        setTimeout(function () {
          // ローディングが完了した後の処理

          // Swiperの初期化などの必要な処理を行う
          const swiper = new Swiper(".js-mv__slider", {
            loop: true,
            speed: 2000,
            autoplay: {
              delay: 2500,
            },
          });

          // ローディング画面の要素を非表示にする
          $(".loading__image").addClass("is-hidden");
          $(".header").addClass("color");
          loadingElement.hide();
        }, 3700);
      }, 3700);
    } else {
      // 初回ではない場合

      // ローディング要素を非表示にする
      loadingElement.hide();

      // 初回以降の処理を行う（例えばSwiperの初期化など）
      const swiper1 = new Swiper(".js-mv__slider", {
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 2500,
        },
      });
      $(".loading__image").addClass("is-hidden");
      $(".header").addClass("color");
    }
  });

  // ハンバーガーメニュー
  $(".js-hamburger,.js-sp-nav").click(function () {
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
    effect: "fade",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 2000,
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

  // ページトップボタン
  $(window).on("scroll", function () {
    let scrollHeight = $(document).height();
    let scrollPosition = $(window).height() + $(window).scrollTop();
    let footHeight = $("footer").innerHeight();
    if (scrollHeight - scrollPosition <= footHeight) {
      $(".js-page-top").css({
        position: "absolute",
        bottom: footHeight + 19,
      });
    } else {
      $(".js-page-top").css({
        position: "fixed",
        bottom: "16px",
      });
      9;
    }
  });

  let topBtn = $(".js-page-top");
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500,
      "swing"
    );
    return false;
  });
});
