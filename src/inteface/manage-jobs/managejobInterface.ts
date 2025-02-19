export interface ExperienceDuration {
  years: number;
}

export interface ManageJobInterface {
  id: string;
  title: string;
  job_level_name: string;
  job_type_name: string;
  job_category_title: string;
  minimum_experience_duration: ExperienceDuration;
  maximum_experience_duration: ExperienceDuration;
  maximum_experience_id: number;
  minimum_salary: string;
  maximum_salary: string;
  vacancy: number;
  description: string;
  responsibility: string;
  created_at: string;
  updated_at: string;
}
