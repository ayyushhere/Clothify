import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {

    const { backendUrl, token, navigate } = useContext(ShopContext);
    const [userData, setUserData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    // Predefined stylish avatars
    const avatarList = [
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Aneka",
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Zack",
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Midnight",
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Coco",
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Bubba"
    ];

    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
                setSelectedImage(data.userData.image || "")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const updateUserProfile = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/update-profile', { image: selectedImage }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                await loadUserProfile()
                setIsEdit(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfile()
        } else {
            navigate('/login')
        }
    }, [token])

    return userData ? (
        <div className='pt-8 flex justify-center min-h-[60vh]'>

            <div className='w-full max-w-lg'>
                <div className='ios-card shadow-ios-md p-8 sm:p-10 animate-scale-in'>

                    <h2 className='ios-large-title text-center text-ios-text-primary mb-8'>My Profile</h2>

                    {/* Avatar Display */}
                    <div className='flex flex-col items-center gap-5 mb-8'>
                        <div className='relative'>
                            <img
                                className={`w-28 h-28 rounded-full object-cover transition-all duration-300 ${isEdit ? 'ring-4 ring-ios-blue ring-offset-2' : 'ring-4 ring-ios-fill ring-offset-2'}`}
                                src={userData.image || assets.profile_icon}
                                alt=""
                            />
                            {isEdit && (
                                <div className='absolute inset-0 flex items-center justify-center bg-black/20 rounded-full'>
                                    <p className='text-white text-xs font-semibold'>Edit</p>
                                </div>
                            )}
                        </div>

                        {/* Avatar Selection Grid (Only in Edit Mode) */}
                        {isEdit && (
                            <div className='grid grid-cols-6 gap-3 animate-slide-up'>
                                {avatarList.map((avatar, index) => (
                                    <img
                                        key={index}
                                        onClick={() => setSelectedImage(avatar)}
                                        src={avatar}
                                        className={`w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-all duration-200 ${selectedImage === avatar ? 'ring-2 ring-ios-blue ring-offset-1 scale-110' : 'opacity-60 hover:opacity-100'}`}
                                        alt="avatar-option"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User Details */}
                    <div className='ios-grouped overflow-hidden mb-8'>
                        <div className='p-4 flex justify-between items-center'>
                            <div>
                                <p className='ios-caption mb-0.5'>Name</p>
                                <p className='text-[17px] font-medium text-ios-text-primary'>{userData.name}</p>
                            </div>
                        </div>
                        <div className='ios-separator ml-4'></div>
                        <div className='p-4 flex justify-between items-center'>
                            <div>
                                <p className='ios-caption mb-0.5'>Email</p>
                                <p className='text-[17px] font-medium text-ios-text-primary'>{userData.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='flex flex-col gap-3'>
                        {isEdit ? (
                            <>
                                <button onClick={() => updateUserProfile()} className='ios-btn-primary w-full'>
                                    Save Changes
                                </button>
                                <button onClick={() => setIsEdit(false)} className='ios-btn-secondary w-full'>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEdit(true)} className='ios-btn-secondary w-full'>
                                Edit Profile
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile
