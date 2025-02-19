import Verification from "./VerificationForm";
import "./verification.scss";

const index = () => {
  return (
    <section className="contact-section verification-section verification-wrapper">
      <div className="auto-container">
        {/* <!-- Contact Form --> */}
        <div className="contact-form default-form ">
          <h2 className="verify-title"><b>Verification</b></h2>
          {/* <p><b>We sent you an OTP on <span className="verify-email-id ">&quot; info@pushpop.org &quot;</span></b></p> */}
          {/* <p className="verify-email-otp-div"><b>Please enter here to verify your email!</b></p> */}
          <Verification />
          {/* <!--Contact Form--> */}
          </div>
        {/* <!--End Contact Form --> */}
      </div>
  </section>
  );
};

export default index;
