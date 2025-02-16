"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import "primeicons/primeicons.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition , isMicrophoneAvailable } from "react-speech-recognition";
import { Plus } from "lucide-react";

const AddExpense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ExpenseAmount, setExpenseAmount] = useState("");
  const [ExpenseDate, setExpenseDate] = useState("");
  const [ExpenseType, setExpenseType] = useState("grocery");
  const [ExpenseDescription, setExpenseDescription] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [Message, setMessage] = useState("")
  const [showAddExpenseBtn, setshowAddExpenseBtn] = useState(false)
  const userId = JSON.parse(localStorage.getItem("userInfo") || "{}").user_id;
  const token = JSON.parse(localStorage.getItem("accessToken") || '""');

  const toggleModal = () => setIsOpen(!isOpen);

  const commands = [
    {
      command: 'amount *',
      callback: (amt) => {
        setExpenseAmount(amt);
        setMessage(`Amount set to: ${amt}`);
      }
    },
    {
      command: 'description *',
      callback: (desc) => {
        setExpenseDescription(desc);
        setMessage(`Description set to: ${desc}`);
      }
    },
    {
      command: 'category *',
      callback: (cat) => {
        setExpenseType(cat);
        setMessage(`Category set to: ${cat}`);
      }
    },
    {
      command: '* for * *',
      callback: (amt, desc, cat) => {
        setExpenseAmount(amt);
        setExpenseDescription('for '+desc);
        setExpenseType(cat);
        setMessage(`Amount: ${amt}, Description: ${desc}, Category: ${cat}`);
      }
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => {
        resetTranscript();
        setExpenseAmount('');
        setExpenseDescription('');
        setExpenseType('');
        setMessage('Cleared all inputs.');
      }
    }
  ];
  const { transcript, resetTranscript ,browserSupportsSpeechRecognition } = useSpeechRecognition({commands});

  useEffect(() => {
    if (browserSupportsSpeechRecognition && isListening) {
      SpeechRecognition.startListening({ continuous: true, interimResults: true });

      // Mobile browsers stop listening quickly, restart it after 'onend'  
      SpeechRecognition.onend = () => {
        if (isListening) {
          SpeechRecognition.startListening({ continuous: true, interimResults: true });
        }
      };
    } else {
      SpeechRecognition.stopListening();
    }

  }, [isListening,browserSupportsSpeechRecognition]);

  const handleSpeech = async () => {
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

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  const handleSubmit = async () => {
    if (ExpenseAmount === "" || ExpenseDate === "") {
      alert("Please enter a date and value");
      return;
    }

    const formattedDate = format(ExpenseDate, "yyyy-MM-dd");

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
    });

    await response.json();
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="h-auto flex items-center justify-center fixed z-50">
      <button
        className="fixed border-2 left-8 bottom-10 text-white underline bg-none py-1 px-1 rounded-full lg:shadow-md hover:bg-green-500 transition duration-300"
        onClick={toggleModal}
        
      >
        {false ? `Add Expense` : <Plus size={19}/>}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center pb-20 justify-center z-50" onClick={toggleModal}>
          <div className="bg-white rounded-lg shadow-lg w-80 max-w-full p-5 relative" onClick={(e) => e.stopPropagation()}>
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
                          setExpenseDate(newDate);
                          setIsCalendarOpen(false);
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
                  <option value="grocery">🛒 Grocery</option>
                  <option value="utilities">💡 Utilities</option>
                  <option value="transportation">🚗 Transportation</option>
                  <option value="entertainment">🎉 Entertainment</option>
                  <option value="education">📚 Education</option>
                  <option value="healthcare">🏥 Healthcare</option>
                  <option value="others">🌀 Others</option>
                </optgroup>
              </select>

              <div className="flex gap-2">
                <button
                  className={` pi pi-microphone px-4 py-2 rounded-md transition ${
                    isListening ? "bg-red-500" : "bg-green-500"
                  } text-white`}
                  onClick={handleSpeech}
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition" onClick={handleSubmit}>
                  Add Expense
                </button>
              </div>
            </div>
          </div>

          {true && (
            <p className="fixed md:bottom-28 bottom-24 md:w-1/3 w-10/12 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-800 p-3 rounded-md shadow-md border border-blue-300">
              🎤 Try saying: br<strong>"Amount hundred"</strong>, <strong>"Description movie"</strong>, <br /><strong>"Category entertainment"</strong>, 
              or <strong>"Hundred for movie entertainment"</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddExpense;
