import { BASE_URL } from "./host.js";

// Fetches all expense data for the logged-in user
export const getUserExpenses = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const token = JSON.parse(localStorage.getItem("accessToken") || '""');

    if (!user?.user_id) return [];

    const response = await fetch(`${BASE_URL}/v1/expense/get-all-expenses`, {
      method: "POST",
      body: JSON.stringify({ user_id: user.user_id }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching expenses:", err);
    return [];
  }
};

// Calculates total spending from expense array
export const calcTotalSpending = (expenses) => {
  if (!Array.isArray(expenses)) return 0;
  return expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
};

// Calculates total spending for the current month
export const calcMonthlySpending = (expenses) => {
  if (!Array.isArray(expenses)) return 0;
  const now = new Date();
  return expenses
    .filter((item) => {
      const d = new Date(item.date);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
};

// Calculates spending grouped by month for chart
export const calcMonthlyTrend = (expenses) => {
  if (!Array.isArray(expenses)) return [];
  const map = {};
  expenses.forEach((item) => {
    const d = new Date(item.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleString("default", { month: "short", year: "2-digit" });
    if (!map[key]) map[key] = { month: label, total: 0, key };
    map[key].total += Number(item.amount || 0);
  });
  return Object.values(map).sort((a, b) => a.key.localeCompare(b.key));
};

// Calculates spending grouped by category
export const calcCategoryBreakdown = (expenses) => {
  if (!Array.isArray(expenses)) return [];
  const map = {};
  expenses.forEach((item) => {
    const cat = item.type || "others";
    map[cat] = (map[cat] || 0) + Number(item.amount || 0);
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

// Calculates top 5 most expensive single expenses
export const calcTopExpenses = (expenses) => {
  if (!Array.isArray(expenses)) return [];
  return [...expenses]
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .slice(0, 5);
};

// Calculates average daily spending (last 30 days)
export const calcAvgDailySpending = (expenses) => {
  if (!Array.isArray(expenses) || expenses.length === 0) return 0;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recent = expenses.filter((item) => new Date(item.date) >= thirtyDaysAgo);
  const total = recent.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return Math.round(total / 30);
};