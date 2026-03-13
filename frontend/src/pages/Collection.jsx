import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-6 pt-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative'>
      
      {/* Background Ambience */}
      <div className='absolute top-20 left-10 w-64 h-64 bg-ios-blue/5 blur-[100px] rounded-full -z-10 pointer-events-none'></div>

      {/* Filter Options */}
      <div className='min-w-64 sm:sticky sm:top-28 h-fit'>
        <button onClick={()=>setShowFilter(!showFilter)} className='flex items-center gap-2 mb-6 sm:mb-8 text-xl font-bold text-white tracking-tight hover:text-ios-blue transition-colors'>
          Filters
          <img className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </button>

        {/* Category Filter */}
        <div className={`ios-card shadow-ios-sm p-4 mb-3 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='ios-footnote uppercase tracking-wider text-ios-text-tertiary mb-3 font-medium'>Categories</p>
          <div className='flex flex-col gap-3'>
            <label className='flex items-center gap-3 cursor-pointer min-h-[44px]'>
              <input className='ios-checkbox' type="checkbox" value={'Men'} onChange={toggleCategory}/>
              <span className='text-[15px] text-ios-text-primary'>Men</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer min-h-[44px]'>
              <input className='ios-checkbox' type="checkbox" value={'Women'} onChange={toggleCategory}/>
              <span className='text-[15px] text-ios-text-primary'>Women</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer min-h-[44px]'>
              <input className='ios-checkbox' type="checkbox" value={'Kids'} onChange={toggleCategory}/>
              <span className='text-[15px] text-ios-text-primary'>Kids</span>
            </label>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`ios-card shadow-ios-sm p-4 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='ios-footnote uppercase tracking-wider text-ios-text-tertiary mb-3 font-medium'>Type</p>
          <div className='flex flex-col gap-3'>
            <label className='flex items-center gap-3 cursor-pointer min-h-[44px]'>
              <input className='ios-checkbox' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>
              <span className='text-[15px] text-ios-text-primary'>Topwear</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer min-h-[44px]'>
              <input className='ios-checkbox' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>
              <span className='text-[15px] text-ios-text-primary'>Bottomwear</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer min-h-[44px]'>
              <input className='ios-checkbox' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>
              <span className='text-[15px] text-ios-text-primary'>Winterwear</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between items-center mb-6'>
            <Title text1={'All'} text2={'Collections'} />
            <select onChange={(e)=>setSortType(e.target.value)} className='ios-select'>
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
