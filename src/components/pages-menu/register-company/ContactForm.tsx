"use client";

import "./ContactForm.scss";
import slugify from "slugify";
import * as Yup from "yup";
import Image from "next/image";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import CreatableSelect from "react-select";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hook";
import { RegisterInterface } from "@/inteface/recruiter-register/recruiterInterface";
import { registerRecruiter } from "@/lib/store/feature/registerRecruiter/registerSlice";
import { getBusinessCategoryAsync } from "@/lib/store/feature/business-category/businessCategorySlice";

// Interface for the formData
interface FormData {
  image: File | null | undefined;
  profile: {
    first_name: string;
    last_name: string;
  };
  company: {
    name: string;
    slug: string;
    company_size_id: string;
  };
  company_business_category_id: number[];
  auth_id: string;
  company_logo?: File | null;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  image: Yup.mixed().test("size", "Image must be less than 500KB", (value) => {
    const file = value as File | null;
    return !file || file.size <= 500 * 1024; // 500KB
  }),
  profile: Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
  }),
  company: Yup.object({
    name: Yup.string().required("Company Name is required"),
    slug: Yup.string().required("Slug is required"),
    company_size_id: Yup.string().required("Company Size ID is required"),
  }),
  company_business_category_id: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one business category is required"),
});

// Type guard to check if coverImg is a File
function isFile(value: File | string | null): value is File {
  return value instanceof File;
}

const ContactForm = () => {
  const [loading, setLoading] = useState(false); // State to track loading
  const [coverImg, setCoverImg] = useState<File | string | null>(null);
  const [companySizes, setCompanySizes] = useState<
    { id: string; size: string }[]
  >([]); // State for company sizes
  const [categories, setCategories] = useState<{ id: number; title: string }[]>(
    []
  );
  const [companyImage, setCompanyImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const defaultCompanyImage = "/images/building-solid.svg";

  const coverHandler = (file: File | null) => {
    if (!file) {
      toast.error("No file selected.");
      setCoverImg(null);
      formik.setFieldValue("image", null);
      return;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG and PNG formats are supported.");
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error("File size should not exceed 500KB.");
      return;
    }

    setCoverImg(file);
    setCompanyImage(file);
    formik.setFieldValue("image", file);
  };

  // Function to generate a unique slug
  const generateUniqueSlug = (name: string) => {
    const nameSlug = slugify(name, {
      lower: true,
      strict: true,
    });

    // Add a unique identifier (e.g., timestamp) to ensure uniqueness
    const uniqueSlug = `${nameSlug}`;
    return uniqueSlug;
  };

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      image: null,
      profile: {
        first_name: "",
        last_name: "",
      },
      company: {
        name: "",
        slug: "",
        company_size_id: "",
      },
      company_business_category_id: [],
      company_size: "",
      auth_id: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true); // Set loading to true
      try {
        console.log("Form Data: ", values); // Debug the form data
        const auth_id = localStorage.getItem("auth_id") || "";
        const formData: FormData = {
          ...values,
          auth_id,
          company_logo: companyImage ?? null,
        };
        console.log("Sending form data to Redux: ", formData);
        await dispatch(
          registerRecruiter(formData as unknown as RegisterInterface)
        ).unwrap();

        toast.success("Recruiter registered successfully!");
        router.push("/dashboard");
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error registering recruiter: ", error);
          toast.error("Error registering candidate: " + error.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  // Set categories to be used in the form
  useEffect(() => {
    dispatch(getBusinessCategoryAsync())
      .unwrap() // Use unwrap to handle success/failure more easily
      .then(() => {
        // if(response) setCategories(response);
      })
      .catch((error) => {
        toast.error("Error fetching categories: " + error.message);
      });
  }, [dispatch]);

  useEffect(() => {
    const { name } = formik.values.company;
    if (name) {
      const uniqueSlug = generateUniqueSlug(name); // Use the name directly
      formik.setFieldValue(
        "company.slug",
        `https://Skillbuddy.in/recruiter/${uniqueSlug}` // Set the slug with a unique identifier
      );
    }
    // Only re-run this effect when the company name changes
  }, [formik]);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (coverImg && isFile(coverImg)) {
      objectUrl = URL.createObjectURL(coverImg);
      const imageElement = document.getElementById(
        "company-image"
      ) as HTMLImageElement;
      if (imageElement) {
        imageElement.src = objectUrl;
      }
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [coverImg]);

  // Map company sizes for Select component
  const mappedCompanySizes = companySizes.map((size) => ({
    value: size.id.toString(), // Ensure the value is a string
    label: size.size.toString(), // Ensure the label is a string
  }));

  interface Category {
    id: number;
    name: string;
  }

  const mappedCategoriess = Array.isArray(categories)
    ? // @ts-expect-error: The `categories` array might be undefined or null
      categories.map((category: Category) => ({
        value: category.id.toString(),
        label: category.name,
      }))
    : [];

  console.log("Mapped Company Sizes:", mappedCompanySizes); // Debug the mapped data

  // Helper function to map categories for CreatableSelect
  // const mappedCategories =categories.map((category) => ({
  //     value: category.id,
  //     label: category.title,
  //   })) || [];

  // Debugging the formik values
  console.log(
    "Formik Company Size ID: ",
    formik.values.company.company_size_id
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        {/* Loading Spinner */}
        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}

        {/* Profile Picture Upload */}
        <div className="uploading-outer">
          <div>
            {coverImg ? (
              <Image
                src={
                  isFile(coverImg)
                    ? URL.createObjectURL(coverImg)
                    : defaultCompanyImage
                }
                alt="Company Logo Preview"
                className="uploaded-company-image"
                width={200}
                height={165}
              />
            ) : (
              <Image
                src={defaultCompanyImage}
                alt="Default Company Logo"
                className="default-company-image"
                width={200}
                height={165}
              />
            )}
            <div className="uploadButton">
              <input
                className="uploadButton-input"
                type="file"
                accept="image/png, image/jpeg"
                id="upload_cover"
                name="image"
                onChange={(e) => coverHandler(e.target.files?.[0] || null)}
              />
              <label htmlFor="upload_cover" className="upload-image-button">
                {isFile(coverImg) ? coverImg.name : "Upload Logo"}
              </label>
            </div>
          </div>
          <div>
            <div className="upload-image-text">
              <p>Max file size is 500KB,</p>
              <p>Minimum dimension: 100x100 </p>
              And Suitable files are .jpg & .png
            </div>
          </div>
        </div>

        {/* First Name */}
        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <input
            type="text"
            name="profile.first_name"
            className="form-control"
            placeholder="First Name"
            value={formik.values.profile.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.profile?.first_name &&
            formik.errors.profile?.first_name && (
              <div className="error-message">
                {formik.errors.profile.first_name}
              </div>
            )}
        </div>

        {/* Last Name */}
        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <input
            type="text"
            name="profile.last_name"
            className="form-control"
            placeholder="Last Name"
            value={formik.values.profile.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.profile?.last_name &&
            formik.errors.profile?.last_name && (
              <div className="error-message">
                {formik.errors.profile.last_name}
              </div>
            )}
        </div>

        {/* Company Name */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <input
            type="text"
            name="company.name"
            className="form-control"
            placeholder="Company Name"
            value={formik.values.company.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.company?.name && formik.errors.company?.name && (
            <div className="error-message">{formik.errors.company.name}</div>
          )}
        </div>

        {/* Profile Link - slug */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <input
            type="text"
            name="company.slug"
            className="form-control"
            placeholder="Company Profile Link"
            value={formik.values.company.slug} // Display the full URL
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly // Prevent manual editing of the slug
          />
          {formik.touched.company?.slug && formik.errors.company?.slug && (
            <div className="error-message">{formik.errors.company.slug}</div>
          )}
        </div>

        {/* Company Size ID */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          {/* Company Size ID */}
          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
            <CreatableSelect
              isClearable
              placeholder="Select One"
              value={
                formik.values.company.company_size_id
                  ? {
                      value: formik.values.company.company_size_id,
                      label:
                        (mappedCategoriess.length > 0 &&
                          mappedCategoriess.find(
                            (category) =>
                              category.value ===
                              formik.values.company.company_size_id // Ensuring value matches
                          )?.label) ||
                        "Select Job Level", // Providing default label if not found
                    }
                  : null
              }
              options={mappedCategoriess}
              noOptionsMessage={() => "No options available"}
              onChange={(selectedOption) => {
                formik.setFieldValue("jobLevel", selectedOption?.value || "");
              }}
              onBlur={() => formik.setFieldTouched("jobLevel", true, true)} // Ensure touched state updates on blur
              classNamePrefix="select"
            />
            {formik.touched.company?.company_size_id &&
              formik.errors.company?.company_size_id && (
                <div className="error-message">
                  {formik.errors.company.company_size_id}
                </div>
              )}
          </div>

          {formik.touched.company?.company_size_id &&
            formik.errors.company?.company_size_id && (
              <div className="error-message">
                {formik.errors.company.company_size_id}
              </div>
            )}
        </div>

        {/* Business Categories (Dropdown with CreatableSelect) */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Business Category (Minimum 1 Category *)</label>
          <CreatableSelect
            isMulti
            isClearable
            placeholder="Type and press Enter to add Business Category"
            value={formik.values.company_business_category_id.map(
              (category) => ({
                value: category,
                label: category,
              })
            )}
            // options={mappedCategories}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions
                ? selectedOptions.map((option) => option.value)
                : [];
              formik.setFieldValue(
                "company_business_category_id",
                selectedValues
              );
            }}
            onBlur={() =>
              formik.setFieldTouched("company_business_category_id", true)
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />

          {formik.touched.company_business_category_id &&
            formik.errors.company_business_category_id && (
              <div className="error-message">
                {formik.errors.company_business_category_id}
              </div>
            )}
        </div>

        {/* Submit Button */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group buttons-centers">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            id="submit"
            name="submit-form"
            onClick={() => console.log(formik.values, "testing data")}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
