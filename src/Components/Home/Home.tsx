import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import image5 from "../../assets/images/pin/2.jpg";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import imageAbout from "../../assets/images/pin/hero2.webp";
import ProductListPage from "../Product/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryType } from "../Interfaces/Interfaces";

export default function HomePage() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  async function getCategory() {
    try {
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/category`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      console.log(data.categories);
      setCategory(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, easep: "easeOut" } },
  };

  useEffect(() => {
    if(localStorage.getItem("authorization")){
      getCategory();
    }
  }, []);

  return (
    <>
      <div className="light:bg-white dark:bg-black text-gray-800 dark:text-gray-100 font-sans">
        {/* Hero Section */}
        <div  
          className="bg-[url('/src/assets/images/pin/hero1.jpg')] dark:bg-transparent hero h-screen bg-cover bg-center text-white py-60 px-4 text-center dark:bg-blend-overlay"
          
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Unique Handmade Creations
          </h2>
          <p className="text-lg mb-6">
            Explore handcrafted items made with love.
          </p>
          <button
            onClick={() =>
              localStorage.getItem('id') ? navigate("/product") : navigate("/login")}
            className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 px-6 py-3 rounded-2xl font-medium text-white text-lg transition-colors duration-200"
          >
            Shop Now
          </button>
        </div>

        <div className="container mx-auto">
          <motion.div
            className="mt-5"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <MainSlider />
          </motion.div>

         
          <motion.div
            variants={fadeUpVariant}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ProductListPage />
          </motion.div>
        </div>


        <motion.section
          className="py-16 px-4 mb-4 light:bg-[#cfc0a2] category dark:bg-amber-50/50"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className=" font-bold light:text-gray-800 dark:text-gray-100 text-center mb-10">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {category.map((cat:CategoryType) => (
              <div key={cat._id} className="text-center">
                <div className="h-32 w-32 mx-auto hover:scale-110 transition-all duration-300 light:bg-gray-300 dark:bg-transparent dark:border dark:border-gray-500/30">
                  <img
                    src={cat.image.secure_url}
                    className="w-full h-full shadow-lg shadow-amber-500 object-cover rounded-full"
                    alt=""
                  />
                </div>
                <p className="text-lg light:text-gray-800 mt-2 dark:text-gray-100 font-medium">{cat.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="container mx-auto">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <CategorySlider />
          </motion.div>

          
          <motion.section
            id="about"
            className="py-16 px-4 flex flex-col md:flex-row items-center gap-8 light:bg-white dark:bg-black text-gray-800 dark:text-gray-100"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex-1 h-96 bg-gray-300 rounded dark:bg-gray-700/50 shadow-lg shadow-amber-500 dark:border-amber-500">
              <img
                src={imageAbout}
                className="w-full rounded-2xl h-full object-cover"
                alt=""
              />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl light:text-gray-800 dark:text-gray-100 font-bold mb-4">About Us</h3>
              <p className="text-lg light:text-gray-800 dark:text-gray-100">
                We believe in the beauty of handcrafted items. Our mission is to
                connect you with skilled artisans who put love into every piece
                they make.
              </p>
            </div>
          </motion.section>

          
          <motion.section
            id="testimonials"
            className="py-16 px-4   light:bg-white dark:bg-black text-gray-800 dark:text-gray-100"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-3xl light:text-gray-800 dark:text-gray-100 font-bold text-center mb-10">
              What Our Customers Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3,4,5,6].map((id) => (
                <div
                  key={id}
                  className="light:bg-[#fdf9f4] dark:bg-amber-50/50 p-6 rounded-lg shadow-lg border light:border-gray-100 dark:border-amber-500"
                >
                  <div className="w-16 h-16 light:bg-gray-300 dark:bg-gray-600/30 dark:border dark:border-gray-500/30">
                    <img
                      src={image5}
                      className="w-full h-full object-cover rounded-full"
                      alt=""
                    />
                  </div>
                  <p className="mb-2 light:text-gray-800 dark:text-gray-100 italic">
                    "Beautiful product and fast delivery! Highly recommend."
                  </p>
                  <p className="light:text-gray-800 dark:text-gray-100 font-bold">Customer Name</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>



      </div>
    </>
  );
}
