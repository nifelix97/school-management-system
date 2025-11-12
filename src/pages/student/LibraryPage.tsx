import React, { useState } from "react";
import {
  ChevronLeft,
  Search,
  Filter,
  Star,
  BookOpen,
  Download,
  Heart,
  Clock,
  User,
  Calendar,
  Eye,
} from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  rating: number;
  totalRatings: number;
  pages: number;
  publishYear: number;
  isbn: string;
  isAvailable: boolean;
  isFavorite: boolean;
  userRating?: number;
  readingProgress?: number;
  content: string;
}

export default function LibraryPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const books: Book[] = [
    {
      id: 1,
      title: "Advanced Calculus",
      author: "Dr. Michael Stewart",
      category: "Mathematics",
      description: "A comprehensive guide to advanced calculus concepts including multivariable calculus, differential equations, and vector analysis.",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      rating: 4.5,
      totalRatings: 128,
      pages: 456,
      publishYear: 2023,
      isbn: "978-0123456789",
      isAvailable: true,
      isFavorite: false,
      readingProgress: 25,
      content: "Chapter 1: Introduction to Advanced Calculus\n\nCalculus is the mathematical study of continuous change. In this advanced course, we will explore multivariable functions, partial derivatives, and multiple integrals...\n\n[This would be the full book content in a real application]"
    },
    {
      id: 2,
      title: "Organic Chemistry Principles",
      author: "Prof. Sarah Johnson",
      category: "Chemistry",
      description: "Essential principles of organic chemistry covering molecular structure, reactions, and synthesis methods.",
      coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=400&fit=crop",
      rating: 4.2,
      totalRatings: 95,
      pages: 623,
      publishYear: 2022,
      isbn: "978-0987654321",
      isAvailable: true,
      isFavorite: true,
      userRating: 5,
      content: "Chapter 1: Introduction to Organic Chemistry\n\nOrganic chemistry is the study of carbon-containing compounds. This field encompasses a vast array of molecules..."
    },
    {
      id: 3,
      title: "Modern Physics",
      author: "Dr. Robert Chen",
      category: "Physics",
      description: "Explore quantum mechanics, relativity, and modern physics concepts with practical applications.",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      rating: 4.7,
      totalRatings: 203,
      pages: 512,
      publishYear: 2024,
      isbn: "978-0456789123",
      isAvailable: false,
      isFavorite: false,
      content: "Chapter 1: The Quantum Revolution\n\nThe 20th century brought revolutionary changes to our understanding of physics..."
    },
    {
      id: 4,
      title: "Shakespeare's Complete Works",
      author: "William Shakespeare",
      category: "Literature",
      description: "The complete collection of Shakespeare's plays and sonnets with modern annotations.",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      rating: 4.8,
      totalRatings: 567,
      pages: 1248,
      publishYear: 2023,
      isbn: "978-0789123456",
      isAvailable: true,
      isFavorite: true,
      readingProgress: 12,
      content: "HAMLET, PRINCE OF DENMARK\n\nACT I\nSCENE I. Elsinore. A platform before the castle.\n\nFRANCISCO at his post. Enter to him BERNARDO..."
    },
    {
      id: 5,
      title: "Data Structures & Algorithms",
      author: "Dr. Lisa Wang",
      category: "Computer Science",
      description: "Comprehensive guide to data structures and algorithms with practical programming examples.",
      coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=400&fit=crop",
      rating: 4.6,
      totalRatings: 342,
      pages: 789,
      publishYear: 2023,
      isbn: "978-0321654987",
      isAvailable: true,
      isFavorite: false,
      userRating: 4,
      content: "Chapter 1: Introduction to Data Structures\n\nData structures are fundamental building blocks of computer programs..."
    },
    {
      id: 6,
      title: "World History: Modern Era",
      author: "Prof. James Miller",
      category: "History",
      description: "A comprehensive overview of world history from the Renaissance to the present day.",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      rating: 4.3,
      totalRatings: 156,
      pages: 892,
      publishYear: 2022,
      isbn: "978-0654321987",
      isAvailable: true,
      isFavorite: false,
      content: "Chapter 1: The Renaissance\n\nThe Renaissance marked a period of cultural rebirth in Europe..."
    }
  ];

  const categories = ["all", "Mathematics", "Chemistry", "Physics", "Literature", "Computer Science", "History"];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleRateBook = (rating: number) => {
    if (selectedBook) {
      selectedBook.userRating = rating;
      setUserRating(rating);
      setShowRatingModal(false);
    }
  };

  const toggleFavorite = (bookId: number) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      book.isFavorite = !book.isFavorite;
    }
  };

  if (isReading && selectedBook) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <button
              onClick={() => setIsReading(false)}
              className="flex items-center gap-2 text-primary-50 hover:text-opacity-80"
            >
              <ChevronLeft size={20} />
              <span>Back to Book Details</span>
            </button>
            <div className="text-sm text-primary-50">
              Page 1 of {selectedBook.pages}
            </div>
          </div>
          
          <div className="prose max-w-none">
            <h1 className="text-2xl font-bold text-primary-50 mb-4">{selectedBook.title}</h1>
            <div className="text-primary-50 leading-relaxed whitespace-pre-line">
              {selectedBook.content}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t flex justify-between items-center">
            <button className="px-4 py-2 bg-gray-200 text-primary-50 rounded-lg hover:bg-primary-100">
              Previous Page
            </button>
            <div className="text-sm text-primary-50">
              Reading Progress: {selectedBook.readingProgress || 0}%
            </div>
            <button className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90">
              Next Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedBook) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          <button
            onClick={() => setSelectedBook(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Library</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 xs:p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedBook.coverImage}
                    alt={selectedBook.title}
                    className="w-48 h-64 object-cover rounded-lg mx-auto md:mx-0"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-xl xs:text-2xl font-bold text-primary-50 mb-2">
                        {selectedBook.title}
                      </h1>
                      <p className="text-lg text-primary-50 mb-2">by {selectedBook.author}</p>
                      <div className="flex items-center gap-4 text-sm text-primary-50 mb-4">
                        <span>{selectedBook.category}</span>
                        <span>{selectedBook.pages} pages</span>
                        <span>{selectedBook.publishYear}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(selectedBook.id)}
                      className={`p-2 rounded-full ${selectedBook.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      <Heart size={24} fill={selectedBook.isFavorite ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          className={star <= selectedBook.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                      <span className="ml-2 text-sm text-primary-50">
                        {selectedBook.rating} ({selectedBook.totalRatings} reviews)
                      </span>
                    </div>
                  </div>

                  <p className="text-primary-50 mb-6 leading-relaxed">
                    {selectedBook.description}
                  </p>

                  {selectedBook.readingProgress && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-primary-50">Reading Progress</span>
                        <span className="font-semibold">{selectedBook.readingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-50 h-2 rounded-full"
                          style={{ width: `${selectedBook.readingProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col xs:flex-row gap-3">
                    {selectedBook.isAvailable ? (
                      <>
                        <button
                          onClick={() => setIsReading(true)}
                          className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90 flex items-center justify-center gap-2"
                        >
                          <BookOpen size={20} />
                          <span>Read Now</span>
                        </button>
                        <button
                          onClick={() => setShowRatingModal(true)}
                          className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2"
                        >
                          <Star size={20} />
                          <span>Rate Book</span>
                        </button>
                      </>
                    ) : (
                      <div className="flex-1 px-4 py-2 bg-gray-300 text-primary-50 rounded-lg text-center">
                        Currently Unavailable
                      </div>
                    )}
                  </div>

                  {selectedBook.userRating && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-primary-300">
                        You rated this book: {selectedBook.userRating}/5 stars
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-primary-50 mb-4">Rate this book</h3>
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`p-1 ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <Star size={32} fill={star <= userRating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-primary-50 rounded-lg hover:bg-primary-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRateBook(userRating)}
                  className="flex-1 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90"
                  disabled={userRating === 0}
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-3 xs:mb-4"
        >
          <ChevronLeft size={18} className="xs:w-5 xs:h-5" />
          <span>Back</span>
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl xs:text-2xl font-bold text-primary-50">Digital Library</h1>
          <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50"
                size={18}
              />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-primary-50 rounded-lg "
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-primary-50 rounded-lg text-primary-50"
            >
              {categories.map(category => (
                <option key={category} value={category} className="text-primary-50">
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="bg-white rounded-lg xs:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                {!book.isAvailable && (
                  <div className="absolute inset-0 bg-Primary-50 bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Unavailable</span>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(book.id);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${
                    book.isFavorite ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <Heart size={16} fill={book.isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-primary-50 mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-primary-50 mb-2">{book.author}</p>
                <p className="text-xs text-primary-50/40 mb-3">{book.category}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-primary-50">{book.rating}</span>
                  </div>
                  <span className="text-xs text-primary-50">{book.pages} pages</span>
                </div>

                {book.readingProgress && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-primary-50 h-1 rounded-full"
                        style={{ width: `${book.readingProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-primary-50 mt-1">{book.readingProgress}% complete</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}