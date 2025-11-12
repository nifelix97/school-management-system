import React, { useId, useState } from "react";

type BaseProps = {
  label?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>; // <-- add this
  placeholder?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
};

type InputProps =
  | (BaseProps & {
      type?: "text" | "email" | "password" | "number" | "tel" | "url";
      textarea?: false;
      showPasswordToggle?: boolean;
      rows?: never;
    })
  | (BaseProps & {
      textarea: true;
      rows?: number;
      type?: never;
      showPasswordToggle?: never;
    });

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  helperText,
  error,
  leftIcon,
  rightIcon,
  required,
  disabled,
  autoComplete,
  className = "",
  type = "text",
  textarea = false,
  showPasswordToggle = false,
  rows = 4,
}) => {
  const id = useId();
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = !textarea && type === "password";
  const hasLeft = Boolean(leftIcon);
  const hasRight = Boolean(rightIcon) || (isPassword && showPasswordToggle);

  const baseClasses =
    "w-full rounded-xl border px-4 py-3 outline-none bg-gray-50 placeholder-gray-400 transition focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed";
  const normalRing = "focus:ring-primary-100 border-gray-200";
  const errorRing = "focus:ring-red-400 border-red-400";
  const paddings = `${hasLeft ? "pl-11" : ""} ${hasRight ? "pr-12" : ""}`;

  const commonProps = {
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    required,
    disabled,
    autoComplete,
    className: [
      baseClasses,
      error ? errorRing : normalRing,
      paddings,
      className,
    ].join(" "),
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-primary-50 mb-2">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-primary-50">
            {leftIcon}
          </span>
        )}

        {textarea ? (
          <textarea {...commonProps} rows={rows} />
        ) : (
          <input
            {...commonProps}
            type={isPassword && showPasswordToggle ? (showPwd ? "text" : "password") : type}
          />
        )}

        {/* Right icon or password toggle */}
        {(rightIcon || (isPassword && showPasswordToggle)) && (
          <span className="absolute inset-y-0 right-3 flex items-center">
            {isPassword && showPasswordToggle ? (
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="text-gray-400 hover:text-primary-100 bg-transparent border-0 p-0 cursor-pointer"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? (
                  // simple eye-off
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.1C10.57 5.03 11.28 5 12 5c5.52 0 9 5 9 7- .28.59-1.07 2.03-2.67 3.4M6.8 6.8C4.34 8.35 3 10.6 3 12c0 2 3.48 7 9 7 1.19 0 2.33-.2 3.39-.57" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  // simple eye
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s3.5-7 11-7 11 7 11 7-3.5 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
              </button>
            ) : (
              <span className="text-primary-100">{rightIcon}</span>
            )}
          </span>
        )}
      </div>

      {error ? (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      ) : helperText ? (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;