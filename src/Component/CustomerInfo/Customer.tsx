
import MUIDataTable from "mui-datatables";
import {  Package,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { useGetAllCustomersQuery } from "../../api/customerApi";



export default function Customer() {

  const navigate=useNavigate()
  const { data, isLoading, isError }= useGetAllCustomersQuery();


const customers = data ?? [];
console.log("Custommer",customers)

  const tableData =
    customers?.map((customer) => ({
      _id: customer._id,
      fullName: customer.fullName || "N/A",
      email: customer.email || "N/A",
      phone: customer.phone || "N/A",
      location: [
        // customer.address?.line1,
         customer.address?.city,
        customer.address?.state,
        customer.address?.country,
      ].filter(Boolean)
        .join(", ") || "N/A",
    view: (
      <button
        onClick={() =>
          navigate(`/dashboard/Profile-View/${customer._id}`)
        }
        className="text-blue-600 hover:text-blue-800"
      >
        <Eye size={18} />
      </button>
    ),
    })) ?? [];

  const columns = [
    { name: "fullName", label: "Full Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "location", label: "Location" },
     { name: "view", label: "View" },
  ];

  const options = {
    selectableRows: "none" as const,
    responsive: "standard" as const,
    elevation: 0,
  };

   if (isLoading) {
       return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center ">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Package size={28} className="text-purple-600" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 font-medium">Loading Customer info...</p>
                    <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
                </div>
            </div>
        );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: "red" }}>Error loading customers</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6 ">
      <div className="bg-white rounded-xl shadow p-4">
        <MUIDataTable
          title={"Customer List"}
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}