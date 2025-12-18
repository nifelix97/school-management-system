import React, { useState } from "react";
import {
    IoArrowForwardOutline,
    IoBookmark,
    IoBookmarkOutline,
    IoCloudDownloadOutline,
    IoDocumentTextOutline,
    IoFileTrayFullOutline,
    IoFunnelOutline,
    IoPlayCircleOutline,
    IoSearchOutline
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedEnrollCourse, setSelectedEnrollCourse] = useState<any>(null);

  const toggleBookmark = (id: number) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(b => b !== id));
      toast.info("Removed from bookmarks");
    } else {
      setBookmarked([...bookmarked, id]);
      toast.success("Added to bookmarks!");
    }
  };

  const handleAction = (res: any) => {
    if (res.type === 'Course') {
      setSelectedEnrollCourse(res);
      setShowEnrollModal(true);
    } else if (res.type === 'Video') {
      navigate('/courses');
    } else {
      toast.info(`Download feature coming soon for ${res.title}`);
    }
  };

  const confirmEnrollment = () => {
    if (selectedEnrollCourse) {
      setShowEnrollModal(false);
      navigate(`/course-player/${selectedEnrollCourse.id}`);
      toast.success(`Enrolled in ${selectedEnrollCourse.title}!`);
    }
  };

  const categories = ["All", "Free Courses", "Documents", "Videos", "Guides"];

  const resources = [
    {
      id: 1,
      title: "Introduction to Web Development",
      category: "Free Courses",
      type: "Course",
      lessons: "12 Lessons",
      instructor: "Prof. Sarah Miller",
      date: "Ongoing",
      icon: <IoPlayCircleOutline className="w-6 h-6" />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      isFree: true
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      category: "Free Courses",
      type: "Course",
      lessons: "15 Lessons",
      instructor: "Dr. James Wilson",
      date: "Ongoing",
      icon: <IoPlayCircleOutline className="w-6 h-6" />,
      color: "text-violet-600",
      bg: "bg-violet-50",
      isFree: true
    },
    {
      id: 3,
      title: "2025 Academic Calendar",
      category: "Documents",
      type: "PDF",
      size: "2.4 MB",
      date: "Dec 15, 2024",
      icon: <IoDocumentTextOutline className="w-6 h-6" />,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: 4,
      title: "Portal Usage Tutorial",
      category: "Videos",
      type: "Video",
      duration: "12:45",
      date: "Oct 10, 2024",
      icon: <IoPlayCircleOutline className="w-6 h-6" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      id: 5,
      title: "Faculty Onboarding Handbook",
      category: "Guides",
      type: "PDF",
      size: "5.1 MB",
      date: "Nov 20, 2024",
      icon: <IoDocumentTextOutline className="w-6 h-6" />,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      id: 6,
      title: "Principles of Graphic Design",
      category: "Free Courses",
      type: "Course",
      lessons: "8 Lessons",
      instructor: "Elena Rodriguez",
      date: "Ongoing",
      icon: <IoPlayCircleOutline className="w-6 h-6" />,
      color: "text-rose-600",
      bg: "bg-rose-50",
      isFree: true
    }
  ];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Hero Section */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-20 px-6 sm:px-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-50/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-primary-300/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary-50 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
               <div className="w-6 h-px bg-primary-50" />
               Knowledge Base
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              Institutional <span className="text-primary-50">Resources</span> & Assets
            </h1>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-2xl">
              Access the latest documents, learning materials, and institutional templates. 
              Search our curated library to find exactly what you need.
            </p>

            <div className="relative group max-w-xl">
              <IoSearchOutline className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-primary-50 transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources by title or keywords..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-16 pr-6 focus:ring-4 focus:ring-primary-50/10 focus:border-primary-50 focus:bg-white transition-all text-slate-800 placeholder-slate-400 text-lg shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 -mt-10 pb-20 relative z-20">
        {/* Category Filter Bar */}
        <nav className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap
                  ${activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex ml-auto items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-slate-500">
             <IoFunnelOutline className="w-4 h-4" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Filter Active</span>
          </div>
        </nav>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res) => (
              <article key={res.id} className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => toggleBookmark(res.id)}
                     className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                       bookmarked.includes(res.id) 
                         ? 'bg-primary-50 text-white' 
                         : 'bg-slate-50 text-slate-400 hover:text-primary-50 hover:bg-primary-50/10'
                     }`}
                   >
                      {bookmarked.includes(res.id) ? <IoBookmark className="w-5 h-5" /> : <IoBookmarkOutline className="w-5 h-5" />}
                   </button>
                </div>

                <div className={`w-14 h-14 rounded-2xl ${res.bg} ${res.color} flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110`}>
                   {res.icon}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-primary-50 uppercase tracking-widest block">
                         {res.category}
                      </span>
                      {res.isFree && (
                        <span className="px-2 py-0.5 bg-primary-300/10 text-primary-300 text-[9px] font-bold rounded-full">FREE</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-50 transition-colors">
                      {res.title}
                    </h3>
                  </div>

                  {res.instructor && (
                    <p className="text-xs font-bold text-slate-500">By {res.instructor}</p>
                  )}

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                       {res.type}
                    </div>
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                       {res.size || res.duration || res.lessons}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       {res.category === 'Free Courses' ? 'Open Access' : `Updated ${res.date}`}
                    </span>
                    <button 
                      onClick={() => handleAction(res)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-primary-50 hover:text-white rounded-xl text-xs font-bold text-slate-700 transition-all group/btn"
                    >
                       {res.type === 'Video' ? 'Watch' : res.type === 'Course' ? 'Enroll Now' : 'Download'}
                       {res.type === 'Course' ? (
                         <IoArrowForwardOutline className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                       ) : (
                         <IoCloudDownloadOutline className={`w-4 h-4 transition-transform ${res.type !== 'Video' && 'group-hover/btn:-translate-y-0.5'}`} />
                       )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
               <IoFileTrayFullOutline className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No resources found</h3>
            <p className="text-slate-400 max-w-xs mx-auto">
              We couldn't find any resources matching your search. Try resetting your filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Support Section */}
        <section className="mt-20 p-1 bg-primary-50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200">
          <div className="p-12 md:p-16 text-center text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50/10 rounded-full blur-3xl -mt-20 -mr-20" />
            
            <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">
              Our support team is available 24/7 to help you locate specific documents or learning materials.
            </p>
            
            <button 
              onClick={() => navigate('/contact-us')}
              className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold hover:bg-slate-100 transition-all group scale-100 active:scale-95 shadow-xl"
            >
              Contact Resource Support
              <IoArrowForwardOutline className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      {/* Enrollment Confirmation Modal */}
      {showEnrollModal && selectedEnrollCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowEnrollModal(false)}
          />
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden border border-slate-100 transition-all scale-100">
            <div className="p-10 sm:p-12 text-center">
              <div className={`w-20 h-20 mx-auto rounded-3xl ${selectedEnrollCourse.bg} ${selectedEnrollCourse.color} flex items-center justify-center mb-8 shadow-inner`}>
                <IoPlayCircleOutline className="w-10 h-10" />
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                Confirm Enrollment
              </h3>
              <p className="text-slate-500 mb-10 leading-relaxed text-lg">
                Are you ready to begin your journey in <span className="text-slate-900 font-bold">"{selectedEnrollCourse.title}"</span>? 
                This will add the course to your dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowEnrollModal(false)}
                  className="flex-1 px-8 py-4 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
                >
                  Maybe Later
                </button>
                <button 
                  onClick={confirmEnrollment}
                  className="flex-1 px-8 py-4 bg-primary-50 text-white font-bold rounded-2xl hover:bg-primary-100 transition-all shadow-lg shadow-primary-50/20 active:scale-95"
                >
                  Confirm & Start
                </button>
              </div>
            </div>
            
            <div className="bg-slate-50 px-10 py-6 text-center border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Secure Institutional Enrollment
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
