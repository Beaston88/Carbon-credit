import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import CarbonCreditDashboard from "./Pages/Pool";
import ShoppingCart from "./Pages/ShoppingCart";
import GovtDashboard from "./Pages/GovtDashboard";
import AddCreditPage from "./Pages/AddCreditPage";
import { AppProvider } from "./components/AppContext";

const App = () => {
  return (
    <AppProvider>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pool" element={<CarbonCreditDashboard />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/govtDashboard" element={<GovtDashboard />} />
        <Route path="/AddCreditPage" element={<AddCreditPage />} />
      </Routes>
    </Router>
    </AppProvider>
  );
};

export default App;
