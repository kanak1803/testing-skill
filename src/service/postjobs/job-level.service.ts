import axiosInstance from "@/lib/axiosInstance"

export class JobLevelService {

    static path = '/api/job-level';

    static getCategory = () => {
        return axiosInstance.get(`${this.path}/recruiter`)
    }

}