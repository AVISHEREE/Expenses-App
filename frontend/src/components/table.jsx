import React, { useState, useEffect } from "react";
import moment from 'moment';
import {Data as ExpensesData} from '../assets/Functions/userDataAnylise.js'
import { lH } from "@/assets/Functions/host.js";
const Table = ({ value }) => {
  const [Data, setData] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [InputingText, setInputingText] = useState(false);
  const getData = async () => {
    const userExpenses = await ExpensesData;
    if (!userExpenses) {
      setData([]);
      setSearchData([]);
      return;
    }
    for (let i = 0; i < userExpenses.length; i++) {
      userExpenses[i].date = moment(userExpenses[i].date).format('DD MMMM, YYYY');
    }
    userExpenses
    setData(userExpenses);
    setSearchData(userExpenses);
  };
  useEffect(() => {
    const abc = getData();
    // console.log(abc);
    if (value === "") {
      setInputingText(false);
      setSearchData(Data); // Reset SearchData to original Data
    } else {
      setInputingText(true);
      const filteredData = Data.filter((item) =>
        Object.values(item).some((field) =>
          field.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setSearchData(filteredData);
    }
  }, [value, Data]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...SearchData].sort((a, b) => {
      if (key === "date") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSearchData(sortedData);
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

  const handleDelete = async () => {
    const expenseId = currentItem.id;
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const response = await fetch(
      `http://${lH}/v1/expense/delete-expense`,
      {
        method: "DELETE",
        body: JSON.stringify({ id: expenseId }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();
    console.log("Expense deleted");
    closeModal();
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center mt-1 p-4">
      <div className="w-full max-w-xl p-4 bg-child-bg-color rounded-lg shadow-md">
        <h2 className="text-lg text-heading-color font-semibold mb-4 text-center">
          Expenses and Income
        </h2>

        {SearchData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300">
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
                {SearchData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } border-t border-gray-300 cursor-pointer`}
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
          <div className="text-center text-gray-500">No expenses found.</div>
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
              <strong>Description:</strong> {currentItem.description}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={handleDelete}
              >
                Delete Expense
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
