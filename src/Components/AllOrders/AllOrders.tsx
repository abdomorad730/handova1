import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaSpinner, FaTimes } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export interface Order {
  _id: string;
  id?: string;
  orderId?: string;
  date?: string;
  updatedAt?: string;
  userId: {
    _id:string
  };
  status: string;
  totalPrice?: number;
  TotalPrice?: number;
  paymentMethod: string;
  items?: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  address?: string;
  phone?: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authorization');
      if (!token) {
        setError('Authentication token not found. Please login again.');
        navigate('/login');
        return;
      }

      const { data } = await axios.get('https://project1-kohl-iota.vercel.app/order', {
        headers: { Authorization: token }
      });
      
      setOrders(data.orders);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to fetch orders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
useEffect(() => {
    fetchOrders();
  }, []);
  const handleViewDetails = async (order: Order) => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('authorization');
      if (!token) {
        setError('Authentication token not found. Please login again.');
        return;
      }

      // Fetch specific order details using the provided endpoint
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/order/${order._id}`, {
        headers: { Authorization: token }
      });
      
      // Set the detailed order data
      setSelectedOrder(data.order || order);
      setShowDetails(true);
    } catch (err: any) {
      console.error('Error fetching order details:', err);
      // If there's an error, still show the modal with the basic order info we already have
      setSelectedOrder(order);
      setShowDetails(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f9f9f6] dark:bg-gray-900">
        <FaSpinner className="animate-spin text-4xl text-[#6B4E35] dark:text-amber-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex  flex-col items-center justify-center h-screen bg-[#f9f9f6] dark:bg-gray-900">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button 
          onClick={fetchOrders}
          className="mt-4 bg-[#6B4E35] text-white py-2 px-4 rounded-md hover:bg-[#543e2a] transition"
        >
          Try Again
        </button>
      </div>

    );
  }

  return (
    <div className='bg-[#f9f9f6] dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen'   >
    <div className="p-4 sm:p-6 container mx-auto">
    <h1 className="mt-20 mb-6 text-center font-bold text-[#4e342e] dark:text-amber-500">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-stone-100 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <p className="text-lg dark:text-white">You don't have any orders yet.</p>
          <button 
            onClick={() => navigate('/orderForm')}
            className="mt-4 bg-[#6B4E35] text-white py-2 px-4 rounded-md hover:bg-[#543e2a] transition"
          >
            Place Your First Order
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-stone-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
            <thead className="bg-[#6B4E35] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Payment Method</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (order.userId._id === localStorage.getItem('id') &&<tr key={order._id} className="hover:bg-[#efebd9] dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 dark:text-white">{order.id || order._id.substring(0, 8)}</td>
                  <td className="px-4 py-3 dark:text-white">{formatDate(order.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status || 'Processing'}
                    </span>
                  </td>
                  <td className="px-4 py-3 dark:text-white capitalize">{order.paymentMethod}</td>
                  <td className="px-4 py-3 text-right dark:text-white">${order.TotalPrice?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="text-[#6B4E35] cursor-pointer dark:text-amber-500 hover:text-[#543e2a] dark:hover:text-amber-600 transition-colors"
                    >
                      <FaEye className="inline-block mr-1" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-[#8d816a] bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            {isLoading ? (
              <div className="flex items-center justify-center p-16">
                <FaSpinner className="animate-spin text-5xl text-[#6B4E35] dark:text-amber-500" />
              </div>
            ) : (
              <div>
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-[#6B4E35] to-[#8D6E63] dark:from-amber-700 dark:to-amber-900 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Order #{selectedOrder.id || selectedOrder._id.substring(0, 8)}
                  </h2>
                  <button 
                    onClick={closeDetails}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <MdClose className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Order status banner */}
                  <div className={`mb-6 px-4 py-3 rounded-lg ${getStatusBgColor(selectedOrder.status)}`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${getStatusDotColor(selectedOrder.status)}`}></div>
                      <span className="font-medium">
                        Status: {selectedOrder.status || 'Processing'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-stone-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-[#4e342e] dark:text-amber-400 mb-3 border-b border-gray-200 dark:border-gray-600 pb-2">
                        Order Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Date:</span>
                          <span className="font-medium dark:text-white">{formatDate(selectedOrder.updatedAt || selectedOrder.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Payment Method:</span>
                          <span className="font-medium dark:text-white capitalize">{selectedOrder.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Total:</span>
                          <span className="font-medium text-[#4e342e] dark:text-amber-400">
                            ${selectedOrder.TotalPrice?.toFixed(2) || selectedOrder.totalPrice?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-stone-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-[#4e342e] dark:text-amber-400 mb-3 border-b border-gray-200 dark:border-gray-600 pb-2">
                        Shipping Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Customer:</span>
                          <span className="font-medium dark:text-white">{selectedOrder.userId._id || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Address:</span>
                          <span className="font-medium dark:text-white">{selectedOrder.address || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Phone:</span>
                          <span className="font-medium dark:text-white">{selectedOrder.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  {selectedOrder.items && selectedOrder.items.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#4e342e] dark:text-amber-400 mb-3 border-b border-gray-200 dark:border-gray-600 pb-2">
                        Order Items
                      </h3>
                      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr className="bg-[#f5f0e6] dark:bg-gray-700">
                              <th className="px-4 py-3 text-left text-xs font-medium text-[#6B4E35] dark:text-amber-400 uppercase tracking-wider">Product</th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-[#6B4E35] dark:text-amber-400 uppercase tracking-wider">Qty</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-[#6B4E35] dark:text-amber-400 uppercase tracking-wider">Price</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-[#6B4E35] dark:text-amber-400 uppercase tracking-wider">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {selectedOrder.items.map((item, index) => (
                              <tr key={index} className="hover:bg-[#f9f6f0] dark:hover:bg-gray-750 transition-colors">
                                <td className="px-4 py-3 dark:text-white">{item.productId}</td>
                                <td className="px-4 py-3 text-center dark:text-white">{item.quantity}</td>
                                <td className="px-4 py-3 text-right dark:text-white">${item.price.toFixed(2)}</td>
                                <td className="px-4 py-3 text-right font-medium text-[#4e342e] dark:text-amber-400">
                                  ${(item.quantity * item.price).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-[#f5f0e6] dark:bg-gray-700">
                              <td colSpan={2} className="px-4 py-3"></td>
                              <td className="px-4 py-3 text-right font-medium text-[#6B4E35] dark:text-amber-400">Total:</td>
                              <td className="px-4 py-3 text-right font-bold text-[#4e342e] dark:text-amber-400">
                                ${selectedOrder.TotalPrice?.toFixed(2) || selectedOrder.totalPrice?.toFixed(2) || '0.00'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {/* Footer */}
                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={closeDetails}
                      className="bg-[#6B4E35] text-white py-2.5 px-6 rounded-lg hover:bg-[#543e2a] transition-colors font-medium flex items-center"
                    >
                      <FaTimes className="h-5 w-5 mr-1" />
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

function getStatusBgColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-green-50 dark:bg-green-900/20';
    case 'processing':
      return 'bg-blue-50 dark:bg-blue-900/20';
    case 'shipped':
      return 'bg-purple-50 dark:bg-purple-900/20';
    case 'cancelled':
      return 'bg-red-50 dark:bg-red-900/20';
    case 'pending':
      return 'bg-yellow-50 dark:bg-yellow-900/20';
    default:
      return 'bg-gray-50 dark:bg-gray-800';
  }
}

function getStatusDotColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-green-500';
    case 'processing':
      return 'bg-blue-500';
    case 'shipped':
      return 'bg-purple-500';
    case 'cancelled':
      return 'bg-red-500';
    case 'pending':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
}
