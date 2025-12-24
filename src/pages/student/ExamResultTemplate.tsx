import React, { useEffect } from "react";
import {
    IoChevronBackOutline,
    IoCloudDownloadOutline,
    IoPrintOutline
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const ExamResultTemplate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { examResult } = location.state || {};

  useEffect(() => {
    if (!examResult) {
      navigate("/online-exam");
    }
  }, [examResult, navigate]);

  if (!examResult) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 lg:p-12 flex items-center justify-center print:bg-white print:p-0">
      <div className="max-w-[850px] w-full bg-white shadow-2xl relative font-sans text-gray-900 border border-gray-100 overflow-hidden print:shadow-none print:border-none print:w-full formal-result-sheet">
        
        {/* Document Border Styling */}
        <div className="absolute inset-0 border-[12px] border-white pointer-events-none print:hidden"></div>

        <div className="p-10 sm:p-16 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 border-b-4 border-primary-50 pb-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary-50 text-white flex items-center justify-center rounded-full font-bold text-3xl shadow-inner border-4 border-primary-100/20">
                SU
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter text-primary-50 uppercase leading-none mb-1">SANVERSE UNIVERSITY</h1>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Office of the Registrar</p>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Digital Examination Division</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="px-3 py-1 bg-primary-50 text-white text-[10px] font-black uppercase tracking-widest rounded mb-2">
                OFFICIAL COPY
              </div>
              <p className="text-[11px] font-black text-gray-800 tracking-tighter uppercase italic">{examResult.exam.id}</p>
              <p className="text-[10px] text-gray-400 font-bold">{examResult.date}</p>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-gray-900 uppercase underline decoration-4 underline-offset-8 mb-4">Official Assessment Statement</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Academic Session 2024/2025</p>
          </div>

          {/* Student Information Table */}
          <div className="mb-6">
            <table className="w-full border-2 border-gray-900">
              <tbody>
                <tr className="border-b-2 border-gray-900">
                  <td className="bg-gray-50 py-3 px-4 w-1/4 font-black uppercase text-[11px] text-gray-500 border-r-2 border-gray-900">Candidate Name</td>
                  <td className="py-3 px-4 font-bold text-primary-50 uppercase tracking-tight">JOHN DOE</td>
                  <td className="bg-gray-50 py-3 px-4 w-1/4 font-black uppercase text-[11px] text-gray-500 border-x-2 border-gray-900">Reference</td>
                  <td className="py-3 px-4 font-bold text-primary-50 uppercase tracking-tight">STU-2024-001</td>
                </tr>
                <tr>
                  <td className="bg-gray-50 py-3 px-4 w-1/4 font-black uppercase text-[11px] text-gray-500 border-r-2 border-gray-900">Course Registered</td>
                  <td className="py-3 px-4 font-bold text-primary-50 uppercase tracking-tight" colSpan={3}>
                    {examResult.exam.courseCode} - {examResult.exam.courseName}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Performance Matrix Header */}
          <div className="bg-gray-900 text-white py-2 px-6 mb-0 font-black text-xs uppercase tracking-[0.3em] text-center">
            Assessment Performance Matrix
          </div>

          {/* Main Result Table */}
          <table className="w-full border-2 border-gray-900 text-sm mb-6">
            <thead>
              <tr className="border-b-2 border-gray-900 font-black uppercase text-[11px] text-gray-600 bg-gray-50 text-center">
                <th className="py-4 px-4 text-left border-r-2 border-gray-900">Item Description</th>
                <th className="py-4 px-4 border-r-2 border-gray-900 w-32">Weightage</th>
                <th className="py-4 px-4 w-40">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-900">
              <tr className="font-bold">
                <td className="py-5 px-6 border-r-2 border-gray-900 uppercase tracking-tight">
                  {examResult.exam.title}
                </td>
                <td className="py-5 px-4 text-center border-r-2 border-gray-900">
                  100.00%
                </td>
                <td className="py-5 px-4 text-center">
                  {examResult.score.toFixed(2)} / {examResult.total.toFixed(2)}
                </td>
              </tr>
              <tr className="bg-gray-900 text-white font-black text-lg">
                <td className="py-4 px-6 border-r-2 border-white/20 uppercase tracking-widest text-right" colSpan={2}>
                  AGGREGATE PERCENTAGE
                </td>
                <td className="py-4 px-4 text-center">
                  {examResult.percentage.toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>

          {/* Remarks Section */}
          <div className="border-2 border-gray-900 p-6 mb-8">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Academic Remarks</label>
            <p className="text-xl font-black text-primary-50 uppercase italic tracking-tighter">
              {examResult.percentage >= 50 ? 'DISTINCTION - CLEAR PASS' : 'ACADEMIC REVIEW REQUIRED'}
            </p>
          </div>

          {/* Signatures & Seals */}
          <div className="grid grid-cols-2 gap-10 items-end">
            <div className="relative text-center">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 opacity-40">
                <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-primary-50/50">
                  <circle cx="100" cy="100" r="85" strokeWidth="2" strokeDasharray="5 3" />
                  <circle cx="100" cy="100" r="75" strokeWidth="4" />
                  <text x="100" y="85" textAnchor="middle" className="fill-primary-50 font-black text-[12px] uppercase">Sanverse University</text>
                  <text x="100" y="125" textAnchor="middle" className="fill-primary-50 font-black text-[10px] uppercase">Registrar's Seal</text>
                  <path d="M60,105 Q100,80 140,105 T180,100" strokeWidth="3" opacity="0.5" />
                </svg>
              </div>
              <div className="pt-8 border-t-2 border-gray-900 relative z-10">
                <p className="font-black text-[11px] uppercase text-gray-900 italic">Digitally Signed By</p>
                <p className="font-black text-[13px] uppercase text-primary-50 mt-1">Reg. Div. Administrator</p>
              </div>
            </div>

            <div className="text-center relative">
               <div className="h-16 flex items-center justify-center opacity-30 select-none grayscale invert">
                 <svg className="w-48 h-full stroke-blue-600 fill-none" viewBox="0 0 200 80">
                    <path d="M20,60 Q50,20 80,60 T140,40 T180,60" strokeWidth="2" />
                    <path d="M40,50 Q70,10 100,50 T160,30" strokeWidth="1" />
                  </svg>
               </div>
              <div className="pt-8 border-t-2 border-gray-900 mt-2">
                <p className="font-black text-[11px] uppercase text-gray-900">Head of Department</p>
                <p className="font-bold text-[10px] uppercase text-gray-400 mt-1">Computer Science Examination Board</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Verification ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
            <span>Electronic Document - No Physical Stamp Required</span>
            <span>Page 01 of 01</span>
          </div>
        </div>
      </div>

      {/* Floating Actions Sidebar */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="p-4 bg-primary-50 text-white rounded-2xl shadow-2xl hover:bg-primary-50/90 hover:-translate-y-1 transition-all group relative"
          >
            <IoCloudDownloadOutline size={24} />
            <span className="absolute right-full mr-4 px-3 py-1 bg-gray-900 text-white text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">DOWNLOAD PDF</span>
          </button>
          <button
            onClick={() => window.print()}
            className="p-4 bg-white border-2 border-gray-100 text-primary-50 rounded-2xl shadow-xl hover:bg-gray-50 hover:-translate-y-1 transition-all group relative"
          >
            <IoPrintOutline size={24} />
            <span className="absolute right-full mr-4 px-3 py-1 bg-gray-900 text-white text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">PRINT RECORD</span>
          </button>
          <button
            onClick={() => navigate("/online-exam")}
            className="p-4 bg-red-50 text-red-600 rounded-2xl shadow-xl hover:bg-red-100 hover:-translate-y-1 transition-all group relative"
          >
            <IoChevronBackOutline size={24} />
            <span className="absolute right-full mr-4 px-3 py-1 bg-gray-900 text-white text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">EXIT PORTAL</span>
          </button>
      </div>

      <style>{`
        @media print {
          @page { 
            margin: 5mm; 
            size: A4 portrait; 
          }
          body { background: white !important; margin: 0 !important; }
          .formal-result-sheet {
            max-width: 100% !important;
            width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            padding: 20px !important;
          }
          .print-hidden, button, .fixed { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ExamResultTemplate;
