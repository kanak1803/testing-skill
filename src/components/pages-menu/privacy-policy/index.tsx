import LoginPopup from "../../common/form/login/LoginPopup";
import Header from "./Header";
import PrivacyPolicy from "./PrivacyPolicy";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <Header />
      {/* <!--End Main Header --> */}

      {/* <MobileMenu /> */}
      {/* End MobileMenu */}

      <section className="tnc-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Privacy-Policy</h2>
            <div className="text">Privacy-Policy </div>
          </div>
          {/* End sec-title */}
          <PrivacyPolicy/>
        </div>
      </section>
      {/* <!-- End TNC Section --> */}

      {/* <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
