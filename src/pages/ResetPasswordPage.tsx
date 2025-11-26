import { ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { IoMdLock } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";

const ResetPasswordPage = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  // Redirect if no email or OTP provided
  if (!email || !otp) {
    navigate("/forgot-password");
  }

  const errors = useMemo(() => {
    const e: { password?: string; confirmPassword?: string } = {};

    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters.";

    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match.";

    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setTouched({ password: true, confirmPassword: true });
    if (!isValid) return;

    try {
      setSubmitting(true);
      // TODO: replace with real API call to reset password
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Reset password for:", email, "with OTP:", otp);

      toast.success("Password reset successfully!");
      
      // Navigate to login page
      navigate("/login");
    } catch (err) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 33, label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { strength: 66, label: "Medium", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(form.password);

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
              Almost done! Create a strong password to secure your account.
            </p>

            <div className="mt-10 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">
                Password Requirements
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${form.password.length >= 6 ? 'bg-primary-100' : 'bg-white/30'}`}></span>
                  At least 6 characters long
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${/[a-z]/.test(form.password) && /[A-Z]/.test(form.password) ? 'bg-primary-100' : 'bg-white/30'}`}></span>
                  Contains uppercase and lowercase letters
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${/\d/.test(form.password) ? 'bg-primary-100' : 'bg-white/30'}`}></span>
                  Contains at least one number
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${/[^a-zA-Z0-9]/.test(form.password) ? 'bg-primary-100' : 'bg-white/30'}`}></span>
                  Contains special characters (recommended)
                </li>
              </ul>
            </div>

            <div className="mt-6 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">
                Password Recovery Steps
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-50 flex items-center justify-center font-semibold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="text-white font-medium">Email Verified</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-50 flex items-center justify-center font-semibold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="text-white font-medium">OTP Verified</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-50 flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-white font-medium">Reset Password</p>
                    <p className="text-white/70 text-sm">
                      Create a new secure password
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-16 pt-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-primary-50 hover:text-primary-100 text-sm sm:text-base no-underline transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>

          <div className="flex items-center justify-center px-4 sm:px-6 lg:px-16 py-10">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] p-8 sm:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-50 text-center">
                Reset Password
              </h2>
              <p className="text-center text-gray-500 mt-2">
                Create a new password for {email}
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                <div>
                  <Input
                    label="New Password"
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    leftIcon={<IoMdLock className="w-5 h-5" />}
                    showPasswordToggle
                    error={touched.password ? errors.password : undefined}
                    autoComplete="new-password"
                    required
                  />
                  
                  {/* Password strength indicator */}
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Password Strength:</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength.label === 'Weak' ? 'text-red-500' :
                          passwordStrength.label === 'Medium' ? 'text-yellow-500' :
                          'text-green-500'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  leftIcon={<IoMdLock className="w-5 h-5" />}
                  showPasswordToggle
                  error={
                    touched.confirmPassword ? errors.confirmPassword : undefined
                  }
                  autoComplete="new-password"
                  required
                />

                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200 ${
                    !isValid || submitting
                      ? "bg-primary-50/60 cursor-not-allowed"
                      : "bg-primary-50 hover:opacity-95 hover:shadow-lg"
                  }`}
                >
                  {submitting ? "Resetting Password..." : "Reset Password"}
                </button>

                <p className="text-center text-gray-500">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-primary-50 hover:text-primary-100 no-underline font-semibold transition-colors"
                  >
                    Login
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

export default ResetPasswordPage;
