import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className='animate-fade-in pb-10'>
      <h2 className='text-3xl font-black text-white tracking-tight mb-8'>Add New Product</h2>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-6 max-w-3xl'>

        {/* Image Upload */}
        <div className='glass-heavy p-6 shadow-ios-lg border border-white/10 rounded-[24px]'>
          <p className='text-[13px] font-bold text-ios-text-tertiary mb-4 uppercase tracking-widest'>Product Imagery</p>
          <div className='flex flex-wrap gap-4'>
            {[
              { state: image1, setter: setImage1, id: 'image1' },
              { state: image2, setter: setImage2, id: 'image2' },
              { state: image3, setter: setImage3, id: 'image3' },
              { state: image4, setter: setImage4, id: 'image4' },
            ].map(({ state, setter, id }) => (
              <label key={id} htmlFor={id} className='cursor-pointer group'>
                <div className={`w-24 h-28 rounded-xl overflow-hidden border-2 border-dashed transition-all duration-300 flex items-center justify-center ${state ? 'border-ios-blue shadow-[0_0_15px_rgba(10,132,255,0.2)]' : 'border-white/20 bg-black/40 hover:border-ios-blue hover:bg-ios-blue/5'}`}>
                  <img className={`object-cover transition-all duration-300 ${state ? 'w-full h-full' : 'w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 filter invert'}`} src={!state ? assets.upload_area : URL.createObjectURL(state)} alt="" />
                </div>
                <input onChange={(e) => setter(e.target.files[0])} type="file" id={id} hidden />
              </label>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className='glass-heavy p-6 shadow-ios-lg border border-white/10 rounded-[24px] flex flex-col gap-5'>
          <div>
            <p className='text-[13px] font-bold text-ios-text-tertiary mb-3 uppercase tracking-widest'>Product Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='ios-input' type="text" placeholder='e.g. Classic Obsidian Hoodie' required />
          </div>

          <div>
            <p className='text-[13px] font-bold text-ios-text-tertiary mb-3 uppercase tracking-widest'>Description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='ios-input' placeholder='Write a compelling product description...' required />
          </div>
        </div>

        {/* Category, Sub-Category, Price */}
        <div className='glass-heavy p-6 shadow-ios-lg border border-white/10 rounded-[24px]'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            <div>
              <p className='text-[13px] font-bold text-ios-text-tertiary mb-3 uppercase tracking-widest'>Category</p>
              <select onChange={(e) => setCategory(e.target.value)} className='ios-select w-full'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <p className='text-[13px] font-bold text-ios-text-tertiary mb-3 uppercase tracking-widest'>Sub Category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} className='ios-select w-full'>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div>
              <p className='text-[13px] font-bold text-ios-text-tertiary mb-3 uppercase tracking-widest'>Price</p>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-text-tertiary font-medium text-[16px]">$</span>
                 <input onChange={(e) => setPrice(e.target.value)} value={price} className='ios-input pl-8' type="Number" placeholder='120' />
              </div>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className='glass-heavy p-6 shadow-ios-lg border border-white/10 rounded-[24px]'>
          <p className='text-[13px] font-bold text-ios-text-tertiary mb-4 uppercase tracking-widest'>Available Sizes</p>
          <div className='flex flex-wrap gap-3'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                className={`min-w-[56px] h-[50px] px-4 rounded-xl text-[15px] font-bold transition-all duration-300 border ${sizes.includes(size) ? 'bg-ios-purple/20 text-white border-ios-purple/50 shadow-[0_0_15px_rgba(191,90,242,0.3)]' : 'bg-black/40 text-ios-text-secondary border-white/10 hover:bg-white/10 hover:border-white/20'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller + Submit */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-2'>
          <label className='flex items-center gap-3 cursor-pointer group p-4 glass-heavy rounded-[16px] border border-white/10 hover:border-white/20 transition-all w-full sm:w-auto'>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" className='ios-checkbox' />
            <span className='text-[15px] text-white font-medium group-hover:text-ios-blue transition-colors'>Mark as Bestseller</span>
          </label>

          <button type="submit" className='ios-btn-primary w-full sm:w-auto px-12 py-4 rounded-[16px] shadow-ios-lg text-[16px]'>
            Publish Product
          </button>
        </div>

      </form>
    </div>
  )
}

export default Add