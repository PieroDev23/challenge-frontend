import { Box, BoxProps, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetProjectsResponse, GetTasksResponse, Project, Task } from "../../../_types";
import { useAuth, useProjects, useTasks } from "../../../hooks";
import { ContentWrapper, Navbar } from "../../../ui/components";
import { useContent } from "../../../hooks/useContent.hook";



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


    const { token } = useAuth();
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
                handleSetTasks(response.data.tasks);
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
