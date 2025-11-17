import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3 xs:px-4 sm:px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 xs:mb-8">
          <h1 className="text-6xl xs:text-7xl sm:text-8xl font-bold text-primary-50 mb-2 xs:mb-4">
            404
          </h1>
          <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-primary-50 mb-2">
            Page Not Found
          </h2>
          <p className="text-sm xs:text-base text-primary-50/60">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-3 xs:space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 px-4 xs:px-6 py-2 xs:py-3 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 transition-colors text-sm xs:text-base"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 px-4 xs:px-6 py-2 xs:py-3 border border-primary-50 text-primary-50 rounded-lg hover:bg-primary-50/5 transition-colors text-sm xs:text-base"
          >
            <Home size={18} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}