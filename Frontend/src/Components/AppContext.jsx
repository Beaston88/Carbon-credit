"use client";
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // ✅ Updated state to handle multiple carbon credits
  const [carbonCredits, setCarbonCredits] = useState([
    {
      id: "063-291",
      name: "Pine Tree",
      area: "10 acre",
      age: "100 year old",
      oxygenAmount: "14,550 pounds",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5fbd3bc12cb2d9bb2fc89244890b64f7b7988aa0b609244191ac7f1c0c9aa942",
      transactionId: "SK10-21",
    },
  ]);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");

  // ✅ New state to track selected credit ID for modify/remove actions
  const [selectedCreditId, setSelectedCreditId] = useState(null);

  const handleSendToVerification = () => {
    setIsVerificationSent(true);
    setVerificationStatus("⌛ Waiting for Government Approval...");

    setTimeout(() => {
      setVerificationStatus("✅ Approved by Government! Verification Complete.");
    }, 5000);
  };

  // ✅ Remove selected credit by ID
  const removeCredit = (creditId) => {
    console.log(`Removing credit with ID: ${creditId}`);
    setCarbonCredits((prevCredits) =>
      prevCredits.filter((credit) => credit.id !== creditId)
    );
    setShowRemoveModal(false);
    setVerificationStatus("❗ Credit Removed Successfully.");
  };

  // ✅ Update the selected credit by ID
  const saveModifiedCredit = (updatedCredit) => {
    console.log("Saving modified credit:", updatedCredit);
    setCarbonCredits((prevCredits) =>
      prevCredits.map((credit) =>
        credit.id === updatedCredit.id ? { ...credit, ...updatedCredit } : credit
      )
    );
    setShowModifyModal(false);
    setVerificationStatus("✅ Credit Modified Successfully.");
  };

  // ✅ Add a new credit to the list
  const saveNewCredit = (newCredit) => {
    console.log("Adding new credit:", newCredit);
    setCarbonCredits((prevCredits) => [...prevCredits, newCredit]);
    setShowAddCreditModal(false);
    setVerificationStatus("✅ New Credit Added Successfully.");
  };

  return (
    <AppContext.Provider
      value={{
        carbonCredits,
        setCarbonCredits,
        selectedCreditId,
        setSelectedCreditId, // Pass selectedCreditId to modals
        showRemoveModal,
        setShowRemoveModal,
        showModifyModal,
        setShowModifyModal,
        showAddCreditModal,
        setShowAddCreditModal,
        isVerificationSent,
        setIsVerificationSent,
        verificationStatus,
        setVerificationStatus,
        handleSendToVerification,
        removeCredit,
        saveModifiedCredit,
        saveNewCredit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
