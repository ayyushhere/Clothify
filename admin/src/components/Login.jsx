import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen bg-[#0a0a0c] flex items-center justify-center px-4 relative isolate'>
            
            {/* Ambient glows */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-ios-blue/10 to-ios-purple/10 blur-[150px] rounded-full -z-10 pointer-events-none'></div>

            <div className='glass-heavy p-10 sm:p-14 rounded-[3rem] w-[90%] max-w-lg border border-white/10 shadow-ios-xl relative overflow-hidden animate-scale-in'>
                
                <div className='mb-10 text-center relative z-10'>
                    <div className='flex items-center justify-center gap-3 mb-5'>
                        <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-ios-blue via-blue-500 to-ios-purple flex items-center justify-center shadow-[0_0_20px_rgba(10,132,255,0.4)]'>
                            <span className='text-white font-black text-2xl tracking-tighter'>C</span>
                        </div>
                    </div>
                    <h1 className='text-4xl sm:text-5xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple'>Clothify</h1>
                    <span className='px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide uppercase border border-white/5'>Admin Portal</span>
                </div>

                <form onSubmit={onSubmitHandler} className='relative z-10'>
                    <div className='mb-6'>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white outline-none focus:border-ios-blue transition-all duration-300' type="email" placeholder='Email Address' required />
                    </div>
                    <div className='mb-8'>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white outline-none focus:border-ios-purple transition-all duration-300' type="password" placeholder='Password' required />
                    </div>
                    <button className='w-full bg-gradient-to-r from-ios-blue to-ios-purple text-white font-bold text-[16px] py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(191,90,242,0.4)] transition-all duration-300 hover:-translate-y-1' type="submit">Access Secure Panel</button>
                </form>

            </div>
        </div>
    )
}

export default Login