
export function sanitizeObject(obj: { [k: string]: any }) {
    const sanitizedObj: any = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'string') {
                sanitizedObj[key] = value.trim().toLowerCase();
            } else {
                sanitizedObj[key] = value;
            }
        }
    }

    return sanitizedObj;
}
