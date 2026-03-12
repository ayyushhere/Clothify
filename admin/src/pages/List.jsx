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
      <h2 className='ios-title text-ios-text-primary mb-6'>All Products</h2>

      {/* Table Header */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-5 glass rounded-t-ios-md border-b border-ios-separator-light'>
        <p className='ios-caption font-semibold uppercase tracking-wider'>Image</p>
        <p className='ios-caption font-semibold uppercase tracking-wider'>Name</p>
        <p className='ios-caption font-semibold uppercase tracking-wider'>Category</p>
        <p className='ios-caption font-semibold uppercase tracking-wider'>Price</p>
        <p className='ios-caption font-semibold uppercase tracking-wider text-center'>Action</p>
      </div>

      {/* Product List */}
      <div className='flex flex-col'>
        {
          list.map((item, index) => (
            <div className={`grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-4 px-5 ios-card-glass border border-white/20 text-sm hover:shadow-ios-md transition-all duration-200 ${index === 0 ? 'md:rounded-t-none' : ''} ${index === list.length - 1 ? 'rounded-b-ios-md' : ''}`} key={index}>
              <img className='w-14 h-16 object-cover rounded-ios-sm' src={item.image[0]} alt="" />
              <p className='truncate font-medium text-ios-text-primary'>{item.name}</p>
              <p className='text-ios-text-tertiary text-[13px]'>{item.category}</p>
              <p className='font-semibold text-ios-blue'>{currency}{item.price}</p>
              <div className='flex justify-end md:justify-center'>
                <button onClick={() => removeProduct(item._id)} className='ios-btn-danger text-[13px] px-4 py-1.5'>
                  Remove
                </button>
              </div>
            </div>
          ))
        }
      </div>

      {list.length === 0 && (
        <div className='ios-card-glass p-12 text-center rounded-ios-md'>
          <p className='ios-title text-ios-text-tertiary mb-1'>No products</p>
          <p className='ios-footnote'>Add your first product to get started</p>
        </div>
      )}
    </div>
  )
}

export default List