import { useContext } from "react"
import { ProjectContext } from "../contexts/projects/_provider"



export const useProjects = () => {
    return useContext(ProjectContext)
}