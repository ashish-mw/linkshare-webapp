import React from "react"
import './styles/CustomToggle.css';

const CustomToggle = (props) => {
    return(
        <label class="switch">
        <input type="checkbox" {...props.status}/>
        <span class="slider round"></span>
        </label>
    );
}

export default CustomToggle;