import { PropsWithChildren, createContext, useState } from 'react';



export type contentContextValues = {
    view: string;
    projectId: string;
    handleSetView: (view: string) => void;
    handleSetProjectId: (id: string) => void;
}

export const ContentContext = createContext({} as contentContextValues);

function ContentProvider({ children }: PropsWithChildren) {
    /**
     * Initializers
     */
    const [view, setView] = useState<string>('projects');
    const [projectId, setProjectId] = useState<string>("");

    /**
     * Contexts
     */

    /**
     * Functions
     */

    const handleSetView = (view: string) => {
        setView(view);
    }

    const handleSetProjectId = (id: string) => {
        setProjectId(id);
    }

    /**
     * Hooks
     */

    /**
     * Renders
     */
    return (
        <>
            <ContentContext.Provider value={{ view, projectId, handleSetView, handleSetProjectId }}>
                {children}
            </ContentContext.Provider>
        </>
    );
}

export { ContentProvider };
