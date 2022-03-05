const { User, validateUser } = require("../../../model/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { username, account } = req.body;
  const { error, value } = validateUser(req.body);
  // console.log(error);
  // 輸入格式不符合規則
  if (error) return res.status(400).send({ message: error.message });
  // 查詢使用者帳號
  let user = await User.findOne({ account });
  // console.log(user);
  // 帳號重複
  if (user) return res.status(400).send({ message: "已有相同的帳號" });
  // 產生隨機字串
  const salt = await bcrypt.genSalt(10);
  // 進行加密
  req.body.password = await bcrypt.hash(req.body.password, salt);
  // 新增一筆資料
  await User.create(req.body);
  // 將使用者姓名與帳號儲存在請求物件中
  req.session.username = username;
  req.session.account = account;
  // console.log(value);
  res.send(req.body);
};
