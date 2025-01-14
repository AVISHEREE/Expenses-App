import React from 'react';
import Navbar from './navbar.jsx';
import Table from './table.jsx';
import '../assets/styles/main.css'
const Home = () => {
  return (
    <>
      <Navbar page = {{name:'profile',route:'profile'}}/>
      <Table/>
    </>
  )
}

export default Home
