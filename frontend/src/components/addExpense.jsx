import React, {  useState } from "react";

const AddExpense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ExpenseAmount, setExpenseAmount] = useState("");
  const [ExpenseDate, setExpenseDate] = useState("");
  const [ExpenseType, setExpenseType] = useState("grocery");
  const [ExpenseDescription, setExpenseDescription] = useState("");

  const userId = JSON.parse(localStorage.getItem("userInfo")).user_id;
  const token = JSON.parse(localStorage.getItem("accessToken"));

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () =>{
    if(ExpenseAmount == "" || ExpenseDate == ""){
        alert("please enter date and value");
    }
    else{
    const response = await fetch("http://192.168.0.106:8080/v1/expense/add-expense",{
        method:"POST",
        body: JSON.stringify({user_id:userId,amount:ExpenseAmount,date:ExpenseDate,type:ExpenseType,description:ExpenseDescription}),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
    })
    const data = await response.json();
    setIsOpen(false)
    window.location.reload();
}
  }
  return (
    <div className="h-screen flex items-center justify-center bg-none z-50 fixed">
      
      {/* Button to open modal */}
      <button
        className="fixed max-sm:top-6 border-2 right-16 lg:right-4 lg:bottom-4 lg:bg-primary-bg-color text-new-text-color underline bg-none py-1 px-1.5 rounded-lg  lg:shadow-md hover:bg-green-500 transition duration-300"
        onClick={toggleModal}
      >
        
        Add Expense
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-80 max-w-full p-5 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
          >
            {/* Cross button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={toggleModal}
            >
              ❌
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">
              Add Your Expense
            </h2>
            <div className="space-y-4">
              {/* Expense Amount */}
              <input
                type="number"
                name="amount"
                value={ExpenseAmount}
                onChange={(e)=>{
                    setExpenseAmount(e.target.value)
                }}
                placeholder="Expense amount..."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              {/* Expense Date */}
              <input
                type="date"
                name="date"
                value={ExpenseDate}
                onChange={(e)=>{
                    setExpenseDate(e.target.value)
                }}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              {/* Expense Description */}
              <input
                type="text"
                name="description"
                placeholder="Expense description..."
                value={ExpenseDescription}
                onChange={(e)=>{
                    setExpenseDescription(e.target.value)
                }}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              {/* Expense Type */}
              <select
                name="type"
                value={ExpenseType}
                onChange={(e)=>{
                    setExpenseType(e.target.value)
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white shadow-md hover:bg-gray-50 transition"
              >
                <optgroup
                  label="Expense Type"
                  className="font-bold text-gray-700"
                >
                  <option value="grocery" className="text-gray-600">
                    🛒 Grocery
                  </option>
                  <option value="utilities" className="text-gray-600">
                    💡 Utilities
                  </option>
                  <option value="transportation" className="text-gray-600">
                    🚗 Transportation
                  </option>
                  <option value="entertainment" className="text-gray-600">
                    🎉 Entertainment
                  </option>
                  <option value="education" className="text-gray-600">
                    📚 Education
                  </option>
                  <option value="healthcare" className="text-gray-600">
                    🏥 Healthcare
                  </option>
                  <option value="others" className="text-gray-600">
                    🌀 Others
                  </option>
                </optgroup>
              </select>
              {/* Submit Button */}
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={handleSubmit}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExpense;
