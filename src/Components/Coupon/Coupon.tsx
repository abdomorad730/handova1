import axios from 'axios';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

export default function Coupon() {



    const formik = useFormik({
        initialValues:{
            code:'',
            amount:'',
            fromDate:'',
            toDate:'',
        },
        onSubmit:async(values)=>{
            try {
                const {data}= await axios.post("https://project1-kohl-iota.vercel.app/coupon/create",values,{
                    headers:{
                        Authorization: localStorage.getItem("authorization") || "",
                    },
                });
                console.log(data);
                toast.success("Coupon created successfully!", {
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
                console.log(error);
                toast.error("Error creating coupon!", {
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
        }
    }) 

  return (
    <>
    <ToastContainer />
     <form onSubmit={formik.handleSubmit} className='p-6 space-y-5 bg-gray-100 rounded-2xl shadow-lg max-w-xl mx-auto mt-28  ' >
      <h2 className='text-center  font-bold text-yellow-700 dark:text-yellow-500'>Create Coupon</h2>
     
      
      <div className="mb-6">
  <label htmlFor="code" className="block mb-2 text-sm font-medium text-yellow-700 dark:text-yellow-500">Coupon Code</label>
  <input {...formik.getFieldProps('code')}   type="text" name='code'  id="code" className="bg-yellow-50 border border-yellow-500 text-yellow-900 dark:text-yellow-400 placeholder-yellow-700 dark:placeholder-yellow-500 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-yellow-500" placeholder="Enter Coupon Code"/>
 
</div>
<div className="mb-6">
  <label htmlFor="amount" className="block mb-2 text-sm font-medium text-yellow-700 dark:text-yellow-500">Discount</label>
  <input {...formik.getFieldProps('amount')}    type="number" name='amount'  id="amount" className="bg-yellow-50 border border-yellow-500 text-yellow-900 dark:text-yellow-400 placeholder-yellow-700 dark:placeholder-yellow-500 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-yellow-500" placeholder="Enter Discount"/>
 
</div>
<div className="mb-6">
  <label htmlFor="fromDate" className="block mb-2 text-sm font-medium text-yellow-700 dark:text-yellow-500">From Date</label>
  <input {...formik.getFieldProps('fromDate')} type="date" name='fromDate' id="fromDate" className="bg-yellow-50 border border-yellow-500 text-yellow-900 dark:text-yellow-400 placeholder-yellow-700 dark:placeholder-yellow-500 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-yellow-500" placeholder="Enter From Date"/>
 
</div>
<div className="mb-6">
  <label htmlFor="toDate" className="block mb-2 text-sm font-medium text-yellow-700 dark:text-yellow-500">To Date</label>
  <input {...formik.getFieldProps('toDate')} type="date" name='toDate' id="toDate" className="bg-yellow-50 border border-yellow-500 text-yellow-900 dark:text-yellow-400 placeholder-yellow-700 dark:placeholder-yellow-500 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-yellow-500" placeholder="Enter To Date"/>
 
</div>
     
<button type="submit" className="w-full text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Create Coupon</button>
      </form> 
    </>
  )
}
 
    
 

