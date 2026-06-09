import React from "react";

export interface FormFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: "text" | "email";
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
}

/**
 * Accessible form field with linked error announcements.
 * Shared across consultation and contact forms.
 */
export function FormField({
  id,
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  type = "text",
  autoComplete,
  multiline = false,
  rows = 4,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const inputClassName = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
    multiline ? "resize-none" : ""
  } ${
    error
      ? "border-red-500/50 focus:ring-red-500"
      : "border-gray-200 focus:ring-primary"
  }`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-gray-900 mb-2"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClassName}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClassName}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
