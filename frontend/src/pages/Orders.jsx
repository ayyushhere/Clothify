import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

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
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  useEffect(() => {
    if (!token) {
    }
  }, [token])

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'bg-ios-green/20 text-ios-green border border-ios-green/30 shadow-[0_0_15px_rgba(52,199,89,0.3)]';
      case 'shipped': return 'bg-ios-blue/20 text-ios-blue border border-ios-blue/30 shadow-[0_0_15px_rgba(10,132,255,0.3)]';
      case 'packing': return 'bg-ios-orange/20 text-ios-orange border border-ios-orange/30 shadow-[0_0_15px_rgba(255,149,0,0.3)]';
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

      <div className='flex flex-col gap-6'>
        {
          orderData.map((item, index) => (
            <div key={index} className='glass-heavy border border-white/10 rounded-3xl p-6 sm:p-8 animate-fade-in hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] transition-all duration-500'>
              <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
                <div className='flex items-start gap-6'>
                  <div className='w-24 h-32 sm:w-28 sm:h-36 overflow-hidden rounded-2xl bg-black/40 flex-shrink-0'>
                    <img className='w-full h-full object-cover' src={item.image[0]} alt="" />
                  </div>
                  <div className='min-w-0 flex flex-col justify-center py-1'>
                    <p className='text-lg sm:text-xl font-bold text-white truncate mb-2'>{item.name}</p>
                    <div className='flex flex-wrap items-center gap-x-6 gap-y-2 mt-1'>
                      <p className='text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple'>{currency}{item.price}</p>
                      <p className='text-[14px] text-ios-text-secondary font-light'>Qty: <span className='text-white font-medium'>{item.quantity}</span></p>
                      <p className='text-[14px] text-ios-text-secondary font-light'>Size: <span className='text-white font-medium px-2 py-0.5 bg-white/10 rounded-md border border-white/10'>{item.size}</span></p>
                    </div>
                    <p className='text-[14px] text-ios-text-secondary font-light mt-4 flex items-center gap-2'>
                        Date: <span className='text-white'>{new Date(item.date).toDateString()}</span>
                    </p>
                    <p className='text-[14px] text-ios-text-secondary font-light mt-1 flex items-center gap-2'>
                        Payment: <span className='text-white tracking-wider uppercase text-xs'>{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                <div className='flex items-center justify-between lg:flex-col lg:items-end gap-5 lg:w-48 pl-2 lg:pl-0 border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0'>
                  <span className={`text-[13px] font-bold px-4 py-2 flex items-center gap-2 rounded-full tracking-wider uppercase ${getStatusColor(item.status)}`}>
                    <span className={`w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor] animate-pulse`}></span>
                    {item.status}
                  </span>
                  <button onClick={loadOrderData} className='bg-white/5 border border-white/10 text-white font-bold text-[14px] py-3 px-6 rounded-xl hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300'>
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {orderData.length === 0 && (
        <div className='glass-heavy border border-white/10 p-16 sm:p-24 rounded-[3rem] text-center shadow-ios-xl mt-8 relative overflow-hidden isolate'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-ios-purple/10 blur-[80px] rounded-full -z-10'></div>
          <p className='text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4'>No orders yet.</p>
          <p className='text-lg sm:text-xl text-ios-text-secondary font-light mb-10'>Your premium order history will appear here once you make a purchase.</p>
        </div>
      )}
    </div>
  )
}

export default Orders
