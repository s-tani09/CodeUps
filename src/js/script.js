jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  // ローディング
  $(document).ready(function () {
    setTimeout(function () {
      const loadingElement = $(".js-loading");
      loadingElement.addClass("is-close");

      setTimeout(function () {
        const swiper1 = new Swiper(".js-mv__slider", {
          loop: true,
          speed: 1500,
          autoplay: {
            delay: 2000,
          },
        });
        $(".loading__image").addClass("is-hidden");
        $(".header").addClass("color");
        loadingElement.hide();
      }, 2200);
    }, 2200);
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
  $(".js-header, .js-hamburger").removeClass("is-active");
}

$(document).ready(function () {
  $(".js-hamburger,.js-sp-nav").click(function () {
    $(".js-header").toggleClass("is-active");
  });
});

// mv - swiper
var swiper = new Swiper(".js-mv-slider", {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  speed: 2000,
});

// campaign - swiper
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

// Information - tab
$(document).ready(function () {
  // 別ページから遷移した際の処理
  $(window).on("load", function () {
    var hash = window.location.hash;
    var index = getIndexFromHash(hash);
    if (index !== null) {
      scrollToSection(index);
    }
  });
  // 最初のタブをデフォルトで表示
  $(".js-information-content:first-of-type").css("display", "block");
  var hash = window.location.hash;
  // hashからインデックスを取得
  var index = getIndexFromHash(hash);
  showCategory(index);
  $(".js-information-tab").on("click", function () {
    var index = $(this).index();
    showCategory(index);
  });
  function showCategory(index) {
    $(".js-information-tab").removeClass("current");
    $(".js-information-tab").eq(index).addClass("current");
    $(".js-information-content").hide().eq(index).fadeIn(300);
  }
  function getIndexFromHash(hash) {
    // デフォルトのインデックス
    var defaultIndex = 0;
    if (!hash.startsWith("#info")) {
      return defaultIndex;
    }
    var index = parseInt(hash.replace("#info", ""), 10) - 1; // 0-based index
    if (isNaN(index) || index < 0 || index >= $(".js-information-tab").length) {
      return defaultIndex;
    }
    return index;
  }
  $('a[href^="#"]').click(function () {
    // スクロールの速さを指定します。この場合は600ミリ秒かけてスクロールします。
    const speed = 600;
    // クリックされたリンクのhref属性の値（ターゲットセクションのID）を取得します。
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    $("html, body").animate(
      {
        scrollTop: target.offset().top,
      },
      speed
    );
    // リンクをクリックした後に、実際のリンク先にジャンプしないようにします。
    return false;
  });
  // セクションまでスクロールする処理
  function scrollToSection(index) {
    const headerHeight = $(".js-header").height();
    let target = $(".js-information-content").eq(index);
    let targetTop = target.offset().top; // ターゲット要素の上端位置を取得
    let position = targetTop - headerHeight;

    // タブメニューの上にスクロールが止まるように調整
    let tabMenuContainerHeight = $("#info").height();
    position -= tabMenuContainerHeight;

    // さらに微調整
    position -= 30; // 24px だけタブメニューがかかる程度に調整

    $("body,html").animate({ scrollTop: position }, 600, "swing");
  }
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
$(function () {
  const pageTop = $(".js-page-top");
  pageTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });
  pageTop.click(function () {
    $("body, html").animate(
      {
        scrollTop: 0,
      },
      500,
      "swing"
    );
    return false;
  });
});

// アコーディオン - blog-archive
$(document).ready(function () {
  // 初期状態で最初の年の月リストを表示し、▶︎を▼に変更
  $(".side-archive__list:first-of-type .side-archive__month").css("display", "block");
  $(".side-archive__list:first-of-type .js-side-archive__year").addClass("open");

  // 最初の年に open クラスを付ける
  $(".side-archive__list:first-of-type .js-side-archive__year").addClass("open");

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
  // 最初のコンテンツは表示
  $(".js-faq-lists:first-of-type .js-faq-answer").css("display", "block");
  // 最初の矢印は開いた時の状態に
  $(".js-faq-lists:first-of-type .js-faq-question").addClass("is-open");
  // タイトルをクリックすると
  $(".js-faq-question").on("click", function () {
    // クリックしたタイトル以外のis-openクラスを外す
    $(".js-faq-question").not(this).removeClass("is-open");
    // クリックしたタイトル以外のcontentを閉じる
    $(".js-faq-question").not(this).next().slideUp(300);
    // クリックしたタイトルにis-openクラスを付与
    $(this).toggleClass("is-open");
    // クリックしたタイトルのcontentを開閉
    $(this).next().slideToggle(300);
  });
});

// error-message表示
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

// footer
$(window).on("load resize", function () {
  let window_height = window.innerHeight ? window.innerHeight : $(window).innerHeight();
  $(".body-404__wrap").css("min-height", window_height + "px");
});
