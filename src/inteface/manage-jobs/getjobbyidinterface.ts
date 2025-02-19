
  
  export interface JobDetails {
    id: number;
    title: string;
    job_level_id: number;
    job_type_id: number;
    job_category_id: number;
    minimum_experience_id: number;
    maximum_experience_id: number;
    job_category_skill_id: number[];
    minimum_salary: number;
    maximum_salary: number;
    vacancy: number;
    description: string;
    responsibility: string;
    createdAt: string;
    updatedAt: string;
  }
  