// // import React, { useEffect, useState, useMemo } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useGetViewQuery, useUpdateProductMutation, useDeleteProductMutation } from "../api/fechingapi";
// // import {
// //   Package,
// //   Tag,
// //   FileText,
// //   Percent,
// //   ImageIcon,
// //   Check,
// //   AlertCircle,
// //   Loader2,
// //   ArrowLeft,
// //   Save,
// //   X,
// //   Trash2,
// //   RefreshCw,
// //   Edit3,
// //   DollarSign,
// //   Layers,
// // } from "lucide-react";

// // type ProductFromApi = {
// //   _id: string;
// //   category?: string;
// //   title?: string;
// //   description?: string;
// //   stock?: number;
// //   price?: number;
// //   discountPrice?: number;
// //   images?: any[];
// // };

// // const Edit: React.FC = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();


// //   const { data, isLoading, isError, error, refetch } = useGetViewQuery(id!, {
// //     skip: !id,
// //   });

// //   const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

// //   const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

// //   const product: ProductFromApi | undefined = useMemo(() => {
// //     if (!data) return undefined;
// //     return (data as any)?.data ?? (data as any)?.product ?? data;
// //   }, [data]);


// //   const [formData, setFormData] = useState({
// //     category: "",
// //     title: "",
// //     description: "",
// //     images: [] as File[],
// //     stock: "",
// //     price: "",
// //     discountPrice: "",
// //   });


// //   const [existingImages, setExistingImages] = useState<string[]>([]);
// //   const [removedImages, setRemovedImages] = useState<string[]>([]);


// //   const [errors, setErrors] = useState<Record<string, string>>({});
// //   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
// //   const [isDataLoaded, setIsDataLoaded] = useState(false);

// //   const Api = import.meta.env.VITE_API_URL;

// //   const categories = useMemo(
// //     () => [
// //       { value: "Decorative-Lights", label: "🔆 Decorative Lights", icon: "💡" },
// //       { value: "Indoor-Plants", label: "🌿 Indoor Plants", icon: "🪴" },
// //       { value: "Curtains", label: "🪟 Curtains", icon: "🪟" },
// //       { value: "Cushions", label: "🛋️ Cushions", icon: "🛋️" },
// //       { value: "Lighting", label: "💡 Lighting", icon: "💡" },
// //       { value: "Wall-Art", label: "🖼️ Wall Art", icon: "🖼️" },
// //     ],
// //     []
// //   );


// //   useEffect(() => {
// //     if (!product) return;

// //     setFormData({
// //       category: product.category || "",
// //       title: product.title || "",
// //       description: product.description || "",
// //       stock: product.stock != null ? String(product.stock) : "",
// //       price: product.price != null ? String(product.price) : "",
// //       discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
// //       images: [],
// //     });

// //     const imgs = Array.isArray(product.images)
// //       ? product.images.map((x: any) => (typeof x === "string" ? x : x?._id || String(x)))
// //       : [];
// //     setExistingImages(imgs);
// //     setIsDataLoaded(true);
// //   }, [product]);

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
// //   };

// //   const validateForm = () => {
// //     const newErrors: Record<string, string> = {};

// //     if (!formData.category) newErrors.category = "Please select a category";
// //     if (!formData.title.trim()) newErrors.title = "Title is required";
// //     if (!formData.description.trim()) newErrors.description = "Description is required";
// //     if (!formData.price || parseFloat(formData.price) <= 0) {
// //       newErrors.price = "Valid price is required";
// //     }
// //     if (!formData.stock || parseInt(formData.stock) < 0) {
// //       newErrors.stock = "Valid stock quantity is required";
// //     }
// //     if (
// //       formData.discountPrice &&
// //       formData.price &&
// //       parseFloat(formData.discountPrice) >= parseFloat(formData.price)
// //     ) {
// //       newErrors.discountPrice = "Discount price must be less than original price";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (!e.target.files) return;
// //     const newFiles = Array.from(e.target.files);
// //     setFormData((prev) => ({ ...prev, images: [...prev.images, ...newFiles] }));
// //     e.target.value = "";
// //   };

// //   const handleRemoveNewImage = (index: number) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       images: prev.images.filter((_, i) => i !== index),
// //     }));
// //   };

// //   const handleRemoveExistingImage = (imgId: string, index: number) => {
// //     setExistingImages((prev) => prev.filter((_, i) => i !== index));
// //     setRemovedImages((prev) => [...prev, imgId]);
// //   };

// //   const calculateDiscount = () => {
// //     if (formData.price && formData.discountPrice) {
// //       const original = parseFloat(formData.price);
// //       const discount = parseFloat(formData.discountPrice);
// //       if (!original || discount >= original) return "0";
// //       const percentage = ((original - discount) / original) * 100;
// //       return percentage.toFixed(0);
// //     }
// //     return "0";
// //   };



// //   const imageUrl = (productId: string, index: number) => `${Api}/api/${productId}/img/${index}`;


// //   const getCategoryInfo = (value: string) => {
// //     return categories.find((c) => c.value === value);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!validateForm()) {
// //       setSubmitStatus("error");
// //       return;
// //     }

// //     if (!id) return;

// //     try {

// //       const FD = new FormData();
// //       FD.append("category", formData.category);
// //       FD.append("title", formData.title);
// //       FD.append("description", formData.description);
// //       FD.append("stock", formData.stock);
// //       FD.append("price", formData.price);
// //       FD.append("discountPrice", formData.discountPrice);



// //       formData.images.forEach((file) => {
// //         FD.append("images", file);
// //       });
// //       if (removedImages.length > 0) {
// //         FD.append("removedImages", JSON.stringify(removedImages));
// //       }
// //       FD.append("existingImages", JSON.stringify(existingImages));

// //       await updateProduct({ id, formData: FD }).unwrap();

// //       setSubmitStatus("success");
// //       setTimeout(() => {
// //         navigate("/");
// //       }, 1500);
// //       alert("submit")
// //     } catch (err) {
// //       console.error("Update failed:", err);
// //       setSubmitStatus("error");
// //       alert("error")
// //     }
// //   };

// //   const handleReset = () => {
// //     if (product) {
// //       setFormData({
// //         category: product.category || "",
// //         title: product.title || "",
// //         description: product.description || "",
// //         stock: product.stock != null ? String(product.stock) : "",
// //         price: product.price != null ? String(product.price) : "",
// //         discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
// //         images: [],
// //       });

// //       const imgs = Array.isArray(product.images)
// //         ? product.images.map((x: any) => (typeof x === "string" ? x : x?._id || String(x)))
// //         : [];
// //       setExistingImages(imgs);
// //       setRemovedImages([]);
// //       setErrors({});
// //       setSubmitStatus("idle");
// //     }
// //   };

// //  const handleDelete = async (id: string,title:string) => {
// //   try {
// //     if (!id) {
// //       console.log("Id Missing");
// //       return;
// //     }

// //     const res = await deleteProduct(id).unwrap();
// //     console.log("Delete response:", res);
// //    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
// //       await deleteProduct(id);
// //     }

// //     navigate("/");
// //   } catch (error: any) {
// //     console.log("Delete error:", error);
// //   }
// // };

// //   // ===== LOADING STATE =====
// //   if (!id) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //         <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
// //           <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
// //           <p className="text-gray-700 text-lg font-semibold">Invalid Route</p>
// //           <p className="text-gray-500 text-sm mt-2">Product ID is missing</p>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // if (isLoading) {
// //   //   return (
// //   //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //   //       <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
// //   //         <Loader2 size={48} className="mx-auto text-blue-600 animate-spin mb-4" />
// //   //         <p className="text-gray-700 text-lg font-semibold">Loading Product</p>
// //   //         <p className="text-gray-500 text-sm mt-2">Please wait...</p>
// //   //       </div>
// //   //     </div>
// //   //   );
// //   // }

// //   // Beautiful Animated Rings Loading
// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
// //         {/* Background Animation */}
// //         <div className="absolute inset-0">
// //           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
// //           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
// //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
// //         </div>

// //         <div className="relative z-10 text-center">
// //           {/* Animated Rings */}
// //           <div className="relative w-32 h-32 mx-auto mb-8">
// //             <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
// //             <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
// //             <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-pink-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
// //             <div className="absolute inset-6 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" style={{ animationDuration: '2s' }}></div>
// //             <div className="absolute inset-9 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2.5s' }}></div>

// //             {/* Center Icon */}
// //             <div className="absolute inset-0 flex items-center justify-center">
// //               <Package size={24} className="text-white animate-pulse" />
// //             </div>
// //           </div>

// //           {/* Text */}
// //           <h2 className="text-2xl font-bold text-white mb-2">Loading Product</h2>
// //           <p className="text-white/60">Please wait while we fetch the details...</p>

// //           {/* Animated Dots */}
// //           <div className="flex justify-center gap-2 mt-6">
// //             <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
// //             <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
// //             <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (isError || !product) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
// //         <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl">
// //           <div className="text-center">
// //             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <AlertCircle size={32} className="text-red-600" />
// //             </div>
// //             <h2 className="text-xl font-bold text-gray-800">Failed to Load Product</h2>
// //             <p className="text-sm text-gray-600 mt-2">
// //               {(error as any)?.data?.message || (error as any)?.message || "Unknown error occurred"}
// //             </p>
// //           </div>
// //           <div className="flex gap-3 mt-6">
// //             <button
// //               onClick={() => refetch()}
// //               className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
// //             >
// //               <RefreshCw size={18} />
// //               Retry
// //             </button>
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition"
// //             >
// //               Go Back
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ===== MAIN UI =====
// //   return (
// //     <div className="min-h-screen ml-64 bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
// //             <Edit3 size={32} className="text-white" />
// //           </div>
// //           <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Product</h1>
// //           <p className="text-gray-500">
// //             Update product details for ID:{" "}
// //             <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{product._id}</span>
// //           </p>
// //         </div>

// //         {/* Success Alert */}
// //         {submitStatus === "success" && (
// //           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-pulse">
// //             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
// //               <Check size={20} className="text-green-600" />
// //             </div>
// //             <div>
// //               <p className="font-semibold text-green-800">Product Updated Successfully!</p>
// //               <p className="text-sm text-green-600">Redirecting to product list...</p>
// //             </div>
// //           </div>
// //         )}

// //         {/* Error Alert */}
// //         {submitStatus === "error" && Object.keys(errors).length === 0 && (
// //           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
// //             <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
// //               <AlertCircle size={20} className="text-red-600" />
// //             </div>
// //             <div>
// //               <p className="font-semibold text-red-800">Update Failed!</p>
// //               <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
// //             </div>
// //           </div>
// //         )}

// //         {/* Data Loaded Indicator */}
// //         {isDataLoaded && submitStatus === "idle" && (
// //           <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
// //             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// //               <Check size={20} className="text-blue-600" />
// //             </div>
// //             <div>
// //               <p className="font-semibold text-blue-800">Data Loaded Successfully!</p>
// //               <p className="text-sm text-blue-600">You can now edit the product details below.</p>
// //             </div>
// //           </div>
// //         )}

// //         {/* 2 Column Layout */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* LEFT: Form */}
// //           <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
// //             <form onSubmit={handleSubmit}>
// //               {/* Form Header */}
// //               <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6">
// //                 <h2 className="text-xl font-bold text-white flex items-center gap-2">
// //                   <FileText size={24} />
// //                   Product Information
// //                 </h2>
// //                 <p className="text-orange-100 text-sm mt-1">Update the fields below and save changes</p>
// //               </div>

// //               <div className="p-8 space-y-6">
// //                 {/* Category */}
// //                 <div>
// //                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                     <Tag size={18} className="text-orange-500" />
// //                     Category *
// //                   </label>
// //                   <div className="relative">
// //                     <select
// //                       name="category"
// //                       value={formData.category}
// //                       onChange={handleChange}
// //                       className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition appearance-none bg-white cursor-pointer ${errors.category
// //                           ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                           : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                         }`}
// //                     >
// //                       <option value="">Select a category</option>
// //                       {categories.map((cat) => (
// //                         <option key={cat.value} value={cat.value}>
// //                           {cat.label}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
// //                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //                       </svg>
// //                     </div>
// //                   </div>
// //                   {errors.category && (
// //                     <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                       <AlertCircle size={14} />
// //                       {errors.category}
// //                     </p>
// //                   )}
// //                   {formData.category && (
// //                     <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
// //                       <span>{getCategoryInfo(formData.category)?.icon}</span>
// //                       Selected: {getCategoryInfo(formData.category)?.label}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Title */}
// //                 <div>
// //                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                     <Package size={18} className="text-orange-500" />
// //                     Product Title *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="title"
// //                     value={formData.title}
// //                     onChange={handleChange}
// //                     placeholder="e.g., Modern LED Desk Lamp"
// //                     className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition ${errors.title
// //                         ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                         : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                       }`}
// //                   />
// //                   {errors.title && (
// //                     <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                       <AlertCircle size={14} />
// //                       {errors.title}
// //                     </p>
// //                   )}
// //                   <p className="mt-2 text-sm text-gray-500">{formData.title.length}/100 characters</p>
// //                 </div>

// //                 {/* Description */}
// //                 <div>
// //                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                     <FileText size={18} className="text-orange-500" />
// //                     Description *
// //                   </label>
// //                   <textarea
// //                     name="description"
// //                     value={formData.description}
// //                     onChange={handleChange}
// //                     rows={4}
// //                     placeholder="Describe your product features, materials, dimensions, etc."
// //                     className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition resize-none ${errors.description
// //                         ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                         : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                       }`}
// //                   />
// //                   {errors.description && (
// //                     <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                       <AlertCircle size={14} />
// //                       {errors.description}
// //                     </p>
// //                   )}
// //                   <p className="mt-2 text-sm text-gray-500">{formData.description.length}/500 characters</p>
// //                 </div>

