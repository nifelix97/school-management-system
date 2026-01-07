import { Award, CheckCircle2, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  useGenerateCertificateMutation,
  useGetMyCertificatesQuery,
} from "../../app/api/certificates";

interface CourseCertificateTabProps {
  courseId: string;
  courseName: string;
  isCompleted: boolean;
  progress: number;
}

export default function CourseCertificateTab({
  courseId,
  courseName,
  isCompleted,
  progress,
}: CourseCertificateTabProps) {
  const [showVerification, setShowVerification] = useState(false);

  const { data: certificatesData, isLoading } = useGetMyCertificatesQuery();
  const [generateCertificate, { isLoading: generating }] = useGenerateCertificateMutation();

  const courseCertificate = certificatesData?.data?.find((cert) => cert.courseId === courseId);

  const handleGenerateCertificate = async () => {
    try {
      await generateCertificate(courseId).unwrap();
    } catch (error) {
      console.error("Failed to generate certificate:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-50" />
      </div>
    );
  }

  // Course not completed yet
  if (!isCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-12">
          <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-bold text-primary-50 mb-2">Certificate Not Available Yet</h3>
          <p className="text-gray-600 mb-6">
            Complete the course to earn your certificate of completion
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Course Progress</span>
              <span className="font-semibold text-primary-50">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-50 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {100 - progress}% remaining to complete
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Course completed but no certificate generated
  if (!courseCertificate) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-primary-50 mb-2">Congratulations!</h3>
          <p className="text-gray-600 mb-6">
            You've completed <strong>{courseName}</strong>
          </p>
          <p className="text-gray-600 mb-6">
            Generate your certificate of completion to showcase your achievement
          </p>

          <button
            onClick={handleGenerateCertificate}
            disabled={generating}
            className="px-6 py-3 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
          >
            {generating && <Loader2 className="w-4 h-4 animate-spin" />}
            {generating ? "Generating..." : "Generate Certificate"}
          </button>
        </div>
      </div>
    );
  }

  // Certificate exists
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 mb-4">
          <Award className="w-10 h-10 text-yellow-600" />
        </div>
        <h3 className="text-2xl font-bold text-primary-50 mb-2">Certificate of Completion</h3>
        <p className="text-gray-600">{courseName}</p>
      </div>

      {/* Certificate Preview */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="border-4 border-primary-50 rounded-lg p-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="text-center">
            <h4 className="text-3xl font-serif font-bold text-primary-50 mb-4">
              Certificate of Completion
            </h4>
            <p className="text-gray-600 mb-2">This is to certify that</p>
            <p className="text-2xl font-bold text-primary-50 mb-4">{courseCertificate.studentName}</p>
            <p className="text-gray-600 mb-2">has successfully completed</p>
            <p className="text-xl font-semibold text-primary-50 mb-6">{courseCertificate.courseName}</p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div>
                <p className="font-semibold">Issue Date</p>
                <p>{new Date(courseCertificate.issueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold">Certificate ID</p>
                <p className="font-mono">{courseCertificate.id.slice(0, 8).toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {courseCertificate.certificateUrl && (
          <a
            href={courseCertificate.certificateUrl}
            download
            className="px-6 py-3 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Certificate
          </a>
        )}
        <button
          onClick={() => setShowVerification(!showVerification)}
          className="px-6 py-3 border border-primary-50 text-primary-50 rounded-lg font-semibold hover:bg-gray-50 transition-all"
        >
          {showVerification ? "Hide" : "Show"} Verification Code
        </button>
      </div>

      {/* Verification Code */}
      {showVerification && (
        <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-primary-50 mb-2 text-center">Verification Code</h4>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Share this code to verify the authenticity of your certificate
          </p>
          <div className="bg-white p-4 rounded border border-gray-300 text-center">
            <code className="text-lg font-mono font-bold text-primary-50">
              {courseCertificate.verificationCode}
            </code>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Anyone can verify this certificate at the verification portal
          </p>
        </div>
      )}
    </div>
  );
}
