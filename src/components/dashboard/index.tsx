import "./index.scss";
import Applicants from "./components/Applicants";
import TopCardBlock from "./components/TopCardBlock";
import TopCard2Block from "./components/TopCard2Block";
import RecentlyPosted from "./components/RecentlyPosted";
import MobileMenuDashboard from "../common/header/MobileMenuDashboard";
import DashboardEmployerSidebar from "../common/header/DashboardEmployerSidebar";
import DashboardHeader from "../../components/common/header/DashboardHeader";

const Index = () => {
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
          {/* <BreadCrumb title="Dashboard Home!" /> */}
          {/* breadCrumb */}

          {/* <MenuToggler /> */}
          {/* Collapsible sidebar button */}

          <div className="row">
            <TopCardBlock />
          </div>
          <div className="row">
            <TopCard2Block />
          </div>
          {/* End .row top card block */}

          <div className="row">
            <div className="col-lg-6">
              {/* <!-- applicants Widget --> */}
              <div className="applicants-widget ls-widget">
                <div className="widget-title">
                  <h4>Recent Applicants</h4>
                </div>
                <div className="widget-content">
                  <div className="row">
                    {/* <!-- Candidate block three --> */}

                    <Applicants />
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}
            <div className="col-lg-6">
              {/* <!-- applicants Widget --> */}
              <div className="applicants-widget ls-widget">
                <div className="widget-title">
                  <h4>Recently Posted Jobs</h4>
                </div>
                <div className="widget-content">
                  <div className="row">
                    {/* <!-- Candidate block three --> */}

                    <RecentlyPosted />
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row profile and notificatins */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      {/* <CopyrightFooter /> */}
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
