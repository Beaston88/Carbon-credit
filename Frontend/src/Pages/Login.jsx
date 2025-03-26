import React, { useState } from "react";
import backgroundImage from "../assets/image1.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { app } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getIdToken } from "firebase/auth";
import axios from "axios";
import { apiURL } from "../Constants";

const Login = () => {
  let auth = getAuth(app);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    // TODO : validation
    e.preventDefault();
    setError("");

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the authenticated user
      const user = userCredential.user;

      // Get the ID token after login
      if (user) {
        const token = await getIdToken(user);
        console.log("✅ User ID Token:", token); // Print the token to console
        localStorage.setItem("token", token); // Optional: Store token locally if needed
      }

      const response = await axios.get(apiURL + "/user", {
        headers: {
          Authorization: `Bearer ${token}`, // token from firebase
        },
      });

      // Navigate to the dashboard after successful login
      // navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
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
            CARBON CREDITS <br /> MARKETPLACE
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

            <div className="text-xl flex justify-between text-gray-600">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
              <Link to="/signup" className="hover:underline font-medium">
                Sign up
              </Link>
            </div>

            <button className="w-full bg-green-600 text-white py-3 font-bold rounded-lg hover:bg-green-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
