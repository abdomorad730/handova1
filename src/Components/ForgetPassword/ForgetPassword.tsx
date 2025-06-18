import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import * as Yup from "yup"
import { Link } from "react-router-dom"
export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
  
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("email is Required"),
    })
  async function handleSubmit(values: { email: string }) {
    setIsLoading(true)
    try {
      const { data } = await axios.post("https://project1-kohl-iota.vercel.app/users/forgetPassword", values)
      console.log(data)
      if (data.message === "done") {
        navigate("/resetPassword")
      }
      toast.success("Check your email for reset password instructions")
    } catch (error) {
      console.error("Error sending forget password request:", error)
      toast.error("Error sending forget password request")
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema,
    onSubmit: handleSubmit
  })
  
  return (
    <div className="h-screen watsApp dark:bg-gray-900 pt-32 ">
    <ToastContainer/>
      <form onSubmit={formik.handleSubmit} className="max-w-sm bg-gray-200 p-10 rounded-2xl shadow-amber-500 shadow-xl  mx-auto">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-8 text-center">Forget Password</h2>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input 
            type="email" 
            id="email" 
            {...formik.getFieldProps("email")} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="name@flowbite.com" 
            required 
          />
          {formik.errors.email && formik.touched.email && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
          )}
          <div className="flex justify-between">
        <Link to="/login" className="text-amber-500 hover:underline">Back to login</Link>
        <Link to="/resetPassword" className="text-amber-500 hover:underline">Go to reset password</Link>
        </div>
        </div>
        <button type="submit" className="text-white w-full bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">
         {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  )
}
