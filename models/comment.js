const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  created: { type: Date, default: Date.now },
  postedBy: { type: ObjectId, ref: "User" },
  comments:[{
      type: ObjectId,
      ref:"Comment"
  }],
  modelId: {
    type: ObjectId,
    required: true,
    refPath: "modelName",
  },
  modelName: {
    type: String,
    required: true,
    enum: ["Post", "Comment"],
  },
});
module.exports = mongoose.model("Comment", commentSchema);
