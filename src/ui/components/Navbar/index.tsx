

import { Box, BoxProps, Button, ButtonProps, Flex, FlexProps, Heading, useDisclosure } from '@chakra-ui/react';
import { useAuth, useContent } from '../../../hooks';
import { CreateProjectForm } from '../CreateProjectForm';
import { CustomModal } from '../CustomModal';
import { CreateTaskForm } from '../CreateTaskForm';

function Navbar() {
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
    const { onLogout, user } = useAuth();
    const { onClose, onOpen, isOpen } = useDisclosure();
    const { view, handleSetView } = useContent();

    const label = view === 'projects' ? 'project' : 'task';


    const ModalForm = ({ onClose }: { onClose: () => void; }) => {

        if (view === 'projects') {
            return <CreateProjectForm onClose={onClose} />
        }

        return <CreateTaskForm onClose={onClose} />
    }

    /**
     * Renders
     */
    return (
        <>
            <Box {...navbarProps}>
                <Heading as="h1" fontSize={'25px'} textTransform={'capitalize'}>Bienvenid@ {user.firstname}👋</Heading>
                <Flex {...flexWrapperProps}>
                    <Button {...btnLogoutProps} onClick={() => onLogout()}>Logout</Button>
                    <Button {...btnCreateProps} onClick={onOpen}>Create {label} </Button>
                    {
                        view === 'tasks' && <Button {...btnBackToPrjectsProps} onClick={() => handleSetView('projects')}>See projects</Button>
                    }
                </Flex>
            </Box>
            <CustomModal title={`Create a new ${label} ✨`} onClose={onClose} isOpen={isOpen}>
                <ModalForm onClose={onClose} />
            </CustomModal>
        </>
    );
}

const flexWrapperProps: FlexProps = {
    gap: '13px'
}
const navbarProps: BoxProps = {
    padding: '35px',
    display: 'flex',
    flexDir: {
        base: 'column',
        md: 'row'
    },
    gap: '13px',
    bgColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'space-between'
}

const btnLogoutProps: ButtonProps = {
    variant: 'outline'
}

const btnCreateProps: ButtonProps = {
    colorScheme: 'blue'
}

const btnBackToPrjectsProps: ButtonProps = {
    colorScheme: 'purple'
}

export { Navbar };

