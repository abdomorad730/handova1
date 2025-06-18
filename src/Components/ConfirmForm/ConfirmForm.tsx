import axios from 'axios';
import { useFormik } from 'formik';
import { ConfirmFormProps, FormConfirmation } from '../Interfaces/Interfaces';
import { useNavigate } from 'react-router-dom';


export default function ConfirmForm({ email }: ConfirmFormProps) {
    const navigate = useNavigate();
    
    const handleSubmit = async (values: FormConfirmation) => {
        try {
            const { data } = await axios.patch(
                `https://project1-kohl-iota.vercel.app/users/confirmMail`,
                values
            );
            console.log(data);
            if(data.confirmed === true){
                navigate('/login');
            }
        } catch (error) {
            console.error('Error confirming email:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: email,
            otp: '',
        },
        onSubmit: handleSubmit,
    });

    return (
        <>
        <div className='h-screen  flex items-center justify-center'>

                <form onSubmit={formik.handleSubmit} className="max-w-md bg-gray-200  p-10 rounded-2xl   mx-auto">
                    <h2 className="font-bold text-center mb-5">Confirm your email</h2>

                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            {...formik.getFieldProps('email')}
                            name="email"
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
                            placeholder=""
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="otp"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your OTP
                        </label>
                        <input
                            {...formik.getFieldProps('otp')}
                            type="number"
                            id="otp"
                            name="otp"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white w-full bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                    >
                        Confirm
                    </button>
                </form>
        </div>
            {/* <div className='"bg-red-100 dark:bg-gray-900 mt-10'> */}
            {/* </div> */}
        </>
    );
}
