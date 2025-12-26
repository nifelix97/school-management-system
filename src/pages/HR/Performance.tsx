import React from "react";
import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoStarOutline,
  IoTrendingUpOutline
} from "react-icons/io5";

interface PerformanceReview {
  id: string;
  name: string;
  role: string;
  lastReview: string;
  nextReview: string;
  rating: number;
}

import { useState } from "react";
import {
  IoAddOutline,
  IoCloseOutline,
  IoStar
} from "react-icons/io5";

const Performance: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const [reviewsList, setReviewsList] = useState<PerformanceReview[]>([
    { id: "PR001", name: "John Doe", role: "Math Teacher", lastReview: "2025-06-15", nextReview: "2025-12-30", rating: 4.5 },
    { id: "PR002", name: "Jane Smith", role: "HR Assistant", lastReview: "2025-03-20", nextReview: "2025-09-20", rating: 4.2 },
    { id: "PR003", name: "Robert Musoke", role: "Physics Teacher", lastReview: "2025-08-10", nextReview: "2026-02-10", rating: 4.8 },
    { id: "PR004", name: "Sarah Nakato", role: "Librarian", lastReview: "2025-05-12", nextReview: "2025-11-12", rating: 3.9 },
  ]);

  const [newAppraisal, setNewAppraisal] = useState({
    name: "",
    role: "",
    rating: 5,
    summary: ""
  });

  const handleAddAppraisal = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `PR${String(reviewsList.length + 1).padStart(3, '0')}`;
    const entry: PerformanceReview = {
      ...newAppraisal,
      id,
      lastReview: new Date().toISOString().split('T')[0],
      nextReview: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setReviewsList([entry, ...reviewsList]);
    setIsModalOpen(false);
    setNewAppraisal({ name: "", role: "", rating: 5, summary: "" });
    alert("New appraisal submitted successfully!");
  };

  const openViewModal = (review: PerformanceReview) => {
    setSelectedReview(review);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-primary-50 tracking-tight">Performance</h1>
          <p className="text-primary-50/40 font-bold uppercase text-[10px] tracking-widest mt-1">Track and manage staff performance appraisals</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary-50 text-white px-6 py-2.5 rounded-xl hover:bg-primary-100 transition-all shadow-md hover:shadow-lg active:scale-95 font-black uppercase text-xs tracking-widest"
        >
          <IoAddOutline className="text-xl" />
          <span>New Appraisal</span>
        </button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
          <p className="text-[11px] font-black text-primary-50/30 uppercase tracking-widest leading-none mb-3">Average Score</p>
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-black text-primary-50">4.3</h3>
            <div className="flex text-yellow-400">
              <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStarOutline />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 font-black flex items-center gap-1 uppercase tracking-tighter">
            <IoTrendingUpOutline /> +0.2 from last quarter
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
          <p className="text-[11px] font-black text-primary-50/30 uppercase tracking-widest leading-none mb-3">Review Rate</p>
          <h3 className="text-3xl font-black text-primary-50">85%</h3>
          <div className="w-full bg-gray-50 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary-50 h-full rounded-full w-[85%] transition-all duration-1000"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-[11px] font-black text-primary-50/30 uppercase tracking-widest leading-none mb-2">Upcoming</p>
            <h3 className="text-3xl font-black text-primary-50">12</h3>
          </div>
          <div className="p-3 bg-primary-50/5 rounded-xl text-primary-50">
            <IoCalendarOutline className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
          <h2 className="text-xl font-black text-primary-50">Staff Appraisals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Last Review</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Next Review</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Rating</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviewsList.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-primary-50 leading-tight">{review.name}</span>
                      <span className="text-[10px] font-bold text-primary-50/30 uppercase tracking-wide">{review.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-primary-50/60 uppercase">{review.lastReview}</td>
                  <td className="px-6 py-4 text-xs font-bold text-primary-50/30 uppercase">{review.nextReview}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-xs font-black text-primary-50">
                      <IoStar className="text-yellow-400" />
                      {review.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openViewModal(review)}
                      className="flex items-center gap-1.5 ml-auto bg-gray-50 text-primary-50/60 px-4 py-1.5 rounded-xl text-[10px] font-black hover:bg-primary-50 hover:text-white transition-all shadow-sm active:scale-95 uppercase tracking-widest border border-gray-100"
                    >
                      <IoCheckmarkCircleOutline className="text-sm" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Appraisal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-primary-50 mb-1">New Appraisal</h2>
                <p className="text-sm text-primary-50/40 font-medium tracking-tight">Evaluate staff performance standards.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-primary-50 transition-colors">
                <IoCloseOutline size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddAppraisal} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Staff Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm"
                  placeholder="e.g. John Doe"
                  value={newAppraisal.name}
                  onChange={e => setNewAppraisal({ ...newAppraisal, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Rating (1-5)</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewAppraisal({ ...newAppraisal, rating: star })}
                      className={`text-2xl transition-all ${newAppraisal.rating >= star ? 'text-yellow-400 scale-110' : 'text-gray-200 hover:text-yellow-200'}`}
                    >
                      <IoStar />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest ml-1">Summary/Notes</label>
                <textarea
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary-50/20 font-bold text-primary-50 text-sm min-h-[100px]"
                  placeholder="Excellent performance in Q4..."
                  value={newAppraisal.summary}
                  onChange={e => setNewAppraisal({ ...newAppraisal, summary: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-primary-50 text-white text-xs font-black hover:bg-primary-100 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
              >
                Submit Appraisal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && selectedReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 bg-primary-50 text-white">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-black">Review Details</h2>
                <button onClick={() => setIsViewModalOpen(false)} className="hover:scale-110 transition-transform">
                  <IoCloseOutline size={24} />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-black">
                  {selectedReview.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black leading-tight">{selectedReview.name}</h3>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest">{selectedReview.role}</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-black text-primary-50/30 uppercase tracking-widest mb-1">Performance</p>
                  <div className="flex items-center gap-2 text-primary-50 font-black">
                    <IoStar className="text-yellow-400" />
                    <span>{selectedReview.rating} / 5</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-black text-primary-50/30 uppercase tracking-widest mb-1">Status</p>
                  <span className="text-[10px] font-black bg-green-100 text-green-700 px-2.5 py-1 rounded-lg uppercase">Completed</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-primary-50/40 uppercase tracking-widest mb-2 px-1">Review Period Information</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-primary-50/40">Last Review Date</span>
                    <span className="font-black text-primary-50">{selectedReview.lastReview}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-primary-50/40">Next Scheduled Date</span>
                    <span className="font-black text-primary-50">{selectedReview.nextReview}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsViewModalOpen(false)}
                className="w-full py-4 rounded-2xl bg-gray-100 text-primary-50 text-xs font-black hover:bg-gray-200 transition-all uppercase tracking-widest"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;
