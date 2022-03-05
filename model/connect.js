// 引入mongoose第三方模塊
const mongoose = require("mongoose");
// 連接資料庫
mongoose
  .connect("mongodb://localhost/teaspace")
  .then(() => {
    console.log("資料庫連接成功");
  })
  .catch(() => {
    console.log("資料庫連接失敗");
  });
