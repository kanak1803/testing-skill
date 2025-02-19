import JobByIdTable from "./components/JobByIdTable";

const index = () => {
  return (
    <>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <JobByIdTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
