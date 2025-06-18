import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const OrderAndPaymentForm: React.FC = () => {
  const [orderId, setOrderId] = React.useState<string | null>(null);
  const [cartTotal, setCartTotal] = React.useState<number>(0);
  const [isPaySubmitting, setIsPaySubmitting] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTotal = localStorage.getItem('cartTotal');
    if (storedTotal) {
      setCartTotal(parseInt(storedTotal, 10));
    }
  }, []);

  // Formik for Order
  const formik = useFormik({
    initialValues: {
      phone: '',
      address: '',
      paymentMethod: 'card',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone is required'),
      address: Yup.string().required('Address is required'),
      paymentMethod: Yup.string().oneOf(['card', 'cash']).required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await axios.post(
          "https://project1-kohl-iota.vercel.app/order/create",
          {
            phone: values.phone,
            address: values.address,
            paymentMethod: values.paymentMethod,
          },
          {
            headers: {
              Authorization: localStorage.getItem("authorization") || "",
              "Content-Type": "application/json",
            },
          }
        );
        setOrderId(data?.order?._id);
        toast.success("Order created successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      
        if (values.paymentMethod === 'cash') {
          navigate('/orders');
        }
      } catch (error: any) {
        toast.error("Error creating order!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Formik for Payment
  const payFormik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setIsPaySubmitting(true);
      if (!orderId) {
        toast.error("Order ID is missing. Please create an order first.");
        setIsPaySubmitting(false);
        setSubmitting(false);
        return;
      }
      try {
        const totalAmount = cartTotal || 0;
        const { data } = await axios.post(
          "https://project1-kohl-iota.vercel.app/order/create-payment",
          {
            orderId,
            code: values.code,
            amount: Math.round(totalAmount),
          },
          {
            headers: {
              Authorization: localStorage.getItem("authorization") || "",
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Order created successfully!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          window.location.href = data.data.url;
        }, 1000);
      } catch (error: any) {
        toast.error("Error creating order!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setIsPaySubmitting(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-screen dark:bg-gray-900   pt-28   " > 
    <ToastContainer />  

    <div className="max-w-md mx-auto  shadow-amber-500  mt-20 p-6 bg-white  rounded-lg shadow-xl">
      {!orderId ? (
        <>
          <h2 className=" font-semibold mb-4">Create New Order</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                {...formik.getFieldProps('phone')}
                required
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                {...formik.getFieldProps('address')}
                required
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.address}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Payment Method</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                {...formik.getFieldProps('paymentMethod')}
              >
                <option value="card">Card</option>
                <option value="cash">Cash</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#6B4E35]  flex items-center justify-center text-white py-2 rounded-md hover:bg-[#543e2a] transition"
              >
                <span>
                  {formik.isSubmitting ? <FaSpinner className="animate-spin" /> : "Place Order"}
                </span>
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className=" font-semibold mb-4">Create Payment</h2>
          <form onSubmit={payFormik.handleSubmit} className="space-y-4">
            <input type="hidden" value={orderId} />
            <div>
              <label className="block text-sm font-medium">Code (Optional)</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                {...payFormik.getFieldProps('code')}
                placeholder="Enter code if you have one"
                />
            </div>
            <button
              type="submit"
              disabled={isPaySubmitting || payFormik.isSubmitting}
              className="w-full bg-[#6B4E35] flex justify-center items-center text-center mx-auto text-white py-2 rounded-md hover:bg-[#543e2a] transition"
            >
              <span  >

              {(isPaySubmitting || payFormik.isSubmitting) ? <FaSpinner className="animate-spin" /> : "Create Payment"}
              </span>
            </button>
          </form>
        </>
      )}
    </div>
              </div>
  );
};

export default OrderAndPaymentForm;
