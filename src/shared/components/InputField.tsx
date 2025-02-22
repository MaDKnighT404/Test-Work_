import React from "react";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  id: string;
  label: string;
  type: "text" | "textarea" | "select";
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  options?: { label: string; value: string }[];
  className?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  options,
  placeholder,
  className,
}) => {
  const baseStyles =
    "w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none";

  const typeStyles = {
    text: "",
    textarea: "",
    select: "cursor-pointer",
  };

  const labelStyles = "block text-sm font-medium text-gray-700";

  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            id={id}
            value={value}
            onChange={onChange}
            className={twMerge(baseStyles, typeStyles.text, className)}
            placeholder={placeholder || label}
          />
        );
      case "textarea":
        return (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            rows={3}
            className={twMerge(baseStyles, typeStyles.textarea, className)}
            placeholder={label}
          />
        );
      case "select":
        return (
          <select
            id={id}
            value={value}
            onChange={onChange}
            className={twMerge(baseStyles, typeStyles.select, className)}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className={labelStyles}>
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

export default InputField;
