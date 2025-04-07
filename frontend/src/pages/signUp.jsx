import React , {useState} from "react";
import Navbar from "../components/navbar.jsx";
// import { Link, useNavigate } from 'react-router-dom';
import { Link , useNavigate } from "react-router-dom";
import { lH } from "@/assets/Functions/host.js";

const SignUp = () => {
const navigate = useNavigate();
const [Email, setEmail] = useState("");
const [Password, setPassword] = useState("");
const [Name, setName] = useState("");
// const [UserDetails, setUserDetails] = useState([]);
// const [AuthTokens, setAuthTokens] = useState([])
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://${lH}/v1/user/signup`, {
      method: "POST",
      body: JSON.stringify({ email:Email, password:Password , name : Name}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    localStorage.setItem("userInfo",JSON.stringify(data.userDetails));
    localStorage.setItem("accessToken",JSON.stringify(data.accessToken));
    localStorage.setItem("refreshToken",JSON.stringify(data.refreshToken));
    console.log("user logedin");
    navigate('/');
  } catch (err) {
    console.log("Error in sending req, ", err);
  }
};

const DirectLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://${lH}/v1/user/signin`, {
      method: "POST",
      body: JSON.stringify({ email:"test@abc.com", password:"av@123"}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    localStorage.setItem("userInfo",JSON.stringify(data.userDetails));
    localStorage.setItem("accessToken",JSON.stringify(data.accessToken));
    localStorage.setItem("refreshToken",JSON.stringify(data.refreshToken));
    console.log("user logedin");
    navigate('/');
  } catch (err) {
    console.log("Error in sending req, ", err);
  }
};
  return (
    <>
      <Navbar page = {{name:'already have Account',route:'login'}}/>
      <div className="flex justify-center items-center w-full mt-24 p-4 cursor-custom-pointer">
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg border border-gray-300 bg-gray-50">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            SignUp to Continue
          </h1>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              placeholder="Enter your Name"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            have an account?{" "}
            {/* <Link
              to={'/login'}
              className="text-blue-500 hover:underline font-medium"
            >
              Login
            </Link> */}
            <a href="/login" className="text-blue-500 hover:underline font-medium">Login</a>
          </p>
          <p className="text-center text-sm text-gray-600 mt-4">
            <button className="text-red-500 underline font-medium" 
            onClick={DirectLogin}
              >
              go with demo account
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;

