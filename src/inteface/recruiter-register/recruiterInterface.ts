export interface RegisterInterface {
  company_image: File | null;
  auth_id: string;
  profile: {
    first_name: string;
    last_name: string;
  };
  company_business_category_id: string;
  company: {
    name: string;
    slug: string;
    company_size_id: string;
    auth_id: string;
  };
}

export interface CompanySize {
  id: number;
  title: string;
}

export interface CompanySizeResponse {
  data: CompanySize[];
}
