import React, { useContext } from 'react';
import { AuthContext } from '../../auth/authProvider';
import { useInitiateSubscription } from '../../hooks/usePayment';
import { Crown, CheckCircle, Loader2 } from 'lucide-react';
import { useGetProfile } from '../../hooks/auth/useProfile';

const SubscriptionPage = () => {
    const { data: profileResponse, isLoading: isProfileLoading, isError } = useGetProfile();
    
    const { mutate: initiatePayment, isPending } = useInitiateSubscription();
    
    const handleUpgradeClick = () => {
        initiatePayment();
    };

    const isPro = profileResponse?.data.subscription?.plan === 'PRO';
    
    
    return (
        <div className="min-h-screen p-4 bg-slate-50 sm:p-6 lg:p-8">
            <div className="max-w-full mx-auto">
                <div className="pb-5 mb-8 border-b border-gray-200">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Subscription Plan</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your Hisab Kitab subscription and unlock pro features.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className={`p-6 bg-white border-2 rounded-xl ${!isPro ? 'border-orange-500' : 'border-gray-200'}`}>
                        <h2 className="text-xl font-semibold text-gray-800">Free Plan</h2>
                        <p className="mt-4 text-4xl font-bold">₹0 <span className="text-lg font-normal text-gray-500">/ forever</span></p>
                        <ul className="mt-6 space-y-3 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Up to 2 Shops</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Unlimited Transactions</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Basic Reporting</li>
                        </ul>
                        {!isPro && <p className="mt-8 text-sm font-medium text-center text-gray-500">Your current plan</p>}
                    </div>

                    <div className={`p-6 bg-white border-2 rounded-xl ${isPro ? 'border-orange-500' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-orange-600">Pro Plan</h2>
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full"><Crown size={12}/> PRO</span>
                        </div>
                        <p className="mt-4 text-4xl font-bold">₹1000 <span className="text-lg font-normal text-gray-500">/ year</span></p>
                        <ul className="mt-6 space-y-3 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Unlimited Shops</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> AI Hisab Assistant</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Priority Support</li>
                        </ul>
                        {isPro ? (
                             <p className="mt-8 text-sm font-medium text-center text-green-600">Your plan is active!</p>
                        ) : (
                            <button onClick={handleUpgradeClick} disabled={isPending} className="inline-flex items-center justify-center w-full px-4 py-2 mt-8 text-sm font-medium text-white bg-orange-500 rounded-md shadow-sm hover:bg-orange-600 disabled:bg-gray-400">
                                {isPending ? <Loader2 className="w-5 h-5 mr-2 animate-spin"/> : <Crown className="w-5 h-5 mr-2"/>}
                                {isPending ? 'Redirecting...' : 'Upgrade to Pro'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;