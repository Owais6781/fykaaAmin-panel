// import { useState, useEffect } from "react";
// import { Chart } from "primereact/chart";
// import {useGetProductsQuery} from "../../api/product"
// const GraphCharts=() =>{
//    const { data: products    } = useGetProductsQuery();


//   const [doughnutData, setDoughnutData] = useState({});
//   const [doughnutOptions, setDoughnutOptions] = useState({});

//   const [barData, setBarData] = useState({});
//   const [barOptions, setBarOptions] = useState({});

//   useEffect(() => {

//     if(!products) return
//     const documentStyle = getComputedStyle(document.documentElement);

//  const totalProduct=products?.length||0
// const inStock=products.filter((p)=>p.stock>0).length||0
// const outStock= totalProduct-inStock

//     // ✅ Doughnut Chart
//     const doughnut = {
//        labels: ["Total", "In Stock", "Out of Stock"],
//       datasets: [
//         {
//           data: [totalProduct, inStock, outStock],
//           backgroundColor: [
//             documentStyle.getPropertyValue("--blue-500"),
//             documentStyle.getPropertyValue("--yellow-500"),
//             documentStyle.getPropertyValue("--green-500"),
//           ],
//           hoverBackgroundColor: [
//             documentStyle.getPropertyValue("--blue-400"),
//             documentStyle.getPropertyValue("--yellow-400"),
//             documentStyle.getPropertyValue("--green-400"),
//           ],
//         },
//       ],
//     };

//     const doughnutOpt = {
//       cutout: "60%",
//     };

//     // ✅ Bar Chart
//     const textColor = documentStyle.getPropertyValue("--text-color");
//     const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
//     const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

//     const bar = {
//       labels: ["January", "February", "March", "April", "May", "June", "July"],
//       datasets: [
//         {
//           label: "My First dataset",
//           backgroundColor: documentStyle.getPropertyValue("--blue-500"),
//           borderColor: documentStyle.getPropertyValue("--blue-500"),
//           data: [65, 59, 80, 81, 56, 55, 40],
//         },
//         {
//           label: "My Second dataset",
//           backgroundColor: documentStyle.getPropertyValue("--pink-500"),
//           borderColor: documentStyle.getPropertyValue("--pink-500"),
//           data: [28, 48, 40, 19, 86, 27, 90],
//         },
//       ],
//     };

//     const barOpt = {
//       maintainAspectRatio: false,
//       aspectRatio: 0.8,
//       plugins: {
//         legend: {
//           labels: {
//             color: textColor,
//           },
//         },
//       },
//       scales: {
//         x: {
//           ticks: {
//             color: textColorSecondary,
//             font: { weight: 500 },
//           },
//           grid: {
//             display: false,
//             drawBorder: false,
//           },
//         },
//         y: {
//           ticks: {
//             color: textColorSecondary,
//           },
//           grid: {
//             color: surfaceBorder,
//             drawBorder: false,
//           },
//         },
//       },
//     };

//     setDoughnutData(doughnut);
//     setDoughnutOptions(doughnutOpt);

//     setBarData(bar);
//     setBarOptions(barOpt);
//   }, []);

//   return (
//     <div className="grid ml-64">
//       {/* Doughnut Chart */}
//       <div className="col-12 md:col-6">
//         <div className="card flex justify-content-center">
//           <Chart
//             type="doughnut"
//             data={doughnutData}
//             options={doughnutOptions}
//             className="w-full md:w-30rem"
//           />
//         </div>
//       </div>

//       {/* Bar Chart */}
//       <div className="col-12 md:col-6">
//         <div className="card">
//           <Chart type="bar" data={barData} options={barOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GraphCharts






import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useGetProductsQuery } from "../../api/product";

