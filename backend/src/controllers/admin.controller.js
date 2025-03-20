import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
import { Task } from "../models/task.model.js";


//use role middleware
//testing = Done(success)
const getAllUser = asyncHandler( async (req, res) => {
    
    const user = await User.find({
        role : "user"
    })
    if(!user){
        throw new ApiError(400, "No user found in the db.")
    }

    return res.status(200)
    .json( new ApiResponse(200, user, "All users fetched from db") )

})

//use role middleware
//testing = Done(success)
const getNumberOfUser = asyncHandler( async (req, res) => {
    
    const userCount = await User.countDocuments({
        role : "user"
    })
    if(!userCount){
        throw new ApiError(400, "Something went wrong with finding your user count.")
    }

    return res.status(200)
    .json( new ApiResponse(200, userCount, "User count fetched successfull.") )

})

//use role middleware
//testing = Done(success)
const getUser = asyncHandler( async (req, res) => {
    
    const { userId } = req.params
    if(!isValidObjectId(userId)){
        throw new ApiError(400, "UserId is not valid, please try again.")
    }

    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(400, "No user found with these details.")
    }
    
    return res.status(200)
    .json( new ApiResponse(200, user, "User fetched successfully.") )
})

//use role middleware
//testing = Done(success)
const deleteUser = asyncHandler( async (req, res) => {
    
    const { userId } = req.params
    if(!isValidObjectId(userId)){
        throw new ApiError(400, "UserId is not valid, please try again.")
    }

    await User.findByIdAndDelete(userId)

    return res.status(200)
    .json( new ApiResponse(200, "User deleted successfully.") )

})


const getUserTasks = asyncHandler( async (req, res) => {
    
    const { userId } = req.params
    if(!userId){
        throw new ApiError(400, "Something went wrong with the url.")
    }

    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(400, "No user found with this userId.")
    }

    const userTasks = await Task.find({
        assignedtoUsername : user.username
    })
    if(!userTasks){
        throw new ApiError(400, "No task found for the user.")
    }

    return res.status(200)
    .json( new ApiResponse(200, userTasks, "User tasked fetched successfully.") )
})


const taskAssignedByUser = asyncHandler( async (req, res) => {
    
    const { userId } = req.params
    if(!userId){
        throw new ApiError(400, "Somrthing went wrong with the url.")
    }

    const assignedTasks = await Task.find({
        assignedBy : userId
    })
    if(!assignedTasks){
        throw new ApiError(400, "No task is assigned by this user.")
    }

    return res.status(200)
    .json( new ApiResponse(200, assignedTasks, "Assigned tasks by user fetched successfully.") )
})


const getTask = asyncHandler( async (req, res) => {

    const { taskId } = req.params
    if(!taskId){
        throw new ApiError(400, "Somrthing went wrong with the url.")
    }

    const task = await Task.findById(taskId)
    if(!task){
        throw new ApiError(400, "Something went wrong while fetching task.")
    }

    return res.status(200)
    .json( new ApiResponse(200, task, "Task fetched successfully.") )
})


const deleteUserTask = asyncHandler( async (req, res) => {
    
    const { taskId } = req.params
    if(!taskId){
        throw new ApiError(400, "Somrthing went wrong with the url.")
    }

    await Task.findByIdAndDelete(taskId)

    return res.status(200)
    .json( new ApiResponse(200, "Task deleted successfully.") )

})


export { getAllUser,
         getNumberOfUser,
         getUser,
         deleteUser,
         getUserTasks,
         taskAssignedByUser,
         getTask,
         deleteUserTask
       }