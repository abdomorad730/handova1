// import { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaSpinner } from 'react-icons/fa';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';

// interface Category {
//   _id: string;
//   name: string;
// }

// interface Brand {
//   _id: string;
//   name: string;
// }

// interface SubCategory {
//   _id: string;
//   name: string;
// }

// interface ProductFormValues {
//   name: string;
//   describtion: string;
//   stock: string;
//   quantity: string;
//   category: string;
//   price: string;
//   discount: string;
//   rate: string;
//   avgRating: string;
//   brand: string;
//   subCategory: string;
//   imageCover: File | null;
//   images: File[];
// }

// export default function AddProduct() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
//   const navigate = useNavigate();
//   const { productId } = useParams<{ productId: string }>();
//   const location = useLocation();

//   async function getCategory() {
//     try {
//       const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/category`, {
//         headers: { Authorization: localStorage.getItem("authorization") },
//       });
//       setCategories(data.categories);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function getBrand() {
//     try {
//       const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/brand`, {
//         headers: { Authorization: localStorage.getItem("authorization") },
//       });
//       setBrands(data.brands);
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // Fetch product details if in update mode
//   const fetchProductDetails = async (id: string) => {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/product/${id}`, {
//         headers: { Authorization: localStorage.getItem("authorization") },
//       });
      
//       return data.product;
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//       toast.error("Failed to fetch product details");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   async function fetchSubCategories(categoryId?: string) {
//     const catId = categoryId || formik.values.category;
//     if (!catId) return;

//     try {
//       const { data } = await axios.get(
//         `https://project1-kohl-iota.vercel.app/subcategory/${catId}`,
//         {
//           headers: { Authorization: localStorage.getItem("authorization") },
//         }
//       );
//       setSubCategories(data.subcategories);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const formik = useFormik<ProductFormValues>({
//     initialValues: {
//       name: '',
//       describtion: '',
//       stock: '',
//       quantity: '',
//       category: '',
//       price: '',
//       discount: '',
//       rate: '',
//       avgRating: '',
//       brand: '',
//       subCategory: '',
//       imageCover: null,
//       images: [],
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required('Required'),
//       describtion: Yup.string().required('Required'),
//       stock: Yup.number().required('Required'),
//       quantity: Yup.number().required('Required'),
//       category: Yup.string().required('Required'),
//       price: Yup.number().required('Required'),
//       discount: Yup.number().required('Required'),
//       rate: Yup.number().required('Required'),
//       avgRating: Yup.number().required('Required'),
//       brand: Yup.string().required('Required'),
//       subCategory: Yup.string().required('Required'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         setIsLoading(true);
//         console.log('Formik Values:', values);
//         const formData = new FormData();
//         Object.entries(values).forEach(([key, value]) => {
//           if (key === 'images' && Array.isArray(value)) {
//             value.forEach((img) => formData.append('images', img));
//           } else if (key === 'imageCover' && value) {
//             // Check if value is a File object before appending
//             if (value instanceof File) {
//               formData.append('imageCover', value);
//             } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
//               // If it's an array of Files, use the first one
//               formData.append('imageCover', value[0]);
//             } else if (typeof value === 'string') {
//               formData.append('imageCover', value);
//             }
//           } else {
//             formData.append(key, String(value));
//           }
//         });

//         const token = localStorage.getItem('authorization');
//         let response;
        
//         if (isUpdateMode && productId) {
//           // Update existing product
//           response = await axios.put(
//             `https://project1-kohl-iota.vercel.app/product/update/${productId}`,
//             formData,
//             {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: token,
//               },
//             }
//           );
//           toast.success('Product updated successfully!');
//         } else {
//           // Create new product
//           response = await axios.post(
//             'https://project1-kohl-iota.vercel.app/product/create',
//             formData,
//             {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: token,
//               },
//             }
//           );
//           toast.success('Product created successfully!');
//         }
        
//         console.log(response.data);
//         setTimeout(() => {
//           navigate("/products");
//         }, 1500);
//       } catch (error) {
//         console.error(`Error ${isUpdateMode ? 'updating' : 'creating'} product:`, error);
//         toast.error(`Failed to ${isUpdateMode ? 'update' : 'create'} product. Please try again.`);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   useEffect(() => {
//     getCategory();
//     getBrand();
    
//     // Check if we're in update mode
//     if (location.pathname.includes('update') && productId) {
//       setIsUpdateMode(true);
//       fetchProductDetails(productId).then(product => {
//         if (product) {
//           // Set form values with product data
//           formik.setValues({
//             name: product.name || '',
//             describtion: product.describtion || '',
//             stock: product.stock?.toString() || '',
//             quantity: product.quantity?.toString() || '',
//             category: product.category || '',
//             price: product.price?.toString() || '',
//             discount: product.discount?.toString() || '',
//             rate: product.rate?.toString() || '',
//             avgRating: product.avgRating?.toString() || '',
//             brand: product.brand || '',
//             subCategory: product.subCategory || '',
//             imageCover: null,
//             images: [],
//           });
          
