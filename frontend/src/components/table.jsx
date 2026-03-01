import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/assets/Functions/host.js";

const Table = ({ value }) => {
  const [Data, setData] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (!user?.user_id) return;

    const token = JSON.parse(localStorage.getItem("accessToken") || '""');

    try {
      const response = await fetch(`${BASE_URL}/v1/expense/get-all-expenses`, {
        method: "POST",
        body: JSON.stringify({ user_id: user.user_id }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const userExpenses = await response.json();
      if (!Array.isArray(userExpenses)) { setData([]); setSearchData([]); return; }

      // BUG FIX: Store raw ISO date strings - don't pre-format here, format in render only
      setData(userExpenses);
      setSearchData(userExpenses);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) getData();
  }, []);

  // Filter on search
  useEffect(() => {
    if (!value || value === "") {
      setSearchData(Data);
    } else {
      const filtered = Data.filter((item) =>
        Object.values(item).some((field) =>
          String(field).toLowerCase().includes(value.toLowerCase())
        )
      );
      setSearchData(filtered);
    }
  }, [value, Data]);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";

    const sorted = [...SearchData].sort((a, b) => {
      if (key === "date") {
        return direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (key === "amount") {
        return direction === "asc"
          ? Number(a.amount) - Number(b.amount)
          : Number(b.amount) - Number(a.amount);
      }
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSearchData(sorted);
    setSortConfig({ key, direction });
  };

  const SortIndicator = ({ colKey }) =>
    sortConfig.key === colKey
      ? <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
      : null;

  const openModal = (item) => { setCurrentItem(item); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setCurrentItem(null); };

  const handleDelete = async () => {
    if (!currentItem) return;
    const token = JSON.parse(localStorage.getItem("accessToken") || '""');
    try {
      await fetch(`${BASE_URL}/v1/expense/delete-expense`, {
        method: "DELETE",
        body: JSON.stringify({ id: currentItem.id }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      closeModal();
      // Remove from local state instead of full page reload
      setData((prev) => prev.filter((e) => e.id !== currentItem.id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // BUG FIX: Format date from raw ISO string in render (not double-formatted)
  const formatDate = (rawDate) => {
    const d = new Date(rawDate);
    if (isNaN(d)) return rawDate; // fallback
    return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "2-digit" });
  };

  return (
    <div className="flex justify-center items-center mt-1 p-4">
      <div className="w-full max-w-xl p-4 bg-child-bg-color rounded-lg shadow-md">
        <h2 className="text-lg text-heading-color font-semibold mb-4 text-center">
          Expenses
        </h2>

        {SearchData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-head-bg-color text-data-bg-color">
                  <th className="p-2 text-sm font-semibold cursor-pointer select-none"
                    onClick={() => sortData("amount")}>
                    Amount <SortIndicator colKey="amount" />
                  </th>
                  <th className="p-2 text-sm font-semibold cursor-pointer select-none"
                    onClick={() => sortData("type")}>
                    Type <SortIndicator colKey="type" />
                  </th>
                  <th className="p-2 text-sm font-semibold cursor-pointer select-none"
                    onClick={() => sortData("date")}>
                    Date <SortIndicator colKey="date" />
                  </th>
                  <th className="p-2 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {SearchData.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-t border-gray-300 cursor-pointer hover:bg-indigo-50 transition`}
                    onClick={() => openModal(item)}
                  >
                    <td className="p-2 text-sm font-medium">₹{item.amount}</td>
                    <td className="p-2 text-sm capitalize">{item.type}</td>
                    <td className="p-2 text-sm" style={{ minWidth: "110px" }}>
                      {formatDate(item.date)}  {/* BUG FIX: was using pre-formatted string with new Date() */}
                    </td>
                    <td className="p-2 text-sm max-w-xs truncate text-gray-600">
                      {item.description || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            {Data.length === 0 ? "No expenses yet. Add your first one! 💸" : "No results found."}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && currentItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          onClick={closeModal}>
          <div className="bg-white w-full max-w-sm mx-4 p-6 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4 text-indigo-700">Expense Details</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <p><span className="font-medium">Amount:</span> ₹{currentItem.amount}</p>
              <p><span className="font-medium">Type:</span> {currentItem.type}</p>
              <p><span className="font-medium">Date:</span> {formatDate(currentItem.date)}</p>
              <p><span className="font-medium">Description:</span> {currentItem.description || "—"}</p>
            </div>
            <div className="mt-5 flex justify-between gap-3">
              <button
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-medium"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;