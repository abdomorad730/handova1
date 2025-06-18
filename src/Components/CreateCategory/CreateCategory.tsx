import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from '../../assets/images/download (11).jpeg'

// Define Types for Category and Form values
interface Category {
  _id: string;
  name: string;
  userId:string,
  image:{  secure_url: string}
}

interface FormValues {
  name: string;
  image: File | null;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters"),
  image: Yup.mixed().required("Category image is required"),
});

import { useRef } from "react";

export default function CreateCategory() {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Fetch all categories
async function getCategories(){
  try {
    const {data} = await axios.get("https://project1-kohl-iota.vercel.app/category",{
      headers:{
        Authorization: localStorage.getItem("authorization") || "",
      },
    });
    console.log('First category object:', data.categories); 
    setCategories(data.categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `https://project1-kohl-iota.vercel.app/category/delete/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
          },
        }
      );
      toast.success("Category deleted successfully!", {
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
        getCategories(); 
      }, 1000);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category!", {
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
  };

  // Update category
  const handleUpdate = async (values: FormValues) => {
    if (!editingCategory) return;

    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image) {
      formData.append("file", values.image);
    }

    try {
      setIsLoading(true);
      const response = await axios.patch(
        `https://project1-kohl-iota.vercel.app/category/update/${editingCategory._id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Category updated successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("Category updated:", response.data);
      await getCategories();
      setEditingCategory(null);
      setErrorMessage("");
      alert("Category updated successfully!");
      // Smooth scroll to form section
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error: any) {
      console.error("Error updating category:", error);
      toast.error("Error updating category!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Error updating category. Please try again."
        );
      } else if (error.request) {
        setErrorMessage(
          "No response from server. Please check your internet connection."
        );
      } else {
        setErrorMessage("Error setting up the request. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Submit form data
  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("file", values.image!);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://project1-kohl-iota.vercel.app/category/create",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Category created response:", response.data);
      toast.success("Category created successfully!", {
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
      getCategories();
    }, 1000);

      values.name = "";
      values.image = null;
      setErrorMessage("");

      toast.success("Category created successfully!", {
        position: "bottom-right",
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error: any) {
      console.error("Error creating category:", error);

      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Error creating category. Please try again."
        );
      } else if (error.request) {
        setErrorMessage(
          "No response from server. Please check your internet connection."
        );
      } else {
        setErrorMessage("Error setting up the request. Please try again.");
      }

      toast.error(
        "Error creating category. Please try again.",
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
    </div>
    );
  }
  return (
<div className="min-h-screen  dark:bg-transparent  mt-16 py-8">
     <ToastContainer />

      <div className="max-w-4xl mx-auto px-4">
        <div ref={formSectionRef} className="bg-[#efebd9] shadow-xl shadow-amber-400 rounded-2xl p-8 mb-12">
          <h2 className="font-bold mb-6 text-[#4e342e] text-center">
            {editingCategory ? "Update Category" : "Create New Category"}
          </h2>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errorMessage}
            </div>
          )}

          <Formik
            initialValues={{
              name: editingCategory?.name || "",
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={editingCategory ? handleUpdate : handleSubmit}
            enableReinitialize
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-semibold text-[#4e342e] mb-2"
                  >
                    Category Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border-2 border-[#4e342e] rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Enter category name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#4e342e] mb-2">
                    Category Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-[#4e342e] border-2 border-[#4e342e] rounded-lg p-3 file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:bg-[#4e342e] file:text-white hover:file:bg-[#6d4c41] transition"
                    onChange={(event) => {
                      const file = event.currentTarget.files![0];
                      console.log("Selected file:", file);
                      setFieldValue("image", file);
                    }}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  <div className="mt-4 h-48 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-[#4e342e]">
                    {values.image ? (
                      <div className="text-center">
                        <p className="text-[#4e342e]">
                          Selected: {(values.image as File).name}
                        </p>
                      </div>
                    ) : (
                      editingCategory?.image.secure_url ? (
                        <img
                          src={editingCategory.image.secure_url}
                          alt="Current category image"
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <p className="text-[#4e342e]">
                          Image preview will appear here
                        </p>
                      )
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#4e342e] hover:bg-[#6d4c41] text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-[1.02]"
                  >
                    {editingCategory ? "Update Category" : "Create Category"}
                  </button>
                  {editingCategory && (
                    <button
                      type="button"
                      onClick={() => setEditingCategory(null)}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-[1.02]"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* All Categories Section */}
        <div className=" dark:bg-transparent light:bg-white  shadow-amber-300 shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 dark:text-amber-500 text-center">
            All Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category:Category) => (
              <div
                key={category._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="">
                  <img
                  src={category.image.secure_url || image}

                    className="w-full h-48 object-cover"
                    alt={category.name}
             
                  />
                  
                </div>
                <div className="p-6">
                  <h5 className="text-xl font-bold text-[#4e342e] mb-4">
                    {category.name.toUpperCase()}
                  </h5>
                  {localStorage.getItem('id')===category.userId ? (
                      <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => deleteCategory(category._id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCategory(category)}
                        className="w-full bg-[#4e342e] hover:bg-[#6d4c41] text-white py-2 px-4 rounded-lg font-medium transition duration-300"
                      >
                        Update
                      </button>
                    </div>
                  ):<div>
                    <p className="text-red-500 text-center p-2 bg-red-100 rounded-2xl ">You are not authorized to delete this category</p>
                  </div> }
                
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
