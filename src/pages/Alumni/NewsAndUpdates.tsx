import React, { useState } from "react";
import {
    IoArrowForward,
    IoBookmark,
    IoBookmarkOutline,
    IoCalendarOutline,
    IoMailOutline,
    IoNewspaperOutline,
    IoSearchOutline,
    IoShareSocialOutline,
    IoTimeOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

// Types
interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: "University News" | "Alumni Spotlight" | "Research" | "Campus Life" | "Career";
    author: string;
    date: string;
    readTime: string;
    imageUrl: string;
    isFeatured?: boolean;
    isBookmarked: boolean;
}

const NewsAndUpdates: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [email, setEmail] = useState("");

    // Mock Data
    const [articles, setArticles] = useState<Article[]>([
        {
            id: "1",
            title: "University Announces New Innovation Hub for AI Research",
            excerpt: "A state-of-the-art facility dedicated to artificial intelligence and machine learning research is set to open next fall, fostering collaboration between students, alumni, and industry leaders.",
            category: "University News",
            author: "Editorial Team",
            date: "Dec 15, 2024",
            readTime: "5 min read",
            imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            isFeatured: true,
            isBookmarked: false
        },
        {
            id: "2",
            title: "Alumni Spotlight: From Campus Canteen to CEO",
            excerpt: "Meet David Chen ('14), who turned his passion for sustainable food into a multi-million dollar plant-based startup that is revolutionizing the food industry.",
            category: "Alumni Spotlight",
            author: "Sarah Jenkins",
            date: "Dec 12, 2024",
            readTime: "8 min read",
            imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            isBookmarked: true
        },
        {
            id: "3",
            title: "Annual Alumni Gala Checklist: What You Need to Know",
            excerpt: "The biggest event of the year is approaching! Here's everything you need to know about the schedule, dress code, and special guests.",
            category: "Campus Life",
            author: "Events Committee",
            date: "Dec 10, 2024",
            readTime: "3 min read",
            imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            isBookmarked: false
        },
        {
            id: "4",
            title: "New Mentorship Program Launches for Class of 2025",
            excerpt: "Connect with graduating students and help guide the next generation of professionals. Applications for mentors are now open.",
            category: "Career",
            author: "Alumni Relations",
            date: "Dec 08, 2024",
            readTime: "4 min read",
            imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            isBookmarked: false
        },
        {
            id: "5",
            title: "Breakthrough Study on Urban Sustainability Published",
            excerpt: "Professor Alan Grant and a team of alumni researchers have published a groundbreaking study on renewable energy in urban environments.",
            category: "Research",
            author: "Research Dept",
            date: "Dec 05, 2024",
            readTime: "6 min read",
            imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            isBookmarked: false
        },
        {
            id: "6",
            title: "Global Alumni Meetups: 2025 Schedule Released",
            excerpt: "Find out when the alumni association will be visiting a city near you! Check the full schedule of international networking events.",
            category: "Campus Life",
            author: "Community Manager",
            date: "Nov 28, 2024",
            readTime: "2 min read",
            imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            isBookmarked: false
        }
    ]);

    const featuredArticle = articles.find(a => a.isFeatured) || articles[0];
    const otherArticles = articles.filter(a => a.id !== featuredArticle.id);

    const categories = ["All", "University News", "Alumni Spotlight", "Research", "Campus Life", "Career"];

    // Filter Logic
    const filteredArticles = otherArticles.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    const toggleBookmark = (id: string) => {
        setArticles(articles.map(article => 
            article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
        ));
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if(email) {
            alert(`Thanks for subscribing! We've sent a confirmation to ${email}`);
            setEmail("");
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "University News": return "bg-blue-50 text-blue-700";
            case "Alumni Spotlight": return "bg-amber-50 text-amber-700";
            case "Research": return "bg-purple-50 text-purple-700";
            case "Campus Life": return "bg-emerald-50 text-emerald-700";
            case "Career": return "bg-pink-50 text-pink-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">News & Updates</h1>
                    <p className="text-gray-500">Stay connected with the latest happenings from your alma mater.</p>
                </div>
                <div className="w-full md:w-auto relative">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search news..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-72 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Featured Article */}
            {selectedCategory === "All" && !searchTerm && (
                <div className="mb-10 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-auto overflow-hidden">
                            <img 
                                src={featuredArticle.imageUrl} 
                                alt={featuredArticle.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-primary-100/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg">
                                    Featured Story
                                </span>
                            </div>
                        </div>
                        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                                <span className={`px-2 py-0.5 rounded-md font-medium text-xs ${getCategoryColor(featuredArticle.category)}`}>
                                    {featuredArticle.category}
                                </span>
                                <span className="flex items-center gap-1"><IoCalendarOutline /> {featuredArticle.date}</span>
                                <span className="flex items-center gap-1"><IoTimeOutline /> {featuredArticle.readTime}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-100 transition-colors">
                                {featuredArticle.title}
                            </h2>
                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                {featuredArticle.excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <button className="flex items-center gap-2 text-primary-100 font-semibold hover:gap-3 transition-all group-hover:text-primary-50">
                                    Read Full Story <IoArrowForward />
                                </button>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => toggleBookmark(featuredArticle.id)}
                                        className="p-2 text-gray-400 hover:text-primary-100 hover:bg-primary-50/10 rounded-full transition-colors"
                                    >
                                        {featuredArticle.isBookmarked ? <IoBookmark className="w-6 h-6 text-primary-100" /> : <IoBookmarkOutline className="w-6 h-6" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="grid lg:grid-cols-4 gap-8">
                {/* Main News Grid */}
                <div className="lg:col-span-3">
                    {/* Categories */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    selectedCategory === category
                                        ? "bg-primary-100 text-white shadow-md shadow-primary-100/20"
                                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Articles List */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => (
                                <div 
                                    key={article.id} 
                                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-100/30 transition-all duration-300 group flex flex-col h-full"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img 
                                            src={article.imageUrl} 
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); toggleBookmark(article.id); }}
                                                className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-primary-100 shadow-sm transition-colors"
                                            >
                                                {article.isBookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
                                            </button>
                                        </div>
                                        <div className="absolute bottom-3 left-3">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold shadow-sm backdrop-blur-sm ${getCategoryColor(article.category)} bg-white/90`}>
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                            <span className="flex items-center gap-1"><IoCalendarOutline /> {article.date}</span>
                                            <span className="flex items-center gap-1"><IoTimeOutline /> {article.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-100 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                                            {article.excerpt}
                                        </p>
                                        <div className="pt-4 border-t border-gray-50 mt-auto flex items-center justify-between">
                                            <span className="text-xs font-medium text-gray-500">
                                                By {article.author}
                                            </span>
                                            <button className="text-primary-100 text-sm font-semibold hover:underline">
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                                <IoNewspaperOutline className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                <p>No articles found matching your criteria.</p>
                                <button 
                                    onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                                    className="mt-2 text-primary-100 font-medium hover:underline"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Newsletter Widget */}
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <IoMailOutline className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold">Stay Updated</h3>
                        </div>
                        <p className="text-white/90 text-sm mb-6">
                            Subscribe to our monthly alumni newsletter for exclusive updates and events.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input 
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                                required
                            />
                            <button 
                                type="submit"
                                className="w-full py-2.5 bg-white text-primary-100 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-md"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>

                    {/* Trending Topics */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                            <IoTrendingUpOutline className="w-5 h-5 text-primary-100" />
                            <h3 className="font-bold text-gray-900">Trending Topics</h3>
                        </div>
                        <div className="space-y-4">
                            {["Homecoming 2024", "Engineering Excellence", "Sustainability Initiative", "Alumni Awards", "Global Network"].map((topic, index) => (
                                <div key={index} className="flex items-center justify-between group cursor-pointer">
                                    <span className="text-sm text-gray-600 group-hover:text-primary-100 transition-colors">#{topic.replace(/\s+/g, '')}</span>
                                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{100 - index * 15} posts</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Connect */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                        <div className="flex gap-2">
                            {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social) => (
                                <button key={social} className="flex-1 py-3 rounded-xl bg-gray-50 text-gray-400 hover:bg-primary-50 hover:text-white transition-all text-xl flex items-center justify-center">
                                    <IoShareSocialOutline />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsAndUpdates;
