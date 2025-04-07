const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const signUpUser = async (req,res)=>{
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(401).json({message:"All fiels are required"})
    }

    
    const ifExistingEmail= await User.findOne({email})
    if(ifExistingEmail){
       return res.status(400).json({message:"User already exist"})
    }
    
    const newUser =await User.create({username,email,password})
    const token  = jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    return res.status(200).json({message:"User created successfully", data:{username:newUser.username, email:newUser.email,_id:newUser._id}, token})

}

const signin =async (req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(401).json({message:"email and password are required"})
    }

    let user;

    if(email){
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        if(isEmail){
            user =await User.findOne({email})
        }
    }

    if(!user){
        return res.status(401).json({message:"no user with this email"})
    }

    const passwordMatch =await bcrypt.compare(password, user.password)
    if(!passwordMatch){
        return res.status(401).json({message:"password incorrect"})
    }
    const token  = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.status(200).json({message:"success", token,data:{_id:user._id,email:user.email}})
   
}

module.exports = {signUpUser, signin}