import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import CarbonCreditDetails from "../Components/CarbonCreditDetails";
import { AppProvider } from "../Components/AppContext";
import RemoveModal from "../Components/RemoveModal";
import ModifyModal from "../Components/ModifyModal";

function CarbonCreditDashboard() {
  return (
    <AppProvider>
      <div className="h-screen flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-auto h-full p-4 md:p-8">
          <Header />

          <main className="w-full h-full px-6 pt-4 overflow-auto">
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
