import axiosInstance from "@/lib/axiosInstance";

export class BusinessCategoryService {
  static path = "/business-category";

  static getCategory = () => {
    return axiosInstance.get(`${this.path}/recruiter`);
  };
}
