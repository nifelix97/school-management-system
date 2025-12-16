import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    IoCallOutline,
    IoEllipsisVerticalOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoMailOutline,
    IoPeopleOutline,
    IoRibbonOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

type StudentStatus = "Active" | "Graduated" | "Suspended";

interface Student {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  email: string;
  phone: string;
  status: StudentStatus;
  gpa: number;
}

const StudentOverview: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Mock Data
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "Emma Thompson",
      studentId: "STU-2023-001",
      grade: "10th Grade",
      email: "emma.t@school.edu",
      phone: "+1 (555) 010-1234",
      status: "Active",
      gpa: 3.8,
    },
    {
      id: "2",
      name: "Liam Rodriguez",
      studentId: "STU-2023-045",
      grade: "12th Grade",
      email: "liam.r@school.edu",
      phone: "+1 (555) 010-5678",
      status: "Active",
      gpa: 3.5,
    },
    {
      id: "3",
      name: "Sophia Chen",
      studentId: "STU-2022-112",
      grade: "11th Grade",
      email: "sophia.c@school.edu",
      phone: "+1 (555) 010-9012",
      status: "Active",
      gpa: 4.0,
    },
    {
      id: "4",
      name: "Noah Patel",
      studentId: "STU-2021-089",
      grade: "12th Grade",
      email: "noah.p@school.edu",
      phone: "+1 (555) 010-3456",
      status: "Graduated",
      gpa: 3.9,
    },
    {
      id: "5",
      name: "Olivia Kim",
      studentId: "STU-2023-234",
      grade: "9th Grade",
      email: "olivia.k@school.edu",
      phone: "+1 (555) 010-7890",
      status: "Suspended",
      gpa: 2.1,
    },
  ]);

  // Derived filters
  const grades = ["All", ...Array.from(new Set(students.map(s => s.grade)))];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === "All" || student.grade === filterGrade;
    const matchesStatus = filterStatus === "All" || student.status === filterStatus;
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 sm:p-6 lg:p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-50 to-primary-100 mb-2">
            Student Overview
          </h1>
          <p className="text-gray-500 font-medium">
            Analytics and management for the student body.
          </p>
        </div>
        <div className="flex gap-3">
             <button className="px-5 py-2.5 bg-white text-primary-600 font-bold rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <IoStatsChartOutline className="w-5 h-5" />
                <span className="hidden sm:inline">View Reports</span>
             </button>
             <button 
                onClick={() => navigate('/admissions')}
                className="px-5 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
             >
                <IoSchoolOutline className="w-5 h-5" />
                <span>Admissions</span>
             </button>
        </div>
      </div>

       {/* Stats Cards */}
       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
            { label: "Total Students", value: "2,450", icon: <IoPeopleOutline />, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", trend: "+5% vs last year" },
            { label: "New Admissions", value: "320", icon: <IoTrendingUpOutline />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", trend: "+12% this term" },
            { label: "Scholarship", value: "145", icon: <IoRibbonOutline />, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", trend: "Active recipients" },
            { label: "Avg. Attendance", value: "94%", icon: <IoStatsChartOutline />, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", trend: "Stable" }
        ].map((stat, index) => (
            <div key={index} className={`bg-white p-5 rounded-2xl shadow-sm border ${stat.border} hover:shadow-md transition-all duration-300 group relative overflow-hidden`}>
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        {React.cloneElement(stat.icon, { className: "w-6 h-6" })}
                    </div>
                     <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.color.replace('text-', 'bg-').replace('600', '50')} ${stat.color}`}>
                        {stat.trend}
                    </span>
                </div>
                <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-semibold">{stat.label}</div>
                </div>
            </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96 p-2">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                 <IoSearchOutline className="w-5 h-5" />
            </div>
            <input 
                type="text" 
                placeholder="Search by name or ID..." 
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 transition-all font-medium text-gray-700 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex w-full md:w-auto gap-2 p-2 overflow-x-auto">
             <div className="min-w-[140px]">
                <div className="relative">
                    <select 
                        className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50 hover:bg-gray-100 border-none rounded-xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-primary-100 cursor-pointer transition-colors"
                        value={filterGrade}
                        onChange={(e) => setFilterGrade(e.target.value)}
                    >
                        {grades.map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                        ))}
                    </select>
                    <IoFilterOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
             </div>
             <div className="min-w-[140px]">
                <div className="relative">
                    <select 
                        className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50 hover:bg-gray-100 border-none rounded-xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-primary-100 cursor-pointer transition-colors"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Graduated">Graduated</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                    <IoEllipsisVerticalOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
             </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-100/50">
        {filteredStudents.length > 0 ? (
          <>
             {/* Desktop Table View */}
             <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                            <th className="p-6">Student</th>
                            <th className="p-6">Grade / ID</th>
                            <th className="p-6">Performance</th>
                            <th className="p-6">Contact</th>
                            <th className="p-6">Status</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50/80 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary-100/50 text-primary-600 flex items-center justify-center text-sm font-bold border border-primary-200">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div className="font-bold text-gray-900">{student.name}</div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="font-medium text-gray-900">{student.grade}</div>
                                    <div className="text-xs text-gray-500 font-mono mt-0.5">{student.studentId}</div>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm font-bold text-gray-700">{student.gpa} GPA</div>
                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${student.gpa >= 3.5 ? 'bg-emerald-500' : student.gpa >= 2.5 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                                style={{ width: `${(student.gpa / 4) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex flex-col gap-1 text-sm text-gray-500">
                                        <div className="flex items-center gap-2"><IoMailOutline /> {student.email}</div>
                                        <div className="flex items-center gap-2"><IoCallOutline /> {student.phone}</div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                        student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                        student.status === 'Graduated' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                                        'bg-red-50 text-red-700 border-red-100'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            student.status === 'Active' ? 'bg-emerald-500' : 
                                            student.status === 'Graduated' ? 'bg-blue-500' : 
                                            'bg-red-500'
                                        }`} />
                                        {student.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <button 
                                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                                        title="View Profile"
                                    >
                                        <IoEyeOutline className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>

             {/* Mobile Card View */}
             <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                 {filteredStudents.map((student) => (
                     <div key={student.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold">
                                    {student.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{student.name}</h3>
                                    <p className="text-xs text-gray-500">{student.studentId}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                                student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                student.status === 'Graduated' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                                'bg-red-50 text-red-700 border-red-100'
                            }`}>
                                {student.status}
                            </span>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Grade</span>
                                <span className="font-medium text-gray-900">{student.grade}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">GPA</span>
                                <span className={`font-bold ${student.gpa >= 3.5 ? 'text-emerald-600' : 'text-gray-900'}`}>{student.gpa}</span>
                            </div>
                        </div>

                        <button className="w-full py-2 rounded-xl bg-gray-50 text-gray-600 font-semibold text-sm hover:bg-gray-100 transition-colors">
                            View Details
                        </button>
                     </div>
                 ))}
             </div>
          </>
        ) : (
            <div className="text-center py-24">
                <div className="inline-flex p-6 rounded-full bg-gray-50 mb-6 text-gray-300">
                    <IoSearchOutline className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    Try adjusting your search or filters to find what you're looking for.
                </p>
                <button 
                  onClick={() => {setSearchTerm(""); setFilterGrade("All"); setFilterStatus("All");}}
                  className="mt-6 text-primary-600 font-bold hover:underline"
                >
                    Clear All Filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default StudentOverview;
