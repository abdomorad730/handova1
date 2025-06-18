import axios from "axios";
import { useFormik } from "formik";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResetPasswordValues } from "../Interfaces/Interfaces";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is Required"),
    code: Yup.string().required("code is Required"),
    password: Yup.string().required("password is Required"),
    cPassword: Yup.string().required("confirm password is Required"),
  });
  async function handleSubmit(values: ResetPasswordValues) {
    try {
      setIsLoading(true);
      const { data } = await axios.patch(
        "https://project1-kohl-iota.vercel.app/users/resetPassword",
        values
      );
      console.log(data);
      if (data.message == "done") {
        navigate("/login");
      }
      setError(data.message);
      toast.success("Password reset successfully");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred");
      }
      toast.error("Error resetting password");
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      cPassword: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  return (
    <div className="h-screen dark:bg-gray-900 mb-24 pt-24 ">
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm bg-gray-200 p-10  rounded-2xl shadow-amber-500 shadow-xl mx-auto"
      >
        <h2 className=" font-bold text-[#4e342e] mb-8 text-center">
          Reset Password
        </h2>
        {error && (
          <p className="text-red-500 text-center font-bold p-3 bg-red-200 rounded-2xl   mb-5">
            {error}
          </p>
        )}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            {...formik.getFieldProps("email")}
            type="email"
            id="email"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="name@flowbite.com"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="code"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your code
          </label>
          <input
            {...formik.getFieldProps("code")}
            type="code"
            id="code"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="****"
          />
          {formik.errors.code && formik.touched.code && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.code}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New password
          </label>
          <input
            {...formik.getFieldProps("password")}
            type="password"
            id="password"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="cPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repeat password
          </label>
          <input
            {...formik.getFieldProps("cPassword")}
            type="password"
            id="cPassword"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          />
          {formik.errors.cPassword && formik.touched.cPassword && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.cPassword}
            </p>
          )}
        <Link to="/login" className="text-amber-500 hover:underline">Back to login</Link>
        </div>

        <button
          type="submit"
          className="text-white bg-yellow-700 cursor-pointer hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {" "}
          {isLoading ? <FaSpinner className="animate-spin" /> : "Reset Password"}{" "}
        </button>
      </form>
    </div>
  );
}
