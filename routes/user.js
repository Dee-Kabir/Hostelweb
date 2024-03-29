const express = require("express");
const { requireSignIn,isAuth,isAdmin } = require("../controllers/auth");
const router = express.Router();
const {read,update,userById,remove,photo,allusers,following,follow,removefollowing,removefollow, searchUser} = require("../controllers/user");


router.put("/user/unfollow",requireSignIn,removefollowing,removefollow);
router.get('/users/search',searchUser)
router.put("/user/follow",requireSignIn,following,follow);
router.get("/user/:userId",requireSignIn,read);
router.put("/user/:userId",requireSignIn,isAuth,update);
router.delete("/user/:userId",requireSignIn,isAuth,remove);
router.get("/user/photo/:userId", photo)



router.get("/users",allusers);


router.param("userId",userById);


module.exports = router;