import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";


export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth()
    const navigate = useNavigate()
    // Add a response interceptor
    useEffect(() => {
        axios.interceptors.response.use((response) => {
            // console.log('Response from axios interceptor.', response);
            return response;
        }, async (error) => {
            if (error.response?.status === 401 || error.response === 403) {
                // signOut user 
                signOutUser()
                navigate('/login')
            }
            return Promise.reject(error);
        });
    }, [signOutUser, navigate])

    return axiosSecure
};

export default useAxiosSecure;