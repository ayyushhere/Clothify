import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

  const { currency, addToCart } = useContext(ShopContext);

  return (
    <Link onClick={() => scrollTo(0, 0)} className='block group' to={`/product/${id}`}>
      <div className='ios-card-glass overflow-hidden hover:shadow-ios-lg transition-all duration-300 hover:-translate-y-1'>
        <div className='overflow-hidden relative aspect-[3/4]'>
          <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out' src={image[0]} alt={name} />
          
          {/* Frosted Quick Add Button */}
          <button
            onClick={(e) => { e.preventDefault(); addToCart(id, 'M'); }}
            className='absolute bottom-3 right-3 glass-heavy text-ios-text-primary text-xs font-semibold px-4 py-2 rounded-ios-full shadow-ios-sm hover:bg-ios-blue hover:text-white hover:backdrop-blur-none transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
          >
            Add
          </button>

          {/* Frosted gradient overlay at bottom */}
          <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
        <div className='p-4'>
          <p className='text-[15px] font-medium text-ios-text-primary truncate mb-1'>{name}</p>
          <p className='text-[15px] font-semibold text-ios-blue'>{currency}{price}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
