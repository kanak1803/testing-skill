import LoginPopup from "../../common/form/login/LoginPopup";
// import FooterDefault from "../../footer/common-footer";
// import DefaulHeader from "../../header/DefaulHeader";
// import MobileMenu from "../../header/MobileMenu";
import TermsAndConditions from "./TermsAndConditions";
import DefaulHeader from "../../common/header/DefaulHeader";
// import TermasAndConditions from "./TermsAndConditions";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      {/* <MobileMenu /> */}
      {/* End MobileMenu */}

      <section className="tnc-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Terms and Conditions</h2>
            <div className="text">Home / Terms and Conditions</div>
          </div>
          {/* End sec-title */}
          <TermsAndConditions />
        </div>
      </section>
      {/* <!-- End TNC Section --> */}

    </>
  );
};

export default index;
