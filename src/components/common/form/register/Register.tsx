"use client";

import RegisterForm from "./Components/RegisterForm";
import MobileMenu from "@/components/header/MobileMenu";
import Header from "./Components/Header";

const Register = () => {
  return (
    <>
      <Header />
      {/* <!--End Main Header -->  */}

      <MobileMenu />
      {/* End MobileMenu */}

      <div className="login-section">
        <div className="image-layer" style={{ backgroundImage: "url(/images/background/12.jpg)" }}></div>
        <div className="outer-box">
          <div className="login-form default-form">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
