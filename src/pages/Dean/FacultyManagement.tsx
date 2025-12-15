import React, { useState } from "react";
import { IoAddCircleOutline, IoCallOutline, IoMailOutline, IoSearchOutline } from "react-icons/io5";

const FacultyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Mock data
  const facultyMembers = [
    { id: 1, name: "Dr. Sarah Wilson", role: "Professor", department: "Computer Science", email: "sarah.wilson@univ.edu", phone: "+1 555-0101", status: "Active" },
    { id: 2, name: "Prof. James Chen", role: "Associate Professor", department: "Physics", email: "james.chen@univ.edu", phone: "+1 555-0102", status: "On Leave" },
    { id: 3, name: "Dr. Emily Davis", role: "Assistant Professor", department: "Mathematics", email: "emily.davis@univ.edu", phone: "+1 555-0103", status: "Active" },
    { id: 4, name: "Mr. Robert Brown", role: "Lecturer", department: "Engineering", email: "robert.brown@univ.edu", phone: "+1 555-0104", status: "Active" },
    { id: 5, name: "Dr. Lisa Taylor", role: "Senior Lecturer", department: "Biology", email: "lisa.taylor@univ.edu", phone: "+1 555-0105", status: "Sabbatical" },
  ];

  const filteredFaculty = facultyMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary-50">Faculty Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage departmental faculty and staff</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-primary-50/90 transition-colors w-full sm:w-auto"
        >
          <IoAddCircleOutline className="w-5 h-5" />
          Add Faculty
        </button>
      </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-3 sm:p-4 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="relative flex-1 w-full sm:max-w-md">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search faculty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-50/20"
            />
          </div>
        </div>
        
        {/* Responsive List/Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                <th className="px-3 sm:px-6 py-3 sm:py-4">Name</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">Role</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">Department</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">Contact</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Status</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFaculty.map((faculty) => (
                <tr key={faculty.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold shrink-0 text-sm sm:text-base">
                        {faculty.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-primary-50 text-sm sm:text-base">{faculty.name}</p>
                        <p className="text-xs text-gray-500 sm:hidden">{faculty.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell text-sm text-gray-600">
                    {faculty.role}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell text-sm text-gray-600">
                    {faculty.department}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                    <div className="flex flex-col gap-1 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <IoMailOutline className="w-3.5 h-3.5" />
                        {faculty.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <IoCallOutline className="w-3.5 h-3.5" />
                        {faculty.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      faculty.status === "Active" ? "bg-green-100 text-green-700" : 
                      faculty.status === "On Leave" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {faculty.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                    <button className="text-primary-50 hover:text-primary-600 text-xs sm:text-sm font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFaculty.length === 0 && (
            <div className="p-6 sm:p-8 text-center text-gray-500 text-sm sm:text-base">
              No faculty members found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Add Faculty Modal Mockup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-scaleIn">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-base sm:text-lg font-bold text-primary-50">Add New Faculty</h2>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none text-sm sm:text-base" placeholder="e.g. Dr. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none text-sm sm:text-base">
                   <option>Computer Science</option>
                   <option>Physics</option>
                   <option>Mathematics</option>
                   <option>Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                 <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-50/20 outline-none text-sm sm:text-base">
                   <option>Professor</option>
                   <option>Associate Professor</option>
                   <option>Assistant Professor</option>
                   <option>Lecturer</option>
                </select>
              </div>
            </div>
            <div className="p-4 sm:p-6 bg-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm sm:text-base w-full sm:w-auto"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-primary-50 text-white hover:bg-primary-50/90 rounded-lg font-medium text-sm sm:text-base w-full sm:w-auto"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;
