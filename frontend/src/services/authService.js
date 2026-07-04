import axiosInstance from "../../../axiosInstance"


export const Register = async (data) => {
    return await axiosInstance.post('/auth/register', data)
}

export const Login = async (data) => {
    return await axiosInstance.post('/auth/login', data)
}