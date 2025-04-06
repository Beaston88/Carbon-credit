import React from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import { FiUsers } from "react-icons/fi";
import TransactionHistory from '../Components_1/components/TransactionHistory.jsx';

const Transaction = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto h-full p-4 md:p-8">
        <Header />
        <TransactionHistory/>
      </div>
    </div>
  );
};

export default Transaction;
