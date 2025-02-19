import axiosInstance from "@/lib/axiosInstance"

export class JobTypeService {

    static path = '/api/job-type';

    static getCategory = () => {
        return axiosInstance.get(`${this.path}/recruiter`)
    }

}