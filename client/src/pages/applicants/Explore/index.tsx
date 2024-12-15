/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ApplicantLayout from "../../../components/Layout/applicant";
import { dummyJobs, ROUTES_APPLICANT } from "../../../utils/constants";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import dashboardStyle from "../Dashboard/Dashboard.module.scss";
import style from "./Explore.module.scss";
import JobDetails from "../../../components/JobDetails";
import Select from "react-select";

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: "200px",
    fontSize: "12px",
  }),
};

const options = [
  { value: "On-site", label: "On-site" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Remote", label: "Remote" },
];

const dateOptions = [
  { value: "Past 24 hours", label: "Past 24 hours" },
  { value: "Past week", label: "Past week" },
  { value: "Past month", label: "Past month" },
];

const Explore = () => {
  const [jobDetails, setJobDetails] = useState<any>(dummyJobs[0]);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ApplicantLayout activePage={ROUTES_APPLICANT.EXPLORE} pageName="Explore">
      <div className={dashboardStyle.dashboard}>
        <div>
          {/* filters  */}
          <div className={style.explore_filters}>
            <input
              className={style.explore_filters_search}
              type="text"
              placeholder="Seach jobs"
            />
            <div className={style.explore_filters_select}>
              <Select
                placeholder="Filter by job type"
                isMulti
                name="type"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customStyles}
              />
              <Select
                placeholder="Filter by date"
                isMulti
                name="date"
                options={dateOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customStyles}
              />
            </div>
          </div>
          {/* body  */}

          <div className={dashboardStyle.dashboard_body}>
            {dummyJobs.map((job) => (
              <div
                className={dashboardStyle.dashboard_card}
                onClick={() => {
                  setJobDetails(job);
                  setShowDetails(true);
                }}
              >
                <h4 className={dashboardStyle.dashboard_card_role}>
                  {job.role}
                </h4>
                <p className={dashboardStyle.dashboard_card_name}>
                  {job.company}
                </p>
                <p className={dashboardStyle.dashboard_card_name}>
                  {job.location}
                </p>
                <p className={dashboardStyle.dashboard_card_desc}>{job.desc}</p>

                <div>
                  <button>
                    {job.isSaved ? (
                      <FaHeart color="#F72C5B" size={20} />
                    ) : (
                      <FaRegHeart color="#F72C5B" size={20} />
                    )}
                  </button>
                  <button>See more</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showDetails && (
        <JobDetails jobDetails={jobDetails} setShowDetails={setShowDetails} />
      )}
    </ApplicantLayout>
  );
};

export default Explore;
