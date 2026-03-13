import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='mb-3 flex items-center gap-4'>
      <h2 className='text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter'>
        <span className='text-white'>{text1} </span>
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-ios-blue via-blue-400 to-ios-purple'>{text2}</span>
      </h2>
      <div className='w-8 sm:w-16 h-[2px] bg-gradient-to-r from-ios-blue to-transparent rounded-full'></div>
    </div>
  )
}

export default Title
