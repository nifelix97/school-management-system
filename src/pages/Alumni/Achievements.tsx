
import React, { useState } from "react";
import {
    IoAddCircleOutline,
    IoCalendarOutline,
    IoChevronDownOutline,
    IoFilterOutline,
    IoHeart,
    IoHeartOutline,
    IoNewspaperOutline,
    IoPersonOutline,
    IoRibbonOutline,
    IoSearchOutline,
    IoShareSocialOutline,
    IoTrophyOutline
} from "react-icons/io5";

// Types
interface Achievement {
    id: string;
    title: string;
    description: string;
    category: "Award" | "Career Milestone" | "Research" | "Community Service" | "Entrepreneurship";
    alumniName: string;
    graduationYear: number;
    date: string;
    imageUrl: string;
    likes: number;
    isLiked: boolean;
}

const Achievements: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState<string>("All");
    const [filterYear, setFilterYear] = useState<string>("All");
    const [showFilters, setShowFilters] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [storyForm, setStoryForm] = useState({
        title: "",
        category: "Award",
        description: "",
        date: "",
        imageUrl: "",
        link: ""
    });

    // Mock Data
    const [achievements, setAchievements] = useState<Achievement[]>([
        {
            id: "1",
            title: "Innovator of the Year 2024",
            description: "Recognized for groundbreaking work in sustainable energy solutions, developing a low-cost solar storage system for rural communities.",
            category: "Award",
            alumniName: "Sarah Johnson",
            graduationYear: 2015,
            date: "2024-11-15",
            imageUrl: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 124,
            isLiked: false
        },
        {
            id: "2",
            title: "Tech Startup Acquisition",
            description: "Successfully led the acquisition of 'CloudScale', a cloud infrastructure startup, by a major tech giant for $50M.",
            category: "Entrepreneurship",
            alumniName: "Michael Chen",
            graduationYear: 2018,
            date: "2024-10-02",
            imageUrl: "https://images.unsplash.com/photo-1559136555-930d72f1d375?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 89,
            isLiked: true
        },
        {
            id: "3",
            title: "Published in Nature Journal",
            description: "Lead author of a research paper on 'CRISPR Applications in Agriculture' published in the prestigious Nature journal.",
            category: "Research",
            alumniName: "Dr. Emily Davis",
            graduationYear: 2014,
            date: "2024-09-12",
            imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 156,
            isLiked: false
        },
        {
            id: "4",
            title: "Regional Community Hero",
            description: "Awarded for establishing a non-profit organization that provides educational resources to underprivileged children.",
            category: "Community Service",
            alumniName: "James Wilson",
            graduationYear: 2016,
            date: "2024-08-20",
            imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba4eb71628?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 210,
            isLiked: true
        },
        {
            id: "5",
            title: "Chief Marketing Officer Appointment",
            description: "Appointed as the youngest CMO at 'Global Retail Corp', overseeing marketing strategies across 30 countries.",
            category: "Career Milestone",
            alumniName: "Sophia Martinez",
            graduationYear: 2017,
            date: "2024-07-05",
            imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 145,
            isLiked: false
        },
        {
            id: "6",
            title: "Best Alumni Author 2024",
            description: "Won the 'Best Tech Book' award for 'The Future of AI', a comprehensive guide to artificial intelligence trends.",
            category: "Award",
            alumniName: "David Lee",
            graduationYear: 2012,
            date: "2024-06-18",
            imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 98,
            isLiked: false
        }
    ]);

    // Statistics
    const totalAchievements = achievements.length;
    const totalLikes = achievements.reduce((sum, item) => sum + item.likes, 0);
    const awardCount = achievements.filter(a => a.category === "Award").length;

    const stats = [
        {
            title: "Total Stories",
            value: totalAchievements.toString(),
            subtitle: "shared this year",
            icon: <IoNewspaperOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "Awards Won",
            value: awardCount.toString(),
            subtitle: "recognized excellence",
            icon: <IoTrophyOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
        {
            title: "Community Growth",
            value: totalLikes.toString(),
            subtitle: "total interactions",
            icon: <IoHeartOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-pink-500 via-pink-600 to-pink-700",
        },
        {
            title: "Distinguished Alumni",
            value: "15",
            subtitle: "hall of fame",
            icon: <IoRibbonOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-purple-500 via-purple-600 to-purple-700",
        },
    ];

    // Filter Logic
    const filteredAchievements = achievements.filter(item => {
        const matchesSearch = 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.alumniName.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = filterCategory === "All" || item.category === filterCategory;
        const matchesYear = filterYear === "All" || item.graduationYear.toString() === filterYear;

        return matchesSearch && matchesCategory && matchesYear;
        return matchesSearch && matchesCategory && matchesYear;
    });

    const handleSubmitStory = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create new achievement object
        const newAchievement: Achievement = {
            id: (achievements.length + 1).toString(),
            title: storyForm.title,
            description: storyForm.description,
            category: storyForm.category as any,
            alumniName: "You (Alumni)", // Mock current user
            graduationYear: 2024, // Mock current user
            date: storyForm.date || new Date().toISOString().split('T')[0],
            imageUrl: storyForm.imageUrl || "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            likes: 0,
            isLiked: false
        };

        setAchievements([newAchievement, ...achievements]);
        setShowSubmitModal(false);
        setStoryForm({
            title: "",
            category: "Award",
            description: "",
            date: "",
            imageUrl: "",
            link: ""
        });
        alert("🎉 Story Submitted Successfully! Your achievement has been posted.");
    };

    // Helper functions
    const toggleLike = (id: string) => {
        setAchievements(achievements.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    isLiked: !item.isLiked,
                    likes: item.isLiked ? item.likes - 1 : item.likes + 1
                };
            }
            return item;
        }));
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "Award": return "bg-amber-50 text-amber-700 border-amber-200";
            case "Career Milestone": return "bg-blue-50 text-blue-700 border-blue-200";
            case "Research": return "bg-purple-50 text-purple-700 border-purple-200";
            case "Community Service": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Entrepreneurship": return "bg-indigo-50 text-indigo-700 border-indigo-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
                        Alumni Achievements
                    </h1>
                    <p className="text-sm sm:text-base text-primary-50/70">
                        Celebrating the success and milestones of our global alumni community.
                    </p>
                </div>
                <button 
                    onClick={() => setShowSubmitModal(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                    <IoAddCircleOutline className="w-5 h-5" />
                    <span className="font-medium">Submit Story</span>
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                    >
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md w-fit group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium mb-1">{stat.title}</div>
                                <div className="text-xs text-gray-400">{stat.subtitle}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by title or alumni name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base transition-all"
                        />
                    </div>

                    {/* Filter Toggle Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl transition-colors font-medium text-sm sm:text-base ${showFilters ? 'bg-gray-100 border-gray-300 text-gray-900' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                        <IoFilterOutline className="w-5 h-5" />
                        <span className="hidden xs:inline">Filters</span>
                        <IoChevronDownOutline className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Filter Options */}
                <div className={`grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-40 pt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                        >
                            <option value="All">All Categories</option>
                            <option value="Award">Awards</option>
                            <option value="Career Milestone">Career Milestones</option>
                            <option value="Research">Research & Publications</option>
                            <option value="Community Service">Community Service</option>
                            <option value="Entrepreneurship">Entrepreneurship</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                        <select
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                        >
                            <option value="All">All Years</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2012">2012</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Achievements Grid */}
            {filteredAchievements.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-12 text-center">
                    <IoTrophyOutline className="w-16 h-16 text-gray-200 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No achievements found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        We couldn't find any stories matching your search. Try adjusting your filters or search terms.
                    </p>
                    <button 
                        onClick={() => {setSearchTerm(""); setFilterCategory("All"); setFilterYear("All");}}
                        className="mt-6 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAchievements.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col h-full group"
                        >
                            {/* Card Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold shadow-sm backdrop-blur-sm ${getCategoryColor(item.category)}`}>
                                        {item.category}
                                    </span>
                                    <span className="text-white text-xs font-medium flex items-center gap-1 opacity-90">
                                        <IoCalendarOutline /> {item.date}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary-100 transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                                
                                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                                        <IoPersonOutline className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">{item.alumniName}</span>
                                        <span className="text-xs text-gray-400 block">'Class of {item.graduationYear}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                                    {item.description}
                                </p>

                                {/* Card Footer */}
                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <button 
                                        onClick={() => toggleLike(item.id)}
                                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${item.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                                    >
                                        {item.isLiked ? <IoHeart className="w-5 h-5" /> : <IoHeartOutline className="w-5 h-5" />}
                                        {item.likes}
                                    </button>
                                    
                                    <div className="flex items-center gap-2">
                                        <button className="text-gray-400 hover:text-primary-100 transition-colors">
                                            <IoShareSocialOutline className="w-5 h-5" />
                                        </button>
                                        <button className="text-primary-100 hover:text-primary-50 text-sm font-semibold transition-colors flex items-center gap-1">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Submit Story Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSubmitModal(false)}>
                    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Your Story</h2>
                        <p className="text-gray-600 mb-6">
                            Share your achievements with the community. Your story will be reviewed and posted.
                        </p>

                        <form onSubmit={handleSubmitStory} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Achievement Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={storyForm.title}
                                    onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                                    placeholder="e.g., Won National Innovation Award"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={storyForm.category}
                                        onChange={(e) => setStoryForm({ ...storyForm, category: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    >
                                        <option value="Award">Award</option>
                                        <option value="Career Milestone">Career Milestone</option>
                                        <option value="Research">Research & Publications</option>
                                        <option value="Community Service">Community Service</option>
                                        <option value="Entrepreneurship">Entrepreneurship</option>
                                    </select>
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Achievement
                                    </label>
                                    <input
                                        type="date"
                                        value={storyForm.date}
                                        onChange={(e) => setStoryForm({ ...storyForm, date: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={storyForm.description}
                                    onChange={(e) => setStoryForm({ ...storyForm, description: e.target.value })}
                                    placeholder="Tell us more about your achievement..."
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent resize-none"
                                    required
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={storyForm.imageUrl}
                                    onChange={(e) => setStoryForm({ ...storyForm, imageUrl: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">Leave blank to use a default placeholder.</p>
                            </div>

                            {/* Link */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    External Link (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={storyForm.link}
                                    onChange={(e) => setStoryForm({ ...storyForm, link: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowSubmitModal(false)}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-colors font-medium shadow-md hover:shadow-lg"
                                >
                                    Submit Story
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Achievements;
