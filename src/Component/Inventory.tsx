

// import { useState } from "react";
// import {
//   Edit,
//   Trash2,
//   Search,
//   Plus,
//   Filter,
//   Download,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   Package,
//   DollarSign,
//   TrendingUp,
//   ShoppingCart,
//   MoreVertical,
//   Eye,
//   AlertCircle,
// } from "lucide-react";
// import { useGetProductsQuery, useDeleteProductMutation } from "../api/fechingapi";
// import { useNavigate } from "react-router-dom";


// const Inventory = () => {
//   const { data: products, error, isLoading, refetch } = useGetProductsQuery();
//   const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const navigate=useNavigate()

//   // Filter products
//   const filteredProducts = products?.filter((product: any) => {
//     const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // Get unique categories
//   const categories = [...new Set(products?.map((p: any) => p.category) || [])];

//   // Handle delete with confirmation
//   const handleDelete = async (id: string, title: string) => {
//     if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
//       await deleteProduct(id);
//     }
//   };

//   // Loading State
//   if (isLoading) {
//     return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <AlertCircle size={32} className="text-red-600" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">Failed to Load Product</h2>
//             <p className="text-sm text-gray-600 mt-2">
//               {(error as any)?.data?.message || (error as any)?.message || "Unknown error occurred"}
//             </p>
//           </div>
//           <div className="flex gap-3 mt-6">
//             <button
//               onClick={() => refetch()}
//               className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
//             >
//               <RefreshCw size={18} />
//               Retry
//             </button>
//             <button
//               onClick={() => navigate(-1)}
//               className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-3xl">❌</span>
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
//           <p className="text-gray-500 mb-4">Something went wrong while fetching products.</p>
//           <button
//             onClick={() => refetch()}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="ml-64 p-8">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
//             <p className="text-gray-500 mt-1">Welcome back, Admin! 👋</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="p-2 bg-white rounded-lg shadow hover:shadow-md transition">
//               <RefreshCw size={20} className="text-gray-600" onClick={() => refetch()} />
//             </button>
//             <button
//             onClick={() => navigate("/form")}
//              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
//               <Plus size={20} />
//               Add Product
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Total Products */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Products</p>
//                 <h3 className="text-2xl font-bold text-gray-800 mt-1">{products?.length || 0}</h3>
//                 <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
//                   <TrendingUp size={14} /> +12% from last month
//                 </p>
//               </div>
//               <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
//                 <Package size={28} className="text-blue-600" />
//               </div>
//             </div>
//           </div>

//           {/* Total Revenue */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Revenue</p>
//                 <h3 className="text-2xl font-bold text-gray-800 mt-1">
//                   Rs {products?.reduce((acc: number, p: any) => acc + p.price, 0).toLocaleString() || 0}
//                 </h3>
//                 <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
//                   <TrendingUp size={14} /> +8% from last month
//                 </p>
//               </div>
//               <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
//                 <DollarSign size={28} className="text-green-600" />
//               </div>
//             </div>
//           </div>

//           {/* Total Orders */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Orders</p>
//                 <h3 className="text-2xl font-bold text-gray-800 mt-1">1,234</h3>
//                 <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
//                   <TrendingUp size={14} /> +23% from last month
//                 </p>
//               </div>
//               <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
//                 <ShoppingCart size={28} className="text-purple-600" />
//               </div>
//             </div>
//           </div>

//           {/* Categories */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Categories</p>
//                 <h3 className="text-2xl font-bold text-gray-800 mt-1">{categories.length}</h3>
//                 <p className="text-blue-500 text-sm mt-2 flex items-center gap-1">
//                   Active categories
//                 </p>
//               </div>
//               <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
//                 <Filter size={28} className="text-orange-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

//           {/* Table Header */}
//           <div className="p-6 border-b border-gray-100">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800">Product List</h2>
//                 <p className="text-gray-500 text-sm mt-1">
//                   Manage your products inventory
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 {/* Search */}
//                 <div className="relative">
//                   <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   />
//                 </div>

