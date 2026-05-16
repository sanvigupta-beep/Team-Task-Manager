import asyncHandler from "../middleware/asyncHandler.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

// GET /api/dashboard/stats
export const getStats = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === "admin";

  const taskFilter = isAdmin
    ? {}
    : { $or: [{ assignedTo: req.user._id }, { createdBy: req.user._id }] };

  const projectFilter = isAdmin
    ? {}
    : { $or: [{ members: req.user._id }, { createdBy: req.user._id }] };

  const now = new Date();

  const [
    totalTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    overdueTasks,
    totalProjects,
    recentTasks,
    tasksByStatus,
    tasksByPriority,
  ] = await Promise.all([
    Task.countDocuments(taskFilter),
    Task.countDocuments({ ...taskFilter, status: "completed" }),
    Task.countDocuments({ ...taskFilter, status: "in-progress" }),
    Task.countDocuments({ ...taskFilter, status: "todo" }),
    Task.countDocuments({
      ...taskFilter,
      status: { $ne: "completed" },
      dueDate: { $lt: now },
    }),
    Project.countDocuments(projectFilter),
    Task.find(taskFilter)
      .populate("assignedTo", "name email")
      .populate("project", "title")
      .sort({ updatedAt: -1 })
      .limit(6),
    Task.aggregate([
      { $match: taskFilter.$or ? { $or: taskFilter.$or } : {} },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Task.aggregate([
      { $match: taskFilter.$or ? { $or: taskFilter.$or } : {} },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]),
  ]);

  const pendingTasks = totalTasks - completedTasks;

  res.json({
    totals: {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      todoTasks,
      overdueTasks,
      totalProjects,
    },
    charts: {
      byStatus: tasksByStatus.map((s) => ({ name: s._id, value: s.count })),
      byPriority: tasksByPriority.map((p) => ({ name: p._id, value: p.count })),
    },
    recentActivity: recentTasks,
  });
});
