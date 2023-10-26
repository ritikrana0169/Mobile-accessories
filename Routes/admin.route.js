const express = require("express");
const { adminModel } = require("../Model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const adminRouter = express.Router();


adminRouter.post("/register", async(req,res) => {
    try{
      const {name, email, password, mobile} = req.body;
      const existingAdmin = await adminModel.findOne({email}) || adminModel.findOne({mobile});
      if(existingAdmin){
        res.status(400).json({msg: "Admin already registered, please Login!!"});
      }else{
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err){
                res.status(400).json({error:err});
            }else{
                const admin = new adminModel({name, email, password:hash, mobile});
                await admin.save();
                res.status(201).json({msg: "Admin successfully register", admin: req.body});
            }
        })
      }
    }catch(err){
        res.status(400).send({error:err});
    }
});


adminRouter.post("/login", async(req,res) => {
    try{
      const {email, password} = req.body;
     const admin = await adminModel.findOne({email});
     if(!admin){
        res.status(404).json({msg: "Admin not found"});
     }else{
        bcrypt.compare(password, admin.password, (err, result) => {
            if(result){
               const token = jwt.sign({name:admin.name}, process.env.SecretKey);
               res.status(200).json({msg: "Login Successful", token});
            }else{
                res.status(404).json({msg: "Wrong Credentials, please login again", err});
            }
        })
     }
    }catch(err){
        res.status(400).json({error:err});
    }
})



module.exports = {
    adminRouter
}