"use client";
import React, { useState } from "react";
import CartItem from "../Components/CartItem";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ca661bf625f30eb21c8c7fb7e7c1883938cc7906ee8663ed657e18292a60481b",
      title: "Verified Credits",
      price: 50,
    },
  ]);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <main className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto h-full p-4 md:p-8">
        <Header />

        <section className="flex flex-col items-start self-center mt-10 w-full max-w-5xl p-6 max-md:mt-6 max-md:p-4 max-sm:p-3">
          <h1 className="text-4xl font-bold text-black text-center max-md:text-3xl max-sm:text-2xl">
            My Cart
          </h1>

          <div className="w-full mt-8 max-md:mt-6 max-sm:mt-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  imageSrc={item.imageSrc}
                  title={item.title}
                  price={item.price}
                  removeFromCart={removeFromCart}
                />
              ))
            ) : (
              <p className="text-xl text-center text-gray-500 mt-10">
                Your cart is empty.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ShoppingCart;
