import ProductHeader from "../Reports/ReuseComponents/ProductHeader";
import ProductStatCard from "../Reports/ReuseComponents/ProductStatCard";
import ProductSalesChart from "../Reports/ReuseComponents/ProductSalesChart";
import CategoryPieChart from "../Reports/ReuseComponents/CategoryPieChart";
import TopProductsTable from "../Reports/ReuseComponents/TopProductsTable";
import OrderDetailsModal from "../Reports/ReuseComponents/OrderDetailsModal";
import ExportExcel from "../ExcelDownload/ExportExcel"; import {
    Package,
    ShoppingCart,
    IndianRupee,
    BadgeDollarSign,
    MoreHorizontal
} from "lucide-react";

import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"

import { useGetMyOrdersQuery } from "../../api/orderApi";
import { useGetProductsQuery } from "../../api/product";


type UserInfo = {
    fullName: string;
    email: string;
    phone: string;
};



type OrderItem = {
    productId: string;
    title: string;
    price: number;
    discountPrice: number;
    quantity: number;
    image: string;
    category: string;
    stock: string | number;


}
type Order = {
    _id: string;
    userId: string;
    orderId?: string;
    orderStatus: string;
    quantity: string;
    paymentStatus: string;
    paymentMethod: string;
    totalAmount?: number;
    createdAt: string;
    customerName?: string;
    items?: OrderItem[];
    userInfo?: UserInfo;

};

const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#F59E0B",
    "#60A5FA",
    "#22C55E",
    "#6C4CF1",
];







