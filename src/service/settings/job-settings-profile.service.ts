import axiosInstance from "@/lib/axiosInstance";

export class SettingsProfileService {
  static path = "/api/profile";

  static getProfile = (token: string) => {
    return axiosInstance.get(`${this.path}/recruiter`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
