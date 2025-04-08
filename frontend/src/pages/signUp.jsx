import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { lH } from "@/assets/Functions/host.js";

const SignUp = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://${lH}/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: Password, name: Name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("userInfo", JSON.stringify(data.userDetails));
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));

      console.log("User signed up");
      navigate('/');
    } catch (err) {
      console.error("Error during signup:", err.message);
      alert("Signup failed: " + err.message);
    }
  };

  const DirectLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://${lH}/v1/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "test@abc.com", password: "av@123" }),
      });

      const data = await response.json();

      if (data.userDetails?.message === "Can't add new command when connection is in closed state") {
        console.warn("Retrying DirectLogin due to DB connection issue...");
        setTimeout(() => DirectLogin(e), 1000); // Wait 1 second before retrying
        return;
      }

      localStorage.setItem("userInfo", JSON.stringify(data.userDetails));
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));

      console.log("Demo user logged in");
      navigate('/');
    } catch (err) {
      console.error("Error during demo login:", err.message);
      alert("Demo login failed: " + err.message);
    }
  };

  return (
    <>
      <Navbar page={{ name: 'already have Account', route: 'login' }} />
      <div className="flex justify-center items-center w-full mt-24 p-4 cursor-custom-pointer">
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg border border-gray-300 bg-gray-50">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            SignUp to Continue
          </h1>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              placeholder="Enter your Name"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline font-medium">
              Login
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600 mt-4">
            <button className="text-red-500 underline font-medium" onClick={DirectLogin}>
              Go with demo account
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
