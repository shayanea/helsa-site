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

  if ($("#support").length) {
    document.getElementById("support").onsubmit = function(e) {
      e.preventDefault();
      if (e.target[0].value !== "" && e.target[2].value !== "" && e.target[3].value !== "" && validateEmail(e.target[2].value)) {
        postData(`https://helsa.herokuapp.com/supports`, {
          fullname: e.target[0].value,
          tel: e.target[1].value,
          email: e.target[2].value,
          message: e.target[3].value
        })
          .then(data => {
            alert("پیام شما با موفقیت ارسال گردید.");
          })
          .catch(error => {
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
