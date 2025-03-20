import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/image3.png";

const Home = () => {
  return (
    <div className="text-white relative">
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 text-black bg-opacity-60 backdrop-blur-md">
        <div className="text-lg font-bold text-center px-4 md:px-8 leading-tight">
          CARBON CREDITS <br /> MARKETPLACE
        </div>
        <div className="hidden md:flex space-x-14 font-semibold">
          <Link to="/marketplace" className="hover:text-green-600">
            Marketplace
          </Link>
          <Link to="/faqs" className="hover:text-green-600">
            FAQs
          </Link>
          <Link to="/about" className="hover:text-green-600">
            About
          </Link>
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
    </div>
  );
};

export default Home;
