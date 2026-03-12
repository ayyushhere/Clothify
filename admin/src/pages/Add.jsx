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
    <div className='animate-fade-in'>
      <h2 className='ios-title text-ios-text-primary mb-6'>Add New Item</h2>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 max-w-2xl'>

        {/* Image Upload */}
        <div className='ios-card-glass p-5'>
          <p className='ios-caption font-medium mb-3 uppercase tracking-wider'>Product Images</p>
          <div className='flex gap-3'>
            {[
              { state: image1, setter: setImage1, id: 'image1' },
              { state: image2, setter: setImage2, id: 'image2' },
              { state: image3, setter: setImage3, id: 'image3' },
              { state: image4, setter: setImage4, id: 'image4' },
            ].map(({ state, setter, id }) => (
              <label key={id} htmlFor={id} className='cursor-pointer group'>
                <div className='w-20 h-20 rounded-ios-sm overflow-hidden border-2 border-dashed border-ios-separator hover:border-ios-blue transition-colors'>
                  <img className='w-full h-full object-cover group-hover:opacity-75 transition-opacity' src={!state ? assets.upload_area : URL.createObjectURL(state)} alt="" />
                </div>
                <input onChange={(e) => setter(e.target.files[0])} type="file" id={id} hidden />
              </label>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className='ios-card-glass p-5 flex flex-col gap-4'>
          <div>
            <p className='ios-caption font-medium mb-2 uppercase tracking-wider'>Product Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='ios-input max-w-lg' type="text" placeholder='e.g. Classic Cotton Tee' required />
          </div>

          <div>
            <p className='ios-caption font-medium mb-2 uppercase tracking-wider'>Description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='ios-input max-w-lg' placeholder='Write a description...' required />
          </div>
        </div>

        {/* Category, Sub-Category, Price */}
        <div className='ios-card-glass p-5'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <p className='ios-caption font-medium mb-2 uppercase tracking-wider'>Category</p>
              <select onChange={(e) => setCategory(e.target.value)} className='ios-select w-full'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className='flex-1'>
              <p className='ios-caption font-medium mb-2 uppercase tracking-wider'>Sub Category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} className='ios-select w-full'>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div className='flex-1'>
              <p className='ios-caption font-medium mb-2 uppercase tracking-wider'>Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='ios-input' type="Number" placeholder='25' />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className='ios-card-glass p-5'>
          <p className='ios-caption font-medium mb-3 uppercase tracking-wider'>Sizes</p>
          <div className='flex gap-2'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                className={`min-w-[48px] h-[44px] px-4 rounded-ios-sm text-[14px] font-medium transition-all duration-200 ${sizes.includes(size) ? 'bg-ios-blue text-white shadow-ios-sm' : 'bg-ios-fill/70 backdrop-blur-sm text-ios-text-primary hover:bg-ios-fill'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller + Submit */}
        <div className='flex items-center justify-between'>
          <label className='flex items-center gap-3 cursor-pointer'>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" className='ios-checkbox' />
            <span className='text-[15px] text-ios-text-secondary font-medium'>Add to bestseller</span>
          </label>

          <button type="submit" className='ios-btn-primary px-10'>
            Add Item
          </button>
        </div>

      </form>
    </div>
  )
}

export default Add