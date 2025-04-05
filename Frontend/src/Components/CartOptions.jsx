import React from "react";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../api/transaction";

function CartOptions({ totalAmount, token }) {
  const navigate = useNavigate();

//   const handleCheckout = async () => {
//     try {
//       console.log(totalAmount);
//       const response = await createTransaction(token, totalAmount);
//       if (response.status === 200) {
//         navigate("/transaction", { state: { success: true } });
//       } else {
//         navigate("/transaction", { state: { success: false } });
//       }
//     } catch (error) {
//       console.error("Transaction failed:", error);
//       navigate("/transaction", { state: { success: false } });
//     }
//   };

  return (
    <section className="w-full max-w-5xl mt-8 bg-white shadow-lg rounded-xl p-6 mx-auto max-md:max-w-full max-md:p-4 max-sm:p-3 max-sm:max-w-full">
      <h2 className="text-3xl font-bold text-gray-900 max-md:text-2xl max-sm:text-xl">
        💬 Additional Options
      </h2>

      <div className="flex flex-col gap-6 mt-6 max-sm:gap-4">
        <div>
          <label className="block text-lg font-medium text-gray-800 max-md:text-base max-sm:text-sm">
            Personal Message:
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-700 text-base max-md:text-sm max-sm:text-xs"
            placeholder="Enter a message..."
          />
        </div>

        <div className="flex items-center gap-3 max-sm:gap-2">
          <input
            type="checkbox"
            id="newsletter"
            className="w-5 h-5 rounded-md border-gray-400 focus:ring-blue-500 max-sm:w-4 max-sm:h-4"
          />
          <label
            htmlFor="newsletter"
            className="text-lg font-medium text-gray-800 max-md:text-base max-sm:text-sm"
          >
            Subscribe to our newsletter for updates
          </label>
        </div>

        <button
          //   onClick={handleCheckout}
          onClick={() => navigate("/transaction")}
          className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transform hover:scale-102 transition duration-300 ease-in-out max-sm:text-sm"
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}

export default CartOptions;
