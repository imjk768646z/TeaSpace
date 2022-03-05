// 路由集合
module.exports = (app) => {
  // 使用者登入
  app.post("/login", require("./actions/login/login"));
  // 判斷使用者是否登入
  app.get("/login/status", require("./actions/login/loginStatus"));
  //使用者資訊
  app.get("/username", require("./actions/user/username"));
  // 使用者登出
  app.post("/logout", require("./actions/logout/logout"));
  // 使用者註冊帳號
  app.post("/users", require("./actions/user/users"));
  // 利用帳號查詢使用者資訊，現階段沒有需求
  app.post("/userdata", require("./actions/user/userdata"));
};
