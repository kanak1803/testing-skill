import "./index-manage-jobs.scss";
import JobListingsTable from "./components/JobListingsTable";
import MobileMenuDashboard from "../common/header/MobileMenuDashboard";
import DashboardHeader from "../common/header/DashboardHeader";
import DashboardEmployerSidebar from "../common/header/DashboardEmployerSidebar";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      {/* <LoginPopup /> */}

      <DashboardHeader />

      <MobileMenuDashboard />

      <DashboardEmployerSidebar />
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <JobListingsTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
