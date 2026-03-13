import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false)
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    }
    else {
      setVisible(false)
    }
  }, [location])

  return showSearch && visible ? (
    <div className='bg-ios-secondary-bg/80 backdrop-blur-lg border-b border-ios-separator-light py-3 px-4 animate-slide-down'>
      <div className='max-w-xl mx-auto flex items-center gap-3'>
        <div className='flex-1 flex items-center gap-3 bg-ios-fill/60 px-4 py-2.5 rounded-ios-sm transition-all focus-within:ring-2 focus-within:ring-ios-blue/20 focus-within:bg-ios-tertiary-bg focus-within:shadow-ios-sm'>
          <img className='w-4 opacity-40' src={assets.search_icon} alt="" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 outline-none bg-transparent text-[15px] text-ios-text-primary placeholder-ios-text-tertiary'
            type="text"
            placeholder='Search products...'
          />
          {search && (
            <button onClick={() => setSearch('')} className='w-5 h-5 flex items-center justify-center rounded-full bg-ios-text-tertiary/30'>
              <img className='w-2.5 opacity-80' src={assets.cross_icon} alt="" />
            </button>
          )}
        </div>
        <button onClick={() => setShowSearch(false)} className='text-ios-blue text-[15px] font-medium hover:opacity-70 transition-opacity'>
          Cancel
        </button>
      </div>
    </div>
  ) : null
}

export default SearchBar
