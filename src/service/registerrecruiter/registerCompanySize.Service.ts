import axios from "@/lib/axiosInstance";
import { CompanySizeResponse } from "@/inteface/recruiter-register/recruiterInterface";

export class CompanySizeService {
  static path: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/company-size/recruiter`;

  // Method to fetch company sizes
  static getCompanySizes = async (): Promise<CompanySizeResponse> => {
    try {
      const response = await axios.get<CompanySizeResponse>(this.path, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching company sizes:", error);
      throw new Error("Failed to fetch company sizes");
    }
  };
}
