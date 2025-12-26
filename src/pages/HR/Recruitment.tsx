import React from "react";
import {
  IoAddOutline,
  IoBriefcaseOutline,
  IoEllipsisVertical,
  IoPeopleOutline,
  IoTimeOutline
} from "react-icons/io5";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: string;
  applicants: number;
  status: 'Open' | 'Closed' | 'Draft';
}

import { useState } from "react";

const Recruitment: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<JobOpening[]>([
    { id: "JOB001", title: "Senior Math Teacher", department: "Science", type: "Full-time", applicants: 15, status: "Open" },
    { id: "JOB002", title: "Accountant", department: "Finance", type: "Full-time", applicants: 28, status: "Open" },
    { id: "JOB003", title: "Part-time Librarian", department: "Library", type: "Part-time", applicants: 8, status: "Closed" },
    { id: "JOB004", title: "IT Support Specialist", department: "ICT", type: "Contract", applicants: 12, status: "Draft" },
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    department: "Science",
    type: "Full-time",
    status: "Open" as const
  });

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `JOB${String(jobs.length + 1).padStart(3, '0')}`;
    setJobs([{ ...newJob, id, applicants: 0 }, ...jobs]);
    setIsModalOpen(false);
    setNewJob({ title: "", department: "Science", type: "Full-time", status: "Open" });
    alert("New job posted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-primary-50 tracking-tight">Recruitment</h1>
          <p className="text-primary-50/40 font-bold uppercase text-[10px] tracking-widest mt-1">Manage job postings and track candidate applications</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary-50 text-white px-6 py-2.5 rounded-xl hover:bg-primary-100 transition-all shadow-md hover:shadow-lg active:scale-95 font-black uppercase text-xs tracking-widest"
        >
          <IoAddOutline className="text-xl" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Recruitment Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <IoBriefcaseOutline className="text-2xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-primary-50/30 uppercase tracking-widest leading-none mb-1">Active Jobs</p>
            <h3 className="text-2xl font-black text-primary-50">5</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <IoPeopleOutline className="text-2xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-primary-50/30 uppercase tracking-widest leading-none mb-1">Total Applicants</p>
            <h3 className="text-2xl font-black text-primary-50">63</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
          <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
            <IoTimeOutline className="text-2xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-primary-50/30 uppercase tracking-widest leading-none mb-1">Interviews Today</p>
            <h3 className="text-2xl font-black text-primary-50">3</h3>
          </div>
        </div>
      </div>

      {/* Job Openings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30">
          <h2 className="text-xl font-black text-primary-50">Job Openings</h2>
          <button 
            onClick={() => alert("Redirecting to full applications portal...")}
            className="text-[10px] font-black text-primary-50 uppercase tracking-widest hover:underline text-left bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
          >
            View All Applications
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Job Title</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Applicants</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.map((job: JobOpening) => (
                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-primary-50">{job.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-primary-50/60 uppercase">{job.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-primary-50 uppercase tracking-tighter">{job.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-primary-50">{job.applicants}</span>
                      <span className="text-[10px] font-black text-primary-50/20 uppercase">people</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                      job.status === 'Open' ? 'bg-green-100 text-green-700' : 
                      job.status === 'Closed' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                      <IoEllipsisVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-black text-primary-50 mb-1">Post New Job</h2>
              <p className="text-sm text-primary-50/40 font-medium tracking-tight">Expand your team with a new position.</p>
            </div>
            
            <form onSubmit={handleAddJob} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Job Title</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm"
                  placeholder="e.g. Senior Math Teacher"
                  value={newJob.title}
                  onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Department</label>
                  <select
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm appearance-none cursor-pointer"
                    value={newJob.department}
                    onChange={e => setNewJob({ ...newJob, department: e.target.value })}
                  >
                    <option>Science</option>
                    <option>Finance</option>
                    <option>Library</option>
                    <option>ICT</option>
                    <option>Arts</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Job Type</label>
                  <select
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm appearance-none cursor-pointer"
                    value={newJob.type}
                    onChange={e => setNewJob({ ...newJob, type: e.target.value })}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 rounded-2xl text-xs font-black text-primary-50/40 hover:bg-gray-50 transition-colors uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-2xl bg-primary-50 text-white text-xs font-black hover:bg-primary-100 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recruitment;
