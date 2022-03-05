module.exports = async (req, res) => {
  // 請求物件中沒有資料
  if (!req.session.username) {
    res.send("var isLogin = false");
  } else {
    // 請求物件中有資料
    res.send("var isLogin = true");
  }
};
