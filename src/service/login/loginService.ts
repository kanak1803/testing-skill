import { IsLogin } from "@/inteface/login/loginInterface";
import { HttpStatusCode } from "axios";
import { axiosInstance } from "@/lib/axiosInstance";

export class LoginService {

    static path: string = '/api/auth/signin';

    static loginEmail = async (body: IsLogin) =>{
        try{
            const {status,data} = await axiosInstance.post(`${this.path}/recuiter`,body);
            switch(status){
                case HttpStatusCode.Ok:{
                    return data
                }
                case HttpStatusCode.Created:{
                    return data
                }
                default:{
                    return data
                }
            }
        }catch(error){
            console.log(error)
        }
    }
}