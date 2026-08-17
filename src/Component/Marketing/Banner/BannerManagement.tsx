

import React from "react";
import {
    Plus,
    Search,
    Eye,
    Edit3,
    Trash2,
    TrendingUp,
    MousePointer,
    Image as ImageIcon,
    CheckCircle2,
    Calendar,

} from "lucide-react";


interface BannerManagementProps {
    isLoading?: boolean
    isError?: boolean
    banners?: any[];
    Api?: string;
    handleAddbanner?: () => void;
    search?: string;
    setSearch?: (val: string) => void;
    bannerType?: string;
    setBannerType?: (val: string) => void;
    status?: string;
    setStatus?: (val: string) => void;
    onView?: (banner: any) => void;
    onEdit?: (banner: any) => void;
    onDelete?: (id: string) => void;
}

export default function BannerManagement({
    isLoading = false,
    isError = false,
    banners = [],
    Api = "",
    handleAddbanner,
    search = "",
    setSearch,
    bannerType = "",
    setBannerType,
    status = "",
    setStatus,
    onView,
    onEdit,
    onDelete,
}: BannerManagementProps) {
    // Average CTR Calculation
    const totalViews = banners.reduce((acc: number, b: any) => acc + (b.views || 0), 0);
    const totalClicks = banners.reduce((acc: number, b: any) => acc + (b.clicks || 0), 0);
    const avgCtr = totalViews ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";




    if (isLoading) {
        return (
            <div className="min-h-[500px] flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"></div>
                    <p className="text-sm text-slate-500">Loading banners...</p>
                </div>
            </div>
        );
    }



    if (isError) {
        return (
            <div className="min-h-[500px] flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600">
                        Failed to load banners
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Something went wrong. Please try again.
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-2 text-white hover:bg-slate-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
            {/* 1. Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
                        Banner Management
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Manage, schedule, and analyze your website promotional banners
                    </p>
                </div>

                <button
                    onClick={handleAddbanner}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0F19] hover:bg-slate-800 text-white px-5 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
                >
                    <Plus size={16} />
                    Add Banner
                </button>
            </div>

            {/* 2. Top Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={<ImageIcon size={18} className="text-slate-700" />}
                    label="Total Banners"
                    value={banners.length}
                />
                <StatCard
                    icon={<CheckCircle2 size={18} className="text-emerald-700" />}
                    label="Active Now"
                    value={banners.filter((b: any) => b.isActive).length}
                    bgClass="bg-emerald-50"
                />
                <StatCard
                    icon={<MousePointer size={18} className="text-indigo-700" />}
                    label="Total Clicks"
                    value={totalClicks.toLocaleString()}
                    bgClass="bg-indigo-50"
                />
                <StatCard
                    icon={<TrendingUp size={18} className="text-amber-700" />}
                    label="Avg. CTR"
                    value={`${avgCtr}%`}
                    bgClass="bg-amber-50"
                />
            </div>

            {/* 3. Main Container: Filters & Table */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
                {/* Filters Toolbar */}
                <div className="p-4 border-b border-slate-100 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Search Input */}
                        <div className="relative">
                            <Search
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Search banner..."
                                value={search}
                                onChange={(e) => setSearch && setSearch(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs text-[#0B0F19] outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                            />
                        </div>

                        {/* Type Filter */}
                        <select
                            value={bannerType}
                            onChange={(e) => setBannerType && setBannerType(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-700 outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        >
                            <option value="">All Types</option>
                            <option value="hero">Hero</option>
                            <option value="category">Category</option>
                            <option value="offer">Offer</option>
                            <option value="festival">Festival</option>
                            <option value="brand">Brand</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={status}
                            onChange={(e) => setStatus && setStatus(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-700 outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        >
                            <option value="">All Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                                <th className="py-3 px-3">Banner</th>
                                <th className="py-3 px-3">Title</th>
                                <th className="py-3 px-3">Type</th>
                                <th className="py-3 px-3">Active</th>
                                <th className="py-3 px-3">Status</th>
                                <th className="py-3 px-3 text-center">Priority</th>
                                <th className="py-3 px-3">Schedule</th>
                                <th className="py-3 px-3 text-center">Views</th>
                                <th className="py-3 px-3 text-center">Clicks</th>
                                <th className="py-3 px-3 text-center">CTR</th>
                                <th className="py-3 px-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-xs">
                            {banners.length > 0 ? (
                                banners.map((banner: any) => {
                                    const ctr = banner.views
                                        ? ((banner.clicks / banner.views) * 100).toFixed(1)
                                        : "0.0";

                                    return (
                                        <tr
                                            key={banner._id}
                                            className="hover:bg-slate-50/70 transition-colors group"
                                        >
                                            {/* Image */}
                                            <td className="py-3 px-3">
                                                <div className="relative h-11 w-18 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-2xs">
                                                    {banner.desktopImage ? (
                                                        <img
                                                            src={`${Api}/api${banner.desktopImage}`}
                                                            alt={banner.title}
                                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-slate-400">
                                                            <ImageIcon size={16} />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Title */}
                                            <td className="py-3 px-3 max-w-xs">
                                                <h3 className="font-semibold text-[#0B0F19] truncate">
                                                    {banner.title}
                                                </h3>
                                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                                    {banner.subtitle || "No subtitle"}
                                                </p>
                                            </td>

                                            {/* Type */}
                                            <td className="py-3 px-3 capitalize">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                                                    {banner.bannerType || "General"}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="py-3 px-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${banner.isActive
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                                        : "bg-rose-50 text-rose-700 border border-rose-200/60"
                                                        }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${banner.isActive ? "bg-emerald-500" : "bg-rose-500"
                                                            }`}
                                                    />
                                                    {banner.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="py-3 px-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${banner.currentStatus === "Live"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                                                        : banner.currentStatus === "Upcoming"
                                                            ? "bg-blue-50 text-blue-700 border-blue-200/60"
                                                            : banner.currentStatus === "Expired"
                                                                ? "bg-rose-50 text-rose-700 border-rose-200/60"
                                                                : "bg-gray-50 text-gray-700 border-gray-200/60"
                                                        }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${banner.currentStatus === "Live"
                                                            ? "bg-emerald-500"
                                                            : banner.currentStatus === "Upcoming"
                                                                ? "bg-blue-500"
                                                                : banner.currentStatus === "Expired"
                                                                    ? "bg-rose-500"
                                                                    : "bg-gray-500"
                                                            }`}
                                                    />

                                                    {banner.currentStatus}
                                                </span>
                                            </td>
                                            {/* Priority */}
                                            <td className="py-3 px-3 text-center">
                                                <span className="inline-block px-2 py-0.5 text-[11px] font-mono font-semibold bg-slate-100 border border-slate-200 rounded text-slate-700">
                                                    #{banner.priority ?? 0}
                                                </span>
                                            </td>

                                            {/* Schedule */}
                                            <td className="py-3 px-3 text-[11px] text-slate-600">
                                                <div className="flex items-center gap-1 text-slate-500 mb-0.5">
                                                    <Calendar size={12} />
                                                    <span>
                                                        {banner.startDate
                                                            ? new Date(banner.startDate).toLocaleDateString("en-GB")
                                                            : "-"}
                                                    </span>
                                                </div>
                                                <div className="text-slate-400 pl-4">
                                                    to{" "}
                                                    {banner.endDate
                                                        ? new Date(banner.endDate).toLocaleDateString("en-GB")
                                                        : "-"}
                                                </div>
                                            </td>

                                            {/* Views */}
                                            <td className="py-3 px-3 text-center font-semibold text-[#0B0F19]">
                                                {banner.views || 0}
                                            </td>

                                            {/* Clicks */}
                                            <td className="py-3 px-3 text-center font-semibold text-[#0B0F19]">
                                              {banner.clicks || 0}
                                            </td> 

                                            {/* CTR */}
                                            <td className="py-3 px-3 text-center font-bold text-[#0B0F19]">
                                                <span
                                                    className={`px-1.5 py-0.5 rounded ${Number(ctr) > 2
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                                        : "text-slate-700"
                                                        }`}
                                                >
                                                    {ctr}%
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3 px-3">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        onClick={() => onView && onView(banner)}
                                                        title="View Banner Details"
                                                        className="p-1.5 cursor-pointer text-slate-500 hover:text-[#0B0F19] hover:bg-slate-100 rounded-lg transition"
                                                    >
                                                        <Eye size={15} />
                                                    </button>

                                                    <button
                                                        onClick={() => onEdit && onEdit(banner)}
                                                        title="Edit"
                                                        className="p-1.5 cursor-pointer text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                                                    >
                                                        <Edit3 size={15} />
                                                    </button>

                                                    <button
                                                        onClick={() => onDelete && onDelete(banner._id)}
                                                        title="Delete"
                                                        className="p-1.5 cursor-pointer text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={10}
                                        className="py-12 text-center text-slate-400 text-xs"
                                    >
                                        No banners found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* Helper Stat Card Component */
interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    bgClass?: string;
}

const StatCard = ({ icon, label, value, bgClass = "bg-slate-100" }: StatCardProps) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
        <div className={`p-2.5 rounded-lg ${bgClass}`}>{icon}</div>
        <div>
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <h4 className="text-lg font-bold text-[#0B0F19] mt-0.5">{value}</h4>
        </div>
    </div>
);