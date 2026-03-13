import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='relative w-full rounded-ios-xl overflow-hidden min-h-[750px] flex flex-col items-center justify-between mt-6 animate-fade-in shadow-ios-xl'>
      
      {/* Background Image & Overlay */}
      <div className='absolute inset-0 z-0'>
        {/* Dark, cinematic fashion image */}
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Fashion" 
          className='w-full h-full object-cover origin-center transform scale-105 animate-[scale-in_10s_ease-out_forwards]' 
        />
        {/* Deep gradient overlay for text readability and moody feel */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 backdrop-blur-[4px]'></div>
      </div>

      {/* Main Content (Centered) */}
      <div className='relative z-10 flex flex-col items-center text-center w-full max-w-5xl px-4 pt-32 pb-12'>
        
        {/* Top Badge */}
        <div className='glass-ultra-thin border border-white/20 rounded-full px-6 py-2 mb-8 flex items-center justify-center gap-2.5 animate-slide-up shadow-ios-sm'>
          <span className='w-2 h-2 rounded-full bg-ios-blue animate-pulse'></span>
          <span className='text-[12px] font-bold uppercase tracking-[0.2em] text-white'>
            The Fall Collection
          </span>
        </div>

        {/* Hero Title */}
        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.05] animate-slide-up text-white' style={{ animationDelay: '0.1s' }}>
          Redefine <br/>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-ios-blue via-blue-400 to-ios-purple'>Your Aesthetic.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className='text-ios-text-secondary text-lg md:text-xl max-w-2xl mb-12 text-center animate-slide-up leading-relaxed font-light' style={{ animationDelay: '0.2s' }}>
          Experience the intersection of luxury and comfort. Discover meticulously curated pieces designed to elevate your everyday wardrobe.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto animate-slide-up' style={{ animationDelay: '0.3s' }}>
          <Link to='/collection' className='ios-btn-primary px-12 py-4 text-lg w-full sm:w-auto shadow-ios-lg hover:shadow-ios-xl hover:scale-105 transition-all duration-300'>
            Explore Collection
          </Link>
          <Link to='/login' className='glass-heavy border border-white/20 text-white font-semibold rounded-ios-full px-12 py-4 text-lg w-full sm:w-auto hover:bg-white/10 transition-all duration-300 shadow-ios-md hover:shadow-ios-lg'>
            Sign In
          </Link>
        </div>
      </div>

      {/* Bottom Overlapping Feature Cards - Deep Glassmorphism */}
      <div className='relative z-10 w-full max-w-[1400px] px-4 sm:px-8 pb-10 mt-auto grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up' style={{ animationDelay: '0.5s' }}>
        
        {/* Card 1: Trends */}
        <div className='glass-heavy border border-white/15 p-8 rounded-ios-xl text-left hover:-translate-y-2 hover:bg-white/10 transition-all duration-500 shadow-ios-md group cursor-default'>
          <div className='w-14 h-14 rounded-ios-lg glass-light flex items-center justify-center mb-6 border border-white/20 shadow-inner group-hover:bg-ios-blue/20 transition-colors'>
            <svg className='w-7 h-7 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-white mb-3 tracking-tight'>Real-time Trends</h3>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed font-light'>
            Receive instant notifications about the latest fashion drops and exclusives tailored to your style preferences.
          </p>
        </div>

        {/* Card 2: Quality */}
        <div className='glass-heavy border border-white/15 p-8 rounded-ios-xl text-left hover:-translate-y-2 hover:bg-white/10 transition-all duration-500 shadow-ios-md group cursor-default'>
          <div className='w-14 h-14 rounded-ios-lg glass-light flex items-center justify-center mb-6 border border-white/20 shadow-inner group-hover:bg-ios-green/20 transition-colors'>
            <svg className='w-7 h-7 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-white mb-3 tracking-tight'>Premium Quality</h3>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed font-light'>
            Every garment is crafted from the finest materials, ensuring unparalleled comfort and lasting durability.
          </p>
        </div>

        {/* Card 3: Experts */}
        <div className='glass-heavy border border-white/15 p-8 rounded-ios-xl text-left hover:-translate-y-2 hover:bg-white/10 transition-all duration-500 shadow-ios-md group cursor-default'>
          <div className='w-14 h-14 rounded-ios-lg glass-light flex items-center justify-center mb-6 border border-white/20 shadow-inner group-hover:bg-ios-purple/20 transition-colors'>
            <svg className='w-7 h-7 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-white mb-3 tracking-tight'>Expert Stylists</h3>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed font-light'>
            Our in-house fashion experts review and curate every collection to guarantee authenticity and perfect styling.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Hero
