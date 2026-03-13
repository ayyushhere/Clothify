import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='pt-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative min-h-screen'>

      {/* Ambient glow */}
      <div className='absolute top-40 right-20 w-[500px] h-[500px] bg-ios-purple/5 blur-[120px] rounded-full -z-10 pointer-events-none'></div>

      <div className='mb-10 text-xl'>
        <Title text1={'About'} text2={'Us'} />
      </div>

      <div className='glass-heavy border border-white/10 rounded-[2.5rem] overflow-hidden mb-16 shadow-ios-xl relative isolate'>
        <div className='absolute -bottom-32 -left-32 w-64 h-64 bg-ios-blue/10 blur-[80px] rounded-full -z-10'></div>
        <div className='flex flex-col md:flex-row'>
          <img className='w-full md:w-[45%] object-cover min-h-[400px]' src={assets.about_img} alt="About Clothify" />
          <div className='flex flex-col justify-center gap-6 p-10 md:p-16 flex-1 bg-black/20'>
            <p className='text-[16px] text-ios-text-secondary leading-relaxed font-light mt-4'>Clothify was born out of a passion for innovation and a desire to revolutionize the way people shop. Our journey began with a simple idea: to provide a platform where customers can easily discover luxury.</p>
            <p className='text-[16px] text-ios-text-secondary leading-relaxed font-light'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality items. From fashion and beauty to electronics and home essentials, we offer an extensive collection.</p>
            <p className='text-2xl font-black text-white mt-4 tracking-tight'>Our Mission</p>
            <p className='text-[16px] text-ios-text-secondary leading-relaxed font-light'>Our mission at Clothify is to empower customers with choice, convenience, and absolute confidence. We're dedicated to providing a seamless, premium shopping experience that exceeds expectations at every turn.</p>
          </div>
        </div>
      </div>

      <div className='mb-10 text-xl'>
        <Title text1={'Why'} text2={'Choose Us'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
        <div className='glass-heavy border border-white/10 p-8 sm:p-10 rounded-[2.5rem] hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 transition-all duration-300 group'>
          <div className='w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-ios-blue/20 group-hover:border-ios-blue/30 transition-all duration-300'>
            <span className='text-ios-blue text-2xl font-black'>✓</span>
          </div>
          <p className='text-xl font-bold text-white mb-3'>Quality Assurance</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed font-light'>We meticulously select and vet each product to ensure it meets our extremely strict quality guidelines and standards.</p>
        </div>
        <div className='glass-heavy border border-white/10 p-8 sm:p-10 rounded-[2.5rem] hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 transition-all duration-300 group'>
          <div className='w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-ios-green/20 group-hover:border-ios-green/30 transition-all duration-300'>
            <span className='text-ios-green text-3xl'>♡</span>
          </div>
          <p className='text-xl font-bold text-white mb-3'>Convenience</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed font-light'>With our cinematic user interface and frictionless ordering process, premium shopping has never been easier.</p>
        </div>
        <div className='glass-heavy border border-white/10 p-8 sm:p-10 rounded-[2.5rem] hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 transition-all duration-300 group'>
          <div className='w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-ios-purple/20 group-hover:border-ios-purple/30 transition-all duration-300'>
            <span className='text-ios-purple text-2xl font-black'>★</span>
          </div>
          <p className='text-xl font-bold text-white mb-3'>Exceptional Service</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed font-light'>Our elite team of dedicated professionals is here to assist you, ensuring your absolute satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
