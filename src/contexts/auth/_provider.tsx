import { PropsWithChildren, createContext, useState } from "react";



export type AuthData = {
    isAuthenticated: boolean;
    user: string | null
}


export const AuthContext = createContext<AuthData>({} as AuthData);


function AuthContextProvider({ children }: PropsWithChildren) {
    /**
     * Initializers
     */

    const [authData, setAuthData] = useState<AuthData>({
        isAuthenticated: false,
        user: null
    });

    


    /**
     * Contexts
     */

    /**
     * Functions
     */

    /**
     * Hooks
     */

    /**
     * Renders
     */
    return (
        <AuthContext.Provider value={{ ...authData }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContextProvider };