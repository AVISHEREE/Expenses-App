import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Profile from './pages/profile.jsx';
import SignUp from './pages/signUp.jsx';
import LogIn from './pages/logIn.jsx';
import Insights from './pages/insights.jsx';
import AboutPage from './pages/A&P.jsx';
import PrivateComponent from './components/privateComponent.jsx';
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/a&p" element={<AboutPage />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  )
}

export default App
