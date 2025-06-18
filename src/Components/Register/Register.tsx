import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { FormValues, RegisterRole } from "../Interfaces/Interfaces";
import ConfirmForm from "../ConfirmForm/ConfirmForm";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const [toConfirm, setToConfirm] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  async function handleSubmit(values: FormValues, role: RegisterRole) {
    try {
      setLoading(true);
      setToConfirm(false);

      // Create FormData to handle file upload
      const formData = new FormData();

      // Add all text form values to FormData
      Object.keys(values).forEach((key) => {
        if (key !== "file") {
          // Skip file as we'll handle it separately
          formData.append(key, values[key as keyof FormValues]);
        }
      });

      // Add image from state (required)
      if (selectedImage) {
        formData.append("file", selectedImage);
      } else {
        setApiError("Profile image is required");
        toast.error("Profile image is required");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        `https://project1-kohl-iota.vercel.app/users/signup/${role}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      if (data.confirmed == false) {
        setToConfirm(true);
      } else {
        setToConfirm(false);
      }
      toast.success("User registered successfully");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setApiError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setApiError("An error occurred");
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("password is Required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("cPassword is Required"),
    firstName: Yup.string().required("firstName is Required"),
    lastName: Yup.string().required("lastName is Required"),
    phone: Yup.string().required("phone is Required"),
    DOB: Yup.date().required("DOB is Required"),
    gender: Yup.string().required("gender is Required"),
    address: Yup.string().required("address is Required"),
    file: Yup.mixed().required("Profile Image is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      DOB: "",
      gender: "",
      address: "",
      file: undefined as unknown as File,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <div className="  dark:bg-gray-900  py-24">
      <ToastContainer />
      {toConfirm ? (
        <ConfirmForm email={formik.values.email} />
      ) : (
        <div className="min-h-screen flex items-center justify-center  px-4">
          <div className="bg-gray-300 dark:bg-gray-200 p-8 md:p-12 rounded-[32px] shadow-xl w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center text-amber-700 mb-8">
              Register Now
            </h2>

            {apiError && (
              <div
                className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {apiError}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Email address
                </label>
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="cPassword"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Confirm password
                </label>
                <input
                  {...formik.getFieldProps("cPassword")}
                  type="password"
                  id="cPassword"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
                {formik.errors.cPassword && formik.touched.cPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.cPassword}
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block mb-1 text-sm font-medium text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    {...formik.getFieldProps("firstName")}
                    type="text"
                    id="firstName"
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                  />
                  {formik.errors.firstName && formik.touched.firstName && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="lastName"
                    className="block mb-1 text-sm font-medium text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    {...formik.getFieldProps("lastName")}
                    type="text"
                    id="lastName"
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                  />
                  {formik.errors.lastName && formik.touched.lastName && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  {...formik.getFieldProps("gender")}
                  type="text"
                  id="gender"
                  name="gender"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="gender"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:top-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-2 peer-focus:text-amber-600"
                >
                  Gender
                </label>

                {formik.errors.gender && formik.touched.gender && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.gender}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Phone number
                </label>
                <input
                  {...formik.getFieldProps("phone")}
                  type="tel"
                  id="phone"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
                {formik.errors.phone && formik.touched.phone && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.phone}
                  </div>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="DOB"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Date of Birth
                </label>
                <input
                  {...formik.getFieldProps("DOB")}
                  type="date"
                  id="DOB"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Address
                </label>
                <input
                  {...formik.getFieldProps("address")}
                  type="text"
                  id="address"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Profile Image */}
              <div>
                <label
                  htmlFor="profileImage"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setSelectedImage(file);

                    // Update formik value for validation
                    if (file) {
                      formik.setFieldValue("file", file);

                      // Create preview URL for the selected image
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      formik.setFieldValue("file", undefined);
                      setPreviewImage(null);
                    }
                  }}
                />

                {/* Image Preview */}
                {previewImage && (
                  <div className="mt-2">
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-24 h-24 object-cover rounded-full border-2 border-amber-500"
                    />
                  </div>
                )}
                {formik.errors.file && formik.touched.file && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.file as string}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    handleSubmit(
                      formik.values as unknown as FormValues,
                      "user" as RegisterRole
                    )
                  }
                  className="w-1/2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin mx-auto" />
                  ) : (
                    "Register as User"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSubmit(
                      formik.values as unknown as FormValues,
                      "crafter" as RegisterRole
                    )
                  }
                  className="w-1/2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin mx-auto" />
                  ) : (
                    "Register as Crafter"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
