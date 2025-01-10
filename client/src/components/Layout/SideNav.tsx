/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Logo from "../Logo";
import style from "./Layout.module.scss";
import { Link } from "react-router-dom";

const SideNav = ({ sideNavItems, activePage, userType }: any) => {
  return (
    <div className={style.sideNav}>
      <div>
        <Logo color="#fff" userType={userType} />
      </div>
      <ul>
        {sideNavItems.map((item: any) => (
          <Link to={item.link}>
            <li style={activePage === item.link ? { color: "#fff" } : {}}>
              <item.icon size={25} />
              <span>{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
