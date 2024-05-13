

import { Box, BoxProps, Button, ButtonProps, Flex, FlexProps, Heading, useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../../../hooks';
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
    /**
     * Renders
     */
    return (
        <>
            <Box {...navbarProps}>
                <Heading as="h1" fontSize={'25px'} textTransform={'capitalize'}>Bienvenid@ {user.firstname}👋</Heading>
                <Flex {...flexWrapperProps}>
                    <Button {...btnLogoutProps} onClick={() => onLogout()}>Logout</Button>
                    <Button {...btnCreateProjectProps} onClick={onOpen}>Create Project </Button>
                </Flex>
            </Box>
            <CustomModal title={'Create a new Project ✨'} onClose={onClose} isOpen={isOpen}>
                <p>lil</p>
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

const btnCreateProjectProps: ButtonProps = {
    colorScheme: 'blue'
}

export { Navbar };

