const jwt = require("jsonwebtoken");
const SECRETKEY = "sajfqwipugq9icbwaiuf3qw9";

function createJwt(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
  };
  const token = jwt.sign(payload, SECRETKEY);
  return token;
}

function validateJwt(token) {
  const payload = jwt.verify(token, SECRETKEY);
  return payload;
}

function checkForCookieAuth(cookieName) {
  return (req, res, next) => {
    const cookieToken = req.cookies[cookieName];
    if (!cookieToken) {
      return res.status(404).send("Cookie Not Found");
    }
    try {
      const userPayload = validateJwt(cookieToken);
      req.user = userPayload;
    } catch (e) {
      console.log(e);
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
}

module.exports = { createJwt, validateJwt, checkForCookieAuth };
