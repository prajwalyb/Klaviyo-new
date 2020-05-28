const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
let config = require('../config');

const User = require('../models/user.js');
const auth = require('../middlewares/auth.js');

router.post('/register',(req,res)=>{
    const today= Date.now();
    const userData={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        created:today
    }
    if(!req.body.first_name|| !req.body.last_name|| !req.body.email|| !req.body.password)
        return res.status(400).json({msg:'Enter All Details'});
    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                userData.password=hash;
                User.create(userData)
                .then(user=>{
                    return res.status(200).json({status:user.email+' registered!'})
                })
                .catch(err=>{
                    return res.status(400).json({msg: 'Something Went Wrong'})
                })
            })
        }else{
            return res.status(409).json({msg:'User already exists'});
        }
    })
    .catch(err=>{
        return res.status(400).json({msg:'Something Went wrong'});
    })
})

router.post('/login',(req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload = {
                    _id:user.id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email
                }
                let token = jwt.sign(payload, config.SECRET_KEY)
                //res.header('x-auth-token',token).status(200).send()
                return res.status(200).json({token: token,user: payload});
            }
            else{
                return res.status(401).json({msg:'Wrong Password '})
            }
        }
        else{
            return res.status(208).json({msg:'User Does not exist'})
        }
    })
    .catch(err=>{
        return res.status(400).json({msg:'Something Went Wrong'})
    })
})

router.get('/auth', auth , (req,res)=>{
    User.findOne(req.user.id)
        .select('-password')
        .then(user=>{return res.json(user)})
})

module.exports=router;