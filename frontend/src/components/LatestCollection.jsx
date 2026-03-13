import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products])

  return (
    <div className='my-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='mb-10 text-center flex flex-col items-center justify-center animate-slide-up'>
        <Title text1={'Latest'} text2={'Collections'} />
        <p className='text-ios-text-secondary text-[15px] sm:text-base md:text-lg leading-relaxed max-w-2xl font-light mt-2'>
          Discover our newest additions, featuring refined aesthetics and uncompromising quality tailored for the modern purveyor.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8'>
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
