import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoCreateOutline,
    IoLocationOutline,
    IoPricetagOutline,
    IoSaveOutline,
    IoSearchOutline,
    IoSwapHorizontalOutline,
    IoTrashOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  publishYear: number;
  edition: string;
  totalCopies: number;
  availableCopies: number;
  price: number;
  location: string;
  dateAdded: string;
  status: "available" | "low-stock" | "out-of-stock";
}

const ManageBooks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publisher: "",
    publishYear: "",
    edition: "",
    totalCopies: "",
    price: "",
    location: "",
  });

  // Mock data
  const [books, setBooks] = useState<Book[]>([
    {
      id: "1",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Computer Science",
      publisher: "MIT Press",
      publishYear: 2009,
      edition: "3rd Edition",
      totalCopies: 15,
      availableCopies: 8,
      price: 89.99,
      location: "Section A, Shelf 12",
      dateAdded: "2024-01-15",
      status: "available",
    },
    {
      id: "2",
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      category: "Software Engineering",
      publisher: "Prentice Hall",
      publishYear: 2008,
      edition: "1st Edition",
      totalCopies: 10,
      availableCopies: 2,
      price: 54.99,
      location: "Section A, Shelf 15",
      dateAdded: "2024-02-20",
      status: "low-stock",
    },
    {
      id: "3",
      title: "Design Patterns",
      author: "Erich Gamma",
      isbn: "978-0201633612",
      category: "Software Engineering",
      publisher: "Addison-Wesley",
      publishYear: 1994,
      edition: "1st Edition",
      totalCopies: 8,
      availableCopies: 0,
      price: 64.99,
      location: "Section A, Shelf 14",
      dateAdded: "2024-03-10",
      status: "out-of-stock",
    },
    {
      id: "4",
      title: "The Lean Startup",
      author: "Eric Ries",
      isbn: "978-0307887894",
      category: "Business",
      publisher: "Crown Business",
      publishYear: 2011,
      edition: "1st Edition",
      totalCopies: 12,
      availableCopies: 7,
      price: 29.99,
      location: "Section B, Shelf 5",
      dateAdded: "2024-04-05",
      status: "available",
    },
    {
      id: "5",
      title: "Artificial Intelligence",
      author: "Stuart Russell",
      isbn: "978-0136042594",
      category: "Computer Science",
      publisher: "Pearson",
      publishYear: 2020,
      edition: "4th Edition",
      totalCopies: 20,
      availableCopies: 12,
      price: 119.99,
      location: "Section A, Shelf 10",
      dateAdded: "2024-05-12",
      status: "available",
    },
  ]);

  const categories = ["all", "Computer Science", "Software Engineering", "Business", "Engineering", "Medicine", "Arts & Literature"];

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
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
      case "out-of-stock":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (book: Book) => {
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      publisher: book.publisher,
      publishYear: book.publishYear.toString(),
      edition: book.edition,
      totalCopies: book.totalCopies.toString(),
      price: book.price.toString(),
      location: book.location,
    });
    setShowEditModal(true);
  };

  const handleDelete = (bookId: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((b) => b.id !== bookId));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      isbn: "",
      category: "",
      publisher: "",
      publishYear: "",
      edition: "",
      totalCopies: "",
      price: "",
      location: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Manage Books
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Add, edit, and organize your library collection
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
          >
            <IoAddOutline className="w-5 h-5" />
            Add New Book
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Books</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-50">{books.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-50/80 rounded-xl">
                <IoBookOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Copies</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-100">
                  {books.reduce((sum, book) => sum + book.totalCopies, 0)}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-100/80 rounded-xl">
                <IoSwapHorizontalOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Available</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {books.reduce((sum, book) => sum + book.availableCopies, 0)}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <IoCheckmarkCircleOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Categories</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-200">
                  {categories.filter(c => c !== "all").length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-primary-200 to-primary-200/80 rounded-xl">
                <IoPricetagOutline className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<IoSearchOutline className="w-5 h-5" />}
              />
            </div>
            <div className="sm:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Books Display - Cards on Mobile, Table on Desktop */}
      {paginatedBooks.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100 mb-6">
          <IoBookOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
          <p className="text-primary-50/60">No books found</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4 mb-6">
            {paginatedBooks.map((book) => (
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
                    <span className="text-primary-50/60">Category:</span>
                    <span className="px-2.5 py-0.5 bg-primary-50/10 text-primary-50 rounded-full text-xs font-semibold">
                      {book.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Available:</span>
                    <span className="font-semibold text-primary-50">
                      {book.availableCopies}/{book.totalCopies}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Price:</span>
                    <span className="font-semibold text-primary-50">${book.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(book)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold"
                  >
                    <IoCreateOutline className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold"
                  >
                    <IoTrashOutline className="w-4 h-4" />
                    Delete
                  </button>
                </div>
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
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Copies
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Price
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
                {paginatedBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-primary-50">{book.title}</div>
                        <div className="text-sm text-primary-50/60">{book.author}</div>
                        <div className="text-xs text-primary-50/50 mt-1">{book.publisher}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{book.isbn}</td>
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
                        <div className="text-xs text-primary-50/60">available</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-primary-50">
                      ${book.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getStatusColor(book.status)}`}>
                        {getStatusIcon(book.status)}
                        {book.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(book)}
                          className="p-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors"
                          title="Edit"
                        >
                          <IoCreateOutline className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <IoTrashOutline className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 px-4 py-3 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-primary-50/70">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredBooks.length)} of {filteredBooks.length} books
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

      {/* Add/Edit Book Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">
                {showEditModal ? "Edit Book" : "Add New Book"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Book Title"
                  type="text"
                  placeholder="Enter book title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
                <Input
                  label="Author"
                  type="text"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  required
                />
                <Input
                  label="ISBN"
                  type="text"
                  placeholder="Enter ISBN"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  required
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
                  >
                    <option value="">Select category</option>
                    {categories.filter(c => c !== "all").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Publisher"
                  type="text"
                  placeholder="Enter publisher"
                  value={formData.publisher}
                  onChange={(e) => handleInputChange('publisher', e.target.value)}
                />
                <Input
                  label="Publish Year"
                  type="number"
                  placeholder="Enter year"
                  value={formData.publishYear}
                  onChange={(e) => handleInputChange('publishYear', e.target.value)}
                  leftIcon={<IoCalendarOutline className="w-5 h-5" />}
                />
                <Input
                  label="Edition"
                  type="text"
                  placeholder="e.g., 1st Edition"
                  value={formData.edition}
                  onChange={(e) => handleInputChange('edition', e.target.value)}
                />
                <Input
                  label="Total Copies"
                  type="number"
                  placeholder="Enter number of copies"
                  value={formData.totalCopies}
                  onChange={(e) => handleInputChange('totalCopies', e.target.value)}
                  required
                />
                <Input
                  label="Price"
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  leftIcon={<span className="text-primary-50">$</span>}
                />
                <Input
                  label="Location"
                  type="text"
                  placeholder="e.g., Section A, Shelf 12"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  leftIcon={<IoLocationOutline className="w-5 h-5" />}
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-primary-50 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                  <IoSaveOutline className="w-5 h-5" />
                  {showEditModal ? "Update Book" : "Add Book"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
