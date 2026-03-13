import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='w-[220px] min-h-[calc(100vh-120px)] mt-2 flex-shrink-0'>
            <div className='flex flex-col gap-3 p-4 pt-6'>

                <NavLink className={({isActive}) => `flex items-center gap-4 px-5 py-4 rounded-2xl text-[16px] font-semibold transition-all duration-300 relative overflow-hidden group ${isActive ? 'bg-ios-blue/20 text-white border border-ios-blue/30 shadow-[0_0_20px_rgba(10,132,255,0.2)]' : 'text-ios-text-secondary hover:bg-white/5 border border-transparent'}`} to="/add">
                    {({isActive}) => (
                        <>
                            {/* Active glow effect */}
                            <div className={`absolute top-0 right-0 w-1 h-full bg-ios-blue transition-opacity duration-300 ${isActive ? 'opacity-100 shadow-[0_0_10px_#0A84FF]' : 'opacity-0'}`}></div>
                            <img className={`w-6 h-6 transition-all duration-300 filter brightness-0 invert ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} src={assets.add_icon} alt="" />
                            <p className='hidden md:block'>Add Items</p>
                        </>
                    )}
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-4 px-5 py-4 rounded-2xl text-[16px] font-semibold transition-all duration-300 relative overflow-hidden group ${isActive ? 'bg-ios-purple/20 text-white border border-ios-purple/30 shadow-[0_0_20px_rgba(191,90,242,0.2)]' : 'text-ios-text-secondary hover:bg-white/5 border border-transparent'}`} to="/list">
                    {({isActive}) => (
                        <>
                            {/* Active glow effect */}
                            <div className={`absolute top-0 right-0 w-1 h-full bg-ios-purple transition-opacity duration-300 ${isActive ? 'opacity-100 shadow-[0_0_10px_#BF5AF2]' : 'opacity-0'}`}></div>
                            <img className={`w-6 h-6 transition-all duration-300 filter brightness-0 invert ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} src={assets.order_icon} alt="" />
                            <p className='hidden md:block'>List Items</p>
                        </>
                    )}
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-4 px-5 py-4 rounded-2xl text-[16px] font-semibold transition-all duration-300 relative overflow-hidden group ${isActive ? 'bg-ios-green/20 text-white border border-ios-green/30 shadow-[0_0_20px_rgba(48,209,88,0.2)]' : 'text-ios-text-secondary hover:bg-white/5 border border-transparent'}`} to="/orders">
                    {({isActive}) => (
                        <>
                            {/* Active glow effect */}
                            <div className={`absolute top-0 right-0 w-1 h-full bg-ios-green transition-opacity duration-300 ${isActive ? 'opacity-100 shadow-[0_0_10px_#30D158]' : 'opacity-0'}`}></div>
                            <img className={`w-6 h-6 transition-all duration-300 filter brightness-0 invert ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} src={assets.order_icon} alt="" />
                            <p className='hidden md:block'>Orders</p>
                        </>
                    )}
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar