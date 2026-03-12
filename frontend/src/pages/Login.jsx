import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className='min-h-[70vh] flex items-center justify-center pt-8'>
      <form onSubmit={onSubmitHandler} className='ios-card-elevated p-8 sm:p-10 w-full max-w-md animate-scale-in'>
          
          <h2 className='ios-large-title text-center text-ios-text-primary mb-2'>{currentState}</h2>
          <p className='ios-subheadline text-center mb-8'>
            {currentState === 'Login' ? 'Welcome back to Clothify' : 'Create your Clothify account'}
          </p>

          <div className='flex flex-col gap-4'>
            {currentState === 'Login' ? '' : (
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='ios-input' placeholder='Full Name' required/>
            )}
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='ios-input' placeholder='Email Address' required/>
            <input onChange={(e)=>setPasword(e.target.value)} value={password} type="password" className='ios-input' placeholder='Password' required/>
          </div>

          <div className='flex justify-between items-center mt-4 mb-6'>
              <p className='text-ios-blue text-[14px] cursor-pointer hover:opacity-70 transition-opacity'>Forgot password?</p>
              {
                currentState === 'Login' 
                ? <p onClick={()=>setCurrentState('Sign Up')} className='text-ios-blue text-[14px] cursor-pointer hover:opacity-70 transition-opacity font-medium'>Create account</p>
                : <p onClick={()=>setCurrentState('Login')} className='text-ios-blue text-[14px] cursor-pointer hover:opacity-70 transition-opacity font-medium'>Sign in instead</p>
              }
          </div>

          <button className='ios-btn-primary w-full text-[17px]'>
            {currentState === 'Login' ? 'Sign In' : 'Create Account'}
          </button>
      </form>
    </div>
  )
}

export default Login
