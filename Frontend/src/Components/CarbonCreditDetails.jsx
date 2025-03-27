"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "./AppContext.jsx";
import { apiURL } from "../Constants/index.js";
import axios from "axios";

function CreditDetails() {
  const [lastUpdated, setLastUpdated] = useState("");
  const {
    carbonCredits,
    setShowRemoveModal,
    setShowModifyModal,
    setSelectedCreditId, // ✅ To set the selected credit ID
    isVerificationSent,
    handleSendToVerification,
  } = useAppContext();

  // // ✅ Correctly set the last updated time
  // useEffect(() => {
  //   const now = new Date();
  //   const formattedDate = now.toLocaleString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: true,
  //   });
  //   setLastUpdated(formattedDate);
  // }, [carbonCredits]); // ✅ Updated to refresh time after credit

  const fetchListing = async () => {
    const response = await axios.get(apiURL + "/marketplace?verified=true", {
      headers: {
        Authorization: `Bearer ${token}`, // firebase token
      },
    });
  };

  // fetch listing ko use effect se connect krna to get is on page load

  return (
    <main className="flex flex-col self-stretch px-6 mt-0 max-w-5xl mx-auto max-sm:px-3 max-md:px-4">
      {/* ✅ Display Heading and Last Updated Time Only Once */}
      <div className="text-center mt-6">
        <h2 className="text-3xl font-bold text-black max-md:text-2xl max-sm:text-xl">
          Carbon Credit Dashboard
        </h2>
        <p className="mt-1 text-xl text-gray-600 max-md:text-lg max-sm:text-base">
          Last updated: {new Date().toUTCString()}
        </p>
      </div>

      {/* ✅ Show message if no credits are available */}
      {carbonCredits.length === 0 ? (
        <div className="text-center text-lg text-red-500 mt-6">
          ❗ No carbon credits available. Add some to get started.
        </div>
      ) : (
        <>
          {/* ✅ Loop through carbonCredits to display each credit */}
          {carbonCredits.map((carbonCredit) => (
            <section
              key={carbonCredit.id}
              className="flex flex-col items-start p-6 mt-4 w-full bg-black rounded-lg shadow-lg max-md:p-4 max-sm:p-3"
            >
              <div className="w-full flex gap-5 max-md:flex-col">
                <div className="w-[39%] max-md:w-full">
                  <img
                    src={carbonCredit.image}
                    alt="Carbon Credit"
                    className="object-contain w-full h-auto rounded-lg shadow-md aspect-square max-sm:h-40"
                  />
                </div>

                <div className="ml-4 w-[61%] max-md:w-full max-md:ml-0 mt-2 max-sm:mt-3">
                  <div className="flex flex-col items-start text-3xl font-light text-white max-md:text-2xl max-sm:text-lg">
                    <h3 className="text-4xl font-semibold max-md:text-3xl max-sm:text-2xl">
                      {carbonCredit.name}
                    </h3>
                    <p className="mt-2 max-md:mt-1">
                      Area: {carbonCredit.area}
                    </p>
                    <p className="mt-2 max-md:mt-1">Age: {carbonCredit.age}</p>
                    <p className="mt-2 max-md:mt-1">
                      Amount of O₂: {carbonCredit.oxygenAmount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-between mt-6 w-full max-md:flex-col max-md:gap-3 max-sm:mt-4">
                {/* ✅ Modify Button */}
                <button
                  onClick={() => {
                    setSelectedCreditId(carbonCredit.id);
                    setShowModifyModal(true);
                  }}
                  className={`px-6 py-3 rounded-lg transition-colors text-xl font-medium w-1/4 max-md:w-full max-sm:text-base ${
                    isVerificationSent
                      ? "bg-gray-400 cursor-not-allowed text-gray-600"
                      : "bg-zinc-300 hover:bg-blue-400"
                  }`}
                  disabled={isVerificationSent}
                >
                  Modify
                </button>

                {/* ✅ Remove Button */}
                <button
                  onClick={() => {
                    setSelectedCreditId(carbonCredit.id);
                    setShowRemoveModal(true);
                  }}
                  className={`px-6 py-3 rounded-lg transition-colors text-xl font-medium w-1/4 max-md:w-full max-sm:text-base ${
                    isVerificationSent
                      ? "bg-gray-400 cursor-not-allowed text-gray-600"
                      : "bg-zinc-300 hover:bg-red-400"
                  }`}
                  disabled={isVerificationSent}
                >
                  Remove
                </button>

                {/* ✅ Send to Verification Button */}
                <button
                  onClick={handleSendToVerification}
                  className={`px-6 py-3 rounded-lg text-white transition-colors text-xl font-medium w-2/5 max-md:w-full max-sm:text-base ${
                    isVerificationSent
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={isVerificationSent}
                >
                  {isVerificationSent
                    ? "✔️ Verification Sent"
                    : "Send to Verification"}
                </button>
              </div>
            </section>
          ))}
        </>
      )}
    </main>
  );
}

export default CreditDetails;
