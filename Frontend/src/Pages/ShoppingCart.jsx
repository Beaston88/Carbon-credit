"use client";
import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import CartItem from "./CartItem";
import CartOptions from "./CartOptions";

function ShoppingCart() {
  // Initial cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca661bf625f30eb21c8c7fb7e7c1883938cc7906ee8663ed657e18292a60481b",
      title: "Verified Credits",
      price: 50,
    },
  ]);

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <main className="flex flex-col pb-20 bg-white max-md:pb-10 max-sm:pb-5">
      <NavigationBar />

      <section className="flex flex-col items-start self-center mt-10 w-full max-w-5xl p-6 max-md:mt-6 max-md:p-4 max-sm:p-3">


        {/* Shopping Cart Title */}
        <h1 className="text-4xl font-bold text-black text-center max-md:text-3xl max-sm:text-2xl">
          My Cart
        </h1>

        {/* Shopping Cart Items */}
        <div className="w-full mt-8 max-md:mt-6 max-sm:mt-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                imageSrc={item.imageSrc}
                title={item.title}
                price={item.price}
                removeFromCart={removeFromCart} // ✅ Passing the remove function
              />
            ))
          ) : (
            <p className="text-xl text-center text-gray-500 mt-10">Your cart is empty.</p>
          )}
        </div>

        {/* Cart Options */}
        <CartOptions />
      </section>
    </main>
  );
}

export default ShoppingCart;