// //                 {/* Images + Stock */}
// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   {/* Images */}
// //                   <div>
// //                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                       <ImageIcon size={18} className="text-orange-500" />
// //                       Product Images
// //                     </label>

// //                     <input
// //                       type="file"
// //                       name="images"
// //                       accept="image/png, image/jpeg, image/webp"
// //                       onChange={handleImageChange}
// //                       multiple
// //                       className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 cursor-pointer hover:border-orange-400 transition"
// //                     />

// //                     {/* Existing Images */}
// //                     {existingImages.length > 0 && (
// //                       <div className="mt-4">
// //                         <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
// //                           <Layers size={12} />
// //                           Existing Images ({existingImages.length})
// //                         </p>
// //                         <div className="grid grid-cols-3 gap-3">
// //                           {existingImages.map((imgId, index) => (
// //                             <div key={imgId} className="relative group">
// //                               <img
// //                                 src={imageUrl(product._id, index)}
// //                                 className="h-20 w-full object-cover rounded-lg border-2 border-gray-200"
// //                                 alt={`Existing ${index + 1}`}
// //                                 onError={(e) => {
// //                                   (e.currentTarget as HTMLImageElement).src =
// //                                     "https://via.placeholder.com/150?text=Image";
// //                                 }}
// //                               />
// //                               <button
// //                                 type="button"
// //                                 onClick={() => handleRemoveExistingImage(imgId, index)}
// //                                 className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition shadow-lg"
// //                               >
// //                                 <X size={14} />
// //                               </button>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}

// //                     {/* New Images Preview */}
// //                     {formData.images.length > 0 && (
// //                       <div className="mt-4">
// //                         <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
// //                           <ImageIcon size={12} />
// //                           New Images ({formData.images.length})
// //                         </p>
// //                         <div className="grid grid-cols-3 gap-3">
// //                           {formData.images.map((img, index) => (
// //                             <div key={index} className="relative group">
// //                               <img
// //                                 src={URL.createObjectURL(img)}
// //                                 className="h-20 w-full object-cover rounded-lg border-2 border-orange-300"
// //                                 alt="New"
// //                               />
// //                               <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded font-medium">
// //                                 NEW
// //                               </div>
// //                               <button
// //                                 type="button"
// //                                 onClick={() => handleRemoveNewImage(index)}
// //                                 className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition shadow-lg"
// //                               >
// //                                 <X size={14} />
// //                               </button>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}

// //                     {existingImages.length === 0 && formData.images.length === 0 && (
// //                       <div className="mt-4 p-6 border-2 border-dashed border-gray-200 rounded-xl text-center">
// //                         <ImageIcon size={32} className="mx-auto text-gray-300 mb-2" />
// //                         <p className="text-gray-400 text-sm">No images uploaded</p>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Stock */}
// //                   <div>
// //                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                       <Layers size={18} className="text-orange-500" />
// //                       Available Stock *
// //                     </label>
// //                     <input
// //                       type="number"
// //                       name="stock"
// //                       value={formData.stock}
// //                       onChange={handleChange}
// //                       placeholder="Enter stock quantity"
// //                       min="0"
// //                       className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition ${errors.stock
// //                           ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                           : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                         }`}
// //                     />
// //                     {errors.stock && (
// //                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                         <AlertCircle size={14} />
// //                         {errors.stock}
// //                       </p>
// //                     )}

// //                     {/* Stock Status */}
// //                     {formData.stock && (
// //                       <div className="mt-3">
// //                         {parseInt(formData.stock) === 0 ? (
// //                           <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium">
// //                             <AlertCircle size={14} />
// //                             Out of Stock
// //                           </span>
// //                         ) : parseInt(formData.stock) <= 5 ? (
// //                           <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
// //                             <AlertCircle size={14} />
// //                             Low Stock Warning
// //                           </span>
// //                         ) : (
// //                           <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
// //                             <Check size={14} />
// //                             In Stock
// //                           </span>
// //                         )}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Pricing Grid */}
// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   {/* Original Price */}
// //                   <div>
// //                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                       <DollarSign size={18} className="text-orange-500" />
// //                       Original Price *
// //                     </label>
// //                     <div className="relative">
// //                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
// //                         Rs
// //                       </span>
// //                       <input
// //                         type="number"
// //                         name="price"
// //                         value={formData.price}
// //                         onChange={handleChange}
// //                         placeholder="0.00"
// //                         step="0.01"
// //                         min="0"
// //                         className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition ${errors.price
// //                             ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                             : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                           }`}
// //                       />
// //                     </div>
// //                     {errors.price && (
// //                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                         <AlertCircle size={14} />
// //                         {errors.price}
// //                       </p>
// //                     )}
// //                   </div>

// //                   {/* Discount Price */}
// //                   <div>
// //                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                       <Percent size={18} className="text-green-600" />
// //                       Discount Price
// //                     </label>
// //                     <div className="relative">
// //                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
// //                         Rs
// //                       </span>
// //                       <input
// //                         type="number"
// //                         name="discountPrice"
// //                         value={formData.discountPrice}
// //                         onChange={handleChange}
// //                         placeholder="0.00"
// //                         step="0.01"
// //                         min="0"
// //                         className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition ${errors.discountPrice
// //                             ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                             : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
// //                           }`}
// //                       />
// //                     </div>
// //                     {errors.discountPrice && (
// //                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                         <AlertCircle size={14} />
// //                         {errors.discountPrice}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Discount Preview */}
// //                 {formData.price &&
// //                   formData.discountPrice &&
// //                   parseFloat(formData.discountPrice) < parseFloat(formData.price) && (
// //                     <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="text-sm text-green-700 font-medium">Discount Applied</p>
// //                           <p className="text-xs text-green-600 mt-0.5">
// //                             Customers save Rs{" "}
// //                             {(parseFloat(formData.price) - parseFloat(formData.discountPrice)).toFixed(2)}
// //                           </p>
// //                         </div>
// //                         <div className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-lg">
// //                           {calculateDiscount()}% OFF
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}

// //                 {/* Price Preview Card */}
// //                 {formData.price && (
// //                   <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl border-2 border-orange-100">
// //                     <p className="text-sm font-semibold text-gray-600 mb-3">Price Preview</p>
// //                     <div className="flex items-baseline gap-3">
// //                       {formData.discountPrice &&
// //                         parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
// //                         <>
// //                           <span className="text-3xl font-bold text-green-600">
// //                             Rs {formData.discountPrice}
// //                           </span>
// //                           <span className="text-xl text-gray-400 line-through">Rs {formData.price}</span>
// //                           <span className="px-2 py-1 bg-green-600 text-white text-sm font-bold rounded">
// //                             {calculateDiscount()}% OFF
// //                           </span>
// //                         </>
// //                       ) : (
// //                         <span className="text-3xl font-bold text-orange-600">Rs {formData.price}</span>
// //                       )}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Action Buttons */}
// //                 <div className="pt-6 border-t border-gray-200">
// //                   <div className="flex flex-wrap items-center justify-between gap-4">
// //                     {/* Left Buttons */}
// //                     <div className="flex gap-3">
// //                       <button
// //                         type="button"
// //                         onClick={() => navigate(-1)}
// //                         className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-medium"
// //                       >
// //                         <ArrowLeft size={18} />
// //                         Back
// //                       </button>
// //                       <button
// //                         type="button"
// //                         onClick={handleReset}
// //                         className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-medium text-gray-600"
// //                       >
// //                         <RefreshCw size={18} />
// //                         Reset
// //                       </button>
// //                     </div>

// //                     {/* Right Buttons */}
// //                     <button
// //                       type="submit"
// //                       disabled={isUpdating}
// //                       className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {isUpdating ? (
// //                         <>
// //                           <Loader2 size={20} className="animate-spin" />
// //                           Updating...
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Save size={20} />
// //                           Save Changes
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>

// //                   <p className="text-center text-sm text-gray-500 mt-4">
// //                     Review all changes before saving
// //                   </p>
// //                 </div>
// //               </div>
// //             </form>
// //           </div>

// //           {/* RIGHT: Sidebar */}
// //           <div className="space-y-6">
// //             {/* Quick Summary Card */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
// //               <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
// //                 <Package size={20} className="text-orange-500" />
// //                 Quick Summary
// //               </h3>

// //               <div className="space-y-4">
// //                 {/* Title */}
// //                 <div className="pb-3 border-b border-gray-100">
// //                   <p className="text-xs text-gray-500 uppercase tracking-wide">Title</p>
// //                   <p className="font-medium text-gray-800 mt-1 truncate">
// //                     {formData.title || <span className="text-gray-400">Not set</span>}
// //                   </p>
// //                 </div>

// //                 {/* Category */}
// //                 <div className="pb-3 border-b border-gray-100">
// //                   <p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
// //                   <p className="font-medium text-gray-800 mt-1">
// //                     {getCategoryInfo(formData.category)?.label || (
// //                       <span className="text-gray-400">Not selected</span>
// //                     )}
// //                   </p>
// //                 </div>

// //                 {/* Stock */}
// //                 <div className="pb-3 border-b border-gray-100">
// //                   <p className="text-xs text-gray-500 uppercase tracking-wide">Stock</p>
// //                   <p
// //                     className={`font-semibold mt-1 ${parseInt(formData.stock) > 10
// //                         ? "text-green-600"
// //                         : parseInt(formData.stock) > 0
// //                           ? "text-yellow-600"
// //                           : "text-red-600"
// //                       }`}
// //                   >
// //                     {formData.stock || "0"} units
// //                   </p>
// //                 </div>

// //                 {/* Price */}
// //                 <div className="pb-3 border-b border-gray-100">
// //                   <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
// //                   <div className="mt-1">
// //                     {formData.discountPrice &&
// //                       parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
// //                       <div className="flex items-baseline gap-2">
// //                         <span className="font-bold text-green-600">Rs {formData.discountPrice}</span>
// //                         <span className="text-sm text-gray-400 line-through">Rs {formData.price}</span>
// //                       </div>
// //                     ) : (
// //                       <span className="font-bold text-gray-800">Rs {formData.price || "0"}</span>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Images Count */}
// //                 <div>
// //                   <p className="text-xs text-gray-500 uppercase tracking-wide">Images</p>
// //                   <p className="font-medium text-gray-800 mt-1">
// //                     {existingImages.length + formData.images.length} total
// //                     {formData.images.length > 0 && (
// //                       <span className="text-orange-500 text-sm ml-1">
// //                         (+{formData.images.length} new)
// //                       </span>
// //                     )}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Changes Info Card */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                 <Edit3 size={20} className="text-orange-500" />
// //                 Edit Mode Active
// //               </h3>
// //               <ul className="space-y-2 text-sm text-gray-600">
// //                 <li className="flex items-start gap-2">
// //                   <span className="text-orange-500 mt-0.5">•</span>
// //                   All fields are editable
// //                 </li>
// //                 <li className="flex items-start gap-2">
// //                   <span className="text-orange-500 mt-0.5">•</span>
// //                   Add or remove images
// //                 </li>
// //                 <li className="flex items-start gap-2">
// //                   <span className="text-orange-500 mt-0.5">•</span>
// //                   Update pricing & stock
// //                 </li>
// //                 <li className="flex items-start gap-2">
// //                   <span className="text-orange-500 mt-0.5">•</span>
// //                   Click "Reset" to undo changes
// //                 </li>
// //               </ul>
// //             </div>

// //             {/* Danger Zone */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
// //               <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
// //                 <Trash2 size={20} className="text-red-500" />
// //                 Danger Zone
// //               </h3>
// //               <p className="text-sm text-gray-600 mb-4">
// //                 Permanently delete this product. This action cannot be undone.
// //               </p>
// //               <button
// //                 type="button"
// //                 className="w-full px-4 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-medium hover:bg-red-50 transition flex items-center justify-center gap-2"
// //                 onClick={() => handleDelete(id,formData.title)}
// //                 disabled={isDeleting}
// //               >
// //                 <Trash2 size={16} />
// //                 Delete Product
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Edit;




// // import React, { useEffect, useMemo, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import {
// //   useGetViewQuery,
// //   useUpdateProductMutation,
// //   useDeleteProductMutation,
// // } from "../api/fechingapi";
// // import {
// //   Package,
// //   Tag,
// //   FileText,
// //   Percent,
// //   ImageIcon,
// //   Check,
// //   AlertCircle,
// //   Loader2,
// //   ArrowLeft,
// //   Save,
// //   X,
// //   Trash2,
// //   RefreshCw,
// //   Edit3,
// //   DollarSign,
// //   Layers,
// //   Sparkles,
// // } from "lucide-react";

// // type ProductFromApi = {
// //   _id: string;
// //   category?: string;
// //   title?: string;
// //   description?: string;
// //   stock?: number;
// //   price?: number;
// //   discountPrice?: number;
// //   images?: any[];
// // };

// // const Edit: React.FC = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();

// //   const { data, isLoading, isError, error, refetch } = useGetViewQuery(id!, {
// //     skip: !id,
// //   });

// //   const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
// //   const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

// //   const product: ProductFromApi | undefined = useMemo(() => {
// //     if (!data) return undefined;
// //     return (data as any)?.data ?? (data as any)?.product ?? data;
// //   }, [data]);

// //   const [formData, setFormData] = useState({
// //     category: "",
// //     title: "",
// //     description: "",
// //     images: [] as File[],
// //     stock: "",
// //     price: "",
// //     discountPrice: "",
// //   });

// //   const [existingImages, setExistingImages] = useState<string[]>([]);
// //   const [removedImages, setRemovedImages] = useState<string[]>([]);
// //   const [errors, setErrors] = useState<Record<string, string>>({});
// //   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
// //   const [isDataLoaded, setIsDataLoaded] = useState(false);

// //   const Api = import.meta.env.VITE_API_URL;

// //   const categories = useMemo(
// //     () => [
// //       { value: "Decorative-Lights", label: "🔆 Decorative Lights", icon: "💡" },
// //       { value: "Indoor-Plants", label: "🌿 Indoor Plants", icon: "🪴" },
// //       { value: "Curtains", label: "🪟 Curtains", icon: "🪟" },
// //       { value: "Cushions", label: "🛋️ Cushions", icon: "🛋️" },
// //       { value: "Lighting", label: "💡 Lighting", icon: "💡" },
// //       { value: "Wall-Art", label: "🖼️ Wall Art", icon: "🖼️" },
// //     ],
// //     []
// //   );

// //   useEffect(() => {
// //     if (!product) return;

// //     setFormData({
// //       category: product.category || "",
// //       title: product.title || "",
// //       description: product.description || "",
// //       stock: product.stock != null ? String(product.stock) : "",
// //       price: product.price != null ? String(product.price) : "",
// //       discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
// //       images: [],
// //     });

// //     const imgs = Array.isArray(product.images)
// //       ? product.images.map((x: any) => (typeof x === "string" ? x : x?._id || String(x)))
// //       : [];

// //     setExistingImages(imgs);
// //     setRemovedImages([]);
// //     setIsDataLoaded(true);
// //   }, [product]);

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));

// //     if (errors[name]) {
// //       setErrors((prev) => ({ ...prev, [name]: "" }));
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors: Record<string, string> = {};

// //     if (!formData.category) newErrors.category = "Please select a category";
// //     if (!formData.title.trim()) newErrors.title = "Title is required";
// //     if (!formData.description.trim()) newErrors.description = "Description is required";
// //     if (!formData.price || parseFloat(formData.price) <= 0) {
// //       newErrors.price = "Valid price is required";
// //     }
// //     if (!formData.stock || parseInt(formData.stock) < 0) {
// //       newErrors.stock = "Valid stock quantity is required";
// //     }
// //     if (
// //       formData.discountPrice &&
// //       formData.price &&
// //       parseFloat(formData.discountPrice) >= parseFloat(formData.price)
// //     ) {
// //       newErrors.discountPrice = "Discount price must be less than original price";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (!e.target.files) return;
// //     const newFiles = Array.from(e.target.files);

// //     setFormData((prev) => ({
// //       ...prev,
// //       images: [...prev.images, ...newFiles],
// //     }));

// //     e.target.value = "";
// //   };

// //   const handleRemoveNewImage = (index: number) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       images: prev.images.filter((_, i) => i !== index),
// //     }));
// //   };

// //   const handleRemoveExistingImage = (imgId: string, index: number) => {
// //     setExistingImages((prev) => prev.filter((_, i) => i !== index));
// //     setRemovedImages((prev) => [...prev, imgId]);
// //   };

// //   const calculateDiscount = () => {
// //     if (formData.price && formData.discountPrice) {
// //       const original = parseFloat(formData.price);
// //       const discount = parseFloat(formData.discountPrice);

// //       if (!original || discount >= original) return "0";

// //       const percentage = ((original - discount) / original) * 100;
// //       return percentage.toFixed(0);
// //     }

// //     return "0";
// //   };

// //   const imageUrl = (productId: string, index: number) =>
// //     `${Api}/api/${productId}/img/${index}`;

// //   const getCategoryInfo = (value: string) => {
// //     return categories.find((c) => c.value === value);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!validateForm()) {
// //       setSubmitStatus("error");
// //       return;
// //     }

// //     if (!id) return;

// //     try {
// //       const FD = new FormData();

// //       FD.append("category", formData.category);
// //       FD.append("title", formData.title);
// //       FD.append("description", formData.description);
// //       FD.append("stock", formData.stock);
// //       FD.append("price", formData.price);
// //       FD.append("discountPrice", formData.discountPrice);

// //       formData.images.forEach((file) => {
// //         FD.append("images", file);
// //       });

// //       if (removedImages.length > 0) {
// //         FD.append("removedImages", JSON.stringify(removedImages));
// //       }

// //       FD.append("existingImages", JSON.stringify(existingImages));

// //       await updateProduct({ id, formData: FD }).unwrap();

// //       setSubmitStatus("success");

// //       setTimeout(() => {
// //         navigate("/");
// //       }, 1500);
// //     } catch (err) {
// //       console.error("Update failed:", err);
// //       setSubmitStatus("error");
// //     }
// //   };

// //   const handleReset = () => {
// //     if (!product) return;

// //     setFormData({
// //       category: product.category || "",
// //       title: product.title || "",
// //       description: product.description || "",
// //       stock: product.stock != null ? String(product.stock) : "",
// //       price: product.price != null ? String(product.price) : "",
// //       discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
// //       images: [],
// //     });

// //     const imgs = Array.isArray(product.images)
// //       ? product.images.map((x: any) => (typeof x === "string" ? x : x?._id || String(x)))
// //       : [];

// //     setExistingImages(imgs);
// //     setRemovedImages([]);
// //     setErrors({});
// //     setSubmitStatus("idle");
// //   };

// //   const handleDelete = async (productId: string, title: string) => {
// //     try {
// //       if (!productId) {
// //         console.log("Id Missing");
// //         return;
// //       }

// //       const isConfirm = window.confirm(
// //         `Are you sure you want to delete "${title || "this product"}"?`
// //       );

// //       if (!isConfirm) return;

// //       const res = await deleteProduct(productId).unwrap();
// //       console.log("Delete response:", res);

// //       navigate("/");
// //     } catch (error: any) {
// //       console.log("Delete error:", error);
// //       alert(error?.data?.message || "Delete failed");
// //     }
// //   };

// //   if (!id) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //         <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
// //           <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
// //           <p className="text-gray-700 text-lg font-semibold">Invalid Route</p>
// //           <p className="text-gray-500 text-sm mt-2">Product ID is missing</p>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
// //         <div className="absolute inset-0">
// //           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
// //           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
// //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
// //         </div>

// //         <div className="relative z-10 text-center">
// //           <div className="relative w-32 h-32 mx-auto mb-8">
// //             <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
// //             <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
// //             <div
// //               className="absolute inset-3 rounded-full border-4 border-transparent border-t-pink-500 animate-spin"
// //               style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
// //             ></div>
// //             <div
// //               className="absolute inset-6 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"
// //               style={{ animationDuration: "2s" }}
// //             ></div>
// //             <div
// //               className="absolute inset-9 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin"
// //               style={{ animationDirection: "reverse", animationDuration: "2.5s" }}
// //             ></div>

// //             <div className="absolute inset-0 flex items-center justify-center">
// //               <Package size={24} className="text-white animate-pulse" />
// //             </div>
// //           </div>

// //           <h2 className="text-2xl font-bold text-white mb-2">Loading Product</h2>
// //           <p className="text-white/60">Please wait while we fetch the details...</p>

// //           <div className="flex justify-center gap-2 mt-6">
// //             <div
// //               className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"
// //               style={{ animationDelay: "0ms" }}
// //             ></div>
// //             <div
// //               className="w-3 h-3 rounded-full bg-pink-500 animate-bounce"
// //               style={{ animationDelay: "150ms" }}
// //             ></div>
// //             <div
// //               className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
// //               style={{ animationDelay: "300ms" }}
// //             ></div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (isError || !product) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
// //         <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl">
// //           <div className="text-center">
// //             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <AlertCircle size={32} className="text-red-600" />
// //             </div>
// //             <h2 className="text-xl font-bold text-gray-800">Failed to Load Product</h2>
// //             <p className="text-sm text-gray-600 mt-2">
// //               {(error as any)?.data?.message || (error as any)?.message || "Unknown error occurred"}
// //             </p>
// //           </div>

// //           <div className="flex gap-3 mt-6">
// //             <button
// //               onClick={() => refetch()}
// //               className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
// //             >
// //               <RefreshCw size={18} />
// //               Retry
// //             </button>

// //             <button
// //               onClick={() => navigate(-1)}
// //               className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition"
// //             >
// //               Go Back
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen ml-64 bg-gray-50">
// //       {/* Top Bar */}
// //       <div className="bg-gray-100 border-b border-gray-200 px-6 py-4">
// //         <button
// //           type="button"
// //           onClick={() => navigate(-1)}
// //           className="flex items-center gap-2 text-gray-500 hover:text-black font-medium transition"
// //         >
// //           <ArrowLeft size={20} />
// //           Back
// //         </button>


// //       </div>

// //       {/* Green Strip */}
// //       {isDataLoaded && submitStatus === "idle" && (
// //         <div className="bg-emerald-500 text-white px-6 py-4 flex items-center justify-center gap-2 font-semibold">
// //           <Sparkles size={18} />
// //          Edit Product successfully
// //         </div>
// //       )}

// //       <div className="py-12 px-4 sm:px-6 lg:px-8">
// //         <div className="max-w-6xl mx-auto">
// //           {/* Header */}
// //           {/* <div className="text-center mb-8">
// //             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
// //               <Edit3 size={32} className="text-white" />
// //             </div>
// //             <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Product</h1>
// //             <p className="text-gray-500">
// //               Update product details for ID:{" "}
// //               <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
// //                 {product._id}
// //               </span>
// //             </p>
// //           </div> */}

// //           {/* Update Success */}
// //           {submitStatus === "success" && (
// //             <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-pulse">
// //               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
// //                 <Check size={20} className="text-green-600" />
// //               </div>
// //               <div>
// //                 <p className="font-semibold text-green-800">Product Updated Successfully!</p>
// //                 <p className="text-sm text-green-600">Redirecting to product list...</p>
// //               </div>
// //             </div>
// //           )}

// //           {/* Update Error */}
// //           {submitStatus === "error" && Object.keys(errors).length === 0 && (
// //             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
// //               <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
// //                 <AlertCircle size={20} className="text-red-600" />
// //               </div>
// //               <div>
// //                 <p className="font-semibold text-red-800">Update Failed!</p>
// //                 <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
// //               </div>
// //             </div>
// //           )}

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             {/* Left Form */}
// //             <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
// //               <form onSubmit={handleSubmit}>
// //                 <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6">
// //                   <h2 className="text-xl font-bold text-white flex items-center gap-2">
// //                     <FileText size={24} />
// //                     Product Information
// //                   </h2>
// //                   <p className="text-orange-100 text-sm mt-1">
// //                     Update the fields below and save changes
// //                   </p>
// //                 </div>

// //                 <div className="p-8 space-y-6">
// //                   {/* Category */}
// //                   <div>
// //                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                       <Tag size={18} className="text-orange-500" />
// //                       Category *
// //                     </label>

// //                     <div className="relative">
// //                       <select
// //                         name="category"
// //                         value={formData.category}
// //                         onChange={handleChange}
// //                         className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition appearance-none bg-white cursor-pointer ${
// //                           errors.category
// //                             ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                             : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                         }`}
// //                       >
// //                         <option value="">Select a category</option>
// //                         {categories.map((cat) => (
// //                           <option key={cat.value} value={cat.value}>
// //                             {cat.label}
// //                           </option>
// //                         ))}
// //                       </select>

// //                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
// //                         <svg
// //                           className="w-5 h-5 text-gray-400"
// //                           fill="none"
// //                           stroke="currentColor"
// //                           viewBox="0 0 24 24"
// //                         >
// //                           <path
// //                             strokeLinecap="round"
// //                             strokeLinejoin="round"
// //                             strokeWidth={2}
// //                             d="M19 9l-7 7-7-7"
// //                           />
// //                         </svg>
// //                       </div>
// //                     </div>

// //                     {errors.category && (
// //                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                         <AlertCircle size={14} />
// //                         {errors.category}
// //                       </p>
// //                     )}

// //                     {formData.category && (
// //                       <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
// //                         <span>{getCategoryInfo(formData.category)?.icon}</span>
// //                         Selected: {getCategoryInfo(formData.category)?.label}
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Title */}
// //                   <div>
// //                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                       <Package size={18} className="text-orange-500" />
// //                       Product Title *
// //                     </label>

// //                     <input
// //                       type="text"
// //                       name="title"
// //                       value={formData.title}
// //                       onChange={handleChange}
// //                       placeholder="e.g., Modern LED Desk Lamp"
// //                       className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition ${
// //                         errors.title
// //                           ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                           : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                       }`}
// //                     />

// //                     {errors.title && (
// //                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                         <AlertCircle size={14} />
// //                         {errors.title}
// //                       </p>
// //                     )}

// //                     <p className="mt-2 text-sm text-gray-500">{formData.title.length}/100 characters</p>
// //                   </div>

// //                   {/* Description */}
// //                   <div>
// //                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                       <FileText size={18} className="text-orange-500" />
// //                       Description *
// //                     </label>

// //                     <textarea
// //                       name="description"
// //                       value={formData.description}
// //                       onChange={handleChange}
// //                       rows={4}
// //                       placeholder="Describe your product features, materials, dimensions, etc."
// //                       className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition resize-none ${
// //                         errors.description
// //                           ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                           : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                       }`}
// //                     />

// //                     {errors.description && (
// //                       <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                         <AlertCircle size={14} />
// //                         {errors.description}
// //                       </p>
// //                     )}

// //                     <p className="mt-2 text-sm text-gray-500">
// //                       {formData.description.length}/500 characters
// //                     </p>
// //                   </div>

// //                   {/* Images + Stock */}
// //                   <div className="grid md:grid-cols-2 gap-6">
// //                     {/* Images */}
// //                     <div>
// //                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                         <ImageIcon size={18} className="text-orange-500" />
// //                         Product Images
// //                       </label>

// //                       <input
// //                         type="file"
// //                         name="images"
// //                         accept="image/png, image/jpeg, image/webp"
// //                         onChange={handleImageChange}
// //                         multiple
// //                         className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 cursor-pointer hover:border-orange-400 transition"
// //                       />

// //                       {existingImages.length > 0 && (
// //                         <div className="mt-4">
// //                           <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
// //                             <Layers size={12} />
// //                             Existing Images ({existingImages.length})
// //                           </p>

// //                           <div className="grid grid-cols-3 gap-3">
// //                             {existingImages.map((imgId, index) => (
// //                               <div key={imgId} className="relative group">
// //                                 <img
// //                                   src={imageUrl(product._id, index)}
// //                                   className="h-20 w-full object-cover rounded-lg border-2 border-gray-200"
// //                                   alt={`Existing ${index + 1}`}
// //                                   onError={(e) => {
// //                                     (e.currentTarget as HTMLImageElement).src =
// //                                       "https://via.placeholder.com/150?text=Image";
// //                                   }}
// //                                 />

// //                                 <button
// //                                   type="button"
// //                                   onClick={() => handleRemoveExistingImage(imgId, index)}
// //                                   className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition shadow-lg"
// //                                 >
// //                                   <X size={14} />
// //                                 </button>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {formData.images.length > 0 && (
// //                         <div className="mt-4">
// //                           <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
// //                             <ImageIcon size={12} />
// //                             New Images ({formData.images.length})
// //                           </p>

// //                           <div className="grid grid-cols-3 gap-3">
// //                             {formData.images.map((img, index) => (
// //                               <div key={index} className="relative group">
// //                                 <img
// //                                   src={URL.createObjectURL(img)}
// //                                   className="h-20 w-full object-cover rounded-lg border-2 border-orange-300"
// //                                   alt="New"
// //                                 />

// //                                 <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded font-medium">
// //                                   NEW
// //                                 </div>

// //                                 <button
// //                                   type="button"
// //                                   onClick={() => handleRemoveNewImage(index)}
// //                                   className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition shadow-lg"
// //                                 >
// //                                   <X size={14} />
// //                                 </button>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {existingImages.length === 0 && formData.images.length === 0 && (
// //                         <div className="mt-4 p-6 border-2 border-dashed border-gray-200 rounded-xl text-center">
// //                           <ImageIcon size={32} className="mx-auto text-gray-300 mb-2" />
// //                           <p className="text-gray-400 text-sm">No images uploaded</p>
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Stock */}
// //                     <div>
// //                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                         <Layers size={18} className="text-orange-500" />
// //                         Available Stock *
// //                       </label>

// //                       <input
// //                         type="number"
// //                         name="stock"
// //                         value={formData.stock}
// //                         onChange={handleChange}
// //                         placeholder="Enter stock quantity"
// //                         min="0"
// //                         className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition ${
// //                           errors.stock
// //                             ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                             : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                         }`}
// //                       />

// //                       {errors.stock && (
// //                         <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                           <AlertCircle size={14} />
// //                           {errors.stock}
// //                         </p>
// //                       )}

// //                       {formData.stock && (
// //                         <div className="mt-3">
// //                           {parseInt(formData.stock) === 0 ? (
// //                             <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium">
// //                               <AlertCircle size={14} />
// //                               Out of Stock
// //                             </span>
// //                           ) : parseInt(formData.stock) <= 5 ? (
// //                             <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
// //                               <AlertCircle size={14} />
// //                               Low Stock Warning
// //                             </span>
// //                           ) : (
// //                             <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
// //                               <Check size={14} />
// //                               In Stock
// //                             </span>
// //                           )}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Price Section */}
// //                   <div className="grid md:grid-cols-2 gap-6">
// //                     <div>
// //                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                         <DollarSign size={18} className="text-orange-500" />
// //                         Original Price *
// //                       </label>

// //                       <div className="relative">
// //                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
// //                           Rs
// //                         </span>

// //                         <input
// //                           type="number"
// //                           name="price"
// //                           value={formData.price}
// //                           onChange={handleChange}
// //                           placeholder="0.00"
// //                           step="0.01"
// //                           min="0"
// //                           className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition ${
// //                             errors.price
// //                               ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                               : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
// //                           }`}
// //                         />
// //                       </div>

// //                       {errors.price && (
// //                         <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                           <AlertCircle size={14} />
// //                           {errors.price}
// //                         </p>
// //                       )}
// //                     </div>

// //                     <div>
// //                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// //                         <Percent size={18} className="text-green-600" />
// //                         Discount Price
// //                       </label>

// //                       <div className="relative">
// //                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
// //                           Rs
// //                         </span>

// //                         <input
// //                           type="number"
// //                           name="discountPrice"
// //                           value={formData.discountPrice}
// //                           onChange={handleChange}
// //                           placeholder="0.00"
// //                           step="0.01"
// //                           min="0"
// //                           className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition ${
// //                             errors.discountPrice
// //                               ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
// //                               : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
// //                           }`}
// //                         />
// //                       </div>

// //                       {errors.discountPrice && (
// //                         <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
// //                           <AlertCircle size={14} />
// //                           {errors.discountPrice}
// //                         </p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Discount Preview */}
// //                   {formData.price &&
// //                     formData.discountPrice &&
// //                     parseFloat(formData.discountPrice) < parseFloat(formData.price) && (
// //                       <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
// //                         <div className="flex items-center justify-between">
// //                           <div>
// //                             <p className="text-sm text-green-700 font-medium">Discount Applied</p>
// //                             <p className="text-xs text-green-600 mt-0.5">
// //                               Customers save Rs{" "}
// //                               {(
// //                                 parseFloat(formData.price) - parseFloat(formData.discountPrice)
// //                               ).toFixed(2)}
// //                             </p>
// //                           </div>

// //                           <div className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-lg">
// //                             {calculateDiscount()}% OFF
// //                           </div>
// //                         </div>
// //                       </div>
// //                     )}

// //                   {/* Price Preview */}
// //                   {formData.price && (
// //                     <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl border-2 border-orange-100">
// //                       <p className="text-sm font-semibold text-gray-600 mb-3">Price Preview</p>

// //                       <div className="flex items-baseline gap-3">
// //                         {formData.discountPrice &&
// //                         parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
// //                           <>
// //                             <span className="text-3xl font-bold text-green-600">
// //                               Rs {formData.discountPrice}
// //                             </span>
// //                             <span className="text-xl text-gray-400 line-through">
// //                               Rs {formData.price}
// //                             </span>
// //                             <span className="px-2 py-1 bg-green-600 text-white text-sm font-bold rounded">
// //                               {calculateDiscount()}% OFF
// //                             </span>
// //                           </>
// //                         ) : (
// //                           <span className="text-3xl font-bold text-orange-600">
// //                             Rs {formData.price}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Actions */}
// //                   <div className="pt-6 border-t border-gray-200">
// //                     <div className="flex flex-wrap items-center justify-between gap-4">
// //                       <div className="flex gap-3">

// //                         <button
// //                           type="button"
// //                           onClick={handleReset}
// //                           className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-medium text-gray-600"
// //                         >
// //                           <RefreshCw size={18} />
// //                           Reset
// //                         </button>
// //                       </div>

// //                       <button
// //                         type="submit"
// //                         disabled={isUpdating}
// //                         className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         {isUpdating ? (
// //                           <>
// //                             <Loader2 size={20} className="animate-spin" />
// //                             Updating...
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Save size={20} />
// //                             Save Changes
// //                           </>
// //                         )}
// //                       </button>
// //                     </div>

// //                     <p className="text-center text-sm text-gray-500 mt-4">
// //                       Review all changes before saving
// //                     </p>
// //                   </div>
// //                 </div>
// //               </form>
// //             </div>

// //             {/* Right Sidebar */}
// //             <div className="space-y-6">
// //               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
// //                 <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
// //                   <Package size={20} className="text-orange-500" />
// //                   Quick Summary
// //                 </h3>

// //                 <div className="space-y-4">
// //                   <div className="pb-3 border-b border-gray-100">
// //                     <p className="text-xs text-gray-500 uppercase tracking-wide">Title</p>
// //                     <p className="font-medium text-gray-800 mt-1 truncate">
// //                       {formData.title || <span className="text-gray-400">Not set</span>}
// //                     </p>
// //                   </div>

// //                   <div className="pb-3 border-b border-gray-100">
// //                     <p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
// //                     <p className="font-medium text-gray-800 mt-1">
// //                       {getCategoryInfo(formData.category)?.label || (
// //                         <span className="text-gray-400">Not selected</span>
// //                       )}
// //                     </p>
// //                   </div>

// //                   <div className="pb-3 border-b border-gray-100">
// //                     <p className="text-xs text-gray-500 uppercase tracking-wide">Stock</p>
// //                     <p
// //                       className={`font-semibold mt-1 ${
// //                         parseInt(formData.stock) > 10
// //                           ? "text-green-600"
// //                           : parseInt(formData.stock) > 0
// //                           ? "text-yellow-600"
// //                           : "text-red-600"
// //                       }`}
// //                     >
// //                       {formData.stock || "0"} units
// //                     </p>
// //                   </div>

// //                   <div className="pb-3 border-b border-gray-100">
// //                     <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
// //                     <div className="mt-1">
// //                       {formData.discountPrice &&
// //                       parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
// //                         <div className="flex items-baseline gap-2">
// //                           <span className="font-bold text-green-600">
// //                             Rs {formData.discountPrice}
// //                           </span>
// //                           <span className="text-sm text-gray-400 line-through">
// //                             Rs {formData.price}
// //                           </span>
// //                         </div>
// //                       ) : (
// //                         <span className="font-bold text-gray-800">Rs {formData.price || "0"}</span>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <p className="text-xs text-gray-500 uppercase tracking-wide">Images</p>
// //                     <p className="font-medium text-gray-800 mt-1">
// //                       {existingImages.length + formData.images.length} total
// //                       {formData.images.length > 0 && (
// //                         <span className="text-orange-500 text-sm ml-1">
// //                           (+{formData.images.length} new)
// //                         </span>
// //                       )}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
// //                 <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
// //                   <Edit3 size={20} className="text-orange-500" />
// //                   Edit Mode Active
// //                 </h3>

// //                 <ul className="space-y-2 text-sm text-gray-600">
// //                   <li className="flex items-start gap-2">
// //                     <span className="text-orange-500 mt-0.5">•</span>
// //                     All fields are editable
// //                   </li>
// //                   <li className="flex items-start gap-2">
// //                     <span className="text-orange-500 mt-0.5">•</span>
// //                     Add or remove images
// //                   </li>
// //                   <li className="flex items-start gap-2">
// //                     <span className="text-orange-500 mt-0.5">•</span>
// //                     Update pricing & stock
// //                   </li>
// //                   <li className="flex items-start gap-2">
// //                     <span className="text-orange-500 mt-0.5">•</span>
// //                     Click "Reset" to undo changes
// //                   </li>
// //                 </ul>
// //               </div>

// //               <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
// //                 <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
// //                   <Trash2 size={20} className="text-red-500" />
// //                   Danger Zone
// //                 </h3>

// //                 <p className="text-sm text-gray-600 mb-4">
// //                   Permanently delete this product. This action cannot be undone.
// //                 </p>

// //                 <button
// //                   type="button"
// //                   className="w-full px-4 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-medium hover:bg-red-50 transition flex items-center justify-center gap-2 disabled:opacity-50"
// //                   onClick={() => handleDelete(id, formData.title)}
// //                   disabled={isDeleting}
// //                 >
// //                   <Trash2 size={16} />
// //                   {isDeleting ? "Deleting..." : "Delete Product"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Edit;




// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   useGetViewQuery,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } from "../api/fechingapi";
// import {
//   Package,
//   Tag,
//   FileText,
//   Percent,
//   ImageIcon,
//   Check,
//   AlertCircle,
//   Loader2,
//   ArrowLeft,
//   Save,
//   X,
//   Trash2,
//   RefreshCw,
//   Edit3,
//   DollarSign,
//   Layers,
//   Sparkles,
//   Upload,
//   Eye,
//   Copy,
//   // ChevronDown,
//   // Info,
//   Zap,
//   Shield,
//   TrendingUp,
// } from "lucide-react";

// type ProductFromApi = {
//   _id: string;
//   category?: string;
//   title?: string;
//   description?: string;
//   stock?: number;
//   price?: number;
//   discountPrice?: number;
//   images?: any[];

//   paymentOptions?: {
//     cod?: boolean;
//     online?: boolean;
//   };
//   returnPolicy?: {
//     isReturnable?: boolean;
//     returnDays?: number;
//     policyText?: string;
//   };
// };

// const Edit: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const { data, isLoading, isError, error, refetch } = useGetViewQuery(id!, {
//     skip: !id,
//   });

//   const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
//   const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

//   const product: ProductFromApi | undefined = useMemo(() => {
//     if (!data) return undefined;
//     return (data as any)?.data ?? (data as any)?.product ?? data;
//   }, [data]);

