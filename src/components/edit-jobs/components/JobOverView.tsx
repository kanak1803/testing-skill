import moment from "moment";

interface JobOverviewProps {
  overview: string | Date;
  title?: string;
  minimum_salary?: number;
  maximum_salary?: number;
  vacancy?: number;
}

const JobOverView = ({
  overview,
  title,
  minimum_salary,
  maximum_salary,
  vacancy,
}: JobOverviewProps) => {
  const formattedDate = moment(overview).format("D MMMM YYYY");

  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>{formattedDate || "Date Not available"} </span>
        </li>
        <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration date:</h5>
          <span>Day Month Year</span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>City, Country</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{title || "Not available"}</span>
        </li>
        <li>
          <i className="icon icon-clock"></i>
          <h5>Hours:</h5>
          <span>50h / week</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Vacancy:</h5>
          <span>{vacancy}</span>
        </li>
        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          <span>
            {"₹"}
            {minimum_salary} - {"₹"}
            {maximum_salary}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default JobOverView;
