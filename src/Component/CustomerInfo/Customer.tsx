
import MUIDataTable from "mui-datatables";
import { Users, Eye, RefreshCw, MapPin, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllCustomersQuery } from "../../api/customerApi";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Customer() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetAllCustomersQuery();

  const customers: any[] = data ?? [];

  
  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: "inherit",
      },
      palette: {
        background: {
          default: "#ffffff",
        },
        text: {
          primary: "#0B0F19",
          secondary: "#64748B",
        },
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              fontWeight: 600,
              color: "#64748B",
              backgroundColor: "#FAFAFA",
              borderBottom: "1px solid #E2E8F0",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "12px 16px",
            },
            body: {
              color: "#0B0F19",
              borderBottom: "1px solid #F1F5F9",
              padding: "14px 16px",
              fontSize: "0.875rem",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: "none !important",
              border: "1px solid #E2E8F0",
              borderRadius: "0.75rem",
            },
          },
        },
      },
    });




  const tableData = customers.map((customer) => ({
  _id: customer._id,
  fullName: customer.fullName || "",
  email: customer.email || "",
  phone: customer.phone || "",
  location:
    [
      customer.address?.city,
      customer.address?.state,
      customer.address?.country,
    ]
      .filter(Boolean)
      .join(", ") || "",
}));


const columns = [
  {
    name: "fullName",
    label: "FULL NAME",
    options: {
      customBodyRenderLite: (dataIndex: number) => {
        const customer = tableData[dataIndex];

        return (
          <span className="font-semibold text-[#0B0F19]">
            {customer.fullName || "N/A"}
          </span>
        );
      },
    },
  },

  {
    name: "email",
    label: "EMAIL",
    options: {
      customBodyRenderLite: (dataIndex: number) => {
        const customer = tableData[dataIndex];

        return (
          <span className="inline-flex items-center gap-1.5 text-gray-600">
            <Mail size={14} className="text-gray-400" />
            {customer.email || "N/A"}
          </span>
        );
      },
    },
  },

  {
    name: "phone",
    label: "PHONE",
    options: {
      customBodyRenderLite: (dataIndex: number) => {
        const customer = tableData[dataIndex];

        return (
          <span className="inline-flex items-center gap-1.5 text-gray-600 font-mono text-xs">
            <Phone size={14} className="text-gray-400" />
            {customer.phone || "N/A"}
          </span>
        );
      },
    },
  },

  {
    name: "location",
    label: "LOCATION",
    options: {
      customBodyRenderLite: (dataIndex: number) => {
        const customer = tableData[dataIndex];

        return (
          <span className="inline-flex items-center gap-1 text-gray-600">
            <MapPin size={14} className="text-gray-400" />
            {customer.location || "N/A"}
          </span>
        );
      },
    },
  },

  {
    name: "_id",
    label: "ACTIONS",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: string) => (
        <button
          onClick={() => navigate(`/dashboard/Profile-View/${value}`)}
          className="p-1.5 text-slate-500 hover:text-[#0B0F19] hover:bg-slate-100 rounded-lg transition"
        >
          <Eye size={18} />
        </button>
      ),
    },
  },
];




  const options = {
    selectableRows: "none" as const,
    responsive: "standard" as const,
    elevation: 0,
    download: true,
    print: true,
    filter: true,
    viewColumns: true,
    search: true,
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
          <RefreshCw size={18} className="animate-spin text-gray-400" />
          Loading customer information...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-[#F8FAFC] min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm font-medium flex justify-between items-center">
          <span>Failed to load customer list. Please check your network connection.</span>
          <button
            onClick={() => refetch?.() || window.location.reload()}
            className="px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users size={22} className="text-[#0B0F19]" />
            <h2 className="text-2xl font-bold text-[#0B0F19] tracking-tight">
              Customer Directory
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            View customer details, contact info, and registered locations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200 uppercase tracking-wider">
            {customers.length} Registered Users
          </span>
          <button
            onClick={() => refetch?.()}
            className="p-2 text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm transition"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title=""
            data={tableData}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}