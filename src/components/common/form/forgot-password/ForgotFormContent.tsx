"use client";
// import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import "./ForgotFormContent.scss";

// Validation function
const validate = (values: { email: string }) => {
  const errors: Record<string, string> = {};

  // Email validation
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const ForgotFormContent = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async () => {
      try {
        // Handle form submission logic for password reset
        // Example: send email reset request
        alert("Password reset instructions sent!");
        router.push("/reset-password");
      } catch (error) {
        const err = error as Error;  // Explicitly type 'error' as 'Error' to access 'message'
        console.error("Error during password reset:", err.message);
        alert(err.message);
      }
    },
  });

  return (
    <div className="form-inner">
      <h3>Forgot Password ?</h3>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email Address"
            required
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotFormContent;
