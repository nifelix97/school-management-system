import React from "react";
import { IoAlertCircleOutline, IoKeyOutline, IoMailOutline } from "react-icons/io5";

const SystemLockScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center space-y-10 animate-fadeIn">
        {/* Warning Icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-red-50 text-red-600 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-inner animate-pulse">
            <IoAlertCircleOutline />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-lg shadow-lg">
            <IoKeyOutline />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-3">
            Service Suspended
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            Your access to the platform has been temporarily suspended due to administrative configuration or critical billing delinquency. 
            Please contact the system administrator to restore access.
          </p>
        </div>

        {/* Action / Contact */}
        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Restoration Contact</p>
            <p className="text-sm font-black text-gray-800 flex items-center gap-2 mt-1">
              <IoMailOutline className="text-primary-100" />
              support@platform.edu
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-primary-100 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all active:scale-95"
          >
            Check Status
          </button>
        </div>

        {/* System Footer */}
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
          Platform Security Enforcement Layer v4.2.0
        </p>
      </div>
    </div>
  );
};

export default SystemLockScreen;
