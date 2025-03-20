import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";



export const checkAdmin = asyncHandler( async (req, _, next) => {

    const { email } = req.body
    
    if(req.user){
        const userId = req.user._id

    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(400, "No user found with the current userId.") //for extra concern else no need to check this
    }

    if(user.role !== "admin"){
        throw new ApiError(401, "You are not authorized to access this route.")
    }

    next();
    }
    else{
    const user = await User.findOne({ email : email })
    if(!user){
        throw new ApiError(400, "No user found with the current email.") 
    }

    if(user.role !== "admin"){
        throw new ApiError(401, "You are not authorized to access this route.")
    }

    next();
    }
})