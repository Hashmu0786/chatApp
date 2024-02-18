const {
    login,
    register,
    getAllUsers,
    setAvatar,
    logOut
} = require("../Controller/userController");

const router = require ("express").Router();

router.post("/login",login);
router.post("/register",register);
router.get("/allusers/:id",getAllUsers);
router.get("/setavatar/:id",setAvatar);
router.get("logout/:id",logOut);

module.exports = router;