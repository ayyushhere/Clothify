import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-0 mt-6 rounded-ios-xl overflow-hidden ios-card-elevated animate-fade-in'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-20 px-8 sm:px-12 ios-hero-gradient'>
        <div className='text-ios-text-primary'>
          <p className='ios-caption uppercase tracking-wider mb-3 text-ios-blue font-semibold'>Featured</p>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4'>
            New<br />Season
          </h1>
          <p className='ios-subheadline mb-8 max-w-xs'>
            Discover the latest collection crafted for the modern lifestyle.
          </p>
          <button className='ios-btn-primary px-8'>
            Shop Now
          </button>
        </div>
      </div>
      {/* Hero Right Side */}
      <div className='w-full sm:w-1/2 relative'>
        <img className='w-full h-full object-cover min-h-[300px]' src={assets.hero_img} alt="Hero" />
        {/* Glass overlay label */}
        <div className='absolute bottom-6 left-6 right-6 glass-heavy rounded-ios-md px-5 py-3'>
          <p className='text-[13px] font-semibold text-ios-text-primary'>✨ Spring 2024 Collection</p>
          <p className='text-[12px] text-ios-text-tertiary'>Explore the newest arrivals</p>
        </div>
      </div>
    </div>
  )
}

export default Hero
