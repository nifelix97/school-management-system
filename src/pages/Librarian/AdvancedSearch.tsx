import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTimeOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishYear: number;
  category: string;
  language: string;
  edition: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
  status: "available" | "low-stock" | "out-of-stock";
}

const AdvancedSearch: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    category: "all",
    language: "all",
    yearFrom: "",
    yearTo: "",
    availability: "all",
  });

  const [showFilters, setShowFilters] = useState(true);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const allBooks: Book[] = [
    {
      id: "1",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      publisher: "MIT Press",
      publishYear: 2009,
      category: "Computer Science",
      language: "English",
      edition: "3rd",
      totalCopies: 10,
      availableCopies: 7,
      location: "A-101",
      status: "available",
    },
    {
      id: "2",
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      publisher: "Prentice Hall",
      publishYear: 2008,
      category: "Computer Science",
      language: "English",
      edition: "1st",
      totalCopies: 5,
      availableCopies: 1,
      location: "A-102",
      status: "low-stock",
    },
    {
      id: "3",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      publisher: "Scribner",
      publishYear: 2004,
      category: "Literature",
      language: "English",
      edition: "Reprint",
      totalCopies: 8,
      availableCopies: 0,
      location: "B-201",
      status: "out-of-stock",
    },
    {
      id: "4",
      title: "Design Patterns",
      author: "Erich Gamma",
      isbn: "978-0201633612",
      publisher: "Addison-Wesley",
      publishYear: 1994,
      category: "Computer Science",
      language: "English",
      edition: "1st",
      totalCopies: 6,
      availableCopies: 4,
      location: "A-103",
      status: "available",
    },
    {
      id: "5",
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell",
      isbn: "978-0136042594",
      publisher: "Pearson",
      publishYear: 2020,
      category: "Computer Science",
      language: "English",
      edition: "4th",
      totalCopies: 12,
      availableCopies: 9,
      location: "A-104",
      status: "available",
    },
  ];

  const categories = ["all", "Computer Science", "Literature", "Science", "Mathematics", "History", "Arts"];
  const languages = ["all", "English", "French", "Spanish", "German", "Arabic"];
  const availabilityOptions = [
    { value: "all", label: "All" },
    { value: "available", label: "Available" },
    { value: "low-stock", label: "Low Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
  ];

  const handleSearch = () => {
    const results = allBooks.filter((book) => {
      const matchesTitle = !searchFilters.title || book.title.toLowerCase().includes(searchFilters.title.toLowerCase());
      const matchesAuthor = !searchFilters.author || book.author.toLowerCase().includes(searchFilters.author.toLowerCase());
      const matchesIsbn = !searchFilters.isbn || book.isbn.includes(searchFilters.isbn);
      const matchesPublisher = !searchFilters.publisher || book.publisher.toLowerCase().includes(searchFilters.publisher.toLowerCase());
      const matchesCategory = searchFilters.category === "all" || book.category === searchFilters.category;
      const matchesLanguage = searchFilters.language === "all" || book.language === searchFilters.language;
      const matchesYearFrom = !searchFilters.yearFrom || book.publishYear >= parseInt(searchFilters.yearFrom);
      const matchesYearTo = !searchFilters.yearTo || book.publishYear <= parseInt(searchFilters.yearTo);
      const matchesAvailability = searchFilters.availability === "all" || book.status === searchFilters.availability;

      return matchesTitle && matchesAuthor && matchesIsbn && matchesPublisher && 
             matchesCategory && matchesLanguage && matchesYearFrom && matchesYearTo && matchesAvailability;
    });

    setSearchResults(results);
    setHasSearched(true);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchFilters({
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      category: "all",
      language: "all",
      yearFrom: "",
      yearTo: "",
      availability: "all",
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  // Pagination
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-50 text-green-600 border-green-200";
      case "low-stock":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "out-of-stock":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "low-stock":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      case "out-of-stock":
        return <IoTimeOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
          Advanced Search
        </h1>
        <p className="text-sm sm:text-base text-primary-50/70">
          Search books using multiple criteria and filters
        </p>
      </div>

      {/* Search Filters Panel */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IoFilterOutline className="w-5 h-5 text-primary-50" />
            <h2 className="text-lg font-bold text-primary-50">Search Filters</h2>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            {showFilters ? <IoCloseOutline className="w-5 h-5" /> : <IoFilterOutline className="w-5 h-5" />}
          </button>
        </div>

        <div className={`p-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Title */}
            <Input
              label="Book Title"
              type="text"
              placeholder="Enter book title"
              value={searchFilters.title}
              onChange={(e) => setSearchFilters({ ...searchFilters, title: e.target.value })}
              leftIcon={<IoBookOutline className="w-5 h-5" />}
            />

            {/* Author */}
            <Input
              label="Author"
              type="text"
              placeholder="Enter author name"
              value={searchFilters.author}
              onChange={(e) => setSearchFilters({ ...searchFilters, author: e.target.value })}
              leftIcon={<IoPersonOutline className="w-5 h-5" />}
            />

            {/* ISBN */}
            <Input
              label="ISBN"
              type="text"
              placeholder="Enter ISBN"
              value={searchFilters.isbn}
              onChange={(e) => setSearchFilters({ ...searchFilters, isbn: e.target.value })}
              leftIcon={<IoSearchOutline className="w-5 h-5" />}
            />

            {/* Publisher */}
            <Input
              label="Publisher"
              type="text"
              placeholder="Enter publisher name"
              value={searchFilters.publisher}
              onChange={(e) => setSearchFilters({ ...searchFilters, publisher: e.target.value })}
            />

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">Category</label>
              <select
                value={searchFilters.category}
                onChange={(e) => setSearchFilters({ ...searchFilters, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">Language</label>
              <select
                value={searchFilters.language}
                onChange={(e) => setSearchFilters({ ...searchFilters, language: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "all" ? "All Languages" : lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Year From */}
            <Input
              label="Published From"
              type="number"
              placeholder="Year"
              value={searchFilters.yearFrom}
              onChange={(e) => setSearchFilters({ ...searchFilters, yearFrom: e.target.value })}
              leftIcon={<IoCalendarOutline className="w-5 h-5" />}
            />

            {/* Year To */}
            <Input
              label="Published To"
              type="number"
              placeholder="Year"
              value={searchFilters.yearTo}
              onChange={(e) => setSearchFilters({ ...searchFilters, yearTo: e.target.value })}
              leftIcon={<IoCalendarOutline className="w-5 h-5" />}
            />

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">Availability</label>
              <select
                value={searchFilters.availability}
                onChange={(e) => setSearchFilters({ ...searchFilters, availability: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
              >
                {availabilityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleSearch}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              <IoSearchOutline className="w-5 h-5" />
              Search Books
            </button>
            <button
              onClick={handleClearFilters}
              className="flex-1 sm:flex-initial px-6 py-3 bg-gray-100 text-primary-50 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <>
          {/* Results Header */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 px-6 py-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-primary-50">Search Results</h3>
                <p className="text-sm text-primary-50/70">
                  Found {searchResults.length} {searchResults.length === 1 ? 'book' : 'books'}
                </p>
              </div>
            </div>
          </div>

          {/* Results Display */}
          {paginatedResults.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100">
              <IoBookOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
              <p className="text-primary-50/60">No books found matching your criteria</p>
              <p className="text-sm text-primary-50/50 mt-2">Try adjusting your search filters</p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4 mb-6">
                {paginatedResults.map((book) => (
                  <div key={book.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-primary-50 mb-1">{book.title}</h3>
                        <p className="text-sm text-primary-50/60">{book.author}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(book.status)}`}>
                        {getStatusIcon(book.status)}
                        {book.status.replace("-", " ")}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary-50/60">ISBN:</span>
                        <span className="font-medium text-primary-50">{book.isbn}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary-50/60">Publisher:</span>
                        <span className="font-medium text-primary-50">{book.publisher}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary-50/60">Year:</span>
                        <span className="font-medium text-primary-50">{book.publishYear}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary-50/60">Available:</span>
                        <span className="font-semibold text-primary-50">
                          {book.availableCopies}/{book.totalCopies}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary-50/60">Location:</span>
                        <span className="font-medium text-primary-50">{book.location}</span>
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold">
                      <IoEyeOutline className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                        Book Info
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                        ISBN
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                        Publisher
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                        Available
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedResults.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-semibold text-primary-50">{book.title}</div>
                            <div className="text-sm text-primary-50/60">{book.author}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-primary-50/70">{book.isbn}</td>
                        <td className="px-4 py-4 text-sm text-primary-50/70">{book.publisher}</td>
                        <td className="px-4 py-4 text-sm text-primary-50/70">{book.publishYear}</td>
                        <td className="px-4 py-4">
                          <span className="px-2.5 py-1 bg-primary-50/10 text-primary-50 rounded-full text-xs font-semibold">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <div className="font-semibold text-primary-50">
                              {book.availableCopies}/{book.totalCopies}
                            </div>
                            <div className="text-xs text-primary-50/60">{book.location}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getStatusColor(book.status)}`}>
                            {getStatusIcon(book.status)}
                            {book.status.replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button className="px-3 py-1.5 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold flex items-center gap-1">
                            <IoEyeOutline className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-md border border-gray-100 px-4 py-3">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-sm text-primary-50/70">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(currentPage * itemsPerPage, searchResults.length)} of {searchResults.length} results
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <IoChevronBackOutline className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                              currentPage === page
                                ? "bg-primary-50 text-white"
                                : "hover:bg-gray-100 text-primary-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <IoChevronForwardOutline className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Initial State - No Search Yet */}
      {!hasSearched && (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoSearchOutline className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-primary-50 mb-2">Ready to Search</h3>
          <p className="text-primary-50/70 mb-4">
            Use the filters above to search for books in the library catalog
          </p>
          <p className="text-sm text-primary-50/50">
            You can search by title, author, ISBN, publisher, category, language, publication year, and availability
          </p>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
