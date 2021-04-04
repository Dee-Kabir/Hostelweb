const Comment = require("../models/comment");
exports.commentById = (req,res,next,Id) => {
    req.commentId = Id;
    console.log("iD",Id);
    next();
}
exports.getcomments = (req,res) => {
    Comment.findById(req.commentId)
    .populate({
        path:'comments',
        populate: { path:  'postedBy',
        select: '_id name' },
        select:'_id body postedBy comments created'
    })
    .exec((error,result)=>{
        if(error){
            return res.status(400).json({
                error: error
            })
        }
        res.json(result)
    })
}
exports.addreply = (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;
  const newcomment = new Comment({
    body: comment,
    postedBy: req.body.userId,
    modelId: req.commentId,
    modelName: "Comment",
  });
  newcomment.save()
  Comment.findByIdAndUpdate(
    req.commentId,
    {
      $push: { comments: newcomment },
    },
    { new: true }
  )
  .populate("postedBy","_id name")
  .populate({
    path:     'comments',			
    populate: { path:  'postedBy',
            select: '_id name' },
            select:'_id body postedBy comments created'
  })
    .select("comments _id body postedBy")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error,
        });
      } else {
      
        res.json(result);
      }
    });
};
exports.removereply = (req,res) => {


  Comment.findByIdAndUpdate(
    req.commentId,
    {
      $pull: { comments: req.body.commentId},
    },
    { new: true }
  )
    // .populate("comments", "body postedBy created")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({
          error: error,
        });
      } else {
        res.json(result);
      }
    });

}
