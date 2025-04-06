import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCarbonCredit } from "../context/contextAPI";
import bgImage from "../assets/image3.png";
import Dashboard from "../Components_1/components/Dashboard";
import { shortenAddress } from "../utils/shortenAddress";

const Home = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const { 
    currentAccount, 
    connectWallet, 
    isMetaMaskInstalled,
    isLoading 
  } = useCarbonCredit();

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
    <div className="text-white relative">
      {showDashboard ? (
        <Dashboard onBack={() => setShowDashboard(false)} />
      ) : (
        <>
          <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 text-black bg-opacity-60 backdrop-blur-md">
            <div className="text-lg font-bold text-center px-4 md:px-8 leading-tight">
              CARBON CREDITS <br /> MARKETPLACE
            </div>
            <div className="hidden md:flex items-center space-x-14 font-semibold">
              <Link to="/marketplace" className="hover:text-green-600">
                Marketplace
              </Link>
              <Link to="/faqs" className="hover:text-green-600">
                FAQs
              </Link>
              <Link to="/about" className="hover:text-green-600">
                About
              </Link>
              
              <div className="flex items-center">
                {currentAccount ? (
                  <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-green-800 text-sm">
                      {shortenAddress(currentAccount)}
                    </span>
                  </div>
                ) : (
                  <button 
                    onClick={handleConnectWallet}
                    disabled={isLoading}
                    className={`hover:text-green-600 ${isLoading ? 'opacity-50' : ''}`}
                  >
                    {isLoading ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                )}
              </div>

              <Link to="/login" className="hover:text-green-600">
                Log in
              </Link>
              <Link to="/signup" className="hover:text-green-600">
                Register
              </Link>
            </div>
          </nav>

          <div
            className="h-screen bg-[#fcfcfc] brightness-90 bg-cover bg-center flex flex-col justify-center items-start text-left px-8"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="flex flex-col items-start mx-20">
              <h1 className="text-3xl md:text-5xl mt-20 font-bold text-white tracking-wide">
                The Voluntary Carbon <br />
                Offset Market
              </h1>
              <p className="mt-2 text-lg text-white max-w-lg">
                A blockchain-powered marketplace for buying, selling, and verifying
                carbon credits transparently. Secure transactions, smart contracts,
                and government-regulated monitoring for a sustainable future.
              </p>
              <button
                onClick={handleConnectWallet}
                disabled={!isMetaMaskInstalled || isLoading || currentAccount}
                className={`mt-6 px-6 py-3 ${
                  currentAccount ? 'bg-gray-400 cursor-default' : 'bg-green-600 hover:bg-green-700'
                } text-white rounded-lg transition-colors ${
                  !isMetaMaskInstalled ? 'opacity-50 cursor-not-allowed' : ''
                } ${isLoading ? 'opacity-50' : ''}`}
              >
                {!isMetaMaskInstalled ? (
                  'MetaMask Required'
                ) : isLoading ? (
                  'Connecting...'
                ) : currentAccount ? (
                  'Wallet Connected'
                ) : (
                  'Connect Wallet'
                )}
              </button>
              {!isMetaMaskInstalled && (
                <p className="mt-2 text-sm text-white">
                  Please install <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer" className="underline">MetaMask</a> to continue
                </p>
              )}
            </div>
          </div>

          <section className="bg-green-100 text-black py-5 text-center">
            <h2 className="text-3xl font-bold">How it works?</h2>
            <p className="mt-4 px-6 max-w-2xl mx-auto">
              We find the most meaningful decarbonization projects, facilitate
              third-party verification, and list these projects on our site. You
              review the projects and decide which ones you want to support as we
              work together to slow and reverse global warming.
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;