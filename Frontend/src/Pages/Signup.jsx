import React from "react";
import backgroundImage from "../assets/image1.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen bg-[#fcfcfc] brightness-90 bg-bottom bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100vw 70vh",
      }}
    >
      <div className="flex justify-center items-start min-h-screen pt-20">
        <div className="p-8 rounded-xl w-full max-w-md bg-opacity-80 backdrop-blur-lg shadow-lg">
          <h2 className="text-2xl font-extrabold text-center mb-10 text-gray-800 tracking-wider">
            SIGN UP
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="Aadhar Card Number"
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="GSTIN Number"
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring focus:ring-green-300"
            />
            <select className="w-full px-4 py-3 border border-black rounded-xl focus:ring focus:ring-green-300">
              <option value="seller">Seller Account</option>
              <option value="buyer">Buyer Account</option>
            </select>
            <div className=" flex justify-center items-center">
              <button
                onClick={handleSignup}
                className="w-1/2 bg-green-600 text-white py-3 font-bold rounded-lg hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-xl flex justify-center text-white mt-4">
            <p>Already have an account? </p>
            <button
              onClick={() => navigate("/")}
              className="hover:underline font-medium ml-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
