import axios from "axios";
import { User } from "../_types";

export function sanitizeObject(obj: { [k: string]: any }) {
    const sanitizedObj: any = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'string' && key !== 'password') {
                sanitizedObj[key] = value.trim().toLowerCase();
            } else {
                sanitizedObj[key] = value;
            }
        }
    }

    return sanitizedObj;
}


export function injectTokenOnHeaders(token: string) {
    return { headers: { Authorization: `Bearer ${token}` } }
}


export async function getSelectOptions(token: string) {
    try {
        const { data: axiosData } = await axios.get(`${import.meta.env.VITE_API_URL}/user/get-all`, { ...injectTokenOnHeaders(token) });
        const options = axiosData.users.map(({ firstname, lastname, userId, role }: User) => ({
            value: userId,
            label: `${firstname} ${lastname} ${role === 'ADMIN' ? '(ADMIN)' : ''}`
        }));

        return options;
    } catch (error) {
        return []
    }
}