import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='animate-fade-in'>
      <h2 className='text-3xl font-black text-white tracking-tight mb-8'>Inventory Database</h2>

      {/* Table Header */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-6 glass-heavy rounded-t-[24px] border border-white/10 border-b-0 mb-[-1px] relative z-10'>
        <p className='text-xs font-bold text-ios-text-tertiary uppercase tracking-widest'>Preview</p>
        <p className='text-xs font-bold text-ios-text-tertiary uppercase tracking-widest'>Product Name</p>
        <p className='text-xs font-bold text-ios-text-tertiary uppercase tracking-widest'>Category</p>
        <p className='text-xs font-bold text-ios-text-tertiary uppercase tracking-widest'>Price</p>
        <p className='text-xs font-bold text-ios-text-tertiary uppercase tracking-widest text-right'>Action</p>
      </div>

      {/* Product List */}
      <div className='flex flex-col'>
        {
          list.map((item, index) => (
            <div className={`grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-4 px-6 glass-heavy border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 relative ${index === 0 ? 'md:rounded-t-none rounded-t-[24px]' : ''} ${index === list.length - 1 ? 'rounded-b-[24px]' : ''}`} key={index}>
              <img className='w-16 h-20 object-cover rounded-xl shadow-lg' src={item.image[0]} alt="" />
              <p className='truncate font-medium text-white text-[15px]'>{item.name}</p>
              <span className='w-fit px-3 py-1 rounded-full bg-white/5 text-ios-text-secondary text-[12px] font-medium border border-white/10'>{item.category}</span>
              <p className='font-bold text-ios-green text-[15px]'>{currency}{item.price}</p>
              <div className='flex justify-end'>
                <button onClick={() => removeProduct(item._id)} className='bg-ios-red/10 text-ios-red hover:bg-ios-red hover:text-white border border-ios-red/20 text-[13px] font-semibold px-4 py-2 rounded-xl transition-all duration-300'>
                  Remove
                </button>
              </div>
            </div>
          ))
        }
      </div>

      {list.length === 0 && (
        <div className='glass-heavy p-16 text-center rounded-[24px] border border-white/10 mt-4'>
          <p className='text-2xl font-bold text-white mb-2'>No active products</p>
          <p className='text-ios-text-tertiary'>Add a product to the inventory database to see it here.</p>
        </div>
      )}
    </div>
  )
}

export default List