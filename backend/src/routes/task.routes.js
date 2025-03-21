import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    createTask,
    getAllTasks,
    getMyTasks,
    getTasksCreatedByMe,
    getTaskById,
    updateTask,
    deleteTask,
    assignTask
} from "../controllers/task.controller.js";

const router = Router();

// All routes are protected with JWT authentication
router.use(verifyJwt);

//create a task
router.route("/create-task").post(createTask)

// get all tasks
router.route("/").get(getAllTasks);

// Get tasks assigned to the authenticated user
router.route("/my-tasks").get(getMyTasks);

// Get tasks created by the authenticated user
router.route("/task-created-by-me").get(getTasksCreatedByMe);

// Get, update, and delete a specific task
router.route("/:taskId")
    .get(getTaskById)
    .patch(updateTask)
    .delete(deleteTask);

// Assign a task to a user
router.route("/assign/:taskId")
    .post(assignTask);

export default router;