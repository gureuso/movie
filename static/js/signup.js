$(".sign-form-btn").click(function() {
  const email = $("input[name='email']").val();
  const password = $("input[name='password']").val();
  const nickname = $("input[name='nickname']").val();
  const phone = $("input[name='phone']").val();
  const age = $("input[name='age']").val();

  const uri = NODE_API_HOST+"/v1/signup"
  const data = {email: email, password: password, nickname: nickname, phone: phone, age: age}
  $.post(uri, data, function(data) { 
  })
    .done(function() {
      alert("success");
      window.location.href = "/signin"
    })
    .fail(function(data) {
      alert(data.status);
    });
});