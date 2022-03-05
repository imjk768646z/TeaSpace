module.exports = async (req, res) => {
  // 將session中的參數包裝成物件
  var obj = {
    username: req.session.username,
    account: req.session.account,
  };
  res.send(obj);
};
