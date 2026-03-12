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
        <nav className='sticky top-0 z-50 glass border-b border-ios-separator-light'>
            <div className='flex items-center justify-between py-4 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

                <Link to='/' className='cursor-pointer'>
                    <h1 className='text-2xl font-bold tracking-tight text-ios-text-primary'>Clothify</h1>
                </Link>

                <ul className='hidden sm:flex items-center gap-8'>
                    <NavLink to='/' className={({isActive}) => `flex flex-col items-center gap-1 text-[15px] font-medium transition-colors duration-200 ${isActive ? 'text-ios-blue' : 'text-ios-text-secondary hover:text-ios-blue'}`}>
                        Home
                    </NavLink>
                    <NavLink to='/collection' className={({isActive}) => `flex flex-col items-center gap-1 text-[15px] font-medium transition-colors duration-200 ${isActive ? 'text-ios-blue' : 'text-ios-text-secondary hover:text-ios-blue'}`}>
                        Collection
                    </NavLink>
                    <NavLink to='/about' className={({isActive}) => `flex flex-col items-center gap-1 text-[15px] font-medium transition-colors duration-200 ${isActive ? 'text-ios-blue' : 'text-ios-text-secondary hover:text-ios-blue'}`}>
                        About
                    </NavLink>
                    <NavLink to='/contact' className={({isActive}) => `flex flex-col items-center gap-1 text-[15px] font-medium transition-colors duration-200 ${isActive ? 'text-ios-blue' : 'text-ios-text-secondary hover:text-ios-blue'}`}>
                        Contact
                    </NavLink>
                </ul>

                <div className='flex items-center gap-5'>
                    {/* Search */}
                    <button
                        onClick={() => { setShowSearch(true); navigate('/collection') }}
                        className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-ios-fill/50 transition-colors duration-200'
                    >
                        <img src={assets.search_icon} className='w-5 opacity-70' alt="Search" />
                    </button>

                    {/* Profile */}
                    <div className='group relative'>
                        <button
                            onClick={() => token ? null : navigate('/login')}
                            className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-ios-fill/50 transition-colors duration-200'
                        >
                            <img className='w-5 opacity-70' src={assets.profile_icon} alt="Profile" />
                        </button>
                        {token &&
                            <div className='group-hover:block hidden absolute right-0 pt-3 z-50'>
                                <div className='ios-card shadow-ios-lg py-2 min-w-[180px] animate-scale-in'>
                                    <p onClick={() => navigate('/my-profile')} className='ios-list-cell cursor-pointer text-[15px] text-ios-text-primary rounded-t-ios-md'>My Profile</p>
                                    <div className='ios-separator mx-4'></div>
                                    <p onClick={() => navigate('/orders')} className='ios-list-cell cursor-pointer text-[15px] text-ios-text-primary'>Orders</p>
                                    <div className='ios-separator mx-4'></div>
                                    <p onClick={logout} className='ios-list-cell cursor-pointer text-[15px] text-ios-red rounded-b-ios-md'>Logout</p>
                                </div>
                            </div>}
                    </div>

                    {/* Cart */}
                    <Link to='/cart' className='relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-ios-fill/50 transition-colors duration-200'>
                        <img src={assets.cart_icon} className='w-5 opacity-70' alt="Cart" />
                        {getCartCount() > 0 && (
                            <span className='ios-badge absolute -top-0.5 -right-0.5'>{getCartCount()}</span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setVisible(true)} className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-ios-fill/50 transition-colors duration-200 sm:hidden'>
                        <img src={assets.menu_icon} className='w-5 opacity-70' alt="Menu" />
                    </button>
                </div>

            </div>

            {/* Mobile Sidebar Overlay */}
            {visible && <div className='ios-overlay sm:hidden' onClick={() => setVisible(false)}></div>}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 bottom-0 w-[300px] bg-white shadow-ios-xl z-50 transition-transform duration-350 ease-ios sm:hidden ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col h-full'>
                    {/* Close */}
                    <div className='flex items-center justify-between p-5 border-b border-ios-separator-light'>
                        <p className='ios-headline text-ios-text-primary'>Menu</p>
                        <button onClick={() => setVisible(false)} className='w-8 h-8 flex items-center justify-center rounded-full bg-ios-fill/70'>
                            <img className='h-3 opacity-60' src={assets.cross_icon} alt="Close" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <div className='flex flex-col p-4 gap-1'>
                        <NavLink onClick={() => setVisible(false)} className={({isActive}) => `px-4 py-3.5 rounded-ios-sm text-[17px] font-medium transition-all duration-200 ${isActive ? 'bg-ios-blue/10 text-ios-blue' : 'text-ios-text-primary hover:bg-ios-fill/50'}`} to='/'>
                            Home
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className={({isActive}) => `px-4 py-3.5 rounded-ios-sm text-[17px] font-medium transition-all duration-200 ${isActive ? 'bg-ios-blue/10 text-ios-blue' : 'text-ios-text-primary hover:bg-ios-fill/50'}`} to='/collection'>
                            Collection
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className={({isActive}) => `px-4 py-3.5 rounded-ios-sm text-[17px] font-medium transition-all duration-200 ${isActive ? 'bg-ios-blue/10 text-ios-blue' : 'text-ios-text-primary hover:bg-ios-fill/50'}`} to='/about'>
                            About
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className={({isActive}) => `px-4 py-3.5 rounded-ios-sm text-[17px] font-medium transition-all duration-200 ${isActive ? 'bg-ios-blue/10 text-ios-blue' : 'text-ios-text-primary hover:bg-ios-fill/50'}`} to='/contact'>
                            Contact
                        </NavLink>
                    </div>

                    {/* Bottom branding */}
                    <div className='mt-auto p-5 border-t border-ios-separator-light'>
                        <p className='ios-caption text-center'>Clothify</p>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar
