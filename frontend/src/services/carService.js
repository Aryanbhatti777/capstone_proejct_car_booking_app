import axiosInstance from "../../axiosInstance"


export const getCars = async () => {
    return await axiosInstance.get('/car/getcars')
}

export const getCarById = async (id) => {
    return await axiosInstance.get(`/car/getcar/${id}`)
}

export const addCar = async (carData) => {
    return await axiosInstance.post('/car/addcar', carData)
}

export const updateCar = async (id, carData) => {
    return await axiosInstance.put(`/car/updatecar/${id}`, carData)
}

export const deleteCar = async (id) => {
    return await axiosInstance.delete(`/car/deletecar/${id}`)
}
