$(".sign-form-btn").click(function() {
  const email = $("input[name='email']").val();
  const password = $("input[name='password']").val();

  const uri = NODE_API_HOST+"/v1/signin"
  const data = {email: email, password: password}
  $.post(uri, data, function() {
  })
    .done(function() {
      document.cookie = "logged_in=true";
      window.location.href = "/";
    })
    .fail(function(data) {
      alert(data.status);
    });
});