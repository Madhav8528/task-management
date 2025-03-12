import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({

    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },

    name : {
        type : String,
        required : true,
        trim : true
    },

    password : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    refreshToken : {
        type : String
    }
},
{
    timestamps : true
})


export const User = mongoose.model("User", userSchema)