/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SideNav from "../SideNav";
import { FaHeart, FaSuitcase, FaFile } from "react-icons/fa";
import { ROUTES_EMPLOYER } from "../../../utils/constants";
import TopElement from "../TopElement";
import style from "../Layout.module.scss";

const sideNavItems = [
  {
    title: "My jobs",
    icon: FaHeart,
    link: ROUTES_EMPLOYER.DASHBOARD,
  },
  {
    title: "Create JOB",
    icon: FaSuitcase,
    link: ROUTES_EMPLOYER.CREATE,
  },
  {
    title: "Applications",
    icon: FaFile,
    link: ROUTES_EMPLOYER.APPLICATIONS,
  },
  // {
  //   title: "Settings",
  //   icon: FaCog,
  //   link: ROUTES_APPLICANT.SETTINGS,
  // },
];

const EmployerLayout = ({ children, activePage, pageName }: any) => {
  return (
    <div className={style.layout}>
      <SideNav
        sideNavItems={sideNavItems}
        activePage={activePage}
        userType="employer"
      />

      <main>
        <TopElement userType="employer" pageName={pageName} />
        {children}
      </main>
    </div>
  );
};

export default EmployerLayout;
