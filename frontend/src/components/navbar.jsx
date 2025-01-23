import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "./table";
const Navbar = (props) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [TextInputState, setTextInputState] = useState("disabled");
  const [TextInput, setTextInput] = useState("");
  const handleInputChange = (e) => {
    props.onInputChange(e.target.value);
  };

  useEffect(() => {
    const auth = localStorage.getItem('userInfo');
    if(auth){
      setTextInputState("");
    }
  }, [])
  
  return (
    <nav className="bg-child-bg-color max-[600px]:flex max-[600px]:items-start max-[600px]:p-3 max-[600px]:py-3   text-heading-color flex flex-col px-10 md:flex-row items-center justify-between mx-4 md:mx-20 mt-4 rounded-md py-4 drop-shadow-2xl font-chakra-petch">
      {/* Left Section */}
      <div className="hidden items-center space-x-4 md:flex">
        {/* Insights Button */}
        
          <button className="flex items-center hover:text-gray-300 transition">
          <span className="ml-2">Insights</span>
        </button>

        {/* Center Line */}
        <div className="hidden md:block w-px h-6 bg-gray-400"></div>

        {/* Add Expense Button */}
        <button className="hover:text-gray-300 transition">something else</button>
      </div>

      {/* Center Section */}
      <div className="text-center max-[600px]:mb-0 font-bold text-lg md:text-2xl tracking-wide mb-4 md:mb-0"
      onClick={()=>window.location.reload()}>
        Expense Assist App
      </div>

      {/* Right Section */}
      <div className="flex flex-col max-[640px]:hidden md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search expenses"
          disabled={TextInputState}
          onChange={handleInputChange}
          className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded w-full md:w-auto focus:outline-none focus:ring focus:ring-yellow-500"
        />
        <div className="hidden md:block w-px h-6 bg-gray-400"></div>
        {/* Contact Button */}
        <Link className="hover:text-gray-300 transition" to={`/${props.page.route}`}>{props.page.name}</Link>
      </div>
      <button
          className="text-white focus:outline-none md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg

            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 absolute top-3.5 right-3 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M3 12h18m-6 6h6"
            />
          </svg>
        </button>
        {isMenuOpen && (
  <div className="flex flex-col items-center mt-2 space-y-4 md:hidden max-[640px]:mx-20 sm:flex sm:space-y-2">
    <button className="hover:text-gray-300 transition">Insights</button>
    <button className="hover:text-gray-300 transition">Something Else</button>
    <button>
      <Link className="hover:text-gray-300 transition" to={`/${props.page.route}`}>
        {props.page.name}
      </Link>
    </button>
    <input
      type="text"
      placeholder="Search expenses"
      disabled={TextInputState}
      onChange={handleInputChange}
      className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-yellow-500 w-full sm:w-auto"
      />
  </div>
)}
    </nav>
  );
};

export default Navbar;
