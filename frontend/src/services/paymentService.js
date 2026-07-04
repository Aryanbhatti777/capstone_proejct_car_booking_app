import axiosInstance from "../../axiosInstance"


export const createPaymentIntent = async (amount, bookingId) => {
    return await axiosInstance.post('/payment/create-payment-intent', {
        amount,
        bookingId,
        currency: 'inr'
    })
}

export const confirmPayment = async (paymentIntentId, bookingId) => {
    return await axiosInstance.post('/payment/confirm-payment', {
        paymentIntentId,
        bookingId
    })
}

export const getPaymentStatus = async (paymentIntentId) => {
    return await axiosInstance.get(`/payment/payment-status/${paymentIntentId}`)
}
