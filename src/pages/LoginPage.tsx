import { ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { IoMdLock, IoMdMail } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";
import { DUMMY_CREDENTIALS } from "../utils/damydatacredentials";
import { getEnabledRoles, ROLE_DASHBOARDS } from "../utils/roles";

type FormState = {
  email: string;
  password: string;
  role: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;


const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;


const LoginPage = () => {
    const roles = useMemo(() => getEnabledRoles().filter(r => r !== "Super Admin"), []);
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

    // Role is now optional if credentials match a known role
    const credentialMatch = DUMMY_CREDENTIALS[form.email];
    const isCredentialValid = credentialMatch && credentialMatch.password === form.password;

    if (!role && !isCredentialValid) {
      e.role = "Please select your role or use valid credentials.";
    } else if (role && !roles.includes(role) && role !== "Super Admin") {
      e.role = "Invalid role.";
    }

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
        // Credential-based role inference
        const credentialMatch = DUMMY_CREDENTIALS[form.email];
        let authenticatedRole = role;

        if (credentialMatch && credentialMatch.password === form.password) {
            authenticatedRole = credentialMatch.role;
        } else if (!role) {
            toast.error("Invalid credentials or role not selected.");
            return;
        }

        await new Promise((r) => setTimeout(r, 800));
        console.log("Login data:", form);
      
        // Save authentication data to localStorage
        localStorage.setItem('token', 'demo-auth-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify({
          email: form.email,
          role: authenticatedRole,
          name: form.email.split('@')[0]
        }));
      
        // show toast and navigate based on role
        toast.success("Welcome back!");
        
        // Role-based redirection
        const targetPath = ROLE_DASHBOARDS[authenticatedRole];
        if (targetPath) {
          navigate(targetPath);
        } else {
          // Fallback for unexpected roles
          navigate("/dashboard");
        }
      } finally {
        setSubmitting(false);
      }
  };


  return (
    <div className="min-h-screen w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left panel */}
        <div className="bg-primary-50 text-white px-6 sm:px-10 lg:px-16 py-8 flex items-center">
          <div className="w-full max-w-4xl mx-auto">
            <h1 className="font-heading m-0 text-primary-100 font-extrabold text-5xl sm:text-6xl">
              SANVERSE
            </h1>
            <p className="mt-4 text-white/90 text-base sm:text-lg max-w-2xl mb-16">
              Welcome to our School Management System. Access your educational
              journey with secure and modern technology.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {roles.map((r, idx) => {
                const active = role === r;
                const isBlocked = !ROLE_DASHBOARDS[r];

                return (
                  <button
                    key={`${r}-${idx}`}
                    type="button"
                    onClick={() => {
                      if (isBlocked) {
                        toast.info("This portal is currently under maintenance.");
                        return;
                      }
                      setRole(r);
                    }}
                    aria-pressed={active}
                    disabled={isBlocked}
                    className={`relative rounded-xl px-2 py-2 text-white border transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5
          ${
            active
              ? "border-primary-100 bg-white/15"
              : isBlocked
              ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
              : "border-white/20 bg-white/5 hover:bg-white/10"
          }`}
                  >
                    {isBlocked && <IoMdLock className="w-3 h-3" />}
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
        <div className="bg-white flex flex-col justify-center">
          <div className="px-4 sm:px-6 lg:px-16 pt-6 absolute top-0 right-0 left-0 lg:left-auto lg:w-1/2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-50 hover:text-primary-100 text-sm sm:text-base no-underline"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="flex items-center justify-center px-4 sm:px-6 lg:px-16 py-6 w-full h-full">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] p-6 sm:p-8">
              <h2 className="text-3xl font-bold text-primary-50 text-center">
                Welcome Back
              </h2>
              <p className="text-center text-gray-500 mt-2 text-sm">
                Sign in to your SANVERSE account
              </p>

              <form
                className="mt-6 space-y-4"
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
                    className="text-primary-50 hover:text-primary-100 text-xs sm:text-sm no-underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={`w-full rounded-xl py-2.5 font-semibold text-white transition-opacity ${
                    !isValid || submitting
                      ? "bg-primary-50/60 cursor-not-allowed"
                      : "bg-primary-50 hover:opacity-95"
                  }`}
                >
                  {submitting ? "Logging in..." : "Login"}
                </button>
                <p className="text-center text-gray-500 text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary-50 hover:text-primary-100 no-underline"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;