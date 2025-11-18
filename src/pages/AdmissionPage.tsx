import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, CreditCard, Clock, CheckCircle, Upload, FileText } from 'lucide-react';
import Input from '../components/ui/Input';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  nationalId: string;
  
  // Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Academic Information
  program: string;
  program2: string;
  program3: string;
  previousEducation: string;
  
  // Documents
  transcript: File | null;
  personalStatement: File | null;
}

const AdmissionPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [studentCode, setStudentCode] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    nationalId: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    program: '',
    program2: '',
    program3: '',
    previousEducation: '',
    transcript: null,
    personalStatement: null
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isProcessing) {
      setIsProcessing(false);
      setPaymentComplete(true);
      const code = 'STU' + Date.now().toString().slice(-6);
      setStudentCode(code);
    }
  }, [countdown, isProcessing]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.nationalId) newErrors.nationalId = 'National ID is required';
    } else if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.country) newErrors.country = 'Country is required';
    } else if (step === 4) {
      if (!formData.program) newErrors.program = 'At least one program is required';
      if (!formData.previousEducation) newErrors.previousEducation = 'Previous education is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 3 && !paymentComplete) {
      return; // Can't proceed to academic step without payment
    }
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setCountdown(180); // 3 minutes countdown
  };

  const handleSubmitApplication = () => {
    setApplicationSubmitted(true);
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Address', icon: MapPin },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Academic', icon: GraduationCap },
    { number: 5, title: 'Documents', icon: FileText }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3 xs:px-4 sm:px-6">
        <div className="bg-white rounded-lg xs:rounded-xl shadow-lg p-6 xs:p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl xs:text-2xl font-bold text-primary-50 mb-2">Application Submitted!</h2>
          <p className="text-sm xs:text-base text-gray-600 mb-4">
            Your application has been successfully submitted. You will receive a confirmation email shortly.
          </p>
          <p className="text-xs xs:text-sm text-gray-500">
            Application ID: ADM-{Date.now().toString().slice(-6)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8 w-full">
        {/* Header */}
        <div className="text-center mb-6 xs:mb-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
            University Admission
          </h1>
          <p className="text-sm xs:text-base text-gray-600">
            Complete your application to join our university
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 xs:mb-8 overflow-hidden">
          <div className="flex justify-between items-center relative px-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center flex-1 relative">
                <div className={`w-8 h-8 xs:w-10 xs:h-10 rounded-full flex items-center justify-center text-xs xs:text-sm font-medium ${
                  currentStep >= step.number 
                    ? 'bg-primary-50 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4" />
                  ) : (
                    <step.icon className="w-3 h-3 xs:w-4 xs:h-4" />
                  )}
                </div>
                <span className="text-xs text-gray-600 mt-1 hidden xs:block text-center">
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`absolute h-0.5 top-4 xs:top-5 left-1/2 -z-10 ${
                    currentStep > step.number ? 'bg-primary-50' : 'bg-gray-200'
                  }`} style={{ width: '100%', transform: 'translateX(50%)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-lg p-4 xs:p-6 sm:p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-4 xs:mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={errors.firstName}
                  required
                  leftIcon={<User className="w-4 h-4" />}
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={errors.lastName}
                  required
                  leftIcon={<User className="w-4 h-4" />}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  required
                  leftIcon={<Mail className="w-4 h-4" />}
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  required
                  leftIcon={<Phone className="w-4 h-4" />}
                />
                <Input
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  error={errors.dateOfBirth}
                  placeholder="YYYY-MM-DD"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 outline-none bg-gray-50 focus:ring-2 focus:ring-primary-100 border-gray-200"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-2 text-sm text-red-500">{errors.gender}</p>}
                </div>
                <Input
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="e.g., American, British"
                />
                <Input
                  label="National ID"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={(e) => handleInputChange('nationalId', e.target.value)}
                  error={errors.nationalId}
                  required
                  placeholder="Enter your National ID"
                />
              </div>
            </div>
          )}

          {/* Step 2: Address Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-4 xs:mb-6">
                Address Information
              </h2>
              <div className="grid grid-cols-1 gap-4 xs:gap-6">
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  error={errors.address}
                  required
                  leftIcon={<MapPin className="w-4 h-4" />}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    error={errors.city}
                    required
                  />
                  <Input
                    label="State/Province"
                    name="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                  <Input
                    label="ZIP/Postal Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                  <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    error={errors.country}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-4 xs:mb-6">
                Application Fee Payment
              </h2>
              {!paymentComplete ? (
                <div className="text-center">
                  {isProcessing ? (
                    <div>
                      <Clock className="w-16 h-16 text-primary-50 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary-50 mb-2">Processing Payment...</h3>
                      <p className="text-gray-600 mb-4">Please wait while we process your payment</p>
                      <div className="text-2xl font-bold text-primary-50 mb-4">
                        {formatTime(countdown)}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-50 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${((180 - countdown) / 180) * 100}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <CreditCard className="w-16 h-16 text-primary-50 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary-50 mb-2">Application Fee: $50</h3>
                      <p className="text-gray-600 mb-6">
                        Payment is required before selecting your program of study.
                      </p>
                      <button
                        onClick={handlePayment}
                        className="bg-primary-50 text-white px-6 py-3 rounded-xl hover:bg-primary-100 transition-colors"
                      >
                        Pay Now
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Your Student Code</h4>
                    <p className="text-2xl font-bold text-blue-600 mb-2">{studentCode}</p>
                    <p className="text-sm text-blue-600">Save this code - you'll need it to continue your application</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Academic Information */}
          {currentStep === 4 && paymentComplete && (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-green-700">
                  <span className="font-semibold">Student Code:</span> {studentCode}
                </p>
              </div>
              <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-4 xs:mb-6">
                Academic Information
              </h2>
              <div className="grid grid-cols-1 gap-4 xs:gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    First Choice Program <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => handleInputChange('program', e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 outline-none bg-gray-50 focus:ring-2 focus:ring-primary-100 border-gray-200"
                  >
                    <option value="">Select First Choice</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="business">Business Administration</option>
                    <option value="engineering">Engineering</option>
                    <option value="medicine">Medicine</option>
                    <option value="law">Law</option>
                  </select>
                  {errors.program && <p className="mt-2 text-sm text-red-500">{errors.program}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Second Choice Program (Optional)
                  </label>
                  <select
                    value={formData.program2}
                    onChange={(e) => handleInputChange('program2', e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 outline-none bg-gray-50 focus:ring-2 focus:ring-primary-100 border-gray-200"
                  >
                    <option value="">Select Second Choice</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="business">Business Administration</option>
                    <option value="engineering">Engineering</option>
                    <option value="medicine">Medicine</option>
                    <option value="law">Law</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Third Choice Program (Optional)
                  </label>
                  <select
                    value={formData.program3}
                    onChange={(e) => handleInputChange('program3', e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 outline-none bg-gray-50 focus:ring-2 focus:ring-primary-100 border-gray-200"
                  >
                    <option value="">Select Third Choice</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="business">Business Administration</option>
                    <option value="engineering">Engineering</option>
                    <option value="medicine">Medicine</option>
                    <option value="law">Law</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Previous Education <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.previousEducation}
                    onChange={(e) => handleInputChange('previousEducation', e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 outline-none bg-gray-50 focus:ring-2 focus:ring-primary-100 border-gray-200"
                  >
                    <option value="">Select Education Level</option>
                    <option value="high-school">High School</option>
                    <option value="associate">Associate Degree</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                  </select>
                  {errors.previousEducation && <p className="mt-2 text-sm text-red-500">{errors.previousEducation}</p>}
                </div>

              </div>
            </div>
          )}



          {/* Step 5: Documents */}
          {currentStep === 5 && paymentComplete && (
            <div>
              <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-4 xs:mb-6">
                Upload Documents
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Academic Transcript
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange('transcript', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Personal Statement
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange('personalStatement', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 xs:mt-8">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1}
              className="px-4 xs:px-6 py-2 xs:py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm xs:text-base"
            >
              Previous
            </button>
            
            {currentStep < 5 && currentStep !== 3 && (
              <button
                onClick={handleNext}
                className="px-4 xs:px-6 py-2 xs:py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 text-sm xs:text-base"
              >
                Next
              </button>
            )}
            
            {currentStep === 3 && paymentComplete && (
              <button
                onClick={() => setCurrentStep(4)}
                className="px-4 xs:px-6 py-2 xs:py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 text-sm xs:text-base"
              >
                Continue to Academic Info
              </button>
            )}
            
            {currentStep === 4 && (
              <button
                onClick={handleNext}
                className="px-4 xs:px-6 py-2 xs:py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 text-sm xs:text-base"
              >
                Next
              </button>
            )}
            
            {currentStep === 5 && (
              <button
                onClick={handleSubmitApplication}
                className="px-4 xs:px-6 py-2 xs:py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm xs:text-base"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPage;