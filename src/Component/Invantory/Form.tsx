
// import React, { useState, useRef } from "react";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import {
//   Package,
//   Tag,
//   FileText,
//   Percent,
//   Upload,
//   X,
//   Check,
//   AlertCircle,
//   Loader2,
//   Sparkles,
//   Layers,
//   DollarSign,
//   Box,
//   ChevronRight,
//   Camera,
//   Trash2,
//   Truck,
//   CreditCard,
//   RotateCcw,
//   ShieldCheck,
// } from "lucide-react";
// import { useAddProductMutation } from "../../api/product"
// import { useGetCategoriesQuery } from "../../api/category"

// type FormState = {
//   category: string;
//   title: string;
//   description: string;
//   images: File[];
//   stock: string;
//   price: string;
//   discountPrice: string;
//   cod: boolean;
//   online: boolean;
//   isReturnable: boolean;
//   returnDays: string;
//   policyText: string;
// };



// const ProductForm: React.FC = () => {


//   const [addProduct, { isLoading }] = useAddProductMutation();
//   const { data: categoriesData, isLoading: categoryLoading } = useGetCategoriesQuery()



//   const [formData, setFormData] = useState<FormState>({
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

//   const navigate = useNavigate();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isDragging, setIsDragging] = useState(false);


//   const categories =
//     categoriesData?.data
//       ?.filter((item: any) => item.isActive)
//       .map((item: any) => ({
//         value: item._id,      // Save category id
//         label: item.name,     // Show category name
//         slug: item.slug,
//       })) || [];


//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error if user types
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };


//   const handleCheckbox = (name: "cod" | "online" | "isReturnable", checked: boolean) => {
//     if (name === "isReturnable") {
//       setFormData((prev) => ({
//         ...prev,
//         isReturnable: checked,
//         returnDays: checked ? prev.returnDays === "0" ? "7" : prev.returnDays : "0",
//         policyText: checked
//           ? prev.policyText === "This product is non-returnable"
//             ? "7 days return available"
//             : prev.policyText
//           : "This product is non-returnable",
//       }));
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };



//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.category) newErrors.category = "Please select a category";
//     if (!formData.title.trim()) newErrors.title = "Title is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";

//     if (!formData.price || parseFloat(formData.price) <= 0) {
//       newErrors.price = "Valid price is required";
//     }

//     if (
//       formData.discountPrice &&
//       parseFloat(formData.discountPrice) >= parseFloat(formData.price)
//     ) {
//       newErrors.discountPrice = "Discount price must be less than original price";
//     }

//     if (
//       formData.isReturnable)
//       if (!formData.returnDays || Number(formData.returnDays) < 0) {
//         newErrors.returnDays = "Return days must be valid";
//       }

//     if (!formData.policyText.trim()) {
//       newErrors.policyText = "Return policy text is required";
//     }

