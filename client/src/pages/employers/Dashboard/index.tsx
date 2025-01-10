/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ROUTES_EMPLOYER } from "../../../utils/constants";
import style from "../../applicants/Dashboard/Dashboard.module.scss";
import JobDetails from "../../../components/JobDetails";
import JobCard from "../../../components/JobCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import EmployerLayout from "../../../components/Layout/employer";
import {
  useGetActiveJobsQuery,
  useGetArchivedJobsQuery,
} from "../../../redux/features/user/employerApiSlice";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [jobDetails, setJobDetails] = useState<any>({});
  const [showDetails, setShowDetails] = useState(false);
  const user = useSelector((state: RootState) => state.employer);
  const { data: activeJobs } = useGetActiveJobsQuery(user.id);
  const { data: archived } = useGetArchivedJobsQuery(user.id);
  const navigate = useNavigate()

  const handleEditJob = (e:any, id: string) => {
    navigate(ROUTES_EMPLOYER.EDIT + `/${id}`)
  }

  return (
    <EmployerLayout activePage={ROUTES_EMPLOYER.DASHBOARD} pageName="Dashboard">
      <div className={style.dashboard}>
        <div>
          {/* header  */}
          <div>
            <ul className={style.dashboard_tab}>
              <li
                className={
                  activeTab === "active"
                    ? style.dashboard_tab_item_active
                    : style.dashboard_tab_item
                }
                onClick={() => setActiveTab("active")}
              >
                Active Jobs
              </li>
              <li
                className={
                  activeTab === "archived"
                    ? style.dashboard_tab_item_active
                    : style.dashboard_tab_item
                }
                onClick={() => setActiveTab("archived")}
              >
                Archived
              </li>
            </ul>
          </div>
        </div>

        <div className={style.dashboard_body}>
          {(activeTab === "active" ? activeJobs : archived)?.map((job: any) => (
            <JobCard
              key={job._id}
              job={job}
              setJobDetails={setJobDetails}
              setShowDetails={setShowDetails}
              handleEditJob={(e: any) => handleEditJob(e, job._id)}
              type={"employer"}
            />
          ))}
        </div>
      </div>
      {showDetails && (
        <JobDetails
          jobDetails={jobDetails}
          setShowDetails={setShowDetails}
          type="employer"
          // handleApplication={handleApplication}
        />
      )}
    </EmployerLayout>
  );
};

export default EmployeeDashboard;
