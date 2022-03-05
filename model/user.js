// 創建使用者集合
// 引入mongoose第三方模塊
const mongoose = require("mongoose");

// 引入物件規則查驗
const Joi = require("joi");
// 創建使用者集合規則
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 6,
  },
  // email: {
  //   type: String,
  //   // 確保電子郵件的地址不重複
  //   unique: true,
  //   required: true,
  // },
  account: {
    type: String,
    // 確保帳號名稱不重複
    unique: true,
    required: true,
    minlength: 4,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
});

// 創建集合實體
const User = mongoose.model("User", userSchema);
// 創建一筆資料，只需要執行一次
// User.create({
//   username: "管理員",
//   email: "admin@teaspace.com",
//   password: "1234",
// })
//   .then(() => {
//     console.log("使用者創建成功");
//   })
//   .catch(() => {
//     console.log("使用者創建失敗");
//   });

// 利用bcrypt加密創建一筆資料，執行一次後要關閉
// const bcrypt = require("bcrypt");
// async function createUser() {
//   const salt = await bcrypt.genSalt(10);
//   const pass = await bcrypt.hash("1234", salt);
//   const user = await User.create({
//     username: "周子瑜",
//     account: "tzuyu",
//     password: pass,
//   })
//     .then(() => {
//       console.log("使用者創建成功");
//     })
//     .catch(() => {
//       console.log("使用者創建失敗");
//     });
// }
// createUser();

// 驗證使用者註冊資訊
function validateUser(user) {
  // 定義驗證規則
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(6)
      .required()
      .error(new Error("姓名不符合規則，最少2字元最多6字元")),
    account: Joi.string()
      .alphanum()
      .min(4)
      .max(10)
      .required()
      .error(new Error("帳號不符合規則，最少4字元最多10字元")),
    password: Joi.string()
      .alphanum()
      .required()
      .error(new Error("密碼不符合規則，不包含空白字元")),
  });
  const options = {
    abortEarly: false, //包含所有錯誤
    allowUnknown: true, //忽略未知的屬性
  };
  return schema.validate(user, options);
}

// 導出使用者模塊
module.exports = {
  User,
  validateUser,
};
