import { IIp } from "@/inteface/ip/ipInterface"
import axios, { ipAxiosInstance } from "@/lib/axiosInstance"

export class IpService {

    static path: string = 'ip';
    
    static getIpApi = () => {
        return ipAxiosInstance.get('/json')
    }

    static postIp = (ip: IIp) => {
        return axios.post(this.path, ip)
    }

}