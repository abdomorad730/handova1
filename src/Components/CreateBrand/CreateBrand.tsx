import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Category {
  _id: string;
  name: string;
}

interface Brand {
  _id: string;
  userId: string;

  name: string;
  image: { secure_url: string };
  category: string;
}

interface FormValues {
  name: string;
  image: File | null;
  category: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Brand name is required")
    .min(3, "Brand name must be at least 3 characters"),
  image: Yup.mixed().required("Brand image is required"),
  category: Yup.string().required("Category is required"),
});

export default function CreateBrand() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://project1-kohl-iota.vercel.app/category", {
        headers: { Authorization: localStorage.getItem("authorization") || "" },
      })
      .then((res) => setCategories(res.data.categories))
      .catch(() => setErrorMessage("Error fetching categories"));
    fetchBrands();
  }, []);

  // Fetch brands
  const fetchBrands = () => {
    axios
      .get("https://project1-kohl-iota.vercel.app/brand", {
        headers: { Authorization: localStorage.getItem("authorization") || "" },
      })
      .then((res) => setBrands(res.data.brands))
      .catch(() => {});
  };

  // Delete brand
  const deleteBrand = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      setIsLoading(true);
      await axios.delete(
        `https://project1-kohl-iota.vercel.app/brand/delete/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
          },
        }
      );
      fetchBrands();
      toast.success("Brand deleted successfully!");
    } catch (error) {
      setErrorMessage("Error deleting brand.");
      toast.error("Error deleting brand.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submit (create or update)
  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    if (values.image) formData.append("file", values.image);

    try {
      setIsLoading(true);
      if (editingBrand) {
        // Update
        await axios.patch(
          `https://project1-kohl-iota.vercel.app/brand/update/${editingBrand._id}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("authorization") || "",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Brand updated successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        // Create
        await axios.post(
          "https://project1-kohl-iota.vercel.app/brand/create",
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("authorization") || "",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Brand created successfully!", {
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
      setErrorMessage("");
      fetchBrands();
      resetForm();
      setEditingBrand(null);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "Error creating/updating brand. Please try again."
      );
      toast.error(
        error.response?.data?.message ||
          "Error creating/updating brand. Please try again.",
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

  if (isLoading) {
    return (
      <div className="h-screen bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
    </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 py-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#efebd9] shadow-xl shadow-amber-400 rounded-2xl p-8 mb-12">
          <h2 className="font-bold mb-6 text-[#4e342e] text-center">
            {editingBrand ? "Update Brand" : "Create New Brand"}
          </h2>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errorMessage}
            </div>
          )}

          <Formik
            enableReinitialize
            initialValues={{
              name: editingBrand?.name || "",
              image: null,
              category: editingBrand?.category || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-semibold text-[#4e342e] mb-2"
                  >
                    Brand Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border-2 border-[#4e342e] rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Enter brand name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#4e342e] mb-2">
                    Category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full border-2 border-[#4e342e] rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#4e342e] mb-2">
                    Brand Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-[#4e342e] border-2 border-[#4e342e] rounded-lg p-3 file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:bg-[#4e342e] file:text-white hover:file:bg-[#6d4c41] transition"
                    onChange={(event) => {
                      const file = event.currentTarget.files![0];
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
                    ) : editingBrand?.image?.secure_url ? (
                      <img
                        src={editingBrand.image.secure_url}
                        alt="Current brand image"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <p className="text-[#4e342e]">
                        Image preview will appear here
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#4e342e] hover:bg-[#6d4c41] text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-[1.02]"
                  >
                    {editingBrand ? "Update Brand" : "Create Brand"}
                  </button>
                  {editingBrand && (
                    <button
                      type="button"
                      onClick={() => setEditingBrand(null)}
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

        {/* All Brands Section */}
        <div className="bg-[#efebd9] shadow-amber-300 shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-[#4e342e] text-center">
            All Brands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brands.map((brand:Brand) => (
              <div
                key={brand._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="">
                  <img
                    src={brand.image?.secure_url}
                    className="w-full h-48 object-cover"
                    alt={brand.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h5 className="text-xl font-bold text-[#4e342e] mb-4">
                    {brand.name.toUpperCase()}
                  </h5>
                  {localStorage.getItem('id')===brand.userId ? (
                      <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => deleteBrand(brand._id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingBrand(brand)}
                        className="w-full bg-[#4e342e] hover:bg-[#6d4c41] text-white py-2 px-4 rounded-lg font-medium transition duration-300"
                      >
                        Update
                      </button>
                    </div>
                  ):<div>
                    <p className="text-red-500 text-center p-2 bg-red-100 rounded-2xl ">You are not authorized to delete this brand</p>
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
