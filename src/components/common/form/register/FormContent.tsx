"use Client";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { IpService } from "@/service/ip/ipService";
import { useAppDispatch } from "@/lib/store/hook";
import { postIpAsync } from "@/lib/store/feature/ip/ipSlice";
import { postSignupSendEmail } from "@/lib/store/feature/signup/signupSlice";
import "./FormContent.scss"

const FormContent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const ipId = localStorage.getItem("ipId");

    // If there's no IP ID, fetch the IP and dispatch the action with the data
    if (!ipId) {
      IpService.getIpApi() // Make sure getIpApi is working and returning the IP object
        .then((response) => {
          const data = response.data;
          dispatch(postIpAsync(data)); // Pass the IP data to postIpAsync
        })
        .catch((error: Error) => console.error("Error fetching IP:", error));
    }
  }, [dispatch]);

  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string()
        .min(6, "Too Short!")
        .max(350, "Too Long!")
        .required("Email is required")
        .email("Invalid email address")
        .transform((value) => value.toLowerCase()),
      password: string()
        .required("Password is required")
        .min(8, "Too short")
        .max(50, "Too Long!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    }),
    onSubmit: async ({ email, password }) => {
      const ipId = localStorage.getItem("ipId");
      if (ipId) {
        try {
          localStorage.setItem("email", email);
          const response = await dispatch(
            postSignupSendEmail({
              ip_id: ipId,
              email,
              password,
            })
          ).unwrap();
          console.log(response);
          toast.success("Signup successful");
          router.push("/verify");
        } catch (error: unknown) {
          const errorMessage =
            (
              error as {
                response?: { data?: { error?: string } };
                message?: string;
              }
            )?.response?.data?.error ||
            (error as { message?: string })?.message ||
            "Something went wrong!";
          if (errorMessage === "email already exists") {
            toast.error(
              "This email is already registered. Please use a different email."
            );
          } else {
            toast.error(errorMessage);
          }
        }
      } else {
        toast.error("No IP ID found. Please refresh the page.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
      <h3>Employer Signup</h3>
        <label>Email</label>
        <input
          className={
            formik.touched.email && formik.errors.email ? "!error-message" : ""
          }
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Email Id"
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="error-message">{formik.errors.email}</p>
        ) : null}
      </div>
      {/* name */}

      {/* password */}
      <div className="form-group">
        <label>Password</label>
        <div className="password-input-wrapper">
          <input
            className={
              formik.touched.password && formik.errors.password
                ? "!error-message"
                : ""
            }
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle the state
            className="eye-icon-button"
          >
            <i className={`la ${showPassword ? "la-eye-slash" : "la-eye"}`}></i>
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="error-message">{formik.errors.password}</p>
        ) : null}
      </div>

      <div className="form-group">
        <button
          className="theme-btn btn-style-one disabled:bg-gray-500 hover:disabled:bg-gray-500"
          type="submit"
          disabled={!(formik.dirty && formik.isValid)}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default FormContent;
