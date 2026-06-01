// import  { useState } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { ProgressSpinner } from "primereact/progressspinner";

// const  ExportOrdersExcel=()=> {
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleDownload = async () => {
//     if (!fromDate || !toDate) {
//       alert("Please select both dates");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(
//         `http://localhost:5000/api/orders?from=${fromDate}&to=${toDate}`
//       );

//       const data = await res.json();

//       if (!data.orders || data.orders.length === 0) {
//         alert("No data found");
//         return;
//       }

//       // ✅ Format data for Excel
//       const formattedData = data.orders.map((item:any) => ({
//         ID: item._id,
//         Customer: item.user?.name || "N/A",
//         Amount: item.totalPrice,
//         Status: item.status,
//         Date: new Date(item.createdAt).toLocaleDateString(),
//       }));

//       // ✅ Convert to Excel
//       const worksheet = XLSX.utils.json_to_sheet(formattedData);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

//       const excelBuffer = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });

//       const file = new Blob([excelBuffer], {
//         type: "application/octet-stream",
//       });

//       saveAs(file, `orders_${fromDate}_to_${toDate}.xlsx`);
//     } catch (error) {
//       console.error("Download error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 ml-64">
//       <h2>Download Orders Excel</h2>

//       <div className="flex gap-3 items-center">
//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//         />

//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//         />

//         <button onClick={handleDownload} disabled={loading}>
//           {loading ? "Downloading..." : "Download Excel"}
//         </button>
//       </div>

//       {/* ✅ Fullscreen Loader */}
//       {loading && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 z-50">
//           <ProgressSpinner />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ExportOrdersExcel










import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ProgressSpinner } from "primereact/progressspinner";

const ExportOrdersExcel = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both dates");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/orders?from=${fromDate}&to=${toDate}`
      );

      const data = await res.json();

      if (!data.orders || data.orders.length === 0) {
        alert("No data found");
        return;
      }

      // ✅ Format data
      const formattedData = data.orders.map((item:any) => ({
        ID: item._id,
        Customer: item.user?.name || "N/A",
        Amount: item.totalPrice,
        Status: item.status,
        Date: new Date(item.createdAt).toLocaleDateString(),
      }));

      // ✅ Excel logic
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const file = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      saveAs(file, `Orders_${fromDate}_to_${toDate}.xlsx`);
    } catch (error) {
      console.error("Download error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 ml-64">
      <h2 className="text-xl font-semibold mb-4">Download Orders Excel</h2>

      <div className="flex gap-3 items-center">
        <input
          type="date"
          className="border p-2 rounded"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          onClick={handleDownload}
          disabled={loading || !fromDate || !toDate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Downloading..." : "Download Excel"}
        </button>
      </div>

      {/* ✅ Popup Loader */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black opacity-30"></div>

          {/* Popup box */}
          <div className="relative bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <ProgressSpinner />
            <p className="mt-3 text-gray-700 font-medium">
              Downloading Excel...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportOrdersExcel;