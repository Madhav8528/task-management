import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new task
//testing = Done(success)
const createTask = asyncHandler(async (req, res) => {
    const { name, details, startDate, endDate, assignedtoUsername } = req.body;
    
    if ([name, details, startDate, endDate].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please provide all required task details");
    }
    
    const userId = req.user._id
    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(401, "Kindly login to continue.")
    }

    if(user.role === "admin"){
        throw new ApiError(401, "Admin cannot create tasks.")
    }
    // Validate dates
    const start = new Date(`${startDate}T00:00:00Z`)
    const end = new Date(`${endDate}T00:00:00Z`);
    
    if (start > end) {
        throw new ApiError(400, "End date cannot be before start date");
    }
    
    // If assignedtoUsername is provided, verify that user exists
    if (assignedtoUsername) {
        const userExists = await User.findOne({
            username:assignedtoUsername,
        });
        if(assignedtoUsername === user.username){
            throw new ApiError(400, "You cannot assign a task to yourself.")
        }
        if(userExists.role === "admin"){
            throw new ApiError(400, "You can't assign a task to admin.")
        }
        if (!userExists) {
            throw new ApiError(404, "Assigned user not found");
        }
    }
    
    const task = await Task.create({
        name,
        details,
        startDate: start,
        endDate: end,
        assignedtoUsername: assignedtoUsername || null,
        assignedBy: req.user._id
    });
    
    if (!task) {
        throw new ApiError(500, "Something went wrong while creating the task");
    }
    
    return res.status(201)
        .json(new ApiResponse(201, task, "Task created successfully"));
});

// Get all tasks (with optional filters)
//testing = Done(success)
const getAllTasks = asyncHandler(async (req, res) => {
    const { status, startDate, endDate } = req.query;
    
    const userId = req.user._id
    if(!userId){
        throw new ApiError(400, "Kindly login to continue.")
    }

    const filters = {};
    
    // Add filters if provided
    if (status) {
        filters.status = status;
    }
    
    if (startDate) {
        filters.startDate = { $gte: new Date(startDate) };
    }
    
    if (endDate) {
        filters.endDate = { $lte: new Date(endDate) };
    }

    //const user = await User.findById(userId)
    
    const tasks = await Task.find(filters)
    .populate("assignedBy", "username name email");
    
    return res.status(200)
        .json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
});

// Get tasks assigned to me
//testing = Done(success)
const getMyTasks = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if(!userId){
        throw new ApiError(400, "Kindly login to continue.")
    }

    const user = await User.findById(userId)
    const tasks = await Task.find({ assignedtoUsername: user.username })
        .populate("assignedBy", "username name email");
    
    return res.status(200)
        .json(new ApiResponse(200, tasks, "Your tasks retrieved successfully"));
});

// Get tasks created by me
//testing = Done(success)
const getTasksCreatedByMe = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if(!userId){
        throw new ApiError(400, "Kindly login to continue.")
    }

    const tasks = await Task.find({ assignedBy: userId })
    if(!tasks){
        throw new ApiError(400, "No tasks created by you yet.")
    }

    return res.status(200)
        .json(new ApiResponse(200, tasks, "Tasks created by you retrieved successfully"));
});

// Get a single task by ID
//testing = Done(success)
const getTaskById = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    
    const task = await Task.findById(taskId)
        .populate("assignedBy", "username name email");
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    
    return res.status(200)
        .json(new ApiResponse(200, task, "Task retrieved successfully"));
});

// Update a task
//testing = Done(success)
const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { name, details, startDate, endDate, assignedtoUsername, status } = req.body;
    
    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    
    const user = await User.findById(req.user?._id)
    if(!user){
        throw new ApiError(400, "Kindly login to continue.")
    }

    // If user is assignee but not creator, they can only update status
    if (user.username === task.assignedtoUsername){

        if (name || details || startDate || endDate || assignedtoUsername) {
            throw new ApiError(403, "You can only update the status of this task");
        }
        
        task.status = status || task.status;
        await task.save({
            validateBeforeSave : false
        });
        
        return res.status(200)
            .json(new ApiResponse(200, task, "Task status updated successfully"));
    }

    // Only the task creator can update most fields
    if (task.assignedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You don't have permission to update this task as you are not creator.")
    }

    // Update task fields if provided
    if (name){
         task.name = name;
    }
    if (details){ 
        task.details = details;
    }
    if (startDate) {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : task.endDate;
        
        if (start > end) {
            throw new ApiError(400, "End date cannot be before start date");
        }
        
        task.startDate = start;
    }
    
    if (endDate) {
        const end = new Date(endDate);
        const start = startDate ? new Date(startDate) : task.startDate;
        
        if (start > end) {
            throw new ApiError(400, "End date cannot be before start date");
        }
        
        task.endDate = end;
    }
    
    if (assignedtoUsername) {
        // Verify that user exists
        const userExists = await User.findOne({
            username : assignedtoUsername
        })
        if (!userExists) {
            throw new ApiError(404, "Assigned user not found");
        }
         if(assignedtoUsername === user.username){
            throw new ApiError(400, "You cannot assign a task to yourself.")
        }
        if(userExists.role === "admin"){
            throw new ApiError(400, "You can't assign a task to admin.")
        }

        task.assignedtoUsername = assignedtoUsername;
    }
    
    if (status) {
        task.status = status;
    }
    
    await task.save({
        validateBeforeSave : false
    });
    
    return res.status(200)
        .json(new ApiResponse(200, task, "Task updated successfully"));
});

// Delete a task
//testing = Done(success)
const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    
    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    
    // Only the task creator can delete a task
    if (task.assignedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You don't have permission to delete this task");
    }
    
    await Task.findByIdAndDelete(taskId);
    
    return res.status(200)
        .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

// Assign a task to a user
const assignTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { assignedtoUsername } = req.body
    if(!assignedtoUsername){
        throw new ApiError(400, "Kindly provide the username to continue.")
    }

    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }
    
    const user = await User.findById(req.user._id)
    if(!user){
        throw new ApiError(400, "Kindly login to continue.")
    }

    // Only the task creator can assign the task
    if (task.assignedBy.toString() !== user._id.toString()) {
        throw new ApiError(403, "You don't have permission to assign this task");
    }
    
    // Verify that user exists
    const userExists = await User.findOne({
        username : assignedtoUsername
    });
    if (!userExists) {
        throw new ApiError(404, "User not found");
    }
    if(assignedtoUsername === user.username){
        throw new ApiError(400, "You cannot assign a task to yourself.")
    }
    if(userExists.role === "admin"){
        throw new ApiError(400, "You can't assign a task to admin.")
    }
    
    task.assignedtoUsername = assignedtoUsername;
    await task.save({
        validateBeforeSave : false
    });
    
    return res.status(200)
    .json(new ApiResponse(200, task, "Task assigned successfully"));
});

export {
    createTask,
    getAllTasks,
    getMyTasks,
    getTasksCreatedByMe,
    getTaskById,
    updateTask,
    deleteTask,
    assignTask
};