//   const [formData, setFormData] = useState({
//     category: "",
//     title: "",
//     description: "",
//     images: [] as File[],
//     stock: "",
//     price: "",
//     discountPrice: "",


//     cod: false,
//     online: false,
//     isReturnable: false,
//     returnDays: "0",
//     policyText: "This product is non-returnable",
//   });

//   const [existingImages, setExistingImages] = useState<string[]>([]);
//   const [removedImages, setRemovedImages] = useState<string[]>([]);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
//   const [isDataLoaded, setIsDataLoaded] = useState(false);
//   const [activeTab, setActiveTab] = useState<"basic" | "media" | "pricing">("basic");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const Api = import.meta.env.VITE_API_URL;

//   const categories = useMemo(
//     () => [
//       { value: "Decorative-Lights", label: "Decorative Lights", icon: "💡", color: "from-amber-400 to-orange-500" },
//       { value: "Indoor-Plants", label: "Indoor Plants", icon: "🌿", color: "from-green-400 to-emerald-500" },
//       { value: "Curtains", label: "Curtains", icon: "🪟", color: "from-purple-400 to-indigo-500" },
//       { value: "Cushions", label: "Cushions", icon: "🛋️", color: "from-pink-400 to-rose-500" },
//       { value: "Lighting", label: "Lighting", icon: "✨", color: "from-yellow-400 to-amber-500" },
//       { value: "Wall-Art", label: "Wall Art", icon: "🎨", color: "from-cyan-400 to-blue-500" },
//       { value: "Carpets-Rugs", label: "Carpets & Rugs", icon: "🧶", color: "from-yellow-400 to-orange-500", },
//       { value: "Bedsheets", label: "Bedsheets", icon: "🛏️", color: "from-purple-400 to-indigo-500", },
//       { value: "Decorative-Vases", label: "Decorative Vases", icon: "🏺", color: "from-teal-400 to-emerald-500", },
//       { value: "Photo-Frames", label: "Photo Frames", icon: "🖼️", color: "from-rose-400 to-pink-500" },
//       { value: "Wall-Clocks", label: "Wall Clocks", icon: "🕰️", color: "from-indigo-400 to-blue-500", },
//       { value: "Decorative-Mirrors", label: "Decorative Mirrors", icon: "🪞", color: "from-cyan-400 to-sky-500", },

//     ],
//     []
//   );

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     // You can add a toast notification here
//   };



//   useEffect(() => {
//     if (!product) return;

//     setFormData({
//       category: product.category || "",
//       title: product.title || "",
//       description: product.description || "",
//       stock: product.stock != null ? String(product.stock) : "",
//       price: product.price != null ? String(product.price) : "",
//       discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
//       images: [],

//       cod: product.paymentOptions?.cod ?? false,
//       online: product.paymentOptions?.online ?? false,
//       isReturnable: product.returnPolicy?.isReturnable ?? false,
//       returnDays: product.returnPolicy?.returnDays?.toString() ?? "0",
//       policyText: product.returnPolicy?.policyText ?? "This product is non-returnable",
//     });

//     const imgs = Array.isArray(product.images)
//       ? product.images.map((x: any) => (typeof x === "string" ? x : x?._id || String(x)))
//       : [];

//     setExistingImages(imgs);
//     setRemovedImages([]);
//     setIsDataLoaded(true);
//   }, [product]);

//   // const handleChange = (
//   //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   // ) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prev) => ({ ...prev, [name]: value }));

//   //   if (errors[name]) {
//   //     setErrors((prev) => ({ ...prev, [name]: "" }));
//   //   }
//   // };


//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const target = e.target as HTMLInputElement;
//     const { name, value, type, checked } = target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   // const validateForm = () => {
//   //   const newErrors: Record<string, string> = {};

//   //   if (!formData.category) newErrors.category = "Please select a category";
//   //   if (!formData.title.trim()) newErrors.title = "Title is required";
//   //   if (!formData.description.trim()) newErrors.description = "Description is required";
//   //   if (!formData.price || parseFloat(formData.price) <= 0) {
//   //     newErrors.price = "Valid price is required";
//   //   }
//   //   if (!formData.stock || parseInt(formData.stock) < 0) {
//   //     newErrors.stock = "Valid stock quantity is required";
//   //   }
//   //   if (
//   //     formData.discountPrice &&
//   //     formData.price &&
//   //     parseFloat(formData.discountPrice) >= parseFloat(formData.price)
//   //   ) {
//   //     newErrors.discountPrice = "Discount price must be less than original price";
//   //   }

//   //   setErrors(newErrors);
//   //   return Object.keys(newErrors).length === 0;
//   // };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.category) newErrors.category = "Please select a category";
//     if (!formData.title.trim()) newErrors.title = "Title is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";

//     if (!formData.price || parseFloat(formData.price) <= 0) {
//       newErrors.price = "Valid price is required";
//     }

//     if (!formData.stock || parseInt(formData.stock) < 0) {
//       newErrors.stock = "Valid stock quantity is required";
//     }

//     if (
//       formData.discountPrice &&
//       formData.price &&
//       parseFloat(formData.discountPrice) >= parseFloat(formData.price)
//     ) {
//       newErrors.discountPrice = "Discount price must be less than original price";
//     }

//     if (!formData.cod && !formData.online) {
//       newErrors.payment = "Select at least one payment option";
//     }

//     if (formData.isReturnable) {
//       if (!formData.returnDays || Number(formData.returnDays) < 0) {
//         newErrors.returnDays = "Return days must be valid";
//       }

//       if (!formData.policyText.trim()) {
//         newErrors.policyText = "Return policy text is required";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };



//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const newFiles = Array.from(e.target.files);

//     setFormData((prev) => ({
//       ...prev,
//       images: [...prev.images, ...newFiles],
//     }));

//     e.target.value = "";
//   };

//   const handleRemoveNewImage = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleRemoveExistingImage = (imgId: string, index: number) => {
//     setExistingImages((prev) => prev.filter((_, i) => i !== index));
//     setRemovedImages((prev) => [...prev, imgId]);
//   };

//   // const handleRemoveExistingImage = (imgId: string) => {
//   //   setExistingImages((prev) => prev.filter((id) => id !== imgId));
//   //   setRemovedImages((prev) =>
//   //     prev.includes(imgId) ? prev : [...prev, imgId]
//   //   );
//   // };





//   const calculateDiscount = () => {
//     if (formData.price && formData.discountPrice) {
//       const original = parseFloat(formData.price);
//       const discount = parseFloat(formData.discountPrice);

//       if (!original || discount >= original) return "0";

//       const percentage = ((original - discount) / original) * 100;
//       return percentage.toFixed(0);
//     }

//     return "0";
//   };

//   const imageUrl = (productId: string, index: number) =>
//     `${Api}/api/${productId}/img/${index}`;

//   const getCategoryInfo = (value: string) => {
//     return categories.find((c) => c.value === value);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       setSubmitStatus("error");
//       return;
//     }

//     if (!id) return;

//     try {
//       const FD = new FormData();

//       FD.append("category", formData.category);
//       FD.append("title", formData.title);
//       FD.append("description", formData.description);
//       FD.append("stock", formData.stock);
//       FD.append("price", formData.price);
//       FD.append("discountPrice", formData.discountPrice);


//       FD.append("paymentOptions.cod", String(formData.cod));
//       FD.append("paymentOptions.online", String(formData.online));

//       FD.append("returnPolicy.isReturnable", String(formData.isReturnable));
//       FD.append("returnPolicy.returnDays", formData.returnDays);
//       FD.append("returnPolicy.policyText", formData.policyText);

//       FD.append("removedImages", JSON.stringify(removedImages));

//       formData.images.forEach((file) => {
//         FD.append("images", file);
//       });

//       // if (removedImages.length > 0) {
//       //   FD.append("removedImages", JSON.stringify(removedImages));
//       // }

//       FD.append("existingImages", JSON.stringify(existingImages));

//       await updateProduct({ id, formData: FD }).unwrap();



//       setSubmitStatus("success");

//       setTimeout(() => {
//         navigate("/inventory");
//       }, 1500);
//     } catch (err) {
//       console.error("Update failed:", err);
//       setSubmitStatus("error");
//     }
//   };

//   const handleReset = () => {
//     if (!product) return;

//     setFormData({
//       category: product.category || "",
//       title: product.title || "",
//       description: product.description || "",
//       stock: product.stock != null ? String(product.stock) : "",
//       price: product.price != null ? String(product.price) : "",
//       discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
//       images: [],
//       cod: product.paymentOptions?.cod ?? false,
//       online: product.paymentOptions?.online ?? false,
//       isReturnable: product.returnPolicy?.isReturnable ?? false,
//       returnDays: product.returnPolicy?.returnDays?.toString() ?? "0",
//       policyText: product.returnPolicy?.policyText ?? "This product is non-returnable",
//     });

//     const imgs = Array.isArray(product.images)
//       ? product.images.map((x: any) => (typeof x === "string" ? x : x?._id || String(x)))
//       : [];

//     setExistingImages(imgs);
//     setRemovedImages([]);
//     setErrors({});
//     setSubmitStatus("idle");
//   };

//   const handleDelete = async () => {
//     try {
//       if (!id) {
//         console.log("Id Missing");
//         return;
//       }

//       await deleteProduct(id).unwrap();
//       navigate("/inventory");
//     } catch (error: any) {
//       console.log("Delete error:", error);
//       alert(error?.data?.message || "Delete failed");
//     }
//   };

//   // Invalid ID State
//   if (!id) {
//     return (
//       <div className="min-h-screen ml-64 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
//         <div className="text-center">
//           <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl shadow-red-500/30">
//             <AlertCircle size={40} className="text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-800 mb-2">Invalid Route</h2>
//           <p className="text-slate-500 mb-8">Product ID is missing from the URL</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="min-h-screen ml-64 flex items-center justify-center bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//           <div className="absolute top-0 -right-40 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//           <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
//         </div>

//         {/* Grid Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

//         <div className="relative z-10 text-center">
//           {/* Spinner */}
//           <div className="relative w-40 h-40 mx-auto mb-10">
//             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 animate-spin-slow blur-md opacity-50"></div>
//             <div className="absolute inset-2 rounded-full bg-slate-900"></div>
//             <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-violet-500 border-r-fuchsia-500 animate-spin"></div>
//             <div className="absolute inset-8 rounded-full border-4 border-transparent border-b-pink-500 border-l-purple-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <Package size={32} className="text-white/80" />
//             </div>
//           </div>

//           <h2 className="text-3xl font-bold text-white mb-3">Loading Product</h2>
//           <p className="text-white/50 text-lg">Fetching product details...</p>

//           <div className="flex justify-center gap-3 mt-8">
//             {[0, 1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-bounce"
//                 style={{ animationDelay: `${i * 100}ms` }}
//               ></div>
//             ))}
//           </div>
//         </div>

//         <style>{`
//           @keyframes blob {
//             0%, 100% { transform: translate(0, 0) scale(1); }
//             25% { transform: translate(20px, -30px) scale(1.1); }
//             50% { transform: translate(-20px, 20px) scale(0.9); }
//             75% { transform: translate(30px, 10px) scale(1.05); }
//           }
//           .animate-blob { animation: blob 10s infinite; }
//           .animation-delay-2000 { animation-delay: 2s; }
//           .animation-delay-4000 { animation-delay: 4s; }
//           .animate-spin-slow { animation: spin 3s linear infinite; }
//         `}</style>
//       </div>
//     );
//   }

//   // Error State
//   if (isError || !product) {
//     return (
//       <div className="min-h-screen ml-64 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
//         <div className="max-w-lg w-full">
//           <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-xl shadow-red-500/30">
//               <AlertCircle size={36} className="text-white" />
//             </div>

//             <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
//               Failed to Load Product
//             </h2>
//             <p className="text-center text-slate-500 mb-8">
//               {(error as any)?.data?.message || "Something went wrong"}
//             </p>

//             <div className="flex gap-4">
//               <button
//                 onClick={() => refetch()}
//                 className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30"
//               >
//                 <RefreshCw size={20} />
//                 Retry
//               </button>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all duration-300"
//               >
//                 Go Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen ml-64 bg-gradient-to-br from-slate-50 via-white to-slate-100">
//       {/* Delete Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
//           <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
//             <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
//               <Trash2 size={28} className="text-white" />
//             </div>

//             <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">Delete Product?</h3>
//             <p className="text-center text-slate-500 mb-8">
//               This action cannot be undone. The product "{formData.title}" will be permanently removed.
//             </p>

//             <div className="flex gap-4">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={isDeleting}
//                 className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
//               >
//                 {isDeleting ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
//                 {isDeleting ? "Deleting..." : "Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
//               >
//                 <ArrowLeft size={22} className="text-slate-600" />
//               </button>

//               <div>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
//                     <Edit3 size={20} className="text-white" />
//                   </div>
//                   <div>
//                     <h1 className="text-xl font-bold text-slate-800">Edit Product</h1>
//                     <p className="text-sm text-slate-500">
//                       ID: {product._id}
//                       <button
//                         onClick={() => copyToClipboard(product._id)}
//                         className="ml-2 text-slate-400 hover:text-slate-600"
//                       >
//                         <Copy size={12} />
//                       </button>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleReset}
//                 className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition flex items-center gap-2"
//               >
//                 <RefreshCw size={18} />
//                 Reset
//               </button>

