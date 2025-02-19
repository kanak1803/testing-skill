import { axiosInstance } from "@/lib/axiosInstance";

export class ManageJobService {

    static path = "/api/job-post"

    static manageJob =(token:string) => {
        console.log(`Bearer ${token}`)
        return axiosInstance.get(`${this.path}/recruiter`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    }
}