import React, { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const TrackOrder = () => {
  const { orderId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { currency } = useContext(ShopContext)

  const item = location.state?.item

  if (!item) {
    return (
      <div className='pt-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative min-h-[70vh] flex flex-col items-center justify-center text-center'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-ios-purple/10 blur-[80px] rounded-full -z-10'></div>
        <p className='text-3xl font-bold text-white mb-4'>Order Information Missing</p>
        <p className='text-ios-text-secondary mb-8'>We couldn't retrieve the tracking details for this order. Please navigate back to your orders to try again.</p>
        <button onClick={() => navigate('/orders')} className='bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-full glass transition-all duration-300'>
          Back to Orders
        </button>
      </div>
    )
  }

  const steps = [
    { label: 'Order Placed', description: 'We have received your order.' },
    { label: 'Packing', description: 'Your items are being packed manually.' },
    { label: 'Shipped', description: 'Your order is currently on the way.' },
    { label: 'Out for delivery', description: 'Arriving soon, out for delivery today.' },
    { label: 'Delivered', description: 'Enjoy your newest premium aesthetic.' }
  ];

  let currentStatusIndex = steps.findIndex(step => step.label.toLowerCase() === item.status?.toLowerCase());
  if (currentStatusIndex === -1 && item.status) {
      // If some backend status doesn't match perfectly
      if (item.status.toLowerCase().includes('place')) currentStatusIndex = 0;
      else if (item.status.toLowerCase().includes('pack')) currentStatusIndex = 1;
      else if (item.status.toLowerCase().includes('ship')) currentStatusIndex = 2;
      else if (item.status.toLowerCase().includes('out')) currentStatusIndex = 3;
      else if (item.status.toLowerCase().includes('deliver')) currentStatusIndex = 4;
      else currentStatusIndex = 0;
  } else if (currentStatusIndex === -1) {
      currentStatusIndex = 0;
  }

  return (
    <div className='pt-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative min-h-[70vh]'>

      {/* Ambient glow */}
      <div className='fixed top-20 right-20 w-[600px] h-[600px] bg-gradient-to-bl from-ios-blue/5 to-ios-purple/5 blur-[150px] rounded-full -z-10 pointer-events-none'></div>

      <div className='mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <Title text1={'Track'} text2={'Order'} />
        <button onClick={() => navigate('/orders')} className='text-ios-text-secondary hover:text-white transition-colors text-sm font-medium w-fit flex items-center gap-2'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
             <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
           </svg>
           Back to Orders
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        
        {/* Tracking Stepper */}
        <div className='glass-heavy border border-white/10 rounded-3xl p-6 sm:p-10 shadow-ios-xl animate-fade-in relative overflow-hidden'>
           <div className='absolute top-0 right-0 w-48 h-48 bg-ios-blue/10 blur-[60px] rounded-full -z-10'></div>
           <h3 className='text-xl font-bold text-white mb-8 border-b border-white/10 pb-4'>Shipment Journey</h3>
           
           <div className='flex flex-col'>
             {steps.map((step, index) => {
               const isCompleted = index <= currentStatusIndex;
               const isCurrent = index === currentStatusIndex;
               const isLast = index === steps.length - 1;

               return (
                 <div key={index} className='flex gap-5 group'>
                   <div className='flex flex-col items-center'>
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${isCompleted ? 'bg-ios-blue text-white shadow-[0_0_20px_rgba(10,132,255,0.4)] border border-ios-blue/50' : 'bg-black/40 border border-white/10 text-white/30 backdrop-blur-md'}`}>
                        {isCompleted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className='font-semibold text-sm'>{index + 1}</span>
                        )}
                     </div>
                     {!isLast && (
                        <div className={`w-1 h-14 sm:h-20 transition-all duration-500 ${index < currentStatusIndex ? 'bg-ios-blue shadow-[0_0_10px_rgba(10,132,255,0.4)]' : 'bg-white/5'}`}></div>
                     )}
                   </div>
                   <div className={`pt-1.5 pb-8 ${isLast ? 'pb-0' : ''}`}>
                      <p className={`text-lg sm:text-xl font-bold transition-colors duration-500 ${isCurrent ? 'text-ios-blue tracking-wide' : isCompleted ? 'text-white' : 'text-white/30'}`}>{step.label}</p>
                      <p className={`text-sm mt-1 transition-colors duration-500 ${isCompleted ? 'text-ios-text-secondary' : 'text-white/20'}`}>{step.description}</p>
                   </div>
                 </div>
               )
             })}
           </div>
        </div>

        {/* Order Details summary */}
        <div className='flex flex-col gap-6'>
          <div className='glass-heavy border border-white/10 rounded-3xl p-6 sm:p-8 shadow-ios-xl animate-scale-in'>
            <h3 className='text-lg font-bold text-white mb-6 border-b border-white/10 pb-4'>Item Details</h3>
            <div className='flex items-start gap-5'>
                <div className='w-24 h-32 overflow-hidden rounded-xl bg-black/40 flex-shrink-0 border border-white/5'>
                  <img className='w-full h-full object-cover' src={item.image[0]} alt="" />
                </div>
                <div className='flex flex-col justify-center'>
                  <p className='text-lg sm:text-xl font-bold text-white mb-1'>{item.name}</p>
                  <p className='text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple mb-2'>{currency}{item.price}</p>
                  <p className='text-sm text-ios-text-secondary'>Qty: <span className='text-white'>{item.quantity}</span> &nbsp;|&nbsp; Size: <span className='text-white'>{item.size}</span></p>
                </div>
            </div>
          </div>

          <div className='glass-heavy border border-white/10 rounded-3xl p-6 sm:p-8 shadow-ios-xl animate-scale-in' style={{animationDelay: '100ms'}}>
            <h3 className='text-lg font-bold text-white mb-4 border-b border-white/10 pb-4'>Order Information</h3>
            <div className='grid grid-cols-2 gap-y-4 gap-x-2'>
               <div>
                  <p className='text-xs text-ios-text-secondary uppercase tracking-wider mb-1'>Order ID</p>
                  <p className='text-sm text-white font-mono break-all'>{orderId}</p>
               </div>
               <div>
                  <p className='text-xs text-ios-text-secondary uppercase tracking-wider mb-1'>Date Placed</p>
                  <p className='text-sm text-white'>{new Date(item.date).toDateString()}</p>
               </div>
               <div>
                  <p className='text-xs text-ios-text-secondary uppercase tracking-wider mb-1'>Payment Method</p>
                  <p className='text-sm text-white uppercase'>{item.paymentMethod}</p>
               </div>
               <div>
                  <p className='text-xs text-ios-text-secondary uppercase tracking-wider mb-1'>Payment Status</p>
                  {item.payment ? (
                     <span className='px-2 py-0.5 rounded-full bg-ios-green/20 text-ios-green text-xs font-bold border border-ios-green/30'>Paid</span>
                  ) : (
                     <span className='px-2 py-0.5 rounded-full bg-ios-orange/20 text-ios-orange text-xs font-bold border border-ios-orange/30'>Pending</span>
                  )}
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TrackOrder
