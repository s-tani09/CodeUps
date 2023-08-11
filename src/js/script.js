jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  $(function () {
    // sessionStorageの値を判定
    let isFirstAccess = !sessionStorage.getItem("has_visited");

    if (isFirstAccess) {
      // 1回目アクセスの処理
      $(".js-loading").css("display", "block");
      $(".js-loading")
        .delay(3000)
        .fadeOut(2000, function () {
          const swiper1 = new Swiper(".js-mv__slider", {
            loop: true,
            speed: 1500,
            autoplay: {
              delay: 2000,
            },
          });
          $(".js-loading-image").addClass("is-hidden");
          $(".header").addClass("color");
        });
      $("body").css("display", "block");

      // 初回アクセスが完了したことをセッションストレージに記録
      sessionStorage.setItem("has_visited", "true");
    } else {
      // 2回目アクセスの処理
      $(".js-loading").hide();
      $(".js-loading-image, .js-loading").addClass("is-hidden");
      $("body").css("display", "block");
      setTimeout(function () {
        const swiper1 = new Swiper(".js-mv__slider", {
          loop: true,
          speed: 1500,
          autoplay: {
            delay: 2000,
          },
        });
        $(".header").addClass("color");
      }, 3000);
    }
  });
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

$(document).ready(function () {
  $(".js-hamburger,.js-sp-nav").click(function () {
    $(".js-header").toggleClass("is-active");
  });
});

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

$(function () {
  // 最初のコンテンツは表示
  $(".js-information-content:first-of-type").css("display", "block");
  // タブをクリックすると
  $(".js-information-tab").on("click", function () {
    // 現在選択されているタブからcurrentを外す
    $(".current").removeClass("current");
    // クリックされたタブにcurrentクラスを付与
    $(this).addClass("current");
    // クリックされた要素が何番目か取得（クリックしたタブのインデックス番号を取得）
    const index = $(this).index();
    // クリックしたタブのインデックス番号と同じコンテンツを表示
    $(".js-information-content").hide().eq(index).fadeIn(300);
  });
});

// モーダル表示;
let scrollPosition;
$(".js-modal").click(function () {
  scrollPosition = $(window).scrollTop();
  $(".js-modal-window").html($(this).prop("outerHTML"));
  $(".js-modal-window").fadeIn(300);
  $(".js-header, .js-page-top").hide();
  $("html").addClass("is-fixed");
  return false;
});
// モーダル非表示
$(".js-modal-window").click(function () {
  $(".js-modal-window").fadeOut(300, function () {
    $(".js-header, .js-page-top").fadeIn();
    $("html").removeClass("is-fixed");
    $(window).scrollTop(scrollPosition);
  });
  return false;
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

// アコーディオン - blog-archive
$(document).ready(function () {
  // 初期状態で最初の年の月リストを表示し、▶︎を▼に変更
  $(".side-archive__list:first-of-type .side-archive__month").css(
    "display",
    "block"
  );
  $(".side-archive__list:first-of-type .js-side-archive__year").addClass(
    "open"
  );

  // 最初の年に open クラスを付ける
  $(".side-archive__list:first-of-type .js-side-archive__year").addClass(
    "open"
  );

  // 年要素がクリックされたときの処理
  $(".js-side-archive__year").on("click", function () {
    // クリックされた年の次の要素（月リスト）をアニメーション付きで表示/非表示
    $(this).next().slideToggle(300);
    // クリックされた年の要素に「open」クラスをトグル（追加/削除）
    $(this).toggleClass("open", 300);
  });
});

// アコーディオン - FAQ;
$(function () {
  $(".js-faq-lists:first-of-type .js-faq-answer").css("display", "block");
  $(".js-faq-question:first-of-type .js-accordion").addClass("is-open");
  $(".js-faq-question").on("click", function () {
    $(this).toggleClass("is-open");
    $(this).next().slideToggle(300);
  });
});

// $(document).ready(function () {
//   $(".button").click(function (event) {
//     var formValid = true;

//     // 全ての必須フィールドをループでチェック
//     $(".form__input-text[required]").each(function () {
//       if ($(this).val() === "") {
//         formValid = false;
//         $(this).addClass("error");
//       } else {
//         $(this).removeClass("error");
//       }
//     });

//     // プライバシーチェックボックスもチェック
//     if (!$(".form__privacy-text").is(":checked")) {
//       formValid = false;
//       $(".form__privacy-text").addClass("error");
//     } else {
//       $(".form__privacy-text").removeClass("error");
//     }

//     // フォームが無効な場合は送信をキャンセル
//     if (!formValid) {
//       event.preventDefault();
//       $(".page-contact__error").show();
//     }
//   });
// });

$(document).ready(function () {
  $(".js-error-button").click(function (event) {
    var formValid = true;

    // 全ての必須フィールドをループでチェック
    $(".form__input-text[required]").each(function () {
      if ($(this).val() === "") {
        formValid = false;
        $(this).addClass("error");
      } else {
        $(this).removeClass("error");
      }
    });

    // プライバシーチェックボックスもチェック
    if (!$(".form__privacy-text").is(":checked")) {
      formValid = false;
      $(".form__privacy-text").addClass("error");
    } else {
      $(".form__privacy-text").removeClass("error");
    }

    // フォームが無効な場合は送信をキャンセル
    if (!formValid) {
      event.preventDefault();
      $(".page-contact__error").show();

      // エラー時にパンくずリストを表示
      $(".breadcrumbs__item.error").show();
    } else {
      // フォームが有効な場合はサンクスページにリダイレクト
      window.location.href = "page-contact-thanks.html"; // サンクスページのURLに置き換えてください
    }
  });
});

// $(document).ready(function () {
//   // ▼アイコンがクリックされたときの処理
//   $(".form__input-text + span").click(function () {
//     // クリックされたアイコンの親要素を取得
//     var selectContainer = $(this).parent();

//     // 親要素にクラスを追加してセレクトボックスを表示
//     selectContainer.toggleClass("active");

//     // 他の場所をクリックしたらセレクトボックスを非表示にする処理
//     $(document).on("click", function (event) {
//       if (
//         !selectContainer.is(event.target) &&
//         selectContainer.has(event.target).length === 0
//       ) {
//         selectContainer.removeClass("active");
//       }
//     });
//   });
// });
