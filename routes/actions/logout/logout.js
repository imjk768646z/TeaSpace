module.exports = async (req, res) => {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
    res.send("退出成功");
  });
};
