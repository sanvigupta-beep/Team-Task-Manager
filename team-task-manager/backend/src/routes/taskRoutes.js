import { Router } from "express";
import { body } from "express-validator";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import validate from "../middleware/validate.js";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(getTasks)
  .post(
    requireRole("admin"),
    [
      body("title").trim().notEmpty().withMessage("Title is required"),
      body("project").notEmpty().withMessage("Project is required"),
    ],
    validate,
    createTask
  );

router
  .route("/:id")
  .put(requireRole("admin"), updateTask)
  .delete(requireRole("admin"), deleteTask);

router.patch("/:id/status", updateTaskStatus);

export default router;
