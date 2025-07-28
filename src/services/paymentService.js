import { initiateSubscriptionApi, verifySubscriptionApi } from '../api/paymentApi';

export const initiateSubscriptionService = async () => {
    try {
        const response = await initiateSubscriptionApi();
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to start payment process.' };
    }
};

export const verifySubscriptionService = async (esewaData) => {
    try {
        const response = await verifySubscriptionApi(esewaData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Payment verification failed.' };
    }
};