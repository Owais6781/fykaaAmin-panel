

import { HashRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { isLogin } from "./utils/auth";
import "./App.css";

import AdminLayout from "./Component/Admin/sidebard";
import Dashbord from "./Component/Dashbord";
import Form from "./Component/Invantory/Form.tsx";
import Login from "./Component/userRegistation/Login";
import ViewProduct from "./Component/Invantory/ViewProduct.tsx";
import Edit from "./Component/Invantory/Edit.tsx";
import Inventory from "./Component/Invantory/Inventory";
import Reviews from "./Component/Invantory/Reviews";
import OrdeList from "./Component/Orderlist";
import ExcelDownload from "./Component/ExcelDownload/ExcelDownload.tsx";

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
import BannerForm from "./Component/Marketing/Banner/BannerForm.tsx";
import BannerPage from "./Component/Marketing/Banner/BannerPage.tsx";
import Payment from "./Component/Setting/Payment/Payment.tsx"
import Shipping from "./Component/Setting/Shipping/Shipping.tsx"
import Notification from "./Component/Setting/Notification/Notification.tsx"
import About from "./Component/Content/About.tsx"
import ContactPage from "./Component/Content/Contact/ContactPage.tsx"
import CategoryTable  from "./Component/Invantory/Category/CategoryTable.tsx"
import CouponsPage  from "./Component/Marketing/Coupons/CouponsPage.tsx"




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
              <Route path="exportExcelOrder" element={<ExcelDownload/>} />
              <Route path="Payment" element={<Payment />} />
              <Route path="SalesReport" element={<SalesReport />} />
              <Route path="RevenueReport" element={<RevenueReports />} />
              <Route path="ProductReports" element={<ProductReports/>} />
              <Route path="generalSetting" element={<GeneralSettings/>} />
              <Route path="SellerRegister" element={<SellerRegister/>} />
              <Route path="BannerForm" element={<BannerForm />} />
               <Route path="BannerPage" element={<BannerPage />} />
              <Route path="Shipping" element={<Shipping />} />
               <Route path="Notification" element={<Notification />} />
              <Route path="About" element={<About />} />
                <Route path="Contents" element={< ContactPage/>} />
                <Route path="CategoryTable" element={<CategoryTable/>} />
                <Route path="CouponsPage" element={<CouponsPage/>} />
                       

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