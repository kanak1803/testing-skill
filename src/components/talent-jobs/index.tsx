// import MobileMenu from "../../../header/MobileMenu";
// import DashboardHeader from "../../../header/DashboardHeader";
// import LoginPopup from "../../../common/form/login/LoginPopup";
// import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
// import BreadCrumb from "../../BreadCrumb";
import DashboardHeader from "../common/header/DashboardHeader";
import DashboardEmployerSidebar from "../common/header/DashboardEmployerSidebar";
import MobileMenuDashboard from "../common/header/MobileMenuDashboard";
// import MyProfile from "./components/my-profile";
// import SocialNetworkBox from "./components/SocialNetworkBox";
// import ContactInfoBox from "./components/ContactInfoBox";
// import MenuToggler from "../../MenuToggler";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenuDashboard />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          {/* <BreadCrumb title="Company Profile!" /> */}
          {/* breadCrumb */}

          {/* <MenuToggler /> */}
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title text-center">
                    <h4>Coming Soon</h4>
                  </div>
                  {/* <MyProfile /> */}
                </div>
              </div>
              {/* <!-- Ls widget --> */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
