import React from "react";
import Navbar from "./navbar";

const Profile = () =>{
    return(
        <>
            <Navbar page = {{name:'home',route:''}}/>
            <p>hello welcome to profile</p>
            <button
      onClick={()=>{
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/signup')
      }}
      className="fixed bottom-5 left-5 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
      Logout
    </button>
        </>
    )
}

export default Profile;