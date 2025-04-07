const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        requitred:true
    }
})

module.exports = mongoose.model("Task", taskSchema)