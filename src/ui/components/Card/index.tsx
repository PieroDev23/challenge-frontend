import { Badge, Button, CardFooter, CardHeader, Text, Card as ChakraCard, CardProps as ChakraCardProps, Flex, Heading, useDisclosure, Box, List, ListItem, UnorderedList, Select } from "@chakra-ui/react";
import { Project, Task } from "../../../_types";
import { useAuth, useContent, useProjects, useTasks } from "../../../hooks";
import { CustomModal } from "../CustomModal";
import { STATE_TASK_OPTIONS } from "../../../_constants";
import { useState } from "react";



type CardProps = {
    type: 'project' | 'task',
    project?: Project,
    task?: Task
};

export const ProjectCard = (project: Project) => {
    const { user } = useAuth();
    const { handleSetView } = useContent();
    const { handleSetProject } = useProjects();

    const handlerViewTasks = () => {
        handleSetProject(project)
        handleSetView('tasks');
    }

    return (
        <ChakraCard {...chakraCardProps}>
            <CardHeader>
                <Heading size={'md'}>{project.name}</Heading>
            </CardHeader>
            <CardFooter justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize={'15px'}>
                    Created by: {
                        project.createdBy.userId === user.userId ? 'you' : project.createdBy.firstname
                    }</Text>
                <Button colorScheme='green' onClick={() => handlerViewTasks()}>View Project</Button>
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

    const [currentStatus, setStatus] = useState<any>();
    const [loading, setLoading] = useState(false);
    const { handleSetTask, task: currentTask, sendTaskUpdated, handleUpdateStatusTasks } = useTasks();
    const { onOpen, isOpen, onClose } = useDisclosure();

    const handleViewDetailTask = () => {
        handleSetTask(task);
        onOpen();
    }

    const handleChangeStatus = async (status: any) => {
        setStatus(status);
        handleSetTask({ ...currentTask, status: currentStatus });
        handleUpdateStatusTasks(status);
        // finding the current task and updating it
        setLoading(true);
        await sendTaskUpdated(status);
        setLoading(false);
    }

    return (
        <>
            <ChakraCard {...chakraCardProps}>
                <CardHeader>
                    <Flex justifyContent={'flex-end'} width='100%'>
                        <Badge colorScheme={mapColorStatus[task.status] || mapColorStatus['DEFAULT']}>{task.status}</Badge>
                    </Flex>
                    <Heading size='md'>{task.title}</Heading>
                </CardHeader>
                <CardFooter justifyContent='flex-end'>
                    <Button colorScheme='blue' onClick={() => handleViewDetailTask()} >Details</Button>
                </CardFooter>
            </ChakraCard>

            <CustomModal title={task.title} onClose={onClose} isOpen={isOpen}>
                <Text>{task.description}</Text>
                <Box mt={10}>
                    <Text fontWeight={'bold'}>Asigneees:</Text>
                    <UnorderedList>
                        {task.asignees.map(user => <ListItem textTransform={'capitalize'} key={user.userId}>{`${user.firstname} ${user.lastname}`}</ListItem>)}
                    </UnorderedList>

                </Box>
                <Box marginTop={10}>
                    <Text fontWeight={'bold'}>Status:</Text>
                    <Select value={task.status} onChange={(e) => handleChangeStatus(e.target.value)} isDisabled={loading}>
                        {
                            STATE_TASK_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </Select>
                </Box>
            </CustomModal>
        </>
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
