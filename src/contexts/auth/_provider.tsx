import { PropsWithChildren, useEffect, useState } from "react";
import { AUTH_ITEM_KEY_LS } from "../../_constants";
import { AuthContext } from "./_context";
import { Auth } from "./_types.context";





function AuthContextProvider({ children }: PropsWithChildren) {
    /**
     * Initializers
     */
    const [authSession, setAuthSession] = useState<Auth | null>(JSON.parse(localStorage.getItem('auth') ?? 'null'));

    /**
     * Hooks
     */
    useEffect(() => {
        const auth = localStorage.getItem(AUTH_ITEM_KEY_LS);

        if (!auth) {
            setAuthSession(null);
            return
        }

        setAuthSession(JSON.parse(auth));
    }, []);

    /**
     * Renders
     */
    return (
        <AuthContext.Provider value={{ auth: authSession }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContextProvider };
