import { Box, BoxProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';


export type FormProps = {
    name: string;
    styles?: BoxProps
} & PropsWithChildren


function Form({ name, children, styles }: FormProps) {
    /**
     * Initializers
     */

    const boxProps: BoxProps = {
        id: name,
        as: 'form',
        display: 'flex',
        flexDir: 'column',
        gap: '13px',
        ...styles
    }

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
        <Box  {...boxProps}>
            {children}
        </Box>
    );
}

export { Form };