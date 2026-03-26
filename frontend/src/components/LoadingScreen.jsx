import React, { useEffect, useState } from 'react'

const LoadingScreen = () => {
    const [seconds, setSeconds] = useState(40);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + (100 / 400); // 100 / (40s * 10 intervals per sec)
            });
        }, 100);

        return () => {
            clearInterval(interval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className='fixed inset-0 z-[100] flex flex-col items-center justify-center ios-gradient-bg bg-black'>
            {/* Background Decorative Elements */}
            <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-ios-blue/20 blur-[120px] rounded-full animate-pulse'></div>
            <div className='absolute bottom-1/4 right-1/4 w-64 h-64 bg-ios-purple/20 blur-[120px] rounded-full animate-pulse' style={{ animationDelay: '1s' }}></div>

            <div className='relative z-10 flex flex-col items-center max-w-md w-full px-8 text-center'>
                
                {/* Brand Logo Animation */}
                <div className='w-20 h-20 rounded-3xl bg-gradient-to-tr from-ios-blue via-blue-500 to-ios-purple flex items-center justify-center shadow-[0_0_30px_rgba(10,132,255,0.4)] mb-10 animate-bounce'>
                    <span className='text-white font-black text-4xl tracking-tighter'>C</span>
                </div>

                {/* Main Text */}
                <h1 className='text-3xl sm:text-4xl font-black tracking-tighter text-white mb-4 animate-slide-up group'>
                    BACKEND IS <br />
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-ios-blue via-blue-400 to-ios-purple'>PUMPING UP</span>
                </h1>

                <p className='text-ios-text-secondary text-base font-light mb-12 opacity-80 leading-relaxed max-w-[280px]'>
                    Waking up the servers for your premium experience. This usually takes around 40 seconds.
                </p>

                {/* Countdown Timer */}
                <div className='glass-heavy border border-white/10 rounded-2xl w-full p-8 shadow-ios-xl animate-fade-in' style={{ animationDelay: '0.3s' }}>
                    <div className='flex items-end justify-center gap-1 mb-6'>
                        <span className='text-5xl font-black text-white tabular-nums'>{seconds}</span>
                        <span className='text-ios-text-tertiary text-lg font-medium mb-1.5 uppercase tracking-widest'>sec</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className='w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2'>
                        <div 
                            className='h-full bg-gradient-to-r from-ios-blue to-ios-purple transition-all duration-100 ease-linear rounded-full shadow-[0_0_10px_rgba(10,132,255,0.5)]'
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    
                    <div className='flex justify-between items-center'>
                        <span className='text-[10px] text-ios-text-tertiary uppercase tracking-[0.2em] font-bold'>Initializing</span>
                        <span className='text-[10px] text-ios-text-tertiary font-medium'>{Math.floor(progress)}%</span>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className='mt-12 flex items-center gap-3 glass-ultra-thin border border-white/10 px-5 py-2.5 rounded-full animate-pulse'>
                    <div className='w-1.5 h-1.5 rounded-full bg-ios-blue shadow-[0_0_8px_#0A84FF]'></div>
                    <span className='text-[11px] font-bold uppercase tracking-widest text-ios-text-tertiary'>Connecting to Cloud Clusters</span>
                </div>
            </div>
            
            {/* Footer Tag */}
            <div className='absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-ios-text-tertiary font-bold opacity-40'>
                Clothify Luxury E-Commerce
            </div>
        </div>
    )
}

export default LoadingScreen
