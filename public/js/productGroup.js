// 輪播圖組件 關閉自動播放
var myCarousel = document.querySelector(".carousel");
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: false,
  // wrap: false,
  // pause: true
});

// 詳細說明導航頁籤樣式
var detail_tab = document.getElementById("detail-tab");
var spec_tab = document.getElementById("spec-tab");
var process_tab = document.getElementById("process-tab");
// console.log(detail_tab);
detail_tab.addEventListener("click", function () {
  spec_tab.style.color = "#777";
  process_tab.style.color = "#777";
  detail_tab.style.color = "#FFF";
  spec_tab.style.backgroundColor = "#EDEDED";
  process_tab.style.backgroundColor = "#EDEDED";
  detail_tab.style.backgroundColor = "#F59F00";
});
spec_tab.addEventListener("click", function () {
  spec_tab.style.color = "#FFF";
  process_tab.style.color = "#777";
  detail_tab.style.color = "#777";
  spec_tab.style.backgroundColor = "#F59F00";
  process_tab.style.backgroundColor = "#EDEDED";
  detail_tab.style.backgroundColor = "#EDEDED";
});
process_tab.addEventListener("click", function () {
  spec_tab.style.color = "#777";
  process_tab.style.color = "#FFF";
  detail_tab.style.color = "#777";
  spec_tab.style.backgroundColor = "#EDEDED";
  process_tab.style.backgroundColor = "#F59F00";
  detail_tab.style.backgroundColor = "#EDEDED";
});

// 加入購物車運用的元素
var input_num = document.querySelector("input");
var addToCart_btn = document.querySelector(".addToCart-btn");
var plus = document.querySelector(".plus");
var minus = document.querySelector(".minus");
var ini_num = 0;

minus.addEventListener("click", function () {
  var int_num = parseInt(input_num.value, 10);
  input_num.value = int_num - 1;
  if (int_num == 1) {
    alert("數量不得少於1");
    input_num.value = int_num;
  }
});

plus.addEventListener("click", function () {
  var int_num = parseInt(input_num.value, 10);
  input_num.value = int_num + 1;
  if (int_num == 10) {
    alert("已達商品庫存");
    input_num.value = int_num;
  }
});

// 打勾動畫運用的元素
var tickCover = document.querySelector(".tickcover");
var tickArea = document.querySelector(".tickarea");
var tickimg = document.querySelector(".tickarea").querySelector("img");

// 加入購物車
addToCart_btn.addEventListener("click", function () {
  var pro_detail_arr = [obj];
  // 如果localStorage已經有資料了
  if (localStorage.getItem("cart")) {
    // 將localStorage資料提取出來，型態為包含物件的陣列
    var getdata = JSON.parse(localStorage.getItem("cart"));
    // 本頁物件會放在陣列的第一順位
    var pro_detail_arr = [obj];
    var id_count = 0; //重複次數
    var limit_count = 0; //上限次數
    // 遍歷localStorage取出資料再放入pro_detail_arr
    for (var i = 0; i < getdata.length; i++) {
      pro_detail_arr.push(getdata[i]);
    }
    // 遍歷pro_detail_arr
    for (var i = 0; i < pro_detail_arr.length; i++) {
      // 將輸入框的數量和已加入的數量相加，作為判斷數量是否達到上限
      var pre_num = pro_detail_arr[i].quantity + parseInt(input_num.value, 10);
      // 預先計算好的數量必須小於等於10
      if (pre_num <= 10) {
        // 判斷本頁物件的編號是否和陣列中的編號相同
        if (obj.id == pro_detail_arr[i].id) {
          // 編號一樣，給予新的數量
          pro_detail_arr[i].quantity =
            pro_detail_arr[i].quantity + parseInt(input_num.value, 10);
          // 判斷重複的編號有幾個
          id_count++;
        }
      } else {
        //   數量超過10上限次數+1
        limit_count++;
      }
    }
    // 計算編號重複的次數，重複達到兩次，刪除陣列中第一個元素
    if (id_count == 2) {
      pro_detail_arr.splice(0, 1);
    }
    // 根據上限次數決定是否寫入localStorage
    if (limit_count == 0) {
      // 將pro_detail_arr存入localStorage
      localStorage.setItem("cart", JSON.stringify(pro_detail_arr));
      // 顯示打勾動畫
      tickCover.className = "tickcover";
      tickArea.className = "tickarea";
      tickimg.src = "./images/tick.gif";
      // 計時器結束關閉打勾動畫
      setTimeout(function () {
        tickCover.className = "tickcover disappear";
        tickArea.className = "tickarea disappear";
        tickimg.src = "";
        // 取得購物車商品數量
        getCartCount();
      }, 1000);
    } else {
      alert("該商品已達庫存上限");
    }
  } else {
    //localStorage沒有資料
    obj.quantity = parseInt(input_num.value, 10);
    localStorage.setItem("cart", JSON.stringify(pro_detail_arr));
    // 顯示打勾動畫
    tickCover.className = "tickcover";
    tickArea.className = "tickarea";
    tickimg.src = "./images/tick.gif";
    // 計時器結束時關閉打勾動畫
    setTimeout(function () {
      tickCover.className = "tickcover disappear";
      tickArea.className = "tickarea disappear";
      tickimg.src = "";
      // 取得購物車商品數量
      getCartCount();
    }, 1000);
  }
});
