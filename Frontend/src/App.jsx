import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import CarbonCreditDashboard from "./Pages/Pool";
import ShoppingCart from "./Pages/ShoppingCart";
import GovtDashboard from "./Pages/GovtDashboard";
import AddCreditPage from "./Pages/AddCreditPage";
import { AppProvider } from "./Components/AppContext";
import { GetToken } from "./Pages/Token";
import Transaction from "./Pages/Transaction";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pool" element={<CarbonCreditDashboard />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/govtDashboard" element={<GovtDashboard />} />
          <Route path="/AddCreditPage" element={<AddCreditPage />} />
          <Route path="/token" element={<GetToken />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
