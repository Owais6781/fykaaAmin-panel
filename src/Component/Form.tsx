
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Tag,
  FileText,
  Percent,
  Upload,
  X,
  Check,
  AlertCircle,
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
  const [formData, setFormData] = useState<FormState>({
    category: "",
    title: "",
    description: "",
    images: [] as File[],
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  const Api = import.meta.env.VITE_API_URL;

  const categories = [
    {
      value: "Decorative-Lights",
      label: "Decorative Lights",
      icon: "✨",
      color: "from-amber-400 to-orange-500",
      lightBg: "bg-amber-50 border-amber-200",
    },
    {
      value: "Indoor-Plants",
      label: "Indoor Plants",
      icon: "🌿",
      color: "from-emerald-400 to-green-500",
      lightBg: "bg-emerald-50 border-emerald-200",
    },
    {
      value: "Curtains",
      label: "Curtains",
      icon: "🪟",
      color: "from-blue-400 to-cyan-500",
      lightBg: "bg-blue-50 border-blue-200",
    },
    {
      value: "Cushions",
      label: "Cushions",
      icon: "🛋️",
      color: "from-pink-400 to-rose-500",
      lightBg: "bg-pink-50 border-pink-200",
    },
    {
      value: "Lighting",
      label: "Lighting",
      icon: "💡",
      color: "from-yellow-400 to-amber-500",
      lightBg: "bg-yellow-50 border-yellow-200",
    },
    {
      value: "Wall-Art",
      label: "Wall Art",
      icon: "🖼️",
      color: "from-purple-400 to-violet-500",
      lightBg: "bg-purple-50 border-purple-200",
    },
    {
      value: "Carpets-Rugs",
      label: "Carpets & Rugs",
      icon: "🧶",
      color: "from-yellow-400 to-orange-500",
      lightBg: "bg-yellow-50 border-yellow-200",
    },
    {
      value: "Bedsheets",
      label: "Bedsheets",
      icon: "🛏️",
      color: "from-purple-400 to-indigo-500",
      lightBg: "bg-purple-50 border-purple-200",
    },
    {
      value: "Decorative-Vases",
      label: "Decorative Vases",
      icon: "🏺",
      color: "from-teal-400 to-emerald-500",
      lightBg: "bg-teal-50 border-teal-200",
    },
    {
      value: "Photo-Frames",
      label: "Photo Frames",
      icon: "🖼️",
      color: "from-rose-400 to-pink-500",
      lightBg: "bg-rose-50 border-rose-200",
    },
    {
      value: "Wall-Clocks",
      label: "Wall Clocks",
      icon: "🕰️",
      color: "from-indigo-400 to-blue-500",
      lightBg: "bg-indigo-50 border-indigo-200",
    },
    {
      value: "Decorative-Mirrors",
      label: "Decorative Mirrors",
      icon: "🪞",
      color: "from-cyan-400 to-sky-500",
      lightBg: "bg-cyan-50 border-cyan-200",
    },
  ];


  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Clear error if user types
  if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
};
  

 const handleCheckbox  = (name: "cod" | "online" | "isReturnable", checked: boolean) => {
    if (name === "isReturnable") {
      setFormData((prev) => ({
        ...prev,
        isReturnable: checked,
        returnDays: checked ? prev.returnDays === "0" ? "7" : prev.returnDays : "0",
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

    if (
      formData.isReturnable )
     if (!formData.returnDays || Number(formData.returnDays) < 0) {
      newErrors.returnDays = "Return days must be valid";
    }

    if ( !formData.policyText.trim()) {
      newErrors.policyText = "Return policy text is required";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const FD = new FormData();
    FD.append("category", formData.category);
    FD.append("title", formData.title);
    FD.append("description", formData.description);
    FD.append("stock", formData.stock);
    FD.append("price", formData.price);
    FD.append("discountPrice", formData.discountPrice);

    // nested schema fields
    // FD.append("paymentOptions.cod", String(formData.cod));
    // FD.append("paymentOptions.online", String(formData.online));

    // FD.append(
    //   "returnPolicy.isReturnable",
    //   String(formData.isReturnable)
    // );
    // FD.append("returnPolicy.returnDays", formData.returnDays);
    // FD.append("returnPolicy.policyText", formData.policyText);

    
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
      const res = await fetch(`${Api}/api`, {
        method: "POST",
        body: FD,
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus("success");
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

        setTimeout(() => navigate("/inventory"), 2000);
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateDiscount = () => {
    if (formData.price && formData.discountPrice) {
      const original = parseFloat(formData.price);
      const discount = parseFloat(formData.discountPrice);
      return (((original - discount) / original) * 100).toFixed(0);
    }
    return 0;
  };

 ;

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* <div className="bg-gray-100 border-b border-gray-200 px-6 py-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-black font-medium transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div> */}
     
      <div className="max-w-5xl mx-auto relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        

        {submitStatus === "success" && (
          <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4 animate-fade-in shadow-lg shadow-emerald-100">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <Check size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-emerald-700 text-lg">Product Added Successfully!</p>
              <p className="text-emerald-600">Redirecting to dashboard...</p>
            </div>
          </div>
        )}

        {submitStatus === "error" && Object.keys(errors).length === 0 && (
          <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-4 animate-fade-in shadow-lg shadow-red-100">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-red-700 text-lg">Upload Failed!</p>
              <p className="text-red-600">Something went wrong. Please try again.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-violet-500 to-purple-600 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Basic Information</h2>
                    <p className="text-sm text-white/80">Product details and category</p>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <Tag size={16} className="text-purple-500" />
                      Select Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, category: cat.value });
                            if (errors.category) setErrors({ ...errors, category: "" });
                          }}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 group ${
                            formData.category === cat.value
                              ? `bg-gradient-to-br ${cat.color} border-transparent shadow-lg scale-[1.02] text-white`
                              : `${cat.lightBg} hover:shadow-md hover:scale-[1.01]`
                          }`}
                        >
                          <span className="text-2xl mb-2 block">{cat.icon}</span>
                          <span
                            className={`text-sm font-medium ${
                              formData.category === cat.value ? "text-white" : "text-gray-700"
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
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <Package size={16} className="text-purple-500" />
                      Product Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Modern LED Desk Lamp"
                      className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 ${
                        errors.title
                          ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                          : "border-gray-200 focus:border-purple-500 focus:bg-purple-50/30"
                      }`}
                    />
                    {errors.title && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <Layers size={16} className="text-purple-500" />
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your product features, materials, dimensions..."
                      className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 resize-none ${
                        errors.description
                          ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                          : "border-gray-200 focus:border-purple-500 focus:bg-purple-50/30"
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <Camera size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Product Images</h2>
                    <p className="text-sm text-white/80">Upload high-quality images</p>
                  </div>
                </div>

                <div className="p-6">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragging
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="images"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleImageChange}
                      multiple
                      className="hidden"
                    />
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isDragging ? "bg-purple-100" : "bg-gray-100"
                      }`}
                    >
                      <Upload
                        size={32}
                        className={`transition-colors ${
                          isDragging ? "text-purple-500" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <p className="text-gray-700 font-medium mb-1">
                      {isDragging ? "Drop images here" : "Drag & drop images here"}
                    </p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, JPEG up to 10MB each</p>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-700">
                          {formData.images.length} image{formData.images.length > 1 ? "s" : ""} selected
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, images: [] })}
                          className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
                        >
                          <Trash2 size={14} />
                          Clear all
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {formData.images.map((img, index) => (
                          <div key={index} className="relative group aspect-square">
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded-xl border-2 border-gray-200 shadow-md"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition-colors shadow-lg"
                              >
                                <X size={20} className="text-white" />
                              </button>
                            </div>
                            {index === 0 && (
                              <span className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-medium rounded-lg shadow-md">
                                Cover
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-6">
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <DollarSign size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Pricing & Policy</h2>
                    <p className="text-sm text-white/80">Set pricing, payments and return</p>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <Box size={16} className="text-emerald-500" />
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:bg-emerald-50/30"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <span className="text-emerald-500 font-bold text-base">₹</span>
                      Original Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className={`w-full pl-10 pr-5 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 ${
                          errors.price
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-emerald-500 focus:bg-emerald-50/30"
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
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <Percent size={16} className="text-emerald-500" />
                      Sale Price (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className={`w-full pl-10 pr-5 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 ${
                          errors.discountPrice
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-emerald-500 focus:bg-emerald-50/30"
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

                  {formData.price &&
                    formData.discountPrice &&
                    parseFloat(formData.discountPrice) < parseFloat(formData.price) && (
                      <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-emerald-600 font-semibold text-sm">You save</p>
                            <p className="text-2xl font-bold text-emerald-700">
                              ₹
                              {(
                                parseFloat(formData.price) - parseFloat(formData.discountPrice)
                              ).toFixed(2)}
                            </p>
                          </div>
                          <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-black text-xl shadow-lg shadow-emerald-200">
                            {calculateDiscount()}%
                          </div>
                        </div>
                      </div>
                    )}

                  <div className="border-t border-gray-200 pt-5 space-y-4">
                    <h3 className="text-sm font-bold text-gray-800">Payment Options</h3>

                    <label className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Truck size={18} className="text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Cash on Delivery</span>
                      </div>
                      <input
                        type="checkbox"
                        name="paymentOptions.cod"
                        checked={formData.cod}
                        // onChange={handleChange}
                        onChange={(e) => handleCheckbox("cod", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard size={18} className="text-emerald-600" />
                        <span className="text-sm font-medium text-gray-700">Online Payment</span>
                      </div>
                      <input
                        type="checkbox"
                        name="online"
                        checked={formData.online}
                        // onChange={handleChange}
                        onChange={(e) => handleCheckbox("online", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </label>

                    {errors.paymentOptions && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.paymentOptions}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-5 space-y-4">
                    <h3 className="text-sm font-bold text-gray-800">Return Policy</h3>

                    <label className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <RotateCcw size={18} className="text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">Return Available</span>
                      </div>
                      <input
                        type="checkbox"
                        name="returnPolicy.isReturnable"
                        checked={formData.isReturnable}
                        // onChange={handleChange}
                         onChange={(e) => handleCheckbox("isReturnable", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </label>

                    {formData.isReturnable && (
                      <>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <ShieldCheck size={16} className="text-purple-500" />
                            Return Days
                          </label>
                          <input
                            type="number"
                            name="returnDays"
                            value={formData.returnDays}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500"
                          />
                          {errors.returnDays && (
                            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle size={14} />
                              {errors.returnDays}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FileText size={16} className="text-purple-500" />
                            Policy Text
                          </label>
                          <textarea
                            name="policyText"
                            value={formData.policyText}
                             onChange={handleChange}
                             
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none resize-none focus:border-purple-500"
                            placeholder="e.g. 7 days return available"
                          />
                          {errors.policyText && (
                            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle size={14} />
                              {errors.policyText}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {formData.price && (
                    <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Customer Fees
                      </p>
                      <div className="flex items-baseline gap-3">
                        {formData.discountPrice &&
                        parseFloat(formData.discountPrice) < parseFloat(formData.price) ? (
                          <>
                            <span className="text-3xl font-black text-emerald-600">
                              ₹{formData.discountPrice}
                            </span>
                            <span className="text-lg text-gray-400 line-through">
                              ₹{formData.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-3xl font-black text-gray-800">
                            ₹{formData.price}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-purple-300 hover:shadow-2xl hover:shadow-purple-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={24} className="animate-spin" />
                          <span>Adding Product...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={24} />
                          <span>Publish Product</span>
                          <ChevronRight
                            size={20}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-3xl p-6 shadow-lg shadow-purple-100">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={20} className="text-violet-500" />
                  <h3 className="font-bold text-gray-800">Pro Tips</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use clear, descriptive titles",
                    "Include key product features",
                    "Set competitive pricing",
                    "Upload multiple high-quality images",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
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

export default ProductForm;






