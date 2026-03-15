import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id // Add orderId for tracking
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }

    } catch (error) {
      console.error(error)
    }
  }

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/cancel', { orderId }, { headers: { token } })
      if (response.data.success) {
        loadOrderData(); // Reload orders to reflect updated status
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'bg-ios-green/20 text-ios-green border border-ios-green/30 shadow-[0_0_15px_rgba(52,199,89,0.3)]';
      case 'shipped': return 'bg-ios-blue/20 text-ios-blue border border-ios-blue/30 shadow-[0_0_15px_rgba(10,132,255,0.3)]';
      case 'out for delivery': return 'bg-ios-purple/20 text-ios-purple border border-ios-purple/30 shadow-[0_0_15px_rgba(191,90,242,0.3)]';
      case 'packing': return 'bg-ios-orange/20 text-ios-orange border border-ios-orange/30 shadow-[0_0_15px_rgba(255,149,0,0.3)]';
      case 'cancelled': return 'bg-red-500/20 text-red-500 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
      default: return 'bg-white/10 text-ios-text-secondary border border-white/20 shadow-inner';
    }
  }

  return (
    <div className='pt-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative min-h-[70vh]'>

      {/* Ambient glow */}
      <div className='fixed top-20 right-20 w-[600px] h-[600px] bg-gradient-to-bl from-ios-blue/5 to-ios-purple/5 blur-[150px] rounded-full -z-10 pointer-events-none'></div>

      <div className='mb-8'>
        <Title text1={'My'} text2={'Orders'} />
      </div>

      <div className='flex flex-col gap-4'>
        {
          orderData.map((item, index) => (
            <div key={index} className='glass-heavy border border-white/10 rounded-2xl p-4 sm:p-5 animate-fade-in hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all duration-300'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-4'>
                  <div className='w-16 h-20 sm:w-20 sm:h-24 overflow-hidden rounded-xl bg-black/40 flex-shrink-0'>
                    <img className='w-full h-full object-cover' src={item.image[0]} alt="" />
                  </div>
                  <div className='min-w-0 flex flex-col justify-center py-0.5'>
                    <p className='text-base sm:text-lg font-bold text-white truncate mb-1'>{item.name}</p>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-0.5'>
                      <p className='text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple'>{currency}{item.price}</p>
                      <p className='text-[13px] text-ios-text-secondary font-light'>Qty: <span className='text-white font-medium'>{item.quantity}</span></p>
                      <p className='text-[13px] text-ios-text-secondary font-light'>Size: <span className='text-white font-medium px-1.5 py-0.5 bg-white/10 rounded-md border border-white/10'>{item.size}</span></p>
                    </div>
                    <p className='text-[13px] text-ios-text-secondary font-light mt-2 flex items-center gap-1.5'>
                        Date: <span className='text-white'>{new Date(item.date).toDateString()}</span>
                    </p>
                  </div>
                </div>

                <div className='flex items-center justify-between md:flex-col md:items-end gap-3 md:w-40 pl-1 md:pl-0 border-t md:border-t-0 border-white/10 pt-3 md:pt-0'>
                  <span className={`text-[12px] font-bold px-3 py-1.5 flex items-center gap-1.5 rounded-full tracking-wider uppercase ${getStatusColor(item.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor] animate-pulse`}></span>
                    {item.status}
                  </span>
                  <div className='flex items-center gap-2'>
                    {item.status !== 'Cancelled' && item.status !== 'Delivered' && item.status !== 'Shipped' && item.status !== 'Out for delivery' && (
                      <button onClick={() => cancelOrder(item.orderId)} className='bg-red-500/10 border border-red-500/30 text-red-500 font-semibold text-[13px] py-2 px-4 rounded-xl hover:bg-red-500/20 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] transition-all duration-300'>
                        Cancel
                      </button>
                    )}
                    <button onClick={() => navigate(`/track-order/${item.orderId || index}`, { state: { item } })} className='bg-white/5 border border-white/10 text-white font-semibold text-[13px] py-2 px-4 rounded-xl hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300'>
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {orderData.length === 0 && (
        <div className='glass-heavy border border-white/10 p-12 sm:p-16 rounded-[2rem] text-center shadow-ios-xl mt-8 relative overflow-hidden isolate'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-ios-purple/10 blur-[60px] rounded-full -z-10'></div>
          <p className='text-3xl sm:text-4xl font-black text-white tracking-tighter mb-3'>No orders yet.</p>
          <p className='text-base sm:text-lg text-ios-text-secondary font-light mb-8'>Your premium order history will appear here once you make a purchase.</p>
        </div>
      )}
    </div>
  )
}

export default Orders
