// 引入express框架
const express = require("express");
// 創建網站伺服器
const app = express();
// 引入路徑處理模塊
const path = require("path");
// 引入session模塊
var session = require("express-session");
// 資料庫連接
require("./model/connect");
// 曾經創建過一筆資料，僅執行一次即可
// require('./model/user');

// 開放靜態資源
app.use(express.static(path.join(__dirname, "public")));
// 配置session
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })

// 處理post請求參數
// express.urlencoded取代之前的bodyParser方法
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 路由
require("./routes")(app);

// 監聽端口
app.listen(3000);
console.log("網站伺服器啟動成功");
