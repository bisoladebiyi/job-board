/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ApplicantLayout from "../../../components/Layout/applicant";
import { dummyJobs, ROUTES_APPLICANT } from "../../../utils/constants";
import style from "./Dashboard.module.scss";
import JobDetails from "../../../components/JobDetails";
import {
  useApplyMutation,
  useGetAppliedJobsQuery,
  useGetSavedJobsQuery,
  useSaveJobMutation,
} from "../../../redux/features/user/applicantApiSlice";
import JobCard from "../../../components/JobCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const ApplicantDashbaord = () => {
  const [activeTab, setActiveTab] = useState<"applied" | "saved">("applied");
  const [jobDetails, setJobDetails] = useState<any>(dummyJobs[0]);
  const [showDetails, setShowDetails] = useState(false);
  const applicant = useSelector((state: RootState) => state.applicant);
  const { data: applied, refetch: refetchApplied } = useGetAppliedJobsQuery(
    applicant.id
  );
  const { data: saved, refetch: refetchSaved } = useGetSavedJobsQuery(
    applicant.id
  );
  const [saveJob] = useSaveJobMutation();
  const [apply] = useApplyMutation();

  const handleSaveJob = (e: any, jobId: string) => {
    e.preventDefault();
    e.stopPropagation();

    saveJob({ jobId, userId: applicant.id })
      .unwrap()
      .then(() => {
        refetchSaved();
      });
  };

  const handleApplication = (e: any, jobId: string) => {
    e.preventDefault();

    apply({ jobId, userId: applicant.id })
      .unwrap()
      .then(() => {
        refetchApplied();
      })
      .finally(() => {
        setShowDetails(false);
        alert("Application withdrawn");
      });
  };

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
            {(activeTab === "applied" ? applied : saved)?.map((job: any) => (
              <JobCard
                key={job._id}
                job={job}
                isSaved={saved.map((jb: any) => jb._id).includes(job._id)}
                setJobDetails={setJobDetails}
                setShowDetails={setShowDetails}
                handleSaveJob={handleSaveJob}
                type={activeTab}
              />
            ))}
          </div>
        </div>
      </div>
      {showDetails && (
        <JobDetails
          applied={applied}
          jobDetails={jobDetails}
          setShowDetails={setShowDetails}
          handleApplication={handleApplication}
        />
      )}
    </ApplicantLayout>
  );
};

export default ApplicantDashbaord;
