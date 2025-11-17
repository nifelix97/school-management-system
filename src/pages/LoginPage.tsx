import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { IoMdMail, IoMdLock } from "react-icons/io";
import Input from "../components/ui/Input";
import { toast } from "react-toastify";

const roles = [
  "Student","Parent","Teacher",
  "Librarian","Accountant","Registrar","Nurse",
  "Alumni","Manager","Warden","Auditor",
  "Vendors","Coaches","Receptionist","Admin",
  "Vice Principal","HOD","Principal",
  "Vice Chancellor","Chancellor"
];

type FormState = {
  email: string;
  password: string;
  role: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;


const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

const LoginPage = () => {
    const [form, setForm] = useState<FormState>({ email: "", password: "", role: "" });
    const navigate = useNavigate();
  
    // role selection hooks must be inside the component
    const [searchParams] = useSearchParams();
    const [role, setRole] = useState<string>("");
  
    useEffect(() => {
      const r = searchParams.get("role");
      if (r) setRole(r);
    }, [searchParams]);
  
    const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
      email: false,
      password: false,
      role: false,
    });
 
  const [submitting, setSubmitting] = useState(false);


  const errors: FormErrors = useMemo(() => {
    const e: FormErrors = {};
    if (!form.email) e.email = "Email is required.";
    else if (!emailRegex.test(form.email)) e.email = "Enter a valid email address.";

    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";

    if (!role) e.role = "Please select your role.";
    else if (!roles.includes(role)) e.role = "Invalid role.";

    return e;
  }, [form,role]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name as keyof FormState]: value }));
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name as keyof FormState]: true }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true, role: true });
    if (!isValid) return;

    try {
        setSubmitting(true);
        // TODO: replace with real auth call
        await new Promise((r) => setTimeout(r, 800));
        console.log("Login data:", form);
      
        // show toast and navigate based on role
        toast.success("Welcome back!");
        
        // Role-based redirection
        switch (role) {
          case "Student":
            navigate("/dashboard");
            break;
          case "Teacher":
            navigate("/teacher/dashboard");
            break;
            case "HOD":
            navigate("/hod/dashboard");
            break;
          case "Parent":
            navigate("/parent/dashboard");
            break;
          case "Admin":
          case "Principal":
          case "Vice Principal":
            navigate("/admin/dashboard");
            break;
          default:
            // For other roles, redirect to a general dashboard or role-specific page
            navigate("/dashboard");
            break;
        }
      } finally {
        setSubmitting(false);
      }
  };


  return (
    <div className="min-h-screen w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left panel */}
        <div className="bg-primary-50 text-white px-6 sm:px-10 lg:px-16 py-10 flex items-center">
          <div className="w-full max-w-3xl mx-auto">
            <h1 className="font-heading m-0 text-primary-100 font-extrabold text-5xl sm:text-6xl lg:text-7xl">
              SANVERSE
            </h1>
            <p className="mt-6 text-white/90 text-lg sm:text-xl max-w-2xl">
              Welcome to our School Management System. Access your educational
              journey with secure and modern technology.
            </p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {roles.map((r, idx) => {
                const active = role === r;
                return (
                  <button
                    key={`${r}-${idx}`}
                    type="button"
                    onClick={() => setRole(r)}
                    aria-pressed={active}
                    className={`rounded-xl px-4 py-3 text-white border transition-colors text-sm sm:text-base
          ${
            active
              ? "border-primary-100 bg-white/15"
              : "border-white/20 bg-white/5 hover:bg-white/10"
          }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
            {errors.role && (
              <p className="mt-2 text-sm text-primary-100">{errors.role}</p>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-16 pt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-50 hover:text-primary-100 text-sm sm:text-base no-underline"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="flex items-center justify-center px-4 sm:px-6 lg:px-16 py-10">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] p-8 sm:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-50 text-center">
                Welcome Back
              </h2>
              <p className="text-center text-gray-500 mt-2">
                Sign in to your SANVERSE account
              </p>

              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
                noValidate
              >
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  leftIcon={<IoMdMail className="w-5 h-5" />}
                  error={touched.email ? errors.email : undefined}
                  autoComplete="email"
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  leftIcon={<IoMdLock className="w-5 h-5" />}
                  showPasswordToggle
                  error={touched.password ? errors.password : undefined}
                  autoComplete="current-password"
                />

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-primary-50 hover:text-primary-100 text-sm no-underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={`w-full rounded-xl py-3 font-semibold text-white transition-opacity ${
                    !isValid || submitting
                      ? "bg-primary-50/60 cursor-not-allowed"
                      : "bg-primary-50 hover:opacity-95"
                  }`}
                >
                  {submitting ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;