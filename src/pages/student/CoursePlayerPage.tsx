import React, { useState } from "react";
import {
    IoArrowBackOutline,
    IoCheckmarkCircle,
    IoChevronDownOutline,
    IoChevronForwardOutline,
    IoClipboardOutline,
    IoLockClosedOutline,
    IoPlayCircleOutline,
    IoReaderOutline,
    IoSparklesOutline,
    IoTimeOutline
} from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CoursePlayerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<string[]>(["0-0", "0-1"]); // Module-Lesson indices
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const courseData = {
    id: id,
    title: id === "1" ? "Introduction to Web Development" : id === "2" ? "Data Science Fundamentals" : "Principles of Graphic Design",
    instructor: "Prof. Sarah Miller",
    totalLessons: 12,
    modules: [
      {
        title: "Module 1: Foundations",
        lessons: [
          { title: "Course Introduction", duration: "05:20", type: "Video", completed: true },
          { title: "Understanding the Web", duration: "12:45", type: "Video", completed: true },
          { title: "Setting up your Environment", duration: "10:00", type: "Reading", completed: false }
        ]
      },
      {
        title: "Module 2: Core Concepts",
        lessons: [
          { title: "HTML Structure", duration: "25:00", type: "Video", completed: false },
          { title: "CSS Styling Basics", duration: "32:15", type: "Video", completed: false },
          { title: "Responsive Design", duration: "18:30", type: "Reading", completed: false }
        ]
      },
      {
        title: "Assessments",
        lessons: [
          { title: "Mid-term Knowledge Check", duration: "15:00", type: "Quiz", completed: false }
        ]
      }
    ]
  };

  // Calculate progress based on completed lessons
  const totalLessons = courseData.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  const handleLessonComplete = () => {
    const lessonKey = `${activeModule}-${activeLesson}`;
    if (!completedLessons.includes(lessonKey)) {
      const newCompleted = [...completedLessons, lessonKey];
      setCompletedLessons(newCompleted);
      
      if (newCompleted.length === totalLessons) {
        toast.success("Congratulations! You've completed the course!", {
          icon: <IoSparklesOutline className="text-primary-100 w-6 h-6" />,
          position: "top-center",
          autoClose: 5000
        });
      } else {
        toast.success("Lesson marked as complete!");
      }
    } else {
      toast.info("This lesson is already completed.");
    }
  };

  const submitQuiz = () => {
    if (selectedQuizOption === null) {
      toast.warning("Please select an answer first!");
      return;
    }
    
    const quizKey = `${courseData.modules.length - 1}-0`; // Assuming quiz is last lesson of last module
    if (!completedLessons.includes(quizKey)) {
        setCompletedLessons(prev => [...prev, quizKey]);
    }

    toast.success("Quiz submitted successfully!");
    setShowQuiz(false);
    setSelectedQuizOption(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dynamic Header */}
      <header className="bg-white border-b border-slate-100 flex items-center justify-between px-6 h-20 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/resources')}
            className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary-50 hover:bg-primary-50/10 transition-all border border-slate-100"
          >
            <IoArrowBackOutline className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              {courseData.title}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
               {courseData.instructor} • {courseData.totalLessons} Lessons
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden sm:flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
              <span className="text-sm font-bold text-primary-50">{progress}%</span>
            </div>
            <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${progress === 100 ? 'bg-primary-300' : 'bg-primary-50'}`} 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
          
          <button className="bg-primary-50 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-primary-100 transition-all shadow-lg shadow-primary-50/20 active:scale-95">
             My Certificates
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100-5rem)]">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10">
          <div className="max-w-5xl mx-auto">
            {progress === 100 ? (
              <div className="bg-white rounded-[3rem] border border-primary-300/20 p-12 sm:p-20 text-center shadow-xl shadow-primary-300/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <IoSparklesOutline className="w-40 h-40 text-primary-300" />
                 </div>
                 <div className="w-24 h-24 bg-primary-300/10 rounded-[2rem] flex items-center justify-center text-primary-300 mx-auto mb-8 shadow-inner">
                    <IoCheckmarkCircle className="w-12 h-12" />
                 </div>
                 <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Course Completed!</h2>
                 <p className="text-slate-500 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                   Outstanding work! You have finished all lessons and passed the assessments. 
                   Your certification is now available for download.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-10 py-5 bg-primary-300 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary-300/20 active:scale-95">
                       Download Certificate
                    </button>
                    <button 
                      onClick={() => navigate('/resources')}
                      className="px-10 py-5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                    >
                       Explore More Courses
                    </button>
                 </div>
              </div>
            ) : showQuiz ? (
              <div className="bg-white rounded-[3rem] border border-slate-200 p-12 sm:p-16 shadow-sm overflow-hidden relative">
                 <div className="flex items-center justify-between mb-12">
                    <div>
                       <h3 className="text-2xl font-bold text-slate-900 mb-1">Knowledge Check</h3>
                       <p className="text-slate-400 text-sm font-medium">Topic: Web Foundations & Core Concepts</p>
                    </div>
                    <div className="w-16 h-16 bg-primary-100/10 text-primary-100 rounded-2xl flex items-center justify-center font-bold">
                       08:00
                    </div>
                 </div>

                 <div className="space-y-10">
                    <div className="space-y-6">
                       <p className="text-lg font-bold text-slate-800">1. What does HTML stand for?</p>
                       <div className="grid gap-4">
                          {["HyperText Markup Language", "HighText Machine Language", "Hyperlink Textual Markup", "Home Tool Markup Language"].map((opt, i) => (
                             <button 
                               key={i} 
                               onClick={() => setSelectedQuizOption(i)}
                               className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group text-left
                                 ${selectedQuizOption === i 
                                   ? 'border-primary-50 bg-primary-50/5' 
                                   : 'border-slate-100 hover:border-primary-50/50 hover:bg-slate-50'
                                 }`}
                             >
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all
                                  ${selectedQuizOption === i 
                                    ? 'bg-primary-50 text-white' 
                                    : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50/10 group-hover:text-primary-50'
                                  }`}
                                >
                                  {String.fromCharCode(65+i)}
                                </span>
                                <span className={selectedQuizOption === i ? 'text-primary-50 font-bold' : 'text-slate-600 font-medium'}>
                                  {opt}
                                </span>
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="mt-16 flex items-center justify-between pt-10 border-t border-slate-100">
                    <button 
                      className="text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-600 transition-colors"
                      onClick={() => setShowQuiz(false)}
                    >
                       Skip for now
                    </button>
                    <button 
                      onClick={submitQuiz}
                      className="px-10 py-5 bg-primary-50 text-white font-bold rounded-2xl hover:bg-primary-100 transition-all shadow-lg active:scale-95"
                    >
                       Submit Assessment
                    </button>
                 </div>
              </div>
            ) : (
              <div className="space-y-10">
                {/* Visual Content Window */}
                <div className="aspect-video bg-black rounded-[2.5rem] relative overflow-hidden group shadow-2xl ring-1 ring-slate-800">
                   {!isPlaying ? (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-10">
                        <button 
                          onClick={() => setIsPlaying(true)}
                          className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 hover:bg-primary-50 hover:border-primary-50/50 shadow-2xl"
                        >
                           <IoPlayCircleOutline className="w-12 h-12" />
                        </button>
                     </div>
                   ) : (
                     <div className="absolute inset-0 z-0">
                        <video 
                          src="https://assets.mixkit.co/videos/preview/mixkit-coding-on-a-laptop-screen-in-the-dark-32753-large.mp4" 
                          autoPlay 
                          controls
                          className="w-full h-full object-cover"
                          onEnded={() => { setIsPlaying(false); handleLessonComplete(); }}
                        />
                     </div>
                   )}
                   
                   <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="px-3 py-1 bg-primary-50/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-primary-50 ring-1 ring-primary-50/30 uppercase">LIVE LESSON</div>
                            <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">Module {activeModule + 1} • Lesson {activeLesson + 1}</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Lesson Description */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
                   <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-900">{courseData.modules[activeModule].lessons[activeLesson].title}</h2>
                      <div className="flex items-center gap-3">
                         <IoTimeOutline className="text-slate-400" />
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{courseData.modules[activeModule].lessons[activeLesson].duration}</span>
                      </div>
                   </div>
                   <p className="text-slate-500 leading-relaxed text-lg mb-10">
                      In this lesson, we will cover the core principles of the subject matter, focusing on practical implementation 
                      and industry standards. You will learn the required syntax, structural best practices, and 
                      common pitfalls to avoid. By the end of this session, you'll be able to create a functional prototype.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row items-center gap-4">
                      <button 
                        onClick={handleLessonComplete}
                        className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl"
                      >
                         <IoCheckmarkCircle className="w-5 h-5 text-primary-300" />
                         Complete Lesson
                      </button>
                      <button className="w-full sm:w-auto px-10 py-5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">
                         Download Resources (PDF)
                      </button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-96 bg-white border-l border-slate-100 flex flex-col h-full sticky top-20 overflow-hidden">
          <div className="p-8 border-b border-slate-50">
             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <IoReaderOutline className="text-primary-50" />
                Course Content
             </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar py-4">
             {courseData.modules.map((mod, mIdx) => (
                <div key={mIdx} className="mb-4 last:mb-0">
                   <div className="px-8 py-3 bg-slate-50/50 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mod.title}</span>
                      <IoChevronDownOutline className="w-4 h-4 text-slate-300" />
                   </div>
                   <div className="mt-2 space-y-1">
                      {mod.lessons.map((lesson, lIdx) => (
                         <div 
                           key={lIdx}
                           onClick={() => {
                             if (lesson.type === 'Quiz') {
                               setShowQuiz(true);
                             } else {
                               setShowQuiz(false);
                               setActiveModule(mIdx);
                               setActiveLesson(lIdx);
                             }
                           }}
                           className={`px-8 py-4 flex items-center justify-between cursor-pointer group transition-all relative ${
                             (activeModule === mIdx && activeLesson === lIdx && !showQuiz) ? 'bg-primary-50/5' : 'hover:bg-slate-50'
                           }`}
                         >
                            {(activeModule === mIdx && activeLesson === lIdx && !showQuiz) && (
                               <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-50" />
                            )}
                            
                            <div className="flex items-center gap-4 pr-10">
                               <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                  completedLessons.includes(`${mIdx}-${lIdx}`) ? 'bg-primary-300/10 text-primary-300' : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-white'
                               }`}>
                                  {completedLessons.includes(`${mIdx}-${lIdx}`) ? <IoCheckmarkCircle className="w-4 h-4" /> : lesson.type === 'Quiz' ? <IoClipboardOutline className="w-4 h-4" /> : <IoPlayCircleOutline className="w-4 h-4" />}
                               </div>
                               <div>
                                  <p className={`text-sm font-bold leading-tight ${completedLessons.includes(`${mIdx}-${lIdx}`) ? 'line-through text-slate-300' : (activeModule === mIdx && activeLesson === lIdx && !showQuiz) ? 'text-primary-50' : 'text-slate-700'}`}>
                                     {lesson.title}
                                  </p>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">{lesson.type} • {lesson.duration}</span>
                               </div>
                            </div>
                            
                            {!completedLessons.includes(`${mIdx}-${lIdx}`) && (mIdx > 0 && !courseData.modules[mIdx-1].lessons.every((_, i) => completedLessons.includes(`${mIdx-1}-${i}`))) ? (
                               <IoLockClosedOutline className="w-4 h-4 text-slate-200" />
                            ) : (
                               <IoChevronForwardOutline className={`w-4 h-4 transition-all ${completedLessons.includes(`${mIdx}-${lIdx}`) ? 'text-primary-300' : 'text-slate-200 group-hover:text-primary-50'}`} />
                            )}
                         </div>
                      ))}
                   </div>
                </div>
             ))}
          </div>
          
          <div className="p-8 bg-primary-50 border-t border-slate-800">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary-100">
                   <IoSparklesOutline className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-white text-xs font-bold leading-tight">AI Study Assistant</p>
                   <p className="text-primary-100 text-[9px] uppercase tracking-widest mt-0.5">Recommended Help</p>
                </div>
             </div>
             <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Ask a Question
             </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CoursePlayerPage;
