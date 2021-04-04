const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const Comment = require("../models/comment");

exports.getPosts = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments", "text created")
    .populate("comments.postedBy", "_id name")
    .select("_id title body created likes photo")
    .sort({ created: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => console.log(err));
};

exports.createPost = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "There is an error while creating this post",
      });
    }
    let post = new Post(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
  });
};

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .select("_id title body photo created likes")
    .sort("created")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      
      res.json(posts);
    });
};

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    // .populate("comments", "body postedBy created")
    .populate({
        path:     'comments',			
        populate: { path:  'postedBy',
                select: '_id name' },
                select:'_id body postedBy comments'
      })
    .populate("postedBy", "_id name role")
    .select("_id title body created comments photo likes")
    .exec((error, post) => {
      if (error || !post) {
        
        return res.status(400).json({
          error: "There is an error while fetching this post",
        });
      }
      
      req.post = post;

      next();
    });
};
exports.isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!isPoster) {
    return res.status(403).json({
      error: "User not authorized",
    });
  }
  next();
};

exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "deleted successfully",
    });
  });
};

exports.updatePost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error: "There is an error while uploading Photo",
      });
    }
    let post = req.post;
    post = _.extend(post, fields);
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.updated = Date.now();
    post.save((err, result) => {
      if (err) {
        return res.stattus(400).json({
          error: "There is an error in datastore",
        });
      } else {
        res.json(result);
      }
    });
  });
};
exports.postPhoto = (req, res, next) => {
  if (req.post.photo.data) {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
  }
  next();
};
exports.singlePost = (req, res) => {
  return res.json(req.post);
};
exports.like = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.body.userId },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json();
    } else {
      res.json(result);
    }
  });
};
exports.unlike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.body.userId },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json();
    } else {
      res.json(result);
    }
  });
};
exports.comment = (req, res) => {
 
  const newcomment = new Comment({
    body: req.body.comment.text,
    postedBy: req.body.userId,
    modelId: req.body.postId,
    modelName: "Post",
  });

  newcomment.save((error, ncomment) => {
    if (error) {
      
      return res.status(400).json({
        error: error,
      });
    } else {
       
        Post.findByIdAndUpdate(
            req.body.postId,
            {
              $push: { comments: ncomment },
            },
            { new: true }
          )
            .populate({path:'comments',
            populate: { path:  'postedBy',
            select: '_id name' },
            select:'_id body postedBy comments created'
  })
            .select("comments")
            .exec((err, result) => {
              if (err) {
                return res.status(400).json();
              } else {
               
                res.json(result);
              }
            });
    }
  });
  
};
exports.uncomment = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { comments: req.body.commentId },
    },
    { new: true }
  )
  .populate({path:'comments',
populate:{
    path:'postedBy',
    select:'_id name',
},select:'_id body postedBy comments created'})
    .select("comments")
    .exec((error, result) => {
      if (error) {
          
        return res.status(400).json();
      } else {
          Comment.findByIdAndRemove(req.body.commentId).exec((error,resultc) => {
              if(error){
                  return res.status(400).json({
                      error: error
                  })
              }else{
                res.json(result);
              }
          })
        
      }
    });
};
exports.listSearch = (req, res) => {
    const {search} = req.query
    if(search) {
        Post.find({
            $or: [{title: {$regex: search, $options: 'i'}}, {body: {$regex: search, $options: 'i'}} ]
        },(error, posts) => {
            if(error){
                return res.status(400).json({
                    error: error
                })
            }
            res.json(posts)
        }).select('-photo -body');

    }

}