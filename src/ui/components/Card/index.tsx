import { Badge, Button, CardFooter, CardHeader, Text, Card as ChakraCard, CardProps as ChakraCardProps, Flex, Heading } from "@chakra-ui/react";
import { Project, Task } from "../../../_types";
import { useAuth } from "../../../hooks";


type CardProps = {
    type: 'project' | 'task',
    project?: Project,
    task?: Task
};

export const ProjectCard = (project: Project) => {
    const { user } = useAuth();

    return (
        <ChakraCard {...chakraCardProps}>
            <CardHeader>
                <Heading size={'md'}>{project.title}</Heading>
            </CardHeader>
            <CardFooter justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize={'15px'}>
                    Created by: {
                        project.createdBy.userId === user.userId ? 'you' : project.createdBy.firstname
                    }</Text>
                <Button colorScheme='green'>View Project</Button>
            </CardFooter>
        </ChakraCard>
    )
}

export const TaskCard = (task: Task) => {

    const mapColorStatus: { [k: string]: string } = {
        IN_PROGRESS: 'purple',
        COMPLETED: 'green',
        PENDING: '',
        DEFAULT: ''
    }

    return (
        <ChakraCard {...chakraCardProps}>
            <CardHeader>
                <Flex justifyContent={'flex-end'} width='100%'>
                    <Badge colorScheme={mapColorStatus[task.status] || mapColorStatus['DEFAULT']}>{task.status}</Badge>
                </Flex>
                <Heading size='md'>{task.title}</Heading>
            </CardHeader>
            <CardFooter justifyContent='flex-end'>
                <Button colorScheme='blue'>Details</Button>
            </CardFooter>
        </ChakraCard>
    )
}

function Card(props: CardProps) {
    /**
     * Initializers
     */

    /**
     * Contexts
     */

    /**
     * Functions
     */

    /**
     * Hooks
     */

    if (props.type === 'project') {
        return <ProjectCard {...props.project!} />
    }
    /**
     * Renders
     */
    return (
        <TaskCard {...props.task!} />
    );
}


const chakraCardProps: ChakraCardProps = {
    variant: 'elevated'
}


export { Card };
