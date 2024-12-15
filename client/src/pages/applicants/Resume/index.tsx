/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ApplicantLayout from "../../../components/Layout/applicant";
import { ROUTES_APPLICANT } from "../../../utils/constants";
import Dropzone from "react-dropzone";
import style from "./Resume.module.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useUploadResumeMutation } from "../../../redux/features/user/applicantApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Resume = () => {
  const [file, setFile] = useState<any>(null);
  const [uploadResume] = useUploadResumeMutation();
  const applicant = useSelector((state: RootState) => state.applicant);
  const navigate = useNavigate();

  const saveResume = () => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", applicant.id);

    uploadResume(formData)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        navigate(ROUTES_APPLICANT.DASHBOARD);
      });
  };

  //  ADD LOADING STATE TO BTN

  return (
    <ApplicantLayout activePage={ROUTES_APPLICANT.RESUME} pageName="Resume">
      <div className={style.resume}>
        <h4>Upload your resume</h4>

        <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <section className={style.section}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  {!file
                    ? `Drag and drop some files here, or click here to select files`
                    : `${file.name} added`}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <div className={style.resume_btns}>
          <button onClick={saveResume}>Upload</button>
          <Link to={ROUTES_APPLICANT.JOBS}>
            <span>Continue without resume</span>
            <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </ApplicantLayout>
  );
};

export default Resume;
