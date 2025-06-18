import axios from 'axios';
import { useFormik } from 'formik'
import  { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
export default function UpdatePassword() {
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required("Old password is required"),
    password: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    cPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
 interface FormValues {
  oldPassword: string;
  password: string;
  cPassword: string;
 }

  async function handleSubmit(values: FormValues) {
    try {
      setIsLoading(true)
    const {data}= await axios.patch("https://project1-kohl-iota.vercel.app/users/updatePassword",values,{
        headers:{Authorization:localStorage.getItem("authorization") || ""}
    })
    console.log(data)
      if(data.message=="done"){
    navigate("/")
    }
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError("An error occurred");
        }
    }finally{
      setIsLoading(false)
    }
    
  }

   const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      oldPassword: '',
      password: '',
      cPassword: '',
    },
    validationSchema
       })

  return (
    <div className='light:bg-white dark:bg-black  h-screen pt-32' >

     <form onSubmit={formik.handleSubmit} className='p-6 space-y-5 border light:bg-white dark:bg-black   border-gray-300 shadow-xl shadow-amber-500 light:bg-gray-100 m-5  rounded-2xl  max-w-xl mx-auto   ' >
      <h1 className='text-center  font-bold light:text-red-700 dark:text-white'>Update Password</h1>

    {apiError && 
     <div className='p-4 bg-red-200 dark:bg-red-700 rounded-lg ' >
    <p className='text-red-600 text-center '>{apiError}</p>
    </div>}

     <div>
  <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium light:text-black  dark:text-white">Your Old Password</label>
  <input {...formik.getFieldProps("oldPassword")} type="password" name='oldPassword' id="oldPassword" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Enter your old password"/>
 {formik.errors.oldPassword && formik.touched.oldPassword && <p  className="mt-2 text-sm text-red-600 dark:text-red-500"> {formik.errors.oldPassword}</p>}
</div>
<div className="mb-6">
  <label htmlFor="Password" className="block mb-2 text-sm font-medium light:text-black  dark:text-white">Your New Password</label>
  <input {...formik.getFieldProps("password")}  type="password" name='password'  id="Password" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Enter your new password"/>
 {formik.errors.password && formik.touched.password && <p className="mt-2 text-sm text-red-600 dark:text-green-500"> {formik.errors.password}</p>}
</div>
<div className="mb-6">
  <label htmlFor="cPassword" className="block mb-2 text-sm font-medium light:text-black  dark:text-white">Confirm Password</label>
  <input {...formik.getFieldProps("cPassword")}  type="password" name='cPassword' id="cPassword" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Enter your confirm password"/>
  {formik.errors.cPassword && formik.touched.cPassword && <p className="mt-2 text-sm text-red-600 dark:text-green-500"> {formik.errors.cPassword}</p>}
</div>
      <Link to="/profile" className="text-center  dark:text-green-500 mb-5 ">Back to Profile</Link>
<button type="submit" className="w-full text-white mt-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading ? "Loading..." : "Update Password"}</button>
      </form> 
    </div>
  )
}
