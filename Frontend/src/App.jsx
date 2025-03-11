import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import CarbonCreditDashboard from "./components/CarbonCreditDashboard"; // Fixed import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carbon-credits" element={<CarbonCreditDashboard />} /> {/* Fixed Component Name */}
      </Routes>
    </Router>
  );
};

export default App;
