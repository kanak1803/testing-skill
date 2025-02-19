import axiosInstance from "@/lib/axiosInstance";

export class JobCategorySkillsService {

    static path = '/api/skill';

    // Update to accept categoryId dynamically
    static getCategory = (categoryId: number) => {
        return axiosInstance.get(`${this.path}/recruiter/category/${categoryId}`);
    }
}
