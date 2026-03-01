import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", mobile: "", balance: 0 });
  const [newBalance, setNewBalance] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const balance = localStorage.getItem("userBalance") || 0;
    setUser({ ...userInfo, balance });
  }, []);

  const updateBalance = () => {
    if (!isNaN(newBalance) && newBalance !== "") {
      setUser((prev) => ({ ...prev, balance: newBalance }));
      localStorage.setItem("userBalance", newBalance);
      setNewBalance("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
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
      <Navbar page={{ name: "Home", route: "" }} />
      <div className="flex justify-center mt-8 p-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-sm text-center">
          {/* Avatar */}
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            👤
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name || "User"}</h2>
          {user.email && <p className="text-gray-500 text-sm mt-1">{user.email}</p>}

          {/* Balance */}
          <div className="mt-6 bg-indigo-50 rounded-2xl p-4">
            <p className="text-sm text-gray-500 font-medium">Current Balance</p>
            <p className="text-4xl font-bold text-indigo-600 mt-1">₹{Number(user.balance).toLocaleString()}</p>
          </div>

          {/* Update Balance */}
          <div className="mt-5 flex gap-2">
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              placeholder="New balance..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              onKeyDown={(e) => e.key === "Enter" && updateBalance()}
            />
            <button
              onClick={updateBalance}
              className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition text-sm font-semibold"
            >
              {saved ? "✓ Saved" : "Update"}
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 text-white py-3 px-4 rounded-xl shadow hover:bg-red-600 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;