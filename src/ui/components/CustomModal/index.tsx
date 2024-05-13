import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ModalProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode
};

function CustomModal({ isOpen, onClose,  children, title }: ModalProps) {
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
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export { CustomModal };

