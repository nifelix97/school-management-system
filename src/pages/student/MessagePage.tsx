import React, { useState } from "react";
import {
  Send,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Paperclip,
  Smile,
  Image,
  File,
  Edit3,
  Trash2,
  Mail,
  MailOpen,
  Star,
  Archive,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  role: "teacher" | "student";
  avatar: string;
  subject?: string;
  class?: string;
}

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  read: boolean;
  type?: "text" | "image" | "file";
  fileName?: string;
  fileUrl?: string;
}

interface Conversation {
  id: number;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

export default function MessagePage({ userRole = "student" }: { userRole?: "teacher" | "student" }) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: 2,
      receiverId: 1,
      content: "Hi John, I wanted to discuss your recent physics assignment. Could we schedule a meeting?",
      timestamp: "2024-01-15T10:30:00Z",
      read: true,
    },
    {
      id: 2,
      senderId: 1,
      receiverId: 2,
      content: "Hello Dr. Johnson! Yes, I'd be happy to discuss it. When would be a good time for you?",
      timestamp: "2024-01-15T11:00:00Z",
      read: true,
    },
    {
      id: 3,
      senderId: 2,
      receiverId: 1,
      content: "How about tomorrow at 2 PM in my office?",
      timestamp: "2024-01-15T11:15:00Z",
      read: false,
    },
  ]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const conversationsPerPage = 3;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [editingMessage, setEditingMessage] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [conversationFilter, setConversationFilter] = useState("all");

  const currentUser: User = {
    id: 1,
    name: userRole === "student" ? "John Doe" : "Dr. Smith",
    role: userRole,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    subject: userRole === "teacher" ? "Mathematics" : undefined,
    class: userRole === "student" ? "Grade 10A" : undefined,
  };

  const users: User[] = [
    {
      id: 2,
      name: "Dr. Johnson",
      role: "teacher",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      subject: "Physics",
    },
    {
      id: 3,
      name: "Prof. Wilson",
      role: "teacher",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      subject: "Chemistry",
    },
    {
      id: 4,
      name: "Alice Smith",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      class: "Grade 10A",
    },
    {
      id: 5,
      name: "Bob Johnson",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      class: "Grade 10B",
    },
  ];

  // Initialize conversations
  React.useEffect(() => {
    const initialConversations: Conversation[] = [
      {
        id: 1,
        participants: [currentUser, users.find(u => u.id === 2)!],
        lastMessage: messages[2],
        unreadCount: 1,
      },
      {
        id: 2,
        participants: [currentUser, users.find(u => u.id === 3)!],
        lastMessage: {
          id: 4,
          senderId: 3,
          receiverId: 1,
          content: "Don't forget about the chemistry lab report due next week.",
          timestamp: "2024-01-14T16:45:00Z",
          read: true,
        },
        unreadCount: 0,
      },
      {
        id: 3,
        participants: [currentUser, users.find(u => u.id === 4)!],
        lastMessage: {
          id: 5,
          senderId: 4,
          receiverId: 1,
          content: "Can you help me with the math homework?",
          timestamp: "2024-01-13T14:20:00Z",
          read: true,
        },
        unreadCount: 0,
      },
      {
        id: 4,
        participants: [currentUser, users.find(u => u.id === 5)!],
        lastMessage: {
          id: 6,
          senderId: 5,
          receiverId: 1,
          content: "Thanks for the study notes!",
          timestamp: "2024-01-12T09:30:00Z",
          read: true,
        },
        unreadCount: 0,
      },
      {
        id: 5,
        participants: [currentUser, { id: 6, name: "Dr. Brown", role: "teacher" as const, avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face", subject: "Biology" }],
        lastMessage: {
          id: 7,
          senderId: 6,
          receiverId: 1,
          content: "Your biology project looks great!",
          timestamp: "2024-01-11T15:45:00Z",
          read: true,
        },
        unreadCount: 0,
      },
      {
        id: 6,
        participants: [currentUser, { id: 7, name: "Prof. Davis", role: "teacher" as const, avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face", subject: "History" }],
        lastMessage: {
          id: 8,
          senderId: 7,
          receiverId: 1,
          content: "Please review the assignment guidelines.",
          timestamp: "2024-01-10T11:20:00Z",
          read: true,
        },
        unreadCount: 0,
      },
    ];
    setConversations(initialConversations);
  }, []);

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p.id !== currentUser.id)!;
  };

  // Filter conversations based on selected filter
  const getFilteredConversations = () => {
    switch (conversationFilter) {
      case "unread":
        return conversations.filter(conv => conv.unreadCount > 0);
      case "read":
        return conversations.filter(conv => conv.unreadCount === 0);
      case "teachers":
        return conversations.filter(conv => {
          const otherParticipant = getOtherParticipant(conv);
          return otherParticipant.role === "teacher";
        });
      case "students":
        return conversations.filter(conv => {
          const otherParticipant = getOtherParticipant(conv);
          return otherParticipant.role === "student";
        });
      default:
        return conversations;
    }
  };

  const filteredConversations = getFilteredConversations();
  
  // Pagination logic
  const totalPages = Math.ceil(filteredConversations.length / conversationsPerPage);
  const startIndex = (currentPage - 1) * conversationsPerPage;
  const endIndex = startIndex + conversationsPerPage;
  const currentConversations = filteredConversations.slice(startIndex, endIndex);

  // Get counts for sidebar
  const unreadCount = conversations.filter(conv => conv.unreadCount > 0).length;
  const readCount = conversations.filter(conv => conv.unreadCount === 0).length;
  const teacherCount = conversations.filter(conv => {
    const otherParticipant = getOtherParticipant(conv);
    return otherParticipant.role === "teacher";
  }).length;
  const studentCount = conversations.filter(conv => {
    const otherParticipant = getOtherParticipant(conv);
    return otherParticipant.role === "student";
  }).length;

  const getConversationMessages = () => {
    if (!selectedConversation) return [];
    const participantIds = selectedConversation.participants.map(p => p.id);
    return messages.filter(m => 
      participantIds.includes(m.senderId) && participantIds.includes(m.receiverId)
    );
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const otherParticipant = getOtherParticipant(selectedConversation);
    const message: Message = {
      id: Date.now(),
      senderId: currentUser.id,
      receiverId: otherParticipant.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
      type: "text",
    };
    
    setMessages(prev => [...prev, message]);
    
    // Update conversation's last message
    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation.id) {
        return { ...conv, lastMessage: message };
      }
      return conv;
    }));
    
    setNewMessage("");
    setShowEmojiPicker(false);
    
    // Auto-scroll to bottom
    setTimeout(() => {
      const container = document.getElementById('messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  };

  const handleFileUpload = (type: "image" | "file") => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image' ? 'image/*' : '*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && selectedConversation) {
        const otherParticipant = getOtherParticipant(selectedConversation);
        const message: Message = {
          id: Date.now(),
          senderId: currentUser.id,
          receiverId: otherParticipant.id,
          content: type === 'image' ? '📷 Image' : `📎 ${file.name}`,
          timestamp: new Date().toISOString(),
          read: false,
          type,
          fileName: file.name,
          fileUrl: URL.createObjectURL(file),
        };
        setMessages(prev => [...prev, message]);
        setConversations(prev => prev.map(conv => {
          if (conv.id === selectedConversation.id) {
            return { ...conv, lastMessage: message };
          }
          return conv;
        }));
      }
    };
    input.click();
    setShowFileMenu(false);
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleEditMessage = (messageId: number) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setEditingMessage(messageId);
      setEditText(message.content);
    }
  };

  const saveEditMessage = () => {
    if (!editText.trim()) return;
    setMessages(prev => prev.map(msg => 
      msg.id === editingMessage ? { ...msg, content: editText } : msg
    ));
    setEditingMessage(null);
    setEditText("");
  };

  const deleteMessage = (messageId: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🎉', '😢', '😡', '🙏', '👏'];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredUsers = users.filter(user => 
    user.role !== currentUser.role &&
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showNewChat) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-2 xxs:px-3 xs:px-4 py-3 xs:py-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm">
            <div className="p-3 xs:p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 xs:gap-3">
                <button
                  onClick={() => setShowNewChat(false)}
                  className="text-primary-50 hover:text-gray-700"
                >
                  <ChevronLeft size={18} className="xs:hidden" />
                  <ChevronLeft size={20} className="hidden xs:block" />
                </button>
                <h2 className="text-base xs:text-lg font-semibold text-primary-50">
                  New Message
                </h2>
              </div>
            </div>
            
            <div className="p-3 xs:p-4">
              <div className="relative mb-3 xs:mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-50" size={16} />
                <input
                  type="text"
                  placeholder={`Search ${userRole === "student" ? "teachers" : "students"}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2 text-sm xs:text-base border border-primary-50 rounded-lg "
                />
              </div>
              
              <div className="space-y-2">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-8 text-primary-50">
                    <p>No {userRole === "student" ? "teachers" : "students"} found</p>
                  </div>
                ) : (
                  filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      // Check if conversation already exists
                      const existingConv = conversations.find(conv => 
                        conv.participants.some(p => p.id === user.id)
                      );
                      
                      if (existingConv) {
                        setSelectedConversation(existingConv);
                      } else {
                        const newConversation: Conversation = {
                          id: Date.now(),
                          participants: [currentUser, user],
                          lastMessage: {
                            id: 0,
                            senderId: 0,
                            receiverId: 0,
                            content: "Start a new conversation...",
                            timestamp: new Date().toISOString(),
                            read: true,
                          },
                          unreadCount: 0,
                        };
                        setConversations(prev => [...prev, newConversation]);
                        setSelectedConversation(newConversation);
                        setCurrentPage(1);
                      }
                      setShowNewChat(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 xs:w-10 h-8 xs:h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-primary-50 text-sm xs:text-base">{user.name}</h3>
                      <p className="text-xs xs:text-sm text-gray-500">
                        {user.role === "teacher" ? user.subject : user.class}
                      </p>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedConversation) {
    const otherParticipant = getOtherParticipant(selectedConversation);
    const conversationMessages = getConversationMessages();

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-2 xxs:px-3 xs:px-4 py-3 xs:py-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm h-[500px] xs:h-[600px] flex flex-col">
            <div className="p-3 xs:p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 xs:gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ChevronLeft size={18} className="xs:hidden" />
                    <ChevronLeft size={20} className="hidden xs:block" />
                  </button>
                  <img
                    src={otherParticipant.avatar}
                    alt={otherParticipant.name}
                    className="w-8 xs:w-10 h-8 xs:h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-primary-50 text-sm xs:text-base">
                      {otherParticipant.name}
                    </h2>
                    <p className="text-xs xs:text-sm text-primary-50">
                      {otherParticipant.role === "teacher" 
                        ? otherParticipant.subject 
                        : otherParticipant.class}
                    </p>
                  </div>
                </div>
                <button className="text-primary-50 hover:text-gray-700">
                  <MoreVertical size={18} className="xs:hidden" />
                  <MoreVertical size={20} className="hidden xs:block" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 xs:p-4 space-y-2 xs:space-y-4" id="messages-container">
              {conversationMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-primary-50">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                conversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex group ${
                      message.senderId === currentUser.id ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-end gap-2">
                      {message.senderId === currentUser.id && (
                        <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                          <button
                            onClick={() => handleEditMessage(message.id)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="p-1 text-gray-400 hover:text-primary-200"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                      <div
                        className={`max-w-[250px] xs:max-w-xs lg:max-w-md px-3 xs:px-4 py-2 rounded-lg ${
                          message.senderId === currentUser.id
                            ? "bg-primary-50 text-white"
                            : "bg-gray-100 text-primary-50"
                        }`}
                      >
                        {editingMessage === message.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full px-2 py-1 text-sm bg-white text-primary-50 border rounded"
                              onKeyPress={(e) => e.key === "Enter" && saveEditMessage()}
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={saveEditMessage}
                                className="px-2 py-1 text-xs bg-primary-300 text-white rounded"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingMessage(null)}
                                className="px-2 py-1 text-xs bg-primary-50 text-white rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {message.type === "image" && message.fileUrl ? (
                              <div>
                                <img
                                  src={message.fileUrl}
                                  alt="Shared image"
                                  className="max-w-full h-auto rounded mb-2"
                                />
                                <p className="text-sm">{message.content}</p>
                              </div>
                            ) : message.type === "file" && message.fileUrl ? (
                              <div className="flex items-center gap-2">
                                <File size={16} />
                                <a
                                  href={message.fileUrl}
                                  download={message.fileName}
                                  className="text-sm underline"
                                >
                                  {message.content}
                                </a>
                              </div>
                            ) : (
                              <p className="text-sm">{message.content}</p>
                            )}
                            <p
                              className={`text-xs mt-1 ${
                                message.senderId === currentUser.id
                                  ? "text-blue-100"
                                  : "text-primary-50/40"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-2 xs:p-4 border-t border-gray-200">
              {showEmojiPicker && (
                <div className="mb-2 xs:mb-3 p-2 xs:p-3 bg-gray-50 rounded-lg">
                  <div className="flex flex-wrap gap-1 xs:gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => addEmoji(emoji)}
                        className="text-lg xs:text-xl hover:bg-gray-200 p-1 rounded"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {showFileMenu && (
                <div className="mb-2 xs:mb-3 p-2 xs:p-3 bg-gray-50 rounded-lg">
                  <div className="flex flex-col xxs:flex-row gap-2">
                    <button
                      onClick={() => handleFileUpload("image")}
                      className="flex items-center justify-center xxs:justify-start gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm xs:text-base"
                    >
                      <Image size={14} className="xs:hidden" />
                      <Image size={16} className="hidden xs:block" />
                      Image
                    </button>
                    <button
                      onClick={() => handleFileUpload("file")}
                      className="flex items-center justify-center xxs:justify-start gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm xs:text-base"
                    >
                      <File size={14} className="xs:hidden" />
                      <File size={16} className="hidden xs:block" />
                      File
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-1 xs:gap-2">
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowFileMenu(!showFileMenu);
                      setShowEmojiPicker(false);
                    }}
                    className="text-gray-500 hover:text-gray-700 p-1 xs:p-0"
                  >
                    <Paperclip size={18} className="xs:hidden" />
                    <Paperclip size={20} className="hidden xs:block" />
                  </button>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="w-full px-3 xs:px-4 py-2 text-sm xs:text-base border border-primary-50 rounded-lg "
                  />
                </div>
                <button
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    setShowFileMenu(false);
                  }}
                  className="text-gray-500 hover:text-gray-700 p-1 xs:p-0"
                >
                  <Smile size={18} className="xs:hidden" />
                  <Smile size={20} className="hidden xs:block" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-1.5 xs:p-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} className="xs:hidden" />
                  <Send size={18} className="hidden xs:block" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-2 xxs:px-3 xs:px-4 py-3 xs:py-6">
        <div className="flex flex-col xxs:flex-row items-start xxs:items-center justify-between mb-4 xs:mb-6 gap-3 xxs:gap-0">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50">Messages</h1>
          <button
            onClick={() => setShowNewChat(true)}
            className="flex items-center gap-2 px-3 xs:px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90 text-sm xs:text-base w-full xxs:w-auto justify-center xxs:justify-start"
          >
            <Plus size={16} className="xs:hidden" />
            <Plus size={18} className="hidden xs:block" />
            <span className="xxs:inline">New Message</span>
          </button>
        </div>

        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="hidden sm:block w-48 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-semibold text-primary-50 mb-3">Filters</h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setConversationFilter("all");
                  setCurrentPage(1);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                  conversationFilter === "all"
                    ? "bg-primary-50 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Mail size={16} />
                  All
                </span>
                <span className="text-xs">{conversations.length}</span>
              </button>
              
              <button
                onClick={() => {
                  setConversationFilter("unread");
                  setCurrentPage(1);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                  conversationFilter === "unread"
                    ? "bg-primary-50 text-white"
                    : "text-primary-50 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Mail size={16} />
                  Unread
                </span>
                <span className="text-xs">{unreadCount}</span>
              </button>
              
              <button
                onClick={() => {
                  setConversationFilter("read");
                  setCurrentPage(1);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                  conversationFilter === "read"
                    ? "bg-primary-50 text-white"
                    : "text-primary-50 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <MailOpen size={16} />
                  Read
                </span>
                <span className="text-xs">{readCount}</span>
              </button>
              
              <hr className="my-2 text-primary-50" />
              
              <button
                onClick={() => {
                  setConversationFilter("teachers");
                  setCurrentPage(1);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                  conversationFilter === "teachers"
                    ? "bg-primary-50 text-white"
                    : "text-primary-50 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Star size={16} />
                  Teachers
                </span>
                <span className="text-xs">{teacherCount}</span>
              </button>
              
              <button
                onClick={() => {
                  setConversationFilter("students");
                  setCurrentPage(1);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                  conversationFilter === "students"
                    ? "bg-primary-50 text-white"
                    : "text-primary-50 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Archive size={16} />
                  Students
                </span>
                <span className="text-xs">{studentCount}</span>
              </button>
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          <div className="sm:hidden w-full mb-4">
            <select
              value={conversationFilter}
              onChange={(e) => {
                setConversationFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-primary-50 rounded-lg text-sm focus:ring-2 focus:ring-primary-50 focus:border-transparent"
            >
              <option value="all">All ({conversations.length})</option>
              <option value="unread">Unread ({unreadCount})</option>
              <option value="read">Read ({readCount})</option>
              <option value="teachers">Teachers ({teacherCount})</option>
              <option value="students">Students ({studentCount})</option>
            </select>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg xs:rounded-xl shadow-sm">
          <div className="p-3 xs:p-4 border-b border-primary-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-50" size={16} />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2 text-sm xs:text-base border border-primary-50 rounded-lg "
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {currentConversations.length === 0 ? (
              <div className="p-8 text-center text-primary-50">
                <p className="text-sm xs:text-base">No conversations yet</p>
                <p className="text-xs xs:text-sm mt-1">Start a new message to begin chatting</p>
              </div>
            ) : (
              currentConversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation);
                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className="p-3 sm:p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={otherParticipant.avatar}
                          alt={otherParticipant.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                        />
                        {conversation.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-200 text-white text-xs rounded-full flex items-center justify-center font-medium">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-primary-50 text-base sm:text-lg truncate">
                            {otherParticipant.name}
                          </h3>
                          <span className="text-xs text-primary-50 flex-shrink-0 ml-2">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-primary-50/30 mb-1">
                          {otherParticipant.role === "teacher" 
                            ? otherParticipant.subject 
                            : otherParticipant.class}
                        </p>
                        <p className="text-sm text-primary-50 line-clamp-2 leading-relaxed">
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="p-3 xs:p-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 xs:gap-2 px-2 xs:px-3 py-2 text-xs xs:text-sm text-primary-50 hover:text-primary-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} className="xs:hidden" />
                <ChevronLeft size={16} className="hidden xs:block" />
                <span className="hidden xxs:inline">Previous</span>
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-xs xs:text-sm text-primary-50">
                  {currentPage}/{totalPages}
                </span>
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 xs:gap-2 px-2 xs:px-3 py-2 text-xs xs:text-sm text-primary-50 hover:text-primary-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden xxs:inline">Next</span>
                <ChevronRight size={14} className="xs:hidden" />
                <ChevronRight size={16} className="hidden xs:block" />
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}