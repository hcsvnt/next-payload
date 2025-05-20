import Cookies from 'js-cookie';
import { useState } from 'react';

export default function useCookie(name: string, defaultValue: string) {
    const [value, setValue] = useState<string | null>(() => {
        const cookie = Cookies.get(name);

        if (!cookie) {
            Cookies.set(name, defaultValue);
            return defaultValue;
        }

        return cookie;
    });

    // this could also take an options object if needed
    const updateCookie = (newValue: string) => {
        Cookies.set(name, newValue);
        setValue(newValue);
    };

    const deleteCookie = () => {
        setValue(null);
        Cookies.remove(name);
    };

    return { value, updateCookie, deleteCookie };
}
