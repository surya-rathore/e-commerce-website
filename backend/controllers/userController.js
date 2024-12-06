const userModel= require("../models/userModel");
const axios=require("axios");
const bcrypt = require('bcrypt');

exports.registration = async (req, res) => {
    try {
      const { name, email, password, conpassword } = req.body;
  
      if (password === conpassword) {
        const saltRound = 10;
        const hashpassword = await bcrypt.hash(password, saltRound);
  
        const newUser = new userModel({
          name: name,
          email: email,
          password: hashpassword,
        });
  
        await newUser.save();
  
        // Success response ke saath redirect URL bhejiye
        return res.status(200).json({
          message: "User registered successfully!",
          redirect: "/login", // Login page ka route
        });
      } else {
        return res.status(400).json({ message: "Passwords do not match" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  

exports.login= async (req,res)=>{
  
    try{
        const {email,password}=req.body;
        const user= await userModel.findOne({email:email});
        if(!user){
            return res.status(404).send("user not register");
        }
        const passwordCheck= await bcrypt.compare(password, user.password);
        if(!passwordCheck){
           return res.status(401).send("massege: password not match");
        }
       
        res.status(200).json({
            message: "Login successful",
            redirect: "/",
        });
    }catch(error){
        console.log(error);
        res.status(500).json("massege: internal error")
    }
};