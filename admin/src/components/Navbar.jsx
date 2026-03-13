import React from 'react'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between py-5 px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative z-50 mt-4 max-w-[1920px] mx-auto'>
      <div className='glass-heavy w-full rounded-ios-full px-6 py-4 flex items-center justify-between border border-white/10 shadow-ios-lg relative isolate'>
          {/* Ambient glow behind navbar */}
          <div className='absolute inset-0 bg-gradient-to-r from-ios-blue/10 to-ios-purple/10 rounded-ios-full blur-md -z-10'></div>
          
          <div className='flex items-center gap-4'>
             <h1 className='text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple'>Clothify</h1>
             <span className='px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide uppercase border border-white/5'>Admin</span>
          </div>

          <button onClick={() => setToken('')} className='bg-white/10 hover:bg-white/20 text-white border border-white/10 text-[14px] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'>
            Logout
          </button>
      </div>
    </div>
  )
}

export default Navbar