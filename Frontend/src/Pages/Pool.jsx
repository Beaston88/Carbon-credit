import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import CarbonCreditDetails from "../components/CarbonCreditDetails";
import RemoveModal from "../components/RemoveModal";
import ModifyModal from "../components/ModifyModal";

function CarbonCreditDashboard() {
  return (
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
  );
}

export default CarbonCreditDashboard;
