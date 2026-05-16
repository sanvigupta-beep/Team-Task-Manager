import asyncHandler from "../middleware/asyncHandler.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

// GET /api/projects
export const getProjects = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(50, parseInt(limit)));

  const baseFilter =
    req.user.role === "admin"
      ? {}
      : { $or: [{ members: req.user._id }, { createdBy: req.user._id }] };

  const searchFilter = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const filter = { ...baseFilter, ...searchFilter };

  const total = await Project.countDocuments(filter);
  const projects = await Project.find(filter)
    .populate("members", "name email role")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  res.json({
    projects,
    pagination: { total, page: pageNum, pages: Math.ceil(total / limitNum) },
  });
});

// POST /api/projects (admin only)
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, members = [] } = req.body;
  const project = await Project.create({
    title,
    description,
    members,
    createdBy: req.user._id,
  });
  await project.populate("members", "name email role");
  await project.populate("createdBy", "name email");
  res.status(201).json(project);
});

// GET /api/projects/:id
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("members", "name email role")
    .populate("createdBy", "name email");

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (
    req.user.role !== "admin" &&
    !project.members.some((m) => m._id.equals(req.user._id)) &&
    !project.createdBy._id.equals(req.user._id)
  ) {
    res.status(403);
    throw new Error("Not authorized to view this project");
  }

  const tasks = await Task.find({ project: project._id })
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  res.json({ project, tasks, progress });
});

// PUT /api/projects/:id (admin only)
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const { title, description, members } = req.body;
  if (title !== undefined) project.title = title;
  if (description !== undefined) project.description = description;
  if (Array.isArray(members)) project.members = members;

  await project.save();
  await project.populate("members", "name email role");
  await project.populate("createdBy", "name email");
  res.json(project);
});

// DELETE /api/projects/:id (admin only)
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  await Task.deleteMany({ project: project._id });
  await project.deleteOne();
  res.json({ message: "Project deleted" });
});

// GET /api/projects/users/all - list users that can be added to projects
export const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select("name email role").sort({ name: 1 });
  res.json(users);
});
