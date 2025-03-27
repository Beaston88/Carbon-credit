import React, { useState } from "react";
import backgroundImage from "../assets/image1.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { app } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword, getIdToken } from "firebase/auth";
// import { govtLogin } from "../api/government";
// import { getUser } from "../api/user";

const GovtLogin = () => {
  let auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [governmentId, setGovernmentId] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !governmentId) {
      setError("All fields are required");
      return;
    }

    try {
      // Call government login API
      const response = await govtLogin(email, password, governmentId);

      // Store token (optional, based on your auth flow)
      localStorage.setItem("govt_token", response.token);

      console.log("Government User Data:", response);
      navigate("/GovtDashboard");
    } catch (err) {
      setError("Invalid credentials or authentication failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#fcfcfc] brightness-90 bg-bottom bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100vw 70vh",
      }}
    >
      <div className="flex justify-center items-start min-h-screen pt-30">
        <div className="p-8 rounded-xl w-full max-w-md bg-opacity-90">
          <h2 className="text-2xl font-extrabold text-center mb-10 text-gray-800 tracking-wider">
            GOVERNMENT LOGIN
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 pl-10 border border-black rounded-4xl focus:ring focus:ring-green-300"
              />
              <span className="absolute left-3 top-3 text-gray-500">✉️</span>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pl-10 border border-black rounded-4xl focus:ring focus:ring-green-300"
              />
              <span className="absolute left-3 top-3 text-gray-500">🔒</span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Government ID"
                value={governmentId}
                onChange={(e) => setGovernmentId(e.target.value)}
                required
                className="w-full px-4 py-3 pl-10 border border-black rounded-4xl focus:ring focus:ring-green-300"
              />
              <span className="absolute left-3 top-3 text-gray-500">🆔</span>
            </div>

            <button className="w-full bg-green-600 text-white py-3 font-bold rounded-lg hover:bg-green-700 transition">
              Login
            </button>
          </form>

          <div className="text-lg text-center text-gray-600 mt-4">
            <Link to="/login" className="text-gray-600 hover:underline">
              Back to User Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovtLogin;
