import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
};*/

export default function AdminDashboard() {
  const [categoryDs, setCategoryDs] = useState<{ _id: string; name: string }[]>([]);
  const [brandsDs, setBrandsDs] = useState<{ _id: string; name: string }[]>([]);
  const [userDs, setUserDs] = useState<{ _id: string; name: string; email: string; role: string; isBlocked: boolean }[]>([]);
  const [ordersDs, setOrdersDs] = useState<{ _id: string; orderId: string; updatedAt: string; userId: string; address:string }[]>([]);
  const [categoryNum, setCategoryNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [productsDs, setProductsDs] = useState<{ _id: string; name: string; price: number; brand: string; category: string; stock: number; image: string }[]>([]);
  const navigate = useNavigate();

  async function getCategory() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/category`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      setCategoryDs(data.categories);
      setCategoryNum(data.categories.length);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getDashBoard() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/users/dashboard`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      // console.log(data.data);
      setUserDs(data.data[1].value);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getBrands() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/brand`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      setBrandsDs(data.brands);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getOrders() {
    try {
      setIsLoading(true);
    const{data}= await axios.get(`https://project1-kohl-iota.vercel.app/order`, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    // console.log(data.orders);
    setOrdersDs(data.orders);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
    }
  }

  async function blockUser(id: string) {
    try {
      await axios.patch(`https://project1-kohl-iota.vercel.app/users/block/${id}`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      // Update userDs state to reflect new block status
      setUserDs((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );
    //  console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducts() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/product`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      setProductsDs(data.products);
      // console.log(data.products.length);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
    getBrands();
    getDashBoard();
    getOrders();
    getProducts();
  }, []);


  if (isLoading) {
    return (
      <div className="h-screen light:bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-8 bg-[#f9f9f6] dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <h1 className="mt-20 text-[#4e342e] text-center dark:text-amber-400 font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div onClick={()=>navigate('/product')} className="rounded-2xl hover:scale-108 transition-all duration-150 shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 dark:border dark:border-amber-400 p-4 text-center">
          <p className="text-4xl  text-[#4e342e] dark:text-amber-500 font-bold">{productsDs.length}</p>
          <p className='dark:text-gray-100' >Products</p>
        </div>
        <div onClick={()=>navigate('/layoutAdmin/createCategory')} className="rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl  text-[#4e342e] dark:text-amber-500 font-bold">{categoryNum}</p>
          <p className='dark:text-gray-100' >Categories</p>
        </div>
        <div onClick={()=>navigate('/orders')} className="rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl  text-[#4e342e] dark:text-amber-500 font-bold">{ordersDs.length  +1}</p>
          <p className='dark:text-gray-100' >Orders</p>
        </div>
        <div className="rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl  text-[#4e342e] dark:text-amber-500 font-bold">{userDs.length}</p>
          <p className='dark:text-gray-100' >Users</p>
        </div>
      </div>

      {/* Recent Orders & Manage Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-stone-100  shadow-xl shadow-yellow-500 dark:bg-gray-900 dark:border dark:border-amber-400 rounded-2xl overflow-x-auto">
          <h2 className="text-lg bg-[#432d0c] dark:bg-gray-900  text-white dark:text-white p-4 rounded-t-2xl font-semibold mb-4">
            Recent Orders
          </h2>
          <div className="max-h-[400px] overflow-y-auto">
          <table onClick={()=>navigate('/orders')} className="min-w-full cursor-pointer text-sm">
            <thead className="border-b sticky top-0 bg-stone-100 dark:bg-gray-900">
              <tr>
                <th className="text-left text-[#4e342e] dark:text-amber-500 py-2 px-2">Order ID</th>
                <th className="text-left text-[#4e342e] dark:text-amber-500 py-2 px-2">Date</th>
                <th className="text-left text-[#4e342e] dark:text-amber-500 py-2 px-2">Customer</th>
              </tr>
            </thead>
            <tbody>
              {ordersDs.slice(0, 10).map((order, index) => (
                <tr key={index}>
                  <td className="py-2 text-[#4e342e] dark:text-gray-200 px-2">{order._id}</td>
                  <td className="py-2 text-[#4e342e] dark:text-gray-200 px-2">{order.updatedAt}</td>
                  <td className="py-2 text-[#4e342e] dark:text-gray-200 px-2">{order.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* Manage Categories */}
        <div className="bg-stone-100 dark:bg-gray-900  dark:border dark:border-amber-400 shadow-xl shadow-yellow-500   rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-amber-500">Manage Categories</h2>
          <ul className="space-y-2">
            {categoryDs.map((category) => (
              <li
                key={category._id}
                className="bg-[#efebd9] dark:text-gray-100 dark:bg-gray-800 flex items-center justify-between rounded-xl px-3 py-2"
              >
                <span>{category.name}</span>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/layoutAdmin/createCategory")}
                className="mt-2 cursor-pointer bg-yellow-800 dark:bg-amber-700 font-bold light:text-gray-800 dark:text-white w-full border rounded-lg px-3 py-2 text-center"
              >
                + Add Category
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
      
        {/* Manage Categories */}
        <div className="bg-stone-100 shadow-xl shadow-yellow-500 dark:bg-gray-900 dark:border dark:border-amber-400 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-amber-500">Manage Brands</h2>
          <ul className="space-y-2">
            {brandsDs.map((brand) => (
              <li
                key={brand._id}
                className="bg-[#efebd9] dark:bg-gray-800 dark:text-gray-100 flex items-center justify-between rounded-xl px-3 py-2"
              >
                <span>{brand.name}</span>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/layoutAdmin/createBrand")}
                className="mt-2 cursor-pointer bg-yellow-800 dark:bg-amber-700 hover:dark:bg-amber-600 font-bold light:text-gray-800 dark:text-white w-full border rounded-lg px-3 py-2 text-center transition-colors duration-200"
              >
                + Add Brand
              </button>
            </li>
          </ul>
        </div>
      </div>
        <div className="border shadow-xl shadow-yellow-500 dark:border-amber-400 rounded-xl p-6 overflow-x-auto bg-white/80 dark:bg-gray-800/80 ">
        <h2 className="text-2xl font-bold dark:text-amber-500 light:text-gray-800 mb-6">Users</h2>
        <table className="min-w-full text-base rounded-xl overflow-hidden">
          <thead className="border-b  light:bg-gray-200 dark:bg-gray-900/90 dark:border-amber-400 ">
            <tr>
              <th className="px-4 py-3  text-md light:text-gray-800 dark:text-white tracking-wide">ID</th>
              <th className="px-4 py-3  text-md light:text-gray-800 dark:text-white tracking-wide">Name</th>
              <th className="px-4 py-3  text-md light:text-gray-800 dark:text-white tracking-wide">Email</th>
              <th className="px-4 py-3  text-md light:text-gray-800 dark:text-white tracking-wide">Role</th>
              <th className="px-4 py-3  text-md light:text-gray-800 dark:text-white tracking-wide">Status</th>
              <th className="px-4 py-3  text-md light:text-gray-800 dark:text-white tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {userDs.map((user) => (
              <tr key={user._id} className="border-b dark:border-gray-700 hover:bg-yellow-50 dark:hover:bg-gray-900/70 transition-colors duration-200 ">
                <td className="px-4 py-3  text-sm light:text-gray-800 dark:text-white ">{user._id}</td>
                <td className="px-4 py-3  text-sm light:text-gray-800 dark:text-white ">{user.name}</td>
                <td className="px-4 py-3  text-sm light:text-gray-800 dark:text-white ">{user.email}</td>
                <td className="px-4 py-3  text-sm light:text-gray-800 dark:text-white ">{user.role}</td>
                <td className="px-4 py-3  text-sm light:text-gray-800 dark:text-white ">
  <span className={user.isBlocked ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'}>
    {user.isBlocked ? 'Blocked' : 'Active'}
  </span>
</td>
<td className="px-4 py-3 flex justify-center items-center">
  <button
    onClick={() => blockUser(user._id)}
    className={`px-4 py-2 cursor-pointer rounded-full text-gray-800 text-sm dark:text-white font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400
      ${user.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
  >
    {user.isBlocked ? 'Unblock' : 'Block'}
  </button>
</td>
</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
