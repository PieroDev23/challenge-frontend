import { Box, Flex, FlexProps, Heading, HeadingProps, SimpleGrid } from "@chakra-ui/react";
import { Card } from "../Card";
import { Task } from "../../../_types";

const projectExample = {
    "idProject": "79ebb9e3-522b-491e-becd-173a4e449651",
    "title": "Code Challenge Delfosti",
    "members": [
        {
            "userId": "3dc4b3e2-70f7-4901-a516-ab8287446425",
            "firstname": "diego",
            "lastname": "davila",
            "email": "diego@gmail.com",
            "role": "CONSUMER"
        },
        {
            "userId": "63b0bc86-7259-46df-b57e-c8072b5cd909",
            "firstname": "franccesco",
            "lastname": "virgolini",
            "email": "franccesco@gmail.com",
            "role": "ADMIN"
        }
    ],
    "createdBy": {
        "userId": "63b0bc86-7259-46df-b57e-c8072b5cd909",
        "firstname": "franccesco",
        "lastname": "virgolini",
        "email": "franccesco@gmail.com",
        "role": "ADMIN"
    }
}

const taskExample: Task = {
    "idTask": "17e2ef41-1f8f-4168-8c2e-dadf842a92c8",
    "title": "task 2",
    "description": "A wonderfull and well documented description",
    "status": "COMPLETED",
    "createdAt": "2024-05-12T01:53:51.000Z",
    "updatedAt": "2024-05-12T03:19:07.000Z",
    "asignees": [
        {
            "userId": "3dc4b3e2-70f7-4901-a516-ab8287446425",
            "firstname": "diego",
            "lastname": "davila",
            "role": "CONSUMER",
            "email": "diego@gmail.com"
        }
    ]
}

function ContentWrapper() {
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
            <Box {...flexWrapperProps}>
                <Heading {...headingContentProps}>My Projects</Heading>
                {/* CARDS GOES HERE */}

                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                    <Card type="task" task={taskExample} />
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

const cardsContainerProps: FlexProps = {
    justifyContent: 'flex-start',
    flexDirection: {
        base: 'column',
        md: 'row'
    },
    wrap: 'wrap',
    gap: '13px',
}



export { ContentWrapper };