import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/image1.png";
import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { apiURL } from "../Constants";

const Signup = () => {
  const navigate = useNavigate();
  const [businessSector, setBusinessSector] = useState("");
  const [otherSector, setOtherSector] = useState("");
  const auth = getAuth(app);

  const [formData, setFormData] = useState({
    ownerName: "", //
    email: "", //
    phone: "", //
    password: "", //
    companyName: "",
    businessSector: "",
    otherSector: "",
    walletAddress: "", //
    address: "", //
    gst: "", //
    role: "", //
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    // Form validation
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.email || !formData.password || !formData.ownerName || !formData.phone) {
      setError("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation (at least 6 characters)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Get the token from the user credential
      const token = await userCredential.user.getIdToken();

      // Send user data to backend
      const response = await axios.post(
        apiURL + "/user",
        {
          role: formData.role,
          gst: formData.gst,
          address: formData.address,
          phone: formData.phone,
          owner_name: formData.ownerName,
          wallet_address: formData.walletAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);

      // Navigate to dashboard after successful signup
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "An error occurred during signup");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-lg rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* left */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Personal Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="+1234567890"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="Set Password"
                  required
                />
              </div>
              {/* <div>
                <label className="block text-gray-700">Government ID</label>
                <input
                  type="file"
                  className="w-full p-2 border rounded bg-white"
                />
              </div> */}
              <div>
                <label className="block text-gray-700">Preferred Role</label>
                <select
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value.toUpperCase(),
                    })
                  }
                >
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
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label className="block text-gray-700">Business Sector</label>
                <select
                  name="businessSector"
                  value={formData.businessSector}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                >
                  <option value="">Select</option>
                  <option value="Energy">Energy</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.businessSector === "Other" && (
                <div>
                  <label className="block text-gray-700">
                    Specify Business Sector
                  </label>
                  <input
                    type="text"
                    name="otherSector"
                    value={formData.otherSector}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                    placeholder="Enter your business sector"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700">Wallet Address</label>
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  placeholder="123456789"
                />
              </div>
              <div>
                <label className="block text-gray-700">Country & Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
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
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
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
        <form onSubmit={handleSignup}>
          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="w-2/3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
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
        </form>
      </div>
    </div>
  );
};

export default Signup;
