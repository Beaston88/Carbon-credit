import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/image1.png";

const Signup = () => {
  const navigate = useNavigate();
  const [businessSector, setBusinessSector] = useState("");
  const [otherSector, setOtherSector] = useState("");

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-lg rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* left */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Personal Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="Set Password"
                />
              </div>
              <div>
                <label className="block text-gray-700">Government ID</label>
                <input
                  type="file"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-700">Preferred Role</label>
                <select className="w-full p-2 border rounded focus:ring focus:ring-indigo-300">
                  <option>Buyer</option>
                  <option>Seller</option>
                </select>
              </div>
            </div>
          </div>

          {/* right */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Business Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Company Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label className="block text-gray-700">Business Sector</label>
                <select
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  value={businessSector}
                  onChange={(e) => setBusinessSector(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Energy">Energy</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {businessSector === "Other" && (
                <div>
                  <label className="block text-gray-700">
                    Specify Business Sector
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                    placeholder="Enter your business sector"
                    value={otherSector}
                    onChange={(e) => setOtherSector(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700">
                  Company Registration Number
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="123456789"
                />
              </div>
              <div>
                <label className="block text-gray-700">Country & Address</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Goods and Services Tax Identification Number (GSTIN)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="GSTIN123456789"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <label className="text-gray-700">
              I accept the{" "}
              <a
                href="#"
                className="text-green-700 font-medium hover:underline"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <button
            className="w-2/3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            onClick={() => navigate("/dashboard")}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-700 font-medium hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
