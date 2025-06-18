import axios from "axios";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaCartArrowDown, FaSpinner, FaStar } from "react-icons/fa";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
export default function BrandDetails() {
  const [brand, setBrand] = useState([]);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  async function addToWishlist(productId: string) {
    try {
      setIsLoadingButton(true);
      const { data } = await axios.patch(
        `https://project1-kohl-iota.vercel.app/product/washlist/${productId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success("Product added to wishlist successfully!");
      setIsLoadingButton(false);
    } catch (error) {
      console.log("Error adding to wishlist:", error);
      toast.error("Error adding product to wishlist!");
    } finally {
      setIsLoadingButton(false);
    }
  }
  async function addToCart(productId: string) {
    try {
      setIsLoadingButton(true);
      const { data } = await axios.post(
        `https://project1-kohl-iota.vercel.app/cart/create`,
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success("Product added to cart successfully!");
      setIsLoadingButton(false);
    } catch (error) {
      console.log("Error adding to cart:");
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoadingButton(false);
    }
  }

  async function getBrandDetails() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/brand/SpecificBrand/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
          },
        }
      );
      setBrand(data.products);
      console.log(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrandDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen light:bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!brand) {
    return (
      <div className="h-screen light:bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="">
      <h1 className="mt-28 font-bold text-center">Brand Details</h1>
      {brand?.map((item: any, index: number) => (
        <motion.div
          key={index}
          className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Left Side - Product Images */}
          <motion.div variants={fadeUpVariant}>
            <ToastContainer />
            <div className="w-full h-[350px] sm:h-[400px] rounded-lg overflow-hidden">
              <img
              onClick={() => {
                    navigate(`/productDetails/${item._id}`);
              }}
                src={item.imageCover.secure_url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {item.images.map((img:{secure_url:string}, i:number) => (
                <motion.img
                  key={i}
                  src={img.secure_url}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-20 h-20 object-cover border rounded-md cursor-pointer hover:ring-2 hover:ring-[#6B4E35]"
                  variants={fadeUpVariant}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Side - Product Details */}
          <motion.div
            className="space-y-4 text-gray-800"
            variants={fadeUpVariant}
          >
            <h2 className="text-3xl font-bold">{item.name}</h2>
            <p className="text-gray-600">{item.describtion}</p>

            <p className="text-2xl font-semibold text-red-700 line-through ">
              ${item.price.toFixed(2)} No Discount
            </p>
            <p className="text-2xl font-semibold text-green-700">
              ${item.subPrice.toFixed(2)} With Discount
            </p>

            <p className="text-sm">
              Availability:{" "}
              <span
                className={
                  item.isAvailable
                    ? "text-green-600 font-bold "
                    : "text-red-600 font-bold "
                }
              >
                {item.stock !== 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              variants={fadeUpVariant}
            >
              <button
                onClick={() => addToCart(item._id)}
                className="bg-[#6B4E35] hover:bg-[#543e2a] transition text-white px-6 py-2 rounded-md font-medium"
              >
                {isLoadingButton ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-1">
                    Add to Cart <FaCartArrowDown />
                  </span>
                )}
              </button>
              <button
                onClick={() => addToWishlist(item._id)}
                className="border border-gray-400 hover:bg-gray-100 transition px-6 py-2 rounded-md font-medium text-gray-800"
              >
                {isLoadingButton ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-1">
                    Add to Wishlist <FaCartArrowDown />
                  </span>
                )}
              </button>
            </motion.div>

            <motion.div
              className="text-sm mt-6 space-y-1 text-gray-700"
              variants={fadeUpVariant}
            >
              <p className="flex items-center gap-1">
                <span className="font-medium">Rate:</span>{" "}
                {item.avgRating || "N/A"} <FaStar className="text-amber-400" />
              </p>
              <p>
                <span className="font-medium">Brand:</span>{" "}
                {item.brand?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {item.category?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Handmade:</span> Yes
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
