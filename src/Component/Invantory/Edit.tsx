import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetViewQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../api/product";
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
  Sparkles,
  Upload,
  Copy,
  ClipboardList,
  Layers,
} from "lucide-react";


import { useGetCategoriesQuery } from "../../api/category";

type ProductFromApi = {
  _id: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
  };
  title?: string;
  description?: string;
  stock?: number;
  price?: number;
  discountPrice?: number;
  isActive?: boolean;
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
  isActive: boolean;
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
const { data: categoriesData,} = useGetCategoriesQuery();
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
    isActive: true,
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
  const [copied, setCopied] = useState(false);

  const Api = import.meta.env.VITE_API_URL;


 const categories =
    categoriesData?.data
      ?.filter((item: any) => item.isActive)
      .map((item: any) => ({
        value: item._id,
        label: item.name,
        slug: item.slug,
      })) || [];




  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!product) return;

    setFormData({
      category: product.category?._id|| "",
      title: product.title || "",
      description: product.description || "",
      stock: product.stock != null ? String(product.stock) : "",
      price: product.price != null ? String(product.price) : "",
      discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
      isActive: product.isActive ?? true,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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
      FD.append("isActive", String(formData.isActive));
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
        navigate("/dashboard/inventory");
      }, 1500);
    } catch (err) {
      console.error("Update failed:", err);
      setSubmitStatus("error");
    }
  };

  const handleReset = () => {
    if (!product) return;

    setFormData({
      category: product.category?._id || "",
      title: product.title || "",
      description: product.description || "",
      stock: product.stock != null ? String(product.stock) : "",
      price: product.price != null ? String(product.price) : "",
      discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
      isActive: product.isActive ?? true,
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
      navigate("/dashboard/inventory");
    } catch (error: any) {
      console.log("Delete error:", error);
      alert(error?.data?.message || "Delete failed");
    }
  };

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Invalid Route</h2>
          <p className="text-slate-500 text-sm mb-6">Product ID is missing from the URL</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
          <Package size={24} className="text-indigo-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">Loading Product</h2>
        <p className="text-sm text-slate-500 mt-1">Retrieving details...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Failed to Load Product</h2>
          <p className="text-sm text-slate-500 mb-6">
            {(error as any)?.data?.message || "Something went wrong while fetching details"}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => refetch()}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Retry
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
            >
              Go Back
            </button>
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


  const selectedCategory = categories.find(
    (cat) => cat.value === formData.category
  );
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 size={24} />
            </div>

            <h3 className="text-lg font-bold text-center text-slate-900 mb-1">Delete Product?</h3>
            <p className="text-sm text-center text-slate-500 mb-6">
              This action cannot be undone. <span className="font-semibold text-slate-700">"{formData.title}"</span> will be permanently removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        {/* Top Row: Title, Actions & Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4  pb-3">
          <div className="flex items-center justify-between py-4">
            {/* Left side: Back button & Title/Subtext */}
            <div className="flex items-center gap-3.5">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition border border-slate-200/80"
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-lg font-bold text-slate-900">Edit Product</h1>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${formData.isActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                  >
                    {formData.isActive ? "Active" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>ID: {product._id}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(product._id)}
                    className="text-slate-400 hover:text-indigo-600 transition"
                  >
                    {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition"
                title="Delete Product"
              >
                <Trash2 size={18} />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Reset
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isUpdating}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-colors shadow-sm disabled:opacity-50"
              >
                {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Navigation Tabs (Image jaisa clean look) */}
        <div className="border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
            {[
              { id: "basic", label: "Basic Info", icon: FileText },
              { id: "media", label: "Media & Images", icon: ImageIcon },
              { id: "pricing", label: "Pricing & Options", icon: ClipboardList },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as "basic" | "media" | "pricing")}
                className={`py-3 flex items-center gap-2 text-sm font-medium border-b-2 transition-colors -mb-[1px] ${activeTab === tab.id
                  ? "border-slate-900 text-slate-900 font-semibold"
                  : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Notifications */}
      {submitStatus === "success" && (
        <div className="bg-emerald-600 text-white text-sm py-2.5 px-4 shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <Check size={16} />
            <span className="font-medium">Product updated successfully! Redirecting...</span>
          </div>
        </div>
      )}

      {isDataLoaded && submitStatus === "idle" && (
        <div className="bg-indigo-50 border-b border-indigo-100 text-indigo-900 text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="text-indigo-600" />
            <span>Product data synchronized with inventory</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Tabs */}
          <div className="lg:col-span-8 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* TAB 1: BASIC INFO */}
              {activeTab === "basic" && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Basic Information</h2>
                    <p className="text-xs text-slate-500">Update title, category, and core product properties</p>
                  </div>

                  <div className="space-y-5">
                    {/* Title */}
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
                            className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.category ? "border-red-400 bg-red-50/20" : "border-slate-200 focus:border-purple-500"
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
                          className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.title ? "border-red-400 bg-red-50/20" : "border-slate-200 focus:border-purple-500"
                            } text-slate-800 focus:ring-2 focus:ring-purple-100 transition-all outline-none text-sm`}
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                      </div>
                    </div>




                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                        Description <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Detailed description of the product..."
                        className={`w-full p-4 rounded-xl border text-sm outline-none transition resize-none ${errors.description
                          ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                          : "border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                          }`}
                      />
                      <div className="flex justify-between items-center mt-1.5 text-xs">
                        {errors.description ? (
                          <span className="text-rose-500 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.description}
                          </span>
                        ) : (
                          <span></span>
                        )}
                        <span className="text-slate-400">{formData.description.length}/500</span>
                      </div>
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                        Stock Quantity <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                          className={`w-36 px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none transition ${errors.stock
                            ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                            : "border-slate-200 focus:border-indigo-600"
                            }`}
                        />

                        {formData.stock !== "" && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${parseInt(formData.stock) === 0
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : parseInt(formData.stock) <= 5
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                          >
                            {parseInt(formData.stock) === 0
                              ? "Out of Stock"
                              : parseInt(formData.stock) <= 5
                                ? "Low Stock"
                                : "In Stock"}
                          </span>
                        )}
                      </div>
                      {errors.stock && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.stock}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA */}
              {activeTab === "media" && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Product Images</h2>
                    <p className="text-xs text-slate-500">Upload new images or remove existing ones</p>
                  </div>

                  {/* Upload Box */}
                  <label className="block cursor-pointer group">
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-indigo-500 hover:bg-slate-50/80 transition group-hover:border-indigo-600">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center transition group-hover:scale-105">
                        <Upload size={22} />
                      </div>
                      <p className="text-sm font-semibold text-slate-800">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </label>

                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        Existing Images ({existingImages.length})
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {existingImages.map((img, idx) => (
                          <div
                            key={img || idx}
                            className="group relative aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-100"
                          >
                            <img
                              src={imageUrl(product._id, idx)}
                              alt={`Product image ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveExistingImage(img, idx)}
                                className="p-2 rounded-xl bg-white/90 text-rose-600 hover:bg-white transition"
                                title="Delete image"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Newly Uploaded Images */}
                  {formData.images.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        New Images to Upload ({formData.images.length})
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {formData.images.map((file, idx) => (
                          <div
                            key={idx}
                            className="group relative aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-100"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt="New upload"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveNewImage(idx)}
                                className="p-2 rounded-xl bg-white/90 text-rose-600 hover:bg-white transition"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PRICING & OPTIONS */}
              {activeTab === "pricing" && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Pricing & Payment Policy</h2>
                    <p className="text-xs text-slate-500">Configure prices, discounts, and terms</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Regular Price */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                        Regular Price ($) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition ${errors.price
                            ? "border-rose-300 bg-rose-50/50"
                            : "border-slate-200 focus:border-indigo-600"
                            }`}
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.price}
                        </p>
                      )}
                    </div>

                    {/* Discount Price */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                        Discount Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleChange}
                        placeholder="0.00"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition ${errors.discountPrice
                          ? "border-rose-300 bg-rose-50/50"
                          : "border-slate-200 focus:border-indigo-600"
                          }`}
                      />
                      {calculateDiscount() !== "0" && (
                        <p className="mt-1 text-xs text-emerald-600 font-medium">
                          Save {calculateDiscount()}% off standard price
                        </p>
                      )}
                      {errors.discountPrice && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.discountPrice}
                        </p>
                      )}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Payment Options */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Payment Methods
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700">
                        <input
                          type="checkbox"
                          name="cod"
                          checked={formData.cod}
                          onChange={handleChange}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        />
                        Cash on Delivery (COD)
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700">
                        <input
                          type="checkbox"
                          name="online"
                          checked={formData.online}
                          onChange={handleChange}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        />
                        Online Payment
                      </label>
                    </div>
                    {errors.payment && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.payment}
                      </p>
                    )}
                  </div>

                  <hr className="border-slate-100" />

                  {/* Return Policy */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-slate-800">
                      <input
                        type="checkbox"
                        name="isReturnable"
                        checked={formData.isReturnable}
                        onChange={handleChange}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                      />
                      Product is Returnable
                    </label>

                    {formData.isReturnable && (
                      <div className="pl-6 space-y-4 border-l-2 border-indigo-100">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Return Period (Days)
                          </label>
                          <input
                            type="number"
                            name="returnDays"
                            value={formData.returnDays}
                            onChange={handleChange}
                            className="w-32 px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-600"
                          />
                          {errors.returnDays && (
                            <p className="mt-1 text-xs text-rose-500">{errors.returnDays}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Policy Details
                          </label>
                          <textarea
                            name="policyText"
                            value={formData.policyText}
                            onChange={handleChange}
                            rows={2}
                            className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-600"
                          />
                          {errors.policyText && (
                            <p className="mt-1 text-xs text-rose-500">{errors.policyText}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar - Live Preview Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers size={16} className="text-indigo-600" />
                  Live Preview
                </h3>
                <span className="text-xs text-slate-400">Card View</span>
              </div>

              {/* Product Card Preview */}
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white hover:shadow-md transition">
                <div className="aspect-square bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {previewImageSrc ? (
                    <img
                      src={previewImageSrc}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package size={36} className="text-slate-300" />
                  )}

                  {calculateDiscount() !== "0" && (
                    <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      -{calculateDiscount()}%
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                    {selectedCategory?.label || "Category"}
                      
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {formData.title || "Product Title"}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {formData.description || "Product description preview..."}
                  </p>

                  <div className="pt-2 flex items-baseline gap-2 border-t border-slate-100">
                    <span className="text-base font-bold text-slate-900">
                      ${formData.discountPrice || formData.price || "0.00"}
                    </span>
                    {formData.discountPrice && formData.price && (
                      <span className="text-xs text-slate-400 line-through">
                        ${formData.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Switcher Box */}
              <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800">Visibility Status</p>
                  <p className="text-[11px] text-slate-500">
                    {formData.isActive ? "Visible in store catalog" : "Hidden from customers"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Edit;