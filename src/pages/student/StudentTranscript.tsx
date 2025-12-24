import { ChevronLeft, Download, Printer } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentTranscript: React.FC = () => {
  const navigate = useNavigate();

  const studentInfo = {
    name: "JOHN DOE",
    referenceNumber: "STU-2024-001",
    year: "THIRD YEAR",
    academicYear: "2024",
    department: "COMPUTER SCIENCE",
    program: "BSc IN COMPUTER SCIENCE",
    statementRef: "SANVU/CS/TEMP/............/2024",
  };

  const firstTrimester = [
    { code: "CS301", name: "Data Structures & Algorithms", credit: 10, marks: 85.00, grade: "A" },
    { code: "CS302", name: "Database Management Systems", credit: 10, marks: 78.50, grade: "B" },
    { code: "CS303", name: "Computer Networks", credit: 10, marks: 82.00, grade: "A" },
    { code: "CS304", name: "Operating Systems", credit: 10, marks: 76.00, grade: "B" },
    { code: "HU301", name: "Professional Ethics", credit: 10, marks: 90.00, grade: "A" },
  ];

  const secondTrimester = [
    { code: "CS305", name: "Software Engineering", credit: 10, marks: 88.00, grade: "A" },
    { code: "CS306", name: "Artificial Intelligence", credit: 10, marks: 72.50, grade: "B" },
    { code: "CS307", name: "Web Technologies", credit: 10, marks: 84.50, grade: "A" },
    { code: "CS308", name: "Cyber Security", credit: 10, marks: 79.75, grade: "B" },
    { code: "CS309", name: "Mobile App Development", credit: 10, marks: 86.00, grade: "A" },
    { code: "CS310", name: "Project Management", credit: 10, marks: 81.25, grade: "A" },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      {/* Action Buttons - Hidden when printing */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 font-medium transition-all"
        >
          <ChevronLeft size={20} />
          <span>Back to Marks</span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-semibold shadow-sm"
          >
            <Printer size={18} />
            <span>Print Transcript</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90 transition-all text-sm font-semibold shadow-sm">
            <Download size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Transcript Document */}
      <div className="max-w-[1000px] mx-auto bg-white shadow-2xl print:shadow-none print:w-full min-h-[1400px] relative font-sans text-gray-900 border border-gray-100 overflow-hidden">
        
        {/* Document Border Border Styling */}
        <div className="absolute inset-0 border-[16px] border-white pointer-events-none"></div>

        <div className="p-8 sm:p-12 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-10 border-b-2 border-primary-50/20 pb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary-50 text-white flex items-center justify-center rounded-full font-bold text-3xl shadow-inner">
                SU
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-primary-50 uppercase">SANVERSE UNIVERSITY</h1>
                <p className="text-sm font-semibold text-gray-600 mt-1 uppercase tracking-wider">COLLEGE OF SCIENCE AND TECHNOLOGY</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xl font-bold text-gray-800 tracking-tighter italic">SCHOOL OF ICT</p>
            </div>
          </div>

          {/* Statement Info */}
          <div className="text-center mb-10">
            <h2 className="text-xl font-extrabold text-gray-900 uppercase underline decoration-2 underline-offset-4 mb-6">PROVISIONAL STATEMENT OF RESULTS</h2>
            <div className="space-y-2 text-left max-w-2xl mx-auto font-mono text-sm font-bold">
              <p>{studentInfo.statementRef}</p>
              <p>DEPARTMENT: {studentInfo.department}</p>
              <p>PROGRAM: {studentInfo.program}</p>
            </div>
          </div>

          {/* Student Info Table */}
          <div className="mb-10 overflow-x-auto">
            <table className="w-full border-2 border-gray-900 table-fixed">
              <thead>
                <tr className="bg-[#B8D8E0] text-gray-900 border-b-2 border-gray-900">
                  <th className="py-2 px-4 text-center text-sm font-bold uppercase border-r-2 border-gray-900 w-1/2">Name</th>
                  <th className="py-2 px-4 text-center text-sm font-bold uppercase w-1/2">Reference Number</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-900 font-bold uppercase text-center">
                  <td className="py-3 px-4 border-r-2 border-gray-900">{studentInfo.name}</td>
                  <td className="py-3 px-4">{studentInfo.referenceNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Academic Period Header */}
          <div className="bg-[#D1D5DB] border-2 border-gray-900 py-1.5 px-4 mb-0 flex justify-between items-center font-bold text-sm uppercase">
            <span>{studentInfo.year}</span>
            <span>{studentInfo.academicYear}</span>
          </div>

          {/* Trimester Tables Container */}
          <div className="flex flex-col md:flex-row border-l-2 border-r-2 border-b-2 border-gray-900">
            
            {/* First Trimester */}
            <div className="flex-1 md:border-r-2 border-gray-900">
              <div className="p-1 px-4 border-b-2 border-gray-900 text-center font-bold text-[13px] uppercase tracking-widest bg-gray-50/50">FIRST TRIMESTER</div>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b-2 border-gray-900 font-bold uppercase text-[10px]">
                    <th className="py-1.5 px-2 text-left border-r-2 border-gray-900">Module Code/Name</th>
                    <th className="py-1.5 px-1 text-center border-r-2 border-gray-900 w-12">Credit</th>
                    <th className="py-1.5 px-1 text-center border-r-2 border-gray-900 w-12">Marks</th>
                    <th className="py-1.5 px-1 text-center w-12">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-900">
                  {firstTrimester.map((mod) => (
                    <tr key={mod.code} className="hover:bg-gray-50/50">
                      <td className="py-2 px-3 border-r-2 border-gray-900 font-bold leading-tight uppercase">{mod.code}: {mod.name}</td>
                      <td className="py-2 px-1 text-center border-r-2 border-gray-900 font-bold">{mod.credit}</td>
                      <td className="py-2 px-1 text-center border-r-2 border-gray-900 font-bold">{mod.marks.toFixed(2)}</td>
                      <td className="py-2 px-1 text-center font-bold uppercase">{mod.grade}</td>
                    </tr>
                  ))}
                  {/* Empty rows as in the image */}
                  {[...Array(3)].map((_, index) => (
                    <tr key={`empty-1-${index}`}>
                      <td className="py-3 border-r-2 border-gray-900"></td>
                      <td className="py-3 border-r-2 border-gray-900"></td>
                      <td className="py-3 border-r-2 border-gray-900"></td>
                      <td className="py-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Second Trimester */}
            <div className="flex-1">
              <div className="p-1 px-4 border-b-2 border-gray-900 text-center font-bold text-[13px] uppercase tracking-widest bg-gray-50/50">SECOND TRIMESTER</div>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b-2 border-gray-900 font-bold uppercase text-[10px]">
                    <th className="py-1.5 px-2 text-left border-r-2 border-gray-900">Module Code/Name</th>
                    <th className="py-1.5 px-1 text-center border-r-2 border-gray-900 w-12">Credit</th>
                    <th className="py-1.5 px-1 text-center border-r-2 border-gray-900 w-12">Marks</th>
                    <th className="py-1.5 px-1 text-center w-12">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-900">
                  {secondTrimester.map((mod) => (
                    <tr key={mod.code} className="hover:bg-gray-50/50">
                      <td className="py-2 px-3 border-r-2 border-gray-900 font-bold leading-tight uppercase">{mod.code}: {mod.name}</td>
                      <td className="py-2 px-1 text-center border-r-2 border-gray-900 font-bold">{mod.credit}</td>
                      <td className="py-2 px-1 text-center border-r-2 border-gray-900 font-bold">{mod.marks.toFixed(2)}</td>
                      <td className="py-2 px-1 text-center font-bold uppercase">{mod.grade}</td>
                    </tr>
                  ))}
                  {/* Fewer empty rows for the second column as it has more subjects */}
                  {[...Array(2)].map((_, index) => (
                    <tr key={`empty-2-${index}`}>
                      <td className="py-3 border-r-2 border-gray-900"></td>
                      <td className="py-3 border-r-2 border-gray-900"></td>
                      <td className="py-3 border-r-2 border-gray-900"></td>
                      <td className="py-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Footer */}
          <div className="border-l-2 border-r-2 border-b-2 border-gray-900 font-bold text-[13px] uppercase">
            <div className="flex border-b-2 border-gray-900">
              <div className="py-1.5 px-4 border-r-2 border-gray-900 w-1/3">Total Credit</div>
              <div className="py-1.5 px-4 flex-1 text-center">110</div>
            </div>
            <div className="flex border-b-2 border-gray-900">
              <div className="py-1.5 px-4 border-r-2 border-gray-900 w-1/3">Annual Average Marks (%)</div>
              <div className="py-1.5 px-4 flex-1 text-center">82.14</div>
            </div>
            <div className="flex border-b-2 border-gray-900">
              <div className="py-1.5 px-4 border-r-2 border-gray-900 w-1/3 text-sm">Failed Modules to RETAKE</div>
              <div className="py-1.5 px-4 flex-1 text-center"></div>
            </div>
            <div className="flex">
              <div className="py-1.5 px-4 border-r-2 border-gray-900 w-1/3">Remarks</div>
              <div className="py-1.5 px-4 flex-1 text-center">PROGRESS</div>
            </div>
          </div>

          {/* Signatures Area */}
          <div className="mt-32 flex justify-between items-end relative pb-20">
            {/* HOD Signature */}
            <div className="text-center w-64 space-y-1">
              <div className="h-20 flex items-center justify-center italic text-gray-400 font-serif text-3xl opacity-50 relative overflow-hidden">
                <span className="relative z-10 select-none">Signature</span>
                {/* SVG Signature Path Representation */}
                <svg className="absolute inset-0 w-full h-full stroke-primary-50/20 fill-none pointer-events-none" viewBox="0 0 200 80">
                  <path d="M20,60 Q50,20 80,60 T140,40 T180,60" strokeWidth="2" />
                  <path d="M40,50 Q70,10 100,50 T160,30" strokeWidth="1" />
                </svg>
              </div>
              <div className="pt-2 border-t border-gray-400">
                <p className="font-bold text-[12px] uppercase">HOD</p>
                <p className="font-bold text-[10px] uppercase text-gray-600">DEPARTMENT OF COMPUTER SCIENCE</p>
                <p className="text-[10px] mt-1">12/6/2024</p>
              </div>
            </div>

            {/* Stamp Logo (Circle representation from image) */}
            <div className="absolute left-1/2 bottom-32 -translate-x-1/2 w-32 h-32 border-4 border-primary-50/30 rounded-full flex items-center justify-center opacity-40 rotate-[15deg]">
              <div className="text-center font-bold text-[10px] text-primary-50">
                <p>SANVERSE UNIVERSITY</p>
                <div className="w-16 h-0.5 bg-primary-50/50 mx-auto my-1"></div>
                <p>SCHOOL OF ICT</p>
              </div>
            </div>

            {/* Dean Signature */}
            <div className="text-center w-64 space-y-1 relative">
                {/* Visual Representation of the Blue Stamp in the image */}
                <div className="absolute -top-10 -right-4 w-48 h-48 pointer-events-none opacity-60">
                    <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-blue-600/40">
                        <circle cx="100" cy="100" r="80" strokeWidth="4" strokeDasharray="10 5" />
                        <path d="M50,120 Q80,100 110,120 T170,100" strokeWidth="3" />
                        <text x="100" y="90" textAnchor="middle" className="fill-blue-600 text-[10px] font-bold">SCHOOL OF ICT</text>
                        <text x="100" y="150" textAnchor="middle" className="fill-blue-600 text-[10px] font-bold">DEAN</text>
                    </svg>
                </div>
              <div className="h-20 flex items-center justify-center font-bold text-gray-300 pointer-events-none uppercase tracking-tighter text-2xl">
                DEAN SEAL
              </div>
              <div className="pt-2 border-t border-gray-400 relative z-10">
                <p className="font-bold text-[12px] uppercase">DEAN</p>
                <p className="font-bold text-[10px] uppercase text-gray-600">SCHOOL OF ICT</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 italic">
            * This is a provisional statement and subject to verification by the Registrar's Office.
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { margin: 0; padding: 0; background: white; }
          .min-h-screen { background: white; }
          @page { size: portrait; margin: 0; }
        }
      `}</style>
    </div>
  );
};

export default StudentTranscript;
