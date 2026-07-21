import {
    Search,
    Plus,
    Pencil,
    Shield,
    Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSuperAdminProfileQuery, } from "../../../api/adminAuthApi"


export default function RoleAndPermession() {
    const navigate = useNavigate()





    const { data, isLoading } = useGetSuperAdminProfileQuery();

    const users = data?.data ?? [];

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All Roles");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;





    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.fullName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase())
          

        const matchesRole = roleFilter === "All Roles" || user.role === roleFilter
        const matchesStatus =
            statusFilter === "All Status" ||
            (statusFilter === "Active" && user.accountMode) ||
            (statusFilter === "Suspended" && !user.accountMode);

        return matchesSearch && matchesRole && matchesStatus;
    })




    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const visiblePages = 2;

    const startPage = Math.max(
        1,
        Math.min(currentPage, totalPages - visiblePages + 1)
    );

    const pages = Array.from(
        { length: Math.min(visiblePages, totalPages) },
        (_, i) => startPage + i
    );




    if (isLoading) return <p>Loading...</p>;



    const handleview = (id: string) => {
        navigate(`/dashboard/ViewSellerInfo/${id}`);
    };

    const handleEdit = (id: string) => {
        navigate(`/dashboard/EditeSeller/${id}`);
    };
    const handleAddUser = () => {
        navigate("/dashboard/SellerRegister")
    }





    return (
        <div className="min-h-screen  p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold">Roles & Permission</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Manage user accounts, roles, and permissions.
                    </p>
                </div>

                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                    onClick={handleAddUser}
                >
                    <Plus size={16} />
                    Add User
                </button>
            </div>

            {/* Card */}
            <div className="border border-gray-300 rounded-xl bg-white shadow-sm">

                {/* Filters */}
                <div className="p-5 flex flex-wrap gap-3 border-b border-gray-200">

                    {/* Search */}
                    <div className="relative w-80">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search users..."
                            className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm outline-none " />
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => {
                            setRoleFilter(e.target.value)
                            setCurrentPage(1);

                        }}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>SuperAdmin</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)
                            setCurrentPage(1);
                        }}

                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Suspended</option>
                    </select>

                    <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm">
                        Filter
                    </button>

                </div>

                {/* Table */}

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className=" text-gray-400 text-sm">
                            <tr>

                                <th className="text-left font-medium p-4">User</th>
                                <th className="text-left font-medium p-4">Roles</th>
                                <th className="text-left font-medium p-4">Status</th>
                                <th className="text-left font-medium p-4"> Account Mode</th>
                                <th className="text-left font-medium p-4"> KYC Details</th>
                                <th className="text-left font-medium p-4">Joined</th>
                                <th className="text-right font-medium p-4">Actions</th>

                            </tr>
                        </thead>

                        <tbody>


                            {filteredUsers.length > 0 ? (
                                currentUsers.map((user: any) => (
                                    <tr
                                        key={user._id}
                                        className="border-t border-neutral-800 hover:bg-neutral-200 transition"
                                    >

                                        {/* User */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">

                                                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-semibold">
                                                    {user.fullName?.charAt(0).toUpperCase()}
                                                </div>

                                                <div>
                                                    <h3 className="text-sm">{user.name}</h3>
                                                    <p className="text-xs text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>

                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="p-4">
                                            <span className="px-3 py-1 rounded-full bg-neutral-300 text-xs">
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : user.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : user.status === "Rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>


                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${user.accountMode
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-red-700"
                                                    }`}
                                            >
                                                {user.accountMode ? "Active" : "Suspended"}
                                            </span>
                                        </td>


                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${user.KYCVerified
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {user.KYCVerified ? "Verified" : "Not Verified"}
                                            </span>
                                        </td>

                                        {/* Joined */}
                                        <td className="p-4 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString("en-IN")}
                                        </td>

                                        {/* Actions */}
                                        <td className="p-4">

                                            <div className="flex justify-end gap-3">

                                                <button className="hover:text-blue-400"
                                                    onClick={() => handleEdit(user._id)}
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button className="hover:text-yellow-400"
                                                    onClick={() => handleview(user._id)}>
                                                    <Shield size={16} />
                                                </button>

                                                <button className="hover:text-red-500">
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-4">
                                        No users found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Showing {startIndex + 1} -
                            {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                            >
                                Previous
                            </button>

                            {pages.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg border ${currentPage === page
                                        ? "bg-black text-white"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}


                            <button
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                }
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}