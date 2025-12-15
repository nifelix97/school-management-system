import React, { useState } from "react";
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";

const DeanDepartmentEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [showModal, setShowModal] = useState(false);

  const events = [
    { id: 1, title: "Departmental Board Meeting", date: "2024-12-15", time: "10:00 AM", location: "Conference Room A", type: "Meeting" },
    { id: 2, title: "Annual Science Fair", date: "2024-12-20", time: "09:00 AM", location: "Main Hall", type: "Event" },
    { id: 3, title: "Faculty Workshop: AI in Education", date: "2024-12-22", time: "02:00 PM", location: "Online (Zoom)", type: "Workshop" },
    { id: 4, title: "End of Semester Party", date: "2024-12-28", time: "05:00 PM", location: "Staff Lounge", type: "Social" },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-50">Department Events</h1>
          <p className="text-gray-500 text-sm mt-1">Schedule and manage upcoming department activities</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-primary-50/90 transition-colors shadow-sm"
        >
          <IoCalendarOutline /> Schedule Event
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 mb-6">
        <button 
          onClick={() => setActiveTab("upcoming")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "upcoming" ? "border-primary-50 text-primary-50" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Upcoming Events
        </button>
        <button 
           onClick={() => setActiveTab("past")}
           className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "past" ? "border-primary-50 text-primary-50" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Past Events
        </button>
      </div>

      {/* Event List */}
      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-5 hover:border-primary-50/30 transition-colors group">
            {/* Date Box */}
            <div className="flex flex-row sm:flex-col items-center justify-center bg-primary-50/5 text-primary-50 rounded-lg p-3 sm:w-20 shrink-0 gap-2 sm:gap-0">
               <span className="text-xs font-bold uppercase tracking-wider">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
               <span className="text-xl sm:text-2xl font-bold">{new Date(event.date).getDate()}</span>
            </div>
            
            {/* Event Info */}
            <div className="flex-1">
               <div className="flex items-start justify-between">
                 <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide mb-2 ${
                        event.type === 'Meeting' ? 'bg-blue-100 text-blue-700' :
                        event.type === 'Workshop' ? 'bg-purple-100 text-purple-700' :
                        event.type === 'Social' ? 'bg-pink-100 text-pink-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                        {event.type}
                    </span>
                    <h3 className="text-lg font-bold text-primary-50 group-hover:text-primary-50 transition-colors">{event.title}</h3>
                 </div>
               </div>
               
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <IoTimeOutline className="text-primary-50" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IoLocationOutline className="text-primary-50" />
                    {event.location}
                  </div>
               </div>
            </div>

            {/* Actions */}
            <div className="flex items-center sm:self-center pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                <button className="text-gray-400 hover:text-gray-600 px-3 py-1">Edit</button>
            </div>
          </div>
        ))}
      </div>

       {/* Schedule Event Modal Mockup */}
       {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-scaleIn">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-primary-50">Schedule New Event</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input type="time" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none" placeholder="e.g. Conference Room B" />
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-primary-50 text-white hover:bg-primary-50/90 rounded-lg font-medium"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeanDepartmentEvents;
