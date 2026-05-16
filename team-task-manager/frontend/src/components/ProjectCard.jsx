import { Link } from "react-router-dom";
import { Users, ArrowRight, FolderKanban } from "lucide-react";

const gradients = [
  "bg-gradient-brand",
  "bg-gradient-blue",
  "bg-gradient-warn",
  "bg-gradient-success",
  "bg-gradient-danger",
];

const pickGradient = (id = "") => {
  let h = 0;
  for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return gradients[h % gradients.length];
};

const ProjectCard = ({ project }) => {
  const grad = pickGradient(project._id);
  return (
    <Link
      to={`/projects/${project._id}`}
      className="group relative block overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${grad}`} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${grad} text-white shadow-lg`}>
            <FolderKanban size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-ink-900 group-hover:text-brand-600 dark:text-ink-100 dark:group-hover:text-brand-300">
              {project.title}
            </h3>
            <p className="text-xs text-ink-500 dark:text-ink-400">
              {new Date(project.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>
        <ArrowRight
          size={18}
          className="text-ink-300 transition group-hover:translate-x-1 group-hover:text-brand-500 dark:text-ink-600"
        />
      </div>
      {project.description && (
        <p className="mt-3 line-clamp-2 text-sm text-ink-600 dark:text-ink-400">
          {project.description}
        </p>
      )}
      <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-3 dark:border-ink-800">
        <div className="flex items-center gap-2 text-xs font-medium text-ink-500 dark:text-ink-400">
          <Users size={14} />
          {project.members?.length || 0} members
        </div>
        <div className="flex -space-x-2">
          {(project.members || []).slice(0, 4).map((m, i) => (
            <div
              key={m._id || i}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-brand text-[10px] font-bold text-white shadow-sm dark:border-ink-900"
              title={m.name}
            >
              {(m.name || "?")[0].toUpperCase()}
            </div>
          ))}
          {(project.members?.length || 0) > 4 && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-ink-100 text-[10px] font-bold text-ink-700 dark:border-ink-900 dark:bg-ink-800 dark:text-ink-200">
              +{project.members.length - 4}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
