import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

function CartItem({ id, imageSrc, title, price, removeFromCart }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex gap-5 max-md:flex-col bg-white rounded-xl shadow-lg p-5 max-sm:p-3">
      <div className="w-3/12 max-md:w-full max-sm:w-full">
        <img
          src={imageSrc}
          alt={`${title} product image`}
          className="object-contain w-full rounded-xl aspect-square max-sm:h-40"
        />
      </div>
      <div className="ml-5 w-9/12 max-md:w-full">
        <div className="self-stretch my-auto w-full font-medium text-black max-md:mt-10">
          <div className="flex flex-wrap gap-5 justify-between w-full max-sm:flex-col max-sm:gap-3">
            <h3 className="self-start text-3xl font-semibold max-sm:text-xl">
              {title}
            </h3>

            <div className="flex items-center gap-4 max-sm:gap-2">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 text-xl font-semibold text-gray-700 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition max-sm:w-8 max-sm:h-8 max-sm:text-lg"
                aria-label="Decrease quantity"
              >
                <FiMinus />
              </button>

              <div
                className="w-16 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-xl text-gray-700 max-sm:w-12 max-sm:h-8 max-sm:text-lg bg-gray-100"
                aria-label="Quantity"
              >
                {quantity}
              </div>

              <button
                onClick={increaseQuantity}
                className="w-10 h-10 text-xl font-semibold text-gray-700 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition max-sm:w-8 max-sm:h-8 max-sm:text-lg"
                aria-label="Increase quantity"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between max-sm:flex-col max-sm:items-start">
            <span className="text-gray-500 text-lg max-sm:text-sm">
              Total Price:
            </span>
            <span className="text-2xl font-bold text-gray-800 max-sm:text-lg">
              ${(price * quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

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

        <button className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out max-sm:text-sm">
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}

function Cart() {
  return (
    <div className="container mx-auto p-4">
      <CartItem
        id={1}
        imageSrc="/path/to/image.jpg"
        title="Sample Product"
        price={50}
      />
      <CartOptions />
    </div>
  );
}

export default Cart;
