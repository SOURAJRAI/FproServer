const session = require("express-session");

const moongoose = require("mongoose");
const mongoDBSession=require('connect-mongodb-session')(session);
const dotenv=require("dotenv");

dotenv.config();

if(!process.env.MONGOOSE_URL)
{
  console.log("Mongo url Not defined",process.env.MONGOOSE_URL)
  return process.exit(1);
}

const connectDB=async()=>{
   await moongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() =>
    console.log(`Mongoose Database Connected ${moongoose.connection.name}`)
  );
}

const store=new mongoDBSession({
  uri: process.env.MONGOOSE_URL,
  collection: "MySession",
})



module.exports={ connectDB,store}