import { createContext } from "react";
import { Auth } from "./_types.context";



export type AuthContextValues = {
    auth: Auth | null,
    setAuth?: (auth: Auth | null) => void;
};


export const AuthContext = createContext<AuthContextValues>({ auth: null, setAuth: () => { } } as AuthContextValues);



