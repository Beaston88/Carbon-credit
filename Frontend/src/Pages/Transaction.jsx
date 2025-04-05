// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// function Transaction() {
//   const location = useLocation();
//   const [transactionStatus, setTransactionStatus] = useState("Processing...");

//   useEffect(() => {
//     if (location.state?.success) {
//       setTransactionStatus("Transaction Successful ✅");
//     } else {
//       setTransactionStatus("Transaction Failed ❌");
//     }
//   }, [location.state]);

//   return (
//     <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
//         <h2 className="text-3xl font-bold text-gray-900">Transaction Status</h2>
//         <p className="mt-4 text-lg text-gray-700">{transactionStatus}</p>

//         <button
//           onClick={() => (window.location.href = "/cart")}
//           className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
//         >
//           Go Back to Home
//         </button>
//       </div>
//     </section>
//   );
// }

// export default Transaction;

import React from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import { FiUsers } from "react-icons/fi";

const Transaction = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto h-full p-4 md:p-8">
        <Header />
      </div>
    </div>
  );
};

export default Transaction;
