import React, { useState, useEffect } from "react";
import axios from "axios";
const Table = () => {
  const [Data, setData] = useState([]);
  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const userId = user.user_id;
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const response = await fetch(
      "http://192.168.0.110:8080/v1/expense/get-all-expenses",
      {
        method: "POST",
        body: JSON.stringify({ user_id: userId }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const userExpenses = await response.json();
    setData(userExpenses);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      getData();
    } 
  }, []);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...Data].sort((a, b) => {
      if (key === "date") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const openModal = (item) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentItem(null);
  };

  const handleDelete = () => {
    setData(Data.filter((item) => item !== currentItem));
    closeModal();
  };

  return (
    <div className="flex justify-center items-center mt-1 p-4">
      <div className="w-full max-w-xl p-4 bg-child-bg-color rounded-lg shadow-md">
        <h2 className="text-lg text-heading-color font-semibold mb-4 text-center">
          Expenses and Income
        </h2>

        {Data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300 ">
              <thead>
                <tr className="bg-head-bg-color text-data-bg-color">
                  <th
                    className="p-2 text-sm font-semibold cursor-pointer"
                    onClick={() => sortData("amount")}
                  >
                    Amount
                    {sortConfig.key === "amount" && (
                      <span>
                        {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                      </span>
                    )}
                  </th>
                  <th
                    className="p-2 text-sm font-semibold cursor-pointer"
                    onClick={() => sortData("type")}
                  >
                    Type
                    {sortConfig.key === "type" && (
                      <span>
                        {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                      </span>
                    )}
                  </th>
                  <th
                    className="p-2 text-sm font-semibold cursor-pointer"
                    onClick={() => sortData("date")}
                  >
                    Date
                    {sortConfig.key === "date" && (
                      <span>
                        {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                      </span>
                    )}
                  </th>
                  <th className="p-2 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } border-t border-gray-300 cursor-pointer `}
                    onClick={() => openModal(item)}
                  >
                    <td className="p-2 text-sm">{item.amount}</td>
                    <td className="p-2 text-sm">{item.type}</td>
                    <td className="p-2 text-sm" style={{ minWidth: "120px" }}>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="p-2 text-sm overflow-hidden max-w-xs truncate">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">No expenses added.</div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && currentItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Expense Details</h3>
            <p>
              <strong>Amount:</strong> {currentItem.amount}
            </p>
            <p>
              <strong>Type:</strong> {currentItem.type}
            </p>
            <p>
              <strong>Date:</strong> {currentItem.date}
            </p>
            <p>
              <strong>Description:</strong>
              {currentItem.description}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded"
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
