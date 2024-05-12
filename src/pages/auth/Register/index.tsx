import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AUTH_ITEM_KEY_LS, AUTH_TOKEN_ITEM_KEY_LS, EMAIL_REGEX, EXCEPTION_ERROR_MESSAGE, REQUIRED_VALIDATION_MESSAGE } from "../../../_constants";
import { useAuth, useLocalStorage } from "../../../hooks";
import { CustomAlert, Form } from "../../../ui/components";
import { boxProps, btnBackProps, btnSubmitProps, formProps, inputEmailProps, inputFirstnameProps, inputLastnameProps, inputPasswordProps } from "./styles";



function RegisterPage() {
    /**
     * Initializers
     */

    const [formError, setFormError] = useState({ hasError: false, message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const defaultValues = {
        email: '',
        lastname: '',
        firstname: '',
        password: ''
    }


    const { setItem: setUserDataLs } = useLocalStorage(AUTH_ITEM_KEY_LS);
    const { setItem: setTokenLs } = useLocalStorage(AUTH_TOKEN_ITEM_KEY_LS);
    const { onSendAuth } = useAuth();
    const { register, handleSubmit, formState } = useForm({ defaultValues });
    const { errors } = formState;


    const handleSubmitCallback = async (data: FieldValues) => {
        setFormError({ hasError: false, message: '' });
        setIsLoading(true);
        try {
            const response = await onSendAuth(data, `${import.meta.env.VITE_API_URL}/auth/register`);
            const { user, token } = response;

            setUserDataLs(JSON.stringify(user));
            setTokenLs(token);
            navigate('/dashboard');
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);

            if (!(error instanceof AxiosError)) {
                return;
            }

            setFormError({ hasError: true, message: error.response?.data.message || EXCEPTION_ERROR_MESSAGE });
            console.log(error.response?.data);
        }
    }

    /**
     * Hooks
     */

    const navigate = useNavigate();

    /**
     * Renders
     */
    return (
        <Box {...boxProps}>
            <Form {...formProps} handleSubmit={handleSubmit(handleSubmitCallback)}>
                <Heading as='h1' marginBottom={'8px'}> Register </Heading>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input {...inputEmailProps} {...register('email', {
                        required: REQUIRED_VALIDATION_MESSAGE, pattern: {
                            value: EMAIL_REGEX,
                            message: 'Enter a valid email address'
                        }
                    })} />
                    {errors.email && <FormErrorMessage children={errors.email.message} />}
                </FormControl>

                <FormControl isInvalid={!!errors.firstname}>
                    <FormLabel>First name <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input {...inputFirstnameProps} {...register('firstname', { required: REQUIRED_VALIDATION_MESSAGE })} />
                    {errors.firstname && <FormErrorMessage children={errors.firstname.message} />}
                </FormControl>

                <FormControl isInvalid={!!errors.lastname}>
                    <FormLabel>Last name <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input {...inputLastnameProps}  {...register('lastname', { required: REQUIRED_VALIDATION_MESSAGE })} />
                    {errors.lastname && <FormErrorMessage children={errors.lastname.message} />}
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input {...inputPasswordProps}  {...register('password', { required: REQUIRED_VALIDATION_MESSAGE })} />
                    {errors.password && <FormErrorMessage children={errors.password.message} />}
                </FormControl>

                <Button {...btnSubmitProps} isLoading={isLoading} />
                <Button {...btnBackProps} onClick={() => navigate('/')} />

                {formError.hasError && <CustomAlert status="error" text={formError.message} />}
            </Form>
        </Box>
    );
}




export { RegisterPage };

