// localStorage有資料
if (localStorage.getItem("cart")) {
  // 產生購物車主要頁面
  genHead();
  genBody();
  genFoot();
  // 數量控制
  var getdata = JSON.parse(localStorage.getItem("cart"));
  var inputs = document.querySelectorAll("input");
  var minus_s = document.querySelectorAll(".minus");
  var plus_s = document.querySelectorAll(".plus");
  var cart_body = document.querySelector(".cart-body");
  // 將cart_body.childNodes類陣列轉為陣列
  var node_arr = Array.prototype.slice.call(cart_body.childNodes);
  // 小計
  var subtotal = document.getElementsByClassName("subtotal");
  var total = document.querySelector(".total");

  for (i = 0; i < getdata.length; i++) {
    // 使用迴圈產生加號的點擊事件
    minus_s[i].addEventListener("click", function () {
      // 遍歷localStorage資料
      var pro_detail_arr = [];
      for (m = 0; m < getdata.length; m++) {
        pro_detail_arr.push(getdata[m]);
      }
      // container是根據localSorage陣列中有幾個索引值，利用this尋找到屬於第幾個元素，相對就是再陣列中的索引值
      var ni = node_arr.indexOf(
        this.parentNode.parentNode.parentNode.parentNode
      );
      // 檢查數量是否最低限制
      if (pro_detail_arr[ni].quantity == 1) {
        // 檢查陣列
        pro_detail_arr[ni].quantity = pro_detail_arr[ni].quantity;
        // 檢查輸入框
        inputs[ni].value = parseInt(inputs[ni].value, 10);
      } else {
        // 檢查陣列
        pro_detail_arr[ni].quantity = pro_detail_arr[ni].quantity - 1;
        // 檢查輸入框
        inputs[ni].value = parseInt(inputs[ni].value, 10) - 1;
        // 重新計算小計金額
        subtotal[ni].innerHTML =
          "NT$" + pro_detail_arr[ni].price * pro_detail_arr[ni].quantity;
        // 重新計算總額
        var ttl = 0;
        for (jj = 0; jj < pro_detail_arr.length; jj++) {
          var p_ttl = pro_detail_arr[jj].price * pro_detail_arr[jj].quantity;
          ttl = ttl + p_ttl;
        }
        total.innerHTML = "總額 NT$" + ttl;
      }
      // console.log(pro_detail_arr);
      //重新存入localStorage
      localStorage.setItem("cart", JSON.stringify(pro_detail_arr));
    });
  }
  for (j = 0; j < getdata.length; j++) {
    // 使用迴圈產生加號的點擊事件
    plus_s[j].addEventListener("click", function () {
      // 遍歷localStorage資料
      var pro_detail_arr = [];
      for (s = 0; s < getdata.length; s++) {
        pro_detail_arr.push(getdata[s]);
      }
      // container是根據localSorage陣列中有幾個索引值，利用this尋找到屬於第幾個元素，相對就是再陣列中的索引值
      var ni = node_arr.indexOf(
        this.parentNode.parentNode.parentNode.parentNode
      );
      // 檢查數量是否到達上限
      if (pro_detail_arr[ni].quantity == 10) {
        // 檢查陣列
        pro_detail_arr[ni].quantity = pro_detail_arr[ni].quantity;
        // 檢查輸入框
        inputs[ni].value = parseInt(inputs[ni].value, 10);
        alert("已達商品數量上限");
      } else {
        // 檢查陣列
        pro_detail_arr[ni].quantity = pro_detail_arr[ni].quantity + 1;
        // 檢查輸入框
        inputs[ni].value = parseInt(inputs[ni].value, 10) + 1;
        // 重新計算小計金額
        subtotal[ni].innerHTML =
          "NT$" + pro_detail_arr[ni].price * pro_detail_arr[ni].quantity;
        // 重新計算總額
        var ttl = 0;
        for (jj = 0; jj < pro_detail_arr.length; jj++) {
          var p_ttl = pro_detail_arr[jj].price * pro_detail_arr[jj].quantity;
          ttl = ttl + p_ttl;
        }
        total.innerHTML = "總額 NT$" + ttl;
      }
      // console.log(pro_detail_arr);
      //重新存入localStorage
      localStorage.setItem("cart", JSON.stringify(pro_detail_arr));
    });
  }
  // 刪除節點
  var cancel = document.getElementsByClassName("cancel");
  for (k = 0; k < getdata.length; k++) {
    cancel[k].addEventListener("click", function () {
      var pro_detail_arr = [];
      for (c = 0; c < getdata.length; c++) {
        pro_detail_arr.push(getdata[c]);
      }
      // container是根據localSorage陣列中有幾個索引值，利用this尋找到屬於第幾個元素，相對就是在陣列中的索引值
      var ni = node_arr.indexOf(this.parentNode.parentNode.parentNode);
      pro_detail_arr.splice(ni, 1);
      console.log(pro_detail_arr);
      //重新存入localStorage
      localStorage.setItem("cart", JSON.stringify(pro_detail_arr));
      // 刪除當前的container
      cart_body.removeChild(this.parentNode.parentNode.parentNode);
      // 每次刪除節點再次檢查有幾個container
      var con_num = document
        .querySelector(".cart-body")
        .querySelectorAll(".container");
      // container數量小於一個
      if (con_num.length < 1) {
        // 清除localStorage資料
        localStorage.clear();
      } else {
        // container數量大於一個
      }
      // 重新整理頁面
      myrefresh();
    });
  }
  // 以物件個數決定行高高度
  var pFoot = document.querySelector(".placeholder-foot");
  console.log(pFoot);
  console.log(getdata);
  const expr = getdata.length;
  switch (expr) {
    case 1:
      pFoot.style.height = "410px";
      break;
    case 2:
      pFoot.style.height = "330px";
      break;
    case 3:
      pFoot.style.height = "255px";
      break;
    case 4:
      pFoot.style.height = "175px";
      break;
    case 5:
      pFoot.style.height = "100px";
      break;
    default:
      pFoot.style.height = "15px";
  }
} else {
  // localStorage沒有資料
  var body = document.querySelector("body");
  var nf_con = document.createElement("div");
  var nf_con_row = document.createElement("div");
  nf_con.className = "container";
  nf_con_row.className = "row";
  body.appendChild(nf_con).appendChild(nf_con_row);
  nf_con_row.id = "nf_con_row";
  nf_con_row.innerHTML =
    "<span><h5>您的購物車目前是空的，趕緊到<a href='product.html'>茶空間</a>選購商品吧！</h5></span>";
}
// 重新整理頁面
function myrefresh() {
  window.location.reload();
}
// 產生頭部區域
function genHead() {
  var body = document.querySelector("body");
  var ch = document.createElement("div");
  var ch_con = document.createElement("div");
  var ch_con_row = document.createElement("div");
  ch.className = "cart-head";
  ch_con.className = "container";
  ch_con_row.className = "row";
  body.appendChild(ch).appendChild(ch_con).appendChild(ch_con_row);
  var text = ["商品明細", "", "單價", "數量", "小計", ""];
  var clsname = [
    "col-sm-2",
    "col-sm-2 d-none d-sm-block",
    "col-sm-2 d-none d-sm-block",
    "col-sm-3 d-none d-sm-block",
    "col-sm-2 d-none d-sm-block",
    "col-sm-1 d-none d-sm-block",
  ];
  for (i = 0; i < 6; i++) {
    var ch_con_row_col = document.createElement("div");
    ch_con_row_col.className = clsname[i];
    ch_con_row_col.innerHTML = text[i];
    ch_con_row.appendChild(ch_con_row_col);
  }
}
// 產生主體區域
function genBody() {
  // 產生主體DIV只做一次
  var getdata = JSON.parse(localStorage.getItem("cart"));
  var body = document.querySelector("body");
  var cb = document.createElement("div");
  cb.className = "cart-body";
  body.appendChild(cb);
  // 使用迴圈產生主體內部
  for (i = 0; i < getdata.length; i++) {
    var cb_con = document.createElement("div");
    var cb_con_row = document.createElement("div");
    cb_con.className = "container";
    cb_con_row.className = "row row-cols-2 align-items-center";
    cb.appendChild(cb_con).appendChild(cb_con_row);

    var f_clsname = [
      "col-sm-2 col-3",
      "col-sm-2 col-9",
      "col-sm-2 d-none d-sm-block",
      "col-sm-3 col",
      "col-sm-2 col",
      "col-sm-1",
    ];
    for (f = 0; f < 6; f++) {
      var cb_con_row_col = document.createElement("div");
      cb_con_row_col.className = f_clsname[f];
      cb_con_row.appendChild(cb_con_row_col);
    }
    var s_clsname = ["img", "title", "price", "ctrl-num", "subtotal", "cancel"];
    for (s = 0; s < 6; s++) {
      var cb_div = document.createElement("div");
      cb_div.className = s_clsname[s];
      cb_con_row.childNodes[s].appendChild(cb_div);
    }
    // 新增最內層元素
    // 圖片
    var img = document.createElement("img");
    var p_img = document.getElementsByClassName("img");
    img.src = getdata[i].image;
    p_img[i].appendChild(img);
    // 商品名稱
    var title = document.getElementsByClassName("title");
    title[i].innerHTML = getdata[i].title;
    // 單價
    var price = document.getElementsByClassName("price");
    price[i].innerHTML = "NT$" + getdata[i].price;
    // 數量
    var minus = document.createElement("div");
    var input = document.createElement("input");
    var plus = document.createElement("div");
    var ctrl_num = document.getElementsByClassName("ctrl-num");
    minus.className = "minus";
    input.type = "text";
    input.readOnly = "readonly";
    input.value = getdata[i].quantity;
    plus.className = "plus";
    ctrl_num[i].appendChild(minus);
    ctrl_num[i].appendChild(input);
    ctrl_num[i].appendChild(plus);
    var i_dash = document.createElement("i");
    var i_plus = document.createElement("i");
    var p_minus = document.getElementsByClassName("minus");
    var p_plus = document.getElementsByClassName("plus");
    i_dash.className = "bi bi-dash";
    i_plus.className = "bi bi-plus";
    i_dash.id = "minus";
    i_plus.id = "plus";
    p_minus[i].appendChild(i_dash);
    p_plus[i].appendChild(i_plus);
    // 小計
    var subtotal = document.getElementsByClassName("subtotal");
    var p_input = document.getElementsByTagName("input");
    subtotal[i].innerHTML =
      "NT$" + parseInt(p_input[i].value, 10) * getdata[i].price;
    //刪除商品
    var i_x = document.createElement("i");
    var cancel = document.getElementsByClassName("cancel");
    i_x.className = "bi bi-x";
    cancel[i].appendChild(i_x);
    // 順序很重要
  }
}
// 產生底部區域
function genFoot() {
  var body = document.querySelector("body");
  var cf = document.createElement("div");
  var cf_con = document.createElement("div");
  var cf_con_row = document.createElement("div");
  var pFoot = document.createElement("div");
  cf.className = "cart-foot";
  cf_con.className = "container";
  cf_con_row.className = "row align-items-center";
  body.appendChild(cf).appendChild(cf_con).appendChild(cf_con_row);
  body.appendChild(pFoot).className = "placeholder-foot";

  var f_clsname = ["col-sm-9 col-md-10", "col-sm-3 col-md-2"];
  for (i = 0; i < 2; i++) {
    var cf_con_row_col = document.createElement("div");
    cf_con_row_col.className = f_clsname[i];
    cf_con_row.appendChild(cf_con_row_col);
  }
  var s_clsname = ["total", "accounts"];
  for (i = 0; i < 2; i++) {
    var cf_div = document.createElement("div");
    cf_div.className = s_clsname[i];
    cf_con_row.children[i].appendChild(cf_div);
  }
  // 新增最內層元素
  // 總額
  var getdata = JSON.parse(localStorage.getItem("cart"));
  var total = document.querySelector(".total");
  var ttl = 0;
  for (i = 0; i < getdata.length; i++) {
    var p_ttl = getdata[i].price * getdata[i].quantity;
    ttl = ttl + p_ttl;
  }
  total.innerHTML = "總額 NT$" + ttl;
  // 刪除鍵
  var cnl_btn = document.createElement("button");
  var accounts = document.querySelector(".accounts");
  cnl_btn.className = "btn btn-danger";
  accounts.appendChild(cnl_btn).innerHTML = "立即結帳";
}
