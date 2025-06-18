import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaSpinner, FaStar, FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "../Interfaces/Interfaces";
import { MdEditSquare } from "react-icons/md";
import { motion } from "framer-motion"; // ✅ استيراد Framer Motion

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(false);
  const navigate = useNavigate();

  function getProducts() {
    axios
      .get(`https://project1-kohl-iota.vercel.app/product`)
      .then((res) => {
        // console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching products!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function addToCart(productId: string) {
    try {
      setIsLoading1(true);
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
      toast.success("Product added to cart successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log("Error adding to cart:", error);
      toast.error("Product already in cart!", {
        position: "bottom-right", 
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
      if(localStorage.getItem('id')==='null'){
        toast.error("You should login first!", {
                        position: "bottom-right", 
                        autoClose: 3000, 
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                      setTimeout(() => {
                        navigate('/login')
                      }, 1000);
        }
    } finally {
      setIsLoading1(false);
    }
  }

  async function addToWishlist(productId: string) {
    try {
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
      toast.success("Product added to wishlist successfully!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    } catch (error) {
      console.log("Error adding to wishlist:", error);
      if(localStorage.getItem('id')==='null'){
        toast.error("Error Proudct alredy in wishlist!", {
                        position: "bottom-right", 
                        autoClose: 3000, 
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                        setTimeout(() => {
                        navigate('/login')
                      }, 1000);
      }
    } finally {
      setIsLoading1(false);
    }
  }

  async function deleteProduct(productId: string) {
    try {
      const { data } = await axios.delete(
        `https://project1-kohl-iota.vercel.app/product/delete/${productId}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log("Error deleting product:", error);
      toast.error("Error deleting product!", {
        position: "bottom-right", 
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if(localStorage.getItem('id')){
      toast.error("Error deleting product!", {
                        position: "bottom-right", 
                        autoClose: 3000, 
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
          navigate('/login')
                    }
    }finally{
        setIsLoading1(false);
      }
  }

  useEffect(() => {
    getProducts();
  }, []);
 

  return (
    <div className=" dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-10 font-sans min-h-screen">
      <ToastContainer />
      <section className="py-12 px-4 md:px-12 lg:px-20 light:bg-white dark:bg-black rounded-lg shadow-lg">
        
        <div className="container mx-auto ">
        <h1 className="font-bold text-center mb-10 dark:text-amber-500">
          All Products
        </h1>

        {localStorage.getItem("role") === "crafter" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            <div
              onClick={() => 
                localStorage.getItem('id') ? navigate("/addProduct") : navigate("/login")}
              className="bg-gray-200 dark:bg-gray-700 rounded shadow hover:shadow-2xl duration-500 hover:shadow-yellow-500 p-4 cursor-pointer flex items-center justify-center text-center text-brown-600 dark:text-amber-500 font-bold"
            >
              <span className="text-lg flex items-center justify-center">
                Add New Product <IoIosAddCircle className="ml-1 text-2xl" />
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 animate-pulse rounded shadow p-4 dark:bg-gray-800"
                >
                  <div className="h-48 light:bg-gray-400 rounded mb-4 dark:bg-gray-700"></div>
                  <div className="h-6 light:bg-gray-400 rounded mb-2 dark:bg-gray-700"></div>
                  <div className="h-6 light:bg-gray-400 rounded mb-2 dark:bg-gray-700"></div>
                  <div className="h-10 light:bg-gray-400 rounded dark:bg-gray-700"></div>
                </div>
              ))
            : products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="light:bg-white border light:border-red-300 rounded-2xl dark:border-amber-600 dark:bg-black  shadow-lg hover:shadow-2xl duration-500 hover:shadow-yellow-500 p-4 transition"
                >
                  <div className="h-48 light:bg-gray-200 rounded mb-4 dark:bg-gray-700">
                    <img
                      onClick={() =>
                        localStorage.getItem('id') ==='null' ? navigate("/login") : navigate(`/productDetails/${product._id}`)
                      }
                      src={product.imageCover.secure_url}
                      className="w-full h-full object-cover rounded-md bg-center"
                      alt={product.name}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 light:text-gray-800 dark:text-amber-500">
                    {product.name.slice(0, 24)}
                  </h3>
                  <p className="text-sm light:text-gray-500 overflow-hidden    dark:text-white   mb-2">
                    {product.describtion.slice(0, 100)}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="light:text-brown-600 overflow-hidden text-green-700    dark:text-amber-400 font-bold mb-2">
                      ${product.price}
                    </p>
                    <p className="light:text-brown-600 overflow-hidden dark:text-amber-400 font-bold mb-2 flex items-center gap-1">
                      <FaStar className="text-yellow-500" /> {product.rate}
                    </p>
                  </div>
                  <div className="flex justify-between gap-1 items-center">
                    <button
                    disabled={isLoading1}
                      onClick={() => 
                        localStorage.getItem('id') ? addToCart(product._id) : navigate("/login") }
                      type="button"
                      className="py-2.5 w-full px-5 me-2 mb-2 text-sm font-bold justify-center  flex items-center gap-1 text-white hover:scale-110 transition-all duration-500 rounded-2xl bg-yellow-700 cursor-pointer "
                    >
                      <span>
                      {isLoading1 ? <FaSpinner className="animate-spin" /> : "Add To Cart"}
                      </span>
                    </button>
                    <FaHeart
                      onClick={() => 
                        localStorage.getItem('id')  ? addToWishlist(product.id) : navigate("/login")  }
                      className="text-3xl text-red-600 cursor-pointer"
                    />
                    {localStorage.getItem("role") === "admin" && (
                      <div
                        onClick={() => 
                           deleteProduct(product._id) }
                        className="text-white flex hover:scale-110 transition-all items-center gap-1 rounded-2xl hover:bg-red-800 cursor-pointer px-3 py-3 bg-red-200"
                      >
                        <FaTrash />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 items-center justify-evenly">
                    {localStorage.getItem("id") == product.userId && (
                      <>
                        <div
                          onClick={() => 
                            localStorage.getItem('id') ? deleteProduct(product._id) : navigate("/login") }
                          className="text-white flex items-center gap-1 rounded-2xl hover:bg-red-800 cursor-pointer px-2 py-2 bg-red-600"
                        >
                          Delete <FaTrash />
                        </div>
                        <div
                          onClick={() => 
                            localStorage.getItem('id') ? navigate(`/updateProduct/${product._id}`) : navigate("/login") }
                          className="text-white flex items-center gap-1 rounded-2xl hover:bg-green-800 cursor-pointer px-2 py-2 bg-green-800"
                        >
                          Update <MdEditSquare />
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
        </div>
        </div>
      </section>
    </div>
  );
}
