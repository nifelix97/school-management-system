import { ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../app/api/auth";
import Input from "../components/ui/Input";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [forgotPassword, { isLoading: submitting }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const error = useMemo(() => {
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    return "";
  }, [email]);

  const isValid = !error;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    try {
      const response = await forgotPassword({ email }).unwrap();
      
      if (response.success) {
        toast.success(response.message || "OTP sent to your email!");
        // Navigate to OTP verification page with email
        navigate("/verify-otp", { state: { email } });
      } else {
        toast.error(response.error || "Failed to send OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("Forgot password error:", err);
      const errorMessage = err?.data?.error || err?.error || "Failed to send OTP. Please try again.";
      toast.error(errorMessage);
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
              Forgot your password? No worries! We'll send you a verification
              code to reset it.
            </p>

            <div className="mt-10 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">
                Password Recovery Steps
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-50 flex items-center justify-center font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-white font-medium">Enter Your Email</p>
                    <p className="text-white/70 text-sm">
                      Provide the email associated with your account
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white/60 flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-white/70 font-medium">Verify OTP</p>
                    <p className="text-white/50 text-sm">
                      Enter the code sent to your email
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white/60 flex items-center justify-center font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-white/70 font-medium">Reset Password</p>
                    <p className="text-white/50 text-sm">
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
                Forgot Password?
              </h2>
              <p className="text-center text-gray-500 mt-2">
                Enter your email to receive a verification code
              </p>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  leftIcon={<IoMdMail className="w-5 h-5" />}
                  error={touched ? error : undefined}
                  autoComplete="email"
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
                  {submitting ? "Sending OTP..." : "Send Verification Code"}
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

export default ForgotPasswordPage;
