export default function Button({
  children,
  variant,
  className,
  type,
  disabled,
}) {
  return (
    <button
      type={type}
      className={`${className ? ` ${className}` : ""}${variant ? ` ${variant}` : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
