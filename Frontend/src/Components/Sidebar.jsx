import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMonitor,
  FiHome,
  FiShoppingCart,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiX,
  FiMenu,
  FiPlusCircle,
  FiUser
} from "react-icons/fi";
import { getAuth, signOut } from "firebase/auth";
import { useCarbonCredit } from "../context/contextAPI";
import { shortenAddress } from "../utils/shortenAddress";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const { 
    currentAccount, 
    disconnectWallet, 
    connectWallet,
    isMetaMaskInstalled,
    isLoading 
  } = useCarbonCredit();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole.toUpperCase());
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      disconnectWallet();
      localStorage.clear();
      navigate("/home");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleConnectWallet = async () => {
    if (!isMetaMaskInstalled) {
      alert("Please install MetaMask to connect your wallet");
      window.open("https://metamask.io/download.html", "_blank");
      return;
    }
    
    try {
      await connectWallet();
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <>
      <button
        className="md:hidden p-2 fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-green-600 text-white p-6 flex flex-col justify-between z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={toggleSidebar}
        >
          <FiX size={24} />
        </button>

        <div className="space-y-8">
          {/* Wallet Connection Status */}
          {currentAccount ? (
            <div className="flex items-center gap-2 p-3 bg-green-700 rounded-lg mb-4">
              <FiUser className="flex-shrink-0" />
              <span className="truncate text-sm">
                {shortenAddress(currentAccount)}
              </span>
            </div>
          ) : (
            <button
              onClick={handleConnectWallet}
              disabled={!isMetaMaskInstalled || isLoading}
              className={`w-full mb-4 p-3 rounded-lg flex items-center justify-center gap-2 ${
                isLoading || !isMetaMaskInstalled ? 'bg-gray-500' : 'bg-green-700 hover:bg-green-800'
              }`}
            >
              {!isMetaMaskInstalled ? (
                'Install MetaMask'
              ) : isLoading ? (
                'Connecting...'
              ) : (
                <>
                  <FiUser />
                  Connect Wallet
                </>
              )}
            </button>
          )}

          <nav className="space-y-4">
            {role === "SELLER" && (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 text-lg hover:text-gray-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FiMonitor /> Dashboard
                </Link>
                <Link
                  to="/pool"
                  className="flex items-center gap-3 text-lg hover:text-gray-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FiHome /> Pool
                </Link>
                <Link
                  to="/AddCreditPage"
                  className="flex items-center gap-3 text-lg hover:text-gray-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FiPlusCircle /> Add Credit
                </Link>
                <Link
                  to="/transaction"
                  className="flex items-center gap-3 text-lg hover:text-gray-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FiCreditCard /> Transaction
                </Link>
                <Link
                  to="/accounts"
                  className="flex items-center gap-3 text-lg hover:text-gray-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FiSettings /> Accounts
                </Link>
              </>
            )}

            {role === "BUYER" && (
              <>
                <Link
                  to="/cart"
                  className="flex items-center gap-3 text-lg hover:text-gray-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FiShoppingCart /> Cart
                </Link>
                <Link
                  to="/transaction"
                  className="flex items-center gap-3 text-lg hover:text-gray-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FiCreditCard /> Transaction
                </Link>
                <Link
                  to="/accounts"
                  className="flex items-center gap-3 text-lg hover:text-gray-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FiSettings /> Accounts
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="space-y-4">
          {!currentAccount && !isLoading && isMetaMaskInstalled && (
            <button
              onClick={handleConnectWallet}
              className="w-full p-3 bg-green-700 hover:bg-green-800 rounded-lg flex items-center justify-center gap-2"
            >
              <FiUser />
              Connect Wallet
            </button>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 text-lg hover:text-gray-300 w-full"
          >
            <FiLogOut /> Sign out
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-brightness-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
