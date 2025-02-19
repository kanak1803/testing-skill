export interface SettingsCompanyInterface {
id: string,
name: string,
website_url: string,
slug: string,
company_size_id: number,
description: string,
company_logo_id: number,
company_log: {
    id: number,
    url: string,
    file_name: string
    etag: string,
    server_side_encryption:string,
    alt: string,
    created_at: string,
    updated_at: string,
}
}