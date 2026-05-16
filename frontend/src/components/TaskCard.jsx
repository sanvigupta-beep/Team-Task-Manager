import { Calendar, User as UserIcon, MoreVertical, Trash2, Pencil, Flag } from "lucide-react";
import Badge from "./ui/Badge";
import { formatDate, isOverdue, statusLabel, priorityLabel } from "../utils/helpers";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";

const priorityBar = {
  low: "bg-gradient-success",
  medium: "bg-gradient-warn",
  high: "bg-gradient-danger",
};

const TaskCard = ({ task, onStatusChange, onEdit, onDelete }) => {
  const { user, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const overdue = isOverdue(task.dueDate, task.status);
  const isAssignee = task.assignedTo?._id === user?._id;
  const canChangeStatus = isAdmin || isAssignee;

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow dark:border-ink-800 dark:bg-ink-900">
      <div className={`absolute inset-y-0 left-0 w-1.5 ${priorityBar[task.priority] || "bg-gradient-brand"}`} />
      <div className="p-4 pl-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <h4 className="font-bold text-ink-900 dark:text-ink-100">{task.title}</h4>
            {task.description && (
              <p className="mt-1 line-clamp-2 text-sm text-ink-600 dark:text-ink-400">
                {task.description}
              </p>
            )}
          </div>

          {isAdmin && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800"
              >
                <MoreVertical size={16} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 z-10 mt-1 w-36 overflow-hidden rounded-xl border border-ink-200 bg-white shadow-glow animate-pop-in dark:border-ink-800 dark:bg-ink-900">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit?.(task);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-700 dark:text-ink-200 dark:hover:bg-ink-800 dark:hover:text-brand-300"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete?.(task);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/15"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={task.status}>{statusLabel(task.status)}</Badge>
          <Badge variant={task.priority}>
            <Flag size={10} /> {priorityLabel(task.priority)}
          </Badge>
          {overdue && <Badge variant="overdue">Overdue</Badge>}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-500 dark:text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} /> {formatDate(task.dueDate)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold text-white">
              {(task.assignedTo?.name || "?")[0].toUpperCase()}
            </span>
            {task.assignedTo?.name || "Unassigned"}
          </span>
        </div>

        {canChangeStatus && (
          <select
            value={task.status}
            onChange={(e) => onStatusChange?.(task, e.target.value)}
            className="mt-3 w-full cursor-pointer rounded-xl border border-ink-200 bg-ink-50/60 px-3 py-2 text-xs font-medium text-ink-700 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:border-ink-700 dark:bg-ink-800/60 dark:text-ink-200"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
