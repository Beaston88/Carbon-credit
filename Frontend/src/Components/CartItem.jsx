import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi"; // ✅ Import modern icons

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
    <article className="flex gap-5 max-md:flex-col bg-white rounded-xl shadow-lg p-5 max-sm:p-3">
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

          {/* <button
            onClick={() => removeFromCart(id)}
            className="mt-4 flex items-center gap-2 text-gray-600 hover:text-red-500 transition text-sm font-semibold"
          >
            🗑️ Remove
          </button> */}
        </div>
      </div>
    </article>
  );
}

export default CartItem;
