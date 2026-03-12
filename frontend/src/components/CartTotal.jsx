import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='mb-4'>
        <Title text1={'Cart'} text2={'Totals'} />
      </div>

      <div className='ios-card p-4 shadow-ios-sm'>
        <div className='flex justify-between py-3'>
            <p className='text-[15px] text-ios-text-secondary'>Subtotal</p>
            <p className='text-[15px] font-medium text-ios-text-primary'>{currency} {getCartAmount()}.00</p>
        </div>
        <div className='ios-separator'></div>
        <div className='flex justify-between py-3'>
            <p className='text-[15px] text-ios-text-secondary'>Shipping Fee</p>
            <p className='text-[15px] font-medium text-ios-text-primary'>{currency} {delivery_fee}.00</p>
        </div>
        <div className='ios-separator'></div>
        <div className='flex justify-between py-3'>
            <p className='text-[17px] font-semibold text-ios-text-primary'>Total</p>
            <p className='text-[17px] font-bold text-ios-blue'>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
