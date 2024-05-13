import { useContext } from "react"
import { ContentContext } from "../contexts/content/_provider"




export const useContent = () => {
    return useContext(ContentContext);
}