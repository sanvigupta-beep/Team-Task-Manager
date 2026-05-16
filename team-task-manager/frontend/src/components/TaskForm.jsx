import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

const empty = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
  assignedTo: "",
  project: "",
};

const priorityStyles = {
  low: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-300",
  medium: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-300",
  high: "border-red-300 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-500/15 dark:text-red-300",
};

const TaskForm = ({ initial, projects = [], users = [], onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        description: initial.description || "",
        status: initial.status || "todo",
        priority: initial.priority || "medium",
        dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : "",
        assignedTo: initial.assignedTo?._id || initial.assignedTo || "",
        project: initial.project?._id || initial.project || "",
      });
    } else {
      setForm(empty);
    }
  }, [initial]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.project) errs.project = "Project is required";
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    const payload = { ...form };
    if (!payload.dueDate) delete payload.dueDate;
    if (!payload.assignedTo) payload.assignedTo = null;
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        placeholder="What needs to be done?"
        value={form.title}
        onChange={change}
        error={errors.title}
      />
      <div className="space-y-1.5">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          placeholder="Add more details..."
          value={form.description}
          onChange={change}
          rows={3}
          className="input resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <label className="form-label">Priority</label>
        <div className="grid grid-cols-3 gap-2">
          {["low", "medium", "high"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setForm({ ...form, priority: p })}
              className={`rounded-xl border-2 px-3 py-2 text-sm font-semibold capitalize transition ${
                form.priority === p
                  ? priorityStyles[p]
                  : "border-ink-200 bg-white text-ink-600 hover:border-ink-300 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="form-label">Status</label>
          <select name="status" value={form.status} onChange={change} className="input">
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={change}
        />
      </div>

      <div className="space-y-1.5">
        <label className="form-label">Assigned To</label>
        <select
          name="assignedTo"
          value={form.assignedTo}
          onChange={change}
          className="input"
        >
          <option value="">Unassigned</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="form-label">Project</label>
        <select name="project" value={form.project} onChange={change} className="input">
          <option value="">Select a project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
        {errors.project && <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.project}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
