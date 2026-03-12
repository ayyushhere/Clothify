import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='glass-heavy border-t border-white/20 mt-8'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-12'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12'>

          <div>
            <Link to='/' className='cursor-pointer'>
              <h2 className='text-xl font-bold tracking-tight text-ios-text-primary mb-4'>Clothify</h2>
            </Link>
            <p className='text-ios-text-tertiary text-[15px] leading-relaxed max-w-sm'>
              Experience premium shopping with our curated collection. Quality meets style in every piece.
            </p>
          </div>

          <div>
            <p className='ios-headline text-ios-text-primary mb-4'>Company</p>
            <ul className='flex flex-col gap-2.5'>
              <li className='text-[15px] text-ios-text-tertiary hover:text-ios-blue cursor-pointer transition-colors'>Home</li>
              <li className='text-[15px] text-ios-text-tertiary hover:text-ios-blue cursor-pointer transition-colors'>About us</li>
              <li className='text-[15px] text-ios-text-tertiary hover:text-ios-blue cursor-pointer transition-colors'>Delivery</li>
              <li className='text-[15px] text-ios-text-tertiary hover:text-ios-blue cursor-pointer transition-colors'>Privacy policy</li>
            </ul>
          </div>

          <div>
            <p className='ios-headline text-ios-text-primary mb-4'>Get in Touch</p>
            <ul className='flex flex-col gap-2.5'>
              <li className='text-[15px] text-ios-text-tertiary hover:text-ios-blue cursor-pointer transition-colors'>+1-212-456-7890</li>
              <li className='text-[15px] text-ios-text-tertiary hover:text-ios-blue cursor-pointer transition-colors'>client@clothify.com</li>
            </ul>
          </div>

        </div>

        <div className='ios-separator my-8'></div>
        <p className='ios-caption text-center'>© 2024 Clothify. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