//               <button
//                 onClick={handleSubmit}
//                 disabled={isUpdating}
//                 className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-violet-500/30 disabled:opacity-50"
//               >
//                 {isUpdating ? (
//                   <Loader2 size={18} className="animate-spin" />
//                 ) : (
//                   <Save size={18} />
//                 )}
//                 {isUpdating ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Success Banner */}
//       {submitStatus === "success" && (
//         <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4">
//           <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
//             <div className="p-1 bg-white/20 rounded-full">
//               <Check size={18} />
//             </div>
//             <span className="font-semibold">Product updated successfully! Redirecting...</span>
//           </div>
//         </div>
//       )}

//       {/* Data Loaded Banner */}
//       {isDataLoaded && submitStatus === "idle" && (
//         <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-6 py-3">
//           <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
//             <Sparkles size={18} />
//             <span className="font-medium">Product data loaded successfully</span>
//           </div>
//         </div>
//       )}

//       <main className="max-w-7xl mx-auto px-6 py-10">
//         <div className="grid grid-cols-12 gap-8">
//           {/* Main Form */}
//           <div className="col-span-8">
//             {/* Tab Navigation */}
//             <div className="bg-white rounded-2xl p-2 mb-6 shadow-sm border border-slate-100 inline-flex">
//               {[
//                 { id: "basic", label: "Basic Info", icon: FileText },
//                 { id: "media", label: "Media", icon: ImageIcon },
//                 { id: "pricing", label: "Pricing", icon: DollarSign },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as any)}
//                   className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === tab.id
//                     ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30"
//                     : "text-slate-600 hover:bg-slate-50"
//                     }`}
//                 >
//                   <tab.icon size={18} />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             <form onSubmit={handleSubmit}>
//               {/* Basic Info Tab */}
//               {activeTab === "basic" && (
//                 <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
//                   <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-6">
//                     <h2 className="text-xl font-bold text-white flex items-center gap-3">
//                       <FileText size={24} />
//                       Basic Information
//                     </h2>
//                     <p className="text-violet-200 text-sm mt-1">
//                       Enter the core details of your product
//                     </p>
//                   </div>

//                   <div className="p-8 space-y-8">
//                     {/* Category Selection */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-3">
//                         Category
//                       </label>
//                       <div className="grid grid-cols-3 gap-3">
//                         {categories.map((cat) => (
//                           <button
//                             key={cat.value}
//                             type="button"
//                             onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
//                             className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${formData.category === cat.value
//                               ? "border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/20"
//                               : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
//                               }`}
//                           >
//                             <span className="text-2xl mb-2 block">{cat.icon}</span>
//                             <span className={`font-semibold ${formData.category === cat.value ? "text-violet-700" : "text-slate-700"
//                               }`}>
//                               {cat.label}
//                             </span>
//                           </button>
//                         ))}
//                       </div>
//                       {errors.category && (
//                         <p className="mt-3 text-sm text-red-500 flex items-center gap-1">
//                           <AlertCircle size={14} />
//                           {errors.category}
//                         </p>
//                       )}
//                     </div>

//                     {/* Title */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-3">
//                         Product Title
//                       </label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         placeholder="Enter product title..."
//                         className={`w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 text-lg ${errors.title
//                           ? "border-red-300 focus:border-red-500 bg-red-50"
//                           : "border-slate-200 focus:border-violet-500 focus:bg-violet-50/30"
//                           }`}
//                       />
//                       <div className="flex justify-between mt-2">
//                         {errors.title ? (
//                           <p className="text-sm text-red-500 flex items-center gap-1">
//                             <AlertCircle size={14} />
//                             {errors.title}
//                           </p>
//                         ) : (
//                           <span></span>
//                         )}
//                         <span className="text-sm text-slate-400">
//                           {formData.title.length}/100
//                         </span>
//                       </div>
//                     </div>

//                     {/* Description */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-3">
//                         Description
//                       </label>
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows={5}
//                         placeholder="Describe your product..."
//                         className={`w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 resize-none ${errors.description
//                           ? "border-red-300 focus:border-red-500 bg-red-50"
//                           : "border-slate-200 focus:border-violet-500 focus:bg-violet-50/30"
//                           }`}
//                       />
//                       <div className="flex justify-between mt-2">
//                         {errors.description ? (
//                           <p className="text-sm text-red-500 flex items-center gap-1">
//                             <AlertCircle size={14} />
//                             {errors.description}
//                           </p>
//                         ) : (
//                           <span></span>
//                         )}
//                         <span className="text-sm text-slate-400">
//                           {formData.description.length}/500
//                         </span>
//                       </div>
//                     </div>

//                     {/* Stock */}
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-3">
//                         Stock Quantity
//                       </label>
//                       <div className="flex items-center gap-4">
//                         <input
//                           type="number"
//                           name="stock"
//                           value={formData.stock}
//                           onChange={handleChange}
//                           placeholder="0"
//                           min="0"
//                           className={`w-48 px-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 text-lg font-semibold ${errors.stock
//                             ? "border-red-300 focus:border-red-500 bg-red-50"
//                             : "border-slate-200 focus:border-violet-500"
//                             }`}
//                         />

//                         {formData.stock && (
//                           <div className={`px-4 py-2 rounded-full font-medium text-sm ${parseInt(formData.stock) === 0
//                             ? "bg-red-100 text-red-700"
//                             : parseInt(formData.stock) <= 5
//                               ? "bg-amber-100 text-amber-700"
//                               : "bg-emerald-100 text-emerald-700"
//                             }`}>
//                             {parseInt(formData.stock) === 0
//                               ? "Out of Stock"
//                               : parseInt(formData.stock) <= 5
//                                 ? "Low Stock"
//                                 : "In Stock"}
//                           </div>
//                         )}
//                       </div>
//                       {errors.stock && (
//                         <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//                           <AlertCircle size={14} />
//                           {errors.stock}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Media Tab */}
//               {activeTab === "media" && (
//                 <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
//                   <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-6">
//                     <h2 className="text-xl font-bold text-white flex items-center gap-3">
//                       <ImageIcon size={24} />
//                       Product Images
//                     </h2>
//                     <p className="text-cyan-200 text-sm mt-1">
//                       Upload high-quality images of your product
//                     </p>
//                   </div>

//                   <div className="p-8 space-y-8">
//                     {/* Upload Area */}
//                     <label className="block cursor-pointer group">
//                       <div className="border-3 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-violet-400 hover:bg-violet-50/30 transition-all duration-300">
//                         <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300">
//                           <Upload size={32} className="text-white" />
//                         </div>
//                         <h3 className="text-xl font-bold text-slate-800 mb-2">
//                           Drop images here or click to upload
//                         </h3>
//                         <p className="text-slate-500">
//                           Supports: PNG, JPG, JPEG (Max 2MB each)
//                         </p>
//                       </div>
//                       <input
//                         type="file"
//                         accept="image/png, image/jpeg, image/jpg"
//                         onChange={handleImageChange}
//                         multiple
//                         className="hidden"
//                       />
//                     </label>

//                     {/* Existing Images */}
//                     {existingImages.length > 0 && (
//                       <div>
//                         <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
//                           <Layers size={18} className="text-slate-400" />
//                           Current Images ({existingImages.length})
//                         </h3>
//                         <div className="grid grid-cols-4 gap-4">
//                           {existingImages.map((imgId, index) => (
//                             <div key={imgId} className="relative group rounded-2xl overflow-hidden aspect-square">
//                               <img
//                                 src={imageUrl(product._id, index)}

//                                 className="w-full h-full object-cover"
//                                 alt={`Product ${index + 1}`}
//                                 onError={(e) => {
//                                   (e.currentTarget as HTMLImageElement).src =
//                                     "https://via.placeholder.com/200?text=Image";
//                                 }}
//                               />
//                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
//                                 <div className="absolute bottom-3 left-3 right-3 flex gap-2">
//                                   <button
//                                     type="button"

//                                     onClick={() => handleRemoveExistingImage(imgId, index)}
//                                     className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition flex items-center justify-center gap-1"
//                                   >
//                                     <Trash2 size={14} />
//                                     Remove
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* New Images */}
//                     {formData.images.length > 0 && (
//                       <div>
//                         <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
//                           <Sparkles size={18} className="text-violet-500" />
//                           New Images ({formData.images.length})
//                         </h3>
//                         <div className="grid grid-cols-4 gap-4">
//                           {formData.images.map((img, index) => (
//                             <div key={index} className="relative group rounded-2xl overflow-hidden aspect-square ring-2 ring-violet-500 ring-offset-2">
//                               <img
//                                 src={URL.createObjectURL(img)}
//                                 className="w-full h-full object-cover"
//                                 alt={`New ${index + 1}`}
//                               />
//                               <div className="absolute top-2 left-2 px-2 py-1 bg-violet-500 text-white text-xs font-bold rounded-lg">
//                                 NEW
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={() => handleRemoveNewImage(index)}
//                                 className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition opacity-0 group-hover:opacity-100 shadow-lg"
//                               >
//                                 <X size={16} />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {existingImages.length === 0 && formData.images.length === 0 && (
//                       <div className="text-center py-12">
//                         <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
//                         <p className="text-slate-500">No images uploaded yet</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Pricing Tab */}
//               {activeTab === "pricing" && (
//                 <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
//                   <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
//                     <h2 className="text-xl font-bold text-white flex items-center gap-3">
//                       {/* <span className="text-white font-bold text-lg">Rs</span> */}
//                       Pricing Details
//                     </h2>
//                     <p className="text-emerald-200 text-sm mt-1">
//                       Set competitive prices for your product
//                     </p>
//                   </div>

//                   <div className="p-8 space-y-8">
//                     <div className="grid grid-cols-2 gap-6">
//                       {/* Original Price */}
//                       <div>
//                         <label className="block text-sm font-semibold text-slate-700 mb-3">
//                           Original Price
//                         </label>
//                         <div className="relative">
//                           <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-lg">
//                             Rs
//                           </span>
//                           <input
//                             type="number"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleChange}
//                             placeholder="0.00"
//                             step="0.01"
//                             min="0"
//                             className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 text-2xl font-bold ${errors.price
//                               ? "border-red-300 focus:border-red-500 bg-red-50"
//                               : "border-slate-200 focus:border-emerald-500"
//                               }`}
//                           />
//                         </div>
//                         {errors.price && (
//                           <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//                             <AlertCircle size={14} />
//                             {errors.price}
//                           </p>
//                         )}
//                       </div>

//                       {/* Discount Price */}
//                       <div>
//                         <label className="block text-sm font-semibold text-slate-700 mb-3">
//                           Sale Price <span className="text-slate-400 font-normal">(Optional)</span>
//                         </label>
//                         <div className="relative">
//                           <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-lg">
//                             Rs
//                           </span>
//                           <input
//                             type="number"
//                             name="discountPrice"
//                             value={formData.discountPrice}
//                             onChange={handleChange}
//                             placeholder="0.00"
//                             step="0.01"
//                             min="0"
//                             className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 text-2xl font-bold ${errors.discountPrice
//                               ? "border-red-300 focus:border-red-500 bg-red-50"
//                               : "border-slate-200 focus:border-emerald-500"
//                               }`}
//                           />
//                         </div>
//                         {errors.discountPrice && (
//                           <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//                             <AlertCircle size={14} />
//                             {errors.discountPrice}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Discount Preview */}
//                     {formData.price &&
//                       formData.discountPrice &&
//                       parseFloat(formData.discountPrice) < parseFloat(formData.price) && (
//                         <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <div className="flex items-center gap-2 mb-1">
//                                 <TrendingUp size={20} className="text-emerald-600" />
//                                 <span className="font-semibold text-emerald-700">Discount Active</span>
//                               </div>
//                               <p className="text-emerald-600">
//                                 Customers save Rs {(parseFloat(formData.price) - parseFloat(formData.discountPrice)).toFixed(2)}
//                               </p>
//                             </div>
//                             <div className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-2xl shadow-lg shadow-emerald-500/30">
//                               {calculateDiscount()}% OFF
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                     {/* Price Preview Card */}
//                     {formData.price && (
//                       <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
//                         <p className="text-slate-400 text-sm font-medium mb-4">Customer sees:</p>
//                         <div className="flex items-baseline gap-4">
//                           {formData.discountPrice &&
//                             parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
//                             <>
//                               <span className="text-5xl font-bold">Rs {formData.discountPrice}</span>
//                               <span className="text-2xl text-slate-500 line-through">
//                                 Rs {formData.price}
//                               </span>
//                               <span className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-lg">
//                                 SAVE {calculateDiscount()}%
//                               </span>
//                             </>
//                           ) : (
//                             <span className="text-5xl font-bold">Rs {formData.price}</span>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </form>
//           </div>

//           {/* Sidebar */}
//           <div className="col-span-4 space-y-6">
//             {/* Product Preview Card */}
//             <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden sticky top-28">
//               <div className="p-6 border-b border-slate-100">
//                 <h3 className="font-bold text-slate-800 flex items-center gap-2">
//                   <Eye size={18} className="text-violet-500" />
//                   Live Preview
//                 </h3>
//               </div>

