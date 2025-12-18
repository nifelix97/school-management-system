import React from "react";
import { IoCallOutline, IoChatbubblesOutline, IoHelpCircleOutline, IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ParentHelp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Help & Support</h1>
        <p className="text-gray-500">How can we assist you today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
          <IoCallOutline className="text-4xl text-primary-50 mx-auto mb-4" />
          <h2 className="font-bold text-gray-800">Call Us</h2>
          <p className="text-sm text-gray-500 mt-2">Available Mon-Fri, 8am-4pm</p>
          <p className="text-primary-50 font-bold mt-1">+1 800-SCH-HLP</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
          <IoMailOutline className="text-4xl text-primary-100 mx-auto mb-4" />
          <h2 className="font-bold text-gray-800">Email Support</h2>
          <p className="text-sm text-gray-500 mt-2">Personalized assistance</p>
          <p className="text-primary-100 font-bold mt-1">support@school.com</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
          <IoChatbubblesOutline className="text-4xl text-primary-300 mx-auto mb-4" />
          <h2 className="font-bold text-gray-800">Live Chat</h2>
          <p className="text-sm text-gray-500 mt-2">Quick response during hours</p>
          <button 
            onClick={() => navigate("/parent/messages")}
            className="mt-4 px-4 py-2 bg-primary-300 text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all active:scale-95"
          >
            Start Chat
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <IoHelpCircleOutline className="text-2xl" /> Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            { q: "How do I pay tuition fees online?", a: "Go to the 'Fees & Payments' section in your sidebar and follow the instructions to pay via Credit Card or Bank Transfer." },
            { q: "Where can I find my child's report card?", a: "All academic records are available under 'Academic Progress' or by clicking 'Full Report' on your child's profile." },
            { q: "Can I book a meeting with a teacher?", a: "Yes, use the 'Book Appointment' button on the 'My Children' page or contact support for manual scheduling." },
          ].map((faq, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="font-bold text-gray-800 text-sm">Q: {faq.q}</p>
              <p className="text-gray-600 text-sm mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentHelp;
