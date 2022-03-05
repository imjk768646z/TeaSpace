const { User } = require("../../../model/user");

module.exports = async (req, res) => {
  const { account } = req.body;
  let user = await User.findOne({ account });
  res.send(user);
};
