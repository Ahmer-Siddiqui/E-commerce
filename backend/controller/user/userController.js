const User = require("../../model/user/userProduct");
const Jwt = require("jsonwebtoken");
const { jwtKey } = process.env;

const loginUser = async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, Please try after sometime",
          });
        }
        resp.status(200).json({ user, auth: token });
      });
    } else {
      resp.status(404).json({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "Some Error occured" });
  }
};

const registerUser = async (req, resp) => {
  let user = await User.create(req.body);
  let result = user.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({
        result: "Something went wrong, Please try after sometime",
      });
    }
    resp.send({ result, auth: token });
  });
};

module.exports = { registerUser, loginUser };