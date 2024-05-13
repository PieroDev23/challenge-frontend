import { Box, BoxProps } from "@chakra-ui/react";
import { Navbar, ContentWrapper } from "../../../ui/components";



type DashboardPageProps = {
    someVar?: boolean;
    someFn?: (param: boolean) => void;
};

function DashboardPage(props: DashboardPageProps) {
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
            <Box {...pageWrapperProps}>
                <Navbar/>
                <ContentWrapper />
            </Box>
        </>
    );
}

const pageWrapperProps: BoxProps = {
    display: 'flex',
    flexDir: 'column',
    height: '100%'
}


export { DashboardPage };