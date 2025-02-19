import axiosInstance from "@/lib/axiosInstance"

export class JobMinimumExpService {

    static path = '/api/experience';

    static getCategory = () => {
        return axiosInstance.get(`${this.path}`)
    }

}