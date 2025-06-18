
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Category {
  _id: string;
  name: string;
}

interface Brand {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
}

export default function AddProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function getCategory() {
    try {
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/category`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getBrand() {
    try {
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/brand`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      setBrands(data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
    getBrand();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      describtion: '',
      stock: '',
      quantity: '',
      category: '',
      price: '',
      discount: '',
      rate: '',
      avgRating: '',
      brand: '',
      subCategory: '',
      imageCover: null as File | null,
      images: [] as File[],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      describtion: Yup.string().required('Required'),
      stock: Yup.number().required('Required'),
      quantity: Yup.number().required('Required'),
      category: Yup.string().required('Required'),
      price: Yup.number().required('Required'),
      discount: Yup.number().required('Required'),
      rate: Yup.number().required('Required'),
      avgRating: Yup.number().required('Required'),
      brand: Yup.string().required('Required'),
      subCategory: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        console.log('Formik Values:', values);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'images' && Array.isArray(value)) {
            value.forEach((img) => formData.append('images', img));
          } else if (key === 'imageCover' && value) {
            // Check if value is a File object before appending
            if (value instanceof File) {
              formData.append('imageCover', value);
            } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
              // If it's an array of Files, use the first one
              formData.append('imageCover', value[0]);
            } else if (typeof value === 'string') {
              formData.append('imageCover', value);
            }
          } else {
            formData.append(key, String(value));
          }
        });

        const token = localStorage.getItem('authorization');
        const response = await axios.post(
          'https://project1-kohl-iota.vercel.app/product/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token,
            },
          }
        );

        toast.success('Product created successfully!');
        console.log(response.data);
        setTimeout(() => {
          navigate("/product");
        }, 1500);
      } catch (error) {
        console.error('Error creating product:', error);
        toast.error('Failed to create product. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchSubCategories = () => {
      if (formik.values.category) {
        axios
          .get(`https://project1-kohl-iota.vercel.app/sub-category/${formik.values.category}`, {
            headers: {
              Authorization: localStorage.getItem("authorization") || "",
            },
          })
          .then((res) => {
            setSubCategories(res.data.subCategories || []);
          })
          .catch((error) => {
            console.error("Error fetching subcategories:", error);
            setSubCategories([]);
          });
      } else {
        setSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [formik.values.category]);

  return (
    <>  
    <ToastContainer />
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-xl mt-32 mx-auto p-6 bg-[#f9f9f6] rounded-2xl shadow-lg space-y-5 border border-gray-300"
    >
      <h2 className="font-bold mb-4 text-center text-[#a9690a]">Create New Product</h2>

      {([
        ['name', 'Product Name'],
        ['describtion', 'Describtion'],
        ['stock', 'Stock'],
        ['quantity', 'Quantity'],
        ['price', 'Price'],
        ['discount', 'Discount'],
        ['rate', 'Rate'],
        ['avgRating', 'Average Rating'],
      ] as const).map(([key, label]) => (
        <div key={key}>
          <label htmlFor={key} className="block font-medium text-[#6b4f4f] mb-1">
            {label}
          </label>
          <input
            id={key}
            name={key}
            type="text"
            placeholder={label}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#f0ece4] text-gray-800"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[key]}
          />
          {formik.touched[key] && formik.errors[key] && (
            <div className="text-red-500 text-sm">{formik.errors[key]}</div>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="category" className="block font-medium text-[#6b4f4f] mb-1">
          Category
        </label>
        <select
          name="category"
          id="category"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#f0ece4] text-gray-800"
          value={formik.values.category}
          onChange={(e) => {
            formik.setFieldValue('category', e.target.value);
            formik.setFieldValue('subCategory', '');
          }}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <div className="text-red-500 text-sm">{formik.errors.category}</div>
        )}
      </div>

      <div>
        <label htmlFor="subCategory" className="block font-medium text-[#6b4f4f] mb-1">
          SubCategory
        </label>
        <select
          name="subCategory"
          id="subCategory"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#f0ece4] text-gray-800"
          value={formik.values.subCategory}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!subCategories.length}
        >
          <option value="">Select Subcategory</option>
          {subCategories.map((sub) => (
            <option key={sub._id} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </select>
        {formik.touched.subCategory && formik.errors.subCategory && (
          <div className="text-red-500 text-sm">{formik.errors.subCategory}</div>
        )}
      </div>

      <div>
        <label htmlFor="brand" className="block font-medium text-[#6b4f4f] mb-1">
          Brand
        </label>
        <select
          name="brand"
          id="brand"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#f0ece4] text-gray-800"
          value={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
        {formik.touched.brand && formik.errors.brand && (
          <div className="text-red-500 text-sm">{formik.errors.brand}</div>
        )}
      </div>

      <div>
        <label className="block font-medium text-[#6b4f4f] mb-1">Image Cover</label>
        <input
          type="file"
          name="imageCover"
          accept="image/*"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-[#f0ece4] text-gray-800"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0] || null;
            formik.setFieldValue('imageCover', file);
          }}
        />
      </div>

      <div>
        <label className="block font-medium text-[#6b4f4f] mb-1">Images (Multiple)</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-[#f0ece4] text-gray-800"
          onChange={(event) => {
            const files = event.currentTarget.files;
            formik.setFieldValue('images', files ? Array.from(files) : []);
          }}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#a9690a] text-white py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
      >
        {isLoading ? <FaSpinner className="animate-spin text-2xl text-center mx-auto " /> : "Submit"}
      </button>
    </form>
    </>
  );
}
