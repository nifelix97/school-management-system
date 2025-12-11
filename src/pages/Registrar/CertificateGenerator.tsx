import { ChevronLeft, ChevronRight } from "lucide-react";
import QRCode from "qrcode";
import React, { useRef, useState } from "react";
import {
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoPrintOutline,
  IoSchoolOutline
} from "react-icons/io5";

interface CertificateData {
  studentName: string;
  studentId: string;
  program: string;
  department: string;
  graduationDate: string;
  gpa: string;
  dateOfBirth: string;
  registrationNumber: string;
  certificateNumber: string;
  honors: string;
  certificateType: string;
}

// Mock student database (in real app, this would be an API call)
const mockStudentDatabase: Record<string, Partial<CertificateData>> = {
  "REG/2024/001": {
    studentName: "John Doe Smith",
    studentId: "STU-2024-001",
    program: "Bachelor of Science in Computer Science",
    department: "Computer Science",
    dateOfBirth: "2000-05-15",
    gpa: "3.85",
    honors: "first-class",
    graduationDate: "2024-06-15",
  },
  "REG/2024/002": {
    studentName: "Jane Mary Johnson",
    studentId: "STU-2024-002",
    program: "Bachelor of Business Administration",
    department: "Business Administration",
    dateOfBirth: "1999-08-22",
    gpa: "3.92",
    honors: "distinction",
    graduationDate: "2024-06-15",
  },
  "REG/2024/003": {
    studentName: "Michael Brown",
    studentId: "STU-2024-003",
    program: "Bachelor of Engineering in Civil Engineering",
    department: "Civil Engineering",
    dateOfBirth: "2001-03-10",
    gpa: "3.65",
    honors: "second-class-upper",
    graduationDate: "2024-06-15",
  },
};

