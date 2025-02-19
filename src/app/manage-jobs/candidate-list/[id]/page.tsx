import DashboardHeader from "@/components/common/header/DashboardHeader";
import MobileMenuDashboard from "@/components/common/header/MobileMenuDashboard";
import DashboardEmployerSidebar from "@/components/common/header/DashboardEmployerSidebar";
import CandidatesListTable from "@/components/applied-jobs/components/CandidatesListTable";

export const metadata = {
  title: "Candidate List - Skillbuddy",
  description: "Candidate List - Skillbuddy",
};

const JobSingleDynamicV1 = () => {
  return (
    <>
      <div className="page-wrapper dashboard">
        <span className="header-span"></span>

        {/* <LoginPopup /> */}

        <DashboardHeader />

        <MobileMenuDashboard />
        {/* End MobileMenu */}

        <DashboardEmployerSidebar />

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            {/* <BreadCrumb title="Manage jobs!" /> */}

            {/* <MenuToggler /> */}

            <div className="row">
              {/* <div className="col-lg-2">
          <FilterSidebar />
          </div> */}

              <div className="col-lg-12">
                <div className="ls-widget">
                  {/* <JobListingsTable /> */}
                  <CandidatesListTable />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JobSingleDynamicV1;
