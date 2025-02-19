import { RegisterInterface } from "@/inteface/recruiter-register/recruiterInterface";
import axios from "@/lib/axiosInstance";
import { HttpStatusCode, AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export class RegisterService {
  static registerCandidate() {
    throw new Error("Method not implemented.");
  }
  static path: string = `${process.env.NEXT_PUBLIC_BASE_URL}register/recruiter`; 

  // Method to register a recruiter
  static registerRecruiter = async (data: RegisterInterface) => {
    try {
      const formData = new FormData();
      
      // Add the company image if it exists
      if (data.company_image) {
        formData.append("company_logo", data.company_image);
      }
      
      formData.append("company_business_category_id", JSON.stringify(data.company_business_category_id))
      // Add other fields
      formData.append("auth_id", data.auth_id);
      formData.append("profile", JSON.stringify(data.profile));
      formData.append("company", JSON.stringify(data.company));

      // Make the API request
      const { status, data: responseData } = await axios.post(this.path, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      // Handle HTTP statuses
      switch (status) {
        case HttpStatusCode.Ok:
        case HttpStatusCode.Created:
          return responseData;
        default:
          return responseData;
      }
    } catch (error) {
      // Catch and handle errors
      const typedError = error as AxiosError<ErrorResponse>;
      console.error("Error during registration:", typedError.response);
      throw new Error(typedError.response?.data?.message || "Registration failed");
    }
  };
}
