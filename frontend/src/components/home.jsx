import React from 'react';
import Navbar from './navbar.jsx';
import Table from './table.jsx';
import '../assets/styles/main.css'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();  
  return (
    <>
    <button
      onClick={()=>{
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/</>')
      }}
      className="fixed bottom-5 left-5 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
      Logout
    </button>
      <Navbar page = {{name:'profile',route:'profile'}}/>
      <Table/>
    </>
  )
}

export default Home
