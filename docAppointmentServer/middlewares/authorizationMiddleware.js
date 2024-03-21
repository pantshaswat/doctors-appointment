function authorizedTo(roles = []) {
  console.log("checking auth");
  return (req, res, next) => {
    if (!req.user) {
      return res.status(404).send("User Not Found");
    }
    if (!roles.includes(req.user.role)) {
      res.send(401).send("Unauthorized User");
    }
    return next();
  };
}
module.exports = authorizedTo;
