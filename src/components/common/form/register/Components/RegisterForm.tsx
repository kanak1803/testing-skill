"use client";
import "./RegisterForm.scss";
import Link from "next/link";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginWithSocial from "./LoginWithSocial";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { ELocalStorage } from "@/enum/localStorage/localStorage.enum";
import { LocalStorageUtils } from "@/utils/localStorage/localStorageUtils";
import { postSignupEmailAsync } from "@/lib/store/feature/auth/signup/signupSlice";

const RegisterForm = () => {
  const [getError, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  console.log(getError);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, error, loading, redirect } = useAppSelector(
    (state) => state.signup
  );


  const postSignupEmail = (email: string, password: string) => {
    const ipId: number | null = Number(
      LocalStorageUtils.get(ELocalStorage.IpId)
    );
    dispatch(postSignupEmailAsync({ ipId: ipId, email, password }));
  };

  useEffect(() => {
    if (redirect) {
      router.push(redirect); // Redirect to the specified route
    }
  }, [redirect, router]);

  useEffect(() => {
    if (error) {
      setError(error as string);
    }
  }, [error]);

  useEffect(() => {
    console.log("Loading state:", loading);
  }, [loading]);


  useEffect(() => {
    if (redirect) router.push(redirect);
    if (error) setError(error);
  }, [data, error, loading, redirect, router]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string()
        .required("Email is required")
        .email("Invalid email address"),
      password: string()
        .required("Password is required")
        .min(8, "Password must be at least 8 character long")
        .max(50, "Password length can be more then 50 character")
    }),

    onSubmit: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      setIsSubmitting(true); // Disable button
      await postSignupEmail(email, password);
      setIsSubmitting(false); // Re-enable if needed
    },
  });

  return (
    <div className="form-inner">
      <h3>Employer Sign Up</h3>

      {/* <!--Login Form--> */}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email Id</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email Id"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="email-error">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password</label>
          <div className="password-input-wrapper">
            <input
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
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon-button"
            >
              <i
                className={`la ${showPassword ? "la-eye-slash" : "la-eye"}`}
              ></i>
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>

        <div className="form-group">
          <button
            className="theme-btn btn-style-one disabled:bg-gray-500 hover:disabled:bg-gray-500"
            type="submit"
            disabled={isSubmitting || loading}
          >
            {loading
              ? (console.log("Loading..."), (<span className="spinner"></span>))
              : "Sign Up"}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link href="/login">
            <b>Login</b>
          </Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial />
        <p>
          By continuing you agree to{" "}
          <b className="blueLinks">
            <Link href="/terms-and-conditions">T&C</Link>
          </b>{" "}
          and{" "}
          <b className="blueLinks">
            {" "}
            <Link href="/privacy-policy">Privacy Policy</Link>
          </b>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;