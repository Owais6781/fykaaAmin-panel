
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
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-white to-slate-100">
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

      <header className=" bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
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