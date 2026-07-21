import StatCard from "./ReuseComponents/StatCard";
import GoalCard from "./ReuseComponents/GoalCard";
import TrafficChart from "./ReuseComponents/TrafficChart";
import SalesPerformance from "./ReuseComponents/SalesPerformance";
import SurveyCard from "./ReuseComponents/SurveyCard";



import { useGetMyOrdersQuery } from "../../api/orderApi";


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


export default function RevenueReports() {


    const { data, } = useGetMyOrdersQuery();

    const orders: Order[] = Array.isArray(data) ? data : [];





    const totalRevenue = orders.reduce(
        (sum: number, order: any) => sum + (order.totalAmount || 0),
        0
    );

    // const totalOrders = orders.length;

    // const completedOrders = orders.filter(
    //     (order: any) => order.orderStatus === "Delivered"
    // ).length;

    // const totalCustomers = new Set(
    //     orders.map((order: any) => order.userInfo?._id)
    // ).size;

    // const averageOrderValue =
    //     totalOrders > 0 ? totalRevenue / totalOrders : 0;



    return (
        <div className="min-h-screen bg-[#f7f6f3] p-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#2f241f]">
                            Revenue Stream
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Analytics overview of your business
                        </p>
                    </div>

                    <div className="text-right">
                        <h1 className="text-5xl font-bold tracking-tight text-[#2f241f]">
                            $510,229
                        </h1>

                        <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                            ↑ 12.2%
                        </span>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-12 gap-5">

                    {/* Left Side */}
                    <div className="col-span-12 space-y-5 xl:col-span-8">

                        {/* KPI Cards */}
                        <div className="grid gap-5 md:grid-cols-3">
                            <StatCard
                                title="Total Product Sold"
                                value="152,890"
                                growth="7.2%"
                                positive
                            />

                            <StatCard
                                title="Total Customers"
                                value="95,855"
                                growth="10.8%"
                                positive
                            />

                            <StatCard
                                title="ROI"
                                value="125%"
                                growth="20%"
                                positive
                            />
                        </div>

                        {/* Bottom Section */}
                        <div className="grid gap-5 lg:grid-cols-12">

                            {/* Goal Card */}
                            <div className="lg:col-span-4">
                                <GoalCard
                                    revenue={totalRevenue}
                                    target={1000000}
                                />
                            </div>

                            {/* Traffic Chart */}
                            <div className="lg:col-span-8">
                                <TrafficChart />
                            </div>

                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="col-span-12 space-y-5 xl:col-span-4">

                        <SalesPerformance />

                        <SurveyCard />

                    </div>

                </div>
            </div>
        </div>
    );
}