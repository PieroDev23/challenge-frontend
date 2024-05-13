import { ButtonProps, BoxProps, InputProps } from "@chakra-ui/react"
import { FormProps } from "../../../ui/components"

export const formProps: FormProps = {
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

export const btnSubmitProps: ButtonProps = {
    type: 'submit',
    children: 'Register',
    colorScheme: 'blue'
}

export const btnBackProps: ButtonProps = {
    type: 'button',
    children: 'Not new? go login ➡️',
    variant: 'outline'
}

export const boxProps: BoxProps = {
    display: 'flex',
    justifyContent: 'center',
    flexDir: 'column',
    padding: '15px',
    alignItems: 'center',
    height: '100%',
}

export const inputEmailProps: InputProps = {
    type: 'email',
    placeholder: 'example@example.com'
}

export const inputFirstnameProps: InputProps = {
    type: 'text',
    name: 'firstname',
    placeholder: 'Your first names here'
}

export const inputLastnameProps: InputProps = {
    type: 'text',
    name: 'lastname',
    placeholder: 'Your last names here'
}

export const inputPasswordProps: InputProps = {
    type: 'password',
    name: 'password'
}