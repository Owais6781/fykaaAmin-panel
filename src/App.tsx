

import { HashRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { isLogin } from "./utils/auth";
import "./App.css";

import AdminLayout from "./Component/Admin/sidebard";
import Dashbord from "./Component/Dashbord";
import Form from "./Component/Invantory/Form.tsx";
// import Register from "./Component/userRegistation/Registation";
import Login from "./Component/userRegistation/Login";
import ViewProduct from "./Component/Invantory/ViewProduct.tsx";
import Edit from "./Component/Invantory/Edit.tsx";
import Inventory from "./Component/Invantory/Inventory";
import Reviews from "./Component/Invantory/Reviews";
import OrdeList from "./Component/Orderlist";
import ExportOrdersExcel from "./Component/ExcelDownload/ExcelToDownload";
import GraphCharts from "./Component/GraphAnalytics/GrapChart";
import Customer from "./Component/CustomerInfo/Customer";
import ProfileView from "./Component/CustomerInfo/ProfileView";
import SalesReport from "./Component/Reports/SalesReports";
import Test from "./Component/userRegistation/Test";
import RevenueReports from "./Component/Reports/RevenueReports";
import ProductReports from "./Component/Reports/ProductReports";
import GeneralSettings from "./Component/Setting/General/GeneralSettings";
import SellerRegister from "./Component/userRegistation/Seller/SellerRegister";
import RoleAndPermession from "./Component/Admin/SuperAdmin/RoleAndPermession.tsx";
import ViewSellerInfo from "./Component/Admin/SuperAdmin/View/ViewSellerInfo.tsx";
import EditSellerInfo from "./Component/Admin/SuperAdmin/Edit/EditSellerInfo.tsx";


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
            {/* <Route path="/register" element={<Register />} /> */}
               <Route path="SellerRegister" element={<SellerRegister/>} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Dashbord />} />
               <Route path="Role-And-Permission" element={<RoleAndPermession />} />
                  <Route path="ViewSellerInfo/:id" element={<ViewSellerInfo/>} />
               //tem use
                 <Route path="EditeSeller/:id" element={<EditSellerInfo/>} />
              <Route path="inventory" element={<Inventory />} />
               <Route path="Reviews" element={<Reviews />} />
              <Route path="order-list" element={<OrdeList />} />
              <Route path="customer-list" element={<Customer />} />
              <Route path="Profile-View/:id" element={<ProfileView />} />
              <Route path="form" element={<Form />} />
              <Route path="view/:id" element={<ViewProduct />} />
              <Route path="edit/:id" element={<Edit />} />
              {/* <Route path="register" element={<Register />} /> */}
              <Route path="exportExcelOrder" element={<ExportOrdersExcel />} />
              <Route path="graphChart" element={<GraphCharts />} />
              <Route path="SalesReport" element={<SalesReport />} />
              <Route path="RevenueReport" element={<RevenueReports />} />
              <Route path="ProductReports" element={<ProductReports/>} />
              <Route path="generalSetting" element={<GeneralSettings/>} />
              <Route path="SellerRegister" element={<SellerRegister/>} />
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