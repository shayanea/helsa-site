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
    loop: true,
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
});
