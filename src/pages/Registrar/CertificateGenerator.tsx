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
}

const CertificateGenerator: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const certificateRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<CertificateData>({
    studentName: "",
    studentId: "",
    program: "",
    department: "",
    graduationDate: "",
    gpa: "",
    dateOfBirth: "",
    registrationNumber: "",
    certificateNumber: "",
    honors: "none",
  });

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

  const generateQRCode = async (data: CertificateData) => {
    const qrData = JSON.stringify({
      name: data.studentName,
      id: data.studentId,
      program: data.program,
      department: data.department,
      graduationDate: data.graduationDate,
      gpa: data.gpa,
      certificateNumber: data.certificateNumber,
      registrationNumber: data.registrationNumber,
    });

    try {
      const url = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 1,
        color: {
          dark: "#1a1a1a",
          light: "#ffffff",
        },
      });
      setQrCodeUrl(url);
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
            * { box-sizing: border-box; }
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: Arial, sans-serif;
              background: white;
            }
            @media print {
              body { margin: 0; padding: 0; }
              .no-print { display: none !important; }
            }
            /* Basic styles for certificate */
            .bg-white { background-color: white; }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .text-lg { font-size: 1.125rem; }
            .text-xl { font-size: 1.25rem; }
            .text-2xl { font-size: 1.5rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .p-8 { padding: 2rem; }
            .border { border: 1px solid #e5e7eb; }
            .rounded-lg { border-radius: 0.5rem; }
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-primary-50">
              Student Information
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Registration Number */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., REG/2024/001"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                />
              </div>

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
              <div>
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

            {/* Generate Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleGenerateCertificate}
                className="px-6 py-3 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium flex items-center gap-2"
              >
                <IoCheckmarkCircleOutline className="w-5 h-5" />
                Generate Certificate
              </button>
            </div>
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
            className="bg-white p-8 sm:p-12 shadow-2xl mx-auto"
            style={{ maxWidth: "1000px", aspectRatio: "1.414/1" }}
          >
            {/* Decorative Border */}
            <div className="border-8 border-double border-primary-50 p-6 sm:p-8 h-full flex flex-col">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <IoSchoolOutline className="w-16 h-16 sm:w-20 sm:h-20 text-primary-50" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
                  UNIVERSITY NAME
                </h1>
                <p className="text-sm sm:text-base text-primary-50/60">
                  Established 1950
                </p>
                <div className="w-32 h-1 bg-primary-100 mx-auto mt-4"></div>
              </div>

              {/* Certificate Title */}
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-serif text-primary-50 mb-2">
                  Certificate of Graduation
                </h2>
                <p className="text-sm text-primary-50/60">
                  This is to certify that
                </p>
              </div>

              {/* Student Name */}
              <div className="text-center mb-6">
                <h3 className="text-3xl sm:text-4xl font-bold text-primary-50 border-b-2 border-primary-100 inline-block px-8 pb-2">
                  {formData.studentName.toUpperCase()}
                </h3>
              </div>

              {/* Certificate Body */}
              <div className="text-center mb-6 flex-1">
                <p className="text-sm sm:text-base text-primary-50 mb-4">
                  has successfully completed the requirements for the degree of
                </p>
                <h4 className="text-xl sm:text-2xl font-bold text-primary-50 mb-4">
                  {formData.program}
                </h4>
                <p className="text-sm sm:text-base text-primary-50 mb-2">
                  in the Department of {formData.department}
                </p>
                {formData.honors !== "none" && (
                  <p className="text-base sm:text-lg font-semibold text-primary-100 mb-2">
                    with{" "}
                    {
                      honorsOptions.find((h) => h.value === formData.honors)
                        ?.label
                    }
                  </p>
                )}
                {formData.gpa && (
                  <p className="text-sm text-primary-50/60">
                    GPA: {formData.gpa}
                  </p>
                )}
              </div>

              {/* Footer Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                {/* Left: Date and Certificate Number */}
                <div className="text-left">
                  <div className="mb-3">
                    <p className="text-xs text-primary-50/60 mb-1">
                      Graduation Date
                    </p>
                    <p className="text-sm font-semibold text-primary-50">
                      {new Date(formData.graduationDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-primary-50/60 mb-1">
                      Certificate No.
                    </p>
                    <p className="text-sm font-semibold text-primary-50">
                      {formData.certificateNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-50/60 mb-1">
                      Registration No.
                    </p>
                    <p className="text-sm font-semibold text-primary-50">
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
                        className="w-24 h-24 sm:w-28 sm:h-28 mx-auto border-2 border-gray-300"
                      />
                      <p className="text-xs text-primary-50/60 mt-1">
                        Scan to verify
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Signatures */}
                <div className="text-right">
                  <div className="mb-6">
                    <div className="border-t-2 border-primary-50 pt-1 inline-block min-w-[150px]">
                      <p className="text-xs text-primary-50/60">Registrar</p>
                    </div>
                  </div>
                  <div>
                    <div className="border-t-2 border-primary-50 pt-1 inline-block min-w-[150px]">
                      <p className="text-xs text-primary-50/60">
                        Vice Chancellor
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issue Date */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-primary-50/60">
                  Issued on {getCurrentDate()}
                </p>
              </div>
            </div>
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
