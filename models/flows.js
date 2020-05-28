const mongoose= require('mongoose');

const flowSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    flow:{
        type: mongoose.Schema.Types.Mixed,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
} , { minimize: false });

module.exports = mongoose.model('Flow', flowSchema);