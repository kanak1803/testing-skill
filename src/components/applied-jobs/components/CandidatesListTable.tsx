"use client";

import Link from "next/link";
import "./CandidatesListTable.scss";
import { useState } from "react";
import { useParams } from "next/navigation";

const JobListingsTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams<{ id: string }>();
  console.log(id+"id")

  const jobCandidateDetails = [
    {
      id: 1,
      avatar: "/images/resource/candidate-1.png",
      name: "Darlene Robertson",
      designation: "UI Designer",
      location: "London, UK",
      hourlyRate: "99",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 0,
        max: 10,
      },
      category: "Residential",
      gender: "Male",
      created_at: "Last Hour",
      experience: "Fresh",
      qualification: "Certificate",
      jobs: [
        {
          id: 1,
          logo: "/images/resource/company-logo/1-1.png",
          jobTitle: "Software Engineer (Android), Libraries",
          company: "Segment",
          location: "London, UK",
          time: "11 hours ago",
          salary: "$35k - $45k",
          jobType: [
            {
              styleClass: "time",
              type: "Full Time",
            },
            {
              styleClass: "privacy",
              type: "Private",
            },
            {
              styleClass: "required",
              type: "Urgent",
            },
          ],
          link: "https://segment.com",
          tag: "freelancer",
          destination: {
            min: 0,
            max: 20,
          },
          category: "Residential",
          created_at: "Last Hour",
          experience: "Fresh",
          totalSalary: {
            min: 0,
            max: 500,
          },
        },
      ],
    },
    {
      id: 2,
      avatar: "/images/resource/candidate-2.png",
      name: "Wade Warren",
      designation: "Developer",
      location: "London, UK",
      hourlyRate: "94",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 10,
        max: 20,
      },
      category: "Commercial",
      gender: "Female",
      created_at: "Last 24 Hour",
      experience: "1 Year",
      qualification: "Associate Degree",
    },
    {
      id: 3,
      avatar: "/images/resource/candidate-3.png",
      name: "Leslie Alexander",
      designation: "Marketing Expert",
      location: "London, UK",
      hourlyRate: "99",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 20,
        max: 30,
      },
      category: "Industrial",
      gender: "Others",
      created_at: "Last 7 Days",
      experience: "2 Year",
      qualification: "Bachelor Degree",
    },
    {
      id: 4,
      avatar: "/images/resource/candidate-4.png",
      name: "Floyd Miles",
      designation: "Charted Accountant",
      location: "London, UK",
      hourlyRate: "88",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 30,
        max: 40,
      },
      category: "Apartments",
      gender: "Male",
      created_at: "Last 14 Days",
      experience: "3 Year",
      qualification: "Master’s Degree",
    },
    {
      id: 5,
      avatar: "/images/resource/candidate-1.png",
      name: "Darlene Robertson",
      designation: "UI Designer",
      location: "London, UK",
      hourlyRate: "77",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 40,
        max: 50,
      },
      category: "Residential",
      gender: "Female",
      created_at: "Last 30 Days",
      experience: "4 Year",
      qualification: "Doctorate Degree",
    },
    {
      id: 6,
      avatar: "/images/resource/candidate-2.png",
      name: "Wade Warren",
      designation: "Developer",
      location: "London, UK",
      hourlyRate: "66",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 50,
        max: 60,
      },
      category: "Commercial",
      gender: "Others",
      created_at: "Last Hour",
      experience: "Fresh",
      qualification: "Certificate",
    },
    {
      id: 7,
      avatar: "/images/resource/candidate-3.png",
      name: "Leslie Alexander",
      designation: "Marketing Expert",
      location: "London, UK",
      hourlyRate: "99",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 60,
        max: 70,
      },
      category: "Industrial",
      gender: "Male",
      created_at: "Last 24 Hour",
      experience: "1 Year",
      qualification: "Associate Degree",
    },
    {
      id: 8,
      avatar: "/images/resource/candidate-4.png",
      name: "Floyd Miles",
      designation: "Charted Accountant",
      location: "London, UK",
      hourlyRate: "89",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 70,
        max: 80,
      },
      category: "Apartments",
      gender: "Female",
      created_at: "Last 7 Days",
      experience: "2 Year",
      qualification: "Bachelor Degree",
    },
    {
      id: 9,
      avatar: "/images/resource/candidate-1.png",
      name: "Darlene Robertson",
      designation: "UI Designer",
      location: "London, UK",
      hourlyRate: "79",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 80,
        max: 90,
      },
      category: "Residential",
      gender: "Others",
      created_at: "Last 14 Days",
      experience: "3 Year",
      qualification: "Master’s Degree",
    },
    {
      id: 10,
      avatar: "/images/resource/candidate-2.png",
      name: "Wade Warren",
      designation: "Developer",
      location: "London, UK",
      hourlyRate: "99",
      tags: ["App", "Design", "Digital"],
      destination: {
        min: 90,
        max: 100,
      },
      category: "Commercial",
      gender: "Male",
      created_at: "Last 30 Days",
      experience: "4 Year",
      qualification: "Doctorate Degree",
    },
  ];

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Software Engineer (Android), Libraries</h4>
        <div></div>
      </div>
      {/* End filter top bar */}
      <div className="widget-title">
        <div className="search-bar">
          <span className="icon flaticon-search-3"></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Sourced</option>
            <option>Hired</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Candidate list</th>
                  <th>Skilled</th>
                  <th>Applied On</th>
                  <th>Hiring Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobCandidateDetails.slice(0, 4).map((item) => (
                  <tr key={item.id}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <h4>
                              <Link href={`/candidates-single-v1/${item.id}`}>
                                {item.name}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                Full Time
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                Job
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                Mumbai
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <ul className="post-tags gapApplicant text-center wrapping-skills">
                        {/* Display first two skills */}
                        <div>
                          <a href="#">ReactJS</a>
                        </div>
                        <div>
                          <a href="#">Nodejs</a>
                        </div>
                        {/* Tooltip for "+3" */}
                        <div className="tooltip-container">
                          <a href="#" className="tooltip-trigger">
                            +3
                          </a>
                          {/* Tooltip content */}
                          <div className="tooltip-content">
                            MongoDB, ExpressJS, Prisma
                          </div>
                        </div>
                      </ul>
                    </td>

                    <td className="text-center">
                      Dec 5, 2020
                      <p>10 days ago</p>
                    </td>
                    <td className="status text-center title-ppadding">
                      <div className="chosen-outer">
                        {/* <!--Tabs Box--> */}
                        <select className="chosen-single form-select">
                          <option>Sourced</option>
                          <option>Hired</option>
                          <option>Rejected</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="option-box icon-center">
                        <ul className="option-list">
                          <li>
                            <Link href={`/candidates-single-v1/${item.id}`}>
                              <button data-text="View Resume">
                                <span className="la la-eye"></span>
                              </button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
