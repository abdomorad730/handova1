import './App.css'
import Home from './Components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Category from './Components/Category/Category'
import SubCategory from './Components/SubCategory/SubCategory'
import DashBoard from './Components/Dashboard/DashBoard'
import LayOutAdmin from './Components/Layout/LayOutAdmin'
import CreateCategory from './Components/CreateCategory/CreateCategory'
import CreateBrand from './Components/CreateBrand/CreateBrand'
import ProductListPage from './Components/Product/Product'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Profile from './Components/Profile/Profile'
import CreateSubCategory from './Components/CreateSubCategory/CreateSubCategory'
import AddProduct from './Components/AddProduct/AddProduct'
import Wishlist from './Components/WishList/WishList'
import { ToastContainer } from 'react-toastify'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import OrderForm from './Components/OrderForm/OrderForm'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ResetPassword from './Components/ForgetPassword/ResetPassword'
import Orders from './Components/OrderForm/Orders'
import UpdateProduct from './Components/UpdateProduct/UpdateProduct'
import AllOrders from './Components/AllOrders/AllOrders'
import NotFound from './Components/NotFound/NotFound'
import UpdatePassword from './Components/UpdatePassword/UpdatePassword'
import Coupon from './Components/Coupon/Coupon'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import BrandDetails from './Components/BrandDetails/BrandDetails'
import SpecificSubCategory from './Components/subCategoryDetalls/sub_details'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,children: [
        {
          index: true,
          element: <Home />,
        },
          {
          path: '/handova1',
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
       
      
        {
          path: "/category",
          element: <ProtectedRoute><Category /></ProtectedRoute>,
        },
        {path:'/specificSubCategory/:id',element:<ProtectedRoute><SpecificSubCategory/></ProtectedRoute>},
        {
          path: "/Subcategory/:id",
          element: <ProtectedRoute><SubCategory /></ProtectedRoute>,
        },{
          path:"/product",
          element: <ProtectedRoute><ProductListPage /></ProtectedRoute>,
        },{
          path:"/brand",
          element:<ProtectedRoute><Brands/></ProtectedRoute>,
        },{
          path:"/cart",
          element:<ProtectedRoute><Cart/></ProtectedRoute>
        },{
          path:"/profile",
          element:<ProtectedRoute><Profile/></ProtectedRoute>
        },{
          path:"/addProduct",
          element:<ProtectedRoute><AddProduct/></ProtectedRoute>
        },{
          path:"wishlist",
          element:<ProtectedRoute><Wishlist/></ProtectedRoute>
        },{
          path:"/productDetails/:id",
          element: <ProtectedRoute><ProductDetails/></ProtectedRoute>
        },{
          path:"forgetPassword",
          element:  <ForgetPassword/>
        },{
          path:"resetPassword",
          element:<ResetPassword/>
        },{
          path:"brandDetails/:id",
          element:<ProtectedRoute><BrandDetails/></ProtectedRoute>,
        },{
          path:"orders",
          element:<ProtectedRoute><Orders/></ProtectedRoute>
        },
        {
          path:"orderForm",
          element:<ProtectedRoute><OrderForm/></ProtectedRoute>
        },
      
        {
          path:"updateProduct/:id",
          element:<ProtectedRoute><UpdateProduct/></ProtectedRoute>
        },
        {
          path:"allorder",
          element:<ProtectedRoute><AllOrders/></ProtectedRoute>
        },{
          path:"*",
          element:<NotFound/>
        },{
          path:"updatePassword",
          element:<ProtectedRoute><UpdatePassword/></ProtectedRoute>
        },
        {
          path:"/layoutAdmin",
          element: <LayOutAdmin />,children: [
            {
              index: true,
              element:<ProtectedRoute><DashBoard /></ProtectedRoute>,
            },{
              path: "createCategory",
              element: <ProtectedRoute><CreateCategory /></ProtectedRoute>, 
            },{
              path:"createBrand",
              element: <ProtectedRoute><CreateBrand /></ProtectedRoute>,
            },{
              path:"createSubCategory",
              element:<ProtectedRoute><CreateSubCategory/></ProtectedRoute>
            },
            {
              path:"coupon",
              element:<ProtectedRoute><Coupon/></ProtectedRoute>
            },
            {
        }
     
      ]
        }
      ]
    }
  ])

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
