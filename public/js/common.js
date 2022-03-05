// 根據使用者登入狀態改變登入連結的頁面
// 使用者已登入
if (isLogin) {
  // 導入個人頁面
  $(".login a").attr("href", "user.html");
} else {
  //使用者未登入，導入登入頁面
  $(".login a").attr("href", "login.html");
}
// 取得使用者姓名
$.ajax({
  type: "get",
  url: "/username",
  success: function (result) {
    console.log(result.username);
    $("#loginName").html(result.username);
  },
  error: function (err) {
    console.log(err);
  },
});
// 取得購物車內商品的數量
function getCartCount() {
  var getdata = JSON.parse(localStorage.getItem("cart"));
  let global_cart_count = 0;
  for (k in getdata) {
    // console.log(getdata[k].quantity);
    global_cart_count = global_cart_count + getdata[k].quantity;
  }
  $(".car-count").html(global_cart_count);
}
// 顯示購物車內商品的數量
getCartCount();
