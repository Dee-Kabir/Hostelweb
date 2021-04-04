const express = require("express");
const router = express.Router();
const {requireSignIn} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {addreply,commentById, removereply, getcomments} = require('../controllers/comment');

router.put('/reply/comment/:commentId',requireSignIn,addreply)
router.put('/reply/uncomment/:commentId',requireSignIn,removereply)
router.get('/reply/comments/:commentId',getcomments)
router.param("commentId",commentById);
router.param("userId",userById);

module.exports = router;