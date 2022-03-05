// 登出事件
$("#logout").on("click", function () {
  $.ajax({
    type: "post",
    url: "/logout",
    success: function (result) {
      console.log(result);
      location.href = "index.html";
    },
    error: function (err) {
      console.log(err);
    },
  });
});
// 取得使用者姓名與帳號
$.ajax({
  type: "get",
  url: "/username",
  success: function (result) {
    $("#username").html(result.username);
    $("#account").html(result.account);
    // 利用使用者帳號取出資料，現階段沒有這個需求
    // findData(result.account);
  },
  error: function (err) {
    console.log(err);
  },
});
// 取得使用者相關資訊，現階段沒有這個需求
function findData(account) {
  $.ajax({
    type: "post",
    url: "/userdata",
    data: { account: account },
    success: function (result) {
      console.log(result);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
