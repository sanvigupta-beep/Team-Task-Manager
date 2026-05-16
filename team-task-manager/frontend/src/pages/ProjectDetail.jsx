import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pencil, Trash2, Plus, FolderKanban, ChevronLeft, Users, CheckSquare } from "lucide-react";
import toast from "react-hot-toast";
import { projectAPI, taskAPI } from "../services/api";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import ProjectForm from "../components/ProjectForm";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../utils/helpers";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [taskModal, setTaskModal] = useState({ open: false, initial: null });
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await projectAPI.get(id);
      setData(res.data);
    } catch (err) {
      toast.error(errorMessage(err));
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (isAdmin) projectAPI.users().then((res) => setUsers(res.data));
    // eslint-disable-next-line
  }, [id]);

  const onStatusChange = async (task, status) => {
    try {
      await taskAPI.setStatus(task._id, status);
      toast.success("Status updated");
      fetchData();
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  const onTaskSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (taskModal.initial) {
        await taskAPI.update(taskModal.initial._id, payload);
        toast.success("Task updated");
      } else {
        await taskAPI.create({ ...payload, project: id });
        toast.success("Task created");
      }
      setTaskModal({ open: false, initial: null });
      fetchData();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const onTaskDelete = async (task) => {
    if (!confirm(`Delete task "${task.title}"?`)) return;
    try {
      await taskAPI.remove(task._id);
      toast.success("Task deleted");
      fetchData();
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  const onProjectUpdate = async (payload) => {
    setSubmitting(true);
    try {
      await projectAPI.update(id, payload);
      toast.success("Project updated");
      setEditProjectOpen(false);
      fetchData();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const onProjectDelete = async () => {
    if (!confirm("Delete this project and all its tasks?")) return;
    try {
      await projectAPI.remove(id);
      toast.success("Project deleted");
      navigate("/projects");
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) return null;
  const { project, tasks, progress } = data;

  return (
    <div className="space-y-6">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-500 transition hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-300"
      >
        <ChevronLeft size={16} /> All projects
      </Link>

      {/* Hero card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-7 text-white shadow-glow">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <FolderKanban size={26} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold">{project.title}</h2>
              {project.description && (
                <p className="mt-1 max-w-xl text-sm text-white/85">{project.description}</p>
              )}
              <p className="mt-2 text-xs text-white/70">
                Created by {project.createdBy?.name}
              </p>
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => setEditProjectOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={onProjectDelete}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-red-500/40"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>

        <div className="relative mt-6">
          <div className="mb-2 flex items-center justify-between text-sm font-semibold">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">Total tasks</p>
              <p className="mt-1 text-2xl font-extrabold text-ink-900 dark:text-ink-100">{tasks.length}</p>
            </div>
            <div className="stat-icon bg-gradient-brand"><CheckSquare size={20} /></div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">Members</p>
              <p className="mt-1 text-2xl font-extrabold text-ink-900 dark:text-ink-100">{project.members.length}</p>
            </div>
            <div className="stat-icon bg-gradient-blue"><Users size={20} /></div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">Completed</p>
              <p className="mt-1 text-2xl font-extrabold text-ink-900 dark:text-ink-100">
                {tasks.filter((t) => t.status === "completed").length}
              </p>
            </div>
            <div className="stat-icon bg-gradient-success"><CheckSquare size={20} /></div>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="card p-5">
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          Members ({project.members.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.members.map((m) => (
            <span
              key={m._id}
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold text-white">
                {m.name?.[0]?.toUpperCase()}
              </span>
              {m.name} <Badge variant={m.role}>{m.role}</Badge>
            </span>
          ))}
          {project.members.length === 0 && (
            <span className="text-sm text-ink-500">No members yet</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">Tasks ({tasks.length})</h3>
        {isAdmin && (
          <Button onClick={() => setTaskModal({ open: true, initial: null })}>
            <Plus size={16} /> Add Task
          </Button>
        )}
      </div>

      {tasks.length === 0 ? (
        <EmptyState icon={CheckSquare} title="No tasks" message="Create the first task for this project." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              onStatusChange={onStatusChange}
              onEdit={(task) => setTaskModal({ open: true, initial: task })}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      )}

      <Modal
        open={taskModal.open}
        onClose={() => setTaskModal({ open: false, initial: null })}
        title={taskModal.initial ? "Edit Task" : "New Task"}
      >
        <TaskForm
          initial={taskModal.initial || { project: id }}
          projects={[project]}
          users={project.members}
          onSubmit={onTaskSubmit}
          onCancel={() => setTaskModal({ open: false, initial: null })}
          submitting={submitting}
        />
      </Modal>

      <Modal
        open={editProjectOpen}
        onClose={() => setEditProjectOpen(false)}
        title="Edit Project"
      >
        <ProjectForm
          initial={project}
          users={users}
          onSubmit={onProjectUpdate}
          onCancel={() => setEditProjectOpen(false)}
          submitting={submitting}
        />
      </Modal>
    </div>
  );
};

export default ProjectDetail;
