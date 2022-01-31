 const mongoose =require("mongoose") ;

const Schema= mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        require:true
    },

    password:{
        type:String,
        require:true
    },

    createdList:[
        {
            type:Schema.Types.ObjectId,
            ref:"List"
        }
    ]

});

module.exports=mongoose.model('User',userSchema);
