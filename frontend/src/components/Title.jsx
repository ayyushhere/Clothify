import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='mb-2'>
      <h2 className='ios-title text-ios-text-primary'>
        <span className='font-normal text-ios-text-tertiary'>{text1} </span>
        <span className='font-bold'>{text2}</span>
      </h2>
    </div>
  )
}

export default Title
