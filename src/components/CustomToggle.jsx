import React from "react";
import "./styles/CustomToggle.css";

const CustomToggle = (props) => {
  return (
    <div className="skin-wrap">
      Light mode
      <label className="switch">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={props.onChange}
        />
        <span className="slider round"></span>
      </label>
      Dark mode
    </div>
  );
};

export default CustomToggle;
