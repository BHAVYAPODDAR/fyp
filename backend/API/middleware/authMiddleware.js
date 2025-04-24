const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const Verify_token = process.env.JWT_SECRET;

  const token = req.header("Authorization");
  console.log(token);

  try {
    console.log("try ke andar" + token);
    const decoded = jwt.verify(token, Verify_token);
    console.log(decoded, token);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err, token);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
