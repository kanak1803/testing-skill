import Link from "next/link";
// import Image from "next/image";
import "./Applicants.scss";

const candidatesData = [
  {
    id: 1,
    avatar: "/images/resource/candidate-1.png",
    name: "Darlene Robertson",
    designation: "UI Designer",
    location: "London, UK",
    hourlyRate: "99",
    tags: ["App", "Design", "Web"],
    destination: { min: 0, max: 10 },
    category: "Residential",
    gender: "Male",
    created_at: "Last Hour",
    experience: "Fresh",
    qualification: "Certificate",
  },
  {
    id: 2,
    avatar: "/images/resource/candidate-2.png",
    name: "Wade Warren",
    designation: "Developer",
    location: "London, UK",
    hourlyRate: "94",
    tags: ["App", "Design", "Digital"],
    destination: { min: 10, max: 20 },
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
    destination: { min: 20, max: 30 },
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
    destination: { min: 30, max: 40 },
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
    destination: { min: 40, max: 50 },
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
    destination: { min: 50, max: 60 },
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
    destination: { min: 60, max: 70 },
    category: "Industrial",
    gender: "Male",
    created_at: "Last 24 Hour",
    experience: "1 Year",
    qualification: "Associate Degree",
  },
];

const Applicants = () => {
  return (
    <>
      {candidatesData.slice(0, 7).map((candidate) => (
        <div
          className="candidate-block-three col-lg-12 col-md-12 col-sm-12 margin-leftt"
          key={candidate.id}
        >
          <div className="inner-box candidateflexx recent-applicants">
            <div className="content">
              <h4 className="name">
                <Link href={`/candidates-single-v1/${candidate.id}`}>
                  {candidate.name}
                </Link>
              </h4>
              {/* End candidate-info */}

              <ul className="post-tags gapApplicant">
                {candidate.tags.map((val, i) => (
                  <li key={i}>
                    <a href="#">{val}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="option-box recentnone">
              <ul className="option-list">
                <li>
                  <Link href={`/candidates-single-v1/${candidate.id}`}>
                    <button data-text="View Application">
                      <span className="la la-eye"></span>
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
            {/* End content */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Applicants;
