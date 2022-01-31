const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const User =require("../../models/user");


module.exports={
    createUser:async (args)=>{
        
        try{
        const existedUser=await User.findOne({email:args.signUpUser.email});
        if(existedUser){
            throw new Error("User is already existed");
        }

         const hashPassword=await bcrypt.hash(args.signUpUser.password,12);
         const user=new User({
             email:args.signUpUser.email,
             password:hashPassword
         });

         const result=await user.save();

         return {...result._doc,password:null,_id:result.id};

        }catch(err){
           
            throw err;
        }
    },

    login:async ({email,password})=>{


        try{
            const user=await User.findOne({email});
            if(!user){
                throw new Error("User is not existed");
            }

            const isEqual=await bcrypt.compare(password,user.password);
            if(!isEqual){
                throw new Error("User credrentials is wrong");
            }

            const token=jwt.sign({userId:user.id,email:user.email},"somespecialkeypassword",{expiresIn:"1h"});
            return {userId:user.id,token:token,tokenExpiration:1,email:user.email};


        }catch(err){

        }
    }

   

    
}