//           // Fetch subcategories if category is selected
//           if (product.category) {
//             fetchSubCategories(product.category);
//           }
//         }
//       });
//     }
//   }, [productId, location.pathname]);

//   useEffect(() => {
//     if (formik.values.category) {
//       fetchSubCategories();
//     }
//   }, [formik.values.category]);

//   return (
//     <>
//       <ToastContainer />
//       <h1 className="text-3xl font-bold text-center mb-6 text-[#6b4f4f]">
//         {isUpdateMode ? 'Update Product' : 'Add New Product'}
//       </h1>
//       <form onSubmit={formik.handleSubmit} className="max-w-xl mt-8 mx-auto p-6 bg-[#f9f9f6] rounded-2xl shadow-lg space-y-5 border border-gray-300">
//         {([
//           ['name', 'Product Name'],
//           ['describtion', 'Description'],
//           ['stock', 'Stock'],
//           ['quantity', 'Quantity'],
//           ['price', 'Price'],
//           ['discount', 'Discount'],
//           ['rate', 'Rate'],
//           ['avgRating', 'Average Rating'],
//         ] as const).map(([key, label]) => (
//           <div key={key}>
//             <label htmlFor={key} className="block font-medium text-[#6b4f4f] mb-1">
//               {label}
//             </label>
//             <input
//               id={key}
//               name={key}
//               type="text"
//               placeholder={label}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#f0ece4] text-gray-800"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values[key]}
//             />
//             {formik.touched[key] && formik.errors[key] && (
//               <div className="text-red-500 text-sm">{formik.errors[key]}</div>
//             )}
//           </div>
//         ))}

//         <div>
//           <label htmlFor="category" className="block font-medium text-[#6b4f4f] mb-1">
//             Category
//           </label>
//           <select
//             name="category"
//             id="category"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#f0ece4] text-gray-800"
//             value={formik.values.category}
//             onChange={(e) => {
//               formik.setFieldValue('category', e.target.value);
//               formik.setFieldValue('subCategory', '');
//             }}
//             onBlur={formik.handleBlur}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           {formik.touched.category && formik.errors.category && (
//             <div className="text-red-500 text-sm">{formik.errors.category}</div>
//           )}
//         </div>

//         <div>
//           <label htmlFor="subCategory" className="block font-medium text-[#6b4f4f] mb-1">
//             SubCategory
//           </label>
//           <select
//             name="subCategory"
//             id="subCategory"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#f0ece4] text-gray-800"
//             value={formik.values.subCategory}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             disabled={!subCategories.length}
//           >
//             <option value="">Select Subcategory</option>
//             {subCategories.map((sub) => (
//               <option key={sub._id} value={sub.name}>
//                 {sub.name}
//               </option>
//             ))}
//           </select>
//           {formik.touched.subCategory && formik.errors.subCategory && (
//             <div className="text-red-500 text-sm">{formik.errors.subCategory}</div>
//           )}
//         </div>

//         <div>
//           <label htmlFor="brand" className="block font-medium text-[#6b4f4f] mb-1">
//             Brand
//           </label>
//           <select
//             name="brand"
//             id="brand"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#f0ece4] text-gray-800"
//             value={formik.values.brand}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           >
//             <option value="">Select Brand</option>
//             {brands.map((brand) => (
//               <option key={brand._id} value={brand.name}>
//                 {brand.name}
//               </option>
//             ))}
//           </select>
//           {formik.touched.brand && formik.errors.brand && (
//             <div className="text-red-500 text-sm">{formik.errors.brand}</div>
//           )}
//         </div>

//         <div>
//           <label className="block font-medium text-[#6b4f4f] mb-1">Image Cover</label>
//           <input
//             type="file"
//             name="imageCover"
//             accept="image/*"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-[#f0ece4] text-gray-800"
//             onChange={(event) => {
//               const file = event.currentTarget.files?.[0] || null;
//               formik.setFieldValue('imageCover', file);
//             }}
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-[#6b4f4f] mb-1">Images (Multiple)</label>
//           <input
//             type="file"
//             name="images"
//             accept="image/*"
//             multiple
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-[#f0ece4] text-gray-800"
//             onChange={(event) => {
//               const files = event.currentTarget.files;
//               formik.setFieldValue('images', files ? Array.from(files) : []);
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#a9690a] text-white py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
//         >
//           {isLoading ? <FaSpinner className="animate-spin text-2xl text-center mx-auto" /> : isUpdateMode ? "Update Product" : "Add Product"}
//         </button>
//       </form>
//     </>
//   );
// }
