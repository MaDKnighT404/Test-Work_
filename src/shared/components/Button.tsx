import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../utils/cn";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "cursor-pointer active:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: "rounded-md bg-blue-500 text-white active:bg-blue-600",
    secondary:
      "rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300",
    danger: "rounded-md bg-red-600 text-white focus:ring-2 active:bg-red-700",
    ghost: "rounded-md text-gray-500 hover:text-gray-700 bg-transparent",
    icon: "rounded-full bg-green-600 p-4 text-white active:bg-green-700",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        baseStyles,
        variant !== "icon" ? sizeStyles[size] : "",
        variantStyles[variant],
        widthStyles,
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
