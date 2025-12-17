import React, { useState } from "react";
import {
    IoAddOutline,
    IoCloseOutline,
    IoEllipsisVertical,
    IoFilterOutline,
    IoImageOutline,
    IoPencilOutline,
    IoSaveOutline,
    IoSearchOutline,
    IoStar,
    IoTrashOutline
} from "react-icons/io5";

// Interface for Product
interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: string;
    rating: number;
    image: string;
    description: string;
}

const ProductsServices: React.FC = () => {
    // State
    const [filterCategory, setFilterCategory] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    // Mock Data
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "Smart Classroom Interactive Board",
            category: "Hardware",
            price: 1299.00,
            stock: 15,
            status: "In Stock",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1565514020176-db79238b933d?auto=format&fit=crop&q=80&w=300&h=200",
            description: "High-resolution touch display for immersive learning experiences."
        },
        {
            id: 2,
            name: "Educational Software License (Annual)",
            category: "Software",
            price: 499.00,
            stock: 999,
            status: "Active",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=300&h=200",
            description: "Comprehensive management suite for administrative tasks."
        },
        {
            id: 3,
            name: "Student Tablets (Bulk Pack)",
            category: "Hardware",
            price: 4500.00,
            stock: 4,
            status: "Low Stock",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=300&h=200",
            description: "Pack of 20 secure tablets pre-loaded with educational apps."
        },
        {
            id: 4,
            name: "IT Support Package (Monthly)",
            category: "Service",
            price: 299.00,
            stock: 999,
            status: "Active",
            rating: 5.0,
            image: "https://images.unsplash.com/photo-1551739451-82e5ee118246?auto=format&fit=crop&q=80&w=300&h=200",
            description: "24/7 remote and on-site support for school infrastructure."
        },
        {
            id: 5,
            name: "Lab Equipment Set",
            category: "Equipment",
            price: 850.00,
            stock: 0,
            status: "Out of Stock",
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=300&h=200",
            description: "Complete physics and chemistry lab kit for high school usage."
        }
    ]);

    const categories = ["All", "Hardware", "Software", "Service", "Equipment"];
    const productCategories = ["Hardware", "Software", "Service", "Equipment"];

    const filteredProducts = filterCategory === "All" 
        ? products 
        : products.filter(p => p.category === filterCategory);

    // Handlers
    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentProduct({
            name: "",
            category: "Hardware",
            price: 0,
            stock: 0,
            status: "In Stock",
            image: "",
            description: "",
            rating: 0
        });
        setShowModal(true);
    };

    const handleEdit = (product: Product) => {
        setIsEditing(true);
        setCurrentProduct({ ...product });
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simple validation
        if (!currentProduct.name || !currentProduct.category) {
            alert("Please fill in required fields.");
            return;
        }

        if (isEditing) {
            setProducts(products.map(p => 
                p.id === currentProduct.id ? { ...p, ...currentProduct } as Product : p
            ));
        } else {
            const newId = Math.max(...products.map(p => p.id), 0) + 1;
            const newProduct = { ...currentProduct, id: newId, rating: 5.0 } as Product; // Default rating for new products
            setProducts([...products, newProduct]);
        }

        setShowModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? parseFloat(value) : value
        }));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Stock":
            case "Active": return "bg-green-100 text-green-700";
            case "Low Stock": return "bg-amber-100 text-amber-700";
            case "Out of Stock": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Products & Services</h1>
                    <p className="text-gray-500 mt-1">Manage your catalog and offerings</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm">
                        <IoFilterOutline /> Filter
                    </button>
                    <button 
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors shadow-md"
                    >
                        <IoAddOutline className="w-5 h-5" /> Add New
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 w-full sm:w-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                filterCategory === cat
                                    ? "bg-primary-100/10 text-primary-100"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full sm:w-64">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100"
                    />
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col">
                        {/* Image */}
                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                            <img 
                                src={product.image || "https://via.placeholder.com/300x200?text=No+Image"} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-600 hover:text-primary-100 shadow-sm">
                                    <IoEllipsisVertical />
                                </button>
                            </div>
                            <div className="absolute top-3 left-3">
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                                    {product.status}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-primary-100 uppercase tracking-wide">{product.category}</span>
                                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                                    <IoStar /> {product.rating}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Price</span>
                                    <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleEdit(product)}
                                        className="p-2 text-gray-400 hover:text-primary-100 hover:bg-primary-50/10 rounded-lg transition-colors"
                                        title="Edit Product"
                                    >
                                        <IoPencilOutline className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Product"
                                    >
                                        <IoTrashOutline className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder */}
                <button 
                    onClick={handleAddNew}
                    className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-primary-100 hover:text-primary-100 hover:bg-primary-50/5 transition-all min-h-[300px]"
                >
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-sm transition-colors">
                        <IoAddOutline className="w-8 h-8" />
                    </div>
                    <span className="font-semibold">Add New Product</span>
                    <span className="text-sm mt-1">or Service</span>
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-900">
                                {isEditing ? "Edit Product" : "Add New Product"}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSave} className="p-6 overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={currentProduct.name || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 outline-none transition-all"
                                        placeholder="e.g. Interactive Whiteboard"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={currentProduct.category || "Hardware"}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 outline-none transition-all"
                                    >
                                        {productCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={currentProduct.status || "In Stock"}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 outline-none transition-all"
                                    >
                                        <option value="In Stock">In Stock</option>
                                        <option value="Active">Active</option>
                                        <option value="Low Stock">Low Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={currentProduct.price || 0}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={currentProduct.stock || 0}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 outline-none transition-all"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="image"
                                            value={currentProduct.image || ""}
                                            onChange={handleInputChange}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 outline-none transition-all"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <button type="button" className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                            <IoImageOutline className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={currentProduct.description || ""}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 outline-none transition-all"
                                        placeholder="Detailed description of the product or service..."
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 rounded-xl bg-primary-100 text-white font-medium hover:bg-primary-50 transition-colors shadow-md flex items-center gap-2"
                                >
                                    <IoSaveOutline className="w-5 h-5" />
                                    {isEditing ? "Save Changes" : "Create Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsServices;
