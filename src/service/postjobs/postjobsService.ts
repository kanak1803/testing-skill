import { IJobPost } from "@/inteface/post-jobs/postJobsInterface";
import { HttpStatusCode } from "axios";
import axios from "@/lib/axiosInstance";

export class JobPostService {
  static path: string = `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-post`;

  static createJobPost = async (body: IJobPost) => {
    try {
      const { status, data } = await axios.post(`${this.path}/recruiter`, body);
      switch (status) {
        case HttpStatusCode.Ok: {
          return data;
        }
        case HttpStatusCode.Created: {
          return data;
        }
        default: {
          return data;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
