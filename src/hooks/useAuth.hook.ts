import { useContext } from "react";
import { AuthContext } from "../contexts/auth/_provider";



export const useAuth = () => {
    return useContext(AuthContext);
}

