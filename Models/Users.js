const { default: mongoose } = require('mongoose');
const moongoose=require('mongoose')

const userSchema=new moongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    Privilage:{
        type:Boolean,
        default:false
    }
})

const Users=mongoose.model("Users",userSchema)

module.exports=Users;