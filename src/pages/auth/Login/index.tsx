
import { Box, BoxProps, FormControl, Input, InputProps, FormLabel, Heading, ButtonProps, Button } from "@chakra-ui/react";
import { Form, FormProps } from "../../../ui/components";
import { useNavigate } from 'react-router-dom';



function LoginPage() {
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
                <Heading as='h1' marginBottom={'8px'}> Login </Heading>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input {...inputEmailProps} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input {...inputPasswordProps} />
                </FormControl>

                <Button {...btnSubmitProps} />
                <Button {...btnRegisterProps} onClick={() => navigate('/register')} />
            </Form>
        </Box>
    );
}

/** STYLES */
const formProps: FormProps = {
    name: 'login',
    styles: {
        width: {
            base: '90%',
            md: '45%',
            lg: '35%',
            xl: '500px'
        },
        outline: '1px solid #e6e6e6cc',
        padding: '20px',
    }
}

const btnSubmitProps: ButtonProps = {
    type: 'submit',
    children: 'login',
    colorScheme: 'blue'
}

const btnRegisterProps: ButtonProps = {
    type: 'button',
    children: 'New? Create an Account ➡️',
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

const inputPasswordProps: InputProps = {
    type: 'password',
    name: 'password'
}

export { LoginPage };