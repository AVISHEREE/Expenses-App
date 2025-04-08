import React, { useEffect, useState, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend
} from "recharts";
import Navbar from "../components/navbar.jsx";
import { Data } from '../assets/Functions/userDataAnylise.js';
const Insights = () => {
  const [data, setData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#A28DFF"];

    const getData = async () => {
      const userExpenses = await Data;
      if (!userExpenses || userExpenses.length === 0) {
        setData([]);
        return;
      }
      setData(userExpenses);
    };
    
    
  
    useEffect(() => {
        getData();
    }, []);

  useEffect(() => {
    if (!Data || !Array.isArray(Data)) {
      return;
    }
  
  
    const categoryMap = {};
  
    for (const item of Data) {
      if (!categoryMap[item.type]) {
        categoryMap[item.type] = 0;
      }
      categoryMap[item.type] += item.amount;
    }
  
    const formattedCategoryData = Object.keys(categoryMap).map((key, index) => ({
      name: key,
      value: categoryMap[key],
      fill: COLORS[index % COLORS.length],
    }));
  
    setCategoryData(formattedCategoryData);
  }, []);
  

  const handleBarClick = useCallback((entry) => {
    setSelectedExpense(entry);
  }, []);

  return (
    <>
      <Navbar page={{ name: "Home", route: "" }} />
      <div className="max-sm:block max-sm:mx-4 flex justify-center">
        <div className="w-1/2 max-sm:w-full">
          <h1 className="text-3xl text-white flex justify-center font-semibold mt-5">Your Expense Insights</h1>

          {selectedExpense && (
            <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-lg mt-6">
              <h2 className="text-lg font-bold mb-4">Expense Details</h2>
              <p><strong>Date:</strong> {selectedExpense.date}</p>
              <p><strong>Amount:</strong> ₹{selectedExpense.amount}</p>
              <p><strong>Category:</strong> {selectedExpense.category}</p>
              <p><strong>Description:</strong> {selectedExpense.description || "No description available"}</p>
            </div>
          )}

          <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-lg mt-6 overflow-auto max-h-96">
            <h2 className="text-lg font-bold mb-4">Spending Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} onClick={(e) => handleBarClick(e.activePayload?.[0]?.payload)}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* <div className="w-full max-w-3xl bg-white p-4 mb-4 rounded-lg shadow-lg mt-6">
            <h2 className="text-lg font-bold mb-4">Total vs This Month's Spending</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Total Spending", value: totalSpending },
                    { name: "This Month", value: totalSpendingInOneMonth }
                  ]}
                  cx="50%" cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                >
                  <Cell fill={COLORS[0]} />
                  <Cell fill={COLORS[1]} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div> */}

          {/* New Feature: Category-wise Spending */}
          <div className="w-full max-w-3xl bg-white p-4 mb-4 rounded-lg shadow-lg mt-6">
            <h2 className="text-lg font-bold mb-4">Category-wise Spending Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%" cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;