import LoginFormContent from "@/components/common/form/login/LoginFormContent";
// import MobileMenu from "@/components/header/MobileMenu";
import Header from "./Header";

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
          {/* <!-- Login Form --> */}
          <div className="login-form default-form">
            {/* <FormContent2 /> */}
          <LoginFormContent />
          </div>
          {/* <!--End Login Form --> */}
        </div>
      </div>
      {/* <!-- End Info Section --> */}
    </>
  );
};

export default index;
