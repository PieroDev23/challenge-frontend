

import { Box, BoxProps, Button, ButtonProps, Flex, FlexProps, Heading, useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAuth, useContent, useProjects } from '../../../hooks';
import { CreateProjectForm } from '../CreateProjectForm';
import { CustomModal } from '../CustomModal';

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

    /**
     * Renders
     */
    return (
        <>
            <Box {...navbarProps}>
                <Heading as="h1" fontSize={'25px'} textTransform={'capitalize'}>Bienvenid@ {user.firstname}👋</Heading>
                <Flex {...flexWrapperProps}>
                    <Button {...btnLogoutProps} onClick={() => onLogout()}>Logout</Button>
                    <Button {...btnCreateProps} onClick={onOpen}>Create {view === 'projects' ? 'project' : 'task'} </Button>
                    {
                        view === 'tasks' && <Button {...btnBackToPrjectsProps} onClick={() => handleSetView('projects')}>See projects</Button>
                    }
                </Flex>
            </Box>
            <CustomModal title={'Create a new Project ✨'} onClose={onClose} isOpen={isOpen}>
                <CreateProjectForm />
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

