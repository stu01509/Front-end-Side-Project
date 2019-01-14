$(document).ready(function () {
  $(window).scroll(function () {
    if ($(document).scrollTop() > 30) {
      $('#nav').addClass('change');
      $('#nav').addClass('.navbar-inverse .navbar-nav>li>a');
      $('#nav').addClass('.navbar-inverse .navbar-brand');
    } else {
      $('#nav').removeClass('change');
      $('#nav').removeClass('.navbar-inverse .navbar-nav>li>a');
      $('#nav').removeClass('.navbar-inverse .navbar-brand');
    }
  });
});