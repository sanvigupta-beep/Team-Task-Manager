const sizes = { sm: "h-4 w-4 border-2", md: "h-6 w-6 border-[3px]", lg: "h-10 w-10 border-[3px]" };

const Spinner = ({ size = "md" }) => (
  <div
    className={`${sizes[size]} animate-spin rounded-full border-brand-200 border-t-brand-600 dark:border-ink-700 dark:border-t-brand-400`}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;
