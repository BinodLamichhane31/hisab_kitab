import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetProfile, useUpdateProfile, useUploadProfileImage } from '../hooks/auth/useProfile';
import { toast } from 'react-toastify';
import { Camera, User, Mail, Phone, Save, Loader2, Check, AlertCircle, Crown } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6060/api";

const SkeletonLoader = () => (
    <div className="container p-4 mx-auto sm:p-6 md:p-8">
        <div className="w-1/3 h-8 mb-8 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col items-center p-8 space-y-4 border border-gray-200 bg-white/50 rounded-2xl animate-pulse">
                <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
                <div className="w-4/5 h-6 bg-gray-300 rounded-lg"></div>
                <div className="w-full h-4 bg-gray-200 rounded-lg"></div>
                <div className="w-1/3 h-4 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="p-8 border border-gray-200 bg-white/50 rounded-2xl lg:col-span-2 animate-pulse">
                <div className="w-1/2 h-6 mb-8 bg-gray-200 rounded-lg"></div>
                <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
                        <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
                    <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    </div>
);

const ProfilePage = () => {
  const { data: profileResponse, isLoading: isProfileLoading, isError } = useGetProfile();
  
  const { mutate: updateProfile, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useUpdateProfile();
  const { mutate: uploadImage, isLoading: isUploading } = useUploadProfileImage();

  const [formData, setFormData] = useState({ fname: '', lname: '', phone: '' });
  const [buttonState, setButtonState] = useState('idle');
  const fileInputRef = useRef(null);
  const isPro = profileResponse?.data.subscription?.plan === 'PRO';


  useEffect(() => {
    if (profileResponse?.data) {
      const user = profileResponse.data;      
      setFormData({
        fname: user.fname || '',
        lname: user.lname || '',
        phone: user.phone || '',
      });
    }
  }, [profileResponse]);

  useEffect(() => {
    if (isUpdating) {
        setButtonState('loading');
    } else if (isUpdateSuccess) {
        setButtonState('success');
        const timer = setTimeout(() => setButtonState('idle'), 2000);
        return () => clearTimeout(timer);
    } else {
        setButtonState('idle');
    }
  }, [isUpdating, isUpdateSuccess]);

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fname || !formData.lname) {
        toast.error("First name and last name are required.");
        return;
    }
    updateProfile(formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 2MB.");
      return;
    }
    const fd = new FormData();
    fd.append('image', file);
    uploadImage(fd);
  };

  if (isProfileLoading) return <SkeletonLoader />;
  if (isError) return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-red-600">
        <AlertCircle size={48} />
        <p className="mt-4 text-xl font-semibold">Error loading profile.</p>
        <p>Please try refreshing the page.</p>
    </div>
  );

  const user = profileResponse.data;
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const filename = imagePath.split('/').pop();
    return `${API_URL}/uploads/${filename}`;
  };
  const imageUrl = getImageUrl(user?.profileImage);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="min-h-full p-4 bg-gray-50 sm:p-6 md:p-8">
      <motion.div 
        className="container mx-auto"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1 variants={itemVariants} className="mb-8 text-4xl font-bold tracking-tight text-gray-900">
            My Profile
        </motion.h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div variants={itemVariants} className="flex flex-col items-center p-8 text-center bg-white border shadow-lg border-gray-200/80 rounded-2xl shadow-gray-900/5">
            <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >

              <div className="relative">
                {imageUrl ? (
                  <img src={imageUrl} alt="Profile" className="object-cover w-40 h-40 rounded-full ring-4 ring-white/50 ring-offset-4 ring-offset-gray-100" />
                ) : (
                  <div className="flex items-center justify-center w-40 h-40 font-bold text-white bg-orange-500 rounded-full text-7xl ring-4 ring-white/50 ring-offset-4 ring-offset-gray-100">
                    {user?.fname?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black rounded-full bg-opacity-60">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute p-3 text-white transition-opacity duration-300 bg-gray-900 rounded-full shadow-lg opacity-0 -bottom-1 -right-1 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Change profile picture"
              >
                <Camera size={20} />
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/png, image/jpeg, image/jpg" className="hidden"/>
            </motion.div>
            
            <h2 className="mt-6 text-2xl font-bold text-gray-800">{`${user.fname} ${user.lname}`}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="px-3 py-1 mt-4 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">{user.role}</p>
            <span className="inline-flex items-center px-2 py-1 mt-5 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full"><Crown size={12}/> PRO</span>            


    
          </motion.div>

          <motion.div variants={itemVariants} className="p-8 bg-white border shadow-lg border-gray-200/80 rounded-2xl shadow-gray-900/5 lg:col-span-2">
            <h3 className="mb-6 text-xl font-semibold text-gray-700">Profile Information</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { name: 'fname', label: 'First Name', icon: User, type: 'text' },
                  { name: 'lname', label: 'Last Name', icon: User, type: 'text' }
                ].map(field => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <div className="relative mt-1">
                      <field.icon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input type={field.type} name={field.name} id={field.name} value={formData[field.name]} onChange={handleInputChange} className="w-full py-2.5 pl-10 pr-3 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-colors" required />
                    </div>
                  </div>
                ))}
              </div>

              {[
                { name: 'email', label: 'Email Address', icon: Mail, value: user.email, disabled: true },
                { name: 'phone', label: 'Phone Number', icon: Phone, value: formData.phone, disabled: false, type: 'tel' }
              ].map(field => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
                  <div className="relative mt-1">
                    <field.icon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input type={field.type || 'text'} name={field.name} id={field.name} value={field.value} onChange={handleInputChange} disabled={field.disabled} className="w-full py-2.5 pl-10 pr-3 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"/>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end pt-4">
                <motion.button 
                  type="submit" 
                  disabled={buttonState !== 'idle'}
                  className="relative flex items-center justify-center px-4 py-2 overflow-hidden text-sm font-medium text-white transition-colors bg-orange-600 border border-transparent rounded-lg shadow-sm w-36 h-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-80"
                  whileHover={buttonState === 'idle' ? { scale: 1.05 } : {}}
                  whileTap={buttonState === 'idle' ? { scale: 0.95 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {buttonState === 'idle' && (
                      <motion.span key="idle" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex items-center">
                        <Save size={18} className="mr-2" /> Save Changes
                      </motion.span>
                    )}
                    {buttonState === 'loading' && (
                      <motion.span key="loading" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex items-center">
                        <Loader2 className="mr-2 animate-spin" /> Saving...
                      </motion.span>
                    )}
                    {buttonState === 'success' && (
                      <motion.span key="success" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="absolute inset-0 flex items-center justify-center text-white bg-green-500">
                        <Check size={18} className="mr-2" /> Saved!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;