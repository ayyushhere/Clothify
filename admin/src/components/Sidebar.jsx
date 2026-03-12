import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='w-[220px] min-h-[calc(100vh-65px)] glass-heavy border-r border-ios-separator-light flex-shrink-0'>
            <div className='flex flex-col gap-1 p-4 pt-6'>

                <NavLink className={({isActive}) => `flex items-center gap-3 px-4 py-3.5 rounded-ios-sm text-[15px] font-medium transition-all duration-200 ${isActive ? 'bg-ios-blue/10 text-ios-blue' : 'text-ios-text-secondary hover:bg-ios-fill/50'}`} to="/add">
                    <img className='w-5 h-5 opacity-60' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 px-4 py-3.5 rounded-ios-sm text-[15px] font-medium transition-all duration-200 ${isActive ? 'bg-ios-blue/10 text-ios-blue' : 'text-ios-text-secondary hover:bg-ios-fill/50'}`} to="/list">
                    <img className='w-5 h-5 opacity-60' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 px-4 py-3.5 rounded-ios-sm text-[15px] font-medium transition-all duration-200 ${isActive ? 'bg-ios-blue/10 text-ios-blue' : 'text-ios-text-secondary hover:bg-ios-fill/50'}`} to="/orders">
                    <img className='w-5 h-5 opacity-60' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar