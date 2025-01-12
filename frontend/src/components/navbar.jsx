import React, { useState } from "react";

const Navbar = () => {
  // State to toggle input fields visibility
  const [showInputFields, setShowInputFields] = useState(false);

  return (
    <div className="bg-slate-700 text-white shadow-lg">
      {/* Navbar container */}
      <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo and Links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide flex items-center space-x-2">
            <span className="text-yellow-300 h-11 w-36"><img src="..\src\assets\images\EXALogo.png" alt="logo" /></span> {/* Expense app logo */}
            {/* <span>ExpenseAssist</span> */}
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="font-semibold hover:text-yellow-300 transition">
              Dashboard
            </a>
            <a href="#" className="font-semibold hover:text-yellow-300 transition">
              Reports
            </a>
            <a href="#" className="font-semibold hover:text-yellow-300 transition">
              Insights
            </a>
          </div>
        </div>

        {/* Toggle Button for Input Fields */}
        <button
          onClick={() => setShowInputFields(!showInputFields)}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-black transition"
        >
          {showInputFields ? "Hide Expense Form" : "Add Expense"}
        </button>
      </nav>

      {/* Input Fields for Expenses */}
      {showInputFields && (
        <div className="bg-blue-100 text-gray-800 py-4 px-6 rounded-md max-w-6xl mx-auto shadow-md mt-4">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Add Expense</h2>
          <form className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            {/* Amount */}
            <input
              type="number"
              placeholder="Amount"
              className="p-3 w-full md:w-1/4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Date */}
            <input
              type="date"
              className="p-3 w-full md:w-1/4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Type */}
            <select
              className="p-3 w-full md:w-1/4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                Select Type
              </option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>

            {/* Description */}
            <input
              type="text"
              placeholder="Description"
              className="p-3 w-full md:w-1/4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="p-3 w-full md:w-1/4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Add Expense
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
