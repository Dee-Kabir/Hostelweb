const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true
    },
    photo: {
        data:Buffer,
        contentType: String
    },
    postedBy:{
        type: ObjectId,
        ref:"User"
    },
    created:{
        type: Date,
        default: Date.now
    },
    updated : Date,
    likes:[
        {
            type: ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            type:ObjectId,
            ref:"Comment"
        }
    ]
    
})
module.exports = mongoose.model("Post",postSchema);
{/*,
    
    repies: [{
                type: ObjectId, ref:''
            }],
            created : {type:Date, default: Date.now},
            postedBy: {type: ObjectId, ref: "User"}*/}