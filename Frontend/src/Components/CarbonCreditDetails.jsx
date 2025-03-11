"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "./AppContext";

function CreditDetails() {
  const [lastUpdated, setLastUpdated] = useState("");
  const { setShowRemoveModal, setShowModifyModal, carbonCredit } = useAppContext(); // ✅ Get updated credit data

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    setLastUpdated(formattedDate);
  }, []);

  return (
    <main className="flex flex-col self-stretch px-6 mt-0">
      <div className="text-center mt-0">
        <h2 className="text-3xl font-medium text-black">
          {carbonCredit.name} - Verification - Carbon Credit
        </h2>
        <p className="mt-1 text-2xl text-black">Last update: {lastUpdated}</p>
      </div>

      <section className="flex flex-col items-start p-4 mt-2 w-full bg-black max-md:px-5">
        <div className="w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[39%] max-md:w-full">
              <img
                src={carbonCredit.image} // ✅ Display updated image
                alt="Carbon Credit"
                className="object-contain grow w-full aspect-[1.1]"
              />
            </div>
            <div className="ml-4 w-[61%] max-md:w-full">
              <div className="flex flex-col items-start mt-1 text-3xl font-light text-white">
                <h3 className="text-4xl font-semibold">{carbonCredit.name}</h3>
                <p className="mt-2">Area: {carbonCredit.area}</p>
                <p className="mt-2">Age: {carbonCredit.age}</p>
                <p className="mt-2">Amount of O₂: {carbonCredit.oxygenAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Buttons to Open Modals */}
        <div className="flex gap-5 justify-between mt-6 max-w-full text-2xl font-medium text-black w-[396px]">
          <button
            onClick={() => setShowRemoveModal(true)} // ✅ Open Remove Modal
            className="px-6 pt-3 pb-4 rounded-3xl bg-zinc-300 hover:bg-red-400 transition-colors"
          >
            Remove
          </button>
          <button
            onClick={() => setShowModifyModal(true)} // ✅ Open Modify Modal
            className="px-8 pt-3 pb-4 rounded-3xl bg-zinc-300 hover:bg-blue-400 transition-colors"
          >
            Modify
          </button>
        </div>

        {/* ✅ Display QR Code, Credit ID, and Transaction ID */}
        <div className="flex gap-6 mt-6 ml-8 text-2xl font-medium text-white max-md:mt-4 max-md:ml-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/93db1a2074461203af6e0ca93ba22b7494e3a63621e87543375c0a5d0dc38402"
            alt="Credit verification badge"
            className="object-contain shrink-0 w-16 aspect-square"
          />
          <div className="my-auto">
            <p>Credit ID: {carbonCredit.id}</p>
            <p>Transaction ID: {carbonCredit.transactionId}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CreditDetails;
