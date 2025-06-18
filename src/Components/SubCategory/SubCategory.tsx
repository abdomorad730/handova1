import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function SubCategory() {
  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  async function getSubCategory(id: string) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/sub-category/${id}`,
        {
          headers: { Authorization: localStorage.getItem("authorization") },
        }
      );
      console.log(data.subCategories);
      setSubCategory(data.subCategories);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getSubCategory(id);
    }
  }, [id]);
  if (isLoading) {
    return (
      <div className="h-screen light:bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="py-10 dark:bg-gray-900">
      <ToastContainer />
      <h1 className="mt-28 dark:text-amber-500 md:text-4xl font-bold text-center mb-10">
        Sub Category
      </h1>
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
        {subCategory.map((subCategory: any) => (
          <figure
            key={subCategory._id}
            className="relative rounded-2xl shadow-xl shadow-yellow-600 hover:scale-105 max-w-sm transition-all duration-300 cursor-pointer filter  hover:grayscale-0"
          >
            <Link to={`/specificSubCategory/${subCategory._id}`}>
              <img
                className="rounded-lg min-w-[400px] min-h-[400px] max-w-[400px] max-h-[400px] object-cover "
                src={
                  subCategory.image.secure_url ||
                  "../../assets/images/download (1).jpeg"
                }
                alt="image description"
              />
            </Link>
            <figcaption className="absolute px-4 text-lg text-white bottom-6">
              <p className="font-bold text-center">{subCategory.name}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}