import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

  const { currency, addToCart } = useContext(ShopContext);

  return (
    <Link onClick={() => scrollTo(0, 0)} className='block group h-full' to={`/product/${id}`}>
      <div className='glass-heavy border border-white/10 rounded-ios-xl overflow-hidden hover:shadow-[0_0_20px_rgba(10,132,255,0.15)] hover:border-ios-blue/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative isolate'>
        
        {/* Image Container with Zoom and Overlay */}
        <div className='overflow-hidden relative aspect-[4/5] bg-black/60'>
          <img 
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100' 
            src={image[0]} 
            alt={name} 
          />
          
          {/* Frosted Quick Add Button */}
          <button
            onClick={(e) => { e.preventDefault(); addToCart(id, 'M'); }}
            className='absolute bottom-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-ios-md hover:bg-ios-blue hover:border-ios-blue hover:shadow-[0_0_15px_rgba(10,132,255,0.6)] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 flex items-center gap-1 z-20'
          >
            <span className='text-lg leading-none mb-[2px]'>+</span> Add
          </button>

          {/* Frosted gradient overlay at bottom for text contrast if needed */}
          <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10'></div>
        </div>

        {/* Product Details Container */}
        <div className='p-5 flex-grow flex flex-col justify-end bg-gradient-to-b from-transparent to-black/30 relative z-20'>
          <p className='text-[15px] font-medium text-white truncate mb-2 tracking-tight'>{name}</p>
          <p className='text-[16px] font-bold text-ios-blue group-hover:text-ios-purple transition-colors duration-300'>{currency}{price}</p>
        </div>

      </div>
    </Link>
  )
}

export default ProductItem
