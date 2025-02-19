"use client";
// import * as Yup from "yup";
import "./FormInfoBox.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useAppDispatch } from "@/lib/store/hook";
import { getProfileSettingAsync } from "@/lib/store/feature/settings/SettingsProfileSlice";

interface RecruiterProfile {
  first_name: string;
  last_name: string;
  slug: string;
  date_of_birth: string;
  gender: string;
  profile_image: string;
  user_id: number;
}


const FormInfoBox = () => {
  const [logoImg, setLogoImg] = useState<File | string>("");
  const logoHandler = (file: File) => {
    // Explicitly typing the file as File
    setLogoImg(file);
  };
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      slug: "",
      dob: "",
      gender: "",
      profileImage: "",
      userId: "",
    },
    // validationSchema: Yup.object({
    //   firstName: Yup.string().required("First Name is required"),
    //   lastName: Yup.string().required("Last Name is required"),
    //   slug: Yup.string().required("Slug is Required"),
    //   dob: Yup.string().required("Date Of Birth is Required"),
    //   gender: Yup.string().required("Gender is Required"),
    //   user_id: Yup.number().required("User Id is Required"),
    // }),
    onSubmit: async (values) => {
      console.log(values)
      // const profileSettings = {
      //   user_id: parseInt(values.userId, 10),
      //   first_name: values.firstName,
      //   last_name: values.lastName,
      //   slug: values.slug,
      //   date_of_birth: values.dob,
      //   gender: values.gender,
      //   profile_image: values.profileImage,
      // };
      // console.log(profileSettings)
    },
  });

  // Fetch initial data to pre-fill form
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // const token = localStorage.getItem("token");
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcl9yb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNzM2MzU4NTAyfQ.D7J8ljii58s1tdrtD-Yjtmg9cMa6YdLhICTdEQEi2KA";

        if (!token) {
          throw new Error("No authentication token found.");
        }
        const response = await dispatch(
          getProfileSettingAsync({ token })
        ).unwrap();
        console.log(response, "response");
        // console.log(response.gender,"response gender")

        const profileData = response as RecruiterProfile;

        // Populate form with API data
        formik.setValues({
          firstName: profileData ?.first_name || "",
          lastName: profileData ?.last_name || "",
          slug: profileData ?.slug || "",
          dob: profileData ?.date_of_birth || "",
          gender: profileData ?.gender || "",
          profileImage: profileData ?.profile_image || "",
          userId: profileData ?.user_id.toString(),
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data.");
      }
    };

    fetchProfileData();
  }, [dispatch, formik]);
  return (
    <form className="default-form" onSubmit={formik.handleSubmit}>
      <div className="row">
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
                onChange={(e) => logoHandler(e.target.files![0])} // Using `!` to assert that files will not be null
              />
              <label
                className="uploadButton-button ripple-effect"
                htmlFor="upload"
              >
                {logoImg !== "" ? (logoImg as File).name : " Browse Logo"}
              </label>
              <span className="uploadButton-file-name"></span>
            </div>
            <div className="pic-text">
              Max file size is 500KB, Minimum dimension: 100x100 And Suitable
              files are .jpg & .png
            </div>
          </div>
        </div>

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Profile Image (URL)</label>
          <input
            type="text"
            name="profileImage"
            placeholder="Profile Image URL"
            value={formik.values.profileImage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div> */}

        {/* First Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.firstName && formik.errors.firstName
                ? "error-field"
                : ""
            }
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error">{formik.errors.firstName}</div>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.lastName && formik.errors.lastName
                ? "error-field"
                : ""
            }
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="error">{formik.errors.lastName}</div>
          )}
        </div>

        {/* User ID */}
        <div className="form-group col-lg-6 col-md-12">
          <label>User ID</label>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={formik.values.userId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.userId && formik.errors.userId ? "error-field" : ""
            }
          />
          {formik.touched.userId && formik.errors.userId && (
            <div className="error">{formik.errors.userId}</div>
          )}
        </div>

        {/* Slug */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formik.values.slug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.slug && formik.errors.slug ? "error-field" : ""
            }
          />
          {formik.touched.slug && formik.errors.slug && (
            <div className="error">{formik.errors.slug}</div>
          )}
        </div>

        {/* Date of Birth */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`input-date ${
              formik.touched.dob && formik.errors.dob ? "error-field" : ""
            }`}
          />
          {formik.touched.dob && formik.errors.dob && (
            <div className="error">{formik.errors.dob}</div>
          )}
        </div>

        {/* Date of Birth */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Date of Birth</label>
          <input
             type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.dob && formik.errors.dob ? "error-field" : ""
            }
          />
          {formik.touched.dob && formik.errors.dob && (
            <div className="error">{formik.errors.dob}</div>
          )}
        </div> */}

        {/* Gender */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.gender && formik.errors.gender ? "error-field" : ""
            }
          />
          {formik.touched.gender && formik.errors.gender && (
            <div className="error">{formik.errors.gender}</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12 right-align">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
