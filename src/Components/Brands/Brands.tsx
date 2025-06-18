import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ إضافة Framer Motion

interface Brand {
  _id: string;
  name: string;
  description?: string;
  image?: { secure_url: string };
}

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  async function BrandDetails(id:string) {
    navigate(`/brandDetails/${id}`);
  }

  useEffect(() => { 
    if(localStorage.getItem("authorization")){
    
    axios
      .get("https://project1-kohl-iota.vercel.app/brand", {
        headers: { Authorization: localStorage.getItem("authorization") || "" },
      })
      .then((res) => setBrands(res.data.brands))
      .catch(() => setBrands([]))
      .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-amber-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
    </div>
    );
  }

  return (
    <div className=" light:bg-white dark:bg-black  w-full dark:bg-dark-body   min-h-screen py-32   md:px-10">
      <div className="container mx-auto">
        <h1 className="text-3xl  md:text-4xl font-bold text-center mb-10 light:text-gray-800 dark:text-amber-400">Brands</h1>
    
      
      
      {isLoading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="light:bg-gray-300 dark:bg-gray-800 animate-pulse p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4 w-80 h-44 light:bg-gray-400 dark:bg-gray-700 rounded"></div>
              <div className="h-6 light:bg-gray-400 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-10 light:bg-gray-400 dark:bg-gray-700 rounded w-24"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {brands.map((brand, index) => (
            <motion.div
              key={brand._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="light:bg-gray-100 dark:bg-amber-50 p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500 dark:hover:shadow-amber-500 shadow-amber-400 dark:shadow-amber-900 shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {brand.image?.secure_url ? (
                  <img
                    src={brand.image.secure_url}
                    alt={brand.name}
                    className="w-80 h-44 object-cover border-2 border-amber-400 dark:border-amber-600 mx-auto"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center light:bg-gray-100 dark:bg-gray-800 rounded-full text-4xl">
                    🏷️
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2 light:text-gray-800 dark:text-black">{brand.name}</h2>
              <button
                onClick={() => 
                  BrandDetails(brand._id)}
                className="bg-[#a9690a] dark:bg-amber-700 text-amber-50 dark:text-amber-100 border font-medium px-4 py-2 rounded-lg hover:bg-amber-700 hover:text-white dark:hover:bg-amber-900 dark:hover:text-amber-300 transition"
              >
                Visit Brand
              </button>
            </motion.div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Brands;
