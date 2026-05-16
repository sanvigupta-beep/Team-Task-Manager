import asyncHandler from "../middleware/asyncHandler.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

const canViewTask = (user, task) => {
  if (user.role === "admin") return true;
  if (task.assignedTo && task.assignedTo.equals(user._id)) return true;
  if (task.createdBy && task.createdBy.equals(user._id)) return true;
  return false;
};

// GET /api/tasks
export const getTasks = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    priority,
    project,
    assignedTo,
    search = "",
  } = req.query;

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(50, parseInt(limit)));

  const filter = {};

  if (req.user.role !== "admin") {
    filter.$or = [{ assignedTo: req.user._id }, { createdBy: req.user._id }];
  }

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (project) filter.project = project;
  if (assignedTo) filter.assignedTo = assignedTo;

  if (search) {
    const searchOr = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
    if (filter.$or) {
      filter.$and = [{ $or: filter.$or }, { $or: searchOr }];
      delete filter.$or;
    } else {
      filter.$or = searchOr;
    }
  }

  const total = await Task.countDocuments(filter);
  const tasks = await Task.find(filter)
    .populate("assignedTo", "name email")
    .populate("project", "title")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  res.json({
    tasks,
    pagination: { total, page: pageNum, pages: Math.ceil(total / limitNum) },
  });
});

// POST /api/tasks (admin only)
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate, assignedTo, project } =
    req.body;

  const projectExists = await Project.findById(project);
  if (!projectExists) {
    res.status(400);
    throw new Error("Invalid project");
  }

  const task = await Task.create({
    title,
    description,
    status: status || "todo",
    priority: priority || "medium",
    dueDate,
    assignedTo: assignedTo || null,
    project,
    createdBy: req.user._id,
  });

  await task.populate("assignedTo", "name email");
  await task.populate("project", "title");
  await task.populate("createdBy", "name email");
  res.status(201).json(task);
});

// PUT /api/tasks/:id (admin only)
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const fields = [
    "title",
    "description",
    "status",
    "priority",
    "dueDate",
    "assignedTo",
    "project",
  ];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) task[f] = req.body[f];
  });

  await task.save();
  await task.populate("assignedTo", "name email");
  await task.populate("project", "title");
  res.json(task);
});

// DELETE /api/tasks/:id (admin only)
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  await task.deleteOne();
  res.json({ message: "Task deleted" });
});

// PATCH /api/tasks/:id/status
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["todo", "in-progress", "completed"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status value");
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (!canViewTask(req.user, task)) {
    res.status(403);
    throw new Error("Not authorized to update this task");
  }

  task.status = status;
  await task.save();
  await task.populate("assignedTo", "name email");
  await task.populate("project", "title");
  res.json(task);
});
