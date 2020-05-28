const express = require('express');
const router = express.Router();

const Flow = require('../models/flows')

router.post('/save',(req,res)=>{
    const newFlow = new Flow({
        user:req.body.user,
        flow:req.body.flow
    });

    Flow.findOne({"user._id":req.body.user._id,"flow.flow_id":req.body.flow.flow_id})
    .then(item=>{
        if(!item){
            newFlow
                .save()
                .then(item=>res.json("Flow Added"))
                .catch(err=>console.log(err))
        } else {
            Flow.findOneAndUpdate({"user._id":req.body.user._id,"flow.flow_id":req.body.flow.flow_id},{
                flow:req.body.flow
            },{ new: true ,  useFindAndModify: false })
                .then((item)=>{
                    res.status(200).json({msg:"Flow Updated"});
                })
                .catch(err=>{
                    res.status(404).json(`Error--${err}`);
                })
        }
    })    
})

router.get('/loadAll/:user_id', async (req,res)=>{
    let flows= await Flow.find({ "user._id":req.params.user_id})
    if(flows)
        res.status(200).json(flows);
    return null
})

router.get('/:user_id/loadOne/:flow_id', (req,res)=>{
    Flow.findOne({"user._id":req.params.user_id,"flow.flow_id":req.params.flow_id})
        .then(flow=>{
            //console.log(flow)
            return res.status(200).json(flow.flow)
        })
        .catch(err=>{
            return res.status(404).json({msg:"Not Found"})
        })
})

router.delete('/:user_id/deleteOne/:flow_id', (req,res)=>{
    Flow.find({"user._id":req.params.user_id , "flow.flow_id":req.params.flow_id}).deleteOne()
        .then(status=>{          
            if(status.deletedCount==1)
                return res.status(200).json({success:true})
            return res.status(404).json({success:false})
        })
        .catch(err=>res.status(404).json({success:false}));
})

module.exports= router;