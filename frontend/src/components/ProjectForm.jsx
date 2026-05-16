import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

const ProjectForm = ({ initial, users = [], onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState({ title: "", description: "", members: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        description: initial.description || "",
        members: (initial.members || []).map((m) => m._id || m),
      });
    } else {
      setForm({ title: "", description: "", members: [] });
    }
  }, [initial]);

  const toggleMember = (id) => {
    setForm((f) =>
      f.members.includes(id)
        ? { ...f, members: f.members.filter((m) => m !== id) }
        : { ...f, members: [...f.members, id] }
    );
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Title is required");
    setError("");
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        label="Title"
        placeholder="Awesome new project"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        error={error}
      />
      <div className="space-y-1.5">
        <label className="form-label">Description</label>
        <textarea
          rows={3}
          placeholder="What's this project about?"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input resize-none"
        />
      </div>
      <div className="space-y-1.5">
        <label className="form-label">Members</label>
        <div className="max-h-48 overflow-y-auto rounded-xl border border-ink-200 bg-ink-50/40 p-2 dark:border-ink-700 dark:bg-ink-800/40">
          {users.length === 0 && (
            <p className="px-2 py-1 text-xs text-ink-500 dark:text-ink-400">No users available</p>
          )}
          {users.map((u) => {
            const checked = form.members.includes(u._id);
            return (
              <label
                key={u._id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition ${
                  checked
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                    : "hover:bg-white dark:hover:bg-ink-800"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMember(u._id)}
                  className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold text-white">
                  {(u.name || "?")[0].toUpperCase()}
                </span>
                <span className="flex-1">
                  <span className="font-medium">{u.name}</span>{" "}
                  <span className="text-xs text-ink-500 dark:text-ink-400">({u.email})</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
