if(getCookie("logged_in")=="true") {
  $(".breadcrumb > .ml-auto").html('<a href="/signout">signout</a>');
} else {
  $(".breadcrumb > .ml-auto").html('<div><a href="/signup">signup</a>&nbsp;/&nbsp;<a href="/signin">signin</a></div>');
}