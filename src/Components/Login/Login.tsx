import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import image1 from '../../assets/images/pin/hero2.webp'

export default function Register() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
   interface type {
    email:string,
        password:string

   }

  async function handleSubmit(values: type) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://project1-kohl-iota.vercel.app/users/signin/`,
        values
      );
      console.log(data);
      if (data.msg == "done") {
        const bearerToken = ` Bearer ${data.access_token}`;
        localStorage.setItem("authorization", bearerToken);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("name", data.user.name);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required(" password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-[#fdf8f3] h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24  flex items-center justify-center bg-[#fdf8f3] dark:bg-gray-900">
      <div className="flex w-full mx-20 max-w-4xl h-[600px] shadow-amber-500 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full hidden md:block h-full">
          <img
            src={image1}
            alt="login background"
            className="object-cover w-full h-full"
            style={{ minHeight: 600 }}
          />
        </div>
        {/* Right: Login Form */}
        <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-12">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full max-w-md">
              <div className="flex items-center justify-center mb-6">
                <span className="inline-block w-4 h-4 bg-[#4caf50] rounded-full mr-2"></span>
                <span className="text-lg font-semibold text-[#222]">Login</span>
              </div>
              <h2 className="text-3xl font-bold text-[#222] mb-2">Hello,</h2>
              <h2 className="text-3xl font-bold text-[#222] mb-6">Welcome Back</h2>
              <p className="text-sm text-gray-500 mb-8">Login to manage your account.</p>
              {apiError && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                  {apiError}
                </div>
              )}
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <input
                    {...formik.getFieldProps("email")}
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    {...formik.getFieldProps("password")}
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Link to="/forgetPassword" className="text-sm text-[#4caf50] hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#4caf50] hover:bg-[#388e3c] focus:ring-4 focus:outline-none focus:ring-[#4caf50] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="text-gray-400">Or</span>
                  <button type="button" className="rounded-full border border-gray-200 p-2 hover:bg-gray-50">
                    <i className="fab fa-facebook-f text-[#4caf50]"></i>
                  </button>
                  <button type="button" className="rounded-full border border-gray-200 p-2 hover:bg-gray-50">
                    <i className="fab fa-google text-[#4caf50]"></i>
                  </button>
                  <button type="button" className="rounded-full border border-gray-200 p-2 hover:bg-gray-50">
                    <i className="fab fa-instagram text-[#4caf50]"></i>
                  </button>
                </div>
                <p className="text-sm text-center text-gray-500 mt-6">
                  Don’t have an account?{' '}
                  <Link to="/register" className="text-[#4caf50] hover:underline font-semibold">
                    Signup
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}