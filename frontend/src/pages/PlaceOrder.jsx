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
        <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-8 pt-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-[80vh] relative'>
            
            {/* Ambient background glow */}
            <div className='absolute top-20 left-10 w-[500px] h-[500px] bg-ios-blue/10 blur-[150px] rounded-full -z-10 pointer-events-none'></div>

            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-6 w-full lg:max-w-[550px]'>

                <div className='mb-4'>
                    <Title text1={'Delivery'} text2={'Information'} />
                </div>

                <div className='glass-heavy border border-white/10 shadow-ios-xl p-8 sm:p-10 rounded-[2.5rem] flex flex-col gap-5 relative overflow-hidden isolate'>
                    
                    <div className='absolute -top-32 -left-32 w-64 h-64 bg-ios-purple/10 blur-[80px] rounded-full -z-10'></div>

                    <div className='flex gap-4'>
                        <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='w-full bg-black/40 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' type="text" placeholder='First name' />
                        <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='w-full bg-black/40 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' type="text" placeholder='Last name' />
                    </div>
                    <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full bg-black/40 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' type="email" placeholder='Email address' />
                    <input required onChange={onChangeHandler} name='street' value={formData.street} className='w-full bg-black/40 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' type="text" placeholder='Street address' />
                    <div className='flex gap-4'>
                        <input required onChange={onChangeHandler} name='city' value={formData.city} className='w-full bg-black/40 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' type="text" placeholder='City' />
                        <input onChange={onChangeHandler} name='state' value={formData.state} className='w-full bg-black/40 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' type="text" placeholder='State' />
                    </div>
                    <div className='flex gap-4'>
                        <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='w-full bg-black/40 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' type="number" placeholder='Zip code' />
                        <input required onChange={onChangeHandler} name='country' value={formData.country} className='w-full bg-black/40 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' type="text" placeholder='Country' />
                    </div>
                    <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='w-full bg-black/40 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none focus:border-ios-blue focus:shadow-[0_0_15px_rgba(10,132,255,0.3)] transition-all' type="number" placeholder='Phone number' />
                </div>
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-8 lg:mt-0 w-full lg:max-w-[480px]'>

                <div className='glass-heavy border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-ios-xl mb-8 relative overflow-hidden isolate'>
                    <CartTotal />
                </div>

                <div className='glass-heavy border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-ios-xl relative overflow-hidden isolate'>
                    <div className='absolute bottom-0 right-0 w-64 h-64 bg-ios-blue/10 blur-[80px] rounded-full -z-10'></div>
                    
                    <Title text1={'Payment'} text2={'Method'} />
                    
                    {/* Payment Method Selection */}
                    <div className='flex flex-col gap-4 mt-8'>
                        <div onClick={() => setMethod('stripe')} className={`bg-white/5 border rounded-2xl flex items-center gap-4 p-5 cursor-pointer transition-all duration-300 ${method === 'stripe' ? 'border-ios-blue shadow-[0_0_20px_rgba(10,132,255,0.3)]' : 'border-white/10 hover:border-white/30'}`}>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'stripe' ? 'border-ios-blue' : 'border-white/20'}`}>
                                {method === 'stripe' && <div className='w-3 h-3 rounded-full bg-ios-blue shadow-[0_0_8px_rgba(10,132,255,0.8)]'></div>}
                            </div>
                            <img className='h-7 object-contain mix-blend-screen opacity-90' src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className={`bg-white/5 border rounded-2xl flex items-center gap-4 p-5 cursor-pointer transition-all duration-300 ${method === 'razorpay' ? 'border-ios-blue shadow-[0_0_20px_rgba(10,132,255,0.3)]' : 'border-white/10 hover:border-white/30'}`}>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'razorpay' ? 'border-ios-blue' : 'border-white/20'}`}>
                                {method === 'razorpay' && <div className='w-3 h-3 rounded-full bg-ios-blue shadow-[0_0_8px_rgba(10,132,255,0.8)]'></div>}
                            </div>
                            <img className='h-7 object-contain mix-blend-screen opacity-90' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        <div onClick={() => setMethod('cod')} className={`bg-white/5 border rounded-2xl flex items-center gap-4 p-5 cursor-pointer transition-all duration-300 ${method === 'cod' ? 'border-ios-blue shadow-[0_0_20px_rgba(10,132,255,0.3)]' : 'border-white/10 hover:border-white/30'}`}>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'cod' ? 'border-ios-blue' : 'border-white/20'}`}>
                                {method === 'cod' && <div className='w-3 h-3 rounded-full bg-ios-blue shadow-[0_0_8px_rgba(10,132,255,0.8)]'></div>}
                            </div>
                            <p className='text-[16px] font-bold text-white tracking-widest'>Cash on Delivery</p>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <button type='submit' className='w-full bg-gradient-to-r from-ios-blue to-ios-purple text-white font-bold text-lg px-8 py-5 rounded-2xl hover:shadow-[0_0_30px_rgba(10,132,255,0.5)] hover:-translate-y-1 transition-all duration-300 active:scale-95'>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
