// import { axiosInstance } from "@/lib/axiosInstance";
// import { JobPostRequest,JobPostResponse } from "@/inteface/manage-jobs/updatejobbyidinterface";

// export class GetJobByIdService {

//     static path = "/api/job-post"

//     static manageJob =(token:string,id:string,) => {
//         console.log(`Bearer ${token}`)
//         return axiosInstance.get(`${this.path}/recruiter/${id}`,{
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//     }
// }

import { axiosInstance } from "@/lib/axiosInstance";
import { JobPostRequest } from "@/inteface/manage-jobs/updatejobbyidinterface";

export class JobService {
  static path = "/api/job-post";
  /**
   * Creates a new job post for a recruiter.
   * @param token - The authorization token.
   * @param id - The recruiter ID.
   * @param data - The job post data.
   * @returns The created job post response.
   */
  static createJobPost = (token: string, id: string, data: JobPostRequest) => {
    console.log("response service",token)
    return axiosInstance.patch(`${this.path}/recruiter/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
