const Input = ({ label, error, icon: Icon, className = "", ...rest }) => (
  <div className="space-y-1.5">
    {label && <label className="form-label">{label}</label>}
    <div className="relative">
      {Icon && (
        <Icon
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-500"
        />
      )}
      <input className={`input ${Icon ? "pl-10" : ""} ${className}`} {...rest} />
    </div>
    {error && <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
  </div>
);

export default Input;
