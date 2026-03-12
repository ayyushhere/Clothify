import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className='pt-8'>

      <div className='mb-6'>
        <Title text1={'Contact'} text2={'Us'} />
      </div>

      <div className='ios-card shadow-ios-sm overflow-hidden mb-12'>
        <div className='flex flex-col md:flex-row'>
          <img className='w-full md:w-[48%] object-cover min-h-[300px]' src={assets.contact_img} alt="" />
          <div className='flex flex-col justify-center gap-6 p-8 md:p-12 flex-1'>
            <div>
              <p className='ios-headline text-ios-text-primary mb-2'>Our Store</p>
              <p className='text-[15px] text-ios-text-secondary leading-relaxed'>54709 Willms Station<br />Suite 350, Washington, USA</p>
            </div>
            <div>
              <p className='text-[15px] text-ios-text-secondary leading-relaxed'>Tel: (415) 555-0132<br />Email: client@clothify.com</p>
            </div>
            <div>
              <p className='ios-headline text-ios-text-primary mb-2'>Careers at Clothify</p>
              <p className='text-[15px] text-ios-text-secondary mb-4'>Learn more about our teams and job openings.</p>
              <button className='ios-btn-secondary'>
                Explore Jobs
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
