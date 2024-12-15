/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import style from "./JobDetails.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { FcCurrencyExchange } from "react-icons/fc";

const JobDetails = ({ jobDetails, setShowDetails }: any) => {
  return (
    <div className={style.job}>
      <div className={style.job_btns}>
        <button onClick={() => setShowDetails(false)}>
          <IoIosArrowBack size={25} />
        </button>
        <button>Apply</button>
      </div>
      <p className={style.job_comapny}>{jobDetails.company}</p>
      <h3 className={style.job_role}>{jobDetails.role}</h3>
      <p className={style.job_location}>{jobDetails.location}</p>
      <p className={style.job_location}>
        {" "}
        <FcCurrencyExchange /> $1500 per month
      </p>
      <div>
        {" "}
        <h5>Job description</h5>
        <p className={style.job_desc}>{jobDetails.desc}</p>
      </div>
    </div>
  );
};

export default JobDetails;
