"use client";
import Link from "next/link";
// import LoginWithSocial from "./LoginWithSocial";
// import { UserAuth } from "@/app/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
import { useFormik } from "formik";
import "./ResetLoginFormContent.scss";

// Define the type for form values
interface FormValues {
  password: string;
  confirm_password: string;
}

const validate = (values: FormValues)=> {
  const errors: Partial<FormValues> = {};

  // Password validation
  if (!values.password) {
    errors.password = "Required";
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(values.password)) {
    errors.password =
      "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.";
  }
  if (!values.confirm_password) {
    errors.confirm_password = "Required";
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(values.confirm_password)) {
    errors.confirm_password =
      "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.";
  }
  return errors;
};

const LoginFormContent = () => {
  // const { signIn, signUp } = UserAuth(); // Access authentication functions from context
  // const [isSignUp, setIsSignUp] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      // try {
      //   if (isSignUp) {
      //     await signUp(values.email, values.password); // Firebase sign-up
      //     alert("Account created successfully!");
      //     router.push("/verification");
      //   } else {
      //     await signIn(values.email, values.password); // Firebase sign-in
      //     router.push("/dashboard"); // Redirect after successful login
      //   }
      // } catch (error) {
      //   console.error("Error during authentication:", error.message);
      //   alert(error.message);
      // }
    },
  });

  // const router = useRouter();

  return (
    <div className="form-inner">
      <h3>Reset Password</h3>

      {/* Login Form */}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Password"
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-msg">{formik.errors.password}</div>
          ) : null}
        </div>
        <br />

        {/* Password */}
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            placeholder="Confirm Password"
            required
          />
          {formik.touched.confirm_password && formik.errors.confirm_password ? (
            <div className="error-msg">{formik.errors.confirm_password}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <Link href="/login">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
           Continue
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginFormContent;
