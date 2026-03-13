import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-20'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8'>
        
        <div className='glass-heavy border border-white/10 p-8 text-center rounded-3xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-500 group'>
          <div className='w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-ios-blue/10 group-hover:border-ios-blue/30 transition-all duration-500'>
            <img src={assets.exchange_icon} className='w-8 invert opacity-80 group-hover:opacity-100 transition-opacity' alt="" />
          </div>
          <p className='text-xl font-bold text-white mb-2 tracking-tight'>Easy Exchange</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed font-light'>Hassle-free exchange policy tailored for your utmost convenience.</p>
        </div>

        <div className='glass-heavy border border-white/10 p-8 text-center rounded-3xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-500 group'>
          <div className='w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-ios-green/10 group-hover:border-ios-green/30 transition-all duration-500'>
            <img src={assets.quality_icon} className='w-8 invert opacity-80 group-hover:opacity-100 transition-opacity' alt="" />
          </div>
          <p className='text-xl font-bold text-white mb-2 tracking-tight'>7-Day Returns</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed font-light'>Complimentary return policy within 7 days of your premium purchase.</p>
        </div>

        <div className='glass-heavy border border-white/10 p-8 text-center rounded-3xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-500 group'>
          <div className='w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-ios-purple/10 group-hover:border-ios-purple/30 transition-all duration-500'>
            <img src={assets.support_img} className='w-8 invert opacity-80 group-hover:opacity-100 transition-opacity' alt="" />
          </div>
          <p className='text-xl font-bold text-white mb-2 tracking-tight'>24/7 Concierge</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed font-light'>Best-in-class, dedicated white-glove support around the clock.</p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
