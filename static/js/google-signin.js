if(getCookie("logged_in")=="true") {
  window.location.href = "/";
}

function renderButton() {
  gapi.signin2.render('sign-form-google-btn', {
    'scope': 'profile email',
    'width': 300,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSignIn
  });
}

function onSignIn(googleUser) {
  const uri = NODE_API_HOST+"/v1/signin/callback"
  const id_token = googleUser.getAuthResponse().id_token;

  $.post(uri, {id_token: id_token}, function() {
    document.cookie = "logged_in=true";
    window.location.replace("/");
  });
}