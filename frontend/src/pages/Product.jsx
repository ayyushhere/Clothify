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
    <div className='pt-8 animate-fade-in'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-8 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2'>
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className={`w-[24%] sm:w-full sm:mb-1 flex-shrink-0 cursor-pointer rounded-ios-sm object-cover transition-all duration-200 ${image === item ? 'ring-2 ring-ios-blue ring-offset-2' : 'opacity-70 hover:opacity-100'}`} alt="" />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto rounded-ios-lg shadow-ios-sm' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='text-2xl font-semibold text-ios-text-primary tracking-tight'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-4" />
              <img src={assets.star_icon} alt="" className="w-4" />
              <img src={assets.star_icon} alt="" className="w-4" />
              <img src={assets.star_icon} alt="" className="w-4" />
              <img src={assets.star_dull_icon} alt="" className="w-4" />
              <p className='text-ios-text-tertiary text-sm ml-1'>(122)</p>
          </div>
          <p className='mt-4 text-3xl font-bold text-ios-text-primary'>{currency}{productData.price}</p>
          <p className='mt-4 text-[15px] text-ios-text-secondary leading-relaxed'>{productData.description}</p>
          
          <div className='flex flex-col gap-3 my-6'>
              <p className='ios-headline text-ios-text-primary'>Select Size</p>
              <div className='flex gap-2 flex-wrap'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`min-w-[48px] h-[44px] px-4 rounded-ios-sm text-[15px] font-medium transition-all duration-200 ${item === size ? 'bg-ios-blue text-white shadow-ios-sm' : 'bg-ios-fill text-ios-text-primary hover:bg-ios-fill-secondary'}`} key={index}>{item}</button>
                ))}
              </div>
          </div>
          
          <button onClick={()=>addToCart(productData._id,size)} className='ios-btn-primary w-full sm:w-auto'>
            Add to Cart
          </button>

          <div className='ios-card shadow-ios-sm p-4 mt-6'>
            <div className='flex flex-col gap-2'>
              <p className='text-[14px] text-ios-text-secondary flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full bg-ios-green inline-block'></span>
                100% Original product
              </p>
              <p className='text-[14px] text-ios-text-secondary flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full bg-ios-green inline-block'></span>
                Cash on delivery available
              </p>
              <p className='text-[14px] text-ios-text-secondary flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full bg-ios-green inline-block'></span>
                Easy return within 7 days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-16'>
        <div className='flex gap-1'>
          <button className='px-6 py-3 text-[15px] font-semibold bg-ios-blue text-white rounded-t-ios-sm'>Description</button>
          <button className='px-6 py-3 text-[15px] font-medium text-ios-text-tertiary bg-ios-fill rounded-t-ios-sm hover:bg-ios-fill-secondary transition-colors'>Reviews (122)</button>
        </div>
        <div className='ios-card rounded-t-none p-6 shadow-ios-sm'>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed mb-4'>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
          <p className='text-[15px] text-ios-text-secondary leading-relaxed'>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
