import React, { useState } from "react";
import {
    IoCalendarOutline,
    IoCallOutline,
    IoCheckmarkCircleOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoPersonOutline,
    IoRibbonOutline,
    IoSchoolOutline,
    IoStatsChartOutline,
    IoTimeOutline
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface Student {
  id: string;
  name: string;
  grade: string;
  rollNumber: string;
  avatar: string;
  attendance: string;
  gpa: string;
  teacher: {
    name: string;
    contact: string;
  };
  recentActivity: {
    type: string;
    description: string;
    date: string;
  }[];
}

const childrenData: Student[] = [
  {
    id: "STD-101",
    name: "John Doe",
    grade: "Grade 10 - Science",
    rollNumber: "2023001",
    avatar: "JD",
    attendance: "96%",
    gpa: "3.85",
    teacher: {
      name: "Mrs. Sarah Smith",
      contact: "+1 234 567 891"
    },
    recentActivity: [
      { type: "Grade", description: "Scored 92% in Mathematics Quiz", date: "2 days ago" },
      { type: "Attendance", description: "Present for all classes today", date: "Today" },
    ]
  },
  {
    id: "STD-202",
    name: "Jane Doe",
    grade: "Grade 8 - Arts",
    rollNumber: "2023045",
    avatar: "JD",
    attendance: "94%",
    gpa: "3.70",
    teacher: {
      name: "Mr. Robert Wilson",
      contact: "+1 234 567 892"
    },
    recentActivity: [
      { type: "Event", description: "Participated in School Art Exhibition", date: "5 days ago" },
      { type: "Grade", description: "Submitted Science Project B+", date: "3 days ago" },
    ]
  }
];

const MyChildren: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(childrenData[0].id);
  const [selectedSlot, setSelectedSlot] = useState("");

  const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:30 PM"];

  const handleBooking = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }
    const childName = childrenData.find(c => c.id === selectedChild)?.name;
    toast.success(`Conference slot booked for ${childName} at ${selectedSlot}!`, {
      icon: <IoCheckmarkCircleOutline className="text-primary-50" />
    });
    setIsModalOpen(false);
    setSelectedSlot("");
  };

  return (
    <div className="space-y-6 animate-fade-in px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Children</h1>
          <p className="text-gray-500">Overview of your children's academic performance and activities.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary-50 bg-primary-50/10 px-4 py-2 rounded-lg font-medium">
          <IoNotificationsOutline className="text-lg" />
          <span>3 New Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {childrenData.map((child) => (
          <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Header / Basic Info */}
            <div className="p-6 border-b border-gray-50 bg-gradient-to-r from-primary-50/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm">
                  {child.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 truncate">{child.name}</h2>
                    <span className="text-xs font-semibold px-2 py-1 bg-primary-50/10 text-primary-50 rounded-full">
                      {child.id}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <IoSchoolOutline /> {child.grade}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-primary-50">
                    <IoCalendarOutline />
                    <span className="text-xs font-semibold">Attendance</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{child.attendance}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-primary-100">
                    <IoRibbonOutline />
                    <span className="text-xs font-semibold">Current GPA</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{child.gpa}</p>
                </div>
              </div>

              {/* Class Teacher */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                   <IoPersonOutline className="text-primary-50" /> Class Teacher
                </h3>
                <div className="flex items-center justify-between bg-white border border-gray-100 p-3 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">{child.teacher.name}</p>
                    <p className="text-xs text-gray-500">Contact: {child.teacher.contact}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-primary-50 bg-primary-50/10 rounded-lg hover:bg-primary-50 hover:text-white transition-colors">
                      <IoMailOutline />
                    </button>
                    <button className="p-2 text-primary-100 bg-primary-100/10 rounded-lg hover:bg-primary-100 hover:text-white transition-colors">
                      <IoCallOutline />
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <IoStatsChartOutline className="text-primary-300" /> Recent Updates
                </h3>
                <div className="space-y-2">
                  {child.recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-xl text-sm">
                      <div className={`w-2 h-2 mt-1.5 rounded-full ${activity.type === 'Grade' ? 'bg-primary-100' : 'bg-primary-50'}`} />
                      <div className="flex-1">
                        <p className="text-gray-700">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link to={`/parent/progress`} className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-50 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity no-underline shadow-sm">
                  Full Report <IoChevronForwardOutline />
                </Link>
                <Link to="/parent/calendar" className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-primary-50/20 text-primary-50 rounded-xl font-bold text-sm hover:bg-primary-50/5 transition-colors no-underline">
                  View Schedule
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Tips */}
      <div className="bg-primary-300 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-bold">Upcoming Parent-Teacher Conference</h2>
          <p className="text-white/80 max-w-lg">The annual conference is scheduled for next month. You can pre-book your slots with specific subject teachers now.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap bg-white text-primary-300 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-shadow border-none cursor-pointer active:scale-95"
        >
          Book Appointment
        </button>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative animate-slide-up overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-primary-50/5">
              <h2 className="text-xl font-bold text-gray-800">Book Conference Slot</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Child Selection */}
              <div className="space-y-3">
                 <label className="text-xs font-black uppercase tracking-widest text-gray-400">Select Child</label>
                 <div className="flex gap-3">
                    {childrenData.map(child => (
                      <button 
                        key={child.id}
                        onClick={() => setSelectedChild(child.id)}
                        className={`flex-1 p-3 rounded-2xl border transition-all text-left ${
                          selectedChild === child.id 
                          ? 'border-primary-50 bg-primary-50/5 ring-1 ring-primary-50' 
                          : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <p className={`text-sm font-bold ${selectedChild === child.id ? 'text-primary-50' : 'text-gray-700'}`}>{child.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{child.grade}</p>
                      </button>
                    ))}
                 </div>
              </div>

              {/* Slot Selection */}
              <div className="space-y-3">
                 <label className="text-xs font-black uppercase tracking-widest text-gray-400">Available Slots</label>
                 <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(slot => (
                      <button 
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedSlot === slot 
                          ? 'bg-primary-50 text-white border-primary-50 shadow-lg shadow-primary-50/20' 
                          : 'bg-gray-50 text-gray-500 border-transparent hover:border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <IoTimeOutline className={selectedSlot === slot ? 'text-white' : 'text-primary-50'} />
                          {slot}
                        </div>
                      </button>
                    ))}
                 </div>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
                 <IoCalendarOutline className="text-xl text-blue-500 shrink-0 mt-0.5" />
                 <p className="text-xs text-blue-700 font-medium leading-relaxed">
                   The conference is scheduled for **January 15th, 2026**. Please select your preferred time for a 15-minute 1-on-1 session.
                 </p>
              </div>

              <button 
                onClick={handleBooking}
                className="w-full py-4 bg-primary-50 text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyChildren;
