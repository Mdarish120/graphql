const express=require("express");
const {graphqlHTTP}=require("express-graphql");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const graphqlSchema=require("./graphql/schema/index");
const graphqlResolvers=require("./graphql/resolvers/index");
const isAuth=require("./middleware/isAuth");

const app=express();
app.use(bodyParser.urlencoded({extended:true,parameterLimit:100000,limit:"1200mb"}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);
app.use(
    '/graphql',
    graphqlHTTP({
        schema:graphqlSchema,
        rootValue:graphqlResolvers,
        graphiql:true
    })
)


mongoose.connect(`mongodb+srv://react_graphql_project:react_graphql_project11@cluster0.iagxc.mongodb.net/graphql?retryWrites=true&w=majority`).then(e=>{
    app.listen(8000);
    console.log("Server is running successfullly");
}).catch(e=>{
    console.log(e);

})


