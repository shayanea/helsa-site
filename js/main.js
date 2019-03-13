$(window).load(function() {
  function t(t) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(t).toLowerCase()
    );
  }
  $(document).on("click", ".resource-container .resource-title", function(e) {
    $(".resource-container").toggleClass("expand");
  });
  setTimeout(function() {
    $(".loading-container").addClass("split");
  }, 1e3),
    setTimeout(function() {
      $("body").addClass("loaded"), $(".loading-container").addClass("hide");
    }, 1600),
    $(".banner .owl-carousel").owlCarousel({ rtl: !0, loop: !1, margin: 10, nav: !0, dots: !1, responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } } });
  $("#support").length &&
    (document.getElementById("support").onsubmit = function(e) {
      e.preventDefault(),
        "" !== e.target[0].value && "" !== e.target[2].value && "" !== e.target[3].value && t(e.target[2].value)
          ? ($(".contactus .submit-btn").html(
              '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\twidth="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">\n <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">\n\t <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />\n\t <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />\n\t <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />\n </rect>\n <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">\n\t <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />\n\t <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />\n\t <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />\n </rect>\n <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">\n\t <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />\n\t <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />\n\t <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />\n </rect>\n</svg>'
            ),
            (function(t = "", e = {}) {
              return fetch(t, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(e)
              }).then(t => t.json());
            })("https://helsa.herokuapp.com/supports", { fullname: e.target[0].value, tel: e.target[1].value, email: e.target[2].value, message: e.target[3].value })
              .then(t => {
                $(".contactus .success").css("display", "block"), $(".contactus .col").css("display", "none");
              })
              .catch(t => {
                $(".contactus .submit-btn").html("ارسال پیام"), alert("در ارسال پیام شما مشکلی به وجود آمده است٬ مجددا تلاش نمایید.");
              }))
          : ("" === e.target[0].value && $("#support input[name='fullname']").addClass("error"),
            ("" !== e.target[2].value && t(e.target[2].value)) || $("#support input[name='email']").addClass("error"),
            "" === e.target[3].value && $("#support textarea[name='message']").addClass("error"));
    });
});
