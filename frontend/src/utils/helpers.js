export const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === "completed") return false;
  return new Date(dueDate) < new Date();
};

export const statusLabel = (status) =>
  ({ todo: "To Do", "in-progress": "In Progress", completed: "Completed" }[status] || status);

export const priorityLabel = (p) =>
  ({ low: "Low", medium: "Medium", high: "High" }[p] || p);

export const errorMessage = (err) =>
  err?.response?.data?.message || err?.message || "Something went wrong";
