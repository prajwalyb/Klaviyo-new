const mongoose = require('mongoose');

const emailSchema =  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    email:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Email', emailSchema);