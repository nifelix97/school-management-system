import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { IoMdCall, IoMdLock, IoMdMail, IoMdPerson } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";

const roles = [
  "Teacher",
  "HOD",
  "Registrar",
  "Accountant",
  "Admin",
  "Librarian",
  "Nurse",
  "Alumni",
  "Manager",
  "Warden",
  "Auditor",
  "Vendors",
  "Coaches",
  "Receptionist",
  "Vice Principal",
  "Principal",
  "Vice Chancellor",
  "Chancellor",
  "Parent",
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

const STEPS = [
  { id: 1, title: "Personal Info", fields: ["fullName", "email"] },
  { id: 2, title: "Contact & Security", fields: ["phone", "password", "confirmPassword"] },
  { id: 3, title: "Role Selection", fields: ["role"] },
];

const ROLES_PER_PAGE = 12;

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [rolePage, setRolePage] = useState(1);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const navigate = useNavigate();

  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    role: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const errors: FormErrors = useMemo(() => {
    const e: FormErrors = {};

    if (!form.fullName) e.fullName = "Full name is required.";
    else if (form.fullName.length < 3)
      e.fullName = "Name must be at least 3 characters.";

    if (!form.email) e.email = "Email is required.";
    else if (!emailRegex.test(form.email))
      e.email = "Enter a valid email address.";

    if (!form.phone) e.phone = "Phone number is required.";
    else if (!phoneRegex.test(form.phone))
      e.phone = "Enter a valid phone number.";

    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters.";

    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match.";

    if (!form.role) e.role = "Please select your role.";
    else if (!roles.includes(form.role)) e.role = "Invalid role.";

    return e;
  }, [form]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  // Check if current step is valid
  const isCurrentStepValid = useMemo(() => {
    const currentStepFields = STEPS[currentStep - 1].fields;
    return currentStepFields.every((field) => !errors[field as keyof FormState]);
  }, [currentStep, errors]);

  // Pagination for roles
  const totalRolePages = Math.ceil(roles.length / ROLES_PER_PAGE);
  const paginatedRoles = useMemo(() => {
    const startIndex = (rolePage - 1) * ROLES_PER_PAGE;
    return roles.slice(startIndex, startIndex + ROLES_PER_PAGE);
  }, [rolePage]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name as keyof FormState]: value }));
  };

  const handleBlur: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name as keyof FormState]: true }));
  };

  const handleNext = () => {
    // Mark current step fields as touched
    const currentStepFields = STEPS[currentStep - 1].fields;
    const newTouched = { ...touched };
    currentStepFields.forEach((field) => {
      newTouched[field as keyof FormState] = true;
    });
    setTouched(newTouched);

    if (isCurrentStepValid && currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      role: true,
    });
    if (!isValid) return;

    try {
      setSubmitting(true);
      // TODO: replace with real registration API call
      await new Promise((r) => setTimeout(r, 800));
      console.log("Registration data:", form);

      // show success toast with admin approval message
      toast.success("Registration successful!", { autoClose: 3000 });
      
      // Show info toast about admin approval
      setTimeout(() => {
        toast.info("Your account will be activated after admin approval. You'll receive an email notification.", { autoClose: 5000 });
      }, 500);

      // redirect to login page
      navigate("/login");
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
              Join our School Management System. Create your account and start
              your educational journey with us.
            </p>

            {/* Progress Indicator */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-8">
                {STEPS.map((step, idx) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                          currentStep >= step.id
                            ? "bg-primary-100 text-primary-50 shadow-lg scale-110"
                            : "bg-white/20 text-white/60"
                        }`}
                      >
                        {step.id}
                      </div>
                      <p
                        className={`mt-2 text-xs sm:text-sm text-center transition-colors ${
                          currentStep >= step.id ? "text-white font-semibold" : "text-white/60"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                          currentStep > step.id ? "bg-primary-100" : "bg-white/20"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step-specific content */}
            <div className="mt-8">
              {currentStep === 3 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/90 font-semibold text-lg">
                      Select Your Role
                    </h3>
                    <p className="text-white/70 text-sm">
                      Page {rolePage} of {totalRolePages}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {paginatedRoles.map((r, idx) => {
                      const active = form.role === r;
                      return (
                        <button
                          key={`${r}-${idx}`}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({ ...prev, role: r }))
                          }
                          aria-pressed={active}
                          className={`rounded-xl px-4 py-3 text-white border transition-all duration-200 text-sm sm:text-base
                            ${
                              active
                                ? "border-primary-100 bg-white/15 shadow-lg scale-105"
                                : "border-white/20 bg-white/5 hover:bg-white/10 hover:scale-102"
                            }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Role Pagination Controls */}
                  {totalRolePages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setRolePage((prev) => Math.max(1, prev - 1))}
                        disabled={rolePage === 1}
                        className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                          rolePage === 1
                            ? "border-white/10 text-white/30 cursor-not-allowed"
                            : "border-white/30 text-white hover:bg-white/10"
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      <div className="flex gap-2">
                        {Array.from({ length: totalRolePages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setRolePage(page)}
                            className={`w-8 h-8 rounded-lg transition-all duration-200 ${
                              rolePage === page
                                ? "bg-primary-100 text-primary-50 font-semibold"
                                : "border border-white/30 text-white hover:bg-white/10"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setRolePage((prev) => Math.min(totalRolePages, prev + 1))}
                        disabled={rolePage === totalRolePages}
                        className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                          rolePage === totalRolePages
                            ? "border-white/10 text-white/30 cursor-not-allowed"
                            : "border-white/30 text-white hover:bg-white/10"
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  
                  {touched.role && errors.role && (
                    <p className="mt-2 text-sm text-primary-100">{errors.role}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-16 pt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-50 hover:text-primary-100 text-sm sm:text-base no-underline transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="flex items-center justify-center px-4 sm:px-6 lg:px-16 py-10">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] p-8 sm:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-50 text-center">
                Create Account
              </h2>
              <p className="text-center text-gray-500 mt-2">
                Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
              </p>

              <form
                className="mt-8"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <Input
                      label="Full Name"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      leftIcon={<IoMdPerson className="w-5 h-5" />}
                      error={touched.fullName ? errors.fullName : undefined}
                      autoComplete="name"
                      required
                    />

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
                      required
                    />
                  </div>
                )}

                {/* Step 2: Contact & Security */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      leftIcon={<IoMdCall className="w-5 h-5" />}
                      error={touched.phone ? errors.phone : undefined}
                      autoComplete="tel"
                      required
                    />

                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      leftIcon={<IoMdLock className="w-5 h-5" />}
                      showPasswordToggle
                      error={touched.password ? errors.password : undefined}
                      autoComplete="new-password"
                      required
                    />

                    <Input
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
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
                  </div>
                )}

                {/* Step 3: Role Selection - shown on left panel */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-primary-50 mb-4">
                        Review Your Information
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-gray-500">Full Name</p>
                          <p className="font-medium text-primary-50">{form.fullName || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="font-medium text-primary-50">{form.email || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Phone</p>
                          <p className="font-medium text-primary-50">{form.phone || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Role</p>
                          <p className="font-medium text-primary-50">{form.role || "Not selected"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex gap-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="flex-1 rounded-xl py-3 font-semibold text-primary-50 border-2 border-primary-50 hover:bg-primary-50/5 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                  )}

                  {currentStep < STEPS.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isCurrentStepValid}
                      className={`flex-1 rounded-xl py-3 font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                        !isCurrentStepValid
                          ? "bg-primary-50/60 cursor-not-allowed"
                          : "bg-primary-50 hover:opacity-95 hover:shadow-lg"
                      }`}
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isValid || submitting}
                      className={`flex-1 rounded-xl py-3 font-semibold text-white transition-all duration-200 ${
                        !isValid || submitting
                          ? "bg-primary-50/60 cursor-not-allowed"
                          : "bg-primary-50 hover:opacity-95 hover:shadow-lg"
                      }`}
                    >
                      {submitting ? "Creating Account..." : "Register"}
                    </button>
                  )}
                </div>

                <p className="text-center text-gray-500 mt-6">
                  Already have an account?{" "}
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

export default RegisterPage;
