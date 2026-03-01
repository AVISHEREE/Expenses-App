"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import "primeicons/primeicons.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Plus } from "lucide-react";
import { BASE_URL } from "@/assets/Functions/host.js";

const AddExpense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ExpenseAmount, setExpenseAmount] = useState("");
  const [ExpenseDate, setExpenseDate] = useState("");
  const [ExpenseType, setExpenseType] = useState("grocery");
  const [ExpenseDescription, setExpenseDescription] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [Message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}").user_id;
  const token = JSON.parse(localStorage.getItem("accessToken") || '""');

  const toggleModal = () => {
    setIsOpen(!isOpen);
    // Reset state on close
    if (isOpen) {
      setExpenseAmount("");
      setExpenseDate("");
      setExpenseType("grocery");
      setExpenseDescription("");
      setMessage("");
    }
  };

  const commands = [
    {
      command: "amount *",
      callback: (amt) => { setExpenseAmount(amt); setMessage(`Amount set: ${amt}`); },
    },
    {
      command: "description *",
      callback: (desc) => { setExpenseDescription(desc); setMessage(`Description: ${desc}`); },
    },
    {
      command: "category *",
      callback: (cat) => { setExpenseType(cat); setMessage(`Category: ${cat}`); },
    },
    {
      command: "* for * *",
      callback: (amt, desc, cat) => {
        setExpenseAmount(amt);
        setExpenseDescription("for " + desc);
        setExpenseType(cat);
        setMessage(`Amount: ${amt}, Desc: ${desc}, Cat: ${cat}`);
      },
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => {
        resetTranscript();
        setExpenseAmount("");
        setExpenseDescription("");
        setExpenseType("grocery");
        setMessage("Cleared all inputs.");
      },
    },
  ];

  const { resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (browserSupportsSpeechRecognition && isListening) {
      SpeechRecognition.startListening({ continuous: true, interimResults: true });
    } else {
      SpeechRecognition.stopListening();
    }
    return () => SpeechRecognition.stopListening();
  }, [isListening, browserSupportsSpeechRecognition]);

  const handleSpeech = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!ExpenseAmount || !ExpenseDate) {
      alert("Please enter both an amount and a date.");
      return;
    }

    setLoading(true);
    try {
      const formattedDate = format(ExpenseDate, "yyyy-MM-dd");
      const response = await fetch(`${BASE_URL}/v1/expense/add-expense`, {
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
      });

      if (!response.ok) throw new Error("Failed to add expense");
      setIsOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto flex items-center justify-center fixed z-50">
      {/* Floating Add Button */}
      <button
        className="fixed left-8 bottom-10 text-white bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full shadow-lg transition duration-300 flex items-center gap-2"
        onClick={toggleModal}
        aria-label="Add Expense"
      >
        <Plus size={20} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center pb-20 justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-80 max-w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
              onClick={toggleModal}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-5 text-center text-indigo-600">Add New Expense</h2>

            <div className="space-y-4">
              <input
                type="number"
                value={ExpenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Amount (₹)..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {/* Date Picker */}
              <div className="relative">
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal rounded-xl ${!ExpenseDate && "text-muted-foreground"}`}
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                >
                  {ExpenseDate ? format(ExpenseDate, "yyyy-MM-dd") : "Select date..."}
                </Button>
                {isCalendarOpen && (
                  <div className="absolute z-20 mt-1">
                    <Calendar
                      mode="single"
                      selected={ExpenseDate}
                      onSelect={(newDate) => {
                        if (newDate) { setExpenseDate(newDate); setIsCalendarOpen(false); }
                      }}
                      className="rounded-xl border bg-white shadow-xl"
                    />
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Description (optional)..."
                value={ExpenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <select
                value={ExpenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              >
                <option value="grocery">🛒 Grocery</option>
                <option value="utilities">💡 Utilities</option>
                <option value="transportation">🚗 Transportation</option>
                <option value="entertainment">🎉 Entertainment</option>
                <option value="education">📚 Education</option>
                <option value="healthcare">🏥 Healthcare</option>
                <option value="others">🌀 Others</option>
              </select>

              {Message && (
                <p className="text-xs text-indigo-600 bg-indigo-50 rounded-lg p-2">{Message}</p>
              )}

              <div className="flex gap-2">
                {browserSupportsSpeechRecognition && (
                  <button
                    className={`pi pi-microphone px-4 py-3 rounded-xl transition text-white font-medium ${
                      isListening ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={handleSpeech}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  />
                )}
                <button
                  className="flex-1 bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition font-semibold disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Expense"}
                </button>
              </div>
            </div>
          </div>

          {/* Voice tip */}
          {browserSupportsSpeechRecognition && (
            <p className="fixed md:bottom-28 bottom-24 md:w-1/3 w-10/12 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-800 p-3 rounded-xl shadow-md border border-blue-300 text-sm">
              🎤 Try: <strong>"Amount hundred"</strong>, <strong>"Description coffee"</strong>,{" "}
              <strong>"Category entertainment"</strong>, or{" "}
              <strong>"Hundred for coffee entertainment"</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddExpense;