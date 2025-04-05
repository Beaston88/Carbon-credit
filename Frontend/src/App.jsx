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
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pool"
            element={
              <ProtectedRoute>
                <CarbonCreditDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction"
            element={
              <ProtectedRoute>
                <Transaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/govtDashboard"
            element={
              <ProtectedRoute>
                <GovtDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddCreditPage"
            element={
              <ProtectedRoute>
                <AddCreditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/token"
            element={
              <ProtectedRoute>
                <GetToken />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
