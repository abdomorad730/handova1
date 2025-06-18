
import { useEffect, useState } from "react";
import axios from "axios";
import type { CategoryType } from "../Interfaces/Interfaces";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ استيراد Framer Motion

export default function Category() {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getCategory() {
    try {
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/category`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      console.log(data.categories);
      setCategory(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="py-32 bg-[url('../assets/images/pin/slider4 (4).jpeg')] hero bg-cover bg-center bg-slate-900 text-white text-center dark:bg-black">
        <h1 className="font-bold dark:text-amber-500">Cadiz Collection</h1>
        <p className="mt-2 text-lg dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        
      </div>

      {/* Categories Section */}
      <div className="pt-10 light:bg-yellow-500 p-10  dark:bg-black">
       <div className="container mx-auto">
        <h1 className="text-center font-bold mb-6 dark:text-amber-500">
          Browse Categories
        </h1>
       </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="max-w-sm bg-gray-300 animate-pulse rounded-lg shadow-sm dark:bg-gray-800"
                >
                  <div className="h-48 bg-gray-400 rounded-t-lg dark:bg-gray-700"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-400 rounded mb-4 dark:bg-gray-700"></div>
                    <div className="h-10 bg-gray-400 rounded dark:bg-gray-700"></div>
                  </div>
                </div>
              ))
            : category.map((c: CategoryType, index) => (
                <motion.div
                  key={c._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="max-w-sm cardCategory border-4 border-gray-200 bg-white hover:scale-105 duration-150 text-gray-800 rounded-lg shadow-sm dark:bg-gray-800 dark:border-amber-500 dark:text-white"
                >
                  <a href="#">
                    <img
                      src={c.image.secure_url}
                      className="rounded-t-lg w-full max-h-[200px] object-cover"
                      alt={c.name}
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-gray-800 text-2xl font-bold tracking-tight dark:text-amber-500">
                        {c.name.toUpperCase()}
                      </h5>
                    </a>
                    <Link
                      to={`/Subcategory/${c._id}`}
                      className="inline-flex btn items-center w-full text-center px-3 py-2 text-sm font-medium mx-auto text-white bg-amber-800 rounded-lg hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-700 dark:hover:bg-amber-600 dark:focus:ring-amber-800"
                    >
                      Browse
                    </Link>
                  </div>
                </motion.div>
              ))}
        </div>
        
      </div>
    </>
  );
}
