"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import "./LoginFormContent.scss";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useAppDispatch,useAppSelector } from "@/lib/store/hook";
import { postLoginSendEmail } from "@/lib/store/feature/login/loginSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface LoginFormValues {
  email: string;
  password: string;
}

const validate = (values: LoginFormValues) => {
  const errors: Record<string, string> = {};

  // Password validation
  if (!values.password) {
    Object.assign(errors, {
      password: "Required",
    });
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}/.test(values.password)) {
    Object.assign(errors, {
      password:
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be 8-50 characters long.",
    });
  }

  // Email validation
  if (!values.email) {
    Object.assign(errors, {
      email: "Required",
    });
  } else {
    // Convert email to lowercase before validation
    const email = values.email.toLowerCase();
    if (email.length < 6) {
      Object.assign(errors, {
        email: "Email must be at least 6 characters long.",
      });
    } else if (email.length > 350) {
      Object.assign(errors, {
        email: "Email must not exceed 350 characters.",
      });
    }
    values.email = email; // Ensure email is stored in lowercase
  }

  return errors;
};

const LoginFormContent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { loading } = useAppSelector((state) => state.login);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(
          postLoginSendEmail({
            email: values.email,
            password: values.password,
          })
        ).unwrap();

        // Store token in cookies if "Remember Me" is checked
        if (rememberMe) {
          Cookies.set("login_token", response.token, {
            expires: 180, // Cookie expires in 180 days (6 months)
          });
        } else {
          // Store token in session storage for temporary sessions
          sessionStorage.setItem("login_token", response.token);
        }

        localStorage.setItem("login token", response.token);
        // Show success message
        toast.success("Login successful!");
        router.push("/dashboard");
        console.log("Login token:", response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error during login:", error.message);
          toast.error(error.message || "Login failed.");
        } else {
          console.error("Unexpected error during login:", error);
          toast.error("An unexpected error occurred.");
        }
      }
    },
  });

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    login_hint: "user@example.com",
  });

  const signInPop = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);
      if (credential) {
        const token = credential.accessToken;
        console.log(token);
      }

      const user = result.user;
      console.log(user, "testing user");
      if(user){
        router.push("/verify-google")
      }
      
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="form-inner">
      <h3>Employer Login </h3>
      {/* <!--Login Form--> */}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email Id</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email Id"
            required
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
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

        {/* Remember Me and Forgot Password */}
        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input
                type="checkbox"
                name="remember-me"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="pwd">
              Forgot password?
            </Link>
          </div>
        </div>
        {/* forgot password */}

        {/* Submit Button */}
        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={loading}
            // disabled={loading || !(formik.dirty && formik.isValid)}
          >
            {loading ? <span className="loader"></span> : "Login"}
          </button>
        </div>
      </form>
      {/* End form */}

      <div className="bottom-box ">
        <div className="text btn-signup">
          Don&apos;t have an account? <Link href="/signup"><b>Signup</b></Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="btn-box row buttons-centers">
          <div className="col-lg-6 col-md-12 termsandpolicy">
            <button
              onClick={signInPop}
              className="theme-btn social-btn-two google-btn"
            >
              <i className="fab fa-google"></i> Continue with Google
            </button>
          </div>
        </div>

        {/* <p>
          By continying you agree to{" "}
          <b>
            <Link href="/terms-and-conditions">T&C</Link>
          </b>{" "}
          and{" "}
          <b>
            {" "}
            <Link href="/privacy-policy">Privacy Policy</Link>
          </b>
        </p> */}
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default LoginFormContent;
