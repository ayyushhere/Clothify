import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestseller));
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <div className='my-24 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative'>
      {/* Subtle Background Glow for Bestsellers */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-ios-purple/5 blur-[120px] rounded-full z-0 pointer-events-none'></div>

      <div className='relative z-10 mb-10 text-center flex flex-col items-center justify-center animate-slide-up'>
        <Title text1={'Best'} text2={'Sellers'} />
        <p className='text-ios-text-secondary text-[15px] sm:text-base md:text-lg leading-relaxed max-w-2xl font-light mt-2'>
          Explore our most coveted pieces, loved for their timeless design and exceptional craftsmanship.
        </p>
      </div>

      <div className='relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8'>
        {
          bestSeller.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller
