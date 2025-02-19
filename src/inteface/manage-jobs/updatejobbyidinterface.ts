export interface JobPostRequest {
    job_level_id: number;
    job_category_id: number;
    job_category_skill_id: number[];
    job_type_id: number;
    title: string;
    vacancy: number;
    minimum_experience_id: number;
    maximum_experience_id: number;
    minimum_salary: number;
    maximum_salary: number;
    description: string;
    responsibility: string;
  }
  
  export interface JobPostResponse {
    message: string;
  }
  