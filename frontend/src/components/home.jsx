import React , {useState , useEffect} from 'react';
import Navbar from './navbar.jsx';
import Table from './table.jsx';
import '../assets/styles/main.css'
import { useNavigate } from 'react-router-dom';
import AddExpense from './addExpense.jsx';
import AnimatedCharacter from './character.jsx';
import { totalSpending , totalSpendingInOneMonth} from './userDataAnylise.js';
const Home = () => {
  const navigate = useNavigate();  
  const [inputValue, setInputValue] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [characterMessage, setCharacterMessage] = useState("");
  const [variant, setVariant] = useState("default");
  const [showCharacter, setShowCharacter] = useState(true);
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}")?.name || "Friend";
  const userMessages = [
    // { text: `Total Expense Amount: ${Data}`, type: "default" },
    { text: `Hi ${user}! Let's manage expenses`, type: "default" },
    { text:"Tap for quick actions", type: "default" },
    { text: `Total Spending: ${totalSpending}`, type: totalSpending > 1000 ? "warning" : "success" },
    { text: `Total Expense In One Month: ${totalSpendingInOneMonth}`, type: totalSpendingInOneMonth > 500 ? "alert" : "default" },
    { text:totalSpendingInOneMonth > 1000 ? "You're spending too much" : "You're doing great this month" , type: totalSpendingInOneMonth > 1000 ? "warning" : "success" },
  ];
  // TODO : Create a function for loop 
  useEffect(() => {
    const toggleCharacter = () => {
      setShowCharacter((prev) => !prev);
    };

    // Show the character for 15s, then hide for 15s, repeat
    const interval = setInterval(toggleCharacter, 30000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % userMessages.length);
    }, 8000); // Change message every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    setCharacterMessage(userMessages[messageIndex].text);
    setVariant(userMessages[messageIndex].type);
  }, [messageIndex]);
  
  const handleChange = (value) => {
    setInputValue(value);
  };
  return (
    <>
      <Navbar page = {{name:'profile',route:'profile'}} onInputChange={handleChange}/>
      <AddExpense/>
      <Table value={inputValue}/>
      {showCharacter && (
        <div className="animate-fade-in">
          <AnimatedCharacter message={characterMessage} variant={variant} />
        </div>
      )}
    </>
  )
}

export default Home
