import { axiosInstance } from "@/lib/axiosInstance";

export class OauthService {

    static path = '/oauth';

    /**
     * @url https://api.skillbuddy.in/api/oauth/recruiter
     * @method POST
     * @description To authticate using google auth 
     */

    static googleAuth = (body: { ip_id: number, id_token: string }) => {
        return axiosInstance.post('auth/oauth/recruiter/google-auth', body)
    }

}