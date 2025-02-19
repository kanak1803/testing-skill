"use client";

import Header from "./Header";
import ForgotFormContent from "@/components/common/form/forgot-password/ForgotFormContent";

const index = () => {
  return (
    <>
      <Header />

      {/* <MobileMenu /> */}

      <div className="login-section">
        <div
          className="image-layer"
          style={{ backgroundImage: "url(/images/background/12.jpg)" }}
        ></div>
        <div className="outer-box">
          <div className="login-form default-form">
            <ForgotFormContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
