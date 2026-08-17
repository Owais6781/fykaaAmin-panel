

import type { LucideIcon, } from "lucide-react";
import { Trash2, Loader2 } from "lucide-react";
import { useState, useMemo, } from "react";
import MUIDataTable from "mui-datatables";
import { toast } from "sonner";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import {
    Package,
    DollarSign,
    AlertTriangle,
    Layers,
    XCircle,
    Plus,
    RefreshCw,
} from "lucide-react";
import {
    useGetProductsQuery,
    useDeleteProductMutation,
} from "../../api/product";
import { useNavigate } from "react-router-dom";

type Product = {
    _id: string;
    sellerId: {
        businessName: string
    };
    title?: string;

    category: {
        _id: string;
        name: string;
        slug: string;
        isActive: boolean;
    };
    price?: number;
    discountPrice?: number;
    stock?: number;
    isActive?: boolean;
    description?: string;
    createdAt?: string;
};

export default function Inventory() {
    const navigate = useNavigate();


    const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    const SuperAdmin = admin.role === "SuperAdmin";

    const { data: productsData, isError, isLoading, refetch } = useGetProductsQuery();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const products: Product[] = Array.isArray(productsData) ? productsData : [];


    const tableData = products.map((product) => ({
        ...product,

        product: product.title || "",

        category: product.category?.name || "",

        Vendor: product.sellerId?.businessName || "",
    }));

    const Api = import.meta.env.VITE_API_URL as string;

    const getImageUrl = (productId: string, index: number = 0) => {
        return `${Api}/api/${productId}/img/${index}`;
    };

    const stats = useMemo(() => {
        const totalItems = products.length;
        const totalValue = products.reduce(
            (acc, p) => acc + (p.discountPrice || p.price || 0) * (p.stock || 0),
            0
        );
        const lowStockCount = products.filter((p) => (p.stock || 0) > 0 && (p.stock || 0) < 10).length;
        const outOfStockCount = products.filter((p) => (p.stock || 0) === 0).length;
        const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);




        return {
            totalItems,
            totalValue,
            lowStockCount,
            outOfStockCount,
            totalStock
        };
    }, [products]);


    const handleForm = () => {
        navigate("/dashboard/form")
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        toast.success("Inventory refreshed");
        setTimeout(() => setIsRefreshing(false), 800);
    };

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
              return;
        }
        const loadingToast = toast.loading("Deleting product...");
        try {
            await deleteProduct(id).unwrap();
            toast.success("Product deleted successfully", { id: loadingToast });
            setShowDeleteModal(false);
            setSelectedProduct(null);
            refetch();

        } catch (err) {
            toast.error("Failed to delete product", { id: loadingToast });
        }
        // }
    };

    const handlePrint = () => {
        const printContent = document.getElementById("print-section");
        const WinPrint = window.open("", "", "width=900,height=650");

        if (WinPrint && printContent) {
            WinPrint.document.write(`
        <html>
          <head>
            <title>Print Product Details</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                padding: 24px;
                line-height: 1.6;
                color: #111827;
              }
              h2 { font-size: 20px; font-weight: 600; margin-bottom: 16px; }
              h3 { font-size: 14px; font-weight: 600; margin-top: 20px; margin-bottom: 12px; color: #374151; }
              p { margin: 4px 0; font-size: 14px; }
              .label { color: #6B7280; font-weight: 500; display: inline-block; width: 120px; }
            </style>
          </head>
          <body>
            <h2>Product Details</h2>
            ${printContent.innerHTML}
          </body>
        </html>
      `);

            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
        }
    };

    const columns = [
        {
            name: "product",
            label: "Product",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    const product = products[dataIndex];
                    return (
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                <img
                                    src={getImageUrl(product._id, 0)}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />

                            </div>
                            <div>
                                <p className="font-medium text-slate-900 line-clamp-1">
                                    {product?.title || "Untitled Product"}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {product?.category?.name || "Uncategorized"}
                                </p>
                            </div>
                        </div>
                    );
                },
            },
        },

        ...(SuperAdmin
            ? [
                {
                    name: "Vendor",
                    label: "Vendor",
                    options: {
                        customBodyRenderLite: (dataIndex: number) => {
                            const product = products[dataIndex];

                            return (
                                <p className="font-medium text-slate-900">
                                    {product?.sellerId?.businessName || "N/A"}
                                </p>
                            );
                        },
                    },
                },
            ]
            : []),

        {
            name: "price",
            label: "Price",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    const product = products[dataIndex];
                    const hasDiscount =
                        product?.discountPrice && product.discountPrice > 0;
                    return (
                        <div>
                            <p className="font-semibold text-slate-900">
                                ₹{product.discountPrice}
                            </p>
                            {hasDiscount && (
                                <p className="text-xs text-slate-400 line-through">
                                    ₹{(product.price || 0).toLocaleString("en-IN")}
                                </p>
                            )}
                        </div>
                    );
                },
            },
        },
        {
            name: "stock",
            label: "Stock ",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    const product = products[dataIndex];
                    const stock = product.stock || 0;

                    let badgeStyle = "bg-green-50 text-green-700 border-green-200";
                    let label = `${stock} in stock`;

                    if (stock === 0) {
                        badgeStyle = "bg-red-50 text-red-700 border-red-200";
                        label = "Out of Stock";
                    } else if (stock < 10) {
                        badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
                        label = `Low Stock (${stock})`;
                    }

                    return (
                        <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${badgeStyle}`}
                        >
                            {label}
                        </span>
                    );
                },
            },
        },
        {
            name: "isActive",
            label: "Visibility",
            options: {
                customBodyRender: (value: boolean) => (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-slate-50 text-slate-500 border border-slate-200"
                            }`}
                    >
                        {value ? "Active" : "Draft"}
                    </span>
                ),
            },
        },
        {
            name: "actions",
            label: "Actions",
            options: {
                customBodyRenderLite: (dataIndex: number) => {
                    const product = products[dataIndex];
                    return (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate(`/dashboard/view/${product._id}`)}
                                sx={{
                                    minWidth: "32px",
                                    padding: "6px",
                                    borderColor: "#D1D5DB",
                                    color: "#374151",
                                    "&:hover": {
                                        borderColor: "#3B82F6",
                                        backgroundColor: "rgba(59, 130, 246, 0.04)",
                                        color: "#1E40AF",
                                    },
                                }}
                            >
                                <VisibilityIcon fontSize="small" />
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate(`/dashboard/edit/${product._id}`)}
                                sx={{
                                    minWidth: "32px",
                                    padding: "6px",
                                    borderColor: "#D1D5DB",
                                    color: "#374151",
                                    "&:hover": {
                                        borderColor: "#10B981",
                                        backgroundColor: "rgba(16, 185, 129, 0.04)",
                                        color: "#047857",
                                    },
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                disabled={isDeleting}
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setShowDeleteModal(true);
                                }}
                                sx={{
                                    minWidth: "32px",
                                    padding: "6px",
                                    borderColor: "#FCA5A5",
                                    color: "#DC2626",
                                    "&:hover": {
                                        borderColor: "#EF4444",
                                        backgroundColor: "rgba(239, 68, 68, 0.04)",
                                        color: "#B91C1C",
                                    },
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </Button>
                        </div>
                    );
                },
            },
        },
    ];

    const options = {
        selectableRows: "none" as const,
        responsive: "vertical" as const,
        elevation: 0,
        rowsPerPage: 10,
        rowsPerPageOptions: [5, 10, 25],
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-slate-700 font-medium text-lg">
                        Loading inventory...
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                        Please wait while we fetch your products
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle size={32} className="text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                        Connection error
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Unable to load inventory data. Please try again.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium text-sm"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const StatCard = ({
        title,
        value,
        icon: Icon,
        label,
    }: {
        title: string;
        value: string | number;
        icon: LucideIcon;
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                            <Trash2 size={24} />
                        </div>

                        <h3 className="text-lg font-bold text-center text-slate-900 mb-1">Delete Product?</h3>
                        <p className="text-sm text-center text-slate-500 mb-6">
                            This action cannot be undone. <span className="font-semibold text-slate-700">"{selectedProduct?.title}"</span> will be permanently removed.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(selectedProduct?._id || "", selectedProduct?.title || "Product")}
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

            {/* Header Section */}
            <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
                <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Package size={20} className="text-slate-900" />
                            <h1 className="text-2xl font-semibold text-slate-900">
                                Inventory Management
                            </h1>
                        </div>
                        <p className="text-sm text-slate-600">
                            Track product listings, stock counts, and pricing updates
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        {/* Out of Stock Badge */}
                        {stats.outOfStockCount > 0 && (
                            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-rose-100 bg-white/80 backdrop-blur-md shadow-xs hover:shadow-md hover:border-rose-200 transition-all duration-300">

                                <div className="flex flex-col">
                                    <span className="text-[12px] font-semibold uppercase tracking-wider text-rose-500/90 leading-tight">
                                        {stats.outOfStockCount} Out of Stock
                                    </span>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={handleRefresh}
                            className={`p-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 ${isRefreshing ? "animate-spin" : ""
                                }`}
                            title="Refresh Data"
                        >
                            <RefreshCw size={18} />
                        </button>
                        <button
                            onClick={handleForm}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg transition-colors"
                        >
                            <Plus size={18} />
                            Add Product
                        </button>
                    </div>
                </div>

            </div>



            {/* Stats Section */}
            <div className="px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Total Products"
                        value={stats.totalItems}
                        icon={Layers}
                        label="Catalog items"
                    />
                    <StatCard
                        title="Inventory Value"
                        value={`₹${stats.totalValue.toLocaleString("en-IN")}`}
                        icon={DollarSign}
                        label="Total stock worth"
                    />
                    <StatCard
                        title="Total Stock"
                        value={stats.totalStock}
                        icon={Package}
                        label="Units available in inventory"
                    />
                    <StatCard
                        title="Low Stock"
                        value={stats.lowStockCount}
                        icon={AlertTriangle}
                        label="Fewer than 10 remaining"
                    />

                </div>

                {/* Table Section */}
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <MUIDataTable
                        title=""
                        data={tableData}
                        columns={columns}
                        options={options}
                    />
                </div>
            </div>

            {/* Product Details Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle className="text-lg font-semibold text-slate-900 bg-slate-50 border-b border-slate-200">
                    Product Details
                </DialogTitle>

                <DialogActions className="bg-slate-50 border-t border-slate-200 px-6 py-4">
                    <Button
                        onClick={handleClose}
                        sx={{
                            textTransform: "none",
                            color: "#6B7280",
                            "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.04)",
                            },
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handlePrint}
                        variant="contained"
                        startIcon={<PrintIcon />}
                        sx={{
                            textTransform: "none",
                            backgroundColor: "#1F2937",
                            color: "white",
                            fontWeight: 500,
                            "&:hover": {
                                backgroundColor: "#111827",
                            },
                        }}
                    >
                        Print Details
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}