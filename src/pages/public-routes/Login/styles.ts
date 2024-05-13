import { ButtonProps, BoxProps, InputProps } from "@chakra-ui/react"
import { FormProps } from "../../../ui/components"

/** STYLES */
export const formProps: FormProps = {
    name: 'login',
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
    children: 'login',
    colorScheme: 'blue'
}

export const btnRegisterProps: ButtonProps = {
    type: 'button',
    children: 'New? Create an Account ➡️',
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
    name: 'email',
    placeholder: 'example@example.com'
}

export const inputPasswordProps: InputProps = {
    type: 'password',
    name: 'password'
}