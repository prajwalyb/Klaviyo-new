const express = require('express')
const router = express.Router();

const Segment = require('../models/segment.js')

router.post('/save',(req,res)=>{
    const newSegment = new Segment({
        user:req.body.user,
        segment:req.body.segment
    });

    Segment.findOne({"user._id":req.body.user._id,"segment.segment_id":req.body.segment.segment_id})
    .then(item=>{
        if(!item){
            newSegment
                .save()
                .then(item=>res.json("Segment Added"))
                .catch(err=>console.log(err))
        } else {
            Segment.findOneAndUpdate({"user._id":req.body.user._id,"segment.segment_id":req.body.segment.segment_id},{
                segment:req.body.segment
            },{ new: true ,  useFindAndModify: false })
                .then((item)=>{
                    res.status(200).json({msg:"Segment Updated"});
                })
                .catch(err=>{
                    res.status(404).json(`Error--${err}`);
                })
        }
    })    
})

module.exports= router;