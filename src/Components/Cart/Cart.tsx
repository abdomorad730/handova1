import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartItem } from "../Interfaces/Interfaces";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Framer Motion

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productLength, setProductLength] = useState(0);
  const navigate = useNavigate();

  async function getCart() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/cart`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      setCart(data.cart[0].products);
      setProductLength(data.cart[0].products.length);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Error fetching cart!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateQuantity(productId: string, quantity: number) {
    try {
      setIsLoading(true);
      await axios.patch(
        `https://project1-kohl-iota.vercel.app/cart/update`,
        { productId, quantity },
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      getCart();
      toast.success("Quantity updated successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Error updating quantity!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteItem(productId: string) {
    try {
      // setIsLoadingDelete(true);
      await axios.delete(`https://project1-kohl-iota.vercel.app/cart/remove`, {
        data: { productId },
        headers: {
          Authorization: localStorage.getItem("authorization") || "",
          "Content-Type": "application/json",
        },
      });
      setTimeout(() => {
        getCart();
      }, 1000);
      toast.success("Item deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Error deleting item!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      // setIsLoadingDelete(false);
    }
  }

  async function clearCart() {
    try {
      setIsLoading(true);
      await axios.delete(`https://project1-kohl-iota.vercel.app/cart/clear`, {
        headers: {
          Authorization: localStorage.getItem("authorization") || "",
          "Content-Type": "application/json",
        },
      });
      getCart();
      toast.success("Cart cleared successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Error clearing cart!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );
  const totalAsInteger = Math.round(total);

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (isNaN(totalAsInteger)) {
      toast.error("Total is not a valid number!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [totalAsInteger]);

  if (isNaN(totalAsInteger)) return null;

  if (isLoading) {
    return (
      <div className="h-screen bg-amber-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className=" light:bg-white dark:bg-black py-10">
      <ToastContainer />
      {productLength === 0 ? (
        <div className="h-screen bg-amber-50 dark:bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl container mx-auto p-6 dark:bg-gray-200 light:bg-white shadow-amber-300 rounded-2xl shadow-lg mt-28 mb-20 space-y-6">
          <h1 className="font-bold text-center text-gray-800 mb-6 text-3xl">
            Cart 🛒
          </h1>

          {cart.map((item, index) =>
            item.productId ? (
              <motion.div
                key={item.productId._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-xl shadow-sm gap-4 group hover:shadow-lg"
               
              >
                {/* صورة المنتج */}
                <div
                 onClick={() =>
                  navigate(`/productDetails/${item.productId._id}`)
                }
                 className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={
                      item.productId?.imageCover?.secure_url ||
                      "../assets/images/download.png"
                    }
                    className="sm:w-44 h-28 rounded-2xl object-cover"
                    alt={item.productId.name}
                  />
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.productId.name}
                    </h2>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>

                {/* التحكم في الكمية */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity - 1)
                      }
                      className="px-3 py-1 text-lg bg-red-700 font-bold text-white duration-150 cursor-pointer"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity + 1)
                      }
                      className="px-3 py-1 text-lg bg-lime-500 text-white font-bold duration-150 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm sm:text-base flex flex-col font-bold bg-lime-400 text-gray-700 px-4 py-2 rounded-md text-center">
                    <span className="line-through text-red-600">
                      Before: ${item.productId.price}
                    </span>
                    <span>After: ${item.finalPrice}</span>
                  </div>
                </div>

                {/* زر الحذف */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteItem(item.productId._id)}
                  className="absolute right-2 top-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </motion.div>
              </motion.div>
            ) : null
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-4 gap-4">
            <h3 className="text-xl font-bold text-gray-800">Total</h3>
            <span className="text-xl font-bold text-black">
              ${totalAsInteger}
            </span>
          </div>

          <button
            onClick={() => {
              localStorage.setItem("cartTotal", totalAsInteger.toString());
              navigate("/orderForm");
            }}
            className="w-full mt-4 font-bold bg-yellow-700 text-white py-3 rounded-xl text-lg hover:bg-yellow-500 transition"
          >
            Checkout
          </button>

          <button
            onClick={clearCart}
            className="w-full mt-4 font-bold bg-red-700 text-white py-3 rounded-xl text-lg hover:bg-red-500 transition"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
