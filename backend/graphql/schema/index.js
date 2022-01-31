const  {buildSchema} =require("graphql");


module.exports=buildSchema(`


 type User{
     _id:ID!
     email:String!
     password:String
     createdList:[List]!
 }

type List {
    _id:ID!
    title:String!
    message:String!
    tags:[String],
    creator :User!
    selectedFile:String!
    createdAt:String!
    name:String!

}

input ListInput {
    title:String!
    message:String!
    tags:[String],
    selectedFile:String!
    name:String!
    
  
}

input UserInput{
    email:String!
    password:String!
}

 type AuthData{

     userId:ID!
     token:String!
     tokenExpiration:Int!
     email:String!
 }

 type ChangeData{
     title:String!
     
     
 }

 input NewList{

    title:String!
    message:String!
    tags:[String],
    selectedFile:String!
    id:ID!

 }

type RootQuery{
   document:[List!]!
   login(email:String!,password:String!): AuthData!
   getAllUser:[User]!
}

type RootMutation{
  createList(listInput:ListInput):List!
  createUser(signUpUser:UserInput):User!
  updateList(updatedList:NewList):ChangeData!
  deleteList(listId:ID!):ChangeData!

}


schema{
    query:RootQuery
    mutation:RootMutation

}
`)