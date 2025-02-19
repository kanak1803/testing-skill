import PostBoxForm from "./components/PostBoxForm";
import "./index-post-jobs.scss";
import MobileMenuDashboard from "../common/header/MobileMenuDashboard";
import DashboardHeader from "../common/header/DashboardHeader";
import DashboardEmployerSidebar from "../common/header/DashboardEmployerSidebar";

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
          {/* <BreadCrumb title="Post a New Job!" /> */}
          {/* breadCrumb */}

          {/* <MenuToggler /> */}
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title"></div>

                  <div className="widget-content">
                    {/* <PostJobSteps /> */}
                    {/* End job steps form */}
                    <PostBoxForm />
                    {/* End post box form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <CopyrightFooter /> */}
    </div>
    // End page-wrapper
  );
};

export default index;
