
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCartArrowDown, FaHeart, FaSpinner, FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { ProductDetailsProps } from "../Interfaces/Interfaces";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (error) {
      console.log("Error adding to wishlist:", error);
      toast.error("Error adding product to wishlist!");
    }
    finally{
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
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
      
        toast.error(error.response.data.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }); 

      } else {
        toast.error("An error occurred");
      }
    }
    finally{
      setIsLoadingButton(false);
    }
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://project1-kohl-iota.vercel.app/product/${id}`,
          { headers: { Authorization: localStorage.getItem("authorization") } }
        );
        setProduct(data.product);
        console.log(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen light:bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Product not found!</p>
      </div>
    );
  }

  return (
    <>
    <h1 className=" mt-28  font-bold text-center">Product Details</h1>
    <motion.div
    className="max-w-7xl  mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      {/* Left Side - Product Images */}
      <motion.div variants={fadeUpVariant}>
        <ToastContainer />
        <div className="w-full h-[350px] sm:h-[400px] rounded-lg overflow-hidden">
          <img
            src={product.imageCover.secure_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {product.images.map((img, i) => (
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
      <motion.div className="space-y-4 text-gray-800" variants={fadeUpVariant}>
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product?.describtion}</p>

        <p className="text-2xl font-semibold text-red-700 line-through ">
          ${product.price.toFixed(2)} No Discount
        </p>
        <p className="text-2xl font-semibold text-green-700">
          ${product.subPrice.toFixed(2)} With Discount{" "}
        </p>

        <p className="text-sm">
          Availability:{" "}
          <span
            className={
              product.isAvailable
                ? "text-green-600 font-bold "
                : "text-red-600 font-bold "
            }
          >
            {product.stock !== 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        <motion.div className="flex flex-col sm:flex-row gap-4 mt-4" variants={fadeUpVariant}>
          <button
          disabled={isLoadingButton}
            onClick={() => addToCart(product._id)}
            className="bg-[#6B4E35] hover:bg-[#543e2a] flex items-center justify-center transition text-white px-6 py-2 rounded-md font-medium"
          >
          {isLoadingButton ? <FaSpinner className="animate-spin" /> :<span className="flex items-center gap-1" > Add to Cart <FaCartArrowDown /> </span>}
          </button>
          <button
          disabled={isLoadingButton}
            onClick={() => addToWishlist(product._id)}
            className="border border-gray-400 hover:bg-gray-100 flex items-center justify-center transition px-6 py-2 rounded-md font-medium text-gray-800"
          >
          {isLoadingButton ? <FaSpinner className="animate-spin"/> :<span className="flex items-center gap-1" > Add to Wishlist <FaHeart /> </span> }
          </button>
        </motion.div>

        <motion.div className="text-sm mt-6 space-y-1 text-gray-700" variants={fadeUpVariant}>
          <p className="flex items-center gap-1 ">
            <span className="font-medium ">Rate:</span>{" "}
            {product.avgRating || "N/A"} <FaStar className="text-amber-400" />
          </p>
          <p>
            <span className="font-medium">Brand:</span>{" "}
            {product.brand.name || "N/A"}
          </p>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {product.category.name || "N/A"}
          </p>
          <p>
            <span className="font-medium">Handmade:</span> Yes
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
    </>
  );
};

export default ProductDetails;
