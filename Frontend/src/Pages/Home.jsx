import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCarbonCredit } from "../context/contextAPI";
import bgImage from "../assets/image4.png";
import Dashboard from "../Components_1/components/Dashboard";
import { shortenAddress } from "../utils/shortenAddress";
import { pingBackend } from "../api";

const Home = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const { currentAccount } = useCarbonCredit();

  useEffect(() => {
    void pingBackend();
  }, []);

  return (
    <div className="text-white relative">
      {showDashboard ? (
        <Dashboard onBack={() => setShowDashboard(false)} />
      ) : (
        <>
          <nav className="text-white fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-opacity-60 backdrop-blur-md">
            <div className="text-lg font-bold text-center px-4 md:px-8 leading-tight">
              CARBON CREDITS <br /> MARKETPLACE
            </div>
            <div className="hidden md:flex items-center space-x-8 font-medium">
              <Link to="/login" className="hover:text-green-600">
                <div className="flex items-center bg-white px-4 py-1 rounded-full">
                  <span className="text-green-800 text-sm">Login</span>
                </div>
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
                  <div className="flex items-center bg-red-100 px-3 py-1 rounded-full">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    <span className="text-green-800 text-sm">
                      Wallet Not Connected
                    </span>
                  </div>
                )}
              </div>
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
                A blockchain-powered marketplace for buying, selling, and
                verifying carbon credits transparently. Secure transactions,
                smart contracts, and government-regulated monitoring for a
                sustainable future.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
