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
    <div className='min-h-[80vh] flex items-center justify-center pt-12 px-4'>
      
      {/* Ambient background glow */}
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-ios-blue/10 to-ios-purple/20 blur-[150px] rounded-full -z-10 pointer-events-none'></div>

      <form onSubmit={onSubmitHandler} className='glass-heavy border border-white/10 p-10 sm:p-14 w-full max-w-md rounded-[2.5rem] shadow-ios-xl relative overflow-hidden isolate'>
          
          {/* Inner ambient glow for form */}
          <div className='absolute -top-32 -right-32 w-64 h-64 bg-ios-blue/20 blur-[80px] rounded-full -z-10'></div>

          <h2 className='text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight text-center'>{currentState}</h2>
          <p className='text-[15px] sm:text-[16px] text-ios-text-secondary font-light text-center mb-10'>
            {currentState === 'Login' ? 'Welcome back to Clothify' : 'Join the Clothify society'}
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
