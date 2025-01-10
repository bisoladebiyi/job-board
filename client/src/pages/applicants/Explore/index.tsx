/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ApplicantLayout from "../../../components/Layout/applicant";
import { dummyJobs, ROUTES_APPLICANT } from "../../../utils/constants";
import dashboardStyle from "../Dashboard/Dashboard.module.scss";
import style from "./Explore.module.scss";
import JobDetails from "../../../components/JobDetails";
import Select from "react-select";
import {
  useApplyMutation,
  useGetAppliedJobsQuery,
  useGetJobsQuery,
  useGetSavedJobsQuery,
  useSaveJobMutation,
} from "../../../redux/features/user/applicantApiSlice";
import JobCard from "../../../components/JobCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

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
  const applicant = useSelector((state: RootState) => state.applicant);
  const { refetch: refetchApplied, data: applied } = useGetAppliedJobsQuery(
    applicant.id
  );
  const { data: saved, refetch: refetchSaved } = useGetSavedJobsQuery(
    applicant.id
  );
  const { data: jobs, refetch: refetchJobs } = useGetJobsQuery({});
  const [saveJob] = useSaveJobMutation();
  const [apply] = useApplyMutation();

  const handleSaveJob = (e: any, jobId: string) => {
    e.preventDefault();
    e.stopPropagation();

    saveJob({ jobId, userId: applicant.id })
      .unwrap()
      .then((res) => {
        refetchJobs()
          .then(() => {
            refetchSaved();
          })
          .then(() => {
            alert(res.message);
          });
      });
  };

  const handleApplication = (e: any, jobId: string) => {
    e.preventDefault();

    apply({ jobId, userId: applicant.id })
      .unwrap()
      .then(() => {
        refetchApplied();
      });
  };

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
            {jobs?.map((job: any) => (
              <JobCard
                key={job._id}
                job={job}
                isSaved={saved.map((jb: any) => jb._id).includes(job._id)}
                setJobDetails={setJobDetails}
                setShowDetails={setShowDetails}
                handleSaveJob={handleSaveJob}
              />
            ))}
          </div>
        </div>
      </div>
      {showDetails && (
        <JobDetails
          jobDetails={jobDetails}
          applied={applied}
          setShowDetails={setShowDetails}
          handleApplication={handleApplication}
        />
      )}
    </ApplicantLayout>
  );
};

export default Explore;