export default function ProductReports() {
    const navigate = useNavigate()


    const [open, setOpen] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
    const [title, setTitle] = useState("");



    const { data: productsData } = useGetProductsQuery();
    const products = Array.isArray(productsData) ? productsData : [];

    const [selectedCategory, setSelectedCategory] = useState("All ");

    const { data, } = useGetMyOrdersQuery();

    const orders: Order[] = Array.isArray(data) ? data : [];


    const [showMenu, setShowMenu] = useState(false);



    const totalProducts = new Set(
        orders.flatMap((order) =>
            order.items?.map((item) => item.productId) || []
        )
    ).size;

    // Products Sold
    const productsSold = orders.reduce((total, order) => {
        if (order.orderStatus === "Cancelled") return total;
        return (
            total +
            (order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0)
        );
    }, 0);

    // Total Revenue
    const totalRevenue = orders.reduce((total, order) => {
        if (order.orderStatus === "Cancelled") return total;

        return total + (order.totalAmount || 0);
    }, 0);

    // Average Product Price
    const allItems = orders.flatMap((order) => order.items || []);

    const avgPrice =
        allItems.length > 0
            ? allItems.reduce(
                (sum, item) => sum + (item.discountPrice || item.price),
                0
            ) / allItems.length
            : 0;



    const categoryData = Object.values(
        orders.flatMap((order) => order.items || []).reduce(
            (acc: Record<string, { name: string; value: number }>, item) => {
                const category = item.category || "Others";

                if (!acc[category]) {
                    acc[category] = {
                        name: category,
                        value: 0,
                    };
                }
                acc[category].value += item.quantity;

                return acc;
            },
            {}
        )
    );


    const categories = [
        "Select Category  ",
        ...new Set(
            orders.flatMap(
                (order) => order.items?.map((item) => item.category) || []
            )
        ),
    ];





    const categoryChartData = useMemo(() => {
        const map: Record<string, number> = {};

        orders
            .filter((order) => order.orderStatus === "Delivered")
            .forEach((order) => {
                const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                });

                order.items?.forEach((item) => {
                    if (
                        selectedCategory === "All " ||
                        item.category === selectedCategory
                    ) {
                        map[date] = (map[date] || 0) + item.quantity;
                    }
                });
            });

        return Object.entries(map).map(([date, sales]) => ({
            date,
            sales,
        }));
    }, [orders, selectedCategory]);







    const topProducts = useMemo(() => {
        const map = new Map();

        orders?.forEach((order) => {

            const holdStatuses = [
                "Pending",
                "Confirmed",
                "Processing",
                "Shipped",

            ];
            order.items?.forEach((item) => {
                if (order.orderStatus === "Cancelled") return;
                //  if (!validStatuses.includes(order.orderStatus)) return;
                const CurentProduct = products.find((p: any) => p._id === item.productId)


                if (!map.has(item.productId)) {
                    map.set(item.productId, {
                        id: item.productId,
                        image: item.image || "/placeholder.png",
                        name: item.title,
                        category: item.category,
                        Hold: 0,
                        Soldout: 0,
                        discountPrice: item.discountPrice,
                        revenue: 0,
                        status: CurentProduct?.isActive ? "Active" : "Inactive",
                        stock: CurentProduct?.stock ?? 0,
                    });
                    console.log("image", item.image)
                }

                const product = map.get(item.productId);

                if (holdStatuses.includes(order.orderStatus)) {
                    product.Hold += Number(item.quantity);
                }

                if (order.orderStatus === "Delivered") {
                    product.Soldout += item.quantity;
                    product.revenue += item.quantity * item.discountPrice;
                }
            });
        });

        return [...map.values()].sort((a, b) => b.sold - a.sold);
    }, [orders]);



    const excelData = topProducts.map((product) => ({
        Product_ID: product.id,
        Title: product.name,
        Category: product.category,
        Sold: product.sold,
        Soldout: product.Soldout,
        Stock: Number(product.stock),
        Revenue: product.revenue,
        Status: product.status,
    }));

    const ITEMS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(topProducts.length / ITEMS_PER_PAGE);

    const paginatedOrders = topProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )



    const handleOrderBook = () => {
        navigate("/dashboard/order-list")
    }



    const holdStatuses = [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
    ];

    const handleViewOrders = (
        category: string,
        type: "all" | "hold"
    ) => {
        const list = orders.filter((order) =>
            order.items?.some((item) => {
                if (type === "hold") {
                    return (
                        item.category === category &&
                        holdStatuses.includes(order.orderStatus)
                    );
                }

                return item.category === category;
            })
        );

        setSelectedOrders(list);
        setTitle(
            `${category} - ${type === "hold" ? "Hold Orders" : "Total Orders"
            }`
        );
        setOpen(true);
    };



    const columns = [
        {
            header: "Title",
            accessor: "name",

        },
        {
            header: "Category",
            accessor: "category",

        },

        {
            header: "Hold",
            accessor: "Hold",

        },

        {
            header: "Price",
            accessor: "discountPrice",

        },
        {
            header: "Soldout",
            accessor: "Soldout",

        },

        {
            header: "Total",
            accessor: "revenue",

        },
        {
            header: "Stock",
            accessor: "stock",

        },
        {
            header: "Status",
            accessor: "status",

        },
        {
            header: "",
            render: (row: any) => (
                <button
                    onClick={() => handleViewOrders(row.category, "all")}
                    className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                    <MoreHorizontal size={18} className="text-gray-500" />
                </button>
            ),
        },
    ];




    return (
        <div className="min-h-screen bg-[#f7f7f5] p-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <ProductHeader />

                {/* KPI Cards */}
                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                    <ProductStatCard
                        title="Total Products"
                        value={totalProducts.toString()}
                        growth="12.5%"
                        icon={<Package size={24} />}
                        iconBg="bg-purple-100"
                        iconColor="text-purple-600"
                        positive
                    />

                    <ProductStatCard
                        title="Products Sold"
                        value={productsSold.toLocaleString()}
                        growth="18.3%"
                        icon={<ShoppingCart size={24} />}
                        iconBg="bg-green-100"
                        iconColor="text-green-600"
                        positive
                    />

                    <ProductStatCard
                        title="Total Revenue"
                        value={`₹${totalRevenue.toLocaleString("en-IN")}`}
                        growth="22.7%"
                        icon={<IndianRupee size={24} />}
                        iconBg="bg-orange-100"
                        iconColor="text-orange-500"
                        positive
                    />

                    <ProductStatCard
                        title="Avg. Price"
                        value={`₹${avgPrice.toFixed(2)}`}
                        growth="3.4%"
                        icon={<BadgeDollarSign size={24} />}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                        positive={false}
                    />

                </div>

                {/* Charts */}
                <div className="mt-6 grid gap-5 lg:grid-cols-12">

                    <div className="lg:col-span-8">


                        <ProductSalesChart
                            title="Category-wise Sales Overview"
                            data={categoryChartData}
                            dataKey="sales"
                            xAxisKey="date"
                            color="#6C4CF1"
                            label={`${selectedCategory} Sales`}
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                    </div>

                    <div className="lg:col-span-4">
                        <CategoryPieChart
                            title="Sales by Category"
                            data={categoryData}
                            colors={COLORS}
                            centerLabel="Total Orders"
                        />
                    </div>

                </div>

                {/* Table */}
                <div >
                    <TopProductsTable
                        title="Top Selling Products"
                        subtitle="Best performing products this month"
                        columns={columns}
                        data={paginatedOrders}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={orders.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPrevious={() => setCurrentPage((prev) => prev - 1)}
                        onNext={() => setCurrentPage((prev) => prev + 1)}
                        headerAction={
                            <div className="relative">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <MoreHorizontal size={18} />
                                </button>

                                {showMenu && (
                                    <div className="absolute right-0 w-40 rounded-xl bg-white shadow-lg p-2 z-50">
                                        <div className="mb-2">
                                            <ExportExcel
                                                data={excelData}
                                                fileName="Top Selling "
                                                sheetName="Top Selling Products"
                                                buttonText="Export Excel"
                                                className="w-full text-left text-[12px] cursor-pointer text-indigo-500 font-medium"
                                            />
                                        </div>

                                        <button
                                            onClick={() => {
                                                handleOrderBook();
                                                setShowMenu(false);
                                            }}
                                            className="w-full text-left text-[12px] cursor-pointer text-indigo-500 font-medium "
                                        >
                                            View all
                                        </button>
                                    </div>
                                )}
                            </div>
                        }
                    />

                </div>
<OrderDetailsModal
    open={open}
    onClose={() => setOpen(false)}
    title={title}
    orders={selectedOrders}
/>


              {/* {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="w-full max-w-6xl rounded-2xl bg-white shadow-2xl overflow-hidden">

                
                            <div className="flex items-center justify-between border-b px-6 py-5 bg-gray-50">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        View all orders for this category
                                    </p>
                                </div>

                                <button
                                    onClick={() => setOpen(false)}
                                    className="h-10 w-10 rounded-full hover:bg-red-100 text-red-500 transition"
                                >
                                    ✕
                                </button>
                            </div>

            
                            <div className="flex items-center justify-between p-4 border-b">
                                <input
                                    type="text"
                                    placeholder="Search Order ID..."
                                    className="w-72 rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                <span className="text-sm text-gray-500">
                                    Total Orders : {selectedOrders.length}
                                </span>
                            </div>

                     
                            <div className="max-h-[400px] overflow-y-auto">
                                <table className="min-w-full">

                                    <thead className="sticky top-0 bg-gray-100 z-10">
                                        <tr className="text-left text-sm font-semibold text-gray-700">

                                            <th className="px-5 py-3">Order ID</th>
                                            <th className="px-5 py-3">Product</th>
                                            <th className="px-5 py-3">Category</th>
                                            <th className="px-5 py-3">Price</th>
                                            <th className="px-5 py-3">Qty</th>
                                            <th className="px-5 py-3">Status</th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {selectedOrders.map((order) =>
                                            order.items?.map((item) => (
                                                <tr
                                                    key={`${order.orderId}-${item.productId}`}
                                                    className="border-b hover:bg-indigo-50 transition"
                                                >
                                                    <td className="px-5 py-4 font-medium text-indigo-600">
                                                        {order.orderId}
                                                    </td>

                                                    <td className="px-5 py-4 flex items-center gap-3">

                                                        <img
                                                            src={`${Api}/api/image/${item.image}`}
                                                            className="h-12 w-12 rounded-lg object-cover border"
                                                        />

                                                        <div>
                                                            <p className="font-medium">{item.title}</p>
                                                            <p className="text-xs text-gray-500">
                                                                #{item.productId.slice(0, 8)}
                                                            </p>
                                                        </div>

                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {item.category}
                                                    </td>

                                                    <td className="px-5 py-4 font-semibold">
                                                        ₹{item.discountPrice}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {item.quantity}
                                                    </td>

                                                    <td className="px-5 py-4">

                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-semibold
                                                               ${order.orderStatus === "Delivered"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : order.orderStatus === "Cancelled"
                                                                        ? "bg-red-100 text-red-700"
                                                                        : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                        >
                                                            {order.orderStatus}
                                                        </span>

                                                    </td>

                                                </tr>
                                            ))
                                        )}

                                    </tbody>
                                </table>
                            </div>

                         

                            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">

                                <span className="text-sm text-gray-500">
                                    Showing {selectedOrders.length} Orders
                                </span>

                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                                >
                                    Close
                                </button>

                            </div>

                        </div>
                    </div>
                )}  */}

            </div>

        </div>
    );
}
