import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/user.controllers.js";
import { checkAdmin } from "../middlewares/role.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { deleteUser, getAllUser,
         getUser } from "../controllers/admin.controller.js";

const router = Router()

//login route
router.route("/login").post(checkAdmin, loginUser)
//logout route
router.route("/logout").post(verifyJwt, logoutUser)
//get all user route
router.route("/get-all-user").post(verifyJwt, checkAdmin, getAllUser)
//get user
router.route("/user/:userId").post(verifyJwt, checkAdmin, getUser)
//delete user
router.route("/delete-user/:userId").delete(verifyJwt, checkAdmin, deleteUser)

export default router;