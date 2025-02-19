import Link from "next/link";
// import Image from "next/image";
import "./RecentlyPosted.scss";

const RecentlyPosted = () => {
  const jobs = [
    {
      id: 1,
      logo: "/images/resource/company-logo/1-1.png",
      jobTitle: "Software Engineer (Android), Libraries",
      company: "Segment",
      location: "London, UK",
      time: "11 hours ago",
      salary: "$35k - $45k",
      jobType: ["Full Time", "Private", "Urgent"],
      link: "https://segment.com",
      tag: "freelancer",
      category: "Residential",
      created_at: "Last Hour",
      experience: "Fresh",
    },
    {
      id: 2,
      logo: "/images/resource/company-logo/1-2.png",
      jobTitle: "Recruiting Coordinator",
      company: "Catalyst",
      location: "London, UK",
      time: "11 hours ago",
      salary: "$35k - $45k",
      jobType: ["Freelancer", "Private", "Urgent"],
      link: "https://www.catalyst.org",
      tag: "full-time",
      category: "Commercial",
      created_at: "Last 24 Hour",
      experience: "1 Year",
    },
    {
      id: 3,
      logo: "/images/resource/company-logo/1-3.png",
      jobTitle: "Product Manager, Studio",
      company: "Invision",
      location: "London, UK",
      time: "11 hours ago",
      salary: "$35k - $45k",
      jobType: ["Part Time", "Private", "Urgent"],
      link: "https://www.invisionapp.com",
      tag: "internship",
      category: "Industrial",
      created_at: "Last 7 Days",
      experience: "2 Year",
    },
    {
      id: 4,
      logo: "/images/resource/company-logo/1-4.png",
      jobTitle: "Senior Product Designer",
      company: "Upwork",
      location: "London, UK",
      time: "11 hours ago",
      salary: "$35k - $45k",
      jobType: ["Temporary", "Private", "Urgent"],
      link: "https://www.upwork.com",
      tag: "freelancer",
      category: "Apartments",
      created_at: "Last 14 Days",
      experience: "3 Year",
    },
  ];

  return (
    <>
      {jobs.map((job) => (
        <div
          className="candidate-block-three col-lg-12 col-md-12 col-sm-12"
          key={job.id}
        >
          <div className="inner-box candidateflexx">
            <div className="content">
              <h4 className="name recentgap">
                <Link target="_blank"  href={`/candidate-list/${job.id}`}>
                  {job.jobTitle}
                </Link>
              </h4>

              <ul className="post-tags candidate-post-tagss gapApplicant">
                {job.jobType.map((type, i) => (
                  <li key={i}>
                    <a href="#">{type}</a>
                  </li>
                ))}
                <li>
                  <a href="#">{job.salary}</a>
                </li>
              </ul>
            </div>

            <div className="option-box recentnone">
              <ul className="option-list">
                <li>
                  <Link target="_blank" href={`/candidate-list/${job.id}`}>
                    <button data-text="View Candidates">
                      <span className="la la-eye"></span>
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecentlyPosted;
