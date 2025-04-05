"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseConfig";

const AppContext = createContext();

export function AppProvider({ children }) {
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
  const [selectedCreditId, setSelectedCreditId] = useState(null);

  const handleSendToVerification = () => {
    setIsVerificationSent(true);
    setVerificationStatus("⌛ Waiting for Government Approval...");
    setTimeout(() => {
      setVerificationStatus(
        "✅ Approved by Government! Verification Complete."
      );
    }, 5000);
  };

  const removeCredit = (creditId) => {
    setCarbonCredits((prevCredits) =>
      prevCredits.filter((credit) => credit.id !== creditId)
    );
    setShowRemoveModal(false);
    setVerificationStatus("❗ Credit Removed Successfully.");
  };

  const saveModifiedCredit = (updatedCredit) => {
    setCarbonCredits((prevCredits) =>
      prevCredits.map((credit) =>
        credit.id === updatedCredit.id
          ? { ...credit, ...updatedCredit }
          : credit
      )
    );
    setShowModifyModal(false);
    setVerificationStatus("✅ Credit Modified Successfully.");
  };

  const saveNewCredit = (newCredit) => {
    setCarbonCredits((prevCredits) => [...prevCredits, newCredit]);
    setShowAddCreditModal(false);
    setVerificationStatus("✅ New Credit Added Successfully.");
  };

  // ✅ Firebase Auth logic
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <AppContext.Provider
      value={{
        // Firebase auth
        currentUser,
        authLoading,

        // Carbon credit logic
        carbonCredits,
        setCarbonCredits,
        selectedCreditId,
        setSelectedCreditId,
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
      {!authLoading && children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
