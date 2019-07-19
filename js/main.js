$(window).load(function() {
  function t(t) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(t).toLowerCase()
    );
  }

  $(document).on("click", ".resource-container .resource-title", function(e) {
    $(".resource-container").toggleClass("expand");
  });

  $(document).on("click", "#goToFeatures", function(e) {
    e.preventDefault();
    $("html,body").animate({
      scrollTop: $(".section-1").offset().top
    });
  });

  $(document).on("click", "#goToDownload", function(e) {
    e.preventDefault();
    $("html,body").animate({
      scrollTop: $(".section-5").offset().top
    });
  });

  $(".goal").on("input", function() {
    var goal = $(".goal").val(),
      text = "";
    if (Number(goal) === 2) {
      text = "کم کردن";
    }
    if (Number(goal) === 3) {
      text = "اضافه کردن";
    }
    console.log(Number(goal));
    $("#rangePicker").css("display", Number(goal) === 2 || Number(goal) === 3 ? "block" : "none");
    $("#range-title").html(text);
  });

  $(".range[type=range]").on("input", function() {
    $("#range-result").html($(this).val() + " کیلو‌گرم در هفته");
  });

  function toEnglishDigits(string) {
    string = typeof string === "number" ? JSON.stringify(string) : string;
    var e = "۰".charCodeAt(0);
    string = string.replace(/[۰-۹]/g, function(t) {
      return t.charCodeAt(0) - e;
    });
    e = "٠".charCodeAt(0);
    string = string.replace(/[٠-٩]/g, function(t) {
      return t.charCodeAt(0) - e;
    });
    return string;
  }

  $(document).on("click", ".bmi-calculator .submit-btn", function(e) {
    e.preventDefault();
    var formData = $(".bmi-calculator").serializeArray(),
      isValid = true;
    $(".bmi-calculator input, .bmi-calculator select").each(function() {
      $(this).val(0);
      if ($.trim($(this).val()) == "") {
        isValid = false;
        $(this).css({
          border: "1px solid #c0392b"
        });
      } else {
        $(this).css({
          border: "1px solid #eee"
        });
      }
    });

    if (!isValid) e.preventDefault();
    if (isValid) {
      var bmrScore = 0;
      if (Number(formData[0].value) === 1) {
        bmrScore = 655 + 9.6 * Number(formData[3].value) + 1.8 * Number(formData[2].value) - 4.7 * Number(formData[1].value);
      } else {
        bmrScore = 66 + 13.7 * Number(formData[3].value) + 5 * Number(formData[2].value) - 6.8 * Number(formData[1].value);
      }
      if (Number(formData[5].value) === 1) {
        bmrScore = Math.floor(bmrScore * 1.2);
        calculateUserBMRBasedOnType(bmrScore, formData[7].value, formData[6].value);
      } else if (Number(formData[5].value) === 2) {
        bmrScore = Math.floor(bmrScore * 1.375);
        calculateUserBMRBasedOnType(bmrScore, formData[7].value, formData[6].value);
      } else if (Number(formData[5].value) === 3) {
        bmrScore = Math.floor(bmrScore * 1.55);
        calculateUserBMRBasedOnType(bmrScore, formData[7].value, formData[6].value);
      } else if (Number(formData[5].value) === 4) {
        bmrScore = Math.floor(bmrScore * 1.55);
        calculateUserBMRBasedOnType(bmrScore, formData[7].value, formData[6].value);
      } else if (Number(formData[5].value) === 5) {
        bmrScore = Math.floor(bmrScore * 1.1725);
        calculateUserBMRBasedOnType(bmrScore, formData[7].value, formData[6].value);
      }
      calculateBMI((formData[3].value / formData[2].value / formData[2].value) * 10000);
    }
  });

  function calculateBMI(bmiScore) {
    $(".bmi-score").html(parseFloat(bmiScore).toFixed(1));
    if (bmiScore < 16) {
      // s$(".bmi-color").css("background-color", "#999");
      return $(".bmi-message").html("کمبود وزن شدید");
    } else if (bmiScore >= 16 && bmiScore < 17) {
      // s$(".bmi-color").css("background-color", "#999");
      return $(".bmi-message").html("کمبود وزن متوسط");
    } else if (bmiScore >= 17 && bmiScore < 18.5) {
      // s$(".bmi-color").css("background-color", "#999");
      return $(".bmi-message").html("کمبود وزن ملایم");
    } else if (bmiScore >= 18.5 && bmiScore < 25) {
      // s$(".bmi-color").css("background-color", "#999");
      return $(".bmi-message").html("وزن ایده ال");
    } else if (bmiScore >= 25 && bmiScore < 30) {
      // s$(".bmi-color").css("background-color", "#999");
      return $(".bmi-message").html("اضافه وزن");
    } else if (bmiScore >= 30 && bmiScore < 35) {
      // s$(".bmi-color").css("background-color", "#999");
      return $(".bmi-message").html("چاقی شدید درجه ۱");
    } else if (bmiScore >= 35 && bmiScore < 40) {
      // s$(".bmi-color").css("background-color", "#999");
      return $(".bmi-message").html("چاقی شدید درجه ۲");
    } else {
      // s$(".bmi-color").css("background-color", "#999");
      return $(".bmi-message").html("چاقی شدید درجه ۳");
    }
  }

  function calculateUserBMRBasedOnType(calorie, duration, goal) {
    if (Number(goal) === 2) {
      switch (Number(duration)) {
        case 0.2:
          return $(".bmr-score").html(parseInt((calorie * 90) / 100));
        case 0.3:
          return $(".bmr-score").html(parseInt((calorie * 86.5) / 100));
        case 0.4:
          return $(".bmr-score").html(parseInt((calorie * 83.3) / 100));
        case 0.5:
          return $(".bmr-score").html(parseInt((calorie * 79) / 100));
        case 0.6:
          return $(".bmr-score").html(parseInt((calorie * 76) / 100));
        case 0.7:
          return $(".bmr-score").html(parseInt((calorie * 72.5) / 100));
        case 0.8:
          return $(".bmr-score").html(parseInt((calorie * 69) / 100));
        case 0.9:
          return $(".bmr-score").html(parseInt((calorie * 65.5) / 100));
        case 1:
          return $(".bmr-score").html(parseInt((calorie * 59) / 100));
      }
    }
    if (Number(goal) === 3) {
      switch (Number(duration)) {
        case 0.2:
          return $(".bmr-score").html(parseInt((calorie * 10) / 100 + calorie));
        case 0.3:
          return $(".bmr-score").html(parseInt((calorie * 13.5) / 100 + calorie));
        case 0.4:
          return $(".bmr-score").html(parseInt((calorie * 17) / 100 + calorie));
        case 0.5:
          return $(".bmr-score").html(parseInt((calorie * 21) / 100 + calorie));
        case 0.6:
          return $(".bmr-score").html(parseInt((calorie * 24.5) / 100 + calorie));
        case 0.7:
          return $(".bmr-score").html(parseInt((calorie * 28) / 100 + calorie));
        case 0.8:
          return $(".bmr-score").html(parseInt((calorie * 31.5) / 100 + calorie));
        case 0.9:
          return $(".bmr-score").html(parseInt((calorie * 35) / 100 + calorie));
        case 1:
          return $(".bmr-score").html(parseInt((calorie * 41) / 100 + calorie));
      }
    }
    return $(".bmr-score").html(parseInt(calorie));
  }

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
