
import {  HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AdminLayout from "./Component/Admin/sidebard";
import Dashbord from './Component/Dashbord';
import Form from "./Component/Form"
import SellerRegister from './Component/userRegistation/Registation';
import { Provider } from 'react-redux';
import {store} from "./app/store"
import Login from './Component/userRegistation/Login';
import ViewProduct from './Component/View';
import Edit from './Component/Update';
import Inventory from './Component/Inventory';


const AppLayout = () => {
  const location = useLocation();
  const state = location.state && location.state.background;

  return (
    <div className='layout'>
     <AdminLayout/>
      <div className='content'>
        <Routes location={state || location}>
          <Route path='/' element={<Dashbord />} />
          <Route path='/inventory' element={<Inventory/>} />
          <Route path='/form' element={<Form/>}/>
          <Route path='/view/:id' element={<ViewProduct/>}/>
          <Route  path='/edit/:id' element={<Edit/>}/>
          <Route path='/sellerRegister' element={<SellerRegister/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </div>
  );


    
};

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <AppLayout />
    </HashRouter>
  </Provider>
);

export default App;



// import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./app/store";

// import AdminLayout from "./Component/Admin/sidebard";
// import Dashbord from "./Component/Dashbord";
// import Form from "./Component/Form";
// import SellerRegister from "./Component/userRegistation/Registation";
// import Login from "./Component/userRegistation/Login";

// // Simple Auth Check
// const RequireAuth = ({ children }) => {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// };

// const AppLayout = () => {
//   return (
//     <Routes>
//       {/* Login always accessible */}
//       <Route path="/login" element={<Login />} />

//       {/* Protected Admin Routes */}
//       <Route
//         path="/*"
//         element={
//           <RequireAuth>
//             <AdminLayout />
//           </RequireAuth>
//         }
//       >
//         <Route index element={<Dashbord />} />
//         <Route path="products" element={<Form />} />
//         <Route path="sellerRegister" element={<SellerRegister />} />
//       </Route>

//       {/* Redirect unknown paths to login */}
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
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