import { ISignupSendEmail } from "@/inteface/signup/signupInterface";
import { axiosInstance } from "@/lib/axiosInstance";
import { HttpStatusCode } from "axios";

export class SignupService {

    static path: string = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup/recruiter`;

    static postSendEmail = async (body: ISignupSendEmail) => {
        try {
            const { status, data } = await axiosInstance.post(`${this.path}/sendEmail`, body);
            switch(status) {
                case HttpStatusCode.Ok: {
                    return data
                }
                case HttpStatusCode.Created: {
                    return data
                }
                default: {
                    return data
                }
            }
            // return 
        }
        catch(error) {
            console.log(error)
        }
    }

}