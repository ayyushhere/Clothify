import React from 'react'

const Navbar = ({ setToken }) => {
  return (
    <nav className='glass sticky top-0 z-50 border-b border-ios-separator-light'>
      <div className='flex items-center justify-between py-4 px-6 lg:px-8'>
        <div className='flex items-center gap-3'>
          <h1 className='text-xl font-bold tracking-tight text-ios-text-primary'>Clothify</h1>
          <span className='text-[11px] font-medium text-ios-text-tertiary bg-ios-fill px-2.5 py-0.5 rounded-ios-full'>Admin</span>
        </div>
        <button onClick={() => setToken('')} className='ios-btn-danger text-[13px] px-5 py-2'>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar