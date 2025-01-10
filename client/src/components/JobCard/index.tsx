/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import style from "../../pages/applicants/Dashboard/Dashboard.module.scss";
import { FaHeart, FaRegHeart, FaRegEdit } from "react-icons/fa";

const JobCard = ({
  job,
  isSaved,
  setJobDetails,
  setShowDetails,
  handleSaveJob,
  type,
  handleEditJob,
}: any) => {
  return (
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
      <p className={style.dashboard_card_model}>{job.model}</p>
      <div
        className={style.dashboard_card_desc}
        dangerouslySetInnerHTML={{ __html: job.desc }}
      />

      <div className={style.dashboard_card_btns}>
        {type === "employer" ? (
          <button onClick={handleEditJob}>
            <FaRegEdit size={20} />
          </button>
        ) : type !== "applied" ? (
          <button onClick={(e) => handleSaveJob(e, job._id)}>
            {isSaved ? (
              <FaHeart color="#F72C5B" size={19} />
            ) : (
              <FaRegHeart color="#F72C5B" size={20} />
            )}
          </button>
        ) : (
          <div />
        )}
        <button>See more</button>
      </div>
    </div>
  );
};

export default JobCard;
