const router = require("express").Router();

const {
  register,
  signIn,
  signOut,
  getAllUsers,
  count,
  deleteUser
} = require("../controllers/authController");


router.post("/register", register);



router.post("/signIn", signIn);
router.post("/signOut", signOut);

router.get("/getAllusers", getAllUsers);
router.delete("/delete/:_id",deleteUser );
router.get("/count", count);

module.exports = router;