//                 {/* Category Filter */}
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map((cat: any) => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>

//                 {/* Export Button */}
//                 <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
//                   <Download size={18} />
//                   Export
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="text-left p-4 font-semibold text-gray-600 text-sm">
//                     <input type="checkbox" className="rounded border-gray-300" />
//                   </th>
//                   <th className="text-left p-4 font-semibold text-gray-600 text-sm">Product</th>
//                   <th className="text-left p-4 font-semibold text-gray-600 text-sm">Category</th>
//                   <th className="text-left p-4 font-semibold text-gray-600 text-sm">Price</th>
//                   <th className="text-left p-4 font-semibold text-gray-600 text-sm">Discount</th>
//                   <th className="text-left p-4 font-semibold text-gray-600 text-sm">Stock</th>
//                   <th className="text-left p-4 font-semibold text-gray-600 text-sm">Status</th>
//                   <th className="text-left p-4 font-semibold text-gray-600 text-sm">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts?.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="p-8 text-center">
//                       <div className="flex flex-col items-center">
//                         <Package size={48} className="text-gray-300 mb-3" />
//                         <p className="text-gray-500 font-medium">No products found</p>
//                         <p className="text-gray-400 text-sm">Try adjusting your search or filter</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredProducts?.map((product: any, index: number) => (
//                     <tr
//                       key={product._id}
//                       className={`border-b border-gray-100 hover:bg-blue-50/50 transition ${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
//                       }`}
//                     >
//                       <td className="p-4">
//                         <input type="checkbox" className="rounded border-gray-300" />
//                       </td>

//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
//                             <Package size={20} className="text-gray-500" />
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-800 line-clamp-1">{product.title}</p>
//                             <p className="text-gray-400 text-sm line-clamp-1 max-w-[200px]">
//                               {product.description}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="p-4">
//                         <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
//                           {product.category}
//                         </span>
//                       </td>

//                       <td className="p-4">
//                         <span className="font-semibold text-gray-800">Rs {product.price}</span>
//                       </td>

//                       <td className="p-4">
//                         {product.discountPrice ? (
//                           <div className="flex items-center gap-2">
//                             <span className="font-semibold text-green-600">Rs {product.discountPrice}</span>
//                             <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
//                               {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
//                             </span>
//                           </div>
//                         ) : (
//                           <span className="text-gray-400">-</span>
//                         )}
//                       </td>

//                        <td className="p-4">
//                         <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
//                           {product.stock}
//                            {/* {product.images} */}
//                         </span>
//                       </td>

//                       <td className="p-4">
//                         <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit">
//                           <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                           Active
//                         </span>
//                       </td>

//                       <td className="p-4">
//                         <div className="flex items-center gap-1">
//                           <button
//                             className="p-2 hover:bg-blue-100 rounded-lg transition group"
//                             title="View"
//                               onClick={() => navigate(`/view/${product._id}`)}
//                           >
//                             <Eye size={18} className="text-gray-400 group-hover:text-blue-600" />
//                           </button>
//                           <button
//                             className="p-2 hover:bg-green-100 rounded-lg transition group"
//                             title="Edit"
//                                  onClick={() => navigate(`/edit/${product._id}`)}
//                           >
//                             <Edit size={18} className="text-gray-400 group-hover:text-green-600" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(product._id, product.title)}
//                             disabled={isDeleting}
//                             className="p-2 hover:bg-red-100 rounded-lg transition group disabled:opacity-50"
//                             title="Delete"
//                           >
//                             <Trash2 size={18} className="text-gray-400 group-hover:text-red-600" />
//                           </button>
//                           <button
//                             className="p-2 hover:bg-gray-100 rounded-lg transition"
//                             title="More"
//                           >
//                             <MoreVertical size={18} className="text-gray-400" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
//             <p className="text-gray-500 text-sm">
//               Showing <span className="font-semibold text-gray-700">1-{filteredProducts?.length}</span> of{" "}
//               <span className="font-semibold text-gray-700">{products?.length}</span> products
//             </p>

//             <div className="flex items-center gap-2">
//               <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
//                 <ChevronLeft size={18} />
//               </button>
//               <button className="w-10 h-10 bg-blue-600 text-white rounded-lg font-medium">1</button>
//               <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium text-gray-600">2</button>
//               <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium text-gray-600">3</button>
//               <span className="px-2 text-gray-400">...</span>
//               <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium text-gray-600">10</button>
//               <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inventory;







import { useState } from "react";
import {
    Edit,
    Trash2,
    Search,
    Plus,
    Filter,
    Download,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Package,
    DollarSign,
    TrendingUp,
    ShoppingCart,
    Eye,
    AlertCircle,
    LayoutGrid,
    List,
    Calendar,
    Bell,
    Settings,
    ChevronDown,
    Sparkles,
    BarChart3,
    // ArrowUpRight,
    // ArrowDownRight,
    // MoreVertical,
    //   TrendingDown,
    // Users,
    // Star,
    // Loader2,
    // CheckCircle2,
    // XCircle,
    // Clock,
    // Zap,
} from "lucide-react";
import { useGetProductsQuery, useDeleteProductMutation } from "../api/fechingapi";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
    const { data: products, error, isLoading, refetch } = useGetProductsQuery();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1)
    const perpage = 15;

   


    const Api = import.meta.env.VITE_API_URL as string;



    const ImageByIndexUrl = (productId: string, index: number = 0) => {
        return `${Api}/api/${productId}/img/${index}`;
    };


    // Filter products
    const filteredProducts = products?.filter((product: any) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });


    const categories = [...new Set(products?.map((p: any) => p.category) || [])];


     const indexOfLastPage = currentPage * perpage;
    const indexOfFirstPage = indexOfLastPage - perpage;

    const currentProdcuts = filteredProducts?.slice(indexOfFirstPage, indexOfLastPage)
    const totalPage = Math.ceil((filteredProducts?.length || 0) / perpage)

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            await deleteProduct(id);
        }
    };


    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setTimeout(() => setIsRefreshing(false), 1000);
    };


    const totalRevenue = products?.reduce((acc: number, p: any) => acc + (p.discountPrice || p.price), 0) || 0;
    const totalStock = products?.reduce((acc: number, p: any) => acc + (p.stock || 0), 0) || 0;
    const lowStockProducts = products?.filter((p: any) => p.stock < 10).length || 0;


    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Package size={28} className="text-purple-600" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 font-medium">Loading Inventory...</p>
                    <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-gray-100">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to Load Data</h2>
                        <p className="text-gray-500 mb-6">
                            {(error as any)?.data?.message || "Something went wrong while fetching products."}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => refetch()}
                            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-200 transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={18} />
                            Try Again
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 font-semibold hover:bg-gray-50 transition-all"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen ml-64 bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
                                <BarChart3 size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Inventory</h1>
                                <p className="text-gray-500 text-sm">Welcome back, Admin! 👋</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                     
                        <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all">
                            <Calendar size={18} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Last 30 days</span>
                            <ChevronDown size={16} className="text-gray-400" />
                        </button>

                      
                        <button
                            onClick={handleRefresh}
                            className="p-2.5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
                        >
                            <RefreshCw size={20} className={`text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>

               
                        <button className="relative p-2.5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all">
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {/* Add Product */}
                        <button
                            onClick={() => navigate("/form")}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 hover:-translate-y-0.5 transition-all"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">Add Product</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {/* Total Products */}
                    <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Products</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">{products?.length || 0}</h3>
                                <div className="flex items-center gap-1.5 mt-3">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                        <TrendingUp size={12} />
                                        +12%
                                    </div>
                                    <span className="text-gray-400 text-xs">vs last month</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
                                <Package size={28} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Total Revenue */}
                    <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                    ₹{totalRevenue.toLocaleString()}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-3">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                        <TrendingUp size={12} />
                                        +8.2%
                                    </div>
                                    <span className="text-gray-400 text-xs">vs last month</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                                <DollarSign size={28} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-4/5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Total Stock */}
                    <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Stock</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">{totalStock}</h3>
                                <div className="flex items-center gap-1.5 mt-3">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                                        <AlertCircle size={12} />
                                        {lowStockProducts} low
                                    </div>
                                    <span className="text-gray-400 text-xs">items need restock</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                <ShoppingCart size={28} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Categories</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">{categories.length}</h3>
                                <div className="flex items-center gap-1.5 mt-3">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                        <Sparkles size={12} />
                                        Active
                                    </div>
                                    <span className="text-gray-400 text-xs">all categories</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                                <Filter size={28} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { icon: Plus, label: "Add Product", color: "from-purple-500 to-fuchsia-600", action: () => navigate("/form") },
                        { icon: Download, label: "Export Data", color: "from-blue-500 to-cyan-600", action: () => { } },
                        { icon: BarChart3, label: "Analytics", color: "from-emerald-500 to-green-600", action: () => { } },
                        { icon: Settings, label: "Settings", color: "from-gray-600 to-gray-700", action: () => { } },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                        >
                            <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <item.icon size={20} className="text-white" />
                            </div>
                            <span className="font-medium text-gray-700">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">

                    {/* Table Header */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center">
                                    <Package size={20} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Product Inventory</h2>
                                    <p className="text-gray-500 text-sm">
                                        {filteredProducts?.length || 0} of {products?.length || 0} products
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Search */}
                                <div className="relative">
                                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="relative">
                                    <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white cursor-pointer appearance-none w-full sm:w-auto"
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map((cat: any) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* View Toggle */}
                                <div className="flex bg-gray-100 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode("table")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "table" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                                    >
                                        <List size={20} className={viewMode === "table" ? "text-purple-600" : "text-gray-500"} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                                    >
                                        <LayoutGrid size={20} className={viewMode === "grid" ? "text-purple-600" : "text-gray-500"} />
                                    </button>
                                </div>

                                {/* Export */}
                                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all font-medium text-gray-700">
                                    <Download size={18} />
                                    <span className="hidden sm:inline">Export</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table View */}
                    {viewMode === "table" ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <th className="text-left p-4 font-semibold text-gray-600 text-sm">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                                        </th>
                                        <th className="text-left p-4 font-semibold text-gray-600 text-sm">Product</th>
                                        <th className="text-left p-4 font-semibold text-gray-600 text-sm">Category</th>
                                        <th className="text-left p-4 font-semibold text-gray-600 text-sm">Price</th>
                                        <th className="text-left p-4 font-semibold text-gray-600 text-sm">Stock</th>
                                        <th className="text-left p-4 font-semibold text-gray-600 text-sm">Status</th>
                                        <th className="text-left p-4 font-semibold text-gray-600 text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts?.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="p-12 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                        <Package size={40} className="text-gray-300" />
                                                    </div>
                                                    <p className="text-gray-600 font-semibold text-lg">No products found</p>
                                                    <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
                                                    <button
                                                        onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                                                        className="mt-4 px-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-lg transition-all"
                                                    >
                                                        Clear filters
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentProdcuts?.map((product: any, index: number) => (
                                            <tr
                                                key={product._id}
                                                className="border-b border-gray-100 hover:bg-purple-50/50 transition-all group"
                                            >
                                                <td className="p-4">
                                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                                                </td>

                                                <td className="p-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-xl flex items-center justify-center overflow-hidden">
                                                            {product.images?.[0] ? (
                                                                <img
                                                                    // src={product.images[0]} 
                                                                    src={ImageByIndexUrl(product._id, 0)}
                                                                    alt={product.title}
                                                                    className="w-full h-full object-cover"

                                                                    onError={(e) => {
                                                                        console.log("Image load failed:", ImageByIndexUrl(product._id, 0));
                                                                        e.currentTarget.style.display = "none";
                                                                    }}
                                                                />

                                                            ) : (
                                                                <Package size={24} className="text-purple-400" />
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-gray-800 truncate max-w-[200px]">{product.title}</p>
                                                            <p className="text-gray-400 text-sm truncate max-w-[200px]">
                                                                {product.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="p-4">
                                                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                                                        {product.category}
                                                    </span>
                                                </td>

                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        {product.discountPrice ? (
                                                            <>
                                                                <span className="font-bold text-emerald-600">₹{product.discountPrice}</span>
                                                                <span className="text-gray-400 text-sm line-through">₹{product.price}</span>
                                                            </>
                                                        ) : (
                                                            <span className="font-bold text-gray-800">₹{product.price}</span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-semibold ${product.stock < 10 ? 'text-amber-600' : 'text-gray-800'}`}>
                                                            {product.stock}
                                                        </span>
                                                        {product.stock < 10 && (
                                                            <span className="px-2 py-0.5 bg-amber-100 text-amber-600 rounded text-xs font-medium">
                                                                Low
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="p-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${product.stock > 0
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </td>

                                                <td className="p-4">
                                                    <div
                                                        // className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        // className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        className="flex items-center gap-1 "

                                                    >
                                                        <button
                                                            onClick={() => navigate(`/view/${product._id}`)}
                                                            className="p-2.5 hover:bg-blue-100 rounded-xl transition-all"
                                                            title="View"
                                                        >
                                                            <Eye size={18} className="text-blue-600" />
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/edit/${product._id}`)}
                                                            className="p-2.5 hover:bg-emerald-100 rounded-xl transition-all"
                                                            title="Edit"
                                                        >
                                                            <Edit size={18} className="text-emerald-600" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product._id, product.title)}
                                                            disabled={isDeleting}
                                                            className="p-2.5 hover:bg-red-100 rounded-xl transition-all disabled:opacity-50"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={18} className="text-red-600" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Grid View */
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts?.map((product: any) => (
                                    <div
                                        key={product._id}
                                        className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-fuchsia-100">
                                            {product.images?.[0] ? (
                                                <img

                                                    // src={product.images[0]} 

                                                    src={ImageByIndexUrl(product._id, 0)}

                                                    alt={product.title} className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        console.log("Image load failed:", ImageByIndexUrl(product._id, 0));
                                                        e.currentTarget.style.display = "none";
                                                    }}

                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package size={48} className="text-purple-300" />
                                                </div>
                                            )}

                                            {/* Discount Badge */}
                                            {product.discountPrice && (
                                                <span className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-lg">
                                                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                                </span>
                                            )}

                                            {/* Quick Actions */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/view/${product._id}`)}
                                                    className="p-3 bg-white rounded-xl hover:scale-110 transition-transform"
                                                >
                                                    <Eye size={20} className="text-gray-700" />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/edit/${product._id}`)}
                                                    className="p-3 bg-white rounded-xl hover:scale-110 transition-transform"
                                                >
                                                    <Edit size={20} className="text-gray-700" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id, product.title)}
                                                    className="p-3 bg-white rounded-xl hover:scale-110 transition-transform"
                                                >
                                                    <Trash2 size={20} className="text-red-500" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-md">
                                                {product.category}
                                            </span>
                                            <h3 className="font-semibold text-gray-800 mt-2 truncate">{product.title}</h3>
                                            <p className="text-gray-400 text-sm mt-1 truncate">{product.description}</p>

                                            <div className="flex items-center justify-between mt-4">
                                                <div>
                                                    {product.discountPrice ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg font-bold text-emerald-600">₹{product.discountPrice}</span>
                                                            <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                                                    )}
                                                </div>
                                                <span className={`text-sm font-medium ${product.stock < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                                                    Stock: {product.stock}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                 
                    <div className="p-4 md:p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
                        <p className="text-gray-500 text-sm">
                            Showing {indexOfFirstPage + 1}-{Math.min(indexOfLastPage, filteredProducts?.length || 0)}                            <span className="font-semibold text-gray-700">{products?.length}</span> products
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-xl font-medium transition-all ${page === currentPage
                                            ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <span className="px-2 text-gray-400">...</span>

                            <button className="w-10 h-10 bg-white border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-all">
                                10
                            </button>

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                                disabled={currentPage === totalPage}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
};

export default Inventory;