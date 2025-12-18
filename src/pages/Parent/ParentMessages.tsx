import React, { useState } from "react";
import {
    IoAttachOutline,
    IoChatbubbleEllipsesOutline,
    IoCheckmarkDoneOutline,
    IoChevronBackOutline,
    IoEllipsisVertical,
    IoHappyOutline,
    IoSearchOutline,
    IoSendOutline
} from "react-icons/io5";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  online: boolean;
  messages: Message[];
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    name: "Dr. Sarah Smith",
    role: "Math Teacher",
    lastMessage: "The homework assignment for John is due tomorrow.",
    time: "10:30 AM",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", sender: "Dr. Sarah Smith", content: "Hello! I wanted to check in on John's progress.", timestamp: "9:00 AM", isMe: false },
      { id: "m2", sender: "Me", content: "Hi Dr. Smith, he is working on the algebra set now.", timestamp: "9:15 AM", isMe: true },
      { id: "m3", sender: "Dr. Sarah Smith", content: "Great! The homework assignment for John is due tomorrow.", timestamp: "10:30 AM", isMe: false },
    ]
  },
  {
    id: "2",
    name: "Admin Office",
    role: "School Administration",
    lastMessage: "Please find the attached invoice for next term.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "m4", sender: "Admin Office", content: "Please find the attached invoice for next term.", timestamp: "Yesterday", isMe: false },
    ]
  },
  {
    id: "3",
    name: "Mr. James Wilson",
    role: "Sports Coach",
    lastMessage: "Practice is cancelled today due to rain.",
    time: "2 days ago",
    unread: 0,
    online: true,
    messages: [
      { id: "m5", sender: "Mr. James Wilson", content: "Practice is cancelled today due to rain.", timestamp: "2 days ago", isMe: false },
    ]
  }
];

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ParentMessages: React.FC = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState<string | null>(initialConversations[0].id);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  const activeChat = conversations.find(c => c.id === selectedId);

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Me",
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setConversations(prev => prev.map(c => {
      if (c.id === selectedId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: inputText,
          time: "Just now"
        };
      }
      return c;
    }));
    setInputText("");
  };

  const handleAttach = () => toast.info("Attachment feature coming soon!", { icon: <IoAttachOutline className="text-primary-50" /> });
  const handleEmoji = () => toast.info("Emoji picker coming soon!", { icon: <IoHappyOutline className="text-amber-400" /> });
  const handleOptions = () => toast.info("Settings & Options updated.", { icon: <IoEllipsisVertical className="text-gray-400" /> });

  return (
    <div className="w-full flex flex-col md:flex-row bg-white rounded-xl md:rounded-3xl shadow-sm border border-gray-100 animate-fade-in relative md:h-[calc(100vh-140px)] md:overflow-hidden min-h-[500px]">
      
      {/* Sidebar - Conversation List */}
      <div className={`${selectedId && isMobileView ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-gray-50 bg-gray-50/10 md:h-full min-w-0`}>
        <div className="p-4 border-b border-gray-50">
          <div className="flex items-center justify-between mb-4 gap-2">
            <h1 className="text-xl font-bold text-gray-800">Messages</h1>
            <button 
              onClick={() => navigate("/parent/dashboard")}
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary-50 bg-primary-50/5 px-2 py-1.5 rounded-lg hover:bg-primary-50/10 transition-all border border-primary-50/10 shrink-0"
            >
              <IoChevronBackOutline /> Back
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-gray-100 rounded-xl py-2 px-10 text-sm focus:outline-none focus:border-primary-50 transition-all font-medium"
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar max-h-[70vh] md:max-h-full">
          {filteredConversations.length > 0 ? filteredConversations.map(c => (
            <button 
              key={c.id}
              onClick={() => {
                setSelectedId(c.id);
                if (window.innerWidth < 768) setIsMobileView(true);
              }}
              className={`w-full p-4 flex gap-3 md:gap-4 transition-all hover:bg-white text-left ${selectedId === c.id ? 'bg-white shadow-sm z-10' : ''}`}
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary-50/10 flex items-center justify-center text-primary-50 text-xl md:text-2xl font-bold">
                  {c.name.charAt(0)}
                </div>
                {c.online && (
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5 gap-1">
                  <p className="font-bold text-gray-800 truncate text-sm md:text-base">{c.name}</p>
                  <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase shrink-0">{c.time}</span>
                </div>
                <p className="text-[11px] md:text-xs text-gray-500 truncate mb-1">{c.role}</p>
                <div className="flex justify-between items-center gap-1">
                  <p className={`text-xs truncate ${c.unread > 0 ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                    {c.lastMessage}
                  </p>
                  {c.unread > 0 && (
                    <span className="bg-primary-50 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center shrink-0">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          )) : (
            <div className="p-10 text-center space-y-2">
              <p className="text-sm font-bold text-gray-400">No conversations</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs text-primary-50 font-black uppercase tracking-widest hover:underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${!selectedId || !isMobileView ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white md:h-full min-w-0`}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-3 md:p-6 border-b border-gray-50 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-4 min-w-0">
                <button 
                  onClick={() => setIsMobileView(false)}
                  className="md:hidden text-2xl text-gray-400 hover:text-primary-50 shrink-0"
                  title="Back to conversations"
                >
                  <IoChevronBackOutline />
                </button>
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary-100/10 flex items-center justify-center text-primary-100 text-lg md:text-2xl font-bold shrink-0">
                  {activeChat.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 truncate text-sm md:text-base">{activeChat.name}</p>
                  <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest truncate">{activeChat.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 md:gap-2 shrink-0">
                <button 
                  onClick={() => navigate("/parent/dashboard")}
                  className="hidden md:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary-50 bg-gray-50 hover:bg-primary-50/5 px-2 md:px-3 py-2 rounded-xl transition-all border border-transparent hover:border-primary-50/10"
                >
                  <IoChevronBackOutline /> <span className="hidden lg:inline">Dashboard</span>
                </button>
                <button 
                  onClick={handleOptions}
                  className="p-2 text-gray-400 hover:text-primary-50 transition-colors"
                >
                  <IoEllipsisVertical className="text-xl" />
                </button>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50/30 no-scrollbar min-h-[300px] md:min-h-0">
              {activeChat.messages.map((m) => (
                <div key={m.id} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] space-y-1`}>
                    <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium ${
                      m.isMe 
                      ? 'bg-primary-50 text-white shadow-lg shadow-primary-50/20 rounded-tr-none' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-sm'
                    }`}>
                      {m.content}
                    </div>
                    <div className={`flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-gray-400 uppercase ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                      {m.timestamp}
                      {m.isMe && <IoCheckmarkDoneOutline className="text-primary-50 text-xs md:text-sm" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-6 border-t border-gray-50">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-4">
                <div className="hidden sm:flex gap-1 md:gap-2">
                   <button 
                     type="button" 
                     onClick={handleAttach}
                     className="p-2 text-gray-400 hover:text-primary-50 transition-colors"
                   >
                     <IoAttachOutline className="text-xl md:text-2xl" />
                   </button>
                   <button 
                     type="button" 
                     onClick={handleEmoji}
                     className="p-2 text-gray-400 hover:text-primary-50 transition-colors"
                   >
                     <IoHappyOutline className="text-xl md:text-2xl" />
                   </button>
                </div>
                <div className="flex-1 relative min-w-0">
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type..." 
                    className="w-full bg-gray-50 border-none rounded-xl md:rounded-2xl py-2 md:py-3 px-4 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-50/20"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 md:p-3 bg-primary-50 text-white rounded-xl md:rounded-2xl shadow-lg shadow-primary-50/30 hover:opacity-90 transition-all disabled:opacity-50 disabled:shadow-none shrink-0"
                >
                  <IoSendOutline className="text-lg md:text-xl" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-24 h-24 bg-primary-50/5 rounded-full flex items-center justify-center">
              <IoChatbubbleEllipsesOutline className="text-5xl text-primary-50/20" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Your Communication Hub</h2>
            <p className="text-sm text-gray-500 max-w-sm">Select a teacher or administrator from the left to start a conversation about your child's progress.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentMessages;
