
import { Form } from '../Form';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { injectTokenOnHeaders } from '../../../helpers';
import { useAuth, useProjects } from '../../../hooks';
import { User } from '../../../_types';
import { useForm } from 'react-hook-form';
import { EXCEPTION_ERROR_MESSAGE, REQUIRED_VALIDATION_MESSAGE } from '../../../_constants';
import { CustomAlert } from '../CustomAlert';

function CreateProjectForm() {
    /**
     * Initializers
     */

    /**
     * Contexts
     */

    const defaultValues = {
        name: '',
    }

    const [options, setOptions] = useState<readonly any[]>([]);
    const [consumersIds, setConsumersIds] = useState<string[]>([]);
    const [formError, setFormError] = useState({ hasError: false, message: '' });
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const { handleCreateProject } = useProjects();

    const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues });
    useEffect(() => {
        //todo: call api here

        const getAllUsers = async () => {
            try {
                const { data: axiosData } = await axios.get(`${import.meta.env.VITE_API_URL}/user/get-all`, { ...injectTokenOnHeaders(token!) });
                const options = axiosData.users.map(({ firstname, lastname, userId, role }: User) => ({
                    value: userId,
                    label: `${firstname} ${lastname} ${role === 'ADMIN' ? '(ADMIN)' : ''}`
                }));
                setOptions(options);
            } catch (error) {
                console.log(error);
            }
        }

        getAllUsers();

    }, []);


    const handleSelectConsumersIds = (evt: any) => {
        const consumersIds = evt.map((s: any) => s.value);
        setConsumersIds(consumersIds);
    }

    /**
     * Hooks
     */
    const onSubmit = async (data: any) => {
        setFormError({ hasError: false, message: '' });
        setLoading(true);

        if (consumersIds.length === 0) {
            setFormError({ hasError: true, message: 'You must select some participants' });
            setLoading(false);
            return;
        }

        try {
            await handleCreateProject({ titleProject: data.name, consumersIds })
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (!(error instanceof AxiosError)) {
                return;
            }

            setFormError({ hasError: true, message: error.response?.data.message || EXCEPTION_ERROR_MESSAGE });
            console.log(error.response?.data);
        }
    }

    /**
     * Renders
     */
    return (
        <>
            <Form name='create-project' styles={{ px: '15px', paddingBottom: '8px' }} handleSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Project name <span style={{ color: 'red' }}>*</span> </FormLabel>
                    <Input {...register('name', { required: REQUIRED_VALIDATION_MESSAGE })} />
                    {errors.name && <FormErrorMessage children={errors.name.message} />}
                </FormControl>

                <FormControl>
                    <Select name='participants' isMulti options={options} onChange={handleSelectConsumersIds} />
                </FormControl>

                <Button colorScheme='blue' type='submit' isLoading={loading}>Create ⬆️</Button>

                {formError.hasError && <CustomAlert status="error" text={formError.message} />}
            </Form>
        </>
    );
}

export { CreateProjectForm };