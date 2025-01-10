/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import style from "./JobDetails.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { FcCurrencyExchange } from "react-icons/fc";
import { Link } from "react-router-dom";

const JobDetails = ({
  jobDetails,
  setShowDetails,
  handleApplication,
  type,
  applied,
}: any) => {
  if (type === "employer") {
    return (
      <div className={style.job}>
        <div className={style.job_btns}>
          <button onClick={() => setShowDetails(false)}>
            <IoIosArrowBack size={25} />
          </button>
          <button onClick={handleApplication}>{"Archive"}</button>
        </div>
        <p className={style.job_comapny}>{jobDetails.company}</p>
        <h3 className={style.job_role}>{jobDetails.role}</h3>
        <p className={style.job_location}>{jobDetails.location}</p>
        <p className={style.job_location}>
          {" "}
          <FcCurrencyExchange /> {jobDetails.salary}
        </p>
        <div>
          {" "}
          <h5>Job description</h5>
          <div
            className={style.job_desc}
            dangerouslySetInnerHTML={{ __html: jobDetails.desc }}
          />
        </div>
      </div>
    );
  }

  const isApplied = applied
    ?.map((data: any) => data._id)
    .includes(jobDetails._id);

  return (
    <div className={style.job}>
      <div className={style.job_btns}>
        <button onClick={() => setShowDetails(false)}>
          <IoIosArrowBack size={25} />
        </button>
        <button onClick={(e: any) => handleApplication(e, jobDetails._id)}>
          {isApplied ? "Withdraw Application" : "Apply"}
        </button>
      </div>
      <Link to={jobDetails.companyWebsite} style={{ cursor: "pointer" }}>
        <p className={style.job_comapny}>{jobDetails.company}</p>
      </Link>
      <h3 className={style.job_role}>{jobDetails.role}</h3>
      <p className={style.job_location}>{jobDetails.location}</p>
      <p className={style.job_location}>
        {" "}
        <FcCurrencyExchange /> $1500 per month
      </p>
      <div>
        {" "}
        <h5>Job description</h5>
        <div
          className={style.job_desc}
          dangerouslySetInnerHTML={{ __html: jobDetails.desc }}
        />
      </div>
    </div>
  );
};

export default JobDetails;
