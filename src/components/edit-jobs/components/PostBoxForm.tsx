"use client";

import "./PostBoxForm.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import CustomEditor from "./CkEditorComponent";
import { useAppDispatch } from "@/lib/store/hook";
import CreatableSelect from "react-select/creatable";
import { getJobTypeAsync } from "@/lib/store/feature/postjob/jobTypeSlice";
// import { createJobPostThunk } from "@/lib/store/feature/postjob/postjobSlice";
import { createEditJobPostAsync } from "@/lib/store/feature/manageJobs/editjobbyidSlice";
import { getJobLevelAsync } from "@/lib/store/feature/postjob/jobLevelSlice";
import { getJobCategoryAsync } from "@/lib/store/feature/postjob/jobCategorySlice";
import { getJobMinimumExpAsync } from "@/lib/store/feature/postjob/jobMinimumExpSlice";
import { getJobMaximumExpAsync } from "@/lib/store/feature/postjob/jobMaximumExpSlice";
import { getJobCategorySkillAsync } from "@/lib/store/feature/postjob/jobCategorySkillsSlice";
import { getJobByIdAsync } from "@/lib/store/feature/manageJobs/getjobbyidSlice";

const PostBoxForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id }: any = useParams();
  const [loadingSkills, setLoadingSkills] = useState(false);

  const [jobTypes, setJobTypes] = useState([]);
  const [minExp, setMinExp] = useState([]);
  const [maxExp, setMaxExp] = useState([]);
  const [categories, setCategories] = useState(
    []
  ); // Ensure id is present
  const [level, setLevel] = useState([]); // Ensure id is present
  const [jobDescription, setJobDescription] = useState("");
  const [jobRoles, setJobRoles] = useState("");
  const [jobSkills, setJobSkills] = useState(
    []
  );
  const [selectedJobCategory, setSelectedJobCategory] = useState<number | null>(
    null
  ); // Track selected category

  const dispatch = useAppDispatch();
  const router = useRouter();

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: async (values,id: any) => {
      const jobPostData = {
        job_level_id: parseInt(values.jobLevel, 10),
        job_category_id: parseInt(values.jobCategory, 10),
        job_category_skill: values.jobSkills // Use the correct column name here
        .map((skillId) => parseInt(skillId, 10)) // Convert to integer
        .filter((skill) => !isNaN(skill)), // Filter out invalid values
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
console.log(jobPostData,"jobPostData")
      try {
        // const token = localStorage.getItem(token)
        const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcl9yb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNzM2MzU4NTAyfQ.D7J8ljii58s1tdrtD-Yjtmg9cMa6YdLhICTdEQEi2KA";
        console.log("component token",token)
        await dispatch(createEditJobPostAsync({ token, id, data: jobPostData })).unwrap();
        toast.success("Job posted successfully!");
        router.push(`/manage-jobs/job-single-v1/${id}`);
      } catch (error) {
        console.error("Error posting job:", error); // Log the error to the console
        toast.error("Failed to post the job. Please try again."); // Show toast error message
      }
    },
  });

  // Map Skills for dropdown
  const mappedJobSkills = Array.isArray(jobSkills)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? jobSkills.map((skill: any) => ({
        value: skill.id.toString(),
        label: skill.title,
      }))
    : [];

  const mappedCategories = Array.isArray(categories)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? categories.map((category: any) => ({
        value: category.id.toString(),
        label: category.name,
      }))
    : [];

  // Map categories for dropdown
  const mappedCategoriesForJobCategory =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    level.map((category: any) => ({
      value: category.id.toString(),
      label: category.title,
    })) || [];

  // Map Jobs for dropdown
  const mappedJobTypes =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jobTypes.map((jobType: any) => ({
      value: jobType.id.toString(),
      label: jobType.name,
    })) || [];

  // Map Minimum Experience for dropdown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedMinimumExp = minExp.map((experience: any) => ({
    value: experience.id.toString(),
    label: `${experience?.duration?.years} `,
  }));

  // Map Minimum Experience for dropdown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedMaximumExp = maxExp.map((experience: any) => ({
    value: experience.id.toString(),
    label: `${experience?.duration?.years} `,
  }));

  // Fetch the JobById on Component Mount

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const token = localStorage.getItem("authToken");
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcl9yb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNzM2MzU4NTAyfQ.D7J8ljii58s1tdrtD-Yjtmg9cMa6YdLhICTdEQEi2KA";
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedJobs: any = await dispatch(getJobByIdAsync({ token, id }));
        const job = fetchedJobs.payload[0];
        if (job) {
          formik.setValues({
            jobTitle: job.title || "",
            jobLevel: job.job_level_id?.toString() || "",
            jobCategory: job.job_category_id?.toString() || "",
            jobSkills:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
              job.job_category_skill_id?.map((skillId: any) => skillId.toString()) ||
              [],
            jobType: job.job_type_id?.toString() || "",
            jobDescription: job.description || "",
            vacancy: job.vacancy?.toString() || "",
            minExperience: job.minimum_experience_id?.toString() || "",
            maxExperience: job.maximum_experience_id?.toString() || "",
            minSalary: job.minimum_salary?.toString() || "",
            maxSalary: job.maximum_salary?.toString() || "",
          });

          setJobDescription(job.description || "");
          setJobRoles(job.responsibility || "");
        } else {
          console.error("No job found with the given ID.");
        }
      } catch (error) {
        console.error("Error Fetching Job Details:", error);
      }
    };

    fetchJobs();
  }, [dispatch, id, formik]);

  // Fetch Job Level Categories on Component Mount
  useEffect(() => {
    dispatch(getJobLevelAsync())
      .unwrap()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setCategories(response);
      })
      .catch((error) => {
        toast.error("Error Fetching Categories" + error.message);
      });
  }, [dispatch]);

  // Fetch Job Category on Component Mount
  useEffect(() => {
    dispatch(getJobCategoryAsync())
      .unwrap()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setLevel(response);
      })
      .catch((error) => {
        toast.error("Error Fetching Categories" + error.message);
      });
  }, [dispatch]);

  // Fetch Job Type on Component Mount
  useEffect(() => {
    dispatch(getJobTypeAsync())
      .unwrap()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setJobTypes(response);
      })
      .catch((error) => {
        toast.error("Error Fetching Job Types: " + error.message);
      });
  }, [dispatch]);

  // Fetch Minimum Experience on Component Mount
  useEffect(() => {
    dispatch(getJobMinimumExpAsync())
      .unwrap()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        console.log("Min Exp Response", response);
        setMinExp(response);
      })
      .catch((error) => {
        toast.error("Error fetching job Minimum Experience " + error.message);
      });
  }, [dispatch]);

  // Fetch Maximum Experience on Component Mount
  useEffect(() => {
    dispatch(getJobMaximumExpAsync())
      .unwrap()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setMaxExp(response);
      })
      .catch((error) => {
        toast.error("Error fetching job Minimum Experience " + error.message);
      });
  }, [dispatch]);

  // Fetch Job Category Skills when category is selected
  useEffect(() => {
    if (selectedJobCategory) {
      setLoadingSkills(true);
      dispatch(getJobCategorySkillAsync(selectedJobCategory)) // Fetch skills based on selected category
        .unwrap()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          setJobSkills(response); // Update the skills based on selected category
          setLoadingSkills(false);
          console.log("Fetched Job Skills:", response);
        })
        .catch((error) => {
          toast.error("Error fetching job skills: " + error.message);
          setLoadingSkills(false);
        });
    }
  }, [selectedJobCategory, dispatch]);

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
              setSelectedJobCategory(Number(selectedOption?.value) || null); // Update local state
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
            isMulti
            isClearable
            placeholder={
              loadingSkills ? "Loading skills..." : "Select or add skills"
            }
            value={formik.values.jobSkills.map((skillId) => {
              const skill = mappedJobSkills.find(
                (item) => item.value === skillId
              );
              return skill || { value: skillId, label: skillId }; // Handle custom-added skills
            })}
            options={mappedJobSkills}
            noOptionsMessage={() =>
              loadingSkills ? "Loading skills..." : "No skills available"
            }
            onChange={(selectedOptions) => {
              const selectedSkillIds =
                selectedOptions?.map((option) => option.value) || [];
              formik.setFieldValue("jobSkills", selectedSkillIds); // Update Formik's state
            }}
            onBlur={() => formik.setFieldTouched("jobSkills", true, true)} // Update touched state
            classNamePrefix="select"
            isDisabled={loadingSkills} // Disable dropdown while loading skills
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
                        (type) => type.value === formik.values.jobType
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
                        (exp) => exp.value === formik.values.minExperience
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
                        (exp) => exp.value === formik.values.maxExperience
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(data: any) => setJobRoles(data)}
          />
          {/* {formik.touched.jobRoles && formik.errors.jobRoles && (
            <div className="error">{formik.errors.jobRoles}</div>
          )} */}
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12 form-group-button post-job-button">
          <button className="theme-btn btn-style-one" type="submit">
            Edit Job
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
