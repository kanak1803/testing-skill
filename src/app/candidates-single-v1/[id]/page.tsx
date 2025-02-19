import Image from "next/image";
import "./candidates-single-v1.scss";
import MobileMenuDashboard from "@/components/common/header/MobileMenuDashboard";
import DashboardHeader from "@/components/common/header/DashboardHeader";
import DashboardEmployerSidebar from "@/components/common/header/DashboardEmployerSidebar";

export const metadata = {
  title: "Candidate Profile - Skillbuddy",
  description: "Candidate Profile - Skillbuddy",
};

const candidates = [
  {
    id: 1,
    avatar: "/images/resource/candidate-1.png",
    qrcode: "/images/resource/qr-code.jpg",
    name: "Darlene Robertson",
    designation: "UI Designer",
    location: "London, UK",
    hourlyRate: "99",
    tags: ["App", "Design", "Web"],
    destination: {
      min: 0,
      max: 10,
    },
    category: "Residential",
    gender: "Male",
    created_at: "Last Hour",
    experience: "Fresh",
    qualification: "Certificate",
  },
  {
    id: 2,
    avatar: "/images/resource/candidate-2.png",
    qrcode: "/images/resource/qr-code.jpg",
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
];

const candidateResume = [
  {
    id: 1,
    title: "Work & Experience",
    themeColor: "theme-blue",
    blockList: [
      {
        id: 1,
        meta: "S",
        name: "Product Designer",
        industry: "Spotify Inc.",
        year: "2008 - 2014",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        id: 2,
        meta: "D",
        name: "Sr UX Engineer",
        industry: "Dropbox Inc.",
        year: "2012 - 2014",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  {
    id: 2,
    title: "Education",
    themeColor: "",
    blockList: [
      {
        id: 1,
        meta: "M",
        name: "Bachlors in Fine Arts",
        industry: "Modern College",
        year: "2012 - 2014",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        id: 2,
        meta: "H",
        name: "Computer Science",
        industry: "Harvard University",
        year: "2008 - 2012",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  {
    id: 3,
    title: "Awards",
    themeColor: "theme-yellow",
    blockList: [
      {
        id: 1,
        meta: "E",
        name: "Perfect Attendance Programs",
        industry: "Software Algorithm",
        year: "2008 - 2014",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante
            ipsum primis in faucibus.`,
      },
      {
        id: 2,
        meta: "f",
        name: "Top Performer Recognition",
        industry: "Web Application",
        year: "2012 - 2014",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante
            ipsum primis in faucibus.`,
      },
    ],
  },
];

const CandidateSingleDynamicV1 = () => {
  const candidate = candidates[0]; // Replace with logic to fetch specific candidate

  return (
    <>
      <div className="page-wrapper dashboard">
        <span className="header-span"></span>
        {/* <!-- Header Span for height --> */}

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
            {/* <BreadCrumb title="Manage jobs!" /> */}
            {/* breadCrumb */}

            {/* <MenuToggler /> */}
            {/* Collapsible sidebar button */}

            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Ls widget --> */}
                <div className="ls-widget">
                  {/* <!-- Job Detail Section --> */}
                  <section className="candidate-detail-outer">
                    <div className="upper-box">
                      <div className="auto-container">
                        <div className="candidate-block-five">
                          <div className="inner-box">
                            {/* Part 1 Left */}
                            <div className="content">
                              <h4 className="name">{candidate?.name}</h4>
                              <ul className="candidate-info">
                                <li className="designation">
                                  EMAIL ID - <p>chirag@kotaritech.com</p>
                                </li>
                                <li className="designation">
                                  Mobile N.o - <p>123456789</p>
                                </li>
                              </ul>
                              <ul className="candidate-info">
                                <li className="designation">
                                  Gender - <p> {candidate?.gender}</p>
                                </li>
                                {/* <li className="designation">Mobile N.o - 123456789</li> */}
                              </ul>
                              <ul className="candidate-info">
                                <li className="designation">
                                  Address - <p>Address Line 1 , Address</p>
                                </li>
                                {/* <li className="designation"></li> */}
                              </ul>
                              <ul className="candidate-info">
                                <li className="designation">
                                  <p>Line 2 - </p>
                                </li>
                                {/* <li className="designation">Mobile N.o - 123456789</li> */}
                              </ul>
                              <ul className="candidate-info">
                                <li className="designation">
                                  {" "}
                                  <p>City -</p>
                                </li>
                                {/* <li className="designation">Mobile N.o - 123456789</li> */}
                              </ul>
                              <ul className="candidate-info">
                                <li className="designation">
                                  <p>State - </p>
                                </li>
                                {/* <li className="designation">Mobile N.o - 123456789</li> */}
                              </ul>
                              <ul className="candidate-info">
                                <li className="designation">
                                  {" "}
                                  <p>Zipcode -</p>
                                </li>
                                {/* <li className="designation">Mobile N.o - 123456789</li> */}
                              </ul>
                              <ul className="post-tags">
                                {candidate?.tags?.map((val, i) => (
                                  <li key={i}>{val}</li>
                                ))}
                              </ul>
                            </div>
                            {/* Part 1 Right */}
                            <div className="resume-part1">
                              <div className="btn-box btn-boxs">
                                <a className="theme-btn btn-style-one download-btn">
                                  Download
                                </a>
                              </div>
                              <div className="btn-box">
                                <a className="theme-btn btn-style-one reject-btn">
                                  Reject
                                </a>
                              </div>
                              <div className="btn-box">
                                {/* <label>Job Title</label> */}
                                <select className="chosen-single form-select  text-center theme-btn ">
                                  <option className="text-center">Stage</option>
                                  <option className="text-center">Hired</option>
                                  {/* <option className="text-center">Digital & Creative</option> */}
                                  <option className="text-center">
                                    Retail
                                  </option>
                                  {/* <option className="text-center">Human Resources</option> */}
                                  <option className="text-center">
                                    Management
                                  </option>
                                </select>
                                <button className="bookmark-btn">
                                  <i className="flaticon-share"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* <!-- End Job Detail Section --> */}

                  {/* <!-- Job Detail Section --> */}
                  <section className="candidate-detail-section">
                    <div className="upper-box">
                      <div className="auto-container">
                        <div className="candidate-block-five">
                          <div className="inner-box"></div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Upper Box --> */}

                    <div className="candidate-detail-outer">
                      <div className="auto-container">
                        <div className="candidate-block-five remove-paddd">
                          <div className="inner-box">
                            <div className="content padd-left">
                              <div>
                                <figure className="image">
                                  <Image
                                    width={100}
                                    height={100}
                                    src={candidate.avatar}
                                    alt="avatar"
                                  />
                                </figure>
                              </div>

                              <h4 className="name">{candidate.name}</h4>

                              <ul className="candidate-info">
                                <li className="designation">
                                  {candidate.designation}
                                </li>
                              </ul>
                              <ul className="candidate-info">
                                <li className="designation">Phone:123456789</li>
                              </ul>
                              <ul className="candidate-info">
                                <li className="designation">
                                  Email-Id :info@kotharitech.com
                                </li>
                              </ul>
                              {/* 
                              <ul className="post-tags">
                                {candidate?.tags?.map((val, i) => (
                                  <li key={i}>{val}</li>
                                ))}
                              </ul> */}
                            </div>

                            <div className="btn-box scanner">
                              <div className="">
                                <label className="candidate-id-title">
                                  Candidate ID
                                </label>
                                <p className="candidate-unique-id">
                                  12345678910
                                </p>
                              </div>
                              <figure>
                                <Image
                                  width={100}
                                  height={100}
                                  src={candidate?.qrcode}
                                  alt="avatar"
                                />
                              </figure>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="content-column col-lg-12 col-md-12 col-sm-12">
                            <div className="job-detail">
                              <p>
                                Hello my name is Nicole Wells and web developer
                                from Portland. In pharetra orci dignissim,
                                blandit mi semper, ultricies diam. Suspendisse
                                malesuada suscipit nunc non volutpat. Sed porta
                                nulla id orci laoreet tempor non consequat enim.
                                Sed vitae aliquam velit. Aliquam ante erat,
                                blandit at pretium et, accumsan ac est. Integer
                                vehicula rhoncus molestie. Morbi ornare ipsum
                                sed sem condimentum, et pulvinar tortor luctus.
                                Suspendisse condimentum lorem ut elementum
                                aliquam.
                              </p>
                              {/* <!-- Candidate Resume Start --> */}
                              {candidateResume.map((resume) => (
                                <div
                                  className={`resume-outer ${resume.themeColor}`}
                                  key={resume.id}
                                >
                                  <div className="upper-title">
                                    <h4>{resume?.title}</h4>
                                  </div>
                                  {/* <!-- Start Resume BLock --> */}
                                  {resume?.blockList?.map((item) => (
                                    <div className="resume-block" key={item.id}>
                                      <div className="inner">
                                        <span className="name">
                                          {item.meta}
                                        </span>
                                        <div className="title-box">
                                          <div className="info-box">
                                            <h3>{item.name}</h3>
                                            <span>{item.industry}</span>
                                          </div>
                                          <div className="edit-box">
                                            <span className="year">
                                              {item.year}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text">{item.text}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* End .content-column */}
                        </div>
                      </div>
                    </div>
                    {/* <!-- job-detail-outer--> */}
                  </section>
                  {/* <!-- End Job Detail Section --> */}
                </div>
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

        {/* <CopyrightFooter /> */}
        {/* <!-- End Copyright --> */}
      </div>

      {/* <!-- Header Span --> */}
      {/* <span className="header-span"></span> */}

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      {/* <DefaulHeader /> */}
      {/* <!--End Main Header --> */}

      {/* <MobileMenu /> */}
      {/* End MobileMenu */}

      {/* <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default CandidateSingleDynamicV1;
