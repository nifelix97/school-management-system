import React, { useEffect, useRef, useState } from "react";
import {
  IoCallOutline,
  IoChatbubbleOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoCloseOutline,
  IoCloudDownloadOutline,
  IoCopyOutline,
  IoDiscOutline,
  IoEllipsisVertical,
  IoHandLeftOutline,
  IoInformationCircleOutline,
  IoKeyOutline,
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoMicOffOutline,
  IoMicOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoRadioButtonOn,
  IoSendOutline,
  IoSettingsOutline,
  IoShieldCheckmarkOutline,
  IoTvOutline,
  IoVideocamOffOutline,
  IoVideocamOutline
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Participant {
  id: number;
  name: string;
  active: boolean;
  color: string;
  hand: boolean;
}

interface ChatMessage {
  id: number;
  user: string;
  text: string;
  time: string;
}

interface JoinRequest {
  id: number;
  name: string;
  color: string;
}

const OnlineMeeting: React.FC = () => {
  const navigate = useNavigate();
  const [meetingState, setMeetingState] = useState<"setup" | "active">("setup");
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [activePanel, setActivePanel] = useState<"none" | "people" | "chat" | "info">("none");
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [layout, setLayout] = useState<"grid" | "focus">("grid");
  const [isRecording, setIsRecording] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [showJoinRequests, setShowJoinRequests] = useState(false);
  const [participantsList, setParticipantsList] = useState<Participant[]>([
    { id: 1, name: "You", active: true, color: "bg-blue-600", hand: isHandRaised },
    { id: 2, name: "Dr. Elena Vance", active: false, color: "bg-emerald-600", hand: false },
    { id: 3, name: "Prof. Isaac Kleiner", active: false, color: "bg-rose-600", hand: false },
    { id: 4, name: "Gordon Freeman", active: false, color: "bg-amber-600", hand: false },
    { id: 5, name: "Alyx Vance", active: false, color: "bg-indigo-600", hand: false }
  ]);
  const [meetingData, setMeetingData] = useState({
    topic: "Institutional Strategy - 2025 Planning",
    duration: "45",
    code: "abc-defg-hij",
    isPrivate: false,
    accessKey: "HSM-" + Math.random().toString(36).substring(2, 8).toUpperCase()
  });
  const [chatMessage, setChatMessage] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    async function getMedia() {
      try {
        currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setStream(currentStream);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        toast.error("Camera or Microphone access denied. Please check permissions.");
      }
    }
    getMedia();
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (stream) {
      stream.getVideoTracks().forEach(track => (track.enabled = !isCamOff));
      stream.getAudioTracks().forEach(track => (track.enabled = !isMuted));
    }
  }, [isCamOff, isMuted, stream]);

  useEffect(() => {
    if (meetingState === "active" && stream && activeVideoRef.current && !isCamOff) {
      activeVideoRef.current.srcObject = stream;
    } else if (meetingState === "setup" && stream && videoRef.current && !isCamOff) {
      videoRef.current.srcObject = stream;
    }
  }, [meetingState, stream, isCamOff]);


  const toggleScreenShare = async () => {
    if (isPresenting) {
      if (screenStream) {
        screenStream.getTracks().forEach(t => t.stop());
      }
      setScreenStream(null);
      setIsPresenting(false);
      toast.info("Stopped presenting");
    } else {
      try {
        const sStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setScreenStream(sStream);
        setIsPresenting(true);
        toast.success("You are presenting your screen");
        
        sStream.getVideoTracks()[0].onended = () => {
           setIsPresenting(false);
           setScreenStream(null);
        };
      } catch (err) {
        console.error(err);
        toast.error("Could not share screen");
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.info("Recording saved to storage");
    } else {
      setIsRecording(true);
      toast.success("Recording started - everyone can see it");
    }
  };

  const downloadAttendance = () => {
    const headers = ["ID", "Name", "Status", "Join Time"];
    const rows = participantsList.map((p: Participant) => [
      p.id,
      p.name,
      p.active ? "Host" : "Participant",
      new Date().toLocaleTimeString()
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map((r: (string | number)[]) => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `attendance_${meetingData.topic.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Attendance sheet downloaded");
  };

  const handleAdmission = (id: number, action: 'allow' | 'reject') => {
    const request = joinRequests.find((r: JoinRequest) => r.id === id);
    if (!request) return;

    if (action === 'allow') {
      setParticipantsList((prev: Participant[]) => [...prev, { ...request, active: false, hand: false }]);
      toast.success(`${request.name} admitted to the meeting`);
    } else {
      toast.info(`${request.name}'s request was rejected`);
    }
    setJoinRequests((prev: JoinRequest[]) => prev.filter((r: JoinRequest) => r.id !== id));
    if (joinRequests.length <= 1) setShowJoinRequests(false);
  };

  // Update effect to use participantsList
  useEffect(() => {
    if (meetingState === 'active') {
       // Simulate a join request after 5 seconds
       const timer = setTimeout(() => {
          setJoinRequests([{ id: Date.now(), name: "Barney Calhoun", color: "bg-purple-600" }]);
          toast.info("Someone wants to join this meeting", {
            onClick: () => setShowJoinRequests(true)
          });
       }, 5000);
       return () => clearTimeout(timer);
    }
  }, [meetingState]);

  useEffect(() => {
    if (isPresenting && screenStream && screenRef.current) {
      screenRef.current.srcObject = screenStream;
    }
  }, [isPresenting, screenStream]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, {
      id: Date.now(),
      user: "You",
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setChatMessage("");
  };

  if (meetingState === "setup") {
    return (
      <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center p-6 md:p-20 gap-12 sm:gap-24">
        {/* Left Side: Video Preview */}
        <div className="flex-1 w-full max-w-2xl relative">
          <div className="aspect-video bg-[#202124] rounded-xl overflow-hidden shadow-lg relative border-4 border-slate-100">
            {!isCamOff ? (
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                playsInline 
                className="w-full h-full object-cover -scale-x-100" // Mirror effect
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                 <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    Y
                 </div>
                 <p className="text-white font-medium">Camera is off</p>
              </div>
            )}

            {/* In-preview controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
               <button 
                 onClick={() => setIsMuted(!isMuted)}
                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 shadow-xl ${isMuted ? 'bg-[#ea4335] border-[#ea4335] text-white' : 'bg-transparent border-white text-white hover:bg-white/10'}`}
               >
                 {isMuted ? <IoMicOffOutline className="w-6 h-6" /> : <IoMicOutline className="w-6 h-6" />}
               </button>
               <button 
                 onClick={() => setIsCamOff(!isCamOff)}
                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 shadow-xl ${isCamOff ? 'bg-[#ea4335] border-[#ea4335] text-white' : 'bg-transparent border-white text-white hover:bg-white/10'}`}
               >
                 {isCamOff ? <IoVideocamOffOutline className="w-6 h-6" /> : <IoVideocamOutline className="w-6 h-6" />}
               </button>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <IoSettingsOutline className="w-4 h-4" />
             </div>
             <p className="text-sm text-slate-500 font-medium tracking-tight">Check your audio and video</p>
          </div>
        </div>

        {/* Right Side: Join Details */}
        <div className="flex-1 max-w-md text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-normal text-[#202124] mb-4 leading-tight">Ready to join?</h1>
            
             <div className="w-full mb-8 space-y-6">
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Meeting Topic</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:ring-4 focus:ring-[#1a73e8]/10 focus:border-[#1a73e8] transition-all font-medium text-[#202124]"
                    value={meetingData.topic}
                    onChange={(e) => setMeetingData({...meetingData, topic: e.target.value})}
                    placeholder="Enter meeting topic..."
                  />
               </div>

               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Privacy Settings</label>
                  <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
                     <button 
                       onClick={() => setMeetingData({...meetingData, isPrivate: false})}
                       className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${!meetingData.isPrivate ? 'bg-white text-[#1a73e8] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                     >
                        <IoLockOpenOutline className="w-4 h-4" /> Public
                     </button>
                     <button 
                       onClick={() => setMeetingData({...meetingData, isPrivate: true})}
                       className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${meetingData.isPrivate ? 'bg-[#ea4335] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                     >
                        <IoLockClosedOutline className="w-4 h-4" /> Private
                     </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 italic">
                     {meetingData.isPrivate ? "Only people with the access key can join." : "Anyone with the link can join directly."}
                  </p>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Join Link</span>
                        <span className="text-sm font-medium text-[#1a73e8]">meet.google.com/{meetingData.code}</span>
                     </div>
                     <button 
                       onClick={() => { navigator.clipboard.writeText(`meet.google.com/${meetingData.code}`); toast.success("Link copied"); }}
                       className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 transition-all shadow-sm"
                       title="Copy Link"
                     >
                        <IoCopyOutline className="w-4 h-4" />
                     </button>
                  </div>

                  {meetingData.isPrivate && (
                    <div className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-2">
                       <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-red-400 uppercase">Access Key</span>
                          <span className="text-sm font-bold text-red-600 tracking-wider flex items-center gap-2">
                             <IoKeyOutline className="w-3 h-3" />
                             {meetingData.accessKey}
                          </span>
                       </div>
                       <button 
                         onClick={() => { navigator.clipboard.writeText(meetingData.accessKey); toast.success("Access key copied"); }}
                         className="p-3 bg-white hover:bg-red-50 border border-red-200 rounded-xl text-red-600 transition-all shadow-sm"
                         title="Copy Key"
                       >
                          <IoCopyOutline className="w-4 h-4" />
                       </button>
                    </div>
                  )}
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
               <button 
                 onClick={() => setMeetingState("active")}
                 className="flex-1 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium py-3 px-8 rounded-full shadow-md transition-all active:scale-95 text-base"
               >
                 Join now
               </button>
               <button 
                 onClick={() => { toggleScreenShare(); setMeetingState("active"); }}
                 className="flex-1 text-[#1a73e8] hover:bg-[#1a73e8]/5 font-medium py-3 px-8 rounded-full border border-slate-200 transition-all text-base"
               >
                 Present
               </button>
            </div>

            <div className="mt-12 space-y-4 w-full">
               <p className="text-xs text-slate-400 font-medium">Other joining options</p>
               <button className="flex items-center gap-3 text-sm text-[#1a73e8] font-medium hover:underline">
                  <IoCallOutline className="w-5 h-5 rotate-90" />
                  Join and use a phone for audio
               </button>
            </div>
            
            <div className="mt-auto pt-10 flex items-center gap-2 text-[10px] text-slate-400">
               <IoShieldCheckmarkOutline className="w-3 h-3" />
               Institution Secure Encryption
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#202124] flex flex-col overflow-hidden select-none">
      {/* Top Content Area */}
      <div className="flex-1 flex relative overflow-hidden p-4 min-h-0">
         <div className={`flex-1 flex flex-col transition-all duration-300 ${activePanel !== 'none' ? 'mr-[360px]' : ''}`}>
           {/* Screen Presentation Slot */}
           {isPresenting && (
             <div className="flex-1 bg-black rounded-xl overflow-hidden mb-3 relative group shadow-2xl border border-white/10">
                <video ref={screenRef} autoPlay playsInline className="w-full h-full object-contain" />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-medium border border-white/10">
                   You are presenting
                </div>
                <button 
                  onClick={toggleScreenShare}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg"
                >
                   Stop presenting
                </button>
             </div>
           )}

           {/* Participant Grid */}
           <div className={`grid gap-3 flex-1 ${layout === 'focus' ? 'grid-cols-1 max-h-[200px]' : (participantsList.length === 1 ? 'grid-cols-1' : participantsList.length <= 4 ? 'grid-cols-2' : 'grid-cols-3')}`}>
            {participantsList.map((p) => (
              <div key={p.id} className="bg-[#3c4043] rounded-xl overflow-hidden relative group shadow-lg border border-white/5 aspect-video w-full">
                 <div className="absolute inset-0 flex items-center justify-center">
                    {p.id === 1 && !isCamOff ? (
                      <video 
                        ref={activeVideoRef}
                        autoPlay 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover -scale-x-100"
                      />
                    ) : (
                      <div className={`w-28 h-28 ${p.color} rounded-full flex items-center justify-center text-4xl font-semibold text-white shadow-2xl`}>
                        {p.name.charAt(0)}
                      </div>
                    )}
                 </div>

                 {/* Bottom Overlay Label */}
                 <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 opacity-100 transition-all">
                    <span className="text-white text-xs font-normal tracking-wide">{p.name}</span>
                    <div className="flex items-center gap-1 ml-1">
                       {p.active && <div className="w-2.5 h-2.5 bg-[#1a73e8] rounded-full animate-pulse shadow-sm shadow-[#1a73e8]/40" />}
                    </div>
                 </div>

                 {/* Hand Raise Indicator */}
                 {p.hand && (
                   <div className="absolute top-4 left-4 bg-[#fbbc04] p-2 rounded-full shadow-lg animate-bounce">
                      <IoHandLeftOutline className="text-black w-4 h-4" />
                   </div>
                 )}

                 {/* Mic indicator if muted (simulated for others) */}
                 {(p.id === 1 && isMuted) && (
                   <div className="absolute top-4 right-4 bg-[#ea4335] p-2 rounded-full shadow-lg">
                      <IoMicOffOutline className="text-white w-4 h-4" />
                   </div>
                 )}
              </div>
            ))}
          </div>
        </div>

         {/* Sidebar Panel (Meet Right-side panel style) */}
         {activePanel !== 'none' && (
           <div className="absolute top-4 right-4 bottom-4 w-[340px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col z-30">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                 <h2 className="text-lg font-medium text-[#202124]">
                    {activePanel === 'chat' ? 'In-call messages' : activePanel === 'people' ? 'People' : 'Meeting details'}
                 </h2>
                 <button 
                   onClick={() => setActivePanel('none')}
                   className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                 >
                    <IoCloseOutline className="w-6 h-6 text-slate-500" />
                 </button>
              </div>

              {activePanel === 'info' ? (
                <div className="p-6 space-y-8">
                   <div>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Joining info</h3>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                         <p className="text-sm font-medium text-slate-700">Meeting link</p>
                         <div className="flex items-center justify-between gap-2 p-3 bg-white border border-slate-200 rounded-lg">
                            <span className="text-xs text-[#1a73e8] truncate">meet.google.com/{meetingData.code}</span>
                            <button 
                              onClick={() => { navigator.clipboard.writeText(`meet.google.com/${meetingData.code}`); toast.success("Link copied"); }}
                              className="text-xs font-bold text-[#1a73e8] whitespace-nowrap"
                            >
                               Copy
                            </button>
                         </div>
                      </div>
                   </div>

                    {meetingData.isPrivate && (
                      <div className="p-4 bg-red-50 rounded-xl border border-red-100 space-y-3">
                         <p className="text-sm font-medium text-red-700">Access key</p>
                         <div className="flex items-center justify-between gap-2 p-3 bg-white border border-red-200 rounded-lg">
                            <span className="text-xs text-red-600 font-bold tracking-wider">{meetingData.accessKey}</span>
                            <button 
                              onClick={() => { navigator.clipboard.writeText(meetingData.accessKey); toast.success("Key copied"); }}
                              className="text-xs font-bold text-red-600 whitespace-nowrap"
                            >
                               Copy
                            </button>
                         </div>
                      </div>
                    )}

                   <div className="flex items-center gap-3 p-4 border border-blue-100 bg-blue-50/50 rounded-xl">
                      <IoShieldCheckmarkOutline className="text-blue-600 w-5 h-5 flex-shrink-0" />
                      <p className="text-xs text-blue-700 font-medium">This meeting is encrypted for institutional security and privacy.</p>
                   </div>
                </div>
              ) : activePanel === 'chat' ? (
                <>
                  <div className="p-6 bg-slate-50/50 flex-1 overflow-y-auto space-y-6">
                     <div className="bg-[#e8f0fe] p-4 rounded-xl text-[13px] text-[#1967d2] leading-relaxed">
                        Messages can only be seen by people in the call and are deleted when the call ends.
                     </div>
                     {chatHistory.map((m: ChatMessage) => (
                       <div key={m.id}>
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-xs font-semibold text-[#202124]">{m.user}</span>
                             <span className="text-[10px] text-slate-400">{m.time}</span>
                          </div>
                          <p className="text-sm text-slate-600 break-words">{m.text}</p>
                       </div>
                     ))}
                  </div>
                  <div className="p-6 bg-white border-t border-slate-100">
                     <form onSubmit={handleSendChat} className="flex items-center gap-2">
                        <input 
                          type="text"
                          placeholder="Send a message to everyone"
                          className="flex-1 bg-slate-100 border-none rounded-full py-3 px-6 text-sm focus:ring-2 focus:ring-[#1a73e8] transition-all"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                        />
                        <button className="p-3 text-[#1a73e8] hover:bg-[#1a73e8]/10 rounded-full transition-all">
                           <IoSendOutline className="w-5 h-5" />
                        </button>
                     </form>
                  </div>
                </>
              ) : (
                <div className="p-6 overflow-y-auto space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">In call</div>
                      <button 
                        onClick={downloadAttendance}
                        className="flex items-center gap-2 text-xs font-bold text-[#1a73e8] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
                      >
                         <IoCloudDownloadOutline className="w-4 h-4" />
                         Attendance
                      </button>
                   </div>

                   {joinRequests.length > 0 && (
                     <button 
                       onClick={() => setShowJoinRequests(true)}
                       className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 transition-all group"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                              <IoPersonAddOutline className="w-4 h-4" />
                           </div>
                           <span className="text-sm font-bold text-blue-700">Admission Requests</span>
                        </div>
                        <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold group-hover:scale-110 transition-transform">
                           {joinRequests.length}
                        </span>
                     </button>
                   )}

                   {participantsList.map(p => (
                     <div key={p.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 ${p.color} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                              {p.name.charAt(0)}
                           </div>
                           <span className="text-sm font-medium text-[#202124]">{p.name}</span>
                        </div>
                        <IoEllipsisVertical className="text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer" />
                     </div>
                   ))}
                </div>
              )}
           </div>
         )}
      </div>

      {/* Bottom Control Bar (Meet Style) */}
      <div className="bg-[#202124] px-6 py-5 flex items-center justify-between relative z-40">
        <div className="text-white text-base font-medium min-w-[200px] hidden sm:flex items-center gap-4">
           <div className="flex items-center">
              <span className="opacity-60">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="mx-3 opacity-20">|</span>
              <span>{meetingData.topic}</span>
           </div>
           {isRecording && (
             <div className="flex items-center gap-2 bg-[#ea4335] text-white px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">
                <IoRadioButtonOn className="w-3 h-3" />
                REC
             </div>
           )}
        </div>

        {/* Centered Controls */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
           <button 
             onClick={() => setIsMuted(!isMuted)}
             className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-[#ea4335] text-white' : 'bg-[#3c4043] text-white hover:bg-[#4a4e51]'}`}
           >
             {isMuted ? <IoMicOffOutline className="w-5 h-5" /> : <IoMicOutline className="w-5 h-5" />}
           </button>
           <button 
             onClick={() => setIsCamOff(!isCamOff)}
             className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${isCamOff ? 'bg-[#ea4335] text-white' : 'bg-[#3c4043] text-white hover:bg-[#4a4e51]'}`}
           >
             {isCamOff ? <IoVideocamOffOutline className="w-5 h-5" /> : <IoVideocamOutline className="w-5 h-5" />}
           </button>
           
           <div className="w-px h-6 bg-white/10 mx-1 hidden xs:block" />

            <button 
              onClick={() => {
                setIsHandRaised(!isHandRaised);
                setParticipantsList((prev: Participant[]) => prev.map((p: Participant) => p.id === 1 ? { ...p, hand: !isHandRaised } : p));
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all hidden xs:flex ${isHandRaised ? 'bg-[#fbbc04] text-black' : 'bg-[#3c4043] text-white hover:bg-[#4a4e51]'}`}
            >
              <IoHandLeftOutline className="w-5 h-5" />
            </button>
           <button 
             onClick={toggleScreenShare}
             className={`w-11 h-11 rounded-full flex items-center justify-center transition-all hidden xs:flex ${isPresenting ? 'bg-[#81c995] text-black' : 'bg-[#3c4043] text-white hover:bg-[#4a4e51]'}`}
           >
             <IoTvOutline className="w-5 h-5" />
           </button>
           <div className="relative">
             <button 
               onClick={() => setShowMoreActions(!showMoreActions)}
               className={`w-11 h-11 bg-[#3c4043] text-white hover:bg-[#4a4e51] rounded-full flex items-center justify-center transition-all ${showMoreActions ? 'bg-white/20' : ''}`}
             >
               <IoEllipsisVertical className="w-5 h-5" />
             </button>
             
             {showMoreActions && (
               <div className="absolute bottom-14 left-0 w-56 bg-white rounded-xl shadow-2xl overflow-hidden py-2 z-50 border border-slate-100">
                  <button 
                    onClick={() => setShowMoreActions(false)}
                    className="w-full text-left px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
                  >
                     <IoSettingsOutline className="w-4 h-4" /> Settings
                  </button>
                  <button 
                    onClick={() => setShowMoreActions(false)}
                    className="w-full text-left px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
                  >
                     <IoInformationCircleOutline className="w-4 h-4" /> Help & Feedback
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  <button 
                    onClick={() => { setLayout(layout === 'grid' ? 'focus' : 'grid'); setShowMoreActions(false); }}
                    className="w-full text-left px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
                  >
                     Change Layout
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  <button 
                    onClick={() => { toggleRecording(); setShowMoreActions(false); }}
                    className={`w-full text-left px-5 py-3 text-sm flex items-center gap-3 ${isRecording ? 'text-red-600 font-bold hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                     {isRecording ? <><IoDiscOutline className="w-4 h-4" /> Stop Recording</> : <><IoDiscOutline className="w-4 h-4" /> Record Meeting</>}
                  </button>
                  <button 
                    onClick={() => { downloadAttendance(); setShowMoreActions(false); }}
                    className="w-full text-left px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
                  >
                     <IoCloudDownloadOutline className="w-4 h-4" /> Download Attendance
                  </button>
               </div>
             )}
           </div>

           <div className="w-px h-6 bg-white/10 mx-1" />

           <button 
             onClick={() => navigate('/resources')}
             className="w-16 h-11 bg-[#ea4335] text-white hover:bg-[#d93025] rounded-3xl flex items-center justify-center transition-all shadow-lg"
           >
             <IoCallOutline className="w-6 h-6 rotate-[135deg]" />
           </button>
        </div>

        {/* Right Info Controls */}
        <div className="flex items-center gap-2 min-w-[200px] justify-end hidden sm:flex">
           <button 
             onClick={() => setActivePanel(activePanel === 'info' ? 'none' : 'info')}
             className={`p-3 rounded-full transition-colors ${activePanel === 'info' ? 'text-[#8ab4f8] bg-[#8ab4f8]/10' : 'text-white hover:bg-white/5'}`}
           >
              <IoInformationCircleOutline className="w-5 h-5" />
           </button>
           <button 
             onClick={() => setActivePanel(activePanel === 'people' ? 'none' : 'people')}
             className={`p-3 rounded-full transition-colors relative ${activePanel === 'people' ? 'text-[#8ab4f8] bg-[#8ab4f8]/10' : 'text-white hover:bg-white/5'}`}
           >
              <IoPeopleOutline className="w-5 h-5" />
              {joinRequests.length > 0 && (
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#202124]" />
              )}
           </button>
           <button 
             onClick={() => setActivePanel(activePanel === 'chat' ? 'none' : 'chat')}
             className={`p-3 rounded-full transition-colors ${activePanel === 'chat' ? 'text-[#8ab4f8] bg-[#8ab4f8]/10' : 'text-white hover:bg-white/5'}`}
           >
              <IoChatbubbleOutline className="w-5 h-5" />
           </button>
           <button 
             onClick={() => setLayout(layout === 'grid' ? 'focus' : 'grid')}
             className={`p-3 rounded-full transition-colors ${layout === 'focus' ? 'text-[#8ab4f8] bg-[#8ab4f8]/10' : 'text-white hover:bg-white/5'}`}
           >
              <div className="grid grid-cols-2 gap-0.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-current" />
                 <div className="w-1.5 h-1.5 rounded-sm bg-current" />
                 <div className="w-1.5 h-1.5 rounded-sm bg-current" />
                 <div className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>
           </button>
        </div>
      </div>

      {/* Join Requests Modal */}
      {showJoinRequests && joinRequests.length > 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                       <IoPersonAddOutline className="w-5 h-5" />
                    </div>
                    <div>
                       <h2 className="text-lg font-bold text-slate-800">Join Requests</h2>
                       <p className="text-xs text-slate-500 font-medium">{joinRequests.length} person waiting</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setShowJoinRequests(false)}
                   className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                 >
                    <IoCloseOutline className="w-6 h-6 text-slate-400" />
                 </button>
              </div>

              <div className="p-6 space-y-4">
                 {joinRequests.map((req: JoinRequest) => (
                   <div key={req.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 ${req.color} rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm`}>
                            {req.name.charAt(0)}
                         </div>
                         <div>
                            <p className="font-bold text-slate-800">{req.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mt-1 font-bold">Wants to join</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <button 
                           onClick={() => handleAdmission(req.id, 'reject')}
                           className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-all"
                           title="Reject"
                         >
                            <IoCloseCircleOutline className="w-7 h-7" />
                         </button>
                         <button 
                           onClick={() => handleAdmission(req.id, 'allow')}
                           className="p-3 text-emerald-500 hover:bg-emerald-50 rounded-full transition-all"
                           title="Admit"
                         >
                            <IoCheckmarkCircleOutline className="w-7 h-7" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
                 <p className="text-[10px] text-slate-400 font-medium">As the host, you have full control over who joins this session.</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OnlineMeeting;