const GraphCharts = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  const [doughnutData, setDoughnutData] = useState({});
  const [doughnutOptions, setDoughnutOptions] = useState({});
  const [barData, setBarData] = useState({});
  const [barOptions, setBarOptions] = useState({});

  useEffect(() => {
    if (!products) return;

    const documentStyle = getComputedStyle(document.documentElement);

    const totalProduct = products.length;
    const inStock = products.filter((p) => p.stock > 0).length;
    const outStock = totalProduct - inStock;

    // 🔵 Doughnut Chart
    setDoughnutData({
      labels: ["Total", "In Stock", "Out of Stock"],
      datasets: [
        {
          data: [totalProduct, inStock, outStock],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
          ],
        },
      ],
    });

    setDoughnutOptions({
      cutout: "60%",
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    });

    // 📊 Bar Chart (example static)
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    setBarData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Sales",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          data: [50, 70, 40, 90, 60],
        },
      ],
    });

    setBarOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: textColor },
        },
      },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: { display: false },
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder },
        },
      },
    });
  }, [products]); // ✅ FIXED dependency

  // ⏳ Loading UI
  if (isLoading) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <p>Loading charts...</p>
      </div>
    );
  }

  return (
    <div className="p-4 ml-64"> {/* sidebar spacing */}
      
      {/* 🔥 Grid Layout */}
      <div className="grid">
        
        {/* Doughnut */}
        <div className="col-12 md:col-6">
          <div className="card shadow-2 border-round p-3">
            <h3 className="mb-3">Product Stock Overview</h3>
            <Chart
              type="doughnut"
              data={doughnutData}
              options={doughnutOptions}
              className="w-full"
            />
          </div>
        </div>

        {/* Bar */}
        <div className="col-12 md:col-6">
          <div className="card shadow-2 border-round p-3" style={{ height: "400px" }}>
            <h3 className="mb-3">Sales Overview</h3>
            <Chart type="bar" data={barData} options={barOptions} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default GraphCharts;











// import  { useState, useEffect } from "react";
// import { Chart } from "primereact/chart";
// import { ProgressSpinner } from "primereact/progressspinner";

// export default function DashboardCharts() {
//   const [loading, setLoading] = useState(true);

//   const [doughnutData, setDoughnutData] = useState({});
//   const [doughnutOptions, setDoughnutOptions] = useState({});

//   const [barData, setBarData] = useState({});
//   const [barOptions, setBarOptions] = useState({});

//   useEffect(() => {
//     const documentStyle = getComputedStyle(document.documentElement);

//     // simulate delay (optional)
//     setTimeout(() => {
//       // Doughnut
//       const doughnut = {
//         labels: ["A", "B", "C"],
//         datasets: [
//           {
//             data: [300, 50, 100],
//             backgroundColor: [
//               documentStyle.getPropertyValue("--blue-500"),
//               documentStyle.getPropertyValue("--yellow-500"),
//               documentStyle.getPropertyValue("--green-500"),
//             ],
//           },
//         ],
//       };

//       const doughnutOpt = { cutout: "60%" };

//       // Bar
//       const textColor = documentStyle.getPropertyValue("--text-color");
//       const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
//       const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

//       const bar = {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//         datasets: [
//           {
//             label: "Dataset 1",
//             backgroundColor: documentStyle.getPropertyValue("--blue-500"),
//             data: [65, 59, 80, 81, 56, 55, 40],
//           },
//           {
//             label: "Dataset 2",
//             backgroundColor: documentStyle.getPropertyValue("--pink-500"),
//             data: [28, 48, 40, 19, 86, 27, 90],
//           },
//         ],
//       };

//       const barOpt = {
//         plugins: {
//           legend: {
//             labels: { color: textColor },
//           },
//         },
//         scales: {
//           x: {
//             ticks: { color: textColorSecondary },
//           },
//           y: {
//             ticks: { color: textColorSecondary },
//             grid: { color: surfaceBorder },
//           },
//         },
//       };

//       setDoughnutData(doughnut);
//       setDoughnutOptions(doughnutOpt);

//       setBarData(bar);
//       setBarOptions(barOpt);

//       setLoading(false); // ✅ stop loading
//     }, 1000); // simulate API delay
//   }, []);

//   // ✅ Loader UI
//   if (loading) {
//     return (
//       <div className="flex justify-content-center align-items-center" style={{ height: "300px" }}>
//         <ProgressSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="grid">
//       <div className="col-12 md:col-6">
//         <div className="card flex justify-content-center">
//           <Chart type="doughnut" data={doughnutData} options={doughnutOptions} />
//         </div>
//       </div>

//       <div className="col-12 md:col-6">
//         <div className="card">
//           <Chart type="bar" data={barData} options={barOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }