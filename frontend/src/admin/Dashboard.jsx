import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
function Dashboard() {
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("admin");
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-5">
        <div className="flex items-center flex-col mb-10">
          <img src={logo} alt="Profile" className="rounded-full h-20 w-20" />
          <h2 className="text-lg font-semibold mt-4">Admin</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/our-courses">
            <button className="w-full bg-blue-600 hover:bg-blue-900 text-white py-2 rounded duration-300">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/create-course">
            <button className="w-full bg-white hover:bg-blue-900 text-black py-2 rounded hover:text-white duration-300">
              Create Course
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-white hover:bg-blue-900 text-black py-2 rounded hover:text-white duration-300">
              Home
            </button>
          </Link>
          <Link to="/admin/login">
            <button
              onClick={handleLogout}
              className="w-full  bg-white hover:bg-blue-900 text-black py-2 rounded hover:text-white duration-300"
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>
      <div className="flex h-screen items-center justify-center ml-[40%]">
        Welcome!!!
      </div>
    </div>
  );
}

export default Dashboard;
