import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid,
  AreaChart, Area,
} from "recharts";
import Navbar from "../components/navbar.jsx";
import {
  getUserExpenses,
  calcTotalSpending,
  calcMonthlySpending,
  calcMonthlyTrend,
  calcCategoryBreakdown,
  calcTopExpenses,
  calcAvgDailySpending,
} from "../assets/Functions/userDataAnylise.js";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899"];

const CATEGORY_EMOJI = {
  grocery: "🛒",
  utilities: "💡",
  transportation: "🚗",
  entertainment: "🎉",
  education: "📚",
  healthcare: "🏥",
  others: "🌀",
};

const StatCard = ({ label, value, sub, color = "indigo" }) => {
  const colors = {
    indigo: "from-indigo-500 to-indigo-700",
    amber:  "from-amber-400 to-amber-600",
    emerald:"from-emerald-400 to-emerald-600",
    rose:   "from-rose-400 to-rose-600",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} text-white rounded-2xl p-5 shadow-lg`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-bold mt-1">₹{value.toLocaleString()}</p>
      {sub && <p className="text-xs mt-1 opacity-70">{sub}</p>}
    </div>
  );
};

const Insights = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Derived data
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topExpenses, setTopExpenses] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [avgDaily, setAvgDaily] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getUserExpenses();
      setExpenses(data);
      setTotalSpending(calcTotalSpending(data));
      setMonthlySpending(calcMonthlySpending(data));
      setMonthlyTrend(calcMonthlyTrend(data));
      setCategoryData(calcCategoryBreakdown(data));
      setTopExpenses(calcTopExpenses(data));
      setAvgDaily(calcAvgDailySpending(data));
      setLoading(false);
    };
    loadData();
  }, []);

  const tabs = ["overview", "trends", "categories", "top expenses"];

  if (loading) {
    return (
      <>
        <Navbar page={{ name: "Home", route: "" }} />
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-xl animate-pulse">Loading your insights...</div>
        </div>
      </>
    );
  }

  if (expenses.length === 0) {
    return (
      <>
        <Navbar page={{ name: "Home", route: "" }} />
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <p className="text-5xl">📊</p>
          <p className="text-white text-xl font-semibold">No expenses yet</p>
          <p className="text-gray-400">Add your first expense to see insights here!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar page={{ name: "Home", route: "" }} />
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <h1 className="text-3xl text-white font-bold mt-6 mb-6 text-center">📊 Your Expense Insights</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Spending" value={totalSpending} sub="All time" color="indigo" />
          <StatCard label="This Month" value={monthlySpending}
            sub={new Date().toLocaleString("default", { month: "long" })} color="amber" />
          <StatCard label="Avg Daily (30d)" value={avgDaily} sub="Last 30 days" color="emerald" />
          <StatCard label="Total Entries" value={expenses.length} sub="Expenses tracked" color="rose" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition ${
                activeTab === tab
                  ? "bg-indigo-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Expense Click Detail */}
            {selectedExpense && (
              <div className="bg-white rounded-2xl p-5 shadow-lg border-l-4 border-indigo-500 relative">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-black"
                  onClick={() => setSelectedExpense(null)}
                >✕</button>
                <h3 className="font-bold text-lg text-indigo-700 mb-2">Expense Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <p><span className="font-medium">Amount:</span> ₹{selectedExpense.amount}</p>
                  <p><span className="font-medium">Date:</span> {new Date(selectedExpense.date).toLocaleDateString("en-IN")}</p>
                  <p><span className="font-medium">Category:</span> {CATEGORY_EMOJI[selectedExpense.type] || "🌀"} {selectedExpense.type}</p>
                  <p><span className="font-medium">Description:</span> {selectedExpense.description || "—"}</p>
                </div>
              </div>
            )}

            {/* Bar Chart - Daily Overview */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Daily Spending (click a bar for details)</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={expenses.slice(-30).map(e => ({
                    ...e,
                    date: new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
                    amount: Number(e.amount),
                  }))}
                  onClick={(e) => e?.activePayload && setSelectedExpense(e.activePayload[0]?.payload)}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} angle={-40} textAnchor="end" height={55} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(val) => `₹${val}`} />
                  <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Pie */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Category Breakdown</h2>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%" cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${CATEGORY_EMOJI[name] || "🌀"} ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `₹${val}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === "trends" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Monthly Spending Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(val) => `₹${val}`} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="url(#colorTotal)"
                    dot={{ r: 5, fill: "#6366f1" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Bar Comparison */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Month-by-Month Comparison</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(val) => `₹${val}`} />
                  <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                    {monthlyTrend.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === monthlyTrend.length - 1 ? "#f59e0b" : "#6366f1"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 text-center mt-2">🟡 = Current month</p>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Spending by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    width={100}
                    tickFormatter={(name) => `${CATEGORY_EMOJI[name] || "🌀"} ${name}`}
                  />
                  <Tooltip formatter={(val) => `₹${val}`} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Table */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Category Summary</h2>
              <div className="space-y-3">
                {categoryData.map((cat, index) => {
                  const pct = totalSpending > 0 ? ((cat.value / totalSpending) * 100).toFixed(1) : 0;
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>{CATEGORY_EMOJI[cat.name] || "🌀"} {cat.name}</span>
                        <span>₹{cat.value.toLocaleString()} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: COLORS[index % COLORS.length] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Top Expenses Tab */}
        {activeTab === "top expenses" && (
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <h2 className="font-bold text-lg mb-4 text-gray-800">🏆 Top 5 Highest Expenses</h2>
            <div className="space-y-3">
              {topExpenses.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-indigo-300 transition cursor-pointer"
                  onClick={() => setSelectedExpense(item)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {CATEGORY_EMOJI[item.type] || "🌀"} {item.type}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleDateString("en-IN")}
                        {item.description ? ` · ${item.description}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{Number(item.amount).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            {selectedExpense && (
              <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-gray-700">
                <strong>Description:</strong> {selectedExpense.description || "No description provided"}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Insights;