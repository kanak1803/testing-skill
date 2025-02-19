import { ECookie } from "@/enum/cookie/cookie.enum";

export class CookierUtils {

    static parser = (cookie: string) => {

        const object: any = {};

        cookie.split("; ").forEach((data: string) => {
            const [key, value] = data.split('=');

            Object.assign(object, {
                [key]: value
            })

        })

        return object

    }

    static getCookie = (key: ECookie) => {
        const cookieData: string = document.cookie;
        const parser = this.parser(cookieData);
        console.log(parser, 'testing data')
        return parser[ECookie.AuthStep];
    }
    
}