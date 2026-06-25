
// import {  HashRouter, Route, Routes, useLocation } from 'react-router-dom';
// import { Toaster } from "sonner";
// import './App.css';
// import AdminLayout from "./Component/Admin/sidebard";
// import Dashbord from './Component/Dashbord';
// import Form from "./Component/Form"
// import Register from './Component/userRegistation/Registation';
// import { Provider } from 'react-redux';
// import {store} from "./app/store"
// import Login from './Component/userRegistation/Login';
// import ViewProduct from './Component/View';
// import Edit from './Component/Update';
// import Inventory from './Component/Inventory';
// import OrdeList from './Component/Orderlist';


// const AppLayout = () => {
//   const location = useLocation();
//   const state = location.state && location.state.background;

//   return (
//     <div className='layout'>
//     <Toaster position="top-right" richColors closeButton />
//      <AdminLayout/>
//       <div className='content'>
//         <Routes location={state || location}>
//           <Route path='/' element={<Dashbord />} />
//           <Route path='/order-list' element={<OrdeList/>} />
//           <Route path='/inventory' element={<Inventory/>} />
//           <Route path='/form' element={<Form/>}/>
//           <Route path='/view/:id' element={<ViewProduct/>}/>
//           <Route  path='/edit/:id' element={<Edit/>}/>
//           <Route path='/register' element={<Register/>}/>
//           <Route path='/login' element={<Login/>}/>
//         </Routes>
//       </div>
//     </div>
//   );



// };

// const App = () => (
//   <Provider store={store}>
//     <HashRouter>
//       <AppLayout />
//     </HashRouter>
//   </Provider>
// );

// export default App;






// import { HashRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
// import { Toaster } from "sonner";
// import { isLogin } from "./utils/auth";
// import "./App.css";

// import AdminLayout from "./Component/Admin/sidebard";
// import Dashbord from "./Component/Dashbord";
// import Form from "./Component/Form";
// import Register from "./Component/userRegistation/Registation";
// import Login from "./Component/userRegistation/Login";
// import ViewProduct from "./Component/View";
// import Edit from "./Component/Update";
// import Inventory from "./Component/Inventory";
// // import OrdeList from "./Component/Orderlist";

// import { Provider } from "react-redux";
// import { store } from "./app/store";

// const ProtectedRoute = () => {


//   if (isLogin()) {
//     return <Navigate to="/login" replace />;
//   }
//   return <Outlet />;
// };

// const PublicRoute = () => {


//     if (!isLogin()) {
//     return <Navigate to="/dashboard" replace />;
//   }
//   return <Outlet />;
// };

// const AdminPanelLayout = () => {
//   return (
//     <div className="layout">
//       <AdminLayout />

//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Provider store={store}>
//       <HashRouter>
//         <Toaster position="top-right" richColors closeButton />

//         <Routes>
//           {/* Public Routes: bina login ke sirf ye pages */}
//           <Route element={<PublicRoute />}>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Route>

//           {/* Protected Admin Panel */}
//           <Route element={<ProtectedRoute />}>
//             <Route element={<AdminPanelLayout />}>
//               <Route path="/" element={<Dashbord />} />
//               {/* <Route path="/order-list" element={<OrdeList />} /> */}
//               <Route path="/inventory" element={<Inventory />} />
//               <Route path="/form" element={<Form />} />
//               <Route path="/view/:id" element={<ViewProduct />} />
//               <Route path="/edit/:id" element={<Edit />} />
//             </Route>
//           </Route>

// <Route
//   path="*"
//   element={
//     localStorage.getItem("token") ? (
//       <Navigate to="/" replace />
//     ) : (
//       <Navigate to="/login" replace />
//     )
//   }
// />
//         </Routes>
//       </HashRouter>
//     </Provider>
//   );
// };

// export default App;




import { HashRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from "react-redux";

import { store } from "./app/store";
import { isLogin } from "./utils/auth";
import "./App.css";

import AdminLayout from "./Component/Admin/sidebard";
import Dashbord from "./Component/Dashbord";
import Form from "./Component/Form";
import Register from "./Component/userRegistation/Registation";
import Login from "./Component/userRegistation/Login";
import ViewProduct from "./Component/View";
import Edit from "./Component/Update";
import Inventory from "./Component/Inventory";
import OrdeList from "./Component/Orderlist";
import ExportOrdersExcel from "./Component/ExcelDownload/ExcelToDownload";
import GraphCharts from "./Component/GraphAnalytics/GrapChart";
import Customer from "./Component/CustomerInfo/Customer";
import ProfileView from "./Component/CustomerInfo/ProfileView";
import Test from "./Component/userRegistation/Test";

const ProtectedRoute = () => {
  if (!isLogin()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
  if (isLogin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Toaster position="top-right" richColors closeButton />

        <Routes>
          {/* Default */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Dashbord />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="order-list" element={<OrdeList />} />
              <Route path="customer-list" element={<Customer />} />
              <Route path="Profile-View/:id" element={<ProfileView />} />
              <Route path="form" element={<Form />} />
              <Route path="view/:id" element={<ViewProduct />} />
              <Route path="edit/:id" element={<Edit />} />
              <Route path="register" element={<Register />} />
              <Route path="exportExcelOrder" element={<ExportOrdersExcel />} />
              <Route path="graphChart" element={<GraphCharts />} />
              <Route path="Test" element={<Test />} />
            </Route>
          </Route>

          {/* Wrong URL */}
          <Route
            path="*"
            element={
              isLogin() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;