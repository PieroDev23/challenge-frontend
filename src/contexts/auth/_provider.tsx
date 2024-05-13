import axios from "axios";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { sanitizeObject } from "../../helpers";
import { AUTH_ITEM_KEY_LS, AUTH_TOKEN_ITEM_KEY_LS } from "../../_constants";



export type AuthData = {
    isAuthenticated: boolean;
    token: string | null,
    onSendAuth: (data: FieldValues, url: string) => Promise<any>;
    onLogout: () => void;
}


export const AuthContext = createContext<AuthData>({} as AuthData);


function AuthContextProvider({ children }: PropsWithChildren) {
    /**
     * Initializers
     */

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(AUTH_TOKEN_ITEM_KEY_LS));
    const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN_ITEM_KEY_LS));




    const onSendAuth = async (data: FieldValues, url: string) => {
        try {
            const { data: axiosData } = await axios.post(url, sanitizeObject(data));
            setIsAuthenticated(true);

            // save data in LS
            return axiosData.data;
        } catch (error) {
            console.log(error);
            onLogout();
        }
    }


    const onLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH_ITEM_KEY_LS)
        localStorage.removeItem(AUTH_TOKEN_ITEM_KEY_LS);
    }


    const verifyToken = async () => {

        if (!token) {
            onLogout();
            return;
        }

        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/auth/check-token`, { headers: { Authorization: `Bearer ${token}` } });
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            onLogout();
        }
    }

    useEffect(() => {
        verifyToken();
    }, [])


    return (
        <AuthContext.Provider value={{ isAuthenticated, token, onSendAuth, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContextProvider };
