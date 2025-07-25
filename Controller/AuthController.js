const Users = require("../Models/Users");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.status(400).json({ message: "Unauthorized Access. Please Login." });
  }
};


const isAdminForDashboard=async(req,res,next)=>{
      const { email }=req.session.user;
      const user= await Users.findOne({email})
      
      console.log("inside Admin Dashboard check");
      console.log("inside Admin Dashboard check",user);
      if(user.Privilage)
      {
        next();
      }else{
        return res.status(400).json({message:"Not A Admin"});
      }
} 

const IsAdmin = async (req, res) => {
  try {
    const sessionUser = req.session.user;
   
    console.log("Session User", sessionUser);
    const currentUser = await Users.findOne({ _id: sessionUser.id });
    
   

    console.log("Current User", currentUser);

    if (currentUser.Privilage !== sessionUser.Privilage) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
          return res.status(500).json({ message: "Failed to destroy session" });
        }
        res.clearCookie("connect.sid");
        return res.status(403).json({
          message: "Privilege changed. Session invalidated. Please login again."
        });
      });
    } else if (currentUser.Privilage === true) {
      return res.json({ message: "Admin access granted",user:req.session.user });
    } else {
      return res.json({ message: "Not an admin" ,user:req.session.user });
    }
  } catch (err) {
    console.error("Admin check error:", err);
    return res.status(500).json({ message2: "Server error" });
  }
};


const isAuthenticated = async (req, res) => {
  try {

    const session = await mongoose.connection.db
      .collection("MySession")
      .findOne({ _id: req.sessionID });
    console.log("Session Id", req.sessionID);

    if (session) {
      res.json({ authenticated: true, user: req.session.user.email });
    } else {
      res.status(401).json({
        authenticated: false,
        message: "Session not found in database",
      });
    }
  } catch (err) {
    console.error("Error checking session in database:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const SignUp = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  let users = await Users.findOne({ email });
  if (users) {
    return res.status(409).json({
      SignUp: false,
      message: `User with email ${email} already exists`,
    });
  }

  const hassPassword = await bcrypt.hash(password, 12);
  users = new Users({
    username: username,
    email: email,
    password: hassPassword,
  });

  await users
    .save()
    .then((data) => res.send({ Signup: true, data }))
    .catch((err) => {
      console.log("error", err.message);
      res.status(500).json({ message: err.message });
    });
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await Users.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({ Login: false, message: "user not found" });
    }

    const hashPassword = await bcrypt.compare(password, user.password);
    if (!hashPassword) {
      return res
        .status(401)
        .json({ Login: false, message: "Incorrect Password" });
    }

    req.session.user = {
      id: user._id,
      username:user.username,
      email: user.email,
      Privilage: user.Privilage,
    };
    req.session.isAuth = true;
    console.log(req.session.email);
    console.log(req.session.isAuth);
    res.json({
      Login: true,
      message: "login Successfull",
      user: req.session.user,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged Out" });
  });
};

module.exports = {
  isAuth,
  isAuthenticated,
  SignUp,
  LoginController,
  logoutController,
  IsAdmin,
  isAdminForDashboard
};
