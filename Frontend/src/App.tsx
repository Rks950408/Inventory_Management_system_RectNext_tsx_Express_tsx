import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// Import your components as needed
import Dashboard from "./components/Dashboard/Dashboard";
import ItemList from "./components/Item_master/Item_list";
import AddItem from "./components/Item_master/AddItem";
import BrandList from "./components/Brand_master/BrandList";
import AddBrand from "./components/Brand_master/AddBrand";
import PurchaseEntry from "./components/Purchase/Purchase_Entry";
import SaleEntry from "./components/sales/SaleEntry";
import ItemStockList from "./components/Details/ItemStockList";
import DetailedList from "./components/DetailsReport/DetailedList";
import PurchasesList from "./components/Purchase/PurchaseList";
import PurchaseDetails from "./components/Purchase/PurchaseDetails";
import SaleList from "./components/sales/SaleList";
import SaleDetails from "./components/sales/SaleDetails";
import AddSupplier from "./components/Supplier/Add_Supplier";
import SupplierList from "./components/Supplier/Supplier_list";
import UpdateItem from "./components/Item_master/UpdateItem";
import Home from "./components/Home/Home";
import Login from "./components/Home/Login";
import Signup from "./components/Home/Signup";

const App: React.FC = () => {
  return (
    <Router>
      {/* <Header /> */}
      <div className="flex">
        <div className="content flex-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home/>} />
            <Route path="/header" element={<Header/>} />
            <Route path="/item" element={<ItemList />} />
            {/* <Route path="/Backend" element={<></>} */}
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/brands" element={<BrandList />} />
            <Route path="/add-brand" element={<AddBrand />} />
            <Route path="/suppliers" element={<AddSupplier />} />
            <Route path="/suppliers-list" element={<SupplierList />} />
            <Route path="/sale" element={<SaleEntry />} />
            <Route path="/sale-list" element={<SaleList />} />
            <Route path="/sale-details/:id" element={<SaleDetails />} />
            <Route path="/edit-item/:id" element={<UpdateItem />} />
            <Route path="/purchase-list" element={<PurchasesList />} />
            <Route path="/purchase-details/:id" element={<PurchaseDetails />} />
            <Route path="/purchase" element={<PurchaseEntry />} />
            <Route path="/report" element={<ItemStockList />} />
            <Route path="/detailed-report" element={<DetailedList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
