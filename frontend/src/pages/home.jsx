import React , {useState , useEffect} from 'react';
import Navbar from '../components/navbar.jsx';
import Table from '../components/table.jsx';
import '../assets/styles/main.css'
import AddExpense from '../components/addExpense.jsx';
import AnimatedCharacter from '../components/character.jsx';
import { totalSpending , totalSpendingInOneMonth} from '../assets/Functions/userDataAnylise.js';
const Home = () => { 
  const [inputValue, setInputValue] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [characterMessage, setCharacterMessage] = useState("");
  const [variant, setVariant] = useState("default");
  const [showCharacter, setShowCharacter] = useState(true);
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}")?.name || "Friend";
  const userMessages = [
    { text: `Hi ${user}! Let's manage expenses`, type: "default" },
    { text:"Tap on expense to see full info", type: "default" },
    { text: `Total Spending: ${totalSpending}`, type: totalSpending > 3000 ? "warning" : "success" },
    { text: `Total Expense In This Month: ${totalSpendingInOneMonth}`, type: totalSpendingInOneMonth > 500 ? "alert" : "default" },
    { text:totalSpendingInOneMonth > 2000 ? "You're spending too much" : "You're doing great this month" , type: totalSpendingInOneMonth > 1000 ? "warning" : "success" },
  ];
  // TODO : Create a function for loop 
  useEffect(() => {
    const toggleCharacter = () => {
      setShowCharacter((prev) => !prev);
    };

    const interval = setInterval(toggleCharacter, 10000000000);

    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * userMessages.length);
      setMessageIndex(randomNum);
    }, 8000); 

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    
  })
  
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
