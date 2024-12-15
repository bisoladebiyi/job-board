import React from "react";
import style from "./Layout.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ITopElement {
  userType: "applicant" | "employer";
  pageName?: string;
}

const TopElement: React.FC<ITopElement> = ({ userType, pageName }) => {
  const applicant = useSelector((state: RootState) => state.applicant);
  const employer = useSelector((state: RootState) => state.employer);

  return (
    <div className={style.topElement}>
      <h2>{pageName}</h2>
      <div className={style.topElement_account}>
        <figure className={style.topElement_avatar}>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
          />
        </figure>
        <p>
          {applicant.firstName} {applicant.firstName}
        </p>
      </div>
    </div>
  );
};

export default TopElement;
