import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", mobile: "", balance: 0 });
  const [newBalance, setNewBalance] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    const balance = localStorage.getItem("userBalance") || 0;
    setUser({ ...userInfo, balance });
  }, []);

  const updateBalance = () => {
    if (!isNaN(newBalance) && newBalance !== "") {
      setUser((prev) => ({ ...prev, balance: newBalance }));
      localStorage.setItem("userBalance", newBalance);
      setNewBalance("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userBalance");
    navigate("/signup");
    window.location.reload();
  };

  return (
    <>
        <Navbar page={{ name: "home", route: "" }} />
        <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg mx-4 p-4 w-full max-w-md mt-5 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">User Profile</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-around">
            <p className="text-lg font-medium text-gray-700">Name: {user.name || "Not Provided"}</p>
            {user.email && <p className="text-lg font-medium text-gray-700">Email: {user.email}</p>}
            </div>
            <p className="text-lg font-semibold text-gray-900">Balance: ₹{user.balance}</p>
            <div className="mt-3 flex gap-2 justify-center">
              <input
                type="number"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                placeholder="Enter new balance"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={updateBalance}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Update
              </button>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
        </div>
    </>
  );
};

export default Profile;
