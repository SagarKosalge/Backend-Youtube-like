import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {user} from "../models/user.model.js"
import {uploadOnCloudnary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res)=> {
    // get user details from frontend
    //validation - not empty
    // check if user already exist: username,mail
    // check for images, check for avatar
    // upload them in cloudnary- take ref for file uploaded
    // avatar uploaded or not
    // create user object- create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const{fullName, email, username, password}=req.body
    console.log("email: ", email);

    // if(fullName === ""){
    //     throw new ApiError("400", "fullname is required")
    // }
    if(
        [fullName, email, username, password].some((field)=>
    field?.trim()=== "")
)
    {
        throw ApiError(400, "All fields are required")
    }
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })
    if(existedUser){
        throw new ApiError("409", "User with email or username already exist")
    }
// we get req.body due to express but we req.files due to multer
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverimage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloudnary(avatarLocalPath)
    const coverImage = await uploadOnCloudnary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
        
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    
    if(!createdUser){
        throw new ApiError(500, "User not created")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export {registerUser,}