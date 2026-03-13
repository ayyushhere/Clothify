import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='sticky top-4 z-50 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] w-full transition-all duration-300'>
            <nav className='glass-heavy border border-white/10 rounded-full px-6 py-3.5 flex items-center justify-between shadow-ios-lg bg-black/40 backdrop-blur-2xl'>

                {/* Logo Area */}
                <Link to='/' className='cursor-pointer flex items-center gap-3 group'>
                    <div className='w-9 h-9 rounded-full bg-gradient-to-tr from-ios-blue via-blue-500 to-ios-purple flex items-center justify-center shadow-ios-md group-hover:scale-110 transition-transform duration-300'>
                        <span className='text-white font-black text-lg tracking-tighter'>C</span>
                    </div>
                    <h1 className='text-2xl font-black tracking-tighter text-white group-hover:text-ios-blue transition-colors duration-300'>Clothify</h1>
                </Link>

                {/* Desktop Nav Links */}
                <ul className='hidden lg:flex items-center gap-8'>
                    {['Home', 'Collection', 'About', 'Contact'].map((item, index) => (
                        <NavLink 
                            key={index}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                            className={({isActive}) => `relative text-[15px] font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-ios-text-secondary hover:text-white'}`}
                        >
                            {({isActive}) => (
                                <>
                                    {item}
                                    {isActive && <span className='absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ios-blue shadow-[0_0_8px_rgba(10,132,255,0.8)] animate-fade-in'></span>}
                                </>
                            )}
                        </NavLink>
                    ))}
                </ul>

                {/* Right Actions */}
                <div className='flex items-center gap-3 sm:gap-5'>
                    {/* Search */}
                    <button
                        onClick={() => { setShowSearch(true); navigate('/collection') }}
                        className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 group'
                    >
                        <img src={assets.search_icon} className='w-[18px] opacity-80 group-hover:opacity-100 invert transition-opacity' alt="Search" />
                    </button>

                    {/* Profile */}
                    <div className='group relative'>
                        <button
                            onClick={() => token ? null : navigate('/login')}
                            className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200'
                        >
                            <img className='w-[18px] opacity-80 group-hover:opacity-100 invert transition-opacity' src={assets.profile_icon} alt="Profile" />
                        </button>
                        {token &&
                            <div className='group-hover:block hidden absolute right-0 pt-4 z-50'>
                                <div className='glass-heavy border border-white/10 shadow-ios-xl py-2 min-w-[200px] rounded-ios-xl animate-scale-in'>
                                    <div className='px-4 py-2 border-b border-white/10 mb-2'>
                                        <p className='text-xs text-ios-text-tertiary uppercase tracking-wider font-bold'>Account</p>
                                    </div>
                                    <p onClick={() => navigate('/my-profile')} className='px-4 py-2.5 mx-2 rounded-ios-md cursor-pointer text-[14px] text-white hover:bg-white/10 transition-colors mb-1'>My Profile</p>
                                    <p onClick={() => navigate('/orders')} className='px-4 py-2.5 mx-2 rounded-ios-md cursor-pointer text-[14px] text-white hover:bg-white/10 transition-colors mb-2'>Orders</p>
                                    <div className='border-t border-white/10 pt-2'>
                                        <p onClick={logout} className='px-4 py-2.5 mx-2 rounded-ios-md cursor-pointer text-[14px] font-medium text-ios-red hover:bg-ios-red/10 transition-colors'>Logout</p>
                                    </div>
                                </div>
                            </div>}
                    </div>

                    {/* Cart */}
                    <Link to='/cart' className='relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 group'>
                        <img src={assets.cart_icon} className='w-[18px] opacity-80 group-hover:opacity-100 invert transition-opacity' alt="Cart" />
                        {getCartCount() > 0 && (
                            <span className='absolute top-1.5 right-1.5 w-4 h-4 bg-ios-blue text-white flex items-center justify-center rounded-full text-[10px] font-bold shadow-[0_0_10px_rgba(10,132,255,0.5)]'>
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setVisible(true)} className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 lg:hidden group'>
                        <img src={assets.menu_icon} className='w-[18px] opacity-80 group-hover:opacity-100 invert transition-opacity' alt="Menu" />
                    </button>
                </div>

            </nav>

            {/* Mobile Sidebar Overlay */}
            {visible && <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden animate-fade-in' onClick={() => setVisible(false)}></div>}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 bottom-0 w-[320px] glass-heavy border-l border-white/10 shadow-ios-xl z-[70] transition-transform duration-300 ease-ios lg:hidden flex flex-col ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className='flex items-center justify-between p-6 border-b border-white/10'>
                    <div className='flex items-center gap-2'>
                        <div className='w-6 h-6 rounded-full bg-gradient-to-tr from-ios-blue to-ios-purple flex items-center justify-center'>
                            <span className='text-white font-black text-xs'>C</span>
                        </div>
                        <p className='text-lg font-bold text-white tracking-tight'>Menu</p>
                    </div>
                    <button onClick={() => setVisible(false)} className='w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors'>
                        <img className='h-3 invert opacity-80' src={assets.cross_icon} alt="Close" />
                    </button>
                </div>

                {/* Nav Links */}
                <div className='flex flex-col p-4 gap-2 flex-grow'>
                    {['Home', 'Collection', 'About', 'Contact'].map((item, index) => (
                        <NavLink 
                            key={index}
                            onClick={() => setVisible(false)} 
                            className={({isActive}) => `px-5 py-4 rounded-ios-lg text-[16px] font-medium transition-all duration-200 flex items-center justify-between ${isActive ? 'bg-ios-blue/20 text-white border border-ios-blue/30 shadow-[0_0_15px_rgba(10,132,255,0.15)]' : 'text-ios-text-secondary hover:text-white hover:bg-white/5'}`} 
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                        >
                            {item}
                        </NavLink>
                    ))}
                </div>

                {/* Bottom branding */}
                <div className='p-6 border-t border-white/10 mt-auto'>
                    <p className='text-[13px] text-center text-ios-text-tertiary uppercase tracking-widest font-bold'>Clothify Est. 2024</p>
                </div>
            </div>

        </div>
    )
}

export default Navbar
