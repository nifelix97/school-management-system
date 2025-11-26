import { ChevronLeft } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if no email provided
  if (!email) {
    navigate("/forgot-password");
  }

  const otpValue = otp.join("");
  const isValid = otpValue.length === 6 && /^\d{6}$/.test(otpValue);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
      setOtp(newOtp);
      // Focus last filled input or last input
      const lastIndex = Math.min(pastedData.length, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setSubmitting(true);
      // TODO: replace with real API call to verify OTP
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Verify OTP:", otpValue, "for email:", email);

      toast.success("OTP verified successfully!");
      
      // Navigate to reset password page
      navigate("/reset-password", { state: { email, otp: otpValue } });
    } catch (err) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResending(true);
      // TODO: replace with real API call to resend OTP
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Resend OTP to:", email);

      toast.success("New OTP sent to your email!");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
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
              We've sent a 6-digit verification code to your email. Please enter
              it below to continue.
            </p>

            <div className="mt-10 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">
                Password Recovery Steps
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-50 flex items-center justify-center font-semibold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="text-white font-medium">Enter Your Email</p>
                    <p className="text-white/70 text-sm">
                      {email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-50 flex items-center justify-center font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-white font-medium">Verify OTP</p>
                    <p className="text-white/70 text-sm">
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
              to="/forgot-password"
              className="inline-flex items-center gap-2 text-primary-50 hover:text-primary-100 text-sm sm:text-base no-underline transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Link>
          </div>

          <div className="flex items-center justify-center px-4 sm:px-6 lg:px-16 py-10">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] p-8 sm:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-50 text-center">
                Verify OTP
              </h2>
              <p className="text-center text-gray-500 mt-2">
                Enter the 6-digit code sent to {email}
              </p>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-4 text-center">
                    Verification Code
                  </label>
                  <div className="flex gap-2 sm:gap-3 justify-center" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 border-gray-200 focus:border-primary-100 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200 ${
                    !isValid || submitting
                      ? "bg-primary-50/60 cursor-not-allowed"
                      : "bg-primary-50 hover:opacity-95 hover:shadow-lg"
                  }`}
                >
                  {submitting ? "Verifying..." : "Verify Code"}
                </button>

                <div className="text-center">
                  <p className="text-gray-500 text-sm">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resending}
                      className="text-primary-50 hover:text-primary-100 font-semibold transition-colors disabled:opacity-50"
                    >
                      {resending ? "Resending..." : "Resend OTP"}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
