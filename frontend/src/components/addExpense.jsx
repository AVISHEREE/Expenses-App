"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

const AddExpense = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [ExpenseAmount, setExpenseAmount] = useState("")
  const [ExpenseDate, setExpenseDate] = useState("")
  const [ExpenseType, setExpenseType] = useState("grocery")
  const [ExpenseDescription, setExpenseDescription] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}").user_id
  const token = JSON.parse(localStorage.getItem("accessToken") || '""')

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen)

  const handleSubmit = async () => {
    if (ExpenseAmount === "" || ExpenseDate === "") {
      alert("Please enter date and value")
    } else {
      const formattedDate = format(ExpenseDate, "yyyy-MM-dd")
      console.log(formattedDate)

      const response = await fetch("http://192.168.0.108:8080/v1/expense/add-expense", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          amount: ExpenseAmount,
          date: formattedDate,
          type: ExpenseType,
          description: ExpenseDescription,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      await response.json()
      setIsOpen(false);
      window.location.reload();
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-none z-50 fixed">
      <button
        className="fixed max-sm:top-6 border-2 right-16 lg:right-4 lg:bottom-4 lg:bg-primary-bg-color text-new-text-color underline bg-none py-1 px-1.5 rounded-lg lg:shadow-md hover:bg-green-500 transition duration-300"
        onClick={toggleModal}
      >
        Add Expense
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-80 max-w-full p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={toggleModal}>
              ❌
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">Add Your Expense</h2>
            <div className="space-y-4">
              <input
                type="number"
                name="amount"
                value={ExpenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Expense amount..."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              <div className="relative">
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!ExpenseDate && "text-muted-foreground"}`}
                  onClick={toggleCalendar}
                >
                  {ExpenseDate !== "" ? format(ExpenseDate, "yyyy-MM-dd") : <span>Select a date for your expense</span>}
                </Button>
                {isCalendarOpen && (
                  <div className="absolute z-10 mt-2">
                    <Calendar
                      mode="single"
                      selected={ExpenseDate}
                      onSelect={(newDate) => {
                        if (newDate) {
                          setExpenseDate(newDate)
                          setIsCalendarOpen(false)
                        }
                      }}
                      className="rounded-md border bg-background shadow"
                    />
                  </div>
                )}
              </div>

              <input
                type="text"
                name="description"
                placeholder="Expense description..."
                value={ExpenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              <select
                name="type"
                value={ExpenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white shadow-md hover:bg-gray-50 transition"
              >
                <optgroup label="Expense Type" className="font-bold text-gray-700">
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

              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                onClick={handleSubmit}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddExpense

