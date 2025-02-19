"use client";

import "./PostBoxForm.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import CustomEditor from "./CkEditorComponent";
import { useAppDispatch } from "@/lib/store/hook";
import CreatableSelect from "react-select/creatable";
import { createJobPostThunk } from "@/lib/store/feature/postjob/postjobSlice";
import { getJobLevelAsync } from "@/lib/store/feature/postjob/jobLevelSlice";

const PostBoxForm = () => {
  interface ExperienceOption {
    id: number;
    duration?: { years: number }; // Assuming 'duration' is an optional object
  }

  interface JobTypeOption {
    id: number;
    name: string;
  }

  // interface IJobCategory {
  //   id: number;
  //   name: string;
  // }

  const minExp: ExperienceOption[] = [];
  const maxExp: ExperienceOption[] = [];
  const jobTypes: JobTypeOption[] = [];
  const [categories, setCategories] = useState<{ id: number; title: string }[]>(
    []
  );
  const [level] = useState<{ id: number; title: string }[]>([]); // Ensure id is present
  const [jobDescription, setJobDescription] = useState("");
  const [jobRoles, setJobRoles] = useState("");
  const [jobSkills] = useState<{ id: number; title: string }[]>([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState<string | null>(
    null
  ); // Track selected category

  const dispatch = useAppDispatch();
  const router = useRouter();

  // interface SkillOption {
  //   label: string;
  //   value: string;
  // }

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobLevel: "",
      jobCategory: "",
      jobSkills: [],
      jobType: "",
      jobDescription: "",
      vacancy: "",
      minExperience: "",
      maxExperience: "",
      minSalary: "",
      maxSalary: "",
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required("Job Title is required"),
      jobLevel: Yup.string().required("Job Level is required"),
      jobCategory: Yup.string().required("Job Category is required"),
      jobSkills: Yup.array().min(1, "Select at least one skill"),
      jobType: Yup.string().required("Job Type is required"),
      vacancy: Yup.number()
        .required("Vacancy is required")
        .min(1, "Vacancy must be at least 1"),
      minExperience: Yup.number().required("Minimum experience is required"),
      maxExperience: Yup.number()
        .required("Maximum experience is required")
        .min(
          Yup.ref("minExperience"),
          "Max experience must be greater than Min experience"
        ),
      minSalary: Yup.number().required("Minimum salary is required"),
      maxSalary: Yup.number()
        .required("Maximum salary is required")
        .min(
          Yup.ref("minSalary"),
          "Max salary must be greater than Min salary"
        ),
    }),
    onSubmit: async (values) => {
      const jobPostData = {
        job_level_id: parseInt(values.jobLevel, 10),
        job_category_id: parseInt(values.jobCategory, 10),
        job_category_skill: values.jobSkills
          .map((skillId) => skillId) // Directly use the skill `id` instead of mapping to title
          .filter((skill) => skill !== ""), // Filter out empty strings
        job_type_id: parseInt(values.jobType, 10),
        title: values.jobTitle,
        vacancy: parseInt(values.vacancy, 10),
        minimum_experience: parseInt(values.minExperience, 10),
        maximum_experience: parseInt(values.maxExperience, 10),
        minimum_salary: parseInt(values.minSalary, 10),
        maximum_salary: parseInt(values.maxSalary, 10),
        job_description: jobDescription, // Include job description here
        job_roles_and_responsibilities: jobRoles, // Include job roles and responsibilities here
      };

      try {
        await dispatch(createJobPostThunk(jobPostData)).unwrap();
        toast.success("Job posted successfully!");
        router.push("/dashboard");
      } catch (error) {
        console.error("Error posting job:", error); // Log the error to the console
        toast.error("Failed to post the job. Please try again."); // Show toast error message
      }
    },
  });

  // Map Skills for dropdown
  const mappedJobSkills = Array.isArray(jobSkills)
    ? jobSkills.map((skill) => ({
        value: skill.id.toString(),
        label: skill.title,
      }))
    : [];

  const mappedCategories = Array.isArray(categories)
    ? categories.map((category) => ({
        value: category.id.toString(),
        label: category.title,
      }))
    : [];

  // Map categories for dropdown
  const mappedCategoriesForJobCategory =
    level.map((category) => ({
      value: category.id.toString(),
      label: category.title,
    })) || [];

  // Map Jobs for dropdown
  const mappedJobTypes =
    jobTypes.map((jobType) => ({
      value: jobType.id.toString(),
      label: jobType.name,
    })) || [];

  // Map Minimum Experience for dropdown
  const mappedMinimumExp = minExp.map((experience) => ({
    value: experience.id.toString(),
    label: `${experience?.duration?.years} `,
  }));

  // Map Minimum Experience for dropdown
  const mappedMaximumExp = maxExp.map((experience: ExperienceOption) => ({
    value: experience.id.toString(),
    label: `${experience?.duration?.years ?? "N/A"}`,
  }));

  // Fetch Job Level Categories on Component Mount
  useEffect(() => {
    dispatch(getJobLevelAsync())
      .unwrap()
      .then((response) => {
        if (response) {
          setCategories(response); // Type casting to match expected type
        } else {
          toast.error("Failed to fetch job levels.");
        }
      })
      .catch((error) => {
        toast.error("Error Fetching Categories: " + error.message);
      });
  }, [dispatch]);

  // // Fetch Job Category on Component Mount
  // useEffect(() => {
  //   dispatch(getJobCategoryAsync())
  //     .unwrap()
  //     .then((response) => {
  //       setLevel(response);
  //     })
  //     .catch((error) => {
  //       toast.error("Error Fetching Categories" + error.message);
  //     });
  // }, []);

  // // Fetch Job Type on Component Mount
  // useEffect(() => {
  //   dispatch(getJobTypeAsync())
  //     .unwrap()
  //     .then((response) => {
  //       setJobTypes(response);
  //     })
  //     .catch((error) => {
  //       toast.error("Error Fetching Job Types: " + error.message);
  //     });
  // }, []);

  // // Fetch Minimum Experience on Component Mount
  // useEffect(() => {
  //   dispatch(getJobMinimumExpAsync())
  //     .unwrap()
  //     .then((response) => {
  //       console.log("Min Exp Response", response);
  //       setMinExp(response);
  //     })
  //     .catch((error) => {
  //       toast.error("Error fetching job Minimum Experience " + error.message);
  //     });
  // }, [dispatch]);

  // // Fetch Maximum Experience on Component Mount
  // useEffect(() => {
  //   dispatch(getJobMaximumExpAsync())
  //     .unwrap()
  //     .then((response) => {
  //       console.log("Max Exp Response", response);
  //       setMaxExp(response);
  //     })
  //     .catch((error) => {
  //       toast.error("Error fetching job Minimum Experience " + error.message);
  //     });
  // }, [dispatch]);

  // // Fetch job skills when category is selected
  // useEffect(() => {
  //   // Only fetch job skills if a category is selected
  //   if (selectedJobCategory) {
  //     // console.log(selectedJobCategory)
  //     console.log("Selected Category ID:", selectedJobCategory); // For debugging

  //     dispatch(getJobCategorySkillAsync(selectedJobCategory)) // Pass the selectedJobCategory directly
  //       .unwrap()
  //       .then((response) => {
  //         setJobSkills(response);
  //       })
  //       .catch((error) => {
  //         toast.error("Error fetching job skills: " + error.message);
  //       });
  //   }
  // }, [selectedJobCategory, dispatch]);

  return (
    <form className="default-form" onSubmit={formik.handleSubmit}>
      <div className="row">
        {/* Job Title */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title *</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            onChange={formik.handleChange}
            value={formik.values.jobTitle}
          />
          {formik.touched.jobTitle && formik.errors.jobTitle && (
            <div className="error">{formik.errors.jobTitle}</div>
          )}
        </div>

        {/* Job Level */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Level *</label>
          <CreatableSelect
            isClearable
            placeholder="Select One"
            value={
              formik.values.jobLevel
                ? {
                    value: formik.values.jobLevel,
                    label:
                      (mappedCategories.length > 0 &&
                        mappedCategories.find(
                          (category) =>
                            category.value === formik.values.jobLevel // Ensuring value matches
                        )?.label) ||
                      "Select Job Level", // Providing default label if not found
                  }
                : null
            }
            options={mappedCategories}
            noOptionsMessage={() => "No options available"}
            onChange={(selectedOption) => {
              formik.setFieldValue("jobLevel", selectedOption?.value || "");
            }}
            onBlur={() => formik.setFieldTouched("jobLevel", true, true)} // Ensure touched state updates on blur
            classNamePrefix="select"
          />

          {formik.touched.jobLevel && formik.errors.jobLevel && (
            <div className="error">{formik.errors.jobLevel}</div>
          )}
        </div>

        {/* Job Category */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Category *</label>
          <CreatableSelect
            isClearable
            placeholder="Select Category"
            value={
              formik.values.jobCategory
                ? {
                    value: formik.values.jobCategory,
                    label:
                      mappedCategoriesForJobCategory.find(
                        (category) =>
                          category.value === formik.values.jobCategory
                      )?.label || "Unknown Category",
                  }
                : null
            }
            options={mappedCategoriesForJobCategory}
            noOptionsMessage={() => "No options available"}
            onChange={(selectedOption) => {
              formik.setFieldValue("jobCategory", selectedOption?.value || ""); // Update Formik's jobCategory value
              setSelectedJobCategory(selectedOption?.value || null); // Update local state
            }}
            classNamePrefix="select"
          />
          {formik.touched.jobCategory && formik.errors.jobCategory && (
            <div className="error">{formik.errors.jobCategory}</div>
          )}
        </div>

        {/* Job Skills */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Skills *</label>
          <CreatableSelect
            isClearable
            isMulti
            placeholder="Select Skills"
            // options={mappedJobSkills}
            noOptionsMessage={() => "No options available"}
            value={formik.values.jobSkills.map((skill) => ({
              value: skill,
              label:
                mappedJobSkills.find((s) => s.value === skill)?.label || "",
            }))}
            onChange={(selectedOptions) =>
              formik.setFieldValue(
                "jobSkills",
                selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : []
              )
            }
            isDisabled={!selectedJobCategory}
          />
          {formik.touched.jobSkills && formik.errors.jobSkills && (
            <div className="error">{formik.errors.jobSkills}</div>
          )}
        </div>

        {/* Job Type */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type *</label>
          <CreatableSelect
            isClearable
            placeholder="Select Job Type"
            value={
              formik.values.jobType
                ? {
                    value: formik.values.jobType,
                    label:
                      mappedJobTypes.find(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (type: any) => type.value === formik.values.jobType
                      )?.label || "Unknown Job Type",
                  }
                : null
            }
            options={mappedJobTypes}
            noOptionsMessage={() => "No options available"}
            onChange={(selectedOption) => {
              formik.setFieldValue("jobType", selectedOption?.value || "");
            }}
            onBlur={() => formik.setFieldTouched("jobType", true, true)}
            classNamePrefix="select"
          />
          {formik.touched.jobType && formik.errors.jobType && (
            <div className="error">{formik.errors.jobType}</div>
          )}
        </div>

        {/* Vacancy */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Vacancy *</label>
          <input
            type="number"
            name="vacancy"
            placeholder="Number of Vacancies"
            onChange={formik.handleChange}
            value={formik.values.vacancy}
          />
          {formik.touched.vacancy && formik.errors.vacancy && (
            <div className="error">{formik.errors.vacancy}</div>
          )}
        </div>

        {/* Minimum Experience */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Minimum Experience *</label>
          <CreatableSelect
            isClearable
            placeholder="Select Minimum Experience"
            value={
              formik.values.minExperience
                ? {
                    value: formik.values.minExperience,
                    label:
                      mappedMinimumExp.find(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (exp: any) => exp.value === formik.values.minExperience
                      )?.label || "Unknown Minimum Experience",
                  }
                : null
            }
            options={mappedMinimumExp}
            noOptionsMessage={() => "No options available"}
            onChange={(selectedOption) => {
              formik.setFieldValue(
                "minExperience",
                selectedOption?.value || ""
              );
            }}
            onBlur={() => formik.setFieldTouched("minExperience", true, true)}
            classNamePrefix="select"
          />
          {formik.touched.minExperience && formik.errors.minExperience && (
            <div className="error">{formik.errors.minExperience}</div>
          )}
        </div>

        {/* Maximum Experience */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Maximum Experience *</label>
          <CreatableSelect
            isClearable
            placeholder="Select Maximum Experience"
            value={
              formik.values.maxExperience
                ? {
                    value: formik.values.maxExperience,
                    label:
                      mappedMaximumExp.find(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (exp: any) => exp.value === formik.values.maxExperience
                      )?.label || "Unknown Minimum Experience",
                  }
                : null
            }
            options={mappedMaximumExp}
            noOptionsMessage={() => "No options available"}
            onChange={(selectedOption) => {
              formik.setFieldValue(
                "maxExperience",
                selectedOption?.value || ""
              );
            }}
            onBlur={() => formik.setFieldTouched("maxExperience", true, true)}
            classNamePrefix="select"
          />
          {formik.touched.maxExperience && formik.errors.maxExperience && (
            <div className="error">{formik.errors.maxExperience}</div>
          )}
        </div>

        {/* Minimum Salary */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Minimum Salary *</label>
          <input
            type="number"
            name="minSalary"
            placeholder="Minimum Salary"
            onChange={formik.handleChange}
            value={formik.values.minSalary}
          />
          {formik.touched.minSalary && formik.errors.minSalary && (
            <div className="error">{formik.errors.minSalary}</div>
          )}
        </div>

        {/* Maximum Salary */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Maximum Salary *</label>
          <input
            type="number"
            name="maxSalary"
            placeholder="Maximum Salary"
            onChange={formik.handleChange}
            value={formik.values.maxSalary}
          />
          {formik.touched.maxSalary && formik.errors.maxSalary && (
            <div className="error">{formik.errors.maxSalary}</div>
          )}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description *</label>
          <CustomEditor
            // placeholder="Add a Job Description"
            data={jobDescription}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(data: any) => setJobDescription(data)}
          />
          {formik.touched.jobDescription && formik.errors.jobDescription && (
            <div className="error">{formik.errors.jobDescription}</div>
          )}
        </div>

        <div className="form-group col-lg-12 col-md-12 rolesandresponsibility">
          <label>Roles and Responsibilities *</label>
          <CustomEditor
            data={jobRoles}
            onChange={(data: string) => setJobRoles(data)}
          />
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12 form-group-button post-job-button">
          <button className="theme-btn btn-style-one" type="submit">
            Post Job
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
