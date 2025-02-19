"use client";
import "./JobListingsTable.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hook";
import { getManageJobAsync } from "@/lib/store/feature/manageJobs/manageJobSlice";
import { ManageJobInterface } from "@/inteface/manage-jobs/managejobInterface";

const JobListingsTable = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [jobStatuses, setJobStatuses] = useState<{ [key: string]: boolean }>(
    {}
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const token = localStorage.getItem("authToken");
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcl9yb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNzM2MzU4NTAyfQ.D7J8ljii58s1tdrtD-Yjtmg9cMa6YdLhICTdEQEi2KA";
        const fetchedJobs = await dispatch(getManageJobAsync(token));
        const jobs = Array.isArray(fetchedJobs.payload)
          ? fetchedJobs.payload
          : [];
        setJobs(jobs);
      } catch (error) {
        console.error("Error Fetching Jobs:", error);
      }
    };

    fetchJobs();
  }, [dispatch]);

  useEffect(() => {
    // Initialize job statuses based on fetched jobs
    if (jobs.length > 0) {
      const initialStatuses = jobs.reduce(
        (acc: { [key: string]: boolean }, job: ManageJobInterface) => {
          acc[job.id] = true; // Assuming all jobs start as "Active"
          return acc;
        },
        {}
      );
      setJobStatuses(initialStatuses);
    }
  }, [jobs]);

  const handleToggleChange = (jobId: string) => {
    setJobStatuses((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId], // Toggle status
    }));
  };

  return (
    <div className="tabs-box">
      {/* <div className="widget-title">
      </div> */}
      <div className="widget-title">
        <h4>My Job Lists</h4>
        <div className="search-bar">
          <span className="icon flaticon-search-3"></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search Job..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="chosen-outer">
          <select className="chosen-single form-select">
            <option>Active (10)</option>
            <option>Inactive (5)</option>
            <option>All (15)</option>
          </select>
        </div>
      </div>

      <div className="widget-content">
        <div className="table-outer joblist-table">
          <table className="default-table manage-job-table ">
            <thead>
              <tr className="text-center">
                <th>Title</th>
                <th>Posted On</th>
                <th>Applicants</th>
                <th>Job Views</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(jobs) && jobs.length > 0 ? (
                jobs.map((item: ManageJobInterface) => (
                  <tr className="title-ppadding" key={item.id}>
                    <td className="title-ppadding">
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content title-ppadding">
                            <h4>
                              <Link href={`/candidate-list/${item.id}`}>
                                {item.title}
                              </Link>
                            </h4>
                            <ul className="job-info title-ppadding">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.job_category_title || "N/A"}
                              </li>
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.job_type_name || "N/A"}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                Location{" "}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center title-ppadding">
                      {new Date(item.created_at).toLocaleDateString()} <br />
                      {/* You can calculate "days ago" dynamically */}
                    </td>
                    <td className="applied text-center title-ppadding">
                      {item.vacancy} Vacancies
                    </td>
                    <td className="applied text-center title-ppadding">
                      <p>99 Views</p>{" "}
                      {/* Placeholder: Update with actual job views */}
                    </td>
                    <td className="status text-center title-ppadding toggle-center">
                      <div
                        className={`shadcn-toggle ${
                          jobStatuses[item.id] ? "checked" : ""
                        }`}
                        onClick={() => handleToggleChange(item.id)}
                      />
                      <p>Expiring in 10 days</p> {/* Placeholder */}
                    </td>
                    <td className="text-center title-ppadding">
                      <div className="option-box text-center">
                        <ul className="option-list text-center ">
                          <li className="text-center">
                            <Link href={`/manage-jobs/edit-jobs/${item.id}`}>
                              <button data-text="Edit Job">
                                <span className="la la-edit"></span>
                              </button>
                            </Link>
                          </li>
                          <li className="text-center">
                            <Link
                              href={`/manage-jobs/candidate-list/${item.id}`}
                            >
                              <button data-text="View Candidate">
                                <span className="la la-user-tie"></span>
                              </button>
                            </Link>
                          </li>
                          <li className="text-center">
                            <Link
                              target="_blank"
                              href={`/manage-jobs/job-single-v1/${item.id}`}
                            >
                              <button data-text="View Job">
                                <span className="la la-eye"></span>
                              </button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No jobs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
