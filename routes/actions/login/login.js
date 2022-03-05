const { User } = require("../../../model/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { account, password } = req.body;
  // 使用者沒有輸入帳號或密碼
  if (account.trim().length == 0 || password.trim().length == 0) {
    return res.status(400).send("未輸入帳號或密碼");
  }
  // 利用帳號查詢有無該筆資料
  let user = await User.findOne({ account });
  // 查詢到使用者帳號
  if (user) {
    // 將使用者輸入的密碼和資料庫的密碼做比對
    let isValid = await bcrypt.compare(password, user.password);
    // 檢查比對結果
    if (isValid) {
      // 將資料庫的使用者名稱儲存在請求物件中
      req.session.username = user.username;
      req.session.account = user.account;
      res.send("登入成功");
    } else {
      res.status(400).send("密碼錯誤");
    }
  } else {
    // 沒有查詢到使用者帳號
    res.status(400).send("帳號或密碼錯誤");
  }
};
