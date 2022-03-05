// 登入事件
$("#loginBtn").on("click", function () {
  // 取得使用者輸入的帳號
  var account = $("#account").val();
  // 取得使用者輸入的密碼
  var password = $("#password").val();
  // 客戶端檢查
  // 檢查使用者有沒有輸入帳號
  if (account.trim().length == 0) {
    $("#accTip").html("請輸入帳號");
    $("#warning").addClass("bi bi-exclamation-triangle-fill");
    return false;
  } else {
    $("#accTip").html("");
    $("#warning").removeClass("bi bi-exclamation-triangle-fill");
  }
  // 檢查使用者有沒有輸入密碼
  if (password.trim().length == 0) {
    $("#pasTip").html("請輸入密碼");
    $("#warning").addClass("bi bi-exclamation-triangle-fill");
    return false;
  } else {
    $("#pasTip").html("");
    $("#warning").removeClass("bi bi-exclamation-triangle-fill");
  }
  // 使用者登入檢查帳密
  $.ajax({
    type: "post",
    url: "/login",
    data: {
      account: account,
      password: password,
    },
    success: function (result) {
      console.log(result);
      location.href = "user.html";
      $("#warning").removeClass("bi bi-exclamation-triangle-fill");
    },
    error: function (err) {
      console.log(err.responseText);
      $("#accTip").html("帳號或密碼錯誤");
      $("#warning").addClass("bi bi-exclamation-triangle-fill");
    },
  });
});
$("#registerBtn").on("click", function () {
  location.href = "register.html";
});
