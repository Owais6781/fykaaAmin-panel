
import React, {  useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Package,
  ImageIcon,
  AlertCircle,
  ArrowLeft,
  Edit3,
  Eye,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  TrendingUp,
  Copy,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  BarChart3,
  ShoppingBag,
  Activity,
  DollarSign,
  Box,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  Printer,
  QrCode,
  History,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { useGetViewQuery } from "../api/product";

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
  createdAt?: string;
  updatedAt?: string;
};

const ViewProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const Api = import.meta.env.VITE_API_URL as string;

  const { data, isLoading, isError, error, refetch } = useGetViewQuery(id!, {
    skip: !id,
  });

  const product: ProductFromApi | undefined = useMemo(() => {
    if (!data || !id) return undefined;
    const payload: any = (data as any)?.data ?? data;
    if (Array.isArray(payload)) {
      return payload.find((p: any) => String(p?._id) === String(id));
    }
    if (payload && String(payload?._id) === String(id)) return payload;
    const maybeArray = payload?.data;
    if (Array.isArray(maybeArray)) {
      return maybeArray.find((p: any) => String(p?._id) === String(id));
    }
    return undefined;
  }, [data, id]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "images" | "analytics" | "activity">("overview");
  const [showActions, setShowActions] = useState(false);

  const categories = useMemo(
    () => [
      { value: "Decorative-Lights", label: "Decorative Lights", icon: "💡", color: "from-amber-500 to-orange-500", bg: "bg-amber-50", text: "text-amber-700" },
      { value: "Indoor-Plants", label: "Indoor Plants", icon: "🪴", color: "from-green-500 to-emerald-500", bg: "bg-green-50", text: "text-green-700" },
      { value: "Curtains", label: "Curtains", icon: "🪟", color: "from-purple-500 to-pink-500", bg: "bg-purple-50", text: "text-purple-700" },
      { value: "Cushions", label: "Cushions", icon: "🛋️", color: "from-rose-500 to-red-500", bg: "bg-rose-50", text: "text-rose-700" },
      { value: "Lighting", label: "Lighting", icon: "💡", color: "from-yellow-500 to-amber-500", bg: "bg-yellow-50", text: "text-yellow-700" },
      { value: "Wall-Art", label: "Wall Art", icon: "🖼️", color: "from-indigo-500 to-purple-500", bg: "bg-indigo-50", text: "text-indigo-700" },
    ],
    []
  );

  const imageByIndexUrl = (productId: string, index: number) =>
    `${Api}/api/${productId}/img/${index}`;

  const existingImages = useMemo(() => {
    if (!product?.images) return [];
    return Array.isArray(product.images)
      ? product.images.map((x: any) => (typeof x === "string" ? x : x?._id || String(x)))
      : [];
  }, [product]);

  const calculateDiscount = () => {
    if (product?.price && product?.discountPrice) {
      const original = product.price;
      const discount = product.discountPrice;
      if (!original || discount >= original) return 0;
      return Math.round(((original - discount) / original) * 100);
    }
    return 0;
  };

  const getCategoryInfo = (value: string) => {
    return categories.find((c) => c.value === value);
  };

  const getStockStatus = () => {
    const stock = product?.stock || 0;
    if (stock === 0) return { label: "Out of Stock", color: "text-red-600", bg: "bg-red-50", icon: XCircle };
    if (stock <= 5) return { label: "Low Stock", color: "text-amber-600", bg: "bg-amber-50", icon: AlertTriangle };
    if (stock <= 20) return { label: "Medium Stock", color: "text-blue-600", bg: "bg-blue-50", icon: AlertCircle };
    return { label: "In Stock", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < existingImages.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : existingImages.length - 1
    );
  };

  // Mock analytics data
  const analyticsData = {
    totalViews: 1247,
    viewsChange: 12.5,
    totalSales: 89,
    salesChange: -3.2,
    revenue: 45670,
    revenueChange: 8.7,
    conversionRate: 7.1,
    conversionChange: 2.3,
  };

  // Mock activity data
  const activityLog = [
    { id: 1, action: "Price updated", user: "Admin", time: "2 hours ago", icon: DollarSign },
    { id: 2, action: "Stock updated to 45", user: "System", time: "5 hours ago", icon: Box },
    { id: 3, action: "Image added", user: "Admin", time: "1 day ago", icon: ImageIcon },
    { id: 4, action: "Product created", user: "Admin", time: "3 days ago", icon: Package },
  ];

  // Loading State
  if (!id) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-100 flex items-center justify-center">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Invalid Route</h2>
          <p className="text-slate-500 mt-2">Product ID is missing from the URL</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen stickey  flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Package size={28} className="text-violet-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Loading Product</h2>
          <p className="text-slate-500 mt-1">Fetching product details...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen ml-64 flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-100 flex items-center justify-center">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800">Failed to Load</h2>
          <p className="text-center text-slate-500 mt-2">
            {(error as any)?.data?.message || "Something went wrong"}
          </p>
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => refetch()}
              className="flex-1 px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Retry
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus();
  const categoryInfo = getCategoryInfo(product.category || "");
  const discountPercent = calculateDiscount();

  // Image Zoom Modal
  const ImageZoomModal = () => (
    <div
      className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-all duration-300 ${
        isImageZoomed ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setIsImageZoomed(false)}
    >
      <button
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        onClick={() => setIsImageZoomed(false)}
      >
        <X size={24} />
      </button>

      {existingImages.length > 1 && (
        <>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <img
        src={imageByIndexUrl(product._id, selectedImageIndex)}
        alt="Zoomed"
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {existingImages.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(idx); }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === selectedImageIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
     <div className="min-h-screen  bg-slate-50  overflow-hidden">
  
      <ImageZoomModal />

      {/* Header */}
      <header className=" bg-white border-b border-slate-200 overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft size={20} className="text-slate-600" />
              </button>

              <div className="h-8 w-px bg-slate-200"></div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-slate-800">Product Details</h1>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${stockStatus.bg} ${stockStatus.color}`}>
                    {stockStatus.label}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-0.5">
                  ID: {product._id}
                  <button
                    onClick={() => copyToClipboard(product._id)}
                    className="ml-2 text-slate-400 hover:text-slate-600"
                  >
                    <Copy size={12} />
                  </button>
                </p>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => refetch()}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                title="Refresh"
              >
                <RefreshCw size={18} className="text-slate-600" />
              </button>

              <button
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                title="Download"
              >
                <Download size={18} className="text-slate-600" />
              </button>

              <button
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                title="Print"
              >
                <Printer size={18} className="text-slate-600" />
              </button>

              <div className="h-8 w-px bg-slate-200"></div>

              <button
                onClick={() => navigate(`/edit/${product._id}`)}
                className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors"
              >
                <Edit3 size={18} />
                Edit Product
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <MoreHorizontal size={18} className="text-slate-600" />
                </button>

                {showActions && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                      <Copy size={16} />
                      Duplicate
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                      <ExternalLink size={16} />
                      View Live
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                      <QrCode size={16} />
                      Generate QR
                    </button>
                    <hr className="my-2 border-slate-100" />
                    <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 -mb-px">
            {[
              { id: "overview", label: "Overview", icon: Eye },
              { id: "images", label: "Images", icon: ImageIcon },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "activity", label: "Activity", icon: History },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-slate-50 text-violet-600 border-b-2 border-violet-600"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Main Info */}
            <div className="col-span-8 space-y-6">
              {/* Product Info Card */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-lg font-semibold text-slate-800">Product Information</h2>
                </div>

                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Main Image */}
                    <div className="w-48 h-48 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 group relative cursor-pointer" onClick={() => setIsImageZoomed(true)}>
                      {existingImages.length > 0 ? (
                        <>
                          <img
                            src={imageByIndexUrl(product._id, 0)}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "https://via.placeholder.com/200x200?text=No+Image";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ZoomIn size={24} className="text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={48} className="text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-4">
                      {/* Category */}
                      {categoryInfo && (
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${categoryInfo.bg} ${categoryInfo.text}`}>
                          <span>{categoryInfo.icon}</span>
                          <span className="font-medium text-sm">{categoryInfo.label}</span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-800">
                        {product.title || "Untitled Product"}
                      </h3>

                      {/* Price */}
                      <div className="flex items-baseline gap-3">
                        {product.discountPrice && product.discountPrice < (product.price || 0) ? (
                          <>
                            <span className="text-3xl font-bold text-emerald-600">
                              Rs {product.discountPrice.toLocaleString()}
                            </span>
                            <span className="text-xl text-slate-400 line-through">
                              Rs {product.price?.toLocaleString()}
                            </span>
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold">
                              {discountPercent}% OFF
                            </span>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-slate-800">
                            Rs {(product.price || 0).toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Stock */}
                      <div className="flex items-center gap-3">
                        <stockStatus.icon size={18} className={stockStatus.color} />
                        <span className={`font-medium ${stockStatus.color}`}>
                          {product.stock || 0} units in stock
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-lg font-semibold text-slate-800">Description</h2>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 leading-relaxed">
                    {product.description || "No description available for this product."}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                      <Eye size={20} className="text-violet-600" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <ArrowUpRight size={14} />
                      +{analyticsData.viewsChange}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-3">{analyticsData.totalViews.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">Total Views</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <ShoppingBag size={20} className="text-emerald-600" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-red-600">
                      <ArrowDownRight size={14} />
                      {analyticsData.salesChange}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-3">{analyticsData.totalSales}</p>
                  <p className="text-sm text-slate-500">Total Sales</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <DollarSign size={20} className="text-amber-600" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <ArrowUpRight size={14} />
                      +{analyticsData.revenueChange}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-3">Rs {analyticsData.revenue.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">Revenue</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <TrendingUp size={20} className="text-blue-600" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <ArrowUpRight size={14} />
                      +{analyticsData.conversionChange}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-3">{analyticsData.conversionRate}%</p>
                  <p className="text-sm text-slate-500">Conversion</p>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Product Details */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Product Details</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Product ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-slate-700">{product._id.slice(-8)}</span>
                      <button onClick={() => copyToClipboard(product._id)} className="text-slate-400 hover:text-slate-600">
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Category</span>
                    <span className="text-sm font-medium text-slate-700">{categoryInfo?.label || "-"}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Original Price</span>
                    <span className="text-sm font-medium text-slate-700">Rs {(product.price || 0).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Sale Price</span>
                    <span className="text-sm font-medium text-emerald-600">
                      {product.discountPrice ? `Rs ${product.discountPrice.toLocaleString()}` : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Discount</span>
                    <span className="text-sm font-medium text-emerald-600">
                      {discountPercent > 0 ? `${discountPercent}%` : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Stock</span>
                    <span className={`text-sm font-medium ${stockStatus.color}`}>{product.stock || 0} units</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Images</span>
                    <span className="text-sm font-medium text-slate-700">{existingImages.length} uploaded</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-500">Status</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      (product.stock || 0) > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {(product.stock || 0) > 0 ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex justify-between items-start py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Payment Options</span>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${product?.paymentOptions?.cod
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        COD: {product?.paymentOptions?.cod ? "Available" : "Not Available"}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold 
                          ${product?.paymentOptions?.online
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        Online: {product?.paymentOptions?.online ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Return Policy</span>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${product?.returnPolicy?.isReturnable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        Returnable: {product?.returnPolicy?.isReturnable ? "Yes" : "No"}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold 
                          ${product?.paymentOptions?.online
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        Return Days: {product?.returnPolicy?.returnDays ? product?.returnPolicy?.returnDays : "Not Available"}
                      </span>
                      
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${product?.paymentOptions?.online
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                       Policy Text: {product?.returnPolicy?.policyText ? product?.returnPolicy?.policyText : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === "images" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Product Images</h2>
                <p className="text-sm text-slate-500 mt-1">{existingImages.length} images uploaded</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors">
                <ImageIcon size={18} />
                Add Images
              </button>
            </div>

            <div className="p-6">
              {existingImages.length > 0 ? (
                <div className="grid grid-cols-4 gap-6">
                  {existingImages.map((_, index) => (
                    <div key={index} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={imageByIndexUrl(product._id, index)}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedImageIndex(index);
                            setIsImageZoomed(true);
                          }}
                          className="p-2.5 rounded-lg bg-white/90 text-slate-700 hover:bg-white transition-colors"
                        >
                          <ZoomIn size={18} />
                        </button>
                        <button className="p-2.5 rounded-lg bg-white/90 text-slate-700 hover:bg-white transition-colors">
                          <Download size={18} />
                        </button>
                        <button className="p-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Index Badge */}
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 rounded-lg text-white text-xs font-medium">
                        {index + 1}
                      </div>

                      {index === 0 && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-violet-600 rounded-lg text-white text-xs font-medium">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                    <ImageIcon size={40} className="text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700">No Images</h3>
                  <p className="text-slate-500 mt-1">Upload images for this product</p>
                  <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors mx-auto">
                    <ImageIcon size={18} />
                    Upload Images
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Eye size={24} className="text-violet-600" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    analyticsData.viewsChange >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {analyticsData.viewsChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(analyticsData.viewsChange)}%
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-800">{analyticsData.totalViews.toLocaleString()}</p>
                <p className="text-sm text-slate-500 mt-1">Total Views</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <ShoppingBag size={24} className="text-emerald-600" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    analyticsData.salesChange >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {analyticsData.salesChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(analyticsData.salesChange)}%
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-800">{analyticsData.totalSales}</p>
                <p className="text-sm text-slate-500 mt-1">Total Sales</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <DollarSign size={24} className="text-amber-600" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    analyticsData.revenueChange >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {analyticsData.revenueChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(analyticsData.revenueChange)}%
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-800">Rs {analyticsData.revenue.toLocaleString()}</p>
                <p className="text-sm text-slate-500 mt-1">Total Revenue</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <TrendingUp size={24} className="text-blue-600" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    analyticsData.conversionChange >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {analyticsData.conversionChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(analyticsData.conversionChange)}%
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-800">{analyticsData.conversionRate}%</p>
                <p className="text-sm text-slate-500 mt-1">Conversion Rate</p>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Sales Over Time</h3>
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 size={48} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-slate-500">Chart visualization would go here</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Traffic Sources</h3>
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                  <div className="text-center">
                    <Activity size={48} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-slate-500">Chart visualization would go here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800">Activity Log</h2>
              <p className="text-sm text-slate-500 mt-1">Track all changes made to this product</p>
            </div>

            <div className="divide-y divide-slate-100">
              {activityLog.map((activity) => (
                <div key={activity.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <activity.icon size={20} className="text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-800">{activity.action}</p>
                      <span className="text-sm text-slate-400">{activity.time}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">by {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewProduct;