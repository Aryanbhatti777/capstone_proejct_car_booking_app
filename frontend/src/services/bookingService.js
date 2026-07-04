import axiosInstance from "../../../axiosInstance"

export const createBooking = async (carId, bookingData) => {
    return await axiosInstance.post(`/booking/book/${carId}`, bookingData)
}

export const getBookings = async () => {
    return await axiosInstance.get('/booking/bookings')
}

export const getUserBookings = async (userId) => {
    return await axiosInstance.get(`/booking/userBookings/${userId}`)
}

export const updateBookingStatus = async (bookingId, status) => {
    return await axiosInstance.put(`/booking/updateBookingStatus/${bookingId}`, { status })
}
