import React, { useState } from 'react';
import {
    FaArrowRight,
    FaBookOpen,
    FaCalendar,
    FaClock,
    FaGraduationCap,
    FaLightbulb,
    FaSearch,
    FaTag,
    FaTrophy,
    FaUser
} from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const categories = [
    { name: 'All', icon: FaBookOpen, count: 24 },
    { name: 'Education', icon: FaGraduationCap, count: 12 },
    { name: 'Technology', icon: FaLightbulb, count: 8 },
    { name: 'Success Stories', icon: FaTrophy, count: 4 }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of Education: Embracing Digital Transformation',
      excerpt: 'Discover how technology is revolutionizing the way we learn and teach in modern educational institutions.',
      author: 'Dr. Sarah Johnson',
      date: 'Dec 3, 2025',
      readTime: '5 min read',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Student Success: Tips for Academic Excellence',
      excerpt: 'Learn proven strategies and techniques that top students use to achieve outstanding academic results.',
      author: 'Prof. Michael Chen',
      date: 'Dec 1, 2025',
      readTime: '7 min read',
      category: 'Success Stories',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop',
      featured: true
    },
    {
      id: 3,
      title: 'Innovative Teaching Methods for the Modern Classroom',
      excerpt: 'Explore cutting-edge teaching approaches that engage students and enhance learning outcomes.',
      author: 'Emily Rodriguez',
      date: 'Nov 28, 2025',
      readTime: '6 min read',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop'
    },
    {
      id: 4,
      title: 'AI in Education: Opportunities and Challenges',
      excerpt: 'Understanding the role of artificial intelligence in shaping the future of learning.',
      author: 'Dr. James Wilson',
      date: 'Nov 25, 2025',
      readTime: '8 min read',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop'
    },
    {
      id: 5,
      title: 'Building a Supportive Learning Environment',
      excerpt: 'Creating spaces where students feel valued, motivated, and empowered to succeed.',
      author: 'Lisa Anderson',
      date: 'Nov 22, 2025',
      readTime: '5 min read',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=500&fit=crop'
    },
    {
      id: 6,
      title: 'From Classroom to Career: Alumni Success Stories',
      excerpt: 'Inspiring journeys of our graduates who are making a difference in their fields.',
      author: 'Robert Martinez',
      date: 'Nov 20, 2025',
      readTime: '10 min read',
      category: 'Success Stories',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=500&fit=crop'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Successfully subscribed to our newsletter!');
      setEmail(''); // Clear the input
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 text-primary-100 py-16 sm:py-20 lg:py-24 animate-[fadeIn_0.6s_ease-out]">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Our Blog
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-95 max-w-3xl mx-auto mb-8 sm:mb-10">
              Insights, stories, and resources to inspire your educational journey
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="animate-[slideUp_0.6s_ease-out_0.2s_both]">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<FaSearch />}
                  className="shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 animate-[slideUp_0.6s_ease-out_0.3s_both]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-primary-50 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="text-sm sm:text-base" />
                <span className="text-sm sm:text-base">{category.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.name
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Featured Posts */}
        {selectedCategory === 'All' && featuredPosts.length > 0 && (
          <div className="mb-12 lg:mb-16 animate-[scaleIn_0.6s_ease-out_0.4s_both]">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-6 sm:mb-8 flex items-center gap-2">
              <FaTrophy className="text-primary-100" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {featuredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-[slideUp_0.6s_ease-out] cursor-pointer"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-100 text-primary-50 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaTag className="text-primary-100" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendar />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary-50 mb-3 group-hover:text-primary-100 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <button className="flex items-center gap-2 text-primary-50 font-medium hover:text-primary-100 transition-colors group-hover:gap-3">
                        Read More
                        <FaArrowRight className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="animate-[fadeIn_0.6s_ease-out_0.6s_both]">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-6 sm:mb-8">
            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {regularPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-[slideUp_0.6s_ease-out] cursor-pointer"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 text-primary-50 px-2 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <FaCalendar />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-primary-50 mb-2 group-hover:text-primary-100 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400 text-xs" />
                        <span className="text-xs text-gray-600">{post.author}</span>
                      </div>
                      <button className="text-primary-50 font-medium hover:text-primary-100 transition-colors text-sm flex items-center gap-1 group-hover:gap-2">
                        Read
                        <FaArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <FaSearch className="text-5xl sm:text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-400 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {regularPosts.length > 0 && (
          <div className="text-center mt-12 sm:mt-16 animate-[fadeIn_0.6s_ease-out_1s_both]">
            <button className="bg-primary-50 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold hover:bg-primary-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              Load More Articles
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 text-primary-100 py-12 sm:py-16 lg:py-20 mt-12 sm:mt-16 animate-[fadeIn_0.6s_ease-out]">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-base sm:text-lg opacity-95 mb-6 sm:mb-8">
            Subscribe to our newsletter and never miss an article
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<IoMdMail />}
                disabled={isSubscribing}
              />
            </div>
            <button 
              type="submit"
              disabled={isSubscribing}
              className="bg-primary-100 text-primary-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
