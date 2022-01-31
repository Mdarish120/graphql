const mongoose =require("mongoose");

const Schema=mongoose.Schema;

const listSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    tags:{
        type:[String],
        require:true
    },
    createdAt:{
        type:Date,
        default:new Date
    },
    selectedFile:{
        type:String,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports=mongoose.model("List",listSchema);