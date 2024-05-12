import { Heading, FormControl, FormLabel, Input, Button, ButtonProps, BoxProps, InputProps, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Form, FormProps } from "../../../ui/components";



function RegisterPage() {
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

    const navigate = useNavigate();

    /**
     * Renders
     */
    return (
        <Box {...boxProps}>
            <Form {...formProps}>
                <Heading as='h1'> Register </Heading>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input {...inputEmailProps} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>First names</FormLabel>
                    <Input {...inputFirstnameProps} />
                </FormControl>

                <FormControl>
                    <FormLabel>Last names</FormLabel>
                    <Input {...inputLastnameProps} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input {...inputPasswordProps} />
                </FormControl>

                <Button {...btnSubmitProps} />
                <Button {...btnBackProps} onClick={() => navigate('/')} />
            </Form>
        </Box>
    );
}

const formProps: FormProps = {
    name: 'register',
    styles: {
        width: {
            base: '100%',
            lg: '500px',
        },
        outline: '1px solid #e6e6e6cc',
        padding: '20px',
    }
}

const btnSubmitProps: ButtonProps = {
    type: 'submit',
    children: 'Register',
    colorScheme: 'blue'
}

const btnBackProps: ButtonProps = {
    type: 'button',
    children: 'Not new? go login ➡️',
    variant: 'outline'
}

const boxProps: BoxProps = {
    display: 'flex',
    justifyContent: 'center',
    flexDir: 'column',
    padding: '15px',
    alignItems: 'center',
    height: '100%',
}

const inputEmailProps: InputProps = {
    type: 'email',
    name: 'email',
    placeholder: 'example@example.com'
}

const inputFirstnameProps: InputProps = {
    type: 'text',
    name: 'firstname',
    placeholder: 'Your first names here'
}

const inputLastnameProps: InputProps = {
    type: 'text',
    name: 'lastname',
    placeholder: 'Your last names here'
}

const inputPasswordProps: InputProps = {
    type: 'password',
    name: 'password'
}


export { RegisterPage };