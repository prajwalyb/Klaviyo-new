const express = require('express');
const router = express.Router();

const Email = require('../models/email');

router.post('/save',(req,res)=>{
    const newEmail = new Email({
        user:req.body.user,
        email:req.body.email
    });
    Email.findOne({"user._id":req.body.user._id,"email.email_id":req.body.email.email_id})
    .then(item=>{
        if(!item){
            newEmail
                .save()
                .then(item=>res.json("Email Added"))
                .catch(err=>console.log(err))
        } else {
            Email.findOneAndUpdate({"user._id":req.body.user._id,"email.email_id":req.body.email.email_id},{
                email:req.body.email
            },{new:true})
                .then((item)=>{
                    res.status(200).json({msg:"Email Template Updated"});
                })
                .catch(err=>{
                    res.status(404).json(`Error--${err}`);
                })
        }
    })    
})

router.get('/loadAll/:user_id', (req,res)=>{
    Email.find({"user._id":req.params.user_id})
    .then(email=>{
        return res.status(200).json(email)
    })
    .catch(err=>{
        return res.status(404).json({msg:"Something Went Wrong"})
        //return null
    })
})

router.delete('/:user_id/deleteOne/:email_id', (req,res)=>{
    Email.find({"user._id":req.params.user_id , "email.email_id":req.params.email_id}).deleteOne()
        .then(status=>{          
            if(status.deletedCount==1)
                return res.status(200).json({success:true})
            return res.status(404).json({success:false})
        })
        .catch(err=>res.status(404).json({success:false}));     
})

router.get('/:user_id/loadOne/:email_id', (req,res)=>{
    Email.findOne({"user._id":req.params.user_id,"email.email_id":req.params.email_id})
        .then(email=>{
            return res.status(200).json(email)
        })
        .catch(err=>{
            return res.status(404).json({msg:"Not Found"})
        })
})

module.exports = router ;