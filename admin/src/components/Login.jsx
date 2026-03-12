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
        <div className='min-h-screen ios-gradient-bg flex items-center justify-center px-4'>
            <div className='ios-card-elevated p-8 sm:p-10 max-w-md w-full animate-scale-in'>
                <div className='mb-8 text-center'>
                    <h1 className='ios-large-title text-ios-text-primary mb-1'>Clothify</h1>
                    <span className='text-[12px] font-medium text-ios-text-tertiary bg-ios-fill px-3 py-1 rounded-ios-full inline-block'>Admin Panel</span>
                </div>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-4'>
                        <p className='ios-caption mb-2 font-medium'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='ios-input' type="email" placeholder='admin@lumiere.com' required />
                    </div>
                    <div className='mb-6'>
                        <p className='ios-caption mb-2 font-medium'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='ios-input' type="password" placeholder='Enter your password' required />
                    </div>
                    <button className='ios-btn-primary w-full' type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login