"use client";

import "./JobByIdTable.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hook";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import JobSkills from "@/components/edit-jobs/components/JobSkills";
import SocialTwo from "@/components/edit-jobs/components/SocialTwo";
import JobOverView from "@/components/edit-jobs/components/JobOverView";
import CompanyInfo from "@/components/edit-jobs/components/CompanyInfo";
import RelatedJobs from "@/components/edit-jobs/components/RelatedJobs";
import { getJobByIdAsync } from "@/lib/store/feature/manageJobs/getjobbyidSlice";
import ApplyJobModalContent from "@/components/edit-jobs/components/ApplyJobModalContent";
import JobDetailsDescriptions from "@/components/edit-jobs/components/JobDetailsDescriptions";
import DashboardHeader from "@/components/common/header/DashboardHeader";

interface Job {
  id: number;
  logo: string;
  title: string;
  company: string;
  location: string;
  time: string;
  minimum_salary: number;
  maximum_salary: number;
  // job_type_id: JobType[];
  description: string;
  responsibility: string;
  vacancy: number;
  created_at: string;
  link: string;
}

const JobByIdTable = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const [job, setJobs] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const token = localStorage.getItem("authToken");
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcl9yb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNzM2MzU4NTAyfQ.D7J8ljii58s1tdrtD-Yjtmg9cMa6YdLhICTdEQEi2KA";

        // Ensure id is a string
        if (typeof id !== "string") {
          console.error("Invalid id type:", id);
          return;
        }

        const fetchedJobs = await dispatch(getJobByIdAsync({ token, id }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const jobsArray: any = fetchedJobs.payload;
        if (jobsArray?.length > 0) {
          setJobs(jobsArray[0]); // Destructure the first job object
        } else {
          console.error("No job found with the given ID.");
        }
      } catch (error) {
        console.error("Error Fetching Jobs:", error);
      }
    };

    fetchJobs();
  }, [dispatch, id]);

  return (
    <>
      <LoginPopup />
      {/* <MobileMenu /> */}
      {/* End MobileMenu */}
      <DashboardHeader />
      <section className="job-detail-section">
        <br />
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  {job?.logo ? (
                    <span className="company-logo">
                      <Image
                        width={100}
                        height={98}
                        src={job?.logo}
                        alt="logo"
                      />
                    </span>
                  ) : (
                    <div>No Logo Available</div>
                  )}

                  <h4>{job?.title || "Job Title Not Available"}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {job?.company || "Company Not Available"}
                    </li>
                    {/* compnay info */}
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {job?.location || "Location Not Available"}
                    </li>
                    {/* location info */}
                    <li>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {job?.time || "Time Not Available"}
                    </li>
                    {/* time info */}
                    <li>
                      <span className="icon flaticon-money"></span>
                      {" ₹"}
                      {job?.minimum_salary || "Minimum Salary Not Available"}
                      {"- ₹"}
                      {job?.maximum_salary || "Maximum Salary Not Available"}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}
                </div>
                <div
                  className="modal fade"
                  id="applyJobModal"
                  // tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <ApplyJobModalContent />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <JobDetailsDescriptions
                  description={job?.description || "No description available"}
                  responsibility={job?.responsibility}
                />
                {/* End jobdetails content */}

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
                {/* <!-- Other Options --> */}

                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                    <div className="text">
                      2020 jobs live - 293 added today.
                    </div>
                  </div>
                  <RelatedJobs />
                </div>
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    {/* <!-- Job Overview --> */}
                    <h4 className="widget-title">Job Overview</h4>
                    <JobOverView
                      overview={job?.created_at || "No Date Available"}
                      title={job?.title}
                      minimum_salary={job?.minimum_salary}
                      maximum_salary={job?.maximum_salary}
                      vacancy={job?.vacancy}
                    />

                    {/* <!-- Map Widget --> */}
                    {/* <h4 className="widget-title mt-5">Job Location</h4>
                    <div className="widget-content">
                      <div className="map-outer">
                        <div style={{ height: "300px", width: "100%" }}>
                          <MapJobFinder />
                        </div>
                      </div>
                    </div> */}
                    {/* <!--  Map Widget --> */}

                    <br />

                    <h4 className="widget-title">Job Skills</h4>
                    <div className="widget-content">
                      <JobSkills />
                    </div>
                    {/* <!-- Job Skills --> */}
                  </div>
                  {/* End .sidebar-widget */}

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          {job?.logo && (
                            <Image
                              width={54}
                              height={53}
                              src={job.logo}
                              alt="resource"
                            />
                          )}
                        </div>
                        <h5 className="company-name">
                          {job?.company || "Company Name Not Available"}
                        </h5>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>
                      {/* End company title */}

                      <CompanyInfo />

                      <div className="btn-box">
                        <a
                          href={job?.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          {job?.link ? "Visit Link" : "No Link Available"}
                        </a>
                      </div>
                      {/* End btn-box */}
                    </div>
                  </div>
                  {/* End .company-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      {/* <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default JobByIdTable;
