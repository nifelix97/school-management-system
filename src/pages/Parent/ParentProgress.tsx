import React, { useState } from "react";
import {
    IoAnalyticsOutline,
    IoChevronDownOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoSchoolOutline,
    IoStarOutline,
    IoTrendingUpOutline
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface GradeRecord {
  subject: string;
  grade: string;
  score: number;
  credits: number;
  teacher: string;
}

interface ExamResult {
  title: string;
  date: string;
  score: string;
  color: string;
}

interface ChildProgress {
  id: string;
  name: string;
  gpa: number;
  rank: string;
  attendance: string;
  grades: GradeRecord[];
  recentExams: ExamResult[];
}

const progressData: ChildProgress[] = [
  {
    id: "STD-101",
    name: "John Doe",
    gpa: 3.8,
    rank: "5th in Class",
    attendance: "96%",
    grades: [
      { subject: "Advanced Mathematics", grade: "A", score: 92, credits: 4, teacher: "Dr. Smith" },
      { subject: "Physics", grade: "A-", score: 88, credits: 4, teacher: "Prof. Johnson" },
      { subject: "English Literature", grade: "B+", score: 84, credits: 3, teacher: "Ms. Davis" },
      { subject: "Computer Science", grade: "A", score: 95, credits: 4, teacher: "Mr. Miller" },
    ],
    recentExams: [
      { title: "Mid-Term Physics", date: "Dec 10, 2025", score: "88/100", color: "bg-blue-500" },
      { title: "CS Practical", date: "Dec 05, 2025", score: "98/100", color: "bg-green-500" },
      { title: "Math Quiz", date: "Nov 28, 2025", score: "15/20", color: "bg-amber-500" },
    ]
  },
  {
    id: "STD-202",
    name: "Jane Doe",
    gpa: 3.9,
    rank: "2nd in Class",
    attendance: "94%",
    grades: [
      { subject: "Biology", grade: "A", score: 96, credits: 4, teacher: "Dr. Wilson" },
      { subject: "Chemistry", grade: "A", score: 94, credits: 4, teacher: "Mrs. Brown" },
      { subject: "Art History", grade: "A-", score: 89, credits: 2, teacher: "Ms. Taylor" },
      { subject: "Algebra", grade: "B+", score: 86, credits: 3, teacher: "Mr. Garcia" },
    ],
    recentExams: [
      { title: "Biology Final", date: "Dec 15, 2025", score: "96/100", color: "bg-primary-50" },
      { title: "Chem Lab", date: "Dec 08, 2025", score: "48/50", color: "bg-green-500" },
      { title: "Art Essay", date: "Dec 01, 2025", score: "18/20", color: "bg-purple-500" },
    ]
  }
];



const ParentProgress: React.FC = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(progressData[0]);
  const [selectedSemester, setSelectedSemester] = useState("Fall 2025");
  const [showAllAssessments, setShowAllAssessments] = useState(false);

  const handleDownloadReport = () => {
    toast.info(`Preparing report for ${selectedChild.name}...`, {
      icon: <IoDownloadOutline className="text-primary-50" />
    });
    
    // Simulate generation and download
    setTimeout(() => {
      toast.success("Academic report downloaded successfully!");
    }, 2000);
  };

  const handleRequestMeeting = () => {
    toast.info("Redirecting to support to book an appointment...");
    setTimeout(() => {
      navigate("/parent/help");
    }, 1000);
  };

  const assessmentsToDisplay = showAllAssessments 
    ? [...selectedChild.recentExams, ...selectedChild.recentExams] // Doubling for demonstration 
    : selectedChild.recentExams;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">Academic Progress</h1>
          <p className="text-gray-500 text-sm sm:text-base">Track grades, rank, and performance trends.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <select 
              className="appearance-none w-full sm:w-56 bg-white border-2 border-gray-100 text-gray-800 py-3 px-4 pr-10 rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-primary-50/10 focus:border-primary-50 transition-all cursor-pointer shadow-sm"
              value={selectedChild.id}
              onChange={(e) => {
                const child = progressData.find(c => c.id === e.target.value);
                if (child) {
                  setSelectedChild(child);
                  setShowAllAssessments(false);
                }
              }}
            >
              {progressData.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              className="appearance-none w-full sm:w-44 bg-white border-2 border-gray-100 text-gray-800 py-3 px-4 pr-10 rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-primary-50/10 focus:border-primary-50 transition-all cursor-pointer shadow-sm"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option>Fall 2025</option>
              <option>Spring 2025</option>
              <option>Fall 2024</option>
            </select>
            <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-primary-50/10 text-primary-50 rounded-2xl">
              <IoStarOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current GPA</p>
              <p className="text-3xl font-black text-gray-800">{selectedChild.gpa}</p>
            </div>
          </div>
          <p className="text-xs font-bold text-green-500">+0.2 from last term</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-primary-100/10 text-primary-100 rounded-2xl">
              <IoTrendingUpOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Class Rank</p>
              <p className="text-2xl font-black text-gray-800">{selectedChild.rank}</p>
            </div>
          </div>
          <p className="text-xs font-bold text-primary-100">Top 10% of class</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-primary-300/10 text-primary-300 rounded-2xl">
              <IoAnalyticsOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Attendance</p>
              <p className="text-2xl font-black text-gray-800">{selectedChild.attendance}</p>
            </div>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1">
            <div className="bg-primary-300 h-full rounded-full" style={{ width: selectedChild.attendance }} />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-3xl shadow-xl flex flex-col justify-center relative overflow-hidden">
           <div className="relative z-10">
             <button 
               onClick={handleDownloadReport}
               className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-colors w-full justify-center"
             >
               <IoDownloadOutline className="text-lg" /> Download Report
             </button>
           </div>
           <IoDocumentTextOutline className="absolute -bottom-4 -right-4 text-8xl text-white/5 -rotate-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Grades Table */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Subject-wise Performance</h2>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedSemester}</span>
            </div>
            
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/30">
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Subject</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Score</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Grade</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Teacher</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {selectedChild.grades.map((g, i) => (
                    <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-gray-800">{g.subject}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{g.credits} Credits</p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-gray-700">{g.score}%</span>
                          <div className="w-20 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${g.score >= 90 ? 'bg-green-500' : 'bg-primary-50'}`} 
                              style={{ width: `${g.score}%` }} 
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm">
                        <span className={`px-3 py-1 rounded-lg font-black ${g.grade.startsWith('A') ? 'bg-green-50 text-green-600' : 'bg-primary-50/10 text-primary-50'}`}>
                          {g.grade}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-500 font-medium">{g.teacher}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-gray-50">
               {selectedChild.grades.map((g, i) => (
                 <div key={i} className="p-4 flex justify-between items-center">
                   <div>
                     <p className="text-sm font-bold text-gray-800">{g.subject}</p>
                     <p className="text-xs text-gray-500">{g.teacher}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-base font-black text-primary-50">{g.grade}</p>
                     <p className="text-[10px] font-bold text-gray-400 uppercase">{g.score}%</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Recent Exams Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Recent Assessments</h2>
            <div className="space-y-4">
              {assessmentsToDisplay.map((exam, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className={`w-2 h-12 rounded-full ${exam.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{exam.title}</p>
                    <p className="text-xs text-gray-500">{exam.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-800">{exam.score.split('/')[0]}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">/{exam.score.split('/')[1]}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowAllAssessments(!showAllAssessments)}
              className="w-full mt-6 py-3 text-xs font-black uppercase tracking-widest text-primary-50 bg-primary-50/5 rounded-2xl hover:bg-primary-50/10 transition-colors"
            >
              {showAllAssessments ? "Show Less" : "View All Assessments"}
            </button>
          </div>

          <div className="bg-primary-50/5 p-8 rounded-3xl border border-dashed border-primary-50/20 text-center space-y-4">
            <IoSchoolOutline className="text-4xl text-primary-50 mx-auto" />
            <h3 className="font-bold text-gray-800">Need Academic Support?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">If you notice a dip in performance, you can schedule a counseling session with the academic dean.</p>
            <button 
              onClick={handleRequestMeeting}
              className="px-6 py-3 bg-white text-primary-50 text-xs font-black uppercase tracking-widest rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              Request Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProgress;
