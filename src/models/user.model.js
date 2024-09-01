import mongoose from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true

        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            

        },
        fullname:{
            type: String,
            required: true,
        
            index: true,
            trim: true,
            

        },
        avatar:{
            type: String,// url cloudinary
            required: true,
            

        },
        coverImage: {
            type: String
        },
        watchHistory: {
            type: Schema.Types.ObjectiveId,
            ref: "video"
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }


    },{timestamps: true}
)

export const User = mongoose.model("User", userSchema)