import {Router} from "express"
const router = Router()
import { registerUser } from "../controllers/user.controller.js"

router.route("/register").post(registerUser)
// here url will become http://localhost:8000/api/v1/users/register
// /users from app.js from src and /register from this file this better practice rather than using just app.post use 2 separte files one for routes and one for a middleware to call route

export default router