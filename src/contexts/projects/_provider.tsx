import { PropsWithChildren, createContext, useState } from "react";
import { Project } from "../../_types";
import { useAuth } from "../../hooks";
import axios from "axios";
import { injectTokenOnHeaders } from "../../helpers";

type projectProviderValue = {
    project: Project;
    projects: Project[]
    handleSetProject: (param: Project) => void;
    handleSetProjects: (projects: Project[]) => void;
    handleCreateProject: (newProject: NewProject) => Promise<void>;
};


type NewProject = {
    consumersIds: string[]
    titleProject: string;
}

export const ProjectContext = createContext({} as projectProviderValue);


function ProjectsProvider({ children }: PropsWithChildren) {
    /**
     * Initializers
     */
    const [project, setProject] = useState<Project>({} as Project);
    const [projects, setProjects] = useState<Project[]>([]);
    /**
     * Contexts
     */

    const { token } = useAuth();

    /**
     * Functions
     */

    const handleSetProject = (project: Project) => {
        setProject(project);
    }

    const handleSetProjects = (projects: Project[]) => {
        setProjects(projects);
    }


    const handleCreateProject = async (newProject: NewProject) => {
        try {
            const { data: axiosData } = await axios.post(`${import.meta.env.VITE_API_URL}/project/create`, newProject, injectTokenOnHeaders(token!));
            const { createdBy, project } = axiosData.data;
            const freshProject = { ...createdBy, ...project };
            setProjects((prevProjects) => [...prevProjects, freshProject]);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Hooks
     */

    /**
     * Renders
     */
    return (
        <ProjectContext.Provider value={{ project, projects, handleSetProjects, handleSetProject, handleCreateProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export { ProjectsProvider };
