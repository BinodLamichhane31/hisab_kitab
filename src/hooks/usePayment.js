import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { initiateSubscriptionService, verifySubscriptionService } from '../services/paymentService';


const postToEsewa = (paymentDetails) => {
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', paymentDetails.payment_url);

    for (const key in paymentDetails) {
        if (key !== 'payment_url') { 
            const hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', paymentDetails[key]);
            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
};


export const useInitiateSubscription = () => {
    return useMutation({
        mutationFn: initiateSubscriptionService,
        onSuccess: (data) => {
            toast.info("Redirecting to eSewa for payment...");
            postToEsewa(data.paymentDetails);
        },
        onError: (error) => {
            toast.error(error.message || "Could not start the payment process.");
        },
    });
};


export const useVerifySubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (esewaData) => verifySubscriptionService(esewaData),
        onSuccess: (data) => {
            toast.success(data.message || "Your subscription has been upgraded!");
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (error) => {
            toast.error(error.message || "We couldn't verify your payment.");
        },
    });
};