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
      ? 'bg-ios-green/10 text-ios-green border border-ios-green/20 shadow-[0_0_10px_rgba(48,209,88,0.2)]' 
      : 'bg-ios-orange/10 text-ios-orange border border-ios-orange/20 shadow-[0_0_10px_rgba(255,159,10,0.2)]';
  }

  return (
    <div className='animate-fade-in'>
      <h2 className='text-3xl font-black text-white tracking-tight mb-8'>Orders</h2>

      <div className='flex flex-col gap-5'>
        {
          orders.map((order, index) => (
            <div className='glass-heavy p-6 md:p-8 rounded-[24px] border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group' key={index}>
              
              {/* Subtle hover glow on the card */}
              <div className='absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[shimmer_2s_infinite] pointer-events-none'></div>

              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-center relative z-10'>

                {/* Order Icon */}
                <div className='flex justify-center sm:justify-start'>
                  <div className='w-16 h-16 bg-gradient-to-br from-ios-blue/20 to-ios-purple/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg'>
                    <img className='w-8 filter invert opacity-80' src={assets.parcel_icon} alt="" />
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <div className='mb-3'>
                    {order.items.map((item, idx) => (
                      <p className='text-[15px] text-white' key={idx}>
                        <span className='font-bold'>{item.name}</span>
                        <span className='text-ios-blue/80'> × {item.quantity}</span>
                        <span className='text-ios-text-tertiary ml-1'>({item.size})</span>
                        {idx < order.items.length - 1 && <span className='text-ios-text-tertiary'>,</span>}
                      </p>
                    ))}
                  </div>
                  <p className='text-[16px] font-bold text-white mb-1'>{order.address.firstName + " " + order.address.lastName}</p>
                  <p className='text-[14px] text-ios-text-secondary leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5'>
                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                  <p className='text-[13px] text-ios-purple font-medium mt-2'>📞 {order.address.phone}</p>
                </div>

                {/* Order Meta */}
                <div className='flex flex-col gap-2'>
                  <p className='text-[14px]'><span className='text-ios-text-tertiary uppercase text-[11px] font-bold tracking-wider'>Items:</span> <span className='font-bold text-white'>{order.items.length}</span></p>
                  <p className='text-[14px]'><span className='text-ios-text-tertiary uppercase text-[11px] font-bold tracking-wider'>Method:</span> <span className='font-bold text-white'>{order.paymentMethod}</span></p>
                  <p className='text-[14px] flex items-center gap-2'>
                    <span className='text-ios-text-tertiary uppercase text-[11px] font-bold tracking-wider'>Payment: </span>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getPaymentBadge(order.payment)}`}>
                      {order.payment ? 'Paid' : 'Pending'}
                    </span>
                  </p>
                  <p className='text-[14px]'><span className='text-ios-text-tertiary uppercase text-[11px] font-bold tracking-wider'>Date:</span> <span className='font-bold text-white'>{new Date(order.date).toLocaleDateString()}</span></p>
                </div>

                {/* Amount */}
                <p className='text-[20px] font-black text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple'>
                    {currency}{order.amount}
                </p>

                {/* Status Selector */}
                <div className='relative'>
                   <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='ios-select text-[14px] w-full border-ios-blue/30 focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.2)] appearance-none font-semibold text-white'>
                     <option value="Order Placed" className='bg-black text-white'>Order Placed</option>
                     <option value="Packing" className='bg-black text-white'>Packing</option>
                     <option value="Shipped" className='bg-black text-white'>Shipped</option>
                     <option value="Out for delivery" className='bg-black text-white'>Out for delivery</option>
                     <option value="Delivered" className='bg-black text-ios-green'>Delivered</option>
                   </select>
                </div>

              </div>
            </div>
          ))
        }
      </div>

      {orders.length === 0 && (
        <div className='glass-heavy p-16 text-center rounded-[24px] border border-white/10 mt-4'>
          <p className='text-2xl font-bold text-white mb-2'>No active orders</p>
          <p className='text-ios-text-tertiary'>Orders will appear here when customers place them</p>
        </div>
      )}
    </div>
  )
}

export default Orders