import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import Table from '../components/table.jsx';
import AddExpense from '../components/addExpense.jsx';
import AnimatedCharacter from '../components/character.jsx';
import {
  getUserExpenses,
  calcTotalSpending,
  calcMonthlySpending,
} from '../assets/Functions/userDataAnylise.js';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [characterMessage, setCharacterMessage] = useState("Hi! Let's manage expenses");
  const [variant, setVariant] = useState("default");

  // Async spending data
  const [totalSpending, setTotalSpending] = useState(0);
  const [totalSpendingInOneMonth, setTotalSpendingInOneMonth] = useState(0);

  const user = JSON.parse(localStorage.getItem("userInfo") || "{}")?.name || "Friend";

  // Load spending stats on mount
  useEffect(() => {
    const loadStats = async () => {
      const expenses = await getUserExpenses();
      setTotalSpending(calcTotalSpending(expenses));
      setTotalSpendingInOneMonth(calcMonthlySpending(expenses));
    };
    loadStats();
  }, []);

  // Build messages reactively after spending data loads
  const userMessages = [
    { text: `Hi ${user}! Let's manage expenses`, type: "default" },
    { text: "Tap on any expense to see full info", type: "default" },
    { text: `Total Spending: ₹${totalSpending}`, type: totalSpending > 3000 ? "warning" : "success" },
    { text: `This Month: ₹${totalSpendingInOneMonth}`, type: totalSpendingInOneMonth > 500 ? "alert" : "default" },
    {
      text: totalSpendingInOneMonth > 2000 ? "You're spending too much!" : "You're doing great this month 🎉",
      type: totalSpendingInOneMonth > 1000 ? "warning" : "success",
    },
  ];

  // Rotate character messages every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => Math.floor(Math.random() * userMessages.length));
    }, 8000);
    return () => clearInterval(interval);
  }, [totalSpending, totalSpendingInOneMonth]);

  useEffect(() => {
    if (userMessages[messageIndex]) {
      setCharacterMessage(userMessages[messageIndex].text);
      setVariant(userMessages[messageIndex].type);
    }
  }, [messageIndex, totalSpending, totalSpendingInOneMonth]);

  const handleChange = (value) => {
    setInputValue(value);
  };

  return (
    <>
      <Navbar page={{ name: 'Profile', route: 'profile' }} onInputChange={handleChange} />
      <AddExpense />
      <Table value={inputValue} />
      <div className="animate-fade-in">
        <AnimatedCharacter message={characterMessage} variant={variant} />
      </div>
    </>
  );
};

export default Home;