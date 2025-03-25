"use client";
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [carbonCredit, setCarbonCredit] = useState({
    id: "063-291",
    name: "Pine Tree",
    area: "10 acre",
    age: "100 year old",
    oxygenAmount: "14,550 pounds",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5fbd3bc12cb2d9bb2fc89244890b64f7b7988aa0b609244191ac7f1c0c9aa942",
    transactionId: "SK10-21",
  });

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);

  // ✅ Added new state for Add Credit Modal
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");

  const handleSendToVerification = () => {
    setIsVerificationSent(true);
    setVerificationStatus("⌛ Waiting for Government Approval...");

    setTimeout(() => {
      setVerificationStatus("✅ Approved by Government! Verification Complete.");
    }, 5000);
  };

  const removeCredit = (creditId) => {
    console.log(`Removing credit with ID: ${creditId}`);
    setCarbonCredit(null);
    setShowRemoveModal(false);
    setVerificationStatus("❗ Credit Removed Successfully.");
  };

  const saveModifiedCredit = (updatedCredit) => {
    console.log("Saving modified credit:", updatedCredit);
    setCarbonCredit((prevCredit) => ({
      ...prevCredit,
      ...updatedCredit,
    }));
    setShowModifyModal(false);
    setVerificationStatus("✅ Credit Modified Successfully.");
  };

  // ✅ Added method to save new credit
  const saveNewCredit = (newCredit) => {
    console.log("Adding new credit:", newCredit);
    setCarbonCredit(newCredit);
    setShowAddCreditModal(false);
    setVerificationStatus("✅ New Credit Added Successfully.");
  };

  return (
    <AppContext.Provider
      value={{
        carbonCredit,
        setCarbonCredit,
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
