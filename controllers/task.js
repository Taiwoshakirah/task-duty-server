const Task = require('../models/task')

const createTask =async (req,res)=>{
    const {userId} = req.user
    const {title,description,tags} = req.body
    if(!title || !description || !tags){
        return res.status(401).json({message:"All fields are required"})
    }

    const task =await Task.create({title,description,tags,user: userId,})
    res.status(200).json({message:"success",task})

}

const editTask =async (req,res)=>{
    const {id} = req.params
    const task =await Task.findByIdAndUpdate(id, req.body, { new: true })

    if (!task) {
        return res.status(401).json({
          message: `No Task with ID: ${id}`,
        });
      }

    res.status(200).json({message:"edited", task})

}

const deleteTask =async (req,res)=>{
const {id} = req.params
const task =await Task.findByIdAndDelete(id,req.body)
if(!task){
    return res.status(401).json({message:"This task can not be deleted because it does not exist"})
}
res.status(200).json({messages:"Task successfully deleted"})
}

const fetchTask =async (req,res)=>{
const {id} = req.params
const task =await Task.findOne({_id:id})
if(!task){
    return res.status(401).json({message:"This task does not exist"})
}

res.status(200).json({message:"task successfully fetched",data: task})

}

const allTasks =async (req,res)=>{
    const {userId} = req.user
    console.log(userId);
    
    const tasks = await Task.find({})
    res.status(200).json({message:"All tasks fetched successfully", tasks})

}

module.exports = {createTask, editTask, deleteTask, fetchTask, allTasks}