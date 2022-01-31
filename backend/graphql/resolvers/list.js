const List =require("../../models/doc");
const User =require("../../models/user");



const user= async (userId)=>{
    console.log(userId);
    try{
       
 
     const user=await User.findById(userId);
       return {
           ...user._doc,
           _id:user.id,
           createdList:docs.bind(this,user._doc.createdList)
       }
 
    }catch(err){
      throw err;
    }
 }

const docs=async (docIds)=>{
   
    
    try{
        const docs=await List.find({_id:{$in:docIds}});
       return docs.map(data=>{
            return {
                ...data._doc,
                _id:data.id,
                createdAt:data.createdAt,
                creator:user.bind(this,data.creator)
            }
        })

    }catch(err){
       throw err;
    }
 
}







module.exports={

    document:async ()=>{
        try{
           const doc=await List.find();
           return doc.map(event=>{
               return {
                   ...event._doc,
                   _id:event.id,
                   createdAt:event.createdAt,
                   creator:user.bind(this,event._doc.creator)

               }
           })

        }catch(err){
            console.log(err);
           throw err;
        }
    },

    createList:async (args,req)=>{

        if(!req.isAuth){
            throw new Error("Unauthorized user!!");
        }
          
    console.log(args.listInput.message);

        const document=new List({
            title:args.listInput.title,message:args.listInput.message,tags:args.listInput.tags,name:args.listInput.name,selectedFile:args.listInput.selectedFile,creator:"61d593063394fc1330ca9ad3"
        });
        let Lst;

        try{
               const result=await document.save();
               Lst={
                   ...result._doc,
                   _id:result._doc._id.toString(),
                   createdAt:result._doc.createdAt,
                   creator:user.bind(this,result._doc.creator)
               };

               const client=await User.findById("61d593063394fc1330ca9ad3");

               if(!client){
                   throw new Error("User not found");
               }
                 
               client.createdList.push(document);
               await client.save();
               return Lst;

        }catch(err){
            console.log(err);

             throw err;
             

        }

    },

    getAllUser:async ()=>{
      
        try{
            const users=await User.find();
            return users.map((user)=>{
                return {
                    ...user._doc,
                 _id:user.id,
                 createdList:docs.bind(this,user._doc.createdList)
                }
            })
    
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    },

    updateList:async (args)=>{

        const {title,message,tags,selectedFile}=args.updatedList;
        const updatedData={title,message,tags,selectedFile};
        try{
            const result=await List.findByIdAndUpdate({_id:args.updatedList.id},updatedData,{new:true});

            return {
                ...result._doc
            }

        }catch(err){
            throw new Error(err);
            console.log(err);
            
        }
    },
    deleteList:async ({listId})=>{
        console.log(listId);

        try{

            const deletedData=await List.findById(listId);
            await List.deleteOne({_id:deletedData._id})
        

            return {...deletedData._doc};

        }catch(err){
            
            console.log(err);
        }
    }


     

    
}