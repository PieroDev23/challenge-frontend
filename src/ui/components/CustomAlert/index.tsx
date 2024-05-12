import { Alert, AlertIcon } from "@chakra-ui/react";





type CustomAlertProps = {
    text: string;
    status: 'error' | 'success' | 'warning' | 'info',

};


function CustomAlert(props: CustomAlertProps) {
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

    /**
     * Renders
     */
    return (
        <Alert status={props.status}>
            <AlertIcon />
            {props.text}
        </Alert>
    );
}

export { CustomAlert };