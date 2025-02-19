import axiosInstance from "@/lib/axiosInstance"

export class JobMaximumExpService {

    static path = '/api/experience';

    static getCategory = () => {
        return axiosInstance.get(`${this.path}`)
    }

}