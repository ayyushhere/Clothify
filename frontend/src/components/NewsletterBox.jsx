import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16'>
        <div className='relative overflow-hidden glass-heavy border border-white/10 rounded-[2rem] p-10 sm:p-16 text-center isolate hover:border-white/20 transition-colors duration-500 shadow-ios-xl'>
            
            {/* Ambient Background Glow inside Card */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-ios-blue/10 to-transparent blur-3xl -z-10'></div>
            
            <h3 className='text-3xl sm:text-4xl font-black text-white mb-4 tracking-tighter'>Curated Excellence. <span className='text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple'>Delivered.</span></h3>
            <p className='text-[15px] sm:text-[17px] text-ios-text-secondary mb-8 max-w-xl mx-auto leading-relaxed font-light'>
                Join our private newsletter to receive exclusive updates on new arrivals, intimate sales events, and limited edition drops.
            </p>
            
            <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto'>
                <input 
                    className='w-full sm:flex-1 bg-black/40 border border-white/20 text-white placeholder-white/40 text-[15px] px-6 py-4 rounded-full outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all duration-300' 
                    type="email" 
                    placeholder='Enter your email address' 
                    required 
                />
                <button type='submit' className='w-full sm:w-auto bg-gradient-to-r from-ios-blue to-ios-purple text-white font-bold text-[15px] px-8 py-4 rounded-full hover:shadow-[0_0_20px_rgba(10,132,255,0.5)] hover:scale-105 transition-all duration-300'>
                    Subscribe
                </button>
            </form>
        </div>
    </div>
  )
}

export default NewsletterBox
