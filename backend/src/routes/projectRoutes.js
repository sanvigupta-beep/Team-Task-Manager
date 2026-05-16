import { Router } from "express";
import { body } from "express-validator";
import {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  listUsers,
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import validate from "../middleware/validate.js";

const router = Router();

router.use(protect);

router.get("/users/all", listUsers);

router
  .route("/")
  .get(getProjects)
  .post(
    requireRole("admin"),
    [body("title").trim().notEmpty().withMessage("Title is required")],
    validate,
    createProject
  );

router
  .route("/:id")
  .get(getProject)
  .put(requireRole("admin"), updateProject)
  .delete(requireRole("admin"), deleteProject);

export default router;
