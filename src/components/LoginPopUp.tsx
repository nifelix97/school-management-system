import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getEnabledRoles } from "../utils/roles";

type Props = { open: boolean; onClose: () => void; className?: string };

const LoginDropdown: React.FC<Props> = ({ open, onClose, className = "" }) => {
  const roles = getEnabledRoles();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("mousedown", onClick);
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={
        [
          "absolute right-0 mt-2 w-[22rem] sm:w-[28rem] bg-white rounded-xl shadow-2xl border border-gray-100 z-[100]",
          "p-4 sm:p-5",
          className,
        ].join(" ")
      }
      role="menu"
      aria-label="Login as"
    >
      <div className="mb-3 text-primary-50 font-bold">Login as</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {roles.map((role) => (
          <Link
            key={role}
            to={`/login?role=${encodeURIComponent(role)}`}
            onClick={onClose}
            className="no-underline rounded-lg px-3 py-2 text-center border border-gray-200 bg-gray-50 hover:bg-gray-100 text-primary-50 text-sm sm:text-base font-medium"
            role="menuitem"
          >
            {role}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LoginDropdown;