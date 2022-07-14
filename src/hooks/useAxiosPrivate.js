/*import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "/";

const useAxiosPrivate = () => {

   // const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    const token = JSON.parse(sessionStorage.getItem('token'));
                    console.log("token");
                    console.log(token);
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );



        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);

        }
    })

    return axiosPrivate;
}

export default useAxiosPrivate;
*/
