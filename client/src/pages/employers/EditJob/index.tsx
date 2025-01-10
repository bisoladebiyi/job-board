/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CreateJob from "../CreateJob";
import {
  useDeleteJobMutation,
  useEditJobMutation,
  useGetActiveJobsQuery,
  useGetJobQuery,
} from "../../../redux/features/user/employerApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { ROUTES_EMPLOYER } from "../../../utils/constants";

const EditJob = () => {
  const { id } = useParams();
  const employer = useSelector((state: RootState) => state.employer);
  const { data } = useGetJobQuery(id);
  const { refetch: refetchJobs } = useGetActiveJobsQuery(employer.id);
  const [editJob] = useEditJobMutation();
  const [deleteJob] = useDeleteJobMutation();
  const navigate = useNavigate();

  const updateJob = (e: any, data: any) => {
    e.preventDefault();
    editJob({ ...data, jobId: id })
      .unwrap()
      .then(() => {
        refetchJobs().then(() => alert("Job updated successfully"));
      });
  };

  const removeJob = (e: any) => {
    e.preventDefault();
    deleteJob(id)
      .unwrap()
      .then(() => {
        refetchJobs().then(() => {
          navigate(ROUTES_EMPLOYER.DASHBOARD);
          alert("Job deleted successfully");
        });
      });
  };

  return <CreateJob type="edit" data={data} updateJob={updateJob} removeJob={removeJob} />;
};

export default EditJob;
