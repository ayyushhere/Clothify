import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className='pt-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] animate-fade-in relative'>
      
      {/* Subtle Background Glow */}
      <div className='absolute top-20 right-10 w-96 h-96 bg-ios-blue/5 blur-[120px] rounded-full -z-10 pointer-events-none'></div>

      {/*----------- Product Data-------------- */}
      <div className='flex gap-10 sm:gap-16 flex-col lg:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-hidden justify-start sm:w-24 w-full gap-3 py-1 hide-scrollbar'>
              {
                productData.image.map((item,index)=>(
                  <img 
                    onClick={()=>setImage(item)} 
                    src={item} 
                    key={index} 
                    className={`w-[80px] h-[100px] object-cover rounded-xl cursor-pointer transition-all duration-300 border-2 ${image === item ? 'border-ios-blue shadow-[0_0_15px_rgba(10,132,255,0.4)] opacity-100' : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/20'}`} 
                    alt="" 
                  />
                ))
              }
          </div>
          {/* Main Image */}
          <div className='w-full lg:w-auto flex-1'>
            <div className='glass-heavy border border-white/10 rounded-3xl p-2 sm:p-4 overflow-hidden h-full aspect-[4/5] bg-black/40 flex items-center justify-center '>
              <img className='w-full h-full object-cover rounded-2xl' src={image} alt="" />
            </div>
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1 flex flex-col justify-center'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight mb-2'>{productData.name}</h1>
          
          <div className='flex items-center gap-2 mt-2 mb-6'>
              <div className='flex gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full'>
                <img src={assets.star_icon} alt="" className="w-3.5" />
                <img src={assets.star_icon} alt="" className="w-3.5" />
                <img src={assets.star_icon} alt="" className="w-3.5" />
                <img src={assets.star_icon} alt="" className="w-3.5" />
                <img src={assets.star_dull_icon} alt="" className="w-3.5" />
              </div>
              <p className='text-ios-text-tertiary text-sm ml-2 font-medium'>(122 Reviews)</p>
          </div>

          <p className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple mb-6'>{currency}{productData.price}</p>
          <p className='text-[16px] text-ios-text-secondary leading-relaxed font-light mb-8 max-w-xl'>{productData.description}</p>
          
          <div className='flex flex-col gap-4 mb-8'>
              <p className='text-sm uppercase tracking-[0.2em] text-ios-text-tertiary font-bold'>Select Size</p>
              <div className='flex gap-3 flex-wrap'>
                {productData.sizes.map((item,index)=>(
                  <button 
                    onClick={()=>setSize(item)} 
                    className={`min-w-[54px] h-[54px] rounded-2xl flex items-center justify-center text-[16px] font-bold transition-all duration-300 border ${item === size ? 'bg-ios-blue border-ios-blue text-white shadow-[0_0_20px_rgba(10,132,255,0.4)] scale-105' : 'bg-black/40 border-white/20 text-ios-text-secondary hover:text-white hover:border-white/40 hover:bg-white/10'}`} 
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
          </div>
          
          <button 
            onClick={()=>addToCart(productData._id,size)} 
            className='bg-gradient-to-r from-ios-blue to-ios-purple text-white font-bold text-lg px-8 py-5 rounded-2xl hover:shadow-[0_0_30px_rgba(10,132,255,0.5)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto sm:min-w-[280px] shadow-ios-lg'
          >
            Add to Cart
          </button>

          <div className='mt-10 pt-8 border-t border-white/10 grid grid-cols-1 gap-4 max-w-sm'>
            {[
              "100% Original Authentic Product",
              "Secure Encrypted Checkout",
              "Complimentary 7-Day Returns"
            ].map((text, idx) => (
              <p key={idx} className='text-[14px] text-ios-text-secondary flex items-center gap-3 font-light'>
                <span className='w-2 h-2 rounded-full bg-ios-blue shadow-[0_0_8px_rgba(10,132,255,0.8)]'></span>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-24 mb-16 max-w-5xl'>
        <div className='flex gap-2 mb-4'>
          <button className='px-8 py-4 text-[15px] font-bold bg-white/10 border border-white/10 text-white rounded-t-2xl sm:rounded-2xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]'>Description</button>
          <button className='px-8 py-4 text-[15px] font-medium text-ios-text-secondary hover:text-white transition-colors'>Reviews (122)</button>
        </div>
        <div className='glass-heavy border border-white/10 rounded-2xl sm:rounded-tr-2xl rounded-tl-none p-8 sm:p-12 shadow-ios-xl'>
          <p className='text-[16px] text-ios-text-secondary leading-relaxed mb-6 font-light'>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
          <p className='text-[16px] text-ios-text-secondary leading-relaxed font-light mb-0'>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
