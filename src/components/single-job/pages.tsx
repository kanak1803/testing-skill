  // import Image from "next/image";
  // // import {useState,useEffect} from "react";
  // import { useState } from "react";
  // import MobileMenu from "@/components/header/MobileMenu";
  // import LoginPopup from "@/components/common/form/login/LoginPopup";
  // import JobSkills from "@/components/edit-jobs/components/JobSkills";
  // import SocialTwo from "@/components/edit-jobs/components/SocialTwo";
  // import JobOverView from "@/components/edit-jobs/components/JobOverView";
  // import CompanyInfo from "@/components/edit-jobs/components/CompanyInfo";
  // import RelatedJobs from "@/components/edit-jobs/components/RelatedJobs";
  // import DashboardHeader from "@/components/common/header/DashboardHeader";
  // import ApplyJobModalContent from "@/components/edit-jobs/components/ApplyJobModalContent";
  // import JobDetailsDescriptions from "@/components/edit-jobs/components/JobDetailsDescriptions";
  // import { getJobByIdAsync } from "@/lib/store/feature/manageJobs/getjobbyidSlice";
  // import { useAppDispatch } from "@/lib/store/hook";


  // // export const metadata = {
  // //   title: "Single Job Page  - Skillbuddy",
  // //   description: "Single Job Page  - Skillbuddy",
  // // };



  // const company = [{
  //   id: 1,
  //   logo: "/images/resource/company-logo/1-1.png",
  //   jobTitle: "Software Engineer (Android), Libraries",
  //   company: "Segment",
  //   location: "London, UK",
  //   time: "11 hours ago",
  //   salary: "$35k - $45k",
  //   jobType: [
  //     {
  //       styleClass: "time",
  //       type: "Full Time",
  //     },
  //     {
  //       styleClass: "privacy",
  //       type: "Private",
  //     },
  //     {
  //       styleClass: "required",
  //       type: "Urgent",
  //     },
  //   ],
  //   link: "https://segment.com",
  //   tag: "freelancer",
  //   destination: {
  //     min: 0,
  //     max: 20,
  //   },
  //   category: "Residential",
  //   created_at: "Last Hour",
  //   experience: "Fresh",
  //   totalSalary: {
  //     min: 0,
  //     max: 500,
  //   },
  // },
  // {
  //   id: 2,
  //   logo: "/images/resource/company-logo/1-2.png",
  //   jobTitle: "Recruiting Coordinator",
  //   company: "Catalyst",
  //   location: "London, UK",
  //   time: "11 hours ago",
  //   salary: "$35k - $45k",
  //   jobType: [
  //     {
  //       styleClass: "time",
  //       type: "Freelancer",
  //     },
  //     {
  //       styleClass: "privacy",
  //       type: "Private",
  //     },
  //     {
  //       styleClass: "required",
  //       type: "Urgent",
  //     },
  //   ],
  //   link: "https://www.catalyst.org",
  //   tag: "full-time",
  //   destination: {
  //     min: 20,
  //     max: 30,
  //   },
  //   category: "Commercial",
  //   created_at: "Last 24 Hour",
  //   experience: "1 Year",
  //   totalSalary: {
  //     min: 500,
  //     max: 1000,
  //   },
  // },
  // {
  //   id: 3,
  //   logo: "/images/resource/company-logo/1-3.png",
  //   jobTitle: "Product Manager, Studio",
  //   company: "Invision",
  //   location: "London, UK",
  //   time: "11 hours ago",
  //   salary: "$35k - $45k",
  //   jobType: [
  //     {
  //       styleClass: "time",
  //       type: "Part Time",
  //     },
  //     {
  //       styleClass: "privacy",
  //       type: "Private",
  //     },
  //     {
  //       styleClass: "required",
  //       type: "Urgent",
  //     },
  //   ],
  //   link: "https://www.invisionapp.com",
  //   tag: "internship",
  //   category: "Industrial",
  //   created_at: "Last 7 Days",
  //   experience: "2 Year",
  //   totalSalary: {
  //     min: 1000,
  //     max: 1500,
  //   },

  // },
  // {
  //   id: 4,
  //   logo: "/images/resource/company-logo/1-4.png",
  //   jobTitle: "Senior Product Designer",
  //   company: "Upwork",
  //   location: "London, UK",
  //   time: "11 hours ago",
  //   salary: "$35k - $45k",
  //   jobType: [
  //     {
  //       styleClass: "time",
  //       type: "Temporary",
  //     },
  //     {
  //       styleClass: "privacy",
  //       type: "Private",
  //     },
  //     {
  //       styleClass: "required",
  //       type: "Urgent",
  //     },
  //   ],
  //   link: "https://www.upwork.com",
  //   tag: "freelancer",
  //   destination: {
  //     min: 30,
  //     max: 40,
  //   },
  //   category: "Apartments",
  //   created_at: "Last 14 Days",
  //   experience: "3 Year",
  //   totalSalary: {
  //     min: 1500,
  //     max: 2000,
  //   },

  // },
  // {
  //   id: 5,
  //   logo: "/images/resource/company-logo/1-5.png",
  //   jobTitle: "Senior Full Stack Engineer, Creator Success",
  //   company: "Medium",
  //   location: "London, UK",
  //   time: "11 hours ago",
  //   salary: "$35k - $45k",
  //   jobType: [
  //     {
  //       styleClass: "time",
  //       type: "Full Time",
  //     },
  //     {
  //       styleClass: "privacy",
  //       type: "Private",
  //     },
  //     {
  //       styleClass: "required",
  //       type: "Urgent",
  //     },
  //   ],
  //   link: "https://medium.com",
  //   tag: "full-time",
  //   destination: {
  //     min: 40,
  //     max: 50,
  //   },
  //   category: "Residential",
  //   created_at: "Last 30 Days",
  //   experience: "4 Year",
  //   totalSalary: {
  //     min: 2000,
  //     max: 2500,
  //   },
  // },
  // ];


  // const JobSingleDynamicV1 = async({ params }: { params: { id: string } })  => {
  //   const id = params.id;
  //   console.log(id+"id")
  //   const companies = company[0];
  //   const dispatch = useAppDispatch();
  //   const [job,setJobs] = useState();

  //   useEffect (()=>{
  //     const fetchJobs = async () => {
  //       try {
          
  //         // const token = localStorage.getItem("authToken");
  //         const token =
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcl9yb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNzM2MzU4NTAyfQ.D7J8ljii58s1tdrtD-Yjtmg9cMa6YdLhICTdEQEi2KA";
  //         const fetchedJobs = await dispatch(getJobByIdAsync(token));
  //         const jobs = fetchedJobs.payload;
  //         setJobs(jobs);
  //       } catch (error) {
  //         console.error("Error Fetching Jobs:",error);
  //       }
  //     };
  
  //     fetchJobs();
  //   }, [dispatch]);

  //   return (
  //     <>
  //       {/* <!-- Header Span --> */}
  //       <span className="header-span"></span>

  //       <LoginPopup />
  //       {/* End Login Popup Modal */}

  //       <DashboardHeader />
  //       {/* <!--End Main Header --> */}

  //       <MobileMenu />
  //       {/* End MobileMenu */}

  //       {/* <!-- Job Detail Section --> */}
  //       <section className="job-detail-section">
  //         <div className="upper-box">
  //           <div className="auto-container">
  //             <div className="job-block-seven">
  //               <div className="inner-box">
  //                 <div className="content">
  //                   <span className="company-logo">
  //                     <Image
  //                       width={100}
  //                       height={98}
  //                       src={companies?.logo}
  //                       alt="logo"
  //                     />
  //                   </span>
  //                   <h4>{companies?.jobTitle}</h4>

  //                   <ul className="job-info">
  //                     <li>
  //                       <span className="icon flaticon-briefcase"></span>
  //                       {companies?.company}
  //                     </li>
  //                     {/* compnay info */}
  //                     <li>
  //                       <span className="icon flaticon-map-locator"></span>
  //                       {companies?.location}
  //                     </li>
  //                     {/* location info */}
  //                     <li>
  //                       <span className="icon flaticon-clock-3"></span>{" "}
  //                       {companies?.time}
  //                     </li>
  //                     {/* time info */}
  //                     <li>
  //                       <span className="icon flaticon-money"></span>{" "}
  //                       {companies?.salary}
  //                     </li>
  //                     {/* salary info */}
  //                   </ul>
  //                   {/* End .job-info */}

  //                   <ul className="job-other-info">
  //                     {companies?.jobType?.map((val, i) => (
  //                       <li key={i} className={`${val.styleClass}`}>
  //                         {val.type}
  //                       </li>
  //                     ))}
  //                   </ul>
  //                   {/* End .job-other-info */}
  //                 </div>
  //                 {/* End .content */}

  //                 {/* <div className="btn-box">
  //                   <a
  //                     href="#"
  //                     className="theme-btn btn-style-one"
  //                     data-bs-toggle="modal"
  //                     data-bs-target="#applyJobModal"
  //                   >
  //                     Apply For Job
  //                   </a>
  //                   <button className="bookmark-btn">
  //                     <i className="flaticon-bookmark"></i>
  //                   </button>
  //                 </div> */}
  //                 {/* End apply for job btn */}

  //                 {/* <!-- Modal --> */}
  //                 <div
  //                   className="modal fade"
  //                   id="applyJobModal"
  //                   // tabIndex="-1"
  //                   aria-hidden="true"
  //                 >
  //                   <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
  //                     <div className="apply-modal-content modal-content">
  //                       <div className="text-center">
  //                         <h3 className="title">Apply for this job</h3>
  //                         <button
  //                           type="button"
  //                           className="closed-modal"
  //                           data-bs-dismiss="modal"
  //                           aria-label="Close"
  //                         ></button>
  //                       </div>
  //                       {/* End modal-header */}

  //                       <ApplyJobModalContent />
  //                       {/* End PrivateMessageBox */}
  //                     </div>
  //                     {/* End .send-private-message-wrapper */}
  //                   </div>
  //                 </div>
  //                 {/* End .modal */}
  //               </div>
  //             </div>
  //             {/* <!-- Job Block --> */}
  //           </div>
  //         </div>
  //         {/* <!-- Upper Box --> */}

  //         <div className="job-detail-outer">
  //           <div className="auto-container">
  //             <div className="row">
  //               <div className="content-column col-lg-8 col-md-12 col-sm-12">
  //                 <JobDetailsDescriptions />
  //                 {/* End jobdetails content */}

  //                 <div className="other-options">
  //                   <div className="social-share">
  //                     <h5>Share this job</h5>
  //                     <SocialTwo />
  //                   </div>
  //                 </div>
  //                 {/* <!-- Other Options --> */}

  //                 <div className="related-jobs">
  //                   <div className="title-box">
  //                     <h3>Related Jobs</h3>
  //                     <div className="text">
  //                       2020 jobs live - 293 added today.
  //                     </div>
  //                   </div>
  //                   {/* End title box */}

  //                   <RelatedJobs />
  //                 </div>
  //                 {/* <!-- Related Jobs --> */}
  //               </div>
  //               {/* End .content-column */}

  //               <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
  //                 <aside className="sidebar">
  //                   <div className="sidebar-widget">
  //                     {/* <!-- Job Overview --> */}
  //                     <h4 className="widget-title">Job Overview</h4>
  //                     <JobOverView />

  //                     {/* <!-- Map Widget --> */}
  //                     {/* <h4 className="widget-title mt-5">Job Location</h4>
  //                     <div className="widget-content">
  //                       <div className="map-outer">
  //                         <div style={{ height: "300px", width: "100%" }}>
  //                           <MapJobFinder />
  //                         </div>
  //                       </div>
  //                     </div> */}
  //                     {/* <!--  Map Widget --> */}
  //                     <br />
  //                     <h4 className="widget-title">Job Skills</h4>
  //                     <div className="widget-content">
  //                       <JobSkills />
  //                     </div>
  //                     {/* <!-- Job Skills --> */}
  //                   </div>
  //                   {/* End .sidebar-widget */}

  //                   <div className="sidebar-widget company-widget">
  //                     <div className="widget-content">
  //                       <div className="company-title">
  //                         <div className="company-logo">
  //                           <Image
  //                             width={54}
  //                             height={53}
  //                             src={companies.logo}
  //                             alt="resource"
  //                           />
  //                         </div>
  //                         <h5 className="company-name">{companies.company}</h5>
  //                         <a href="#" className="profile-link">
  //                           View company profile
  //                         </a>
  //                       </div>
  //                       {/* End company title */}

  //                       <CompanyInfo />

  //                       <div className="btn-box">
  //                         <a
  //                           href="#"
  //                           target="_blank"
  //                           rel="noopener noreferrer"
  //                           className="theme-btn btn-style-three"
  //                         >
  //                           {companies.link}
  //                         </a>
  //                       </div>
  //                       {/* End btn-box */}
  //                     </div>
  //                   </div>
  //                   {/* End .company-widget */}
  //                 </aside>
  //                 {/* End .sidebar */}
  //               </div>
  //               {/* End .sidebar-column */}
  //             </div>
  //           </div>
  //         </div>
  //         {/* <!-- job-detail-outer--> */}
  //       </section>
  //       {/* <!-- End Job Detail Section --> */}

  //       {/* <FooterDefault footerStyle="alternate5" /> */}
  //       {/* <!-- End Main Footer --> */}
  //     </>
  //   );
  // };

  // export default JobSingleDynamicV1