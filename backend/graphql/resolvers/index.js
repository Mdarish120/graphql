const auth =require("./auth");
const list =require("./list");

const rootResolver={
    ...auth,
    ...list
}

module.exports=rootResolver;