import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/assets/Functions/host.js";

const LogIn = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doLogin = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/v1/user/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok || !data.userDetails) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      localStorage.setItem("userInfo", JSON.stringify(data.userDetails));
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
      navigate("/");
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin(Email, Password);
  };

  const DirectLogin = (e) => {
    e.preventDefault();
    doLogin("test@abc.com", "av@123");
  };

  return (
    <>
      <Navbar page={{ name: "Create Account", route: "signup" }} />
      <div className="flex justify-center items-center w-full mt-24 p-4">
        <div className="w-full max-w-md p-6 rounded-2xl shadow-xl border border-gray-200 bg-white">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Continue</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-500 hover:underline font-medium">Sign Up</a>
          </p>
          <p className="text-center text-sm text-gray-500 mt-3">
            <button
              className="text-red-500 underline font-medium hover:text-red-600 transition"
              onClick={DirectLogin}
              disabled={loading}
            >
              Try demo account
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogIn;