import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='relative w-full overflow-hidden bg-black/50 mt-16 pt-16'>
      {/* Top Gradient Divider */}
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ios-blue/50 to-transparent'></div>
      
      {/* Subtle Background Glow */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-ios-blue/10 blur-[100px] z-0'></div>

      <div className='relative z-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pb-8'>
        <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 lg:gap-20 mb-12'>
          
          {/* Brand Column */}
          <div className='flex flex-col'>
            <Link to='/' className='cursor-pointer flex items-center gap-3 mb-6'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-ios-blue via-blue-500 to-ios-purple flex items-center justify-center shadow-[0_0_15px_rgba(10,132,255,0.3)]'>
                  <span className='text-white font-black text-md tracking-tighter'>C</span>
              </div>
              <h2 className='text-2xl font-black tracking-tighter text-white'>Clothify</h2>
            </Link>
            <p className='text-ios-text-secondary text-[15px] leading-relaxed max-w-sm font-light'>
              Experience the intersection of luxury and comfort. Discover meticulously curated pieces designed to elevate your everyday wardrobe.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className='text-[13px] font-bold text-white uppercase tracking-widest mb-6'>Company</h3>
            <ul className='flex flex-col gap-3 font-light'>
              {['Home', 'About Us', 'Latest Collection', 'Delivery Info', 'Privacy Policy'].map((item, idx) => (
                <li key={idx}>
                  <Link to='#' className='text-[15px] text-ios-text-secondary hover:text-white transition-colors duration-300'>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className='text-[13px] font-bold text-white uppercase tracking-widest mb-6'>Connect</h3>
            <ul className='flex flex-col gap-3 font-light'>
              <li>
                <a href='mailto:client@clothify.com' className='text-[15px] text-ios-text-secondary hover:text-white transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 rounded-full bg-ios-blue'></span> client@clothify.com
                </a>
              </li>
              <li>
                <a href='tel:+12124567890' className='text-[15px] text-ios-text-secondary hover:text-white transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 rounded-full bg-ios-purple'></span> +1 (212) 456-7890
                </a>
              </li>
              <li className='mt-4 flex gap-4'>
                {/* Social Icons Placeholder */}
                <div className='w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group'>
                  <span className='text-white group-hover:scale-110 transition-transform'>𝕏</span>
                </div>
                <div className='w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group'>
                  <span className='text-white group-hover:scale-110 transition-transform'>IG</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className='relative border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-[13px] text-ios-text-tertiary font-light'>
            © {new Date().getFullYear()} Clothify Luxury Brand. All rights reserved.
          </p>
          <div className='flex gap-6'>
            <a href='https://clothify-admin-beryl.vercel.app/' target='_blank' rel='noopener noreferrer' className='text-[13px] text-ios-text-tertiary hover:text-white cursor-pointer transition-colors font-bold'>Admin Panel</a>
            <span className='text-[13px] text-ios-text-tertiary hover:text-white cursor-pointer transition-colors font-light'>Terms</span>
            <span className='text-[13px] text-ios-text-tertiary hover:text-white cursor-pointer transition-colors font-light'>Privacy</span>
            <span className='text-[13px] text-ios-text-tertiary hover:text-white cursor-pointer transition-colors font-light'>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