//               <div className="p-6">
//                 {/* Preview Image */}
//                 <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 mb-6 overflow-hidden">
//                   {existingImages.length > 0 ? (
//                     <img
//                       src={imageUrl(product._id, 0)}
//                       className="w-full h-full object-cover"
//                       alt="Preview"
//                       onError={(e) => {
//                         (e.currentTarget as HTMLImageElement).src =
//                           "https://via.placeholder.com/400?text=No+Image";
//                       }}
//                     />
//                   ) : formData.images.length > 0 ? (
//                     <img
//                       src={URL.createObjectURL(formData.images[0])}
//                       className="w-full h-full object-cover"
//                       alt="Preview"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <ImageIcon size={48} className="text-slate-300" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Preview Details */}
//                 <div className="space-y-4">
//                   {formData.category && (
//                     <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryInfo(formData.category)?.color} text-white`}>
//                       {getCategoryInfo(formData.category)?.icon} {getCategoryInfo(formData.category)?.label}
//                     </span>
//                   )}

//                   <h4 className="text-xl font-bold text-slate-800">
//                     {formData.title || <span className="text-slate-300">Product Title</span>}
//                   </h4>

//                   <p className="text-slate-500 text-sm line-clamp-2">
//                     {formData.description || "Product description will appear here..."}
//                   </p>

//                   <div className="pt-4 border-t border-slate-100">
//                     {formData.price ? (
//                       <div className="flex items-baseline gap-2">
//                         {formData.discountPrice &&
//                           parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
//                           <>
//                             <span className="text-2xl font-bold text-emerald-600">
//                               Rs {formData.discountPrice}
//                             </span>
//                             <span className="text-lg text-slate-400 line-through">
//                               Rs {formData.price}
//                             </span>
//                           </>
//                         ) : (
//                           <span className="text-2xl font-bold text-slate-800">
//                             Rs {formData.price}
//                           </span>
//                         )}
//                       </div>
//                     ) : (
//                       <span className="text-2xl font-bold text-slate-300">Rs 0.00</span>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2 text-sm">
//                     <Layers size={16} className="text-slate-400" />
//                     <span className="text-slate-600">
//                       {formData.stock || "0"} in stock
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-start py-2 border-b border-slate-100">
//                     <span className="text-sm text-slate-500">Payment Options</span>

//                     <div className="flex flex-col items-end gap-1">
//                       <span
//                         className={`px-2 py-1 rounded-md text-xs font-semibold ${product?.paymentOptions?.cod
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                           }`}
//                       >
//                         COD: {product?.paymentOptions?.cod ? "Available" : "Not Available"}
//                       </span>

//                       <span
//                         className={`px-2 py-1 rounded-md text-xs font-semibold ${product?.paymentOptions?.online
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-red-100 text-red-700"
//                           }`}
//                       >
//                         Online: {product?.paymentOptions?.online ? "Available" : "Not Available"}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-start py-2 border-b border-slate-100">
//                     <span className="text-sm text-slate-500">Return Policy</span>

//                     <div className="flex flex-col items-end gap-1">
//                       <span
//                         className={`px-2 py-1 rounded-md text-xs font-semibold ${product?.returnPolicy?.isReturnable
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                           }`}
//                       >
//                         Returnable: {product?.returnPolicy?.isReturnable ? "Yes" : "No"}
//                       </span>

//                       <span
//                         className={`px-2 py-1 rounded-md text-xs font-semibold ${product?.paymentOptions?.online
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-red-100 text-red-700"
//                           }`}
//                       >
//                         Return Days: {product?.returnPolicy?.returnDays ? product?.returnPolicy?.returnDays : "Not Available"}
//                       </span>

//                       <span
//                         className={`px-2 py-1 rounded-md text-xs font-semibold ${product?.paymentOptions?.online
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-red-100 text-red-700"
//                           }`}
//                       >
//                         Policy Text: {product?.returnPolicy?.policyText ? product?.returnPolicy?.policyText : "Not Available"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
//               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
//                 <Zap size={18} className="text-amber-500" />
//                 Quick Stats
//               </h3>

//               <div className="space-y-3">
//                 <div className="flex justify-between items-center py-2 border-b border-slate-100">
//                   <span className="text-slate-500">Images</span>
//                   <span className="font-semibold text-slate-800">
//                     {existingImages.length + formData.images.length}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b border-slate-100">
//                   <span className="text-slate-500">Stock</span>
//                   <span className={`font-semibold ${parseInt(formData.stock) > 10 ? "text-emerald-600" :
//                     parseInt(formData.stock) > 0 ? "text-amber-600" : "text-red-600"
//                     }`}>
//                     {formData.stock || "0"} units
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2">
//                   <span className="text-slate-500">Discount</span>
//                   <span className="font-semibold text-emerald-600">
//                     {calculateDiscount()}% OFF
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Danger Zone */}
//             <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl border-2 border-red-100 p-6">
//               <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
//                 <Shield size={18} className="text-red-500" />
//                 Danger Zone
//               </h3>
//               <p className="text-sm text-red-600/70 mb-4">
//                 Permanently delete this product. This cannot be undone.
//               </p>
//               <button
//                 type="button"
//                 onClick={() => setShowDeleteModal(true)}
//                 className="w-full py-3 rounded-2xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
//               >
//                 <Trash2 size={18} />
//                 Delete Product
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Edit;






import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetViewQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../api/product"
import {
  Package,
  FileText,
  ImageIcon,
  Check,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Save,
  X,
  Trash2,
  RefreshCw,
  Edit3,
  Layers,
  Sparkles,
  Upload,
  Eye,
  Copy,
  Zap,
  Shield,
  TrendingUp,
  ClipboardList,
  RotateCcw,
} from "lucide-react";

type ProductFromApi = {
  _id: string;
  category?: string;
  title?: string;
  description?: string;
  stock?: number;
  price?: number;
  discountPrice?: number;
  images?: any[];
  paymentOptions?: {
    cod?: boolean;
    online?: boolean;
  };
  returnPolicy?: {
    isReturnable?: boolean;
    returnDays?: number;
    policyText?: string;
  };
};

