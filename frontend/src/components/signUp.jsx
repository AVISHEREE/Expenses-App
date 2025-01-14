import React from "react";
import Navbar from "./navbar";

const LogIn = () => {
  return (
    <>
      <Navbar page = {{name:'already have Account',route:'login'}}/>
      <div className="flex justify-center items-center w-full mt-24 p-4 cursor-custom-pointer">
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg border border-gray-300 bg-gray-50">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            SignUp to Continue
          </h1>
          <form className="grid gap-5">
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200"
            >
              Log In
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LogIn;

