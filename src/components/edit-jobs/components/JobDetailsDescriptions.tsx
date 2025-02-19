interface JobDetailsProps {
  description?: string;
  responsibility?: string | string[];
}

const JobDetailsDescriptions = ({
  description,
  responsibility,
}: JobDetailsProps) => {
  return (
    <div className="job-detail">
      <h4>Job Description</h4>
      <p>{description || "Description not available"}</p>
      <h4>Key Responsibilities</h4>
      <ul className="list-style-three">
        {/* Add a map logic to render the responsibility into points */}
        <li>{responsibility || " No responsibility"}</li>
      </ul>
      <h4>Skill & Experience</h4>
      <ul className="list-style-three">
        <li>
          You have at least 3 years’ experience working as a Product Designer.
        </li>
        <li>You have experience using Sketch and InVision or Framer X</li>
        <li>
          You have some previous experience working in an agile environment –
          Think two-week sprints.
        </li>
        <li>You are familiar using Jira and Confluence in your workflow</li>
      </ul>
    </div>
  );
};

export default JobDetailsDescriptions;
