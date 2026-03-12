import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 py-12'>
      
      <div className='ios-card-glass p-6 text-center hover:shadow-ios-lg hover:-translate-y-1 transition-all duration-300'>
        <div className='w-14 h-14 glass-tinted rounded-full flex items-center justify-center mx-auto mb-4'>
          <img src={assets.exchange_icon} className='w-7 opacity-80' alt="" />
        </div>
        <p className='ios-headline text-ios-text-primary mb-1'>Easy Exchange</p>
        <p className='ios-footnote'>Hassle-free exchange policy for your convenience</p>
      </div>

      <div className='ios-card-glass p-6 text-center hover:shadow-ios-lg hover:-translate-y-1 transition-all duration-300'>
        <div className='w-14 h-14 bg-ios-green/8 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-ios-green/10'>
          <img src={assets.quality_icon} className='w-7 opacity-80' alt="" />
        </div>
        <p className='ios-headline text-ios-text-primary mb-1'>7-Day Returns</p>
        <p className='ios-footnote'>Free return policy within 7 days of purchase</p>
      </div>

      <div className='ios-card-glass p-6 text-center hover:shadow-ios-lg hover:-translate-y-1 transition-all duration-300'>
        <div className='w-14 h-14 bg-ios-purple/8 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-ios-purple/10'>
          <img src={assets.support_img} className='w-7 opacity-80' alt="" />
        </div>
        <p className='ios-headline text-ios-text-primary mb-1'>24/7 Support</p>
        <p className='ios-footnote'>Best-in-class customer support around the clock</p>
      </div>

    </div>
  )
}

export default OurPolicy
