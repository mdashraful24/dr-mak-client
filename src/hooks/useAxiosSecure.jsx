import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const useAxiosSecure = () => {
    const { accessToken, logOut } = useAuth(); // ✅ Use accessToken

    useEffect(() => {
        const requestIntercept = axiosSecure.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    await logOut();
                    window.location.href = '/auth/login';
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestIntercept);
            axiosSecure.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;
