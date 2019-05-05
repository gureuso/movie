if(getCookie("google_logged_in") == "true") {
  deleteCookie("logged_in")
  deleteCookie("google_logged_in")
  document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://movie.gureuso.me";
}
