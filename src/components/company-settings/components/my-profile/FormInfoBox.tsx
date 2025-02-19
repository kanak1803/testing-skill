"use client";
import "./FormInfoBox.scss";
import { useState, useEffect } from "react";
import CustomEditor from "./CkEditorComponent";
import { useAppDispatch } from "@/lib/store/hook";
import { getCompanySettingAsync } from "@/lib/store/feature/settings/SettingsCompanySlice";
import Image from "next/image";

interface CompanyData {
  name: string;
  website_url: string;
  phone: string;
  email: string;
  slug: string;
  company_size_id: string;
  company_log?: {
    url: string;
    file_name: string;
  };
  description: string;
}


const FormInfoBox = () => {
  const dispatch = useAppDispatch();
  const [jobRoles, setJobRoles] = useState("");
  const [logoImg, setLogoImg] = useState<File | string>("");
  const [companyData, setCompanyData] = useState<CompanyData | null>(null); // To store company data

  // Handle file upload for the logo
  const logoHandler = (file: File) => {
    setLogoImg(file);
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcl9yb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNzM2MzU4NTAyfQ.D7J8ljii58s1tdrtD-Yjtmg9cMa6YdLhICTdEQEi2KA";
        console.log(token, "token");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await dispatch(getCompanySettingAsync(token)).unwrap();
        if(response && response?.length) {
          setCompanyData(response[0]); // Set the fetched data to `companyData`
          if (response[0]?.company_log?.url) {
            setLogoImg(response[0]?.company_log?.url);
          }
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [dispatch]);

  return (
    <form className="default-form">
      <div>
        <div className="uploading-outer">
          <div className="uploadButton">
            <input
              className="uploadButton-input"
              type="file"
              name="attachments[]"
              accept="image/*"
              id="upload"
              required
              onChange={(e) => logoHandler(e.target.files![0])}
            />
            <label
              className="uploadButton-button ripple-effect"
              htmlFor="upload"
            >
              {/* If logoImg is a string (URL), display the image */}
              {typeof logoImg === "string" ? (
                <Image
                  src={logoImg}
                  alt="Company Logo"
                  className="uploaded-logo" // Add a custom class for the image if needed
                />
              ) : (
                logoImg 
                ? (logoImg as File).name 
                : companyData?.company_log?.file_name || "Company Logo"
              )}
            </label>
            <span className="uploadButton-file-name"></span>
          </div>
          <div className="pic-text">
            Max file size is 500KB, Minimum dimension: 100x100 And Suitable
            files are .jpg & .png
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Company Name</label>
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            defaultValue={companyData?.name || ""}
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Website URL</label>
          <input
            type="text"
            name="website_url"
            placeholder="Website URL"
            defaultValue={companyData?.website_url || ""}
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            defaultValue={companyData?.phone || ""}
            required
            disabled
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={companyData?.email || ""}
            required
            disabled
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Company Link</label>
          <input
            type="text"
            name="link"
            placeholder="Link"
            defaultValue={companyData?.slug || ""}
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Company Size</label>
          <input
            type="text"
            name="size"
            placeholder="Company Size"
            defaultValue={companyData?.company_size_id || ""}
            required
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <CustomEditor
            data={companyData?.description || jobRoles}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(data: any) => setJobRoles(data)}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12 right-align">
          <button className="theme-btn btn-style-one">Save</button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
