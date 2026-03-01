import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/assets/Functions/host.js";

const SignUp = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saveAndRedirect = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data.userDetails));
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/v1/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: Email, password: Password, name: Name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");
      saveAndRedirect(data);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const DirectLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let attempts = 0;

    const tryLogin = async () => {
      try {
        const response = await fetch(`${BASE_URL}/v1/user/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "test@abc.com", password: "av@123" }),
        });

        const data = await response.json();

        // Retry on DB connection issue
        if (data.userDetails?.message?.includes("connection") && attempts < 3) {
          attempts++;
          setTimeout(tryLogin, 1200);
          return;
        }

        if (!data.userDetails) throw new Error("Demo login failed");
        saveAndRedirect(data);
      } catch (err) {
        setError("Demo login failed. Please try again.");
        console.error("Demo login error:", err);
        setLoading(false);
      }
    };

    tryLogin();
  };

  return (
    <>
      <Navbar page={{ name: "Already have an account?", route: "login" }} />
      <div className="flex justify-center items-center w-full mt-24 p-4">
        <div className="w-full max-w-md p-6 rounded-2xl shadow-xl border border-gray-200 bg-white">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
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
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline font-medium">Login</Link>
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

export default SignUp;