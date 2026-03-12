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
    <div className='pt-8'>

      <div className='mb-6'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      <div className='flex flex-col gap-3'>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='ios-card shadow-ios-sm p-4 flex items-center gap-4 animate-fade-in'>
                <img className='w-16 sm:w-20 rounded-ios-sm object-cover aspect-square' src={productData.image[0]} alt="" />
                <div className='flex-1 min-w-0'>
                  <p className='text-[15px] sm:text-[17px] font-medium text-ios-text-primary truncate'>{productData.name}</p>
                  <div className='flex items-center gap-3 mt-1'>
                    <p className='text-[15px] font-semibold text-ios-blue'>{currency}{productData.price}</p>
                    <span className='text-xs font-medium text-ios-text-tertiary bg-ios-fill px-2.5 py-0.5 rounded-ios-full'>{item.size}</span>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                    className='w-14 h-10 text-center rounded-ios-sm bg-ios-fill text-[15px] font-medium text-ios-text-primary outline-none focus:ring-2 focus:ring-ios-blue/20 transition-all' 
                    type="number" min={1} defaultValue={item.quantity} />
                  <button onClick={() => updateQuantity(item._id, item.size, 0)} className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-ios-red/10 transition-colors group'>
                    <img className='w-4 opacity-40 group-hover:opacity-80' src={assets.bin_icon} alt="" />
                  </button>
                </div>
              </div>
            )

          })
        }
      </div>

      {cartData.length === 0 && (
        <div className='ios-card shadow-ios-sm p-12 text-center'>
          <p className='ios-title text-ios-text-tertiary mb-2'>Your cart is empty</p>
          <p className='ios-subheadline mb-6'>Add some items to get started</p>
          <button onClick={() => navigate('/collection')} className='ios-btn-primary'>
            Browse Collection
          </button>
        </div>
      )}

      {cartData.length > 0 && (
        <div className='flex justify-end mt-8'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='w-full mt-6'>
              <button onClick={() => navigate('/place-order')} className='ios-btn-primary w-full'>
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
