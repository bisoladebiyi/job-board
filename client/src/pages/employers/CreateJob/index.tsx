/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";
import EmployerLayout from "../../../components/Layout/employer";
import { ROUTES_EMPLOYER } from "../../../utils/constants";
import style from "./CreateJob.module.scss";
import inputStyle from "../../../components/elements/Input/Input.module.scss";
import Input from "../../../components/elements/Input/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Select from "react-select";
import {
  useCreateJobMutation,
  useGetActiveJobsQuery,
} from "../../../redux/features/user/employerApiSlice";
import { useNavigate } from "react-router-dom";

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: "100%",
    fontSize: "13px",
  }),
  input: (provided: any) => ({
    ...provided,
    height: "45px",
  }),
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #504c4c",
  }),
};

const options = [
  { value: "On-site", label: "On-site" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Remote", label: "Remote" },
];

const CreateJob = ({ type, data, updateJob, removeJob }: any) => {
  const employer = useSelector((state: RootState) => state.employer);
  const [jobDetails, setJobDetails] = useState({
    employerId: employer.id,
    company: employer.companyName,
    role: "",
    salary: "",
    location: "",
    desc: "",
    model: options[0].label,
    companyWebsite: employer.companyWebsite,
  });
  const [createJob] = useCreateJobMutation();
  const { refetch } = useGetActiveJobsQuery(employer.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "edit" && data) {
      setJobDetails({
        employerId: data.employerId,
        company: data.company,
        role: data.role,
        salary: data.salary,
        location: data.location,
        desc: data.desc,
        model: data.model,
        companyWebsite: data.companyWebsite,
      });
    }
  }, [type, data]);

  const updateDetails = (e: any) => {
    setJobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value,
    });
  };

  const createNewJob = (e: any) => {
    e.preventDefault();
    // to-do: field validation, error/success msgs

    createJob(jobDetails)
      .unwrap()
      .then((res) => {
        console.log(res);
        refetch().then(() => navigate(ROUTES_EMPLOYER.DASHBOARD));
      })
      .catch((error) => console.log(error));
  };

  return (
    <EmployerLayout
      activePage={ROUTES_EMPLOYER.CREATE}
      pageName={type === "edit" ? "Edit Job" : "Create Job"}
    >
      <form action="" className={style.create_form}>
        <div className={style.create_form_grid}>
          <Input
            type="text"
            name="company"
            label="Company name"
            onChange={updateDetails}
            value={jobDetails.company}
          />
          <Input
            type="text"
            name="role"
            label="Position"
            onChange={updateDetails}
            value={jobDetails.role}
          />
        </div>
        <Input
          type="text"
          name="salary"
          label="Salary"
          onChange={updateDetails}
          placeholder="$70,000 /yr"
          value={jobDetails.salary}
        />
        <Input
          type="text"
          name="location"
          label="Location"
          onChange={updateDetails}
          placeholder="Vancouver, Canada"
          value={jobDetails.location}
        />
        <div>
          <label className={inputStyle.input_label} htmlFor="">
            Job Type
          </label>
          <Select
            placeholder="Select job type"
            name="type"
            options={options}
            onChange={(e: any) =>
              setJobDetails({ ...jobDetails, model: e.label })
            }
            value={options.find((op) => op.label === jobDetails.model)}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={customStyles}
          />
        </div>
        <div>
          <label className={inputStyle.input_label} htmlFor="">
            Job Description
          </label>
          <Editor
            onChange={(e) =>
              setJobDetails({ ...jobDetails, desc: e.target.value })
            }
            containerProps={{ style: { height: 400, background: "#fff" } }}
            value={jobDetails.desc}
          />
        </div>
        <div className={style.create_form_btn}>
          <button
            onClick={
              type === "edit" ? (e) => updateJob(e, jobDetails) : createNewJob
            }
          >
            {type === "edit" ? "Edit job" : "Create new job"}
          </button>
          {type === "edit" && (
            <button
              onClick={removeJob}
              className={style.create_form_btn_danger}
            >
              Delete Job
            </button>
          )}
        </div>
      </form>
    </EmployerLayout>
  );
};

export default CreateJob;
