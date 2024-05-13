
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AUTH_ITEM_KEY_LS, AUTH_TOKEN_ITEM_KEY_LS, EMAIL_REGEX, EXCEPTION_ERROR_MESSAGE, REQUIRED_VALIDATION_MESSAGE } from "../../../_constants";
import { useAuth, useLocalStorage } from "../../../hooks";
import { CustomAlert, Form } from "../../../ui/components";
import { boxProps, btnRegisterProps, btnSubmitProps, formProps, inputEmailProps, inputPasswordProps } from "./styles";



function LoginPage() {
    /**
     * Initializers
     */
    const defaultValues = {
        email: '',
        password: ''
    }

    /**
    * Hooks
    */

    const [formError, setFormError] = useState({ hasError: false, message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { setItem: setUserDataLs } = useLocalStorage(AUTH_ITEM_KEY_LS);
    const { setItem: setTokenLs } = useLocalStorage(AUTH_TOKEN_ITEM_KEY_LS);
    const { register, handleSubmit, formState, } = useForm({ defaultValues });
    const { errors } = formState;
    const { onSendAuth, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
            return;
        }
    }, []);

    const handleSubmitCallback = async (data: FieldValues) => {
        setFormError({ hasError: false, message: '' });
        setIsLoading(true);
        try {
            const response = await onSendAuth(data, `${import.meta.env.VITE_API_URL}/auth/login`);
            const { user, token } = response;
            setUserDataLs(JSON.stringify(user));
            setTokenLs(token);

            setIsLoading(false);
            navigate('/dashboard');
        } catch (error) {
            if (!(error instanceof AxiosError)) {
                return;
            }
            setIsLoading(false);
            setFormError({ hasError: true, message: error.response?.data.message || EXCEPTION_ERROR_MESSAGE });
        }
    }

    /**
     * Renders
     */
    return (
        <Box {...boxProps}>
            <Form {...formProps} handleSubmit={handleSubmit(handleSubmitCallback)}>
                <Heading as='h1' marginBottom={'8px'}> Login </Heading>

                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input {...inputEmailProps}  {...register('email', {
                        required: REQUIRED_VALIDATION_MESSAGE,
                        pattern: {
                            value: EMAIL_REGEX,
                            message: 'Enter a valid email address'
                        }
                    })} />
                    {errors.email && <FormErrorMessage children={errors.email.message} />}
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input {...inputPasswordProps}  {...register('password', { required: REQUIRED_VALIDATION_MESSAGE })} />
                    {errors.password && <FormErrorMessage children={errors.password.message} />}
                </FormControl>

                <Button {...btnSubmitProps} isLoading={isLoading} />
                <Button {...btnRegisterProps} onClick={() => navigate('/register')} />

                {formError.hasError && <CustomAlert status="error" text={formError.message} />}
            </Form>
        </Box >
    );
}



export { LoginPage };

