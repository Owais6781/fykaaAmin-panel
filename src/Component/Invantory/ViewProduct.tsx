
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  Package,

  ArrowLeft,
  Edit3,
  Eye,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,

  BarChart3,
  ShoppingBag,
  DollarSign,

  XCircle,

  RefreshCw,

  History,
  Layers,
  Copy,
  Check,
} from "lucide-react";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

import { useGetViewQuery, useGetActivityLogQuery } from "../../api/product";
import { useGetMyOrdersQuery } from "../../api/orderApi";

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
  images?: any[];
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  featured?: boolean;
  isActive?: boolean;
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
const [copied, setCopied] = useState(false);
  const Api = import.meta.env.VITE_API_URL as string;

  const { data, isLoading, isError, error, refetch } = useGetViewQuery(id!, {
    skip: !id,
  });

  const { data: activityLog } = useGetActivityLogQuery(id);
  const { data: orderData } = useGetMyOrdersQuery();

  console.log("activityLog", activityLog)

  const orders = orderData ?? [];

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

  const [range, setRange] = useState<"month" | "lastMonth" | "year">("month");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "images" | "analytics" | "activity"
  >("overview");

  const existingImages = useMemo(() => {
    if (!product?.images) return [];
    return Array.isArray(product.images)
      ? product.images.map((x: any) =>
        typeof x === "string" ? x : x?._id || String(x)
      )
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

  const getStockStatus = () => {
    const stock = product?.stock || 0;
    if (stock === 0)
      return {
        label: "Out of Stock",
        badgeStyle: "bg-red-50 text-red-700 border-red-200",
      };
    if (stock < 10)
      return {
        label: `Low Stock (${stock})`,
        badgeStyle: "bg-amber-50 text-amber-700 border-amber-200",
      };
    return {
      label: `${stock} in stock`,
      badgeStyle: "bg-green-50 text-green-700 border-green-200",
    };
  };

 const copyToClipboard = async (id: string) => {
  try {
    await navigator.clipboard.writeText(id);
    setCopied(true);

  toast.success(`Product ID copied: ${id}`);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  } catch (error) {
    toast.error("Failed to copy Product ID");
  }
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

  const filterOrdersByRange = (ordersList: any) => {
    const now = new Date();

    return ordersList.filter((order: any) => {
      const hasCurrentProduct = order.items?.some(
        (item: any) =>
          String(item.productId?._id || item.productId) ===
          String(product?._id)
      );

      if (!hasCurrentProduct) return false;
      if (!order.createdAt) return false;

      const orderDate = new Date(order.createdAt);

      switch (range) {
        case "month":
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        case "lastMonth": {
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          return (
            orderDate.getMonth() === lastMonth.getMonth() &&
            orderDate.getFullYear() === lastMonth.getFullYear()
          );
        }
        case "year":
          return orderDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const productOrders = filterOrdersByRange(orders).filter((order: any) =>
    order.items?.some(
      (item: any) => String(item.productId) === String(product?._id)
    )
  );

  const revenueMap: Record<string, number> = {};
  const orderMap: Record<string, number> = {};
  const salesMap: Record<string, number> = {};

  productOrders.forEach((order: any) => {

    if (order.orderStatus !== "Delivered") return;
    const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

    const productItem = order.items.find(
      (item: any) => String(item.productId) === String(product?._id)
    );

    if (!productItem) return;

    orderMap[date] = (orderMap[date] || 0) + 1;

    if (order.orderStatus === "Delivered") {
      salesMap[date] = (salesMap[date] || 0) + productItem.quantity;
      revenueMap[date] =
        (revenueMap[date] || 0) +
        (productItem.discountPrice || productItem.price) *
        productItem.quantity;
    }
  });


  const salesChartData = Object.keys(orderMap)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) // Oldest → Newest
    .map((date) => ({
      date,
      orders: orderMap[date] || 0,
      sales: salesMap[date] || 0,
      revenue: revenueMap[date] || 0,
    }));

  const imageByIndexUrl = (productId: string, index: number) =>
    `${Api}/api/${productId}/img/${index}`;

  const StatCard = ({
    title,
    value,
    icon: Icon,
    label,
  }: {
    title: string;
    value: string | number;
    icon: any;
    label: string;
  }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl font-semibold text-slate-900 mt-2">
            {value}
          </h3>
        </div>
        <div className="p-2.5 bg-slate-100 rounded-lg">
          <Icon size={20} className="text-slate-700" />
        </div>
      </div>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );

  // States handling
  if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="text-center bg-white border border-slate-200 p-8 rounded-lg shadow-sm max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Invalid Product ID
          </h2>
          <p className="text-slate-600 mb-6">
            No product identifier was supplied in the URL route.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-700 font-medium text-lg">
            Loading product details...
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Please wait while we fetch the latest product data
          </p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="text-center bg-white border border-slate-200 p-8 rounded-lg shadow-sm max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Failed to Load Product
          </h2>
          <p className="text-slate-600 mb-6">
            {(error as any)?.data?.message ||
              "Unable to load product details at this time."}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 text-sm font-medium inline-flex items-center gap-2"
            >
              <RefreshCw size={16} /> Retry
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus();
  const discountPercent = calculateDiscount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Top Bar Header */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
              title="Go Back"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Package size={20} className="text-slate-900" />
                <h1 className="text-2xl font-semibold text-slate-900 line-clamp-1">
                  {product.title || "Untitled Product"}
                </h1>
              </div>
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <span>Category: {product.category?.name || "Uncategorized"}</span>
                <span>•</span>
                <span className="font-mono text-xs text-slate-400">
                  ID: {product._id}
                </span>
                <button
                  onClick={() => copyToClipboard(product._id)}
                  title="Copy"
                   className="cursor-pointer"
                >
                 {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="p-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
              title="Refresh Details"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={() => navigate(`/dashboard/edit/${product._id}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg transition-colors"
            >
              <Edit3 size={18} /> Edit Product
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 flex border-t border-slate-100 gap-8">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "images", label: "Media Gallery", icon: ZoomIn },
            { id: "analytics", label: "Analytics & Orders", icon: BarChart3 },
            { id: "activity", label: "Activity Logs", icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 flex items-center gap-2 text-sm font-medium border-b-2 transition-colors ${isActive
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 py-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Current Price"
                value={`₹${(
                  product.discountPrice ||
                  product.price ||
                  0
                ).toLocaleString("en-IN")}`}
                icon={DollarSign}
                label={
                  product.price && product.discountPrice
                    ? `Regular: ₹${product.price.toLocaleString("en-IN")}`
                    : "Standard Price"
                }
              />
              <StatCard
                title="Stock Status"
                value={product.stock || 0}
                icon={Package}
                label={stockStatus.label}
              />
              <StatCard
                title="Units Sold"
                value={product.soldCount || 0}
                icon={ShoppingBag}
                label="Total fulfilled sales"
              />
              <StatCard
                title="Reviews / Rating"
                value={`${product.rating || 0} ★`}
                icon={Eye}
                label={`Based on ${product.reviewCount || 0} customer reviews`}
              />
            </div>

            {/* Details Split Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Product Primary Info & Preview */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
                <div className="w-full h-64 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center relative">
                  {existingImages.length > 0 ? (
                    <img
                      src={imageByIndexUrl(product._id, selectedImageIndex)}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : null}

                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${stockStatus.badgeStyle}`}
                    >
                      {stockStatus.label}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isActive
                        ? "bg-slate-100 text-slate-800"
                        : "bg-slate-50 text-slate-400 border border-slate-200"
                        }`}
                    >
                      {product.isActive ? "Active Listing" : "Draft Mode"}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-slate-900">
                    {product.title}
                  </h2>

                  {discountPercent > 0 && (
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-800 rounded">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Category:</span>
                    <span className="font-medium text-slate-900">
                      {product.category?.name || "N/A"}

                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Featured Product:</span>
                    <span className="font-medium text-slate-900">
                      {product.featured ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Created At:</span>
                    <span className="font-medium text-slate-900">
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specifications & Description */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                    Description & Details
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-700 leading-relaxed min-h-[120px]">
                    {product.description ||
                      "No detailed description provided for this product."}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Payment Options */}
                  <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                      Payment Options
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-700">
                          Cash on Delivery (COD)
                        </span>
                        <span
                          className={`font-semibold ${product.paymentOptions?.cod
                            ? "text-green-600"
                            : "text-slate-400"
                            }`}
                        >
                          {product.paymentOptions?.cod
                            ? "Enabled"
                            : "Disabled"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-700">Online Payment</span>
                        <span
                          className={`font-semibold ${product.paymentOptions?.online
                            ? "text-green-600"
                            : "text-slate-400"
                            }`}
                        >
                          {product.paymentOptions?.online
                            ? "Enabled"
                            : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Return Policy */}
                  <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                      Return Policy
                    </h3>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p>
                        <strong className="text-slate-900">
                          Returnable:
                        </strong>{" "}
                        {product.returnPolicy?.isReturnable ? "Yes" : "No"}
                      </p>
                      {product.returnPolicy?.isReturnable && (
                        <p>
                          <strong className="text-slate-900">
                            Return Window:
                          </strong>{" "}
                          {product.returnPolicy.returnDays || 0} Days
                        </p>
                      )}
                      <p className="text-xs text-slate-500 mt-2">
                        {product.returnPolicy?.policyText ||
                          "Standard policy applies."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA GALLERY */}
        {activeTab === "images" && (
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Product Images ({existingImages.length})
            </h3>
            {existingImages.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <Package size={40} className="mx-auto text-slate-300 mb-2" />
                <p>No images uploaded for this product.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {existingImages.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setIsImageZoomed(true);
                    }}
                    className="group relative h-48 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden cursor-pointer flex items-center justify-center"
                  >
                    <img
                      src={imageByIndexUrl(product._id, idx)}
                      alt={`${product.title} - ${idx}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ANALYTICS & ORDERS */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Order Performance Trend
                  </h3>
                  <p className="text-sm text-slate-500">
                    Track daily order intake and completed sales revenue
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {(["month", "lastMonth", "year"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRange(r)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${range === r
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      {r === "month"
                        ? "This Month"
                        : r === "lastMonth"
                          ? "Last Month"
                          : "This Year"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-72 w-full">
                {salesChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />


                      {/* Orders */}
                      <Area
                        type="monotone"
                        dataKey="orders"
                        stroke="#2563EB"
                        fill="#BFDBFE"
                        name="Orders"
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#0F172A"
                        fill="#F1F5F9"
                        name="Sales"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                    No order history recorded for the selected date range.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACTIVITY LOGS */}
        {activeTab === "activity" && (
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Audit & Activity History
            </h3>


            {activityLog?.data && activityLog.data.length > 0 ? (
              <div className="space-y-4">
                {activityLog.data.map((log: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 border border-slate-200 rounded-lg flex justify-between items-center text-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {log.action || "System Update"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {log.details || "No further details provided."}
                      </p>

                    </div>
                    <span className="text-xs text-slate-400">


                      {log.createdAt
                        ? new Date(log.createdAt).toLocaleString("en-GB")
                        : "Recent"}

                      <p className="text-xs text-slate-500">
                        By {log.by || "No further details provided."}
                      </p>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 py-8 text-center">
                No recent activity logs recorded for this product.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {isImageZoomed && existingImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <button
            onClick={() => setIsImageZoomed(false)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
          <div
            className="max-w-4xl max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageByIndexUrl(product._id, selectedImageIndex)}
              alt={product.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            {existingImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900/60 text-white rounded-full hover:bg-slate-900"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900/60 text-white rounded-full hover:bg-slate-900"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;