import { PropsWithChildren, createContext, useState } from "react";
import { Project } from "../../_types";

type projectProviderValue = {
    project: Project;
    projects: Project[]
    handleSetProject: (param: Project) => void;
    handleSetProjects: (projects: Project[]) => void;
};


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

    /**
     * Functions
     */

    const handleSetProject = (project: Project) => {
        setProject(project);
    }

    const handleSetProjects = (projects: Project[]) => {
        setProjects(projects);
    }

    /**
     * Hooks
     */

    /**
     * Renders
     */
    return (
        <ProjectContext.Provider value={{ project, projects, handleSetProjects, handleSetProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export { ProjectsProvider };
