import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {user} from "../models/user.model.js"

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
    req.files
})

export {registerUser,}