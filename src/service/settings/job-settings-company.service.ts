import axiosInstance from "@/lib/axiosInstance";

export class SettingsCompanyService {
  static path = "/api/profile";

  static getCompany = (token: string) => {
    return axiosInstance.get(`${this.path}/recruiter/company`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
