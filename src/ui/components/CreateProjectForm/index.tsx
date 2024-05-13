
import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { EXCEPTION_ERROR_MESSAGE, REQUIRED_VALIDATION_MESSAGE } from '../../../_constants';
import { getSelectOptions } from '../../../helpers';
import { useAuth, useProjects } from '../../../hooks';
import { CustomAlert } from '../CustomAlert';
import { Form } from '../Form';

function CreateProjectForm({ onClose }: { onClose: () => void }) {
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
    const { token, user } = useAuth();
    const { handleCreateProject } = useProjects();


    const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues });

    useEffect(() => {
        const fetchOptions = async () => {
            const options = await getSelectOptions(token!);
            setOptions(options.filter((opt: any) => opt.value !== user.userId))
        }

        fetchOptions();
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


        onClose();
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
                    <FormLabel>Participants <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Select name='participants' isMulti options={options} onChange={handleSelectConsumersIds} />
                </FormControl>

                <Divider />
                <Button colorScheme='blue' type='submit' isLoading={loading}>Create ⬆️</Button>

                {formError.hasError && <CustomAlert status="error" text={formError.message} />}
            </Form>
        </>
    );
}

export { CreateProjectForm };
