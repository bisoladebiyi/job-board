/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SideNav from "../SideNav";
import { FaHeart, FaCog, FaSuitcase, FaFile } from "react-icons/fa";
import { ROUTES_APPLICANT } from "../../../utils/constants";
import TopElement from "../TopElement";
import style from "../Layout.module.scss"

const sideNavItems = [
  {
    title: "My jobs",
    icon: FaHeart,
    link: ROUTES_APPLICANT.JOBS,
  },
  {
    title: "Explore",
    icon: FaSuitcase,
    link: ROUTES_APPLICANT.EXPLORE,
  },
  {
    title: "Resume",
    icon: FaFile,
    link: ROUTES_APPLICANT.RESUME,
  },
  {
    title: "Settings",
    icon: FaCog,
    link: ROUTES_APPLICANT.SETTINGS,
  },
];

const ApplicantLayout = ({ children, activePage, pageName }: any) => {
  return (
    <div className={style.layout}>
      <SideNav sideNavItems={sideNavItems} activePage={activePage} />

      <main>
        <TopElement userType="applicant" pageName={pageName} />
        {children}
      </main>
    </div>
  );
};

export default ApplicantLayout;