const CertificateGenerator: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Get default graduation date (current date)
  const getDefaultGraduationDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<CertificateData>({
    studentName: "",
    studentId: "",
    program: "",
    department: "",
    graduationDate: getDefaultGraduationDate(),
    gpa: "",
    dateOfBirth: "",
    registrationNumber: "",
    certificateNumber: "",
    honors: "none",
    certificateType: "graduation",
  });

  // Check URL parameters for verification (QR code scan)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('v') === 'true') { // v = verify
      const certificateData: CertificateData = {
        studentName: params.get('n') || '', // n = name
        studentId: params.get('i') || '', // i = id
        program: params.get('p') || '', // p = program
        department: params.get('d') || '', // d = department
        graduationDate: params.get('g') || getDefaultGraduationDate(), // g = graduation date
        gpa: params.get('gpa') || '',
        dateOfBirth: params.get('b') || '', // b = birth date
        registrationNumber: params.get('r') || '', // r = registration number
        certificateNumber: params.get('c') || '', // c = certificate number
        honors: params.get('h') || 'none', // h = honors
        certificateType: params.get('t') || 'graduation', // t = type
      };
      
      setFormData(certificateData);
      
      // Auto-generate the certificate
      setTimeout(async () => {
        await generateQRCode(certificateData);
        setShowPreview(true);
      }, 500);
    }
  }, []);

  const programs = [
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Information Technology",
    "Bachelor of Science in Software Engineering",
    "Bachelor of Business Administration",
    "Bachelor of Arts in Economics",
    "Bachelor of Engineering in Civil Engineering",
    "Bachelor of Engineering in Electrical Engineering",
    "Bachelor of Medicine and Surgery",
    "Bachelor of Science in Nursing",
    "Bachelor of Pharmacy",
  ];

  const departments = [
    "Computer Science",
    "Information Technology",
    "Software Engineering",
    "Business Administration",
    "Economics",
    "Civil Engineering",
    "Electrical Engineering",
    "Medicine",
    "Nursing",
    "Pharmacy",
  ];

  const honorsOptions = [
    { value: "none", label: "None" },
    { value: "pass", label: "Pass" },
    { value: "third-class", label: "Third Class" },
    { value: "second-class-lower", label: "Second Class Lower" },
    { value: "second-class-upper", label: "Second Class Upper" },
    { value: "first-class", label: "First Class" },
    { value: "distinction", label: "Distinction" },
  ];

  const certificateTypes = [
    { value: "graduation", label: "Graduation Certificate (Degree)" },
    { value: "towhom", label: "To Whom It May Concern" },
    { value: "completion", label: "Certificate of Completion" },
    { value: "transcript", label: "Official Transcript" },
  ];

  // Form steps configuration
  const FORM_STEPS = [
    { id: 1, title: "Student Identification", icon: "📋" },
    { id: 2, title: "Academic Details", icon: "🎓" },
    { id: 3, title: "Certificate Configuration", icon: "📜" },
  ];

  // Validate current step
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.registrationNumber &&
          formData.studentName &&
          formData.studentId
        );
      case 2:
        return (
          formData.program &&
          formData.department &&
          formData.graduationDate
        );
      case 3:
        return formData.certificateNumber && formData.certificateType;
      default:
        return false;
    }
  };

  const generateQRCode = async (data: CertificateData) => {
    // Create a verification URL with certificate data (using short param names to reduce URL length)
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
      v: 'true', // verify
      n: data.studentName, // name
      i: data.studentId, // id
      p: data.program, // program
      d: data.department, // department
      g: data.graduationDate, // graduation date
      gpa: data.gpa || '', // gpa
      c: data.certificateNumber, // certificate number
      r: data.registrationNumber, // registration number
      h: data.honors, // honors
      t: data.certificateType, // type
      b: data.dateOfBirth || '', // birth date
    });
    
    const verificationUrl = `${baseUrl}?${params.toString()}`;

    try {
      const url = await QRCode.toDataURL(verificationUrl, {
        width: 600,
        margin: 4,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        errorCorrectionLevel: 'H', // High error correction
      });
      setQrCodeUrl(url);
      console.log("QR Code generated with URL:", verificationUrl);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  const handleGenerateCertificate = async () => {
    // Validate form
    if (
      !formData.studentName ||
      !formData.studentId ||
      !formData.program ||
      !formData.department ||
      !formData.graduationDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    await generateQRCode(formData);
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!certificateRef.current) {
      alert('Certificate not found. Please generate the certificate first.');
      return;
    }

    // Show instructions to user
    const proceed = confirm(
      'This will open a print dialog. To save as PDF:\n\n' +
      '1. In the print dialog, change "Destination" to "Save as PDF"\n' +
      '2. Click "Save" and choose your download location\n\n' +
      'Click OK to continue.'
    );
    
    if (!proceed) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked. Please allow pop-ups and try again.');
      return;
    }

    const certificateHTML = certificateRef.current.outerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate_${formData.studentName.replace(/\s+/g, '_')}</title>
          <meta charset="UTF-8">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
              background: white;
              line-height: 1.5;
            }
            
            /* Tailwind-like utility classes */
            .bg-white { background-color: white; }
            .bg-gray-50 { background-color: #f9fafb; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .bg-primary-50 { background-color: #1e3a8a; }
            .bg-primary-100 { background-color: #3b82f6; }
            .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
            .from-white { --tw-gradient-from: white; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0)); }
            .to-primary-50\\/5 { --tw-gradient-to: rgba(30, 58, 138, 0.05); }
            
            .text-white { color: white; }
            .text-primary-50 { color: #1e3a8a; }
            .text-primary-100 { color: #3b82f6; }
            .text-primary-50\\/60 { color: rgba(30, 58, 138, 0.6); }
            .text-gray-500 { color: #6b7280; }
            .text-gray-400 { color: #9ca3af; }
            
            .text-center { text-align: center; }
            .text-left { text-left; }
            .text-right { text-align: right; }
            
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-serif { font-family: Georgia, serif; }
            
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-base { font-size: 1rem; line-height: 1.5rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            
            .border { border-width: 1px; }
            .border-2 { border-width: 2px; }
            .border-4 { border-width: 4px; }
            .border-8 { border-width: 8px; }
            .border-t { border-top-width: 1px; }
            .border-t-2 { border-top-width: 2px; }
            .border-b { border-bottom-width: 1px; }
            .border-b-2 { border-bottom-width: 2px; }
            .border-solid { border-style: solid; }
            .border-double { border-style: double; }
            .border-primary-50 { border-color: #1e3a8a; }
            .border-primary-100 { border-color: #3b82f6; }
            .border-gray-200 { border-color: #e5e7eb; }
            .border-gray-300 { border-color: #d1d5db; }
            
            .rounded { border-radius: 0.25rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded-xl { border-radius: 0.75rem; }
            .rounded-t-lg { border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; }
            .rounded-b-lg { border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem; }
            .rounded-full { border-radius: 9999px; }
            
            .p-1 { padding: 0.25rem; }
            .p-2 { padding: 0.5rem; }
            .p-3 { padding: 0.75rem; }
            .p-4 { padding: 1rem; }
            .p-6 { padding: 1.5rem; }
            .p-8 { padding: 2rem; }
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .pt-1 { padding-top: 0.25rem; }
            .pt-3 { padding-top: 0.75rem; }
            .pt-4 { padding-top: 1rem; }
            .pb-2 { padding-bottom: 0.5rem; }
            .pb-3 { padding-bottom: 0.75rem; }
            
            .m-0 { margin: 0; }
            .mb-1 { margin-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mt-1 { margin-top: 0.25rem; }
            .mt-2 { margin-top: 0.5rem; }
            .mt-4 { margin-top: 1rem; }
            .mt-6 { margin-top: 1.5rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            
            .w-full { width: 100%; }
            .w-16 { width: 4rem; }
            .w-12 { width: 3rem; }
            .h-1 { height: 0.25rem; }
            .h-12 { height: 3rem; }
            .h-16 { height: 4rem; }
            .h-full { height: 100%; }
            .min-w-\\[150px\\] { min-width: 150px; }
            
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .flex-1 { flex: 1 1 0%; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .gap-2 { gap: 0.5rem; }
            .gap-4 { gap: 1rem; }
            .space-y-4 > * + * { margin-top: 1rem; }
            
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            .gap-x-4 { column-gap: 1rem; }
            .gap-y-1 { row-gap: 0.25rem; }
            
            .inline-block { display: inline-block; }
            .overflow-auto { overflow: auto; }
            
            .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
            .shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); }
            
            .italic { font-style: italic; }
            .underline { text-decoration: underline; }
            .decoration-primary-100 { text-decoration-color: #3b82f6; }
            .decoration-2 { text-decoration-thickness: 2px; }
            .underline-offset-4 { text-underline-offset: 4px; }
            
            .leading-relaxed { line-height: 1.625; }
            
            /* Table styles */
            table { border-collapse: collapse; width: 100%; }
            thead { background-color: #f3f4f6; }
            th, td { padding: 0.25rem; }
            th { text-align: left; font-weight: 600; }
            
            /* Icon placeholder */
            .w-16.h-16, .w-12.h-12 { 
              display: inline-block;
              background-color: #1e3a8a;
              border-radius: 50%;
            }
            
            /* Stamp styles */
            .w-24 { width: 6rem; }
            .h-24 { height: 6rem; }
            .rounded-full { border-radius: 9999px; }
            .border-double { border-style: double; }
            .relative { position: relative; }
            .absolute { position: absolute; }
            .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
            .opacity-10 { opacity: 0.1; }
            
            @media print {
              @page {
                size: A4;
                margin: 0.3cm;
              }
              
              body { 
                margin: 0; 
                padding: 0;
                width: 100%;
                height: 100vh;
              }
              
              .no-print { display: none !important; }
              
              /* Prevent page breaks */
              * {
                page-break-inside: avoid;
                break-inside: avoid;
              }
              
              /* Reduce spacing for print */
              .mb-6 { margin-bottom: 0.75rem !important; }
              .mb-8 { margin-bottom: 1rem !important; }
              .mb-4 { margin-bottom: 0.5rem !important; }
              .p-8 { padding: 1rem !important; }
              .p-6 { padding: 0.75rem !important; }
              .p-4 { padding: 0.5rem !important; }
              
              /* Reduce font sizes slightly for print */
              .text-4xl { font-size: 1.875rem !important; line-height: 2rem !important; }
              .text-3xl { font-size: 1.5rem !important; line-height: 1.75rem !important; }
              .text-2xl { font-size: 1.25rem !important; line-height: 1.5rem !important; }
              
              /* Reduce QR code size for print */
              .w-28, .w-32 { width: 5rem !important; }
              .h-28, .h-32 { height: 5rem !important; }
              
              /* Reduce stamp size for print */
              .w-24 { width: 4rem !important; }
              .h-24 { height: 4rem !important; }
              
              /* Ensure certificate container fits on one page */
              /* Ensure certificate container fits on one page */
              div[style*="maxWidth"], div[style*="aspectRatio"] {
                page-break-inside: avoid;
                break-inside: avoid;
                max-height: none !important;
                height: auto !important;
                aspect-ratio: auto !important;
                overflow: visible !important;
                transform: scale(0.8);
                transform-origin: top center;
                margin-top: 2rem;
              }
              
              /* Scale down if needed */
              body > div {
                transform-origin: top center;
                max-height: 100vh;
              }
            }
          </style>
        </head>
        <body>
          ${certificateHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 1000);
  };

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // If registration number is being changed, try to auto-fill
    if (name === "registrationNumber") {
      setFormData({ ...formData, [name]: value });
      
      // Check if student exists in database
      if (value && mockStudentDatabase[value]) {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
          const studentData = mockStudentDatabase[value];
          setFormData((prev) => ({
            ...prev,
            registrationNumber: value,
            studentName: studentData.studentName || "",
            studentId: studentData.studentId || "",
            program: studentData.program || "",
            department: studentData.department || "",
            dateOfBirth: studentData.dateOfBirth || "",
            gpa: studentData.gpa || "",
            honors: studentData.honors || "none",
            graduationDate: studentData.graduationDate || getDefaultGraduationDate(),
          }));
          setLoading(false);
        }, 500);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderCertificateTemplate = () => {
    const commonHeader = (
      <div className="text-center mb-3">
        <div className="flex justify-center mb-2">
          <IoSchoolOutline className="w-12 h-12 sm:w-16 sm:h-16 text-primary-50" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">
          SANVERSE UNIVERSITY
        </h1>
        <p className="text-xs sm:text-sm text-primary-50/60">
          Established 1950
        </p>
        <div className="w-24 h-[2px] bg-primary-100 mx-auto mt-2"></div>
      </div>
    );

    const commonFooter = (
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
        {/* Left: Date and Certificate Number */}
        <div className="text-left">
          <div className="mb-2">
            <p className="text-xs text-primary-50/60 mb-1">
              {formData.certificateType === "graduation" ? "Graduation Date" : "Issue Date"}
            </p>
            <p className="text-xs font-semibold text-primary-50">
              {new Date(formData.graduationDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-primary-50/60 mb-1">Certificate No.</p>
            <p className="text-xs font-semibold text-primary-50">
              {formData.certificateNumber}
            </p>
          </div>
          <div>
            <p className="text-xs text-primary-50/60 mb-1">Registration No.</p>
            <p className="text-xs font-semibold text-primary-50">
              {formData.registrationNumber}
            </p>
          </div>
        </div>

        {/* Center: QR Code */}
        <div className="flex justify-center">
          {qrCodeUrl && (
            <div className="text-center">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-28 h-28 sm:w-32 sm:h-32 mx-auto border-2 border-gray-300"
              />
              <p className="text-xs text-primary-50/60 mt-1">Scan to verify</p>
            </div>
          )}
        </div>

        {/* Center-Right: Official Stamp */}
        <div className="flex justify-center items-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-double border-primary-50 flex items-center justify-center bg-primary-50/5">
            <div className="text-center px-2">
              <p className="text-[10px] sm:text-xs font-bold text-primary-50 leading-tight">SANVERSE</p>
              <p className="text-[10px] sm:text-xs font-bold text-primary-50 leading-tight">UNIVERSITY</p>
              <div className="w-14 h-[2px] bg-primary-50 my-1 mx-auto"></div>
              <p className="text-[9px] sm:text-[10px] text-primary-50/80 leading-tight font-semibold">OFFICIAL</p>
              <p className="text-[9px] sm:text-[10px] text-primary-50/80 leading-tight font-semibold">SEAL</p>
            </div>
            {/* Decorative star in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="text-5xl text-primary-50">★</div>
            </div>
          </div>
        </div>

        {/* Right: Signatures */}
        <div className="text-right">
          <div className="mb-3">
            <div className="border-t-2 border-primary-50 pt-1 inline-block min-w-[120px]">
              <p className="text-xs text-primary-50/60">Registrar</p>
            </div>
          </div>
          <div>
            <div className="border-t-2 border-primary-50 pt-1 inline-block min-w-[120px]">
              <p className="text-xs text-primary-50/60">Vice Chancellor</p>
            </div>
          </div>
        </div>
      </div>
    );

    switch (formData.certificateType) {
      case "graduation":
        return (
          <div className="border-8 border-double border-primary-50 p-4 sm:p-6 h-full flex flex-col">
            {commonHeader}
            <div className="text-center mb-2">
              <h2 className="text-xl sm:text-2xl font-serif text-primary-50 mb-1">
                Certificate of Graduation
              </h2>
              <p className="text-xs text-primary-50/60">This is to certify that</p>
            </div>
            <div className="text-center mb-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary-50 border-b-2 border-primary-100 inline-block px-6 pb-1">
                {formData.studentName.toUpperCase()}
              </h3>
            </div>
            <div className="text-center mb-2 flex-1">
              <p className="text-xs sm:text-sm text-primary-50 mb-1">
                has successfully completed the requirements for the degree of
              </p>
              <h4 className="text-lg sm:text-xl font-bold text-primary-50 mb-1">
                {formData.program}
              </h4>
              <p className="text-xs sm:text-sm text-primary-50 mb-1">
                in the Department of {formData.department}
              </p>
              {formData.honors !== "none" && (
                <p className="text-sm sm:text-base font-semibold text-primary-100 mb-1">
                  with {honorsOptions.find((h) => h.value === formData.honors)?.label}
                </p>
              )}
              {formData.gpa && (
                <p className="text-xs text-primary-50/60">GPA: {formData.gpa}</p>
              )}
            </div>
            {commonFooter}
            <div className="text-center mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-primary-50/60">Issued on {getCurrentDate()}</p>
            </div>
          </div>
        );

      case "completion":
        return (
          <div className="border-8 border-solid border-primary-100 p-4 sm:p-6 h-full flex flex-col bg-gradient-to-br from-white to-primary-50/5">
            {commonHeader}
            <div className="text-center mb-2">
              <h2 className="text-xl sm:text-2xl font-serif text-primary-100 mb-1">
                Certificate of Completion
              </h2>
              <p className="text-xs text-primary-50/60">This certifies that</p>
            </div>
            <div className="text-center mb-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary-50 underline decoration-primary-100 decoration-2 underline-offset-4 px-6 pb-1">
                {formData.studentName.toUpperCase()}
              </h3>
            </div>
            <div className="text-center mb-2 flex-1">
              <p className="text-xs sm:text-sm text-primary-50 mb-1">
                has successfully completed the program
              </p>
              <h4 className="text-lg sm:text-xl font-bold text-primary-100 mb-1">
                {formData.program}
              </h4>
              <p className="text-xs sm:text-sm text-primary-50 mb-1">
                Department of {formData.department}
              </p>
              {formData.gpa && (
                <p className="text-xs text-primary-50/60 mt-1">
                  Final GPA: {formData.gpa}
                </p>
              )}
            </div>
            {commonFooter}
            <div className="text-center mt-2 pt-2 border-t border-primary-100">
              <p className="text-xs text-primary-50/60">Issued on {getCurrentDate()}</p>
            </div>
          </div>
        );

      case "towhom":
        return (
          <div className="border-2 border-primary-50 p-4 sm:p-6 h-full flex flex-col">
            {commonHeader}
            <div className="text-left mb-2">
              <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-2">
                TO WHOM IT MAY CONCERN
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-primary-50 leading-relaxed">
                <p>
                  This is to certify that <strong>{formData.studentName}</strong>, bearing Student ID{" "}
                  <strong>{formData.studentId}</strong>, was a bonafide student of this institution.
                </p>
                <p>
                  {formData.studentName} was enrolled in the <strong>{formData.program}</strong> program
                  in the Department of <strong>{formData.department}</strong>.
                </p>
                <p>
                  The student successfully completed their studies and graduated on{" "}
                  <strong>
                    {new Date(formData.graduationDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </strong>
                  {formData.gpa && (
                    <> with a cumulative GPA of <strong>{formData.gpa}</strong></>
                  )}
                  {formData.honors !== "none" && (
                    <>, achieving <strong>{honorsOptions.find((h) => h.value === formData.honors)?.label}</strong></>
                  )}
                  .
                </p>
                <p className="mt-3">
                  This certificate is issued upon request for official purposes.
                </p>
              </div>
            </div>
            <div className="flex-1"></div>
            {commonFooter}
            <div className="text-center mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-primary-50/60">Issued on {getCurrentDate()}</p>
            </div>
          </div>
        );

      case "transcript":
        return (
          <div className="border-2 border-primary-50 p-4 sm:p-6 h-full flex flex-col text-xs sm:text-sm">
            {/* Header - Compact */}
            <div className="text-center mb-4">
              <div className="flex justify-center mb-2">
                <IoSchoolOutline className="w-12 h-12 text-primary-50" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary-50">SANVERSE UNIVERSITY</h1>
              <p className="text-xs text-primary-50/60">Official Academic Transcript</p>
            </div>

            {/* Student Info - Compact Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 pb-3 border-b-2 border-primary-50">
              <div><span className="text-primary-50/60">Name:</span> <strong>{formData.studentName}</strong></div>
              <div><span className="text-primary-50/60">Student ID:</span> <strong>{formData.studentId}</strong></div>
              <div><span className="text-primary-50/60">Program:</span> {formData.program}</div>
              <div><span className="text-primary-50/60">Department:</span> {formData.department}</div>
              <div><span className="text-primary-50/60">Date of Birth:</span> {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : "N/A"}</div>
              <div><span className="text-primary-50/60">Graduation:</span> {new Date(formData.graduationDate).toLocaleDateString()}</div>
            </div>

            {/* Course Listing - Sample Data */}
            <div className="flex-1 overflow-auto">
              <h3 className="font-bold text-primary-50 mb-2 text-sm">Academic Record</h3>
              
              {/* Year 1 - Semester 1 */}
              <div className="mb-3">
                <div className="bg-primary-50 text-white px-2 py-1 text-xs font-semibold">Year 1 - Semester 1</div>
                <table className="w-full text-xs">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-1">Course Code</th>
                      <th className="text-left p-1">Course Title</th>
                      <th className="text-center p-1">Credits</th>
                      <th className="text-center p-1">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-1">CS101</td>
                      <td className="p-1">Introduction to Programming</td>
                      <td className="text-center p-1">3</td>
                      <td className="text-center p-1 font-semibold">A</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-1">MATH101</td>
                      <td className="p-1">Calculus I</td>
                      <td className="text-center p-1">4</td>
                      <td className="text-center p-1 font-semibold">A-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-1">ENG101</td>
                      <td className="p-1">English Composition</td>
                      <td className="text-center p-1">3</td>
                      <td className="text-center p-1 font-semibold">B+</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-right text-xs mt-1"><strong>Semester GPA: 3.67</strong></div>
              </div>

              {/* Year 1 - Semester 2 */}
              <div className="mb-3">
                <div className="bg-primary-50 text-white px-2 py-1 text-xs font-semibold">Year 1 - Semester 2</div>
                <table className="w-full text-xs">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-1">Course Code</th>
                      <th className="text-left p-1">Course Title</th>
                      <th className="text-center p-1">Credits</th>
                      <th className="text-center p-1">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-1">CS102</td>
                      <td className="p-1">Data Structures</td>
                      <td className="text-center p-1">3</td>
                      <td className="text-center p-1 font-semibold">A</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-1">MATH102</td>
                      <td className="p-1">Calculus II</td>
                      <td className="text-center p-1">4</td>
                      <td className="text-center p-1 font-semibold">A</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-1">PHYS101</td>
                      <td className="p-1">Physics I</td>
                      <td className="text-center p-1">4</td>
                      <td className="text-center p-1 font-semibold">B+</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-right text-xs mt-1"><strong>Semester GPA: 3.73</strong></div>
              </div>

              <div className="text-xs text-gray-500 italic mt-2">
                * Additional semesters and courses listed in full official transcript
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-4 pt-3 border-t-2 border-primary-50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-primary-50/60">Total Credits</p>
                  <p className="text-lg font-bold text-primary-50">120</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-primary-50/60">Cumulative GPA</p>
                  <p className="text-lg font-bold text-primary-100">{formData.gpa || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-primary-50/60">Classification</p>
                  <p className="text-sm font-semibold text-primary-50">
                    {formData.honors !== "none"
                      ? honorsOptions.find((h) => h.value === formData.honors)?.label
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer - Compact */}
            <div className="mt-4 pt-3 border-t border-gray-200 grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-primary-50/60">Cert. No:</p>
                <p className="font-semibold">{formData.certificateNumber}</p>
              </div>
              <div className="text-center">
                {qrCodeUrl && (
                  <img src={qrCodeUrl} alt="QR" className="w-16 h-16 mx-auto" />
                )}
              </div>
              <div className="text-right">
                <p className="text-primary-50/60">Issued:</p>
                <p className="font-semibold">{getCurrentDate()}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 no-print">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
          <IoDocumentTextOutline className="w-7 h-7 sm:w-8 sm:h-8" />
          Certificate Generator
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Generate official student certificates
        </p>
      </div>

      {!showPreview ? (
        /* Form View */
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Step Progress Indicator */}
          <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-primary-50/5 to-primary-100/5">
            <div className="flex items-center justify-between mb-6">
              {FORM_STEPS.map((step, idx) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        currentStep >= step.id
                          ? "bg-primary-50 text-white shadow-lg scale-110"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <span className="text-lg sm:text-xl">{step.icon}</span>
                    </div>
                    <p
                      className={`mt-2 text-xs sm:text-sm text-center transition-colors hidden sm:block ${
                        currentStep >= step.id
                          ? "text-primary-50 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {idx < FORM_STEPS.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                        currentStep > step.id ? "bg-primary-50" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold text-primary-50">
                {FORM_STEPS[currentStep - 1].title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Step {currentStep} of {FORM_STEPS.length}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Step 1: Student Identification */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Registration Number */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Registration Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={handleInputChange}
                          placeholder="e.g., REG/2024/001"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                        />
                        {loading && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-primary-50 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Enter registration number to auto-fill student details
                      </p>
                    </div>

                    {/* Certificate Type */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Certificate Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="certificateType"
                        value={formData.certificateType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                      >
                        {certificateTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Student Name */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="e.g., John Doe Smith"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                      />
                    </div>

                    {/* Student ID */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Student ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        placeholder="e.g., STU-2024-001"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Program */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Program <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                      >
                        <option value="">Select program</option>
                        {programs.map((program) => (
                          <option key={program} value={program}>
                            {program}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Department */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Graduation Date */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Graduation Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="graduationDate"
                        value={formData.graduationDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                      />
                    </div>

                    {/* GPA */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        GPA
                      </label>
                      <input
                        type="text"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        placeholder="e.g., 3.75"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                      />
                    </div>

                    {/* Honors */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Honors/Classification
                      </label>
                      <select
                        name="honors"
                        value={formData.honors}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                      >
                        {honorsOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Certificate Configuration */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Certificate Number */}
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Certificate Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="certificateNumber"
                        value={formData.certificateNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., CERT/2024/001"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                      />
                    </div>
                  </div>

                  {/* Review Summary */}
                  <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-primary-50 mb-4">
                      Review Certificate Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Student Name:</p>
                        <p className="font-medium text-primary-50">
                          {formData.studentName || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Student ID:</p>
                        <p className="font-medium text-primary-50">
                          {formData.studentId || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Program:</p>
                        <p className="font-medium text-primary-50">
                          {formData.program || "Not selected"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Department:</p>
                        <p className="font-medium text-primary-50">
                          {formData.department || "Not selected"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Certificate Type:</p>
                        <p className="font-medium text-primary-50">
                          {certificateTypes.find((t) => t.value === formData.certificateType)
                            ?.label || "Not selected"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Graduation Date:</p>
                        <p className="font-medium text-primary-50">
                          {formData.graduationDate
                            ? new Date(formData.graduationDate).toLocaleDateString()
                            : "Not provided"}
                        </p>
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
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="flex-1 sm:flex-none px-6 py-3 border-2 border-primary-50 text-primary-50 rounded-lg hover:bg-primary-50/5 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                )}

                {currentStep < FORM_STEPS.length ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    disabled={!isStepValid()}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                      !isStepValid()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary-50 text-white hover:bg-primary-50/90"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleGenerateCertificate}
                    disabled={!isStepValid()}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                      !isStepValid()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary-50 text-white hover:bg-primary-50/90"
                    }`}
                  >
                    <IoCheckmarkCircleOutline className="w-5 h-5" />
                    Generate Certificate
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

      ) : (
        /* Certificate Preview */
        <div>
          {/* Action Buttons */}
          <div className="mb-6 flex flex-wrap gap-3 no-print">
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 border border-gray-200 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Back to Form
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors flex items-center gap-2"
            >
              <IoPrintOutline className="w-5 h-5" />
              Print Certificate
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-100/90 transition-colors flex items-center gap-2"
            >
              <IoDownloadOutline className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          {/* Certificate */}
          <div
            ref={certificateRef}
            className="bg-white p-8 sm:p-12 mx-auto"
            style={{ maxWidth: "1000px", aspectRatio: "1.414/1" }}
          >
            {renderCertificateTemplate()}
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificateGenerator;
