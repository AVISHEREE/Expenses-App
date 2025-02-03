import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import Profile from './components/profile.jsx';
import SignUp from './components/signUp.jsx';
import LogIn from './components/logIn.jsx';
import Insights from './components/insights.jsx';
import PrivateComponent from './components/privateComponent.jsx';
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/insights" element={<Insights />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  )
}

export default App
