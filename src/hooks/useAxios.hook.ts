import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth.hook";




export const useAxios = <T>(params: AxiosRequestConfig) => {

    const [axiosState, setAxiosState] = useState<{ data: null | T; loading: boolean, error: null | string }>({
        data: null,
        loading: false,
        error: null
    });

    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setAxiosState((prev) => ({ ...prev, loading: true }));
                const response: AxiosResponse<T> = await axios.request({ ...params, headers: { Authorization: `Bearer ${token}` } });
                setAxiosState((prev) => ({ ...prev, data: response.data }));

            } catch (error) {

                if (!(error instanceof AxiosError)) {
                    return;
                }

                setAxiosState((prev) => ({ ...prev, error: error.response?.data.message }));
            }
        }

        fetchData();
    }, [params.url]);


    return axiosState;
}