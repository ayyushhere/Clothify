import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='ios-card-elevated p-8 sm:p-12 text-center my-12'>
      <h3 className='ios-title text-ios-text-primary mb-2'>Stay Updated</h3>
      <p className='text-[15px] text-ios-text-tertiary mb-6 max-w-md mx-auto leading-relaxed'>
        Subscribe to receive exclusive updates on new arrivals, private sales, and limited edition releases.
      </p>
      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto'>
        <input className='ios-input flex-1' type="email" placeholder='Enter your email' required />
        <button type='submit' className='ios-btn-primary w-full sm:w-auto whitespace-nowrap'>
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
