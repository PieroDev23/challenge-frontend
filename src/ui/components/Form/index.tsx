import { Box, BoxProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';


export type FormProps = {
    name: string;
    styles?: BoxProps
    handleSubmit?: (event: any ) => void
} & PropsWithChildren


function Form({ name, children, styles, handleSubmit }: FormProps) {
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
        <Box  {...boxProps} onSubmit={handleSubmit}>
            {children}
        </Box>
    );
}

export { Form };