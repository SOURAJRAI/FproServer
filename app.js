const express = require("express");
const app = express();
const authRoutes=require("./Routes/AuthRoutes")
const CompanyRoutes=require("./Routes/CompanyRoute")
const session = require("express-session");
const cors = require("cors");
const {store} =require('./Database/db')
// const mongoDBSession=require('connect-mongodb-session')(session);
// const dotenv=require("dotenv");

// dotenv.config();
// const mongoDBSession = require("connect-mongodb-session")(session);

app.use(
  cors({
    origin: "http://localhost:5173", // your React app URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const store=new mongoDBSession({
//   uri: process.env.MONGOOSE_URL,
//   collection: "MySession",
// })



app.use(
  session({
    secret: "My secret key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie:{
      secure:false,
      maxAge: 60 *60*1000
    }
  })
);



app.use("/api/Auth",authRoutes);
app.use("/api/Company",CompanyRoutes);


module.exports=app;