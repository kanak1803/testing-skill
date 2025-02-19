import MyProfile from "./components/my-profile";
import MobileMenuDashboard from "../common/header/MobileMenuDashboard";
import DashboardHeader from "../common/header/DashboardHeader";
import DashboardEmployerSidebar from "../common/header/DashboardEmployerSidebar";
import "./settings.scss";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenuDashboard />

      <DashboardEmployerSidebar />

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
                  <div className="widget-title">
                    <h4>My Settings</h4>
                  </div>
                  <MyProfile />
                </div>
              </div>
              {/* <!-- Ls widget --> */}

              {/* <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>Social Network</h4>
                                    </div>
                                    <div className="widget-content">
                                        <SocialNetworkBox />
                                    </div>
                                </div>
                            </div>

                            <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>Contact Information</h4>
                                    </div>
                            

                                    <div className="widget-content">
                                        <ContactInfoBox />
                                    </div>
                                </div>
                            </div> */}
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
