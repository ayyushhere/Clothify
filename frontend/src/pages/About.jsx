import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='pt-8'>

      <div className='mb-6'>
        <Title text1={'About'} text2={'Us'} />
      </div>

      <div className='ios-card shadow-ios-sm overflow-hidden mb-8'>
        <div className='flex flex-col md:flex-row'>
          <img className='w-full md:w-[45%] object-cover min-h-[300px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-5 p-8 md:p-12 flex-1'>
            <p className='text-[15px] text-ios-text-secondary leading-relaxed'>Clothify was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p className='text-[15px] text-ios-text-secondary leading-relaxed'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality items that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
            <p className='ios-headline text-ios-text-primary mt-2'>Our Mission</p>
            <p className='text-[15px] text-ios-text-secondary leading-relaxed'>Our mission at Clothify is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
        </div>
      </div>

      <div className='mb-6'>
        <Title text1={'Why'} text2={'Choose Us'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12'>
        <div className='ios-card shadow-ios-sm p-6 sm:p-8 hover:shadow-ios-md hover:-translate-y-0.5 transition-all duration-300'>
          <div className='w-10 h-10 bg-ios-blue/10 rounded-full flex items-center justify-center mb-4'>
            <span className='text-ios-blue text-lg'>✓</span>
          </div>
          <p className='ios-headline text-ios-text-primary mb-2'>Quality Assurance</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='ios-card shadow-ios-sm p-6 sm:p-8 hover:shadow-ios-md hover:-translate-y-0.5 transition-all duration-300'>
          <div className='w-10 h-10 bg-ios-green/10 rounded-full flex items-center justify-center mb-4'>
            <span className='text-ios-green text-lg'>♡</span>
          </div>
          <p className='ios-headline text-ios-text-primary mb-2'>Convenience</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='ios-card shadow-ios-sm p-6 sm:p-8 hover:shadow-ios-md hover:-translate-y-0.5 transition-all duration-300'>
          <div className='w-10 h-10 bg-ios-purple/10 rounded-full flex items-center justify-center mb-4'>
            <span className='text-ios-purple text-lg'>★</span>
          </div>
          <p className='ios-headline text-ios-text-primary mb-2'>Exceptional Service</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed'>Our team of dedicated professionals is here to assist you, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
