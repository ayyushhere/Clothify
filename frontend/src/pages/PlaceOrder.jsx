import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

    // Redirect if not logged in
    useState(() => {
        if (!token) {
        }
    }, [token])
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {

                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            if (!token) {
                toast.error("Please login to place an order")
                navigate('/login')
                return null
            }

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }


            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-8 pt-8 min-h-[80vh]'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='mb-2'>
                    <Title text1={'Delivery'} text2={'Information'} />
                </div>

                <div className='ios-card shadow-ios-sm p-5 flex flex-col gap-4'>
                    <div className='flex gap-3'>
                        <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='ios-input' type="text" placeholder='First name' />
                        <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='ios-input' type="text" placeholder='Last name' />
                    </div>
                    <input required onChange={onChangeHandler} name='email' value={formData.email} className='ios-input' type="email" placeholder='Email address' />
                    <input required onChange={onChangeHandler} name='street' value={formData.street} className='ios-input' type="text" placeholder='Street address' />
                    <div className='flex gap-3'>
                        <input required onChange={onChangeHandler} name='city' value={formData.city} className='ios-input' type="text" placeholder='City' />
                        <input onChange={onChangeHandler} name='state' value={formData.state} className='ios-input' type="text" placeholder='State' />
                    </div>
                    <div className='flex gap-3'>
                        <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='ios-input' type="number" placeholder='Zip code' />
                        <input required onChange={onChangeHandler} name='country' value={formData.country} className='ios-input' type="text" placeholder='Country' />
                    </div>
                    <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='ios-input' type="number" placeholder='Phone number' />
                </div>
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-4 sm:mt-0 w-full sm:max-w-[420px]'>

                <div className='mb-6'>
                    <CartTotal />
                </div>

                <div>
                    <Title text1={'Payment'} text2={'Method'} />
                    
                    {/* Payment Method Selection */}
                    <div className='flex flex-col gap-3 mt-4'>
                        <div onClick={() => setMethod('stripe')} className={`ios-card shadow-ios-sm flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 ${method === 'stripe' ? 'ring-2 ring-ios-blue' : 'hover:shadow-ios-md'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'stripe' ? 'border-ios-blue' : 'border-ios-separator'}`}>
                                {method === 'stripe' && <div className='w-2.5 h-2.5 rounded-full bg-ios-blue'></div>}
                            </div>
                            <img className='h-6' src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className={`ios-card shadow-ios-sm flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 ${method === 'razorpay' ? 'ring-2 ring-ios-blue' : 'hover:shadow-ios-md'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'razorpay' ? 'border-ios-blue' : 'border-ios-separator'}`}>
                                {method === 'razorpay' && <div className='w-2.5 h-2.5 rounded-full bg-ios-blue'></div>}
                            </div>
                            <img className='h-6' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        <div onClick={() => setMethod('cod')} className={`ios-card shadow-ios-sm flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 ${method === 'cod' ? 'ring-2 ring-ios-blue' : 'hover:shadow-ios-md'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'cod' ? 'border-ios-blue' : 'border-ios-separator'}`}>
                                {method === 'cod' && <div className='w-2.5 h-2.5 rounded-full bg-ios-blue'></div>}
                            </div>
                            <p className='text-[15px] font-medium text-ios-text-primary'>Cash on Delivery</p>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <button type='submit' className='ios-btn-primary w-full'>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
