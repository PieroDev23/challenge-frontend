import { Box, FlexProps, Heading, HeadingProps, SimpleGrid } from "@chakra-ui/react";
import { useAuth, useProjects, useTasks } from "../../../hooks";
import { useContent } from "../../../hooks/useContent.hook";
import { Card } from "../Card";


function ContentWrapper() {
    /**
     * Initializers
     */

    const { view } = useContent();
    const { projects } = useProjects();
    const { tasks } = useTasks();
    const { user } = useAuth();

    /**
     * Contexts
     */

    /**
     * Functions
     */

    /**
     * Hooks
     */

    /**
     * Renders
     */
    return (
        <>
            <Box {...flexWrapperProps}>
                <Heading {...headingContentProps}>{view === 'tasks'}</Heading>
                {/* CARDS GOES HERE */}
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                    {
                        (projects && view === 'projects') && projects.map(project => <Card key={project.idProject} type="project" project={{ ...project }} />)
                    }
                    {
                        (tasks && view === 'tasks') && tasks
                            .map(task => <Card key={task.idTask} type="task" task={{ ...task }} />)
                    }
                    {
                        view === 'tasks' && tasks.length === 0 ? 'no tasks on this project where finded, create one! 🐸' : null
                    }
                </SimpleGrid>
            </Box>
        </>
    );
}


const headingContentProps: HeadingProps = {
    marginBottom: '13px',
    fontSize: {
        base: '18px',
        md: '23px',
    },
    as: 'h3'
}

const flexWrapperProps: FlexProps = {
    padding: '20px',
    bgColor: 'white',
    height: '100%'
}


export { ContentWrapper };

