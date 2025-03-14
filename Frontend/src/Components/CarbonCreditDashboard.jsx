import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CarbonCreditDetails from "./CarbonCreditDetails";
import { AppProvider } from "./AppContext";
import RemoveModal from "./RemoveModal";
import ModifyModal from "./ModifyModal";

function CarbonCreditDashboard() {
  return (
    <AppProvider>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-64 bg-lime-700 text-white shadow-md flex-shrink-0 h-screen fixed">
          <Sidebar />
        </div>

        <div className="flex-1 ml-64">
          <Header />

          <main className="bg-white bg-opacity-80 shadow-lg w-full h-full px-6 pt-4">
            <CarbonCreditDetails />
            <RemoveModal />
          <ModifyModal />
          </main>
        </div>
      </div>
      
    </AppProvider>
  );
}

export default CarbonCreditDashboard;
