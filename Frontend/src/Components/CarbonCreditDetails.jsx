"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "./AppContext";

function CreditDetails() {
  const [lastUpdated, setLastUpdated] = useState("");
  const {
    setShowRemoveModal,
    setShowModifyModal,
    carbonCredit,
    isVerificationSent,
    verificationStatus,
    handleSendToVerification,
  } = useAppContext();

  
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
    <main className="flex flex-col self-stretch px-6 mt-0 max-w-5xl mx-auto max-sm:px-3 max-md:px-4">
      
      {!carbonCredit ? (
        <div className="text-center text-lg text-red-500 mt-6">
          ❗ No carbon credit available. It might have been removed.
        </div>
      ) : (
        <>
          
          <div className="text-center mt-0">
            <h2 className="text-3xl font-medium text-black max-md:text-2xl max-sm:text-xl">
              {carbonCredit.name} - Verification - Carbon Credit
            </h2>
            <p className="mt-1 text-2xl text-black max-md:text-lg max-sm:text-base">
              Last update: {lastUpdated}
            </p>
          </div>

          
          <section className="flex flex-col items-start p-6 mt-4 w-full bg-black rounded-lg shadow-lg max-md:p-4 max-sm:p-3">
            <div className="w-full">
              <div className="flex gap-5 max-md:flex-col">
                
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
                    <p className="mt-2 max-md:mt-1">Area: {carbonCredit.area}</p>
                    <p className="mt-2 max-md:mt-1">Age: {carbonCredit.age}</p>
                    <p className="mt-2 max-md:mt-1">
                      Amount of O₂: {carbonCredit.oxygenAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="flex gap-4 justify-between mt-6 w-full max-md:flex-col max-md:gap-3 max-sm:mt-4">
              
              <button
                onClick={() => setShowRemoveModal(true)}
                className={`px-6 py-3 rounded-lg transition-colors text-xl font-medium w-1/4 max-md:w-full max-sm:text-base ${
                  isVerificationSent || !carbonCredit
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "bg-zinc-300 hover:bg-red-400"
                }`}
                disabled={isVerificationSent || !carbonCredit}
              >
                Remove
              </button>

              
              <button
                onClick={() => setShowModifyModal(true)}
                className={`px-6 py-3 rounded-lg transition-colors text-xl font-medium w-1/4 max-md:w-full max-sm:text-base ${
                  isVerificationSent || !carbonCredit
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "bg-zinc-300 hover:bg-blue-400"
                }`}
                disabled={isVerificationSent || !carbonCredit}
              >
                Modify
              </button>

              
              <button
                onClick={handleSendToVerification}
                className={`px-6 py-3 rounded-lg text-white transition-colors text-xl font-medium w-2/5 max-md:w-full max-sm:text-base ${
                  isVerificationSent || !carbonCredit
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={isVerificationSent || !carbonCredit}
              >
                {isVerificationSent ? "✔️ Verification Sent" : "Send to Verification"}
              </button>
            </div>

            
            {verificationStatus && (
              <div
                className={`mt-4 text-xl font-semibold text-center max-md:text-lg ${
                  verificationStatus.includes("Approved") ||
                  verificationStatus.includes("Modified")
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {verificationStatus}
              </div>
            )}

            
            <div className="flex gap-6 mt-6 text-2xl font-medium text-white max-md:mt-4 max-md:flex-col max-md:gap-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/93db1a2074461203af6e0ca93ba22b7494e3a63621e87543375c0a5d0dc38402"
                alt="Credit verification badge"
                className="object-contain shrink-0 w-16 aspect-square max-sm:w-12"
              />
              <div className="my-auto text-left">
                <p className="text-lg max-md:text-base max-sm:text-sm">
                  Credit ID: {carbonCredit?.id}
                </p>
                <p className="text-lg max-md:text-base max-sm:text-sm">
                  Transaction ID: {carbonCredit?.transactionId}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default CreditDetails;
