$(window).load(function() {
  setTimeout(function() {
    $(".loading-container").addClass("split");
  }, 1000);

  setTimeout(function() {
    $("body").addClass("loaded");
    $(".loading-container").addClass("hide");
  }, 1600);

  $(".banner .owl-carousel").owlCarousel({
    rtl: true,
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  function postData(url = ``, data = {}) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    }).then(response => response.json());
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  var loadingSvg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
 <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
	 <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
	 <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
	 <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
 </rect>
 <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">
	 <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
	 <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
	 <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
 </rect>
 <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">
	 <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
	 <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
	 <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
 </rect>
</svg>`;

  if ($("#support").length) {
    document.getElementById("support").onsubmit = function(e) {
      e.preventDefault();
      if (e.target[0].value !== "" && e.target[2].value !== "" && e.target[3].value !== "" && validateEmail(e.target[2].value)) {
        $(".contactus .submit-btn").html(loadingSvg);
        postData(`https://helsa.herokuapp.com/supports`, {
          fullname: e.target[0].value,
          tel: e.target[1].value,
          email: e.target[2].value,
          message: e.target[3].value
        })
          .then(data => {
            $(".contactus .success").css("display", "block");
            $(".contactus .col").css("display", "none");
          })
          .catch(error => {
            $(".contactus .submit-btn").html("ارسال پیام");
            alert("در ارسال پیام شما مشکلی به وجود آمده است٬ مجددا تلاش نمایید.");
          });
      } else {
        if (e.target[0].value === "") {
          $("#support input[name='fullname']").addClass("error");
        }

        if (e.target[2].value === "" || !validateEmail(e.target[2].value)) {
          $("#support input[name='email']").addClass("error");
        }

        if (e.target[3].value === "") {
          $("#support textarea[name='message']").addClass("error");
        }
      }
    };
  }
});
