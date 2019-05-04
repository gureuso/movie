$(".sign-form-btn").click(function() {
  const email = $("input[name='email']").val();
  const password = $("input[name='password']").val();

  const uri = NODE_API_HOST+"/v1/signin"
  const data = {email: email, password: password}
  $.post(uri, data, function() {
  })
    .done(function() {
      setCookie("logged_in", "true", 1);
      window.location.href = "/";
    })
    .fail(function(data) {
      alert(data.status);
    });
});