/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ApplicantLayout from "../../../components/Layout/applicant";
import { dummyJobs, ROUTES_APPLICANT } from "../../../utils/constants";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import style from "./Dashboard.module.scss";
import JobDetails from "../../../components/JobDetails";

const ApplicantDashbaord = () => {
  const [activeTab, setActiveTab] = useState<"applied" | "saved">("applied");
  const [jobDetails, setJobDetails] = useState<any>(dummyJobs[0]);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ApplicantLayout activePage={ROUTES_APPLICANT.JOBS} pageName="Dashboard">
      <div className={style.dashboard}>
        <div>
          {/* header  */}
          <div>
            <ul className={style.dashboard_tab}>
              <li
                className={
                  activeTab === "applied"
                    ? style.dashboard_tab_item_active
                    : style.dashboard_tab_item
                }
                onClick={() => setActiveTab("applied")}
              >
                Applied
              </li>
              <li
                className={
                  activeTab === "saved"
                    ? style.dashboard_tab_item_active
                    : style.dashboard_tab_item
                }
                onClick={() => setActiveTab("saved")}
              >
                Saved
              </li>
            </ul>
          </div>
          {/* body  */}

          <div className={style.dashboard_body}>
            {dummyJobs.map((job) => (
              <div
                className={style.dashboard_card}
                onClick={() => {
                  setJobDetails(job);
                  setShowDetails(true);
                }}
              >
                <h4 className={style.dashboard_card_role}>{job.role}</h4>
                <p className={style.dashboard_card_name}>{job.company}</p>
                <p className={style.dashboard_card_name}>{job.location}</p>
                <p className={style.dashboard_card_desc}>{job.desc}</p>

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

export default ApplicantDashbaord;
