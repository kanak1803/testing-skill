import axiosInstance from "@/lib/axiosInstance"

export class JobCategoryService {

    static path = '/api/job-category';

    static getCategory = () => {
        return axiosInstance.get(`${this.path}/recruiter`)
    }

}