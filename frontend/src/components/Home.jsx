import React, { useEffect, useState } from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";


function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 ">
      <div className="h-[1250px] md:h-[1050px] text-white container mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-6 ">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-7 h-7 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl text-black font-bold">
              CourseStore
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-black text-xs md:text-lg md:py-2 md:px-4 p-2 border border-gray-600 rounded  hover:bg-blue-900 hover:text-white duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-black text-xs md:text-lg md:py-2 md:px-4 p-2 border border-gray-600 rounded hover:text-white hover:bg-blue-900 duration-300"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-blue-600 text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-gray-600 rounded  hover:bg-blue-900 duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Main section */}
        <section className="text-center py-20">
          <h1 className="text-4xl font-semibold text-black">
            CourseStore
          </h1>

          <br />
          <p className="text-gray-600">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="space-x-4 mt-8">
            <Link
              to={"/courses"}
              className="bg-blue-600 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore courses
            </Link>
            <Link
              to={"https://www.youtube.com/@mitocw"}
              className="bg-white text-black  p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-blue-900 duration-300 hover:text-white"
            >
              Courses videos
            </Link>
          </div>
        </section>
        
        <section className="p-10">
          <Slider className="" {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                  <div className="bg-gray-600 p-5 m-5 rounded-lg overflow-hidden">
                    <img
                      className="h-32 w-full object-contain"
                      src={course.image.url}
                      alt=""
                    />
                    <div className="p-4 text-center">
                      <h2 className="text-xl pb-4 font-bold text-white">
                        {course.title}
                      </h2>
                      <Link to={`/buy/${course._id}`} className="mt-8  bg-blue-600 text-white py-1 px-4 rounded-full hover:bg-blue-900 duration-300">
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <hr className="border-gray-600" />
        {/* Footer */}
        <footer className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-black font-bold">
                  CourseStore
                </h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2 text-black">Follow us</p>
                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook className="text-2xl text-black hover:text-blue-600 duration-300" />
                  </a>
                  <a href="">
                    <FaInstagram className="text-2xl text-black hover:text-pink-600 duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="text-2xl text-black hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg text-black font-semibold md:mb-4">connects</h3>
              <ul className=" space-y-2 text-gray-700">
                <li className="hover:text-black cursor-pointer duration-300">
                  email-coursestore@gmail.com
                </li>
                <li className="hover:text-black cursor-pointer duration-300">
                  phone-8431031711
                </li>
                <li className="hover:text-black cursor-pointer duration-300">
                  Github-Manju766
                </li>
              </ul>
            </div>
            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg text-black  font-semibold mb-4">
                copyrights &#169; 2025
              </h3>
              <ul className=" space-y-2 text-center text-gray-700">
                <li className="hover:text-black cursor-pointer duration-300">
                  Terms & Conditions
                </li>
                <li className="hover:text-black  cursor-pointer duration-300">
                  Privacy Policy
                </li>
                <li className="hover:text-black  cursor-pointer duration-300">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
