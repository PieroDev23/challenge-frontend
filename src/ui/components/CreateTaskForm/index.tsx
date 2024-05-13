import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { Form } from "../Form";
import { useEffect, useState } from "react";
import { useAuth, useProjects, useTasks } from "../../../hooks";
import { getSelectOptions } from "../../../helpers";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { EXCEPTION_ERROR_MESSAGE, REQUIRED_VALIDATION_MESSAGE } from "../../../_constants";
import { CustomAlert } from "../CustomAlert";


function CreateTaskForm({ onClose }: { onClose: () => void }) {
    /**
     * Initializers
     */

    const defaultValues = {
        title: '',
        description: '',
    }

    const [options, setOptions] = useState<readonly any[]>([]);
    const [asignees, setAsignees] = useState<string[]>([]);
    const [formError, setFormError] = useState({ hasError: false, message: '' });
    const [loading, setLoading] = useState(false);
    /**
     * Contexts
     */
    const { project } = useProjects();
    const { handleCreateTask } = useTasks();
    /**
     * Functions
     */

    /**
     * Hooks
     */
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

    useEffect(() => {
        const options = project.members.map(member => ({ value: member.userId, label: `${member.firstname} ${member.lastname}` }));
        setOptions(options);
    }, []);


    const handleSetAsignees = (evt: any) => {
        const asignees = evt.map((a: any) => a.value);
        setAsignees(asignees);
    }

    const onSubmit = async (data: any) => {
        setFormError(prev => ({ ...prev, hasError: false }));
        setLoading(true);

        if (asignees.length === 0) {
            setFormError({ hasError: true, message: 'I think you want to asign this task to someone, right? 🐸' });
            setLoading(false);
            return;
        }

        try {
            await handleCreateTask({ ...data, asignees, idProject: project.idProject });
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
            <Form name="create-task" handleSubmit={handleSubmit(onSubmit)} styles={{ paddingBottom: '8px' }}>
                <FormControl isInvalid={!!errors.title}>
                    <FormLabel>Title <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Input placeholder="Hunting the alien frog 🐸"  {...register('title', { required: REQUIRED_VALIDATION_MESSAGE })} />
                    {errors.title && <FormErrorMessage children={errors.title.message} />}
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                    <FormLabel>Description <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Textarea placeholder="That frog made feel really angry." {...register('description', { required: REQUIRED_VALIDATION_MESSAGE })} />
                    {errors.description && <FormErrorMessage children={errors.description.message} />}
                </FormControl>

                <FormControl>
                    <FormLabel>Asignees <span style={{ color: 'red' }}>*</span></FormLabel>
                    <Select options={options} isMulti name="asignees" onChange={handleSetAsignees} />
                </FormControl>

                <Divider />
                <Button type="submit" colorScheme="blue" isLoading={loading}>Create Task 📝</Button>

                {formError.hasError && <CustomAlert status="error" text={formError.message} />}
            </Form>
        </>
    );
}

export { CreateTaskForm };