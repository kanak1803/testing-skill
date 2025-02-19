import { TLocalStorage } from "@/type/localStorage/localStorage.type";

export class LocalStorageUtils {

    static get = (key: TLocalStorage): string | null => {
        return localStorage.getItem(key)
    }

    static set = (key: TLocalStorage, value: string | number) => {

        if(Number(value)) value = value.toString();

        if(typeof(value) === 'string') {
            localStorage.setItem(key, value);
        }
    }
}