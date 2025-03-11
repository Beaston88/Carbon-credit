"use client";
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation state
  const [activeNavItem, setActiveNavItem] = useState("Credits");

  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [unreadMessages, setUnreadMessages] = useState(3);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Carbon credit state
  const [carbonCredit, setCarbonCredit] = useState({
    id: "063-291",
    transactionId: "SK10-21",
    name: "Pine Tree",
    area: "10 acre",
    age: "100 year old",
    oxygenAmount: "14,550 pounds",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5fbd3bc12cb2d9bb2fc89244890b64f7b7988aa0b609244191ac7f1c0c9aa942",
  });

  // Modal states
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log(`Searching for: ${query}`);
    // Here you would typically make an API call
  };

  // Function to handle navigation
  const handleNavigation = (navItem) => {
    setActiveNavItem(navItem);
    console.log(`Navigated to: ${navItem}`);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    console.log("User signed out");
    // Here you would typically clear auth tokens and redirect
  };

  // Function to handle notifications
  const handleNotificationClick = () => {
    console.log("Viewing notifications");
    setUnreadNotifications(0);
  };

  // Function to handle messages
  const handleMessagesClick = () => {
    console.log("Viewing messages");
    setUnreadMessages(0);
  };

  // Function to handle remove credit
  const handleRemoveCredit = () => {
    console.log(`Removing credit: ${carbonCredit.id}`);
    setShowRemoveModal(true);
  };

  // Function to confirm remove credit
  const confirmRemoveCredit = () => {
    console.log(`Credit ${carbonCredit.id} removed`);
    setShowRemoveModal(false);
    // Here you would typically make an API call
  };

  // Function to handle modify credit
  const handleModifyCredit = () => {
    console.log(`Modifying credit: ${carbonCredit.id}`);
    setShowModifyModal(true);
  };

  // Function to save modified credit
  const saveModifiedCredit = (updatedCredit) => {
    console.log("Saving modified credit:", updatedCredit);
    setCarbonCredit({ ...carbonCredit, ...updatedCredit });
    setShowModifyModal(false);
    // Here you would typically make an API call
  };

  // Function to handle add credit
  const handleAddCredit = () => {
    console.log("Adding new credit");
    setShowAddCreditModal(true);
  };

  // Function to save new credit
  const saveNewCredit = (newCredit) => {
    console.log("Saving new credit:", newCredit);
    // Here you would typically make an API call
    setShowAddCreditModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        activeNavItem,
        handleNavigation,
        searchQuery,
        handleSearch,
        handleSignOut,
        unreadNotifications,
        unreadMessages,
        handleNotificationClick,
        handleMessagesClick,
        carbonCredit,
        handleRemoveCredit,
        handleModifyCredit,
        showRemoveModal,
        showModifyModal,
        setShowRemoveModal,
        setShowModifyModal,
        confirmRemoveCredit,
        saveModifiedCredit,
        handleAddCredit,
        showAddCreditModal,
        setShowAddCreditModal,
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