type FormDataState = {
  category: string;
  title: string;
  description: string;
  images: File[];
  stock: string;
  price: string;
  discountPrice: string;
  cod: boolean;
  online: boolean;
  isReturnable: boolean;
  returnDays: string;
  policyText: string;
};

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useGetViewQuery(id!, {
    skip: !id,
  });

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const product: ProductFromApi | undefined = useMemo(() => {
    if (!data) return undefined;
    return (data as any)?.data ?? (data as any)?.product ?? data;
  }, [data]);

  const [formData, setFormData] = useState<FormDataState>({
    category: "",
    title: "",
    description: "",
    images: [],
    stock: "",
    price: "",
    discountPrice: "",
    cod: false,
    online: false,
    isReturnable: false,
    returnDays: "0",
    policyText: "This product is non-returnable",
  });

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "media" | "pricing">("basic");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const Api = import.meta.env.VITE_API_URL;

  const categories = useMemo(
    () => [
      { value: "Decorative-Lights", label: "Decorative Lights", icon: "💡", color: "from-amber-400 to-orange-500" },
      { value: "Indoor-Plants", label: "Indoor Plants", icon: "🌿", color: "from-green-400 to-emerald-500" },
      { value: "Curtains", label: "Curtains", icon: "🪟", color: "from-purple-400 to-indigo-500" },
      { value: "Cushions", label: "Cushions", icon: "🛋️", color: "from-pink-400 to-rose-500" },
      { value: "Lighting", label: "Lighting", icon: "✨", color: "from-yellow-400 to-amber-500" },
      { value: "Wall-Art", label: "Wall Art", icon: "🎨", color: "from-cyan-400 to-blue-500" },
      { value: "Carpets-Rugs", label: "Carpets & Rugs", icon: "🧶", color: "from-yellow-400 to-orange-500" },
      { value: "Bedsheets", label: "Bedsheets", icon: "🛏️", color: "from-purple-400 to-indigo-500" },
      { value: "Decorative-Vases", label: "Decorative Vases", icon: "🏺", color: "from-teal-400 to-emerald-500" },
      { value: "Photo-Frames", label: "Photo Frames", icon: "🖼️", color: "from-rose-400 to-pink-500" },
      { value: "Wall-Clocks", label: "Wall Clocks", icon: "🕰️", color: "from-indigo-400 to-blue-500" },
      { value: "Decorative-Mirrors", label: "Decorative Mirrors", icon: "🪞", color: "from-cyan-400 to-sky-500" },
    ],
    []
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (!product) return;

    setFormData({
      category: product.category || "",
      title: product.title || "",
      description: product.description || "",
      stock: product.stock != null ? String(product.stock) : "",
      price: product.price != null ? String(product.price) : "",
      discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
      images: [],
      cod: product.paymentOptions?.cod ?? false,
      online: product.paymentOptions?.online ?? false,
      isReturnable: product.returnPolicy?.isReturnable ?? false,
      returnDays:
        product.returnPolicy?.returnDays != null
          ? String(product.returnPolicy.returnDays)
          : "0",
      policyText:
        product.returnPolicy?.policyText || "This product is non-returnable",
    });

    const imgs = Array.isArray(product.images)
      ? product.images.map((x: any) =>
          typeof x === "string" ? x : x?._id || String(x)
        )
      : [];

    setExistingImages(imgs);
    setRemovedImages([]);
    setIsDataLoaded(true);
  }, [product]);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const target = e.target as HTMLInputElement;
  //   const { name, value, type, checked } = target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));

  //   if (errors[name]) {
  //     setErrors((prev) => ({ ...prev, [name]: "" }));
  //   }

  //   if (name === "isReturnable" && type === "checkbox" && !checked) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       isReturnable: false,
  //       returnDays: "0",
  //       policyText: "This product is non-returnable",
  //     }));
  //   }
  // };

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type, checked } = e.target as HTMLInputElement;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (formData.stock === "" || parseInt(formData.stock) < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (
      formData.discountPrice &&
      formData.price &&
      parseFloat(formData.discountPrice) >= parseFloat(formData.price)
    ) {
      newErrors.discountPrice = "Discount price must be less than original price";
    }
    if (!formData.cod && !formData.online) {
      newErrors.payment = "Select at least one payment option";
    }

    if (formData.isReturnable) {
      if (!formData.returnDays || Number(formData.returnDays) <= 0) {
        newErrors.returnDays = "Enter valid return days";
      }

      if (!formData.policyText.trim()) {
        newErrors.policyText = "Enter return policy";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
    }));

    e.target.value = "";
  };

  const handleRemoveNewImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveExistingImage = (imgId: string, index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setRemovedImages((prev) => (prev.includes(imgId) ? prev : [...prev, imgId]));
  };

  const calculateDiscount = () => {
    if (formData.price && formData.discountPrice) {
      const original = parseFloat(formData.price);
      const discount = parseFloat(formData.discountPrice);

      if (!original || discount >= original) return "0";

      const percentage = ((original - discount) / original) * 100;
      return percentage.toFixed(0);
    }

    return "0";
  };

  const imageUrl = (productId: string, index: number) =>
    `${Api}/api/${productId}/img/${index}`;

  const getCategoryInfo = (value: string) => {
    return categories.find((c) => c.value === value);
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    if (!id) return;

    try {
      const FD = new FormData();

      FD.append("category", formData.category);
      FD.append("title", formData.title);
      FD.append("description", formData.description);
      FD.append("stock", formData.stock);
      FD.append("price", formData.price);
      FD.append("discountPrice", formData.discountPrice);

      FD.append("paymentOptions.cod", String(formData.cod));
      FD.append("paymentOptions.online", String(formData.online));
      
      FD.append("returnPolicy.isReturnable", String(formData.isReturnable));
      FD.append("returnPolicy.returnDays", formData.returnDays);
      FD.append("returnPolicy.policyText", formData.policyText);

      FD.append("removedImages", JSON.stringify(removedImages));
      FD.append("existingImages", JSON.stringify(existingImages));

      formData.images.forEach((file) => {
        FD.append("images", file);
      });

      await updateProduct({ id, formData: FD }).unwrap();

      setSubmitStatus("success");

      setTimeout(() => {
        navigate("/inventory");
      }, 1500);
    } catch (err) {
      console.error("Update failed:", err);
      setSubmitStatus("error");
    }
  };

  const handleReset = () => {
    if (!product) return;

    setFormData({
      category: product.category || "",
      title: product.title || "",
      description: product.description || "",
      stock: product.stock != null ? String(product.stock) : "",
      price: product.price != null ? String(product.price) : "",
      discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
      images: [],
      cod: product.paymentOptions?.cod ?? false,
      online: product.paymentOptions?.online ?? false,
      isReturnable: product.returnPolicy?.isReturnable ?? false,
      returnDays:
        product.returnPolicy?.returnDays != null
          ? String(product.returnPolicy.returnDays)
          : "0",
      policyText:
        product.returnPolicy?.policyText || "This product is non-returnable",
    });

    const imgs = Array.isArray(product.images)
      ? product.images.map((x: any) =>
          typeof x === "string" ? x : x?._id || String(x)
        )
      : [];

    setExistingImages(imgs);
    setRemovedImages([]);
    setErrors({});
    setSubmitStatus("idle");
  };

  const handleDelete = async () => {
    try {
      if (!id) return;
      await deleteProduct(id).unwrap();
      navigate("/inventory");
    } catch (error: any) {
      console.log("Delete error:", error);
      alert(error?.data?.message || "Delete failed");
    }
  };

  if (!id) {
    return (
      <div className="min-h-screen ml-64 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl shadow-red-500/30">
            <AlertCircle size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Invalid Route</h2>
          <p className="text-slate-500 mb-8">Product ID is missing from the URL</p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen ml-64 flex items-center justify-center bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-40 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="relative z-10 text-center">
          <div className="relative w-40 h-40 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 animate-spin-slow blur-md opacity-50"></div>
            <div className="absolute inset-2 rounded-full bg-slate-900"></div>
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-violet-500 border-r-fuchsia-500 animate-spin"></div>
            <div
              className="absolute inset-8 rounded-full border-4 border-transparent border-b-pink-500 border-l-purple-500 animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Package size={32} className="text-white/80" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3">Loading Product</h2>
          <p className="text-white/50 text-lg">Fetching product details...</p>

          <div className="flex justify-center gap-3 mt-8">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-bounce"
                style={{ animationDelay: `${i * 100}ms` }}
              ></div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -30px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(30px, 10px) scale(1.05); }
          }
          .animate-blob { animation: blob 10s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animate-spin-slow { animation: spin 3s linear infinite; }
        `}</style>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen ml-64 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-xl shadow-red-500/30">
              <AlertCircle size={36} className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
              Failed to Load Product
            </h2>
            <p className="text-center text-slate-500 mb-8">
              {(error as any)?.data?.message || "Something went wrong"}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => refetch()}
                className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30"
              >
                <RefreshCw size={20} />
                Retry
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all duration-300"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const previewImageSrc =
    formData.images.length > 0
      ? URL.createObjectURL(formData.images[0])
      : existingImages.length > 0
      ? imageUrl(product._id, 0)
      : "";

  return (
    <div className="min-h-screen ml-64 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <Trash2 size={28} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">Delete Product?</h3>
            <p className="text-center text-slate-500 mb-8">
              This action cannot be undone. The product "{formData.title}" will be permanently removed.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate(-1)}
                className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft size={22} className="text-slate-600" />
              </button>

              <div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
                    <Edit3 size={20} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-800">Edit Product</h1>
                    <p className="text-sm text-slate-500">
                      ID: {product._id}
                      <button
                        type="button"
                        onClick={() => copyToClipboard(product._id)}
                        className="ml-2 text-slate-400 hover:text-slate-600"
                      >
                        <Copy size={12} />
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition flex items-center gap-2"
              >
                <RefreshCw size={18} />
                Reset
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isUpdating}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-violet-500/30 disabled:opacity-50"
              >
                {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {submitStatus === "success" && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <div className="p-1 bg-white/20 rounded-full">
              <Check size={18} />
            </div>
            <span className="font-semibold">Product updated successfully! Redirecting...</span>
          </div>
        </div>
      )}

      {isDataLoaded && submitStatus === "idle" && (
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <Sparkles size={18} />
            <span className="font-medium">Product data loaded successfully</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <div className="bg-white rounded-2xl p-2 mb-6 shadow-sm border border-slate-100 inline-flex">
              {[
                { id: "basic", label: "Basic Info", icon: FileText },
                { id: "media", label: "Media", icon: ImageIcon },
                { id: "pricing", label: "Pricing", icon: ClipboardList },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as "basic" | "media" | "pricing")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {activeTab === "basic" && (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      <FileText size={24} />
                      Basic Information
                    </h2>
                    <p className="text-violet-200 text-sm mt-1">
                      Enter the core details of your product
                    </p>
                  </div>

                  <div className="p-8 space-y-8">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Category
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, category: cat.value }));
                              if (errors.category) {
                                setErrors((prev) => ({ ...prev, category: "" }));
                              }
                            }}
                            className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                              formData.category === cat.value
                                ? "border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/20"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-2xl mb-2 block">{cat.icon}</span>
                            <span
                              className={`font-semibold ${
                                formData.category === cat.value ? "text-violet-700" : "text-slate-700"
                              }`}
                            >
                              {cat.label}
                            </span>
                          </button>
                        ))}
                      </div>
                      {errors.category && (
                        <p className="mt-3 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Product Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter product title..."
                        className={`w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 text-lg ${
                          errors.title
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-slate-200 focus:border-violet-500 focus:bg-violet-50/30"
                        }`}
                      />
                      <div className="flex justify-between mt-2">
                        {errors.title ? (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.title}
                          </p>
                        ) : (
                          <span></span>
                        )}
                        <span className="text-sm text-slate-400">{formData.title.length}/100</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describe your product..."
                        className={`w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 resize-none ${
                          errors.description
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-slate-200 focus:border-violet-500 focus:bg-violet-50/30"
                        }`}
                      />
                      <div className="flex justify-between mt-2">
                        {errors.description ? (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.description}
                          </p>
                        ) : (
                          <span></span>
                        )}
                        <span className="text-sm text-slate-400">
                          {formData.description.length}/500
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Stock Quantity
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                          className={`w-48 px-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 text-lg font-semibold ${
                            errors.stock
                              ? "border-red-300 focus:border-red-500 bg-red-50"
                              : "border-slate-200 focus:border-violet-500"
                          }`}
                        />

                        {formData.stock !== "" && (
                          <div
                            className={`px-4 py-2 rounded-full font-medium text-sm ${
                              parseInt(formData.stock) === 0
                                ? "bg-red-100 text-red-700"
                                : parseInt(formData.stock) <= 5
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {parseInt(formData.stock) === 0
                              ? "Out of Stock"
                              : parseInt(formData.stock) <= 5
                              ? "Low Stock"
                              : "In Stock"}
                          </div>
                        )}
                      </div>
                      {errors.stock && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.stock}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      <ImageIcon size={24} />
                      Product Images
                    </h2>
                    <p className="text-cyan-200 text-sm mt-1">
                      Upload high-quality images of your product
                    </p>
                  </div>

                  <div className="p-8 space-y-8">
                    <label className="block cursor-pointer group">
                      <div className="border-[3px] border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-violet-400 hover:bg-violet-50/30 transition-all duration-300">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300">
                          <Upload size={32} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                          Drop images here or click to upload
                        </h3>
                        <p className="text-slate-500">
                          Supports: PNG, JPG, JPEG
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageChange}
                        multiple
                        className="hidden"
                      />
                    </label>

                    {existingImages.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                          <Layers size={18} className="text-slate-400" />
                          Current Images ({existingImages.length})
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                          {existingImages.map((imgId, index) => (
                            <div key={imgId} className="relative group rounded-2xl overflow-hidden aspect-square">
                              <img
                                src={imageUrl(product._id, index)}
                                className="w-full h-full object-cover"
                                alt={`Product ${index + 1}`}
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "https://via.placeholder.com/200?text=Image";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveExistingImage(imgId, index)}
                                    className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition flex items-center justify-center gap-1"
                                  >
                                    <Trash2 size={14} />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.images.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                          <Sparkles size={18} className="text-violet-500" />
                          New Images ({formData.images.length})
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                          {formData.images.map((img, index) => (
                            <div
                              key={index}
                              className="relative group rounded-2xl overflow-hidden aspect-square ring-2 ring-violet-500 ring-offset-2"
                            >
                              <img
                                src={URL.createObjectURL(img)}
                                className="w-full h-full object-cover"
                                alt={`New ${index + 1}`}
                              />
                              <div className="absolute top-2 left-2 px-2 py-1 bg-violet-500 text-white text-xs font-bold rounded-lg">
                                NEW
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveNewImage(index)}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition opacity-0 group-hover:opacity-100 shadow-lg"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {existingImages.length === 0 && formData.images.length === 0 && (
                      <div className="text-center py-12">
                        <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500">No images uploaded yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      Pricing Details
                    </h2>
                    <p className="text-emerald-200 text-sm mt-1">
                      Set competitive prices for your product
                    </p>
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Original Price
                        </label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-lg">
                            Rs
                          </span>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 text-2xl font-bold ${
                              errors.price
                                ? "border-red-300 focus:border-red-500 bg-red-50"
                                : "border-slate-200 focus:border-emerald-500"
                            }`}
                          />
                        </div>
                        {errors.price && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.price}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Sale Price <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-lg">
                            Rs
                          </span>
                          <input
                            type="number"
                            name="discountPrice"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none transition-all duration-200 text-2xl font-bold ${
                              errors.discountPrice
                                ? "border-red-300 focus:border-red-500 bg-red-50"
                                : "border-slate-200 focus:border-emerald-500"
                            }`}
                          />
                        </div>
                        {errors.discountPrice && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.discountPrice}
                          </p>
                        )}
                      </div>
                    </div>

                    {formData.price &&
                      formData.discountPrice &&
                      parseFloat(formData.discountPrice) < parseFloat(formData.price) && (
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <TrendingUp size={20} className="text-emerald-600" />
                                <span className="font-semibold text-emerald-700">Discount Active</span>
                              </div>
                              <p className="text-emerald-600">
                                Customers save Rs{" "}
                                {(parseFloat(formData.price) - parseFloat(formData.discountPrice)).toFixed(2)}
                              </p>
                            </div>
                            <div className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-2xl shadow-lg shadow-emerald-500/30">
                              {calculateDiscount()}% OFF
                            </div>
                          </div>
                        </div>
                      )}

                    {formData.price && (
                      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
                        <p className="text-slate-400 text-sm font-medium mb-4">Customer sees:</p>
                        <div className="flex items-baseline gap-4">
                          {formData.discountPrice &&
                          parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
                            <>
                              <span className="text-5xl font-bold">Rs {formData.discountPrice}</span>
                              <span className="text-2xl text-slate-500 line-through">
                                Rs {formData.price}
                              </span>
                              <span className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-lg">
                                SAVE {calculateDiscount()}%
                              </span>
                            </>
                          ) : (
                            <span className="text-5xl font-bold">Rs {formData.price}</span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                          <ClipboardList size={18} />
                          Payment Options
                        </h3>

                        <label className="flex items-center gap-3 mb-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="cod"
                            checked={formData.cod}
                            onChange={handleChange}
                          />
                          <span>Cash on Delivery</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="online"
                            checked={formData.online}
                            onChange={handleChange}
                          />
                          <span>Online Payment</span>
                        </label>

                        {errors.payment && (
                          <p className="mt-3 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.payment}
                          </p>
                        )}
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                          <RotateCcw size={18} />
                          Return Policy
                        </h3>

                        <label className="flex items-center gap-3 mb-4 cursor-pointer">
                          <input
                            type="checkbox"
                            name="isReturnable"
                            checked={formData.isReturnable}
                            onChange={handleChange}
                          />
                          <span>Return Available</span>
                        </label>

                        {formData.isReturnable ? (
                          <div className="space-y-3">
                            <div>
                              <input
                                type="number"
                                name="returnDays"
                                value={formData.returnDays}
                                onChange={handleChange}
                                placeholder="Return days"
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-emerald-500"
                              />
                              {errors.returnDays && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                  <AlertCircle size={14} />
                                  {errors.returnDays}
                                </p>
                              )}
                            </div>

                            <div>
                              <textarea
                                name="policyText"
                                value={formData.policyText}
                                onChange={handleChange}
                                placeholder="Return policy text"
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none resize-none focus:border-emerald-500"
                              />
                              {errors.policyText && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                  <AlertCircle size={14} />
                                  {errors.policyText}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500">
                            This product is non-returnable.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="col-span-4 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden sticky top-28">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Eye size={18} className="text-violet-500" />
                  Live Preview
                </h3>
              </div>

              <div className="p-6">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 mb-6 overflow-hidden">
                  {previewImageSrc ? (
                    <img
                      src={previewImageSrc}
                      className="w-full h-full object-cover"
                      alt="Preview"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://via.placeholder.com/400?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={48} className="text-slate-300" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {formData.category && (
                    <span
                      className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${
                        getCategoryInfo(formData.category)?.color
                      } text-white`}
                    >
                      {getCategoryInfo(formData.category)?.icon}{" "}
                      {getCategoryInfo(formData.category)?.label}
                    </span>
                  )}

                  <h4 className="text-xl font-bold text-slate-800">
                    {formData.title || <span className="text-slate-300">Product Title</span>}
                  </h4>

                  <p className="text-slate-500 text-sm line-clamp-2">
                    {formData.description || "Product description will appear here..."}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    {formData.price ? (
                      <div className="flex items-baseline gap-2">
                        {formData.discountPrice &&
                        parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
                          <>
                            <span className="text-2xl font-bold text-emerald-600">
                              Rs {formData.discountPrice}
                            </span>
                            <span className="text-lg text-slate-400 line-through">
                              Rs {formData.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-slate-800">
                            Rs {formData.price}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-slate-300">Rs 0.00</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Layers size={16} className="text-slate-400" />
                    <span className="text-slate-600">{formData.stock || "0"} in stock</span>
                  </div>

                  <div className="flex justify-between items-start py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Payment Options</span>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          formData.cod ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        COD: {formData.cod ? "Available" : "Not Available"}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          formData.online
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        Online: {formData.online ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Return Policy</span>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          formData.isReturnable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        Returnable: {formData.isReturnable ? "Yes" : "No"}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          formData.isReturnable
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        Return Days: {formData.isReturnable ? formData.returnDays : "Not Available"}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          formData.isReturnable
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        Policy Text: {formData.isReturnable ? formData.policyText : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-amber-500" />
                Quick Stats
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500">Images</span>
                  <span className="font-semibold text-slate-800">
                    {existingImages.length + formData.images.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500">Stock</span>
                  <span
                    className={`font-semibold ${
                      parseInt(formData.stock || "0") > 10
                        ? "text-emerald-600"
                        : parseInt(formData.stock || "0") > 0
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {formData.stock || "0"} units
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500">Discount</span>
                  <span className="font-semibold text-emerald-600">
                    {calculateDiscount()}% OFF
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl border-2 border-red-100 p-6">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <Shield size={18} className="text-red-500" />
                Danger Zone
              </h3>
              <p className="text-sm text-red-600/70 mb-4">
                Permanently delete this product. This cannot be undone.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-full py-3 rounded-2xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Edit;