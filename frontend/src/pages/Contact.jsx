import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className='pt-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative min-h-screen'>

      {/* Ambient glow */}
      <div className='absolute top-32 left-32 w-[600px] h-[600px] bg-gradient-to-tr from-ios-blue/5 to-ios-purple/10 blur-[150px] rounded-full -z-10 pointer-events-none'></div>

      <div className='mb-10 text-xl'>
        <Title text1={'Contact'} text2={'Us'} />
      </div>

      <div className='glass-heavy border border-white/10 rounded-[3rem] overflow-hidden mb-20 shadow-ios-xl relative isolate'>
        <div className='absolute -bottom-32 -right-32 w-80 h-80 bg-ios-blue/10 blur-[100px] rounded-full -z-10'></div>
        
        <div className='flex flex-col md:flex-row'>
          <img className='w-full md:w-[50%] object-cover min-h-[400px]' src={assets.contact_img} alt="Contact Clothify" />
          <div className='flex flex-col justify-center gap-8 p-10 md:p-16 flex-1 bg-black/30'>
            
            <div className='flex flex-col gap-2'>
              <p className='text-2xl font-black text-white tracking-tight mb-2'>Our Headquarters</p>
              <p className='text-[16px] text-ios-text-secondary leading-relaxed font-light'>
                54709 Luxury Avenue<br />
                Suite 350, Beverly Hills, CA
              </p>
            </div>
            
            <div className='w-12 h-[1px] bg-white/10'></div>

            <div className='flex flex-col gap-2'>
              <p className='text-[16px] text-ios-text-secondary leading-relaxed font-light'>
                Tel: <span className='text-white font-medium'>+1 (310) 555-0132</span><br />
                Email: <span className='text-white font-medium'>client@clothify.com</span>
              </p>
            </div>
            
            <div className='w-12 h-[1px] bg-white/10'></div>

            <div className='flex flex-col gap-4 mt-2'>
              <p className='text-2xl font-black text-white tracking-tight'>Careers at Clothify</p>
              <p className='text-[16px] text-ios-text-secondary font-light mb-2'>Join our elite team and help redefine the future of luxury shopping.</p>
              <button className='self-start bg-gradient-to-r from-ios-blue to-ios-purple text-white font-bold text-[15px] px-8 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(10,132,255,0.4)] hover:-translate-y-1 transition-all duration-300'>
                Explore Opportunities
              </button>
            </div>
            
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
