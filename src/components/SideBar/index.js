import React from "react";
import "./SideBar.css";

const SideBar = (props) => {
  return <div className="side-bar-container">{props.children}</div>;
};

export default SideBar;