//     if (!formData.cod && !formData.online) {
//       newErrors.paymentOptions = "Select at least one payment option";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);
//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...newFiles],
//       }));
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const files = Array.from(e.dataTransfer.files).filter((file) =>
//       file.type.startsWith("image/")
//     );

//     setFormData((prev) => ({
//       ...prev,
//       images: [...prev.images, ...files],
//     }));
//   };

//   const handleRemoveImage = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       setSubmitStatus("error");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus("idle");

//     const FD = new FormData();
//     FD.append("category", formData.category);
//     FD.append("title", formData.title);
//     FD.append("description", formData.description);
//     FD.append("stock", formData.stock);
//     FD.append("price", formData.price);
//     FD.append("discountPrice", formData.discountPrice);

//     FD.append("cod", String(formData.cod));
//     FD.append("online", String(formData.online));
//     FD.append("isReturnable", String(formData.isReturnable));
//     FD.append("returnDays", formData.isReturnable ? formData.returnDays || "7" : "0");
//     FD.append(
//       "policyText",
//       formData.isReturnable
//         ? formData.policyText || `${formData.returnDays || 7} days return available`
//         : "This product is non-returnable"
//     );

//     formData.images.forEach((file) => {
//       FD.append("images", file);
//     });


//     try {
//       const data = await addProduct(FD).unwrap();

//       console.log(data);

//       setSubmitStatus("success");

//       setFormData({
//         category: "",
//         title: "",
//         description: "",
//         images: [],
//         stock: "",
//         price: "",
//         discountPrice: "",
//         cod: false,
//         online: false,
//         isReturnable: false,
//         returnDays: "0",
//         policyText: "This product is non-returnable",
//       });

//       setTimeout(() => navigate("/dashboard/inventory"), 2000);

//     } catch (error: any) {
//       console.log(error);
//       toast.error(error?.data?.message);
//       Swal.fire({
//         icon: "warning",
//         title: "Account Pending",
//         text: error?.data?.message,
//       });

//       setSubmitStatus("error");
//     }


//   };

//   const calculateDiscount = () => {
//     if (formData.price && formData.discountPrice) {
//       const original = parseFloat(formData.price);
//       const discount = parseFloat(formData.discountPrice);
//       return (((original - discount) / original) * 100).toFixed(0);
//     }
//     return 0;
//   };


//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <Package size={28} className="text-purple-600" />
//             </div>
//           </div>
//           <p className="mt-6 text-gray-600 font-medium">Loading Inventory...</p>
//           <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
//         </div>
//       </div>
//     );
//   }


//   // return (
//   //   <div className="min-h-screen  relative overflow-hidden">
//   //     {/* <div className="bg-gray-100 border-b border-gray-200 px-6 py-4">
//   //       <button
//   //         type="button"
//   //         onClick={() => navigate(-1)}
//   //         className="flex items-center gap-2 text-gray-700 hover:text-black font-medium transition"
//   //       >
//   //         <ArrowLeft size={20} />
//   //         Back
//   //       </button>
//   //     </div> */}

//   //     <div className="max-w-5xl mx-auto relative z-10 py-8 px-4 sm:px-6 lg:px-8">


//   //       {submitStatus === "success" && (
//   //         <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4 animate-fade-in shadow-lg shadow-emerald-100">
//   //           <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
//   //             <Check size={24} className="text-white" />
//   //           </div>
//   //           <div>
//   //             <p className="font-bold text-emerald-700 text-lg">Product Added Successfully!</p>
//   //             <p className="text-emerald-600">Redirecting to dashboard...</p>
//   //           </div>
//   //         </div>
//   //       )}

//   //       {submitStatus === "error" && Object.keys(errors).length === 0 && (
//   //         <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-4 animate-fade-in shadow-lg shadow-red-100">
//   //           <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
//   //             <AlertCircle size={24} className="text-white" />
//   //           </div>
//   //           <div>
//   //             <p className="font-bold text-red-700 text-lg">Upload Failed!</p>
//   //             <p className="text-red-600">Something went wrong. Please try again.</p>
//   //           </div>
//   //         </div>
//   //       )}

//   //       <form onSubmit={handleSubmit}>
//   //         <div className="grid lg:grid-cols-3 gap-6">
//   //           <div className="lg:col-span-2 space-y-6">
//   //             <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
//   //               <div className="p-6 bg-gradient-to-r from-violet-500 to-purple-600 flex items-center gap-3">
//   //                 <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
//   //                   <FileText size={20} className="text-white" />
//   //                 </div>
//   //                 <div>
//   //                   <h2 className="text-xl font-bold text-white">Basic Information</h2>
//   //                   <p className="text-sm text-white/80">Product details and category</p>
//   //                 </div>
//   //               </div>

//   //               <div className="p-6 space-y-6">
//   //                 <div>
//   //                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//   //                     <Tag size={16} className="text-purple-500" />
//   //                     Select Category
//   //                   </label>
//   //                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

//   //                     <select
//   //                       name="category"
//   //                       value={formData.category}
//   //                       onChange={handleChange}
//   //                       className="w-full rounded-xl border border-slate-200 px-4 py-3"
//   //                     >
//   //                       <option value="">
//   //                         {categoryLoading ? "Loading categories..." : "Select Category"}
//   //                       </option>

//   //                       {categories.map((category: any) => (
//   //                         <option key={category.value} value={category.value}>
//   //                           {category.label}
//   //                         </option>
//   //                       ))}
//   //                     </select>
//   //                   </div>
//   //                   {errors.category && (
//   //                     <p className="mt-3 text-sm text-red-500 flex items-center gap-1">
//   //                       <AlertCircle size={14} />
//   //                       {errors.category}
//   //                     </p>
//   //                   )}
//   //                 </div>

//   //                 <div>
//   //                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//   //                     <Package size={16} className="text-purple-500" />
//   //                     Product Title
//   //                   </label>
//   //                   <input
//   //                     type="text"
//   //                     name="title"
//   //                     value={formData.title}
//   //                     onChange={handleChange}
//   //                     placeholder="e.g., Modern LED Desk Lamp"
//   //                     className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 ${errors.title
//   //                       ? "border-red-300 focus:border-red-500 focus:bg-red-50"
//   //                       : "border-gray-200 focus:border-purple-500 focus:bg-purple-50/30"
//   //                       }`}
//   //                   />
//   //                   {errors.title && (
//   //                     <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//   //                       <AlertCircle size={14} />
//   //                       {errors.title}
//   //                     </p>
//   //                   )}
//   //                 </div>

//   //                 <div>
//   //                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//   //                     <Layers size={16} className="text-purple-500" />
//   //                     Description
//   //                   </label>
//   //                   <textarea
//   //                     name="description"
//   //                     value={formData.description}
//   //                     onChange={handleChange}
//   //                     rows={5}
//   //                     placeholder="Describe your product features, materials, dimensions..."
//   //                     className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 resize-none ${errors.description
//   //                       ? "border-red-300 focus:border-red-500 focus:bg-red-50"
//   //                       : "border-gray-200 focus:border-purple-500 focus:bg-purple-50/30"
//   //                       }`}
//   //                   />
//   //                   {errors.description && (
//   //                     <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//   //                       <AlertCircle size={14} />
//   //                       {errors.description}
//   //                     </p>
//   //                   )}
//   //                 </div>
//   //               </div>
//   //             </div>

//   //             <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
//   //               <div className="p-6 bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center gap-3">
//   //                 <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
//   //                   <Camera size={20} className="text-white" />
//   //                 </div>
//   //                 <div>
//   //                   <h2 className="text-xl font-bold text-white">Product Images</h2>
//   //                   <p className="text-sm text-white/80">Upload high-quality images</p>
//   //                 </div>
//   //               </div>

//   //               <div className="p-6">
//   //                 <div
//   //                   onDragOver={(e) => {
//   //                     e.preventDefault();
//   //                     setIsDragging(true);
//   //                   }}
//   //                   onDragLeave={() => setIsDragging(false)}
//   //                   onDrop={handleDrop}
//   //                   onClick={() => fileInputRef.current?.click()}
//   //                   className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragging
//   //                     ? "border-purple-500 bg-purple-50"
//   //                     : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
//   //                     }`}
//   //                 >
//   //                   <input
//   //                     ref={fileInputRef}
//   //                     type="file"
//   //                     name="images"
//   //                     accept="image/png, image/jpeg, image/webp"
//   //                     onChange={handleImageChange}
//   //                     multiple
//   //                     className="hidden"
//   //                   />
//   //                   <div
//   //                     className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragging ? "bg-purple-100" : "bg-gray-100"
//   //                       }`}
//   //                   >
//   //                     <Upload
//   //                       size={32}
//   //                       className={`transition-colors ${isDragging ? "text-purple-500" : "text-gray-400"
//   //                         }`}
//   //                     />
//   //                   </div>
//   //                   <p className="text-gray-700 font-medium mb-1">
//   //                     {isDragging ? "Drop images here" : "Drag & drop images here"}
//   //                   </p>
//   //                   <p className="text-sm text-gray-500">or click to browse</p>
//   //                   <p className="text-xs text-gray-400 mt-2">PNG, JPG, JPEG up to 10MB each</p>
//   //                 </div>

//   //                 {formData.images.length > 0 && (
//   //                   <div className="mt-6">
//   //                     <div className="flex items-center justify-between mb-4">
//   //                       <span className="text-sm font-medium text-gray-700">
//   //                         {formData.images.length} image{formData.images.length > 1 ? "s" : ""} selected
//   //                       </span>
//   //                       <button
//   //                         type="button"
//   //                         onClick={() => setFormData({ ...formData, images: [] })}
//   //                         className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
//   //                       >
//   //                         <Trash2 size={14} />
//   //                         Clear all
//   //                       </button>
//   //                     </div>
//   //                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//   //                       {formData.images.map((img, index) => (
//   //                         <div key={index} className="relative group aspect-square">
//   //                           <img
//   //                             src={URL.createObjectURL(img)}
//   //                             alt={`Preview ${index + 1}`}
//   //                             className="w-full h-full object-cover rounded-xl border-2 border-gray-200 shadow-md"
//   //                           />
//   //                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
//   //                             <button
//   //                               type="button"
//   //                               onClick={() => handleRemoveImage(index)}
//   //                               className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition-colors shadow-lg"
//   //                             >
//   //                               <X size={20} className="text-white" />
//   //                             </button>
//   //                           </div>
//   //                           {index === 0 && (
//   //                             <span className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-medium rounded-lg shadow-md">
//   //                               Cover
//   //                             </span>
//   //                           )}
//   //                         </div>
//   //                       ))}
//   //                     </div>
//   //                   </div>
//   //                 )}
//   //               </div>
//   //             </div>
//   //           </div>

//   //           <div className="space-y-6">
//   //             <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-6">
//   //               <div className="p-6 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center gap-3">
//   //                 <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
//   //                   <DollarSign size={20} className="text-white" />
//   //                 </div>
//   //                 <div>
//   //                   <h2 className="text-xl font-bold text-white">Pricing & Policy</h2>
//   //                   <p className="text-sm text-white/80">Set pricing, payments and return</p>
//   //                 </div>
//   //               </div>

//   //               <div className="p-6 space-y-5">
//   //                 <div>
//   //                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//   //                     <Box size={16} className="text-emerald-500" />
//   //                     Stock Quantity
//   //                   </label>
//   //                   <input
//   //                     type="number"
//   //                     name="stock"
//   //                     value={formData.stock}
//   //                     onChange={handleChange}
//   //                     placeholder="0"
//   //                     min="0"
//   //                     className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:bg-emerald-50/30"
//   //                   />
//   //                 </div>

//   //                 <div>
//   //                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//   //                     <span className="text-emerald-500 font-bold text-base">₹</span>
//   //                     Original Price
//   //                   </label>
//   //                   <div className="relative">
//   //                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
//   //                       ₹
//   //                     </span>
//   //                     <input
//   //                       type="number"
//   //                       name="price"
//   //                       value={formData.price}
//   //                       onChange={handleChange}
//   //                       placeholder="0.00"
//   //                       step="0.01"
//   //                       min="0"
//   //                       className={`w-full pl-10 pr-5 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 ${errors.price
//   //                         ? "border-red-300 focus:border-red-500"
//   //                         : "border-gray-200 focus:border-emerald-500 focus:bg-emerald-50/30"
//   //                         }`}
//   //                     />
//   //                   </div>
//   //                   {errors.price && (
//   //                     <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//   //                       <AlertCircle size={14} />
//   //                       {errors.price}
//   //                     </p>
//   //                   )}
//   //                 </div>

//   //                 <div>
//   //                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//   //                     <Percent size={16} className="text-emerald-500" />
//   //                     Sale Price (Optional)
//   //                   </label>
//   //                   <div className="relative">
//   //                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
//   //                       ₹
//   //                     </span>
//   //                     <input
//   //                       type="number"
//   //                       name="discountPrice"
//   //                       value={formData.discountPrice}
//   //                       onChange={handleChange}
//   //                       placeholder="0.00"
//   //                       step="0.01"
//   //                       min="0"
//   //                       className={`w-full pl-10 pr-5 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 ${errors.discountPrice
//   //                         ? "border-red-300 focus:border-red-500"
//   //                         : "border-gray-200 focus:border-emerald-500 focus:bg-emerald-50/30"
//   //                         }`}
//   //                     />
//   //                   </div>
//   //                   {errors.discountPrice && (
//   //                     <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//   //                       <AlertCircle size={14} />
//   //                       {errors.discountPrice}
//   //                     </p>
//   //                   )}
//   //                 </div>

//   //                 {formData.price &&
//   //                   formData.discountPrice &&
//   //                   parseFloat(formData.discountPrice) < parseFloat(formData.price) && (
//   //                     <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl">
//   //                       <div className="flex items-center justify-between">
//   //                         <div>
//   //                           <p className="text-emerald-600 font-semibold text-sm">You save</p>
//   //                           <p className="text-2xl font-bold text-emerald-700">
//   //                             ₹
//   //                             {(
//   //                               parseFloat(formData.price) - parseFloat(formData.discountPrice)
//   //                             ).toFixed(2)}
//   //                           </p>
//   //                         </div>
//   //                         <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-black text-xl shadow-lg shadow-emerald-200">
//   //                           {calculateDiscount()}%
//   //                         </div>
//   //                       </div>
//   //                     </div>
//   //                   )}

//   //                 <div className="border-t border-gray-200 pt-5 space-y-4">
//   //                   <h3 className="text-sm font-bold text-gray-800">Payment Options</h3>

//   //                   <label className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 cursor-pointer">
//   //                     <div className="flex items-center gap-2">
//   //                       <Truck size={18} className="text-blue-600" />
//   //                       <span className="text-sm font-medium text-gray-700">Cash on Delivery</span>
//   //                     </div>
//   //                     <input
//   //                       type="checkbox"
//   //                       name="paymentOptions.cod"
//   //                       checked={formData.cod}
//   //                       // onChange={handleChange}
//   //                       onChange={(e) => handleCheckbox("cod", e.target.checked)}
//   //                       className="h-4 w-4"
//   //                     />
//   //                   </label>

//   //                   <label className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 cursor-pointer">
//   //                     <div className="flex items-center gap-2">
//   //                       <CreditCard size={18} className="text-emerald-600" />
//   //                       <span className="text-sm font-medium text-gray-700">Online Payment</span>
//   //                     </div>
//   //                     <input
//   //                       type="checkbox"
//   //                       name="online"
//   //                       checked={formData.online}
//   //                       // onChange={handleChange}
//   //                       onChange={(e) => handleCheckbox("online", e.target.checked)}
//   //                       className="h-4 w-4"
//   //                     />
//   //                   </label>

//   //                   {errors.paymentOptions && (
//   //                     <p className="text-sm text-red-500 flex items-center gap-1">
//   //                       <AlertCircle size={14} />
//   //                       {errors.paymentOptions}
//   //                     </p>
//   //                   )}
//   //                 </div>

//   //                 <div className="border-t border-gray-200 pt-5 space-y-4">
//   //                   <h3 className="text-sm font-bold text-gray-800">Return Policy</h3>

//   //                   <label className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 cursor-pointer">
//   //                     <div className="flex items-center gap-2">
//   //                       <RotateCcw size={18} className="text-purple-600" />
//   //                       <span className="text-sm font-medium text-gray-700">Return Available</span>
//   //                     </div>
//   //                     <input
//   //                       type="checkbox"
//   //                       name="returnPolicy.isReturnable"
//   //                       checked={formData.isReturnable}
//   //                       // onChange={handleChange}
//   //                       onChange={(e) => handleCheckbox("isReturnable", e.target.checked)}
//   //                       className="h-4 w-4"
//   //                     />
//   //                   </label>

//   //                   {formData.isReturnable && (
//   //                     <>
//   //                       <div>
//   //                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//   //                           <ShieldCheck size={16} className="text-purple-500" />
//   //                           Return Days
//   //                         </label>
//   //                         <input
//   //                           type="number"
//   //                           name="returnDays"
//   //                           value={formData.returnDays}
//   //                           onChange={handleChange}
//   //                           min="0"
//   //                           className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500"
//   //                         />
//   //                         {errors.returnDays && (
//   //                           <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//   //                             <AlertCircle size={14} />
//   //                             {errors.returnDays}
//   //                           </p>
//   //                         )}
//   //                       </div>

//   //                       <div>
//   //                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//   //                           <FileText size={16} className="text-purple-500" />
//   //                           Policy Text
//   //                         </label>
//   //                         <textarea
//   //                           name="policyText"
//   //                           value={formData.policyText}
//   //                           onChange={handleChange}

//   //                           rows={3}
//   //                           className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none resize-none focus:border-purple-500"
//   //                           placeholder="e.g. 7 days return available"
//   //                         />
//   //                         {errors.policyText && (
//   //                           <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//   //                             <AlertCircle size={14} />
//   //                             {errors.policyText}
//   //                           </p>
//   //                         )}
//   //                       </div>
//   //                     </>
//   //                   )}
//   //                 </div>

//   //                 {formData.price && (
//   //                   <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
//   //                     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
//   //                       Customer Fees
//   //                     </p>
//   //                     <div className="flex items-baseline gap-3">
//   //                       {formData.discountPrice &&
//   //                         parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
//   //                         <>
//   //                           <span className="text-3xl font-black text-emerald-600">
//   //                             ₹{formData.discountPrice}
//   //                           </span>
//   //                           <span className="text-lg text-gray-400 line-through">
//   //                             ₹{formData.price}
//   //                           </span>
//   //                         </>
//   //                       ) : (
//   //                         <span className="text-3xl font-black text-gray-800">
//   //                           ₹{formData.price}
//   //                         </span>
//   //                       )}
//   //                     </div>
//   //                   </div>
//   //                 )}

//   //                 <button
//   //                   type="submit"
//   //                   disabled={isSubmitting}
//   //                   className="w-full mt-4 relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-purple-300 hover:shadow-2xl hover:shadow-purple-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group hover:-translate-y-0.5"
//   //                 >
//   //                   <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//   //                   <div className="relative flex items-center justify-center gap-2">
//   //                     {isSubmitting ? (
//   //                       <>
//   //                         <Loader2 size={24} className="animate-spin" />
//   //                         <span>Adding Product...</span>
//   //                       </>
//   //                     ) : (
//   //                       <>
//   //                         <Sparkles size={24} />
//   //                         <span>Publish Product</span>
//   //                         <ChevronRight
//   //                           size={20}
//   //                           className="group-hover:translate-x-1 transition-transform"
//   //                         />
//   //                       </>
//   //                     )}
//   //                   </div>
//   //                 </button>
//   //               </div>
//   //             </div>

//   //             <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-3xl p-6 shadow-lg shadow-purple-100">
//   //               <div className="flex items-center gap-2 mb-4">
//   //                 <Sparkles size={20} className="text-violet-500" />
//   //                 <h3 className="font-bold text-gray-800">Pro Tips</h3>
//   //               </div>
//   //               <ul className="space-y-3">
//   //                 {[
//   //                   "Use clear, descriptive titles",
//   //                   "Include key product features",
//   //                   "Set competitive pricing",
//   //                   "Upload multiple high-quality images",
//   //                 ].map((tip, i) => (
//   //                   <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
//   //                     <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
//   //                     {tip}
//   //                   </li>
//   //                 ))}
//   //               </ul>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </form>
//   //     </div>

//   //     <style>{`
//   //       @keyframes fade-in {
//   //         from { opacity: 0; transform: translateY(-10px); }
//   //         to { opacity: 1; transform: translateY(0); }
//   //       }
//   //       @keyframes blob {
//   //         0% { transform: translate(0px, 0px) scale(1); }
//   //         33% { transform: translate(30px, -50px) scale(1.1); }
//   //         66% { transform: translate(-20px, 20px) scale(0.9); }
//   //         100% { transform: translate(0px, 0px) scale(1); }
//   //       }
//   //       .animate-fade-in {
//   //         animation: fade-in 0.3s ease-out;
//   //       }
//   //       .animate-blob {
//   //         animation: blob 7s infinite;
//   //       }
//   //       .animation-delay-2000 {
//   //         animation-delay: 2s;
//   //       }
//   //       .animation-delay-4000 {
//   //         animation-delay: 4s;
//   //       }
//   //     `}</style>
//   //   </div>
//   // );

// return (
//   <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
//     {/* Delete Confirmation Modal */}
//     {showDeleteModal && (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
//         <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl">
//           <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
//             <Trash2 size={24} />
//           </div>

//           <h3 className="text-lg font-bold text-center text-slate-900 mb-1">Delete Product?</h3>
//           <p className="text-sm text-center text-slate-500 mb-6">
//             This action cannot be undone. <span className="font-semibold text-slate-700">"{formData.title || "This product"}"</span> will be permanently removed.
//           </p>

//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={() => setShowDeleteModal(false)}
//               className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleDelete}
//               disabled={isDeleting}
//               className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
//               {isDeleting ? "Deleting..." : "Delete"}
//             </button>
//           </div>
//         </div>
//       </div>
//     )}

//     {/* Top Sticky Header */}
//     <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//         <div className="flex items-center justify-between">
//           {/* Left side: Back button & Title */}
//           <div className="flex items-center gap-3.5">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition border border-slate-200/80"
//             >
//               <ArrowLeft size={18} />
//             </button>

//             <div>
//               <div className="flex items-center gap-2.5">
//                 <h1 className="text-lg font-bold text-slate-900">
//                   {product?._id ? "Edit Product" : "Add Product"}
//                 </h1>
//                 <span
//                   className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
//                     formData.isActive
//                       ? "bg-emerald-50 text-emerald-700 border-emerald-200"
//                       : "bg-slate-100 text-slate-600 border-slate-200"
//                   }`}
//                 >
//                   {formData.isActive ? "Active" : "Draft"}
//                 </span>
//               </div>
//               {product?._id && (
//                 <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
//                   <span>ID: {product._id}</span>
//                   <button
//                     type="button"
//                     onClick={() => copyToClipboard(product._id)}
//                     className="text-slate-400 hover:text-indigo-600 transition"
//                   >
//                     {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right side: Header Action Buttons */}
//           <div className="flex items-center gap-2.5">
//             {product?._id && (
//               <button
//                 type="button"
//                 onClick={() => setShowDeleteModal(true)}
//                 className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition"
//                 title="Delete Product"
//               >
//                 <Trash2 size={18} />
//               </button>
//             )}

//             <button
//               type="submit"
//               form="product-form"
//               disabled={isSubmitting}
//               className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition flex items-center gap-2 disabled:opacity-50"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 size={18} className="animate-spin" />
//                   <span>Saving...</span>
//                 </>
//               ) : (
//                 <>
//                   <Sparkles size={18} />
//                   <span>{product?._id ? "Save Changes" : "Publish Product"}</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>

//     {/* Main Form Content */}
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//       {/* Alert Banners */}
//       {submitStatus === "success" && (
//         <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
//           <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
//             <Check size={20} />
//           </div>
//           <div>
//             <p className="font-bold text-emerald-900 text-sm">Product Saved Successfully!</p>
//             <p className="text-xs text-emerald-700">Redirecting to your product inventory dashboard...</p>
//           </div>
//         </div>
//       )}

//       {submitStatus === "error" && Object.keys(errors).length === 0 && (
//         <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
//           <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shrink-0">
//             <AlertCircle size={20} />
//           </div>
//           <div>
//             <p className="font-bold text-rose-900 text-sm">Upload Failed!</p>
//             <p className="text-xs text-rose-700">Something went wrong while saving. Please try again.</p>
//           </div>
//         </div>
//       )}

//       <form id="product-form" onSubmit={handleSubmit}>
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Column */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Basic Information Card */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//               <div className="p-5 border-b border-slate-200/80 bg-slate-50/50 flex items-center gap-3">
//                 <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
//                   <FileText size={18} />
//                 </div>
//                 <div>
//                   <h2 className="text-base font-bold text-slate-900">Basic Information</h2>
//                   <p className="text-xs text-slate-500">Essential product details and categorization</p>
//                 </div>
//               </div>

//               <div className="p-6 space-y-5">
//                 {/* Product Title */}
//                 <div>
//                   <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
//                     Product Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     placeholder="e.g., Modern Ergonomic Desk Lamp"
//                     className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition focus:ring-2 ${
//                       errors.title
//                         ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
//                         : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
//                     }`}
//                   />
//                   {errors.title && (
//                     <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
//                       <AlertCircle size={14} />
//                       {errors.title}
//                     </p>
//                   )}
//                 </div>

//                 {/* Category Selection */}
//                 <div>
//                   <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
//                     Category
//                   </label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 text-sm outline-none transition focus:ring-2 ${
//                       errors.category
//                         ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
//                         : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
//                     }`}
//                   >
//                     <option value="">
//                       {categoryLoading ? "Loading categories..." : "Select Category"}
//                     </option>
//                     {categories.map((category: any) => (
//                       <option key={category.value} value={category.value}>
//                         {category.label}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.category && (
//                     <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
//                       <AlertCircle size={14} />
//                       {errors.category}
//                     </p>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows={5}
//                     placeholder="Describe product features, dimensions, materials, and care details..."
//                     className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none resize-none transition focus:ring-2 ${
//                       errors.description
//                         ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
//                         : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
//                     }`}
//                   />
//                   {errors.description && (
//                     <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
//                       <AlertCircle size={14} />
//                       {errors.description}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Product Media / Images Card */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//               <div className="p-5 border-b border-slate-200/80 bg-slate-50/50 flex items-center gap-3">
//                 <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
//                   <Camera size={18} />
//                 </div>
//                 <div>
//                   <h2 className="text-base font-bold text-slate-900">Product Images</h2>
//                   <p className="text-xs text-slate-500">Upload high-quality product visuals</p>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div
//                   onDragOver={(e) => {
//                     e.preventDefault();
//                     setIsDragging(true);
//                   }}
//                   onDragLeave={() => setIsDragging(false)}
//                   onDrop={handleDrop}
//                   onClick={() => fileInputRef.current?.click()}
//                   className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
//                     isDragging
//                       ? "border-indigo-500 bg-indigo-50/50"
//                       : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
//                   }`}
//                 >
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     name="images"
//                     accept="image/png, image/jpeg, image/webp"
//                     onChange={handleImageChange}
//                     multiple
//                     className="hidden"
//                   />
//                   <div
//                     className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition ${
//                       isDragging ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"
//                     }`}
//                   >
//                     <Upload size={24} />
//                   </div>
//                   <p className="text-sm font-semibold text-slate-800 mb-0.5">
//                     {isDragging ? "Drop images here" : "Drag & drop images here"}
//                   </p>
//                   <p className="text-xs text-slate-500">or click to browse from device</p>
//                   <p className="text-[11px] text-slate-400 mt-2">Supports PNG, JPG, WEBP up to 10MB each</p>
//                 </div>

//                 {/* Selected Image Previews */}
//                 {formData.images.length > 0 && (
//                   <div className="mt-6">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
//                         {formData.images.length} Image{formData.images.length > 1 ? "s" : ""} Selected
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => setFormData({ ...formData, images: [] })}
//                         className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
//                       >
//                         <Trash2 size={13} />
//                         Clear all
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                       {formData.images.map((img: any, index: number) => (
//                         <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
//                           <img
//                             src={typeof img === "string" ? img : URL.createObjectURL(img)}
//                             alt={`Preview ${index + 1}`}
//                             className="w-full h-full object-cover"
//                           />
//                           <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                             <button
//                               type="button"
//                               onClick={() => handleRemoveImage(index)}
//                               className="w-8 h-8 bg-rose-600 text-white rounded-lg flex items-center justify-center hover:bg-rose-700 transition shadow-md"
//                             >
//                               <X size={16} />
//                             </button>
//                           </div>
//                           {index === 0 && (
//                             <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
//                               Cover
//                             </span>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar Column */}
//           <div className="space-y-6">
//             {/* Pricing & Policy Card */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-20">
//               <div className="p-5 border-b border-slate-200/80 bg-slate-50/50 flex items-center gap-3">
//                 <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
//                   <DollarSign size={18} />
//                 </div>
//                 <div>
//                   <h2 className="text-base font-bold text-slate-900">Pricing & Inventory</h2>
//                   <p className="text-xs text-slate-500">Manage stock, rates, and fulfillment</p>
//                 </div>
//               </div>

//               <div className="p-6 space-y-5">
//                 {/* Stock Quantity */}
//                 <div>
//                   <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
//                     Stock Quantity
//                   </label>
//                   <input
//                     type="number"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     placeholder="0"
//                     min="0"
//                     className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm outline-none transition focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100"
//                   />
//                 </div>

//                 {/* Original Price */}
//                 <div>
//                   <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
//                     Original Price (₹)
//                   </label>
//                   <div className="relative">
//                     <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
//                       ₹
//                     </span>
//                     <input
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       placeholder="0.00"
//                       step="0.01"
//                       min="0"
//                       className={`w-full pl-8 pr-4 py-3 bg-white border rounded-xl text-slate-900 text-sm outline-none transition focus:ring-2 ${
//                         errors.price
//                           ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
//                           : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
//                       }`}
//                     />
//                   </div>
//                   {errors.price && (
//                     <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
//                       <AlertCircle size={14} />
//                       {errors.price}
//                     </p>
//                   )}
//                 </div>

//                 {/* Discount Price */}
//                 <div>
//                   <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
//                     Sale Price (₹) <span className="text-slate-400 font-normal">(Optional)</span>
//                   </label>
//                   <div className="relative">
//                     <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
//                       ₹
//                     </span>
//                     <input
//                       type="number"
//                       name="discountPrice"
//                       value={formData.discountPrice}
//                       onChange={handleChange}
//                       placeholder="0.00"
//                       step="0.01"
//                       min="0"
//                       className={`w-full pl-8 pr-4 py-3 bg-white border rounded-xl text-slate-900 text-sm outline-none transition focus:ring-2 ${
//                         errors.discountPrice
//                           ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
//                           : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
//                       }`}
//                     />
//                   </div>
//                   {errors.discountPrice && (
//                     <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
//                       <AlertCircle size={14} />
//                       {errors.discountPrice}
//                     </p>
//                   )}
//                 </div>

//                 {/* Savings Callout */}
//                 {formData.price &&
//                   formData.discountPrice &&
//                   parseFloat(formData.discountPrice) < parseFloat(formData.price) && (
//                     <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
//                       <div>
//                         <p className="text-xs font-semibold text-emerald-800">Customer Discount</p>
//                         <p className="text-sm font-bold text-emerald-700">
//                           Save ₹{(parseFloat(formData.price) - parseFloat(formData.discountPrice)).toFixed(2)}
//                         </p>
//                       </div>
//                       <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold">
//                         {calculateDiscount()}% OFF
//                       </span>
//                     </div>
//                   )}

//                 {/* Payment Options */}
//                 <div className="border-t border-slate-200 pt-5 space-y-3">
//                   <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider">
//                     Payment Methods
//                   </label>

//                   <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition">
//                     <div className="flex items-center gap-2.5">
//                       <Truck size={16} className="text-slate-600" />
//                       <span className="text-xs font-semibold text-slate-800">Cash on Delivery</span>
//                     </div>
//                     <input
//                       type="checkbox"
//                       checked={formData.cod}
//                       onChange={(e) => handleCheckbox("cod", e.target.checked)}
//                       className="h-4 w-4 accent-indigo-600 rounded text-indigo-600"
//                     />
//                   </label>

//                   <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition">
//                     <div className="flex items-center gap-2.5">
//                       <CreditCard size={16} className="text-slate-600" />
//                       <span className="text-xs font-semibold text-slate-800">Online Payment</span>
//                     </div>
//                     <input
//                       type="checkbox"
//                       checked={formData.online}
//                       onChange={(e) => handleCheckbox("online", e.target.checked)}
//                       className="h-4 w-4 accent-indigo-600 rounded text-indigo-600"
//                     />
//                   </label>
//                   {errors.paymentOptions && (
//                     <p className="text-xs text-rose-600 flex items-center gap-1">
//                       <AlertCircle size={14} />
//                       {errors.paymentOptions}
//                     </p>
//                   )}
//                 </div>

//                 {/* Return Policy */}
//                 <div className="border-t border-slate-200 pt-5 space-y-3">
//                   <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider">
//                     Return Policy
//                   </label>

//                   <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition">
//                     <div className="flex items-center gap-2.5">
//                       <RotateCcw size={16} className="text-slate-600" />
//                       <span className="text-xs font-semibold text-slate-800">Returns Allowed</span>
//                     </div>
//                     <input
//                       type="checkbox"
//                       checked={formData.isReturnable}
//                       onChange={(e) => handleCheckbox("isReturnable", e.target.checked)}
//                       className="h-4 w-4 accent-indigo-600 rounded text-indigo-600"
//                     />
//                   </label>

//                   {formData.isReturnable && (
//                     <div className="space-y-3 pt-2">
//                       <div>
//                         <label className="block text-xs font-medium text-slate-600 mb-1">
//                           Return Window (Days)
//                         </label>
//                         <input
//                           type="number"
//                           name="returnDays"
//                           value={formData.returnDays}
//                           onChange={handleChange}
//                           min="0"
//                           className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-indigo-500"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-xs font-medium text-slate-600 mb-1">
//                           Policy Details
//                         </label>
//                         <textarea
//                           name="policyText"
//                           value={formData.policyText}
//                           onChange={handleChange}
//                           rows={2}
//                           placeholder="e.g. Easy 7-day hassle-free returns"
//                           className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none resize-none focus:border-indigo-500"
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Primary Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full mt-2 py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" />
//                       <span>Saving Product...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles size={18} />
//                       <span>{product?._id ? "Update Product" : "Publish Product"}</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Quick Tips Box */}
//             <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5">
//               <div className="flex items-center gap-2 mb-3 text-slate-800">
//                 <Sparkles size={16} className="text-indigo-600" />
//                 <h3 className="text-xs font-bold uppercase tracking-wider">Quick Checklist</h3>
//               </div>
//               <ul className="space-y-2 text-xs text-slate-600">
//                 {[
//                   "Use clear and descriptive product titles",
//                   "Include accurate measurements and specifications",
//                   "Ensure competitive pricing against similar items",
//                   "Upload high-resolution photography",
//                 ].map((tip, i) => (
//                   <li key={i} className="flex items-start gap-2">
//                     <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
//                     <span>{tip}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </form>
//     </main>
//   </div>
// );

// };

// export default ProductForm;






import React, { useState, useRef } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Tag,
  Upload,
  Check,
  Loader2,
  Sparkles,
  Layers,
  DollarSign,
  Box,
  ChevronRight,
  Camera,
  Trash2,
  Truck,
  CreditCard,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useAddProductMutation } from "../../api/product";
import { useGetCategoriesQuery } from "../../api/category";

type FormState = {
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

const ProductForm: React.FC = () => {
  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation();
  const { data: categoriesData, isLoading: categoryLoading } = useGetCategoriesQuery();

  const [formData, setFormData] = useState<FormState>({
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

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  const categories =
    categoriesData?.data
      ?.filter((item: any) => item.isActive)
      .map((item: any) => ({
        value: item._id,
        label: item.name,
        slug: item.slug,
      })) || [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckbox = (name: "cod" | "online" | "isReturnable", checked: boolean) => {
    if (name === "isReturnable") {
      setFormData((prev) => ({
        ...prev,
        isReturnable: checked,
        returnDays: checked ? (prev.returnDays === "0" ? "7" : prev.returnDays) : "0",
        policyText: checked
          ? prev.policyText === "This product is non-returnable"
            ? "7 days return available"
            : prev.policyText
          : "This product is non-returnable",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));

    if (errors.paymentOptions && (name === "cod" || name === "online")) {
      setErrors((prev) => ({ ...prev, paymentOptions: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (
      formData.discountPrice &&
      parseFloat(formData.discountPrice) >= parseFloat(formData.price)
    ) {
      newErrors.discountPrice = "Discount price must be less than original price";
    }

    if (formData.isReturnable) {
      if (!formData.returnDays || Number(formData.returnDays) < 0) {
        newErrors.returnDays = "Return days must be valid";
      }
      if (!formData.policyText.trim()) {
        newErrors.policyText = "Return policy text is required";
      }
    }

    if (!formData.cod && !formData.online) {
      newErrors.paymentOptions = "Select at least one payment option";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const calculateDiscount = () => {
    if (formData.price && formData.discountPrice) {
      const original = parseFloat(formData.price);
      const discount = parseFloat(formData.discountPrice);
      if (original > 0 && discount < original) {
        return (((original - discount) / original) * 100).toFixed(0);
      }
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
    
      toast.error("Please resolve all required fields before submitting.");
      return;
    }

   

    const FD = new FormData();
    FD.append("category", formData.category);
    FD.append("title", formData.title);
    FD.append("description", formData.description);
    FD.append("stock", formData.stock);
    FD.append("price", formData.price);
    FD.append("discountPrice", formData.discountPrice);

    FD.append("cod", String(formData.cod));
    FD.append("online", String(formData.online));
    FD.append("isReturnable", String(formData.isReturnable));
    FD.append("returnDays", formData.isReturnable ? formData.returnDays || "7" : "0");
    FD.append(
      "policyText",
      formData.isReturnable
        ? formData.policyText || `${formData.returnDays || 7} days return available`
        : "This product is non-returnable"
    );

    formData.images.forEach((file) => {
      FD.append("images", file);
    });

    try {
      await addProduct(FD).unwrap();

      toast.success("Product created successfully!");

      setFormData({
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

      setTimeout(() => navigate("/dashboard/inventory"), 1500);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to add product");
      Swal.fire({
        icon: "warning",
        title: "Submission Error",
        text: error?.data?.message || "There was a problem adding the product.",
      });
    
    }
  };

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Package size={28} className="text-purple-600" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading Inventory...</p>
          <p className="text-sm text-gray-400 mt-1">Please wait while we fetch categories</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">
              <span>Inventory</span>
              <ChevronRight size={14} />
              <span>Add Product</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create New Product</h1>
            <p className="text-sm text-slate-500 mt-0.5">Fill in the information below to add a new item to your catalog.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard/inventory")}
            className="self-start sm:self-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Tag size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800">Basic Information</h2>
                <p className="text-xs text-slate-400">Title, category, and main description</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.category ? "border-red-400 bg-red-50/20" : "border-slate-200 focus:border-purple-500"
                    } text-slate-800 focus:ring-2 focus:ring-purple-100 transition-all outline-none text-sm appearance-none`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <Layers size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Wireless Noise-Canceling Headphones"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${
                    errors.title ? "border-red-400 bg-red-50/20" : "border-slate-200 focus:border-purple-500"
                  } text-slate-800 focus:ring-2 focus:ring-purple-100 transition-all outline-none text-sm`}
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Write a clear and engaging product description..."
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${
                  errors.description ? "border-red-400 bg-red-50/20" : "border-slate-200 focus:border-purple-500"
                } text-slate-800 focus:ring-2 focus:ring-purple-100 transition-all outline-none text-sm`}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Section 2: Pricing & Stock */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <DollarSign size={18} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-800">Pricing & Inventory</h2>
                  <p className="text-xs text-slate-400">Set costs and available stock quantity</p>
                </div>
              </div>
              {Number(calculateDiscount()) > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  <Sparkles size={14} />
                  <span>{calculateDiscount()}% OFF</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Regular Price */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Regular Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border ${
                      errors.price ? "border-red-400 bg-red-50/20" : "border-slate-200 focus:border-purple-500"
                    } text-slate-800 focus:ring-2 focus:ring-purple-100 transition-all outline-none text-sm`}
                  />
                </div>
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              </div>

              {/* Discount Price */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Discount Price</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                  <input
                    type="number"
                    name="discountPrice"
                    placeholder="0.00"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border ${
                      errors.discountPrice ? "border-red-400 bg-red-50/20" : "border-slate-200 focus:border-purple-500"
                    } text-slate-800 focus:ring-2 focus:ring-purple-100 transition-all outline-none text-sm`}
                  />
                </div>
                {errors.discountPrice && <p className="text-xs text-red-500 mt-1">{errors.discountPrice}</p>}
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Stock Quantity</label>
                <div className="relative">
                  <input
                    type="number"
                    name="stock"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none text-sm"
                  />
                  <Box size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Media Upload */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Camera size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800">Product Images</h2>
                <p className="text-xs text-slate-400">Upload high-quality product images</p>
              </div>
            </div>

            {/* Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-purple-500 bg-purple-50/50 scale-[0.99]"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
                <Upload size={22} />
              </div>
              <p className="text-sm font-medium text-slate-700">
                Click to upload <span className="text-slate-400 font-normal">or drag and drop</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, or WEBP (Max 5MB per file)</p>
            </div>

            {/* Image Previews */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                {formData.images.map((file, idx) => {
                  const previewUrl = URL.createObjectURL(file);
                  return (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img src={previewUrl} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-500/90 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 4: Fulfillment & Returns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Options */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <CreditCard size={18} />
                </div>
                <h2 className="text-base font-semibold text-slate-800">Payment Options</h2>
              </div>

              <div className="space-y-3 pt-1">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.cod}
                    onChange={(e) => handleCheckbox("cod", e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Cash on Delivery (COD)</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.online}
                    onChange={(e) => handleCheckbox("online", e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Online Payment</span>
                  </div>
                </label>
                {errors.paymentOptions && <p className="text-xs text-red-500 mt-1">{errors.paymentOptions}</p>}
              </div>
            </div>

            {/* Return Policy */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <RotateCcw size={18} />
                </div>
                <h2 className="text-base font-semibold text-slate-800">Return Policy</h2>
              </div>

              <div className="space-y-3 pt-1">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.isReturnable}
                    onChange={(e) => handleCheckbox("isReturnable", e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Item is Returnable</span>
                  </div>
                </label>

                {formData.isReturnable && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Return Window (Days)</label>
                      <input
                        type="number"
                        name="returnDays"
                        value={formData.returnDays}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 text-sm focus:border-purple-500 outline-none"
                      />
                      {errors.returnDays && <p className="text-xs text-red-500 mt-1">{errors.returnDays}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Policy Description</label>
                      <input
                        type="text"
                        name="policyText"
                        value={formData.policyText}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 text-sm focus:border-purple-500 outline-none"
                      />
                      {errors.policyText && <p className="text-xs text-red-500 mt-1">{errors.policyText}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Action Bar */}
          <div className="flex items-center justify-end gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <button
              type="button"
              onClick={() => navigate("/dashboard/inventory")}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAddingProduct}
              className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm hover:shadow disabled:opacity-50"
            >
              {isAddingProduct ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving Product...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Publish Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;