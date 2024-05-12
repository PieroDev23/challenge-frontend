import { useState } from "react";



/**
 * A Simple hook for handling with the LocalStorage API
 * @returns value and some utility methods form handling Local Storage
 */
export const useLocalStorage = (key: string) => {
    const [value, setValue] = useState<string | null>(null);

    const setItem = (newValue: string) => {
        localStorage.setItem(key, newValue);
        setValue(newValue);
    };

    const removeItem = () => {
        localStorage.removeItem(key);
        setValue(null);
    };

    return { value, setItem, removeItem };
};