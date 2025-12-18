import React from "react";
import { IoCallOutline, IoLocationOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5";

const ParentProfile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-primary-50"></div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="bg-white p-1 rounded-full border-4 border-white shadow-lg">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-4xl font-bold">
                P
              </div>
            </div>
            <button className="bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">Mr. Parent User</h1>
            <p className="text-gray-500">Legal Guardian / Parent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex items-center gap-3 text-gray-600">
              <IoMailOutline className="text-xl text-primary-50" />
              <span>parent@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <IoCallOutline className="text-xl text-primary-50" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <IoLocationOutline className="text-xl text-primary-50" />
              <span>123 Street, City, Country</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <IoPersonOutline className="text-xl text-primary-50" />
              <span>Parent ID: PRNT-001</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Secondary Contact Name</p>
              <p className="font-medium text-gray-800">Mrs. Secondary Parent</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Relationship</p>
              <p className="font-medium text-gray-800">Spouse</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-800">+1 098 765 432</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Linked Students</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">JD</div>
              <div>
                <p className="font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Grade 10 - ID: STD-101</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold">JD</div>
              <div>
                <p className="font-medium text-gray-800">Jane Doe</p>
                <p className="text-xs text-gray-500">Grade 8 - ID: STD-202</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
