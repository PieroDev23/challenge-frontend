import { useContext } from "react"
import { TasksContext } from "../contexts/tasks/_provider"




export const useTasks = () => {
    return useContext(TasksContext);
}