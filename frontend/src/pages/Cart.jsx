import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='pt-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative min-h-[60vh]'>

      {/* Background Ambience */}
      <div className='absolute top-20 left-10 w-96 h-96 bg-ios-purple/5 blur-[120px] rounded-full -z-10 pointer-events-none'></div>

      <div className='mb-10'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      <div className='flex flex-col gap-6'>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='glass-heavy border border-white/10 rounded-[2rem] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all duration-500'>
                <div className='w-24 h-32 sm:w-32 sm:h-40 overflow-hidden rounded-2xl bg-black/40 flex-shrink-0'>
                  <img className='w-full h-full object-cover' src={productData.image[0]} alt="" />
                </div>
                
                <div className='flex-1 w-full'>
                  <p className='text-xl sm:text-2xl font-black text-white truncate mb-2 tracking-tight'>{productData.name}</p>
                  <div className='flex items-center gap-4 mt-2'>
                    <p className='text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple'>{currency}{productData.price}</p>
                    <span className='px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-xs font-bold text-white tracking-widest uppercase shadow-inner'>{item.size}</span>
                  </div>
                </div>

                <div className='flex items-center gap-4 sm:gap-6 w-full sm:w-auto mt-4 sm:mt-0'>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                    className='w-20 h-14 text-center rounded-2xl bg-black/40 border border-white/20 text-lg font-bold text-white outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' 
                    type="number" min={1} defaultValue={item.quantity} />
                  
                  <button onClick={() => updateQuantity(item._id, item.size, 0)} className='w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all group shrink-0'>
                    <img className='w-5 invert opacity-50 group-hover:opacity-100 transition-opacity' src={assets.bin_icon} alt="" />
                  </button>
                </div>
              </div>
            )

          })
        }
      </div>

      {cartData.length === 0 && (
        <div className='glass-heavy border border-white/10 rounded-[3rem] p-16 sm:p-24 text-center shadow-ios-xl mt-8 relative overflow-hidden isolate'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-ios-blue/10 blur-[80px] rounded-full -z-10'></div>
          <p className='text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4'>Your cart is empty.</p>
          <p className='text-lg sm:text-xl text-ios-text-secondary font-light mb-10 max-w-md mx-auto'>Discover our exclusive collections to begin your luxury journey.</p>
          <button onClick={() => navigate('/collection')} className='bg-gradient-to-r from-ios-blue to-ios-purple text-white font-bold text-lg px-12 py-5 rounded-full hover:shadow-[0_0_30px_rgba(10,132,255,0.5)] hover:scale-105 transition-all duration-300 active:scale-95'>
            Explore Collections
          </button>
        </div>
      )}

      {cartData.length > 0 && (
        <div className='flex justify-end mt-16 pb-12'>
          <div className='w-full sm:w-[500px] glass-heavy border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-ios-xl'>
            <CartTotal />
            <div className='w-full mt-10'>
              <button onClick={() => navigate('/place-order')} className='w-full bg-gradient-to-r from-ios-blue to-ios-purple text-white font-bold text-lg px-8 py-5 rounded-2xl hover:shadow-[0_0_30px_rgba(10,132,255,0.5)] hover:-translate-y-1 transition-all duration-300 active:scale-95'>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart
