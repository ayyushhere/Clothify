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
      case 'delivered': return 'bg-ios-green text-white';
      case 'shipped': return 'bg-ios-blue text-white';
      case 'packing': return 'bg-ios-orange text-white';
      default: return 'bg-ios-fill text-ios-text-secondary';
    }
  }

  return (
    <div className='pt-8'>

      <div className='mb-6'>
        <Title text1={'My'} text2={'Orders'} />
      </div>

      <div className='flex flex-col gap-3'>
        {
          orderData.map((item, index) => (
            <div key={index} className='ios-card shadow-ios-sm p-4 sm:p-5 animate-fade-in'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-4'>
                  <img className='w-16 sm:w-20 rounded-ios-sm object-cover aspect-square' src={item.image[0]} alt="" />
                  <div className='min-w-0'>
                    <p className='text-[15px] sm:text-[17px] font-medium text-ios-text-primary truncate'>{item.name}</p>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5'>
                      <p className='text-[15px] font-semibold text-ios-blue'>{currency}{item.price}</p>
                      <p className='text-[13px] text-ios-text-tertiary'>Qty: {item.quantity}</p>
                      <p className='text-[13px] text-ios-text-tertiary'>Size: {item.size}</p>
                    </div>
                    <p className='text-[13px] text-ios-text-tertiary mt-1'>{new Date(item.date).toDateString()}</p>
                    <p className='text-[13px] text-ios-text-tertiary'>Payment: {item.paymentMethod}</p>
                  </div>
                </div>
                <div className='flex items-center justify-between md:flex-col md:items-end gap-3'>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-ios-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <button onClick={loadOrderData} className='ios-btn-secondary text-[14px] py-2 px-4'>
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {orderData.length === 0 && (
        <div className='ios-card shadow-ios-sm p-12 text-center'>
          <p className='ios-title text-ios-text-tertiary mb-2'>No orders yet</p>
          <p className='ios-subheadline'>Your order history will appear here</p>
        </div>
      )}
    </div>
  )
}

export default Orders
