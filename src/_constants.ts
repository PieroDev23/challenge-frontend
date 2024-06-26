


export const REQUIRED_VALIDATION_MESSAGE = 'This field is required';
export const AUTH_ITEM_KEY_LS = 'user';
export const AUTH_TOKEN_ITEM_KEY_LS = 'token';
export const EXCEPTION_ERROR_MESSAGE = 'Server is not responding correctly, try again later.';

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


export const STATE_TASK_OPTIONS = [
    {
        name: 'to-do',
        value: 'PENDING',
    },
    {
        name: 'completed',
        value: 'COMPLETED'
    },
    {
        name: 'in progress',
        value: 'IN_PROGRESS'
    }
]