interface LoaderProps {
  className?: string;
  withBlur?: boolean;
  size?: "sm" | "md" | "lg";
}

const Loader = ({
  className = "",
  withBlur = false,
  size = "md",
}: LoaderProps) => {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  const loader = (
    <svg
      className={`animate-spin text-blue-500 ${sizeClasses[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (withBlur) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        <div className="relative z-10">{loader}</div>
      </div>
    );
  }

  return loader;
};

export default Loader;
