import { Box, BoxProps } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetProjectsResponse, GetTasksResponse } from "../../../_types";
import { useAuth, useProjects, useTasks } from "../../../hooks";
import { useContent } from "../../../hooks/useContent.hook";
import { ContentWrapper, Navbar } from "../../../ui/components";



function DashboardPage() {
    /**
     * Initializers
     */

    const [loading, setLoading] = useState(false);

    /**
     * Functions
     */

    /**
     * Hooks
     */

    const { token, user } = useAuth();
    const { view } = useContent();
    const { handleSetProjects, project } = useProjects();
    const { handleSetTasks } = useTasks();

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await axios.get<GetProjectsResponse>(`${import.meta.env.VITE_API_URL}/project/get-all`, { headers: { Authorization: `Bearer ${token}` } });
                handleSetProjects(response.data.projects);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }


        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await axios.get<GetTasksResponse>(`${import.meta.env.VITE_API_URL}/project/${project.idProject}/tasks`, { headers: { Authorization: `Bearer ${token}` } });
                let tasks = response.data.tasks;

                if (user.role !== 'ADMIN') {
                    tasks = tasks.filter(task => !!task.asignees.find((asignee) => user.userId === asignee.userId));
                }

                handleSetTasks(tasks);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        if (view === 'projects') {
            fetchProjects();
        }

        if (view === 'tasks') {
            fetchTasks();
        }

    }, [view])

    /**
     * Renders
     */
    return (
        <>
            <Box {...pageWrapperProps}>
                <Navbar />

                {
                    !loading && <ContentWrapper />
                }
            </Box>
        </>
    );
}

const pageWrapperProps: BoxProps = {
    display: 'flex',
    flexDir: 'column',
    height: '100%'
}


export { DashboardPage };

