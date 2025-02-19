"use client";
import Header from "./Header";
import ForgotFormContent from "../../../components/common/form/reset-password/ResetLoginFormContent"

const index = () => {
  return (
    <>
      <Header />

      {/* <MobileMenu /> */}
      {/* End MobileMenu */}

      <div className="login-section">
        <div
          className="image-layer"
          style={{ backgroundImage: "url(/images/background/12.jpg)" }}
        ></div>
        <div className="outer-box">
          <div className="login-form default-form">
            <ForgotFormContent />
          </div>
          {/* <!-- Login Form --> */}
          {/* <!--End Login Form --> */}
        </div>
      </div>
      {/* <!-- End Info Section --> */}
    </>
  );
};

export default index;
