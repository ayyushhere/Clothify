import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }


  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  const getPaymentBadge = (paid) => {
    return paid 
      ? 'bg-ios-green/10 text-ios-green' 
      : 'bg-ios-orange/10 text-ios-orange';
  }

  return (
    <div className='animate-fade-in'>
      <h2 className='ios-title text-ios-text-primary mb-6'>Orders</h2>

      <div className='flex flex-col gap-3'>
        {
          orders.map((order, index) => (
            <div className='ios-card-glass p-5 md:p-6 transition-all duration-200 hover:shadow-ios-md' key={index}>
              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start'>

                {/* Order Icon */}
                <div className='flex justify-center sm:justify-start'>
                  <div className='w-12 h-12 bg-ios-blue/10 backdrop-blur-sm rounded-full flex items-center justify-center'>
                    <img className='w-6 opacity-70' src={assets.parcel_icon} alt="" />
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <div className='mb-2'>
                    {order.items.map((item, idx) => (
                      <p className='text-[14px] text-ios-text-primary' key={idx}>
                        <span className='font-medium'>{item.name}</span>
                        <span className='text-ios-text-tertiary'> × {item.quantity}</span>
                        <span className='text-ios-text-tertiary ml-1'>({item.size})</span>
                        {idx < order.items.length - 1 && <span className='text-ios-text-tertiary'>,</span>}
                      </p>
                    ))}
                  </div>
                  <p className='text-[15px] font-semibold text-ios-text-primary'>{order.address.firstName + " " + order.address.lastName}</p>
                  <p className='text-[13px] text-ios-text-tertiary leading-relaxed'>
                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                  <p className='text-[13px] text-ios-text-secondary mt-1 font-medium'>{order.address.phone}</p>
                </div>

                {/* Order Meta */}
                <div className='flex flex-col gap-1.5'>
                  <p className='text-[13px]'><span className='text-ios-text-tertiary'>Items:</span> <span className='font-medium text-ios-text-primary'>{order.items.length}</span></p>
                  <p className='text-[13px]'><span className='text-ios-text-tertiary'>Method:</span> <span className='font-medium text-ios-text-primary'>{order.paymentMethod}</span></p>
                  <p className='text-[13px]'>
                    <span className='text-ios-text-tertiary'>Payment: </span>
                    <span className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-ios-full ${getPaymentBadge(order.payment)}`}>
                      {order.payment ? 'Paid' : 'Pending'}
                    </span>
                  </p>
                  <p className='text-[13px]'><span className='text-ios-text-tertiary'>Date:</span> <span className='font-medium text-ios-text-primary'>{new Date(order.date).toLocaleDateString()}</span></p>
                </div>

                {/* Amount */}
                <p className='text-[17px] font-bold text-ios-blue'>{currency}{order.amount}</p>

                {/* Status Selector */}
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='ios-select text-[14px]'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

              </div>
            </div>
          ))
        }
      </div>

      {orders.length === 0 && (
        <div className='ios-card-glass p-12 text-center'>
          <p className='ios-title text-ios-text-tertiary mb-1'>No orders yet</p>
          <p className='ios-footnote'>Orders will appear here when customers place them</p>
        </div>
      )}
    </div>
  )
}

export default Orders