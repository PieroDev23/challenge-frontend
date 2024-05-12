import axios from "axios";
import { PropsWithChildren, createContext, useState } from "react";
import { FieldValues } from "react-hook-form";
import { sanitizeObject } from "../../helpers";



export type AuthData = {
    isAuthenticated: boolean;
    user: string | null
    onSendAuth: (data: FieldValues, url: string) => Promise<any>;
    onLogout: () => void;
}


export const AuthContext = createContext<AuthData>({} as AuthData);


function AuthContextProvider({ children }: PropsWithChildren) {
    /**
     * Initializers
     */

    const [authData, setAuthData] = useState({
        isAuthenticated: false,
        user: null
    });







    /**
     * Contexts
     */

    /**
     * Functions
     */

    const onSendAuth = async (data: FieldValues, url: string) => {
        const { data: axiosData } = await axios.post(url, sanitizeObject(data));
        // save data in LS
        return axiosData.data;
    }


    const onLogout = () => {
        setAuthData({ isAuthenticated: false, user: null });
    }

    /**
     * Hooks
     */

    /**
     * Renders
     */
    return (
        <AuthContext.Provider value={{ ...authData, onSendAuth, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContextProvider };
