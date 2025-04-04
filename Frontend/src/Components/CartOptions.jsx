import React from "react";

function CartOptions() {
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700 text-base max-md:text-sm max-sm:text-xs"
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
          className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out max-sm:text-sm"
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}

export default CartOptions;
