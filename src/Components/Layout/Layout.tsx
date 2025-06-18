import  { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import {
  FaFacebook,
  FaFingerprint,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if(!localStorage.getItem('authorization')){
      setShowAlert(true);
    }else{
      setShowAlert(false);
    }
  }, [localStorage.getItem('authorization')]);
  return (
    <>
      <Navbar />
      <div className="p-2 text-white hover:scale-110 transition-all duration-300  flex gap-3 flex-col bg-black fixed top-1/4 z-50 right-0 rounded-lg ">
        <FaTiktok />
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <FaLinkedin />
        <FaYoutube />
      </div>
      {showAlert ? (
        <div className="p-5 text-center shadow-lg opacity-1 alert-login fixed  right-0  min-w-1/2 md:min-w-1/4 bg-white space-y-2 rounded-2xl w-1/4  top-1/4 left-64 z-50 transform -translate-x-1/2 -translate-y-1/2 " >
          <p className="text-lg font-bold flex items-center gap-2 justify-center " >You are not logged in  <FaFingerprint className="text-amber-500 text-3xl" />
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 px-6 py-3 rounded-2xl font-medium text-white text-lg transition-colors duration-200" onClick={() => navigate("/login")}>Login</button>
        </div>
      ) : null}
      {/* <div className="home h-screen "></div> */}
      <div className=" mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
