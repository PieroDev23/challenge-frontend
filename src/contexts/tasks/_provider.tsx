import { PropsWithChildren, createContext, useState } from "react";
import { Task } from "../../_types";
import axios from "axios";
import { useAuth, useProjects } from "../../hooks";
import { injectTokenOnHeaders } from "../../helpers";

type tasksProviderValues = {
    task: Task;
    tasks: Task[];
    handleSetTask: (param: Task) => void;
    handleSetTasks: (tasks: Task[]) => void;
    sendTaskUpdated: (status: string) => Promise<void>;
    handleUpdateStatusTasks: (status: string) => void;
    handleCreateTask: (newTask: NewTask) => Promise<void>;
};


export type NewTask = {
    title: string;
    description: string;
    asignees: string[]
    idProject: string;
}


export const TasksContext = createContext({} as tasksProviderValues);


function TasksProvider({ children }: PropsWithChildren) {
    /**
     * Initializers
     */
    const [task, setTask] = useState<Task>({} as Task);
    const [tasks, setTasks] = useState<Task[]>([]);
    /**
     * Contexts
     */

    const { project } = useProjects();
    const { token } = useAuth()
    /**
     * Functions
     */
    const sendTaskUpdated = async (status: string) => {
        try {
            const payload = {
                status,
                idProject: project.idProject
            }

            await axios.put(`${import.meta.env.VITE_API_URL}/task/update/${task.idTask}`, payload, { ...injectTokenOnHeaders(token!) });
        } catch (error) {
            console.log('could not update the task');
            console.log(error);
        }
    }

    const handleSetTask = (task: Task) => {
        setTask(task);
    }

    const handleSetTasks = (tasks: Task[]) => {
        setTasks(tasks);
    }


    const handleUpdateStatusTasks = (status: any) => {
        //finding the task
        const updatedTasks = tasks.map(currentTask => {
            if (currentTask.idTask === task.idTask) {
                return {
                    ...currentTask,
                    status,
                }
            }

            return currentTask;
        });

        setTasks(updatedTasks);
    }

    const handleCreateTask = async (newTask: NewTask) => {

        try {
            const { data: axiosData } = await axios.post(`${import.meta.env.VITE_API_URL}/task/create`, newTask, injectTokenOnHeaders(token!));
            const { project, updatedAt, createdAt, asignedBy, ...freshTask } = axiosData.data;
            setTasks(prevTasks => [...prevTasks, freshTask]);

        } catch (error) {
            console.log(error)
        }
    }


    /**
     * Hooks
     */

    /**
     * Renders
     */
    return (
        <TasksContext.Provider value={{ task, tasks, handleSetTask, handleSetTasks, handleUpdateStatusTasks, sendTaskUpdated, handleCreateTask }}>
            {children}
        </TasksContext.Provider>
    );
}

export { TasksProvider };

