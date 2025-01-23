import React , {useState} from 'react';
import Navbar from './navbar.jsx';
import Table from './table.jsx';
import '../assets/styles/main.css'
import { useNavigate } from 'react-router-dom';
import AddExpense from './addExpense.jsx';
import AnimatedCharacter from './character.jsx';
const Home = () => {
  const navigate = useNavigate();  
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState("");
const userData={
  spending:500,
  earning:10000
}
  const calculateMessage = () => {
    if (userData.spending > userData.earning) {
      setMessage("You're spending too much! Try to save more.");
    } else if (userData.spending > userData.earning / 2) {
      setMessage("You're doing okay, but watch your expenses.");
    } else {
      setMessage("Great job managing your expenses!");
    }
  };

  const handleChange = (value) => {
    setInputValue(value);
  };
  return (
    <>
      <Navbar page = {{name:'profile',route:'profile'}} onInputChange={handleChange}/>
      <AddExpense/>
      <Table value={inputValue}/>
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded"
        onClick={calculateMessage}
      >
        Analyze Expenses
      </button>
      <AnimatedCharacter message={message} />
    </>
  )
}

export default Home
