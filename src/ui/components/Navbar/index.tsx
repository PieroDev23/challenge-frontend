

import { Box, BoxProps, Button, ButtonProps, Flex, FlexProps, Heading } from '@chakra-ui/react';


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

    /**
     * Renders
     */
    return (
        <>
            <Box {...navbarProps}>
                <Heading as="h1" fontSize={'25px'}>Bienvenid@ Usuario👋</Heading>
                <Flex {...flexWrapperProps}>
                    <Button {...btnLogoutProps}>Logout</Button>
                    <Button {...btnCreateProjectProps}>Create Project </Button>
                </Flex>
            </Box>
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