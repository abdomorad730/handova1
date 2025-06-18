import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
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
  name: Yup.string().required("SubCategory name is required").min(3, "Name must be at least 3 characters"),
  image: Yup.mixed().required("SubCategory image is required"),
  category: Yup.string().required("Category is required"),
});

export default function CreateSubCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const authHeader = { Authorization: localStorage.getItem("authorization") || "" };

  useEffect(() => {
    axios
      .get("https://project1-kohl-iota.vercel.app/category", { headers: authHeader })
      .then((res) => setCategories(res.data.categories))
      .catch(() => toast.error("Error fetching categories"));
  }, []);

  const fetchSubCategories = (categoryName: string) => {
    const selectedCat = categories.find((cat) => cat.name === categoryName);
    if (!selectedCat) return;

    axios
      .get(`https://project1-kohl-iota.vercel.app/sub-category/${selectedCat._id}`, { headers: authHeader })
      .then((res) => setSubCategories(res.data.subCategories || []))
      .catch(() => toast.error("Error fetching subcategories"));
  };

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category); // <-- اسم الكاتيجوري
    if (values.image) formData.append("file", values.image);

    try {
      setIsLoading(true);
      if (selectedSubCategory) {
        await axios.patch(
          `https://project1-kohl-iota.vercel.app/sub-category/update/${selectedSubCategory._id}`,
          formData,
          { headers: { ...authHeader, "Content-Type": "multipart/form-data" } }
        );
        toast.success("SubCategory updated successfully");
      } else {
        await axios.post(
          "https://project1-kohl-iota.vercel.app/sub-category/create",
          formData,
          { headers: { ...authHeader, "Content-Type": "multipart/form-data" } }
        );
        toast.success("SubCategory created successfully");
      }

      resetForm();
      setSelectedSubCategory(null);
      fetchSubCategories(values.category);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`https://project1-kohl-iota.vercel.app/sub-category/delete/${id}`, {
        headers: authHeader,
      });
      toast.success("SubCategory deleted");
      fetchSubCategories(selectedCategory);
    } catch (error: any) {
      toast.error("Failed to delete subcategory");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen mt-16 py-8">
      <ToastContainer position="bottom-right" theme="colored" />

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#efebd9] shadow-xl shadow-amber-400 rounded-2xl p-8 mb-12">
          <h2 className="font-bold mb-6 text-[#4e342e] text-center">Create or Update SubCategory</h2>

          <Formik
            initialValues={{
              name: selectedSubCategory?.name || "",
              image: null,
              category: selectedSubCategory?.category || "",
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block mb-2 text-[#4e342e] font-semibold">SubCategory Name</label>
                  <Field
                    name="name"
                    className="w-full p-3 border-2 rounded-lg border-[#4e342e]"
                    placeholder="Enter name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-2 text-[#4e342e] font-semibold">Category</label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full p-3 border-2 rounded-lg border-[#4e342e]"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const value = e.target.value;
                      setFieldValue("category", value);
                      setSelectedCategory(value);
                      fetchSubCategories(value);
                    }}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-2 text-[#4e342e] font-semibold">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files![0];
                      setFieldValue("image", file);
                    }}
                    className="w-full border-2 p-3 rounded-lg border-[#4e342e]"
                  />
                  <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4e342e] hover:bg-[#6d4c41] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      {selectedSubCategory ? "Updating..." : "Creating..."}
                    </>
                  ) : selectedSubCategory ? (
                    "Update SubCategory"
                  ) : (
                    "Create SubCategory"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {subCategories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subCategories.map((sub) => (
              <div
                key={sub._id}
                className="border-2 border-[#4e342e] rounded-xl p-4 shadow-md bg-white text-[#4e342e]"
              >
                <img src={sub.image?.secure_url} alt={sub.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold mb-2">{sub.name}</h3>
                <p className="mb-3">Category: {sub.category}</p>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 flex items-center gap-1 min-w-[80px] justify-center"
                    onClick={() => {
                      setUpdatingId(sub._id);
                      setSelectedSubCategory(sub);
                    }}
                    disabled={updatingId === sub._id}
                  >
                    {updatingId === sub._id ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 flex items-center gap-1 min-w-[80px] justify-center"
                    onClick={() => handleDelete(sub._id)}
                    disabled={deletingId === sub._id}
                  >
                    {deletingId === sub._id ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
