import { axiosInstance } from "@/lib/axiosInstance";

export class GetJobByIdService {

    static path = "/api/job-post"

    static manageJob =(token:string,id:string) => {
        console.log(`Bearer ${token}`)
        return axiosInstance.get(`${this.path}/recruiter/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    }